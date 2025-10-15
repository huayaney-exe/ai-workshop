import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Get the base site URL for the current environment
 * @returns The base URL without trailing slash
 */
export function getSiteUrl(): string {
  // Check for custom environment variable first
  if (process.env.NEXT_PUBLIC_SITE_URL) {
    return process.env.NEXT_PUBLIC_SITE_URL.replace(/\/$/, '');
  }

  // In production, use Vercel's automatic environment variables
  if (process.env.VERCEL_PROJECT_PRODUCTION_URL) {
    return `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`;
  }

  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`;
  }

  // Fallback to production URL
  if (process.env.NODE_ENV === 'production') {
    return 'https://workshop-lima.getprisma.io';
  }

  // Development fallback
  return 'http://localhost:3000';
}

/**
 * Get a full URL for a given path
 * @param path - The path to append to the base URL
 * @returns Full URL
 */
export function getSiteUrl_(path: string = ''): string {
  const baseUrl = getSiteUrl();
  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  return `${baseUrl}${cleanPath}`;
}
