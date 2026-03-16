"use client";

import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import { Sun, Moon } from 'lucide-react';

const themes = [
    { value: 'light', icon: Sun, label: 'Light' },
    { value: 'dark', icon: Moon, label: 'Dark' },
];

export default function ThemeToggle() {
    const { theme, setTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => setMounted(true), []);

    if (!mounted) {
        return <div className="h-8 w-14 rounded-full" style={{ backgroundColor: 'var(--surface-raised)' }} />;
    }

    const isLight = theme === 'light';

    return (
        <div
            role="group"
            aria-label="Theme switcher"
            className="flex items-center gap-0.5 rounded-full p-1"
            style={{
                backgroundColor: 'var(--surface-raised)',
                border: '1px solid var(--border-solid)',
            }}
        >
            {themes?.map(({ value, icon: Icon, label }) => {
                const isActive = theme === value;
                return (
                    <button
                        key={value}
                        onClick={() => setTheme(value)}
                        aria-label={`${label} mode`}
                        aria-pressed={isActive}
                        title={label}
                        className="flex items-center justify-center w-6 h-6 rounded-full transition-all duration-200 cursor-pointer"
                        style={{
                            backgroundColor: isActive
                                ? isLight ? '#0d1f2d' : '#ffffff'
                                : 'transparent',
                            color: isActive
                                ? isLight ? '#ffffff' : '#0d1f2d'
                                : 'var(--text-muted)',
                            boxShadow: isActive ? 'var(--shadow-sm)' : 'none',
                        }}
                    >
                        <Icon size={12} />
                    </button>
                );
            })}
        </div>
    );
}