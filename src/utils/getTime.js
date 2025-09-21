export default function getTime(dt, offset, type) {
    const targetDate = new Date((dt + offset) * 1000);

    let result = '';

    const formatter = (options) => new Intl.DateTimeFormat('ru-RU', {
        ...options,
        timeZone: 'UTC'
    }).format(targetDate);


    switch (type) {
        case 'hours':
            result = String(targetDate.getUTCHours()).padStart(2, '0');
            break;
        case 'min':
            result = String(targetDate.getUTCMinutes()).padStart(2, '0');
            break;
        case 'weekday':
            result = formatter({ weekday: 'short' });
            break;
        case 'month':
            result = formatter({ month: 'short' });
            break;
        case 'day':
            result = String(targetDate.getUTCDate()).padStart(2, '0');
            break;
        default:
            result = '';
            break;
    }

    return result;
}