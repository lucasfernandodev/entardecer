import type { BackgroundColor } from "../types/settings";

export function isHexColor(value: string): value is BackgroundColor {
  return /^#(?:[0-9a-fA-F]{3}){1,2}$/.test(value);
}