"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Eye, EyeOff, Mail, Lock, ArrowRight } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useAppDispatch } from "@/store";
import { setCredentials } from "@/features/auth/auth.slice";
import { authService } from "@/services/auth.service";
import { cn } from "@/utils/index";
import toast from "react-hot-toast";

type Mode = "email" | "otp";

const emailSchema = z.object({
  email: z.string().email("Enter a valid email"),
  password: z.string().min(8, "Min 8 characters"),
});

const otpSchema = z.object({
  phone: z.string().regex(/^[6-9]\d{9}$/, "Enter valid 10-digit Indian mobile number"),
});

type EmailForm = z.infer<typeof emailSchema>;
type OtpForm = z.infer<typeof otpSchema>;

export default function LoginPage() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [mode, setMode] = useState<Mode>("email");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");

  const emailForm = useForm<EmailForm>({ resolver: zodResolver(emailSchema) });
  const otpForm = useForm<OtpForm>({ resolver: zodResolver(otpSchema) });

  const handleEmailLogin = async (data: EmailForm) => {
    setIsLoading(true);
    try {
      const res = await authService.login(data);
      dispatch(setCredentials({ user: res.data.user, tokens: res.data.tokens }));
      toast.success("Welcome back! 🎉");
      router.push("/");
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : "Login failed. Please try again.";
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSendOtp = async (data: OtpForm) => {
    setIsLoading(true);
    try {
      setPhone(data.phone);
      await authService.sendOtp({ phone: data.phone });
      setOtpSent(true);
      toast.success(`OTP sent to +91 ${data.phone}`);
    } catch {
      toast.error("Failed to send OTP. Try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerifyOtp = async () => {
    if (otp.length !== 6) {
      toast.error("Enter 6-digit OTP");
      return;
    }
    setIsLoading(true);
    try {
      const res = await authService.verifyOtp({ phone, otp });
      dispatch(setCredentials({ user: res.data.user, tokens: res.data.tokens }));
      toast.success("Logged in successfully! 🎉");
      router.push("/");
    } catch {
      toast.error("Invalid OTP. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white rounded-[2rem] shadow-2xl border border-cream-100 overflow-hidden"
      >
        {/* Header Section */}
        <div className="relative bg-maroon py-12 px-8 text-center bg-gradient-to-br from-maroon to-maroon/90">
          <motion.div
            initial={{ y: -10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="relative z-10"
          >
            <h2 className="text-3xl font-bold text-gold mb-2 font-serif" style={{ textShadow: "0 2px 4px rgba(0,0,0,0.3)" }}>
              Welcome Back
            </h2>
            <p className="text-white/90 text-sm font-medium">
              Sign in to your Archana Sweets account
            </p>
          </motion.div>
        </div>

        {/* Form Body */}
        <div className="p-8 md:p-10 flex flex-col gap-8">
          {/* Auth Mode Switcher */}
          <div className="flex bg-gray-50 p-1.5 rounded-2xl border border-gray-100">
            {(["email", "otp"] as Mode[]).map((m) => (
              <button
                key={m}
                onClick={() => { setMode(m); setOtpSent(false); }}
                className={cn(
                  "flex-1 py-3 px-4 rounded-xl text-sm font-bold transition-all duration-200",
                  mode === m
                    ? "bg-maroon text-white shadow-lg"
                    : "text-maroon hover:bg-gray-100"
                )}
              >
                {m === "email" ? "Email Login" : "Mobile OTP"}
              </button>
            ))}
          </div>

          <div className="min-h-[320px]">
            <AnimatePresence mode="wait">
              {mode === "email" ? (
                <motion.form
                  key="email-form"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 10 }}
                  onSubmit={emailForm.handleSubmit(handleEmailLogin)}
                  className="flex flex-col gap-6"
                >
                  <div className="flex flex-col gap-2.5">
                    <label htmlFor="email" className="text-xs font-bold text-black uppercase tracking-widest ml-1">
                      Email Address
                    </label>
                    <div className="relative group">
                      <div className="absolute left-4 top-1/2 -translate-y-1/2 z-10 text-gray-400 transition-colors group-focus-within:text-maroon">
                        <Mail size={18} />
                      </div>
                      <input
                        {...emailForm.register("email")}
                        id="email"
                        type="email"
                        placeholder="example@mail.com"
                        className="w-full pl-12 pr-4 py-4 rounded-xl border border-gray-200 bg-white text-black placeholder:text-gray-400 focus:outline-none focus:border-maroon focus:ring-4 focus:ring-maroon/10 transition-all text-sm font-medium"
                      />
                    </div>
                    {emailForm.formState.errors.email && (
                      <p className="text-red-600 text-[11px] font-bold ml-1">{emailForm.formState.errors.email.message}</p>
                    )}
                  </div>

                  <div className="flex flex-col gap-2.5">
                    <div className="flex justify-between items-center">
                      <label htmlFor="password" className="text-xs font-bold text-black uppercase tracking-widest ml-1">
                        Password
                      </label>
                      <Link href="/forgot-password" className="text-xs font-bold text-maroon hover:text-maroon/80 transition-colors">
                        Forgot?
                      </Link>
                    </div>
                    <div className="relative group">
                      <div className="absolute left-4 top-1/2 -translate-y-1/2 z-10 text-gray-400 transition-colors group-focus-within:text-maroon">
                        <Lock size={18} />
                      </div>
                      <input
                        {...emailForm.register("password")}
                        id="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="••••••••"
                        className="w-full pl-12 pr-12 py-4 rounded-xl border border-gray-200 bg-white text-black placeholder:text-gray-400 focus:outline-none focus:border-maroon focus:ring-4 focus:ring-maroon/10 transition-all text-sm font-medium"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-300 hover:text-maroon p-1.5 transition-colors"
                      >
                        {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                      </button>
                    </div>
                    {emailForm.formState.errors.password && (
                      <p className="text-red-600 text-[11px] font-bold ml-1">{emailForm.formState.errors.password.message}</p>
                    )}
                  </div>

                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full py-4 bg-maroon hover:opacity-90 text-white rounded-xl font-bold text-sm shadow-xl transition-all active:scale-[0.98] flex items-center justify-center gap-2 mt-2"
                  >
                    {isLoading ? (
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    ) : (
                      <>Sign In <ArrowRight size={16} /></>
                    )}
                  </button>
                </motion.form>
              ) : (
                <motion.div
                  key="otp-form"
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  className="flex flex-col gap-6"
                >
                  {!otpSent ? (
                    <form onSubmit={otpForm.handleSubmit(handleSendOtp)} className="flex flex-col gap-6">
                      <div className="flex flex-col gap-2.5">
                        <label htmlFor="phone" className="text-xs font-bold text-black uppercase tracking-widest ml-1">
                          Mobile Number
                        </label>
                        <div className="relative flex group">
                          <div className="absolute left-0 top-0 bottom-0 flex items-center px-4 bg-gray-50 border-r border-gray-200 rounded-l-xl text-xs font-bold text-black">
                            +91
                          </div>
                          <input
                            {...otpForm.register("phone")}
                            id="phone"
                            type="tel"
                            maxLength={10}
                            placeholder="7709266280"
                            className="w-full pl-16 pr-4 py-4 rounded-xl border border-gray-200 bg-white text-black placeholder:text-gray-400 focus:outline-none focus:border-maroon focus:ring-4 focus:ring-maroon/10 transition-all text-sm font-bold tracking-[0.1em]"
                          />
                        </div>
                        {otpForm.formState.errors.phone && (
                          <p className="text-red-600 text-[11px] font-bold ml-1">{otpForm.formState.errors.phone.message}</p>
                        )}
                      </div>
                      <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full py-4 bg-maroon hover:opacity-90 text-white rounded-xl font-bold text-sm shadow-xl transition-all active:scale-[0.98]"
                      >
                        {isLoading ? (
                          <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        ) : (
                          "Send OTP"
                        )}
                      </button>
                    </form>
                  ) : (
                    <div className="flex flex-col gap-8">
                      <div className="text-center">
                        <p className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-1">Enter OTP sent to</p>
                        <p className="text-lg font-black text-black">+91 {phone}</p>
                      </div>

                      <input
                        type="text"
                        inputMode="numeric"
                        maxLength={6}
                        value={otp}
                        onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))}
                        placeholder="000000"
                        className="w-full text-center text-3xl tracking-[0.5em] py-5 rounded-xl border-2 border-gray-100 bg-gray-50 text-black focus:outline-none focus:border-maroon focus:ring-8 focus:ring-maroon/5 transition-all font-black placeholder:text-gray-200"
                      />

                      <div className="flex flex-col gap-3">
                        <button
                          onClick={handleVerifyOtp}
                          disabled={isLoading}
                          className="w-full py-4 bg-maroon hover:opacity-90 text-white rounded-xl font-bold text-sm shadow-xl transition-all"
                        >
                          {isLoading ? (
                            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                          ) : (
                            "Verify & Login"
                          )}
                        </button>
                        <button
                          onClick={() => setOtpSent(false)}
                          className="text-xs font-bold text-gold hover:text-gold/80 text-center uppercase tracking-widest"
                        >
                          Change Number
                        </button>
                      </div>
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Social login */}
          <div className="flex flex-col gap-6">
            <div className="relative flex items-center">
              <div className="flex-grow border-t border-gray-200"></div>
              <span className="flex-shrink mx-4 text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Social login</span>
              <div className="flex-grow border-t border-gray-200"></div>
            </div>

            <button className="w-full flex items-center justify-center gap-3 py-4 rounded-xl border border-gray-200 bg-white hover:bg-gray-50 transition-all text-xs font-bold text-black shadow-sm active:scale-[0.98]">
              <svg width="18" height="18" viewBox="0 0 24 24">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
              </svg>
              Sign in with Google
            </button>

            <p className="text-center text-xs text-gray-500 font-medium">
              New to Archana Sweets?{" "}
              <Link href="/register" className="text-maroon font-bold hover:opacity-80 transition-opacity underline underline-offset-4 decoration-gold">
                Create an account
              </Link>
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
