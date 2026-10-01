import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

// Łączy klasy Tailwinda i rozwiązuje konflikty (wymagane przez komponenty Motion-Primitives).
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
