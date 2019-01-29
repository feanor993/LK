export default {
  getMonthName (date) {
    let arr = [
      'января',
      'февраля',
      'марта',
      'апреля',
      'мая',
      'июня',
      'июля',
      'августа',
      'сентября',
      'октября',
      'ноября',
      'декабря'
    ]
    return arr[date.getMonth()]
  },
  getWeekDay (date) {
    let days = [
      'воскресенье',
      'понедельник',
      'вторник',
      'среда',
      'четверг',
      'пятница',
      'суббота'
    ]
    return days[date.getDay()]
  }
}
