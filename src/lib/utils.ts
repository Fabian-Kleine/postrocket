import { twMerge } from "tailwind-merge";
import clsx from "clsx";
import { methodsType } from "../types";

export function cn(...inputs) {
    return twMerge(clsx(inputs));
}

export function methodColors(method: methodsType) {
    if (method.toLowerCase() == "post") return "text-warning";
    if (method.toLowerCase() == "get") return "text-success";
    if (method.toLowerCase() == "put") return "text-primary-300";
    if (method.toLowerCase() == "patch") return "text-violet-400";
    if (method.toLowerCase() == "delete") return "text-danger-400";
    if (method.toLowerCase() == "head") return "text-success-400";
    if (method.toLowerCase() == "options") return "text-pink-500";
}