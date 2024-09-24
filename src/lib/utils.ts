import { twMerge } from "tailwind-merge";
import clsx from "clsx";
import { methodsType } from "../types";

export function cn(...inputs) {
    return twMerge(clsx(inputs));
}

export function methodColors(method: methodsType) {
    if (method.toLowerCase() == "post") return "text-warning";
    if (method.toLowerCase() == "get") return "text-success";
}