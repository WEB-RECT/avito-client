
export const timeConvert = (unix: number | string) => {

    const a = new Date(+unix * 1000);

    const months = ['Января','Февраля','Марта','Апреля','Мая','Января','Июля','Августа','Сентября','Октября','Ноября','Декабря'];

    let time = ''

    const year = a.getFullYear();
    const month = months[a.getMonth()];
    const day = a.getDate();
    const hour = a.getHours();
    const min = a.getMinutes();
    const sec = a.getSeconds();

    const currentDate = new Date()

    const currentYear = currentDate.getFullYear();
    const currentMonth = months[currentDate.getMonth()]
    const currentDay = currentDate.getDate();
    const currentHour = currentDate.getHours();
    const currentMin = currentDate.getMinutes();
    const currentSec = currentDate.getSeconds();

    const checkTen = (num: number | string) => {

        let text = ''

        if (+num < 10) {
            text = `0${num}`
        } else {
            text = num.toString()
        }

        return text
    }

    if (currentDay === day) {
        time = `Сегодня ${checkTen(hour)}:${checkTen(min)}`
    } else {
        time = `${checkTen(day)} ${checkTen(month)} ${checkTen(year)}`
    }
    if (day < currentDay) {
        time = `Вчера ${checkTen(hour)}:${checkTen(min)}`
    } else {
        time = `${checkTen(day)} ${checkTen(month)} ${checkTen(year)}`
    }
    if (year === currentYear) {
        time = `${checkTen(day)} ${checkTen(month)} ${checkTen(hour)}:${checkTen(min)}`
    } else {
        time = `${checkTen(day)} ${checkTen(month)} ${checkTen(year)}`
    }

    return time;
}