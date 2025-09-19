import { useEffect, useState } from "react";

export const useTheme = () => {
    const getInitialTheme = () => {
        const savedTheme = localStorage.getItem('theme');
        // По умолчанию светлая тема
        return savedTheme || 'light';
    };

    const [theme, setTheme] = useState(getInitialTheme);

    const toggleTheme = () => {
        setTheme(prevTheme => (prevTheme === 'light' ? 'dark' : 'light'));
    };

    useEffect(() => {
        // Убираем старый класс, чтобы избежать путаницы
        document.body.classList.remove('light', 'dark');
        
        // Добавляем актуальный класс
        document.body.classList.add(theme);
        
        // Сохраняем тему в localStorage
        localStorage.setItem('theme', theme);
    }, [theme]);

    return { theme, toggleTheme };
};