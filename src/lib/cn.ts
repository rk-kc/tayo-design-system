import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

/**
 * Combine className arguments and deduplicate Tailwind utilities.
 * `cn("p-2 p-4", isActive && "bg-sun")` → `"p-4 bg-sun"` (the later wins).
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
