import { ref, onMounted, onUnmounted } from "vue";
import { storageType, useNetworkStatusType, useStorageType } from "../types";

// useStorage hook for sessionStorage and localStorage access
const getItem = (key: string, storage: Storage) => {
    let value = storage.getItem(key);
    if (!value) {
        return null;
    }
    try {
        return JSON.parse(value);
    } catch (error) {
        return value;
    }
}

export const useStorage = (key: string, type: storageType = 'session'): useStorageType => {
    let storage: Storage;
    switch (type) {
        case "session":
            storage = sessionStorage;
            break;
        case "local":
            storage = localStorage;
            break;
        default:
            throw new Error('Invalid storage type');
    }
    const value = ref(getItem(key, storage));
    const setItem = (newValue: any) => {
        value.value = newValue;
        storage.setItem(key, JSON.stringify(newValue));
    }
    
    return [
        value,
        setItem
    ]
}

// useNetworkStatus returns if the client is offline or online
export const useNetworkStatus: useNetworkStatusType = (callback = () => {}) => {
    const updateOnlineStatus = () => {
        const status = navigator.onLine ? 'online' : 'offline';
        callback(status);
    }

    onMounted(() => {
        window.addEventListener('online', updateOnlineStatus);
        window.addEventListener('offline', updateOnlineStatus);
    });

    onUnmounted(() => {
        window.removeEventListener('online', updateOnlineStatus);
        window.removeEventListener('offline', updateOnlineStatus);
    });
}