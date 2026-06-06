export interface NavItem {
  label: string;
  href: string;
  icon?: string;
  badge?: number;
  children?: NavItem[];
}

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

export interface ToastOptions {
  type: "success" | "error" | "warning" | "info";
  title: string;
  description?: string;
  duration?: number;
}

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
}

export interface SelectOption {
  label: string;
  value: string;
}

export interface FilterOption {
  id: string;
  label: string;
  count?: number;
}
