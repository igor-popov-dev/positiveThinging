import { InputHTMLAttributes, ReactNode } from 'react';

export interface AuthInputProps extends InputHTMLAttributes<HTMLInputElement>{
    id: string,
    label: ReactNode
}