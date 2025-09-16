export default function getTime(dt, type) {
    const milsec = dt * 1000
    const currentDate = new Date(milsec)
    const result = 
    type == 'hours' ? currentDate.getHours() : 
    type == 'min' ? currentDate.getMinutes() : 
    type == 'weekday' ? currentDate.toLocaleDateString('ru-RU', {weekday: 'short'}) :
    type == 'month' ? currentDate.toLocaleDateString('ru-RU', {month: 'short'}) : 
    type == 'day' ? currentDate.toLocaleDateString('ru-RU', {day: 'numeric'}) : ''
    return result
}