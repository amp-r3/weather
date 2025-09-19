export default function getTime(dt, type) {
    const milsec = dt * 1000
    const currentDate = new Date(milsec)

    let result = ''

    switch (type) {
        case 'hours':
            result = String(currentDate.getHours()).padStart(2, '0')
            break;
        case 'min':
            result = String(currentDate.getMinutes()).padStart(2, '0')
            break;
        case 'weekday':
            result = currentDate.toLocaleDateString('ru-RU', { weekday: 'short' })
            break;
        case 'month':
            result = currentDate.toLocaleDateString('ru-RU', { month: 'short' })
            break;
        case 'day':
            result = String(currentDate.getDate()).padStart(2, '0')
            break;
        default:
            result = ''
            break;
    }

    return result
}