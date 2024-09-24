import { ref, onMounted, onUnmounted, watch, onBeforeUnmount } from "vue";
import { storageType, useNetworkStatusType, useOnClickOutsideType, useStorageType, useThemeType } from "../types";

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
        window.dispatchEvent(new StorageEvent('storage', { key }));
    }

    const storageHandler = (event: StorageEvent) => {
        if (event.key === key) {
            value.value = getItem(key, storage);
        }
    };

    window.addEventListener('storage', storageHandler);

    onBeforeUnmount(() => {
        window.removeEventListener('storage', storageHandler);
    });

    return [
        value,
        setItem
    ]
}

// useNetworkStatus returns if the client is offline or online
export const useNetworkStatus: useNetworkStatusType = (callback = () => { }) => {
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

// useOnClickOutside calls callback function when the client clicks outside the provided element
export const useOnClickOutside: useOnClickOutsideType = (ref, callback = () => { }) => {
    function handleClickOutside(event: Event) {
        if (ref.value && !ref.value.contains(event.target)) {
            callback()
        }
    }

    onMounted(() => {
        document.addEventListener('mousedown', handleClickOutside);
    })

    onUnmounted(() => {
        document.removeEventListener('mousedown', handleClickOutside);
    });
}

// useTheme returns the current theme: 'dark' or 'light' when it changes as theme and the theme can be toggle using the toggleTheme function
export const useTheme = (): useThemeType => {
    const body = document.querySelector('body');
    const [isDarkMode, setIsDarkMode] = useStorage("isDarkMode", "local");

    const theme = ref(isDarkMode.value ? 'dark' : 'light');

    const applyTheme = () => {
        if (!body) return;
        theme.value = isDarkMode.value ? 'dark' : 'light';
        body.className = theme.value;
    }

    const toggleTheme = () => {
        setIsDarkMode(!isDarkMode.value);
    };

    onMounted(() => {
        applyTheme();
    });

    watch(isDarkMode, () => {
        applyTheme();
    });

    return {
        theme,
        toggleTheme,
    };
}