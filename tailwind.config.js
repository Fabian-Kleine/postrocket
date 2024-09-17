/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        'background': '#FFFFFF',
        'foreground': '#11181C',
        'content1': '#FFFFFF',
        'content2': '#f4f4f5',
        'content3': '#e4e4e7',
        'content4': '#d4d4d8',
        'default': '#d4d4d8',
        'primary': '#006FEE',
        'secondary': '#7828c8',
        'success': '#17c964',
        'warning': '#f5a524',
        'danger': '#DC3545',
        'default-50': '#fafafa',
        'default-100': '#f4f4f5',
        'default-200': '#e4e4e7',
        'default-300': '#d4d4d8',
        'default-400': '#a1a1aa',
        'default-500': '#71717a',
        'default-600': '#52525b',
        'default-700': '#3f3f46',
        'default-800': '#27272a',
        'default-900': '#18181b',
        'primary-50': '#e6f1fe',
        'primary-100': '#cce3fd',
        'primary-200': '#99c7fb',
        'primary-300': '#66aaf9',
        'primary-400': '#338ef7',
        'primary-500': '#006FEE',
        'primary-600': '#005bc4',
        'primary-700': '#004493',
        'primary-800': '#002e62',
        'primary-900': '#001731',
        'secondary-50': '#f2eafa',
        'secondary-100': '#e4d4f4',
        'secondary-200': '#c9a9e9',
        'secondary-300': '#ae7ede',
        'secondary-400': '#9353d3',
        'secondary-500': '#7828c8',
        'secondary-600': '#6020a0',
        'secondary-700': '#481878',
        'secondary-800': '#301050',
        'secondary-900': '#180828',
        'success-50': '#e8faf0',
        'success-100': '#d1f4e0',
        'success-200': '#a2e9c1',
        'success-300': '#74dfa2',
        'success-400': '#45d483',
        'success-500': '#17c964',
        'success-600': '#12a150',
        'success-700': '#0e793c',
        'success-800': '#095028',
        'success-900': '#052814',
        'warning-50': '#fefce8',
        'warning-100': '#fdedd3',
        'warning-200': '#fbdba7',
        'warning-300': '#f9c97c',
        'warning-400': '#f7b750',
        'warning-500': '#f5a524',
        'warning-600': '#c4841d',
        'warning-700': '#936316',
        'warning-800': '#62420e',
        'warning-900': '#312107',
        'danger-50': '#fbeaec',
        'danger-100': '#f8d6d9',
        'danger-200': '#f1aeb4',
        'danger-300': '#ea858f',
        'danger-400': '#e35d6a',
        'danger-500': '#dc3545',
        'danger-600': '#b02a37',
        'danger-700': '#841f29',
        'danger-800': '#58151b',
        'danger-900': '#2c0a0d',
      }
    },
  },
  plugins: [],
}

