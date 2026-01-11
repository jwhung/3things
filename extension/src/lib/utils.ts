import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Icon alignment helper - ensures icons are vertically centered
export const iconAlignClass = "flex-shrink-0";
export const iconAlignStyle = { display: 'flex', alignItems: 'center' as const };

// Button text alignment helper
export function getButtonTextClass(size: 'xs' | 'sm' | 'md' = 'sm') {
  const sizes = {
    xs: 'text-[13px] font-medium leading-none pt-[1px]',
    sm: 'text-[15px] font-medium leading-none pt-[2px]',
    md: 'text-[17px] font-medium leading-none pt-[2px]',
  };
  return sizes[size];
}
