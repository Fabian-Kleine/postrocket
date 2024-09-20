import { Ref } from "vue";

export type bodyTypeType = "none" | "form-data" | "x-www-form-urlencoded" | "JSON" | "XML";

export type FormDataType = {
    active: boolean | null,
    key: string,
    value: string
}

export type Tab = {
    url: string,
    method: string,
    body: {
        type: bodyTypeType,
        content: {
            formData: Array<FormDataType>,
            xWWWFormData: Array<FormDataType>,
            JSON: string | undefined,
            XML: string | undefined
        },
    }
}

export type Tabs = Ref<Tab[], Tab[]>;

export type variantsType = "primary" | "secondary" | "default" | "warning" | "success" | "danger";

export type storageType = "session" | "local";

export type useStorageType = [Ref<any>, (newValue: any) => void];

export type useNetworkStatusType = (callback: (status: "online" | "offline") => void) => void;