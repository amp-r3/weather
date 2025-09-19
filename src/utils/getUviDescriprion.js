export const getUviDescription = (uvi) => {
    if (uvi <= 2) return `Низкий`;
    if (uvi <= 5) return `Средний`;
    if (uvi <= 7) return `Высокий`;
    if (uvi <= 10) return `Очень высокий`;
    return `Экстремальный`;
};