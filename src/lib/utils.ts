import { twMerge } from "tailwind-merge";
import clsx from "clsx";
import { FormDataType, methodsType } from "../types";

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

export function buildUrlParams(params: Array<FormDataType>): string {
    try {
        const url = new URL("http://example.com"); // just a placeholder URL (it has no use)

        params.filter(param => param.active).forEach(param => {
            url.searchParams.append(param.key, param.value);
        });

        return url.search;
    } catch (error) {
        return "";
    }
}