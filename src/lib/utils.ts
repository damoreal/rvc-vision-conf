import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function projectAssetUrl(url: string) {
  if (url.startsWith("/__l5e/assets-v1/")) {
    return `https://rvc-vision-conf.lovable.app${url}`;
  }

  return url;
}
