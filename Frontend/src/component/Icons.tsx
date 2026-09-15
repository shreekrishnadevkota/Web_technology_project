// Shared SVG icon set — replaces emoji icons used across the app.
// Every icon accepts a `className` so callers control size/color via Tailwind.

interface IconProps {
  className?: string;
}

export function SearchIcon({ className = "h-5 w-5" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} stroke="currentColor">
      <circle cx="11" cy="11" r="7" strokeWidth="2" />
      <path d="M21 21l-4.3-4.3" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

export function UserIcon({ className = "h-5 w-5" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} stroke="currentColor">
      <circle cx="12" cy="8" r="4" strokeWidth="2" />
      <path d="M4 20c0-4 3.5-7 8-7s8 3 8 7" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

export function CartIcon({ className = "h-5 w-5" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} stroke="currentColor">
      <circle cx="9" cy="21" r="1.5" fill="currentColor" stroke="none" />
      <circle cx="18" cy="21" r="1.5" fill="currentColor" stroke="none" />
      <path
        d="M2.5 3h2l2.2 12.2a2 2 0 0 0 2 1.6h8.3a2 2 0 0 0 2-1.6L21 7H6"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function MenuIcon({ className = "h-6 w-6" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} stroke="currentColor">
      <path d="M4 6h16M4 12h16M4 18h16" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

export function CloseIcon({ className = "h-6 w-6" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} stroke="currentColor">
      <path d="M6 6l12 12M18 6L6 18" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

export function HomeIcon({ className = "h-6 w-6" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} stroke="currentColor">
      <path
        d="M4 11l8-7 8 7v8a1 1 0 0 1-1 1h-4v-6H9v6H5a1 1 0 0 1-1-1v-8z"
        strokeWidth="2"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function AccessoryIcon({ className = "h-6 w-6" }: IconProps) {
  // headphones
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} stroke="currentColor">
      <path
        d="M4 14v-2a8 8 0 0 1 16 0v2"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <rect x="3" y="14" width="4" height="6" rx="1.5" strokeWidth="2" />
      <rect x="17" y="14" width="4" height="6" rx="1.5" strokeWidth="2" />
    </svg>
  );
}

export function FigureIcon({ className = "h-6 w-6" }: IconProps) {
  // toy block / puzzle piece style icon for "Figures & Toys"
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} stroke="currentColor">
      <path
        d="M9 4h3a1 1 0 0 1 1 1v2h2a1 1 0 0 1 1 1v3h2a2 2 0 1 1 0 4h-2v3a1 1 0 0 1-1 1h-3v-2a2 2 0 1 0-4 0v2H5a1 1 0 0 1-1-1v-3a2 2 0 1 0 0-4V8a1 1 0 0 1 1-1h4V5a1 1 0 0 1 1-1z"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function OfficeIcon({ className = "h-6 w-6" }: IconProps) {
  // briefcase
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} stroke="currentColor">
      <rect x="3" y="8" width="18" height="12" rx="2" strokeWidth="2" />
      <path d="M8 8V6a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" strokeWidth="2" />
      <path d="M3 13h18" strokeWidth="2" />
    </svg>
  );
}

export function ArrowRightIcon({ className = "h-4 w-4" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} stroke="currentColor">
      <path d="M5 12h14M13 6l6 6-6 6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function ArrowLeftIcon({ className = "h-4 w-4" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} stroke="currentColor">
      <path d="M19 12H5M11 6l-6 6 6 6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function SparkleIcon({ className = "h-6 w-6" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M12 2l1.8 5.6L19 9l-5.2 1.4L12 16l-1.8-5.6L5 9l5.2-1.4L12 2z" />
    </svg>
  );
}

export function PaletteIcon({ className = "h-6 w-6" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} stroke="currentColor">
      <path
        d="M12 3a9 9 0 1 0 0 18c1.1 0 1.8-1 1.2-1.9-.4-.6-.2-1.5.5-1.8.6-.2 1.3-.3 2-.3a4 4 0 0 0 4-4c0-5.5-4-10-7.7-10z"
        strokeWidth="2"
      />
      <circle cx="7.5" cy="10.5" r="1.2" fill="currentColor" stroke="none" />
      <circle cx="11" cy="7" r="1.2" fill="currentColor" stroke="none" />
      <circle cx="15.5" cy="8.5" r="1.2" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function BoltIcon({ className = "h-6 w-6" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M13 2L3 14h6l-1 8 11-14h-7l1-6z" />
    </svg>
  );
}

export function TruckIcon({ className = "h-6 w-6" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} stroke="currentColor">
      <path d="M2 7h11v9H2z" strokeWidth="2" strokeLinejoin="round" />
      <path d="M13 10h4l3 3v3h-7z" strokeWidth="2" strokeLinejoin="round" />
      <circle cx="6" cy="18" r="1.6" strokeWidth="2" />
      <circle cx="17" cy="18" r="1.6" strokeWidth="2" />
    </svg>
  );
}

export function HeartIcon({ className = "h-5 w-5", filled = false }: IconProps & { filled?: boolean }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill={filled ? "currentColor" : "none"}
      className={className}
      stroke="currentColor"
    >
      <path
        d="M12 20s-7-4.4-9.5-9C1 7.5 2.6 4.5 6 4c2-.3 3.8.7 6 3 2.2-2.3 4-3.3 6-3 3.4.5 5 3.5 3.5 7-2.5 4.6-9.5 9-9.5 9z"
        strokeWidth="2"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function StarIcon({ className = "h-4 w-4", filled = true }: IconProps & { filled?: boolean }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill={filled ? "currentColor" : "none"}
      className={className}
      stroke="currentColor"
    >
      <path
        d="M12 2.5l2.9 6 6.6.9-4.8 4.6 1.1 6.6L12 17.4l-5.8 3.2 1.1-6.6-4.8-4.6 6.6-.9L12 2.5z"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function PackageIcon({ className = "h-10 w-10" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} stroke="currentColor">
      <path d="M21 8l-9-5-9 5 9 5 9-5z" strokeWidth="1.6" strokeLinejoin="round" />
      <path d="M3 8v8l9 5 9-5V8" strokeWidth="1.6" strokeLinejoin="round" />
      <path d="M12 13v8" strokeWidth="1.6" />
    </svg>
  );
}

export function CameraIcon({ className = "h-10 w-10" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} stroke="currentColor">
      <path
        d="M4 8h3l1.5-2h7L17 8h3a1 1 0 0 1 1 1v9a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V9a1 1 0 0 1 1-1z"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      <circle cx="12" cy="13" r="3.5" strokeWidth="1.6" />
    </svg>
  );
}

export function PlusIcon({ className = "h-4 w-4" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} stroke="currentColor">
      <path d="M12 5v14M5 12h14" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

export function MinusIcon({ className = "h-4 w-4" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} stroke="currentColor">
      <path d="M5 12h14" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

export function TrashIcon({ className = "h-4 w-4" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} stroke="currentColor">
      <path
        d="M4 7h16M9 7V5a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2m-8 0 1 13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1l1-13"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function EditIcon({ className = "h-4 w-4" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} stroke="currentColor">
      <path
        d="M4 20l4.4-1 10-10-3.4-3.4-10 10L4 20z"
        strokeWidth="2"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function ChevronRightIcon({ className = "h-4 w-4" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} stroke="currentColor">
      <path d="M9 6l6 6-6 6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function EyeIcon({ className = "h-5 w-5" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} stroke="currentColor">
      <path
        d="M1.5 12S5 5 12 5s10.5 7 10.5 7-3.5 7-10.5 7S1.5 12 1.5 12z"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="12" cy="12" r="3" strokeWidth="2" />
    </svg>
  );
}

export function EyeOffIcon({ className = "h-5 w-5" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} stroke="currentColor">
      <path
        d="M3 3l18 18M10.6 10.6a3 3 0 0 0 4.2 4.2M9.9 4.2A10.4 10.4 0 0 1 12 4c7 0 10.5 7 10.5 7a13.2 13.2 0 0 1-3.1 4M6.6 6.6C3.9 8.3 1.5 12 1.5 12s2.1 4.2 6.2 6"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
