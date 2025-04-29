'use client';

import { ReactNode, FC, MouseEvent } from 'react';

interface ButtonProps {
    children: ReactNode;
    onClick?: (event: MouseEvent<HTMLButtonElement>) => void;
    className?: string;
}

const Button: FC<ButtonProps> = ({ children, onClick, className }) => {
    return (
        <button
            onClick={onClick}
            className={`bg-black text-white px-4 py-4 my-8 rounded cursor-pointer w-1/3 hover:bg-opacity-80 transition-all ${className || ''}`}
        >
            {children}
        </button>
    );
};

export default Button;