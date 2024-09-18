import { Ref } from "vue";

export type bodyTypeType = "none" | "form-data" | "x-www-form-urlencoded" | "JSON" | "XML";

export type Tab = {
    url: string,
    method: string,
    body?: {
        type: bodyTypeType,
        content?: string | Array<Object>,
    }
}

export type Tabs = Ref<Tab[], Tab[]>;

export type variantsType = "primary" | "secondary" | "default" | "warning" | "success" | "danger";