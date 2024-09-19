import { twMerge } from "tailwind-merge";
import clsx from "clsx";

export function cn(...inputs) {
    return twMerge(clsx(inputs));
}

export function methodColors(method: string) {
    if (method.toLowerCase() == "post") return "text-warning";
    if (method.toLowerCase() == "get") return "text-success";
}