// // функция для добавления маски с телефоном +7
// function mask (phoneInput) {
//   let inputs = document.querySelectorAll(phoneInput)
//   let len = inputs.length
//   if (len >= 1) {
//     inputs.forEach(input => {
//       input.addEventListener(
//         'focus',
//         () =>
//           input.value.length < 1
//             ? (input.value = '+7')
//             : (input.value = input.value)
//       )
//       input.addEventListener(
//         'blur',
//         () =>
//           input.value === '+7'
//             ? (input.value = '')
//             : (input.value = input.value)
//       )
//       input.addEventListener('keydown', function (event) {
//         if (
//           !(
//             event.key == 'ArrowLeft' ||
//             event.key == 'ArrowRight' ||
//             event.key == 'Backspace' ||
//             event.key == 'Tab'
//           )
//         ) {
//           event.preventDefault()
//         }
//         let mask = '+7 (111) 111-11-11'
//         if (/[0-9\+\ \-\(\)]/.test(event.key)) {
//           let currentString = this.value
//           let currentLength = currentString.length
//           if (/[0-9]/.test(event.key)) {
//             if (mask[currentLength] === '1') {
//               this.value = currentString + event.key
//             } else {
//               for (let i = currentLength; i < mask.length; i++) {
//                 if (mask[i] === '1') {
//                   this.value = currentString + event.key
//                   break
//                 }
//                 currentString += mask[i]
//               }
//             }
//           }
//         }
//       })
//     })
//   } else {
//     return []
//   }
// }
//
// // аналог sun, кастомизация селетов
// function customizeSelect (select, options) {
//   let elems = document.querySelectorAll(select)
//   let wrapperClass = options.wrapperClass || 'select-wrapper'
//
//   let resultClass = options.resultClass || 'result-wrapper'
//
//   let listClass = options.listClass || 'options-list'
//
//   let itemClass = options.itemClass || 'options-item'
//   elems.forEach(select => {
//     let text = select.dataset.text
//     select.hidden = true
//     select.value = ''
//     let wrapper = document.createElement('div')
//     wrapper.classList.add(wrapperClass)
//     let result = document.createElement('div')
//     result.classList.add(resultClass)
//     result.textContent = text
//     let list = document.createElement('ul')
//     list.classList.add(listClass)
//     let options = select.querySelectorAll('option')
//     options.forEach(option => {
//       let item = document.createElement('li')
//       item.textContent = option.value || option.textContent
//       item.classList.add(itemClass)
//       list.appendChild(item)
//       item.addEventListener('click', function () {
//         list.classList.remove('active')
//         select.value = this.textContent.trim()
//         result.textContent = this.textContent.trim()
//         result.classList.remove('active')
//       })
//     })
//     result.addEventListener('click', function () {
//       list.classList.toggle('active')
//       this.classList.toggle('active')
//     })
//     wrapper.appendChild(result)
//     wrapper.appendChild(list)
//     select.parentNode.appendChild(wrapper)
//   })
//   document.addEventListener('mousedown', function (e) {
//     if (
//       !(
//         e.target.classList.contains(resultClass) ||
//         e.target.classList.contains(wrapperClass) ||
//         e.target.classList.contains(listClass) ||
//         e.target.classList.contains(itemClass)
//       )
//     ) {
//       document
//         .querySelectorAll('.' + resultClass)
//         .forEach(res => res.classList.remove('active'))
//       document
//         .querySelectorAll('.' + listClass)
//         .forEach(list => list.classList.remove('active'))
//     }
//   })
// }
//
// // для получения данных из формы
// function getFormDate (form) {
//   let data = {}
//   form
//     .querySelectorAll('input, textearea, select')
//     .forEach(elem => (data[elem.name] = elem.value))
//   return JSON.stringify(data)
// }
//
// window.onload = () => {
//   // счетчик 2/15
//   if (document.querySelectorAll('.counter__count')) {
//     let counters = document.querySelectorAll('.counter__count')
//     counters.forEach(counter => {
//       let arr = counter.textContent.trim().split('/')
//       let subline = counter.parentNode.querySelector('.counter__subLine')
//       subline.style.width = (arr[0] / arr[1]) * 100 + '%'
//     })
//   }
//   /// скрытие-раскрытие блоков в навигации по уроку
//   if (document.querySelectorAll('.nav__heading')) {
//     let navHeadings = document.querySelectorAll('.nav__heading')
//     navHeadings.forEach(heading => {
//       heading.addEventListener('click', function () {
//         let content = this.parentNode.querySelector('.nav__item-content')
//         content.classList.toggle('unactive')
//         this.parentNode.classList.toggle('nav__item_showed')
//       })
//     })
//   }
//   // показать-скрыть меню
//   if (document.querySelector('.toggleNav')) {
//     let toggleBtn = document.querySelector('.toggleNav')
//
//     let nav = document.querySelector('.nav')
//
//     let main = document.querySelector('.main')
//     toggleBtn.addEventListener('click', () => {
//       nav.classList.toggle('nav_unvis')
//       main.classList.toggle('main_full')
//     })
//     window.onscroll = () =>
//       toggleBtn.setAttribute('style', `top: ${window.pageYOffset + 30}px`)
//   }
//
//   // svg круг в процентах
//   if (document.querySelectorAll('.chart').length) {
//     let chart = document.querySelector('.chart')
//     let circleAnim = chart.querySelector('.chart svg .inner')
//
//     let persent = chart.querySelector('.chart .persent').textContent
//
//     let radius = circleAnim.getAttribute('r')
//
//     // square = Math.PI * (radius * 2),
//
//     let strokeOffset =
//         Math.PI * (radius * 2) - (Math.PI * (radius * 2) * persent) / 100
//     setTimeout(
//       () => circleAnim.setAttribute('stroke-dashoffset', strokeOffset),
//       1
//     )
//   }
//
//   //  файлридер
//   if (document.querySelector('.addFile')) {
//     let addFile = document.querySelector('.addFile')
//     let addInput = addFile.querySelector('input')
//
//     let addBtn = addFile.querySelector('span')
//     addInput.addEventListener('change', function (e) {
//       let file = e.target.files[0]
//       file.name.length > 14
//         ? (addBtn.textContent = file.name.slice(0, 14) + '...')
//         : (addBtn.textContent = file.name)
//     })
//   }
//
//   // сворачивание разворачивание содержания
//   if (document.querySelector('.main-titles')) {
//     let titles = document.querySelector('.main-titles')
//     let titlesHeading = titles.querySelector('.main-titles__title')
//
//     let titlesContent = titles.querySelector('.main-titles__list')
//     titlesHeading.addEventListener('click', () => {
//       titlesContent.classList.toggle('main-titles__list_showed')
//       titlesHeading.classList.toggle('rotated')
//     })
//   }
//
//   // табы конспект-текст(на главной)
//   if (document.querySelectorAll('.main__tab').length) {
//     let tabs = document.querySelectorAll('.main__tab')
//     tabs.forEach(tab =>
//       tab.addEventListener('click', function () {
//         tabs.forEach(tab => tab.classList.remove('main__tab_active'))
//         this.classList.add('main__tab_active')
//       })
//     )
//   }
//
//   //  анимашка пунктов меню
//   if (document.querySelectorAll('.user-nav__item').length) {
//     const items = document.querySelectorAll('.user-nav__item')
//     items.forEach(item => {
//       item.addEventListener('click', () => {
//         items.forEach(i => i.classList.remove('user-nav__item_active'))
//         item.classList.add('user-nav__item_active')
//       })
//     })
//   }
//
//   // обработчики на форму
//   if (document.querySelector('.user-form')) {
//     // загрузка картинки
//     let avaInput = document.querySelector('.user-form__file')
//
//     let avaPict = document.querySelector('.user-form__pict')
//     avaInput.addEventListener('change', () => {
//       let reader = new FileReader()
//       reader.onload = function (e) {
//         avaPict.setAttribute('src', e.target.result)
//       }
//       reader.readAsDataURL(avaInput.files[0])
//     })
//     // кастомизация селекта
//     customizeSelect('.user-form__select', {})
//     // маска на телефон
//     mask('.phone')
//
//     // проверка заполненности обязательных инпутов и совпадения паролей
//     let userForm = document.querySelector('.user-form')
//
//     let req = document.querySelectorAll('.user-form__input_req')
//
//     let inputs = document.querySelectorAll('.user-form__input')
//
//     let passwords = document.querySelectorAll('input[type="password"]')
//     userForm.addEventListener('submit', function (e) {
//       e.preventDefault()
//       e.stopPropagation()
//       let empty = [...req].filter(item => item.value.length < 1)
//       empty.forEach(elem => elem.classList.add('error'))
//       if (empty.length) {
//         let top = Math.abs(empty[0].getBoundingClientRect().top)
//         let scrollAnimate = setInterval(() => {
//           if (top > 0) {
//             top -= 10
//             document.documentElement.scrollTop = top
//           } else {
//             clearInterval(scrollAnimate)
//           }
//         }, 10)
//       }
//       if (empty.length < 1) {
//         let arr = []
//         passwords.forEach(pas => {
//           arr.push(pas.value)
//         })
//         if (arr[1] !== arr[2]) {
//           alert('пароли не совпадают')
//         } else {
//           let data = getFormDate(this)
//           let xhr = new XMLHttpRequest()
//           xhr.open('POST', 'https://httpbin.org/post', true)
//           xhr.onload = () => {
//             if (xhr.status === 200) xhr.send(data)
//           }
//           xhr.onerror = error => {
//             console.log('произошла ошибка' + error.code)
//           }
//           console.log(data)
//         }
//       }
//     })
//     inputs.forEach(input => {
//       input.addEventListener('focus', function () {
//         this.classList.remove('error')
//       })
//     })
//   }
//
//   // форма авторизации
//   if (document.querySelector('.authorization-info__form')) {
//     let authForm = document.querySelector('.authorization-info__form')
//
//     let tabs = document.querySelectorAll('.authorization-info__tab')
//
//     let inputs = authForm.querySelectorAll('input')
//
//     tabs.forEach(tab => {
//       tab.addEventListener('click', function () {
//         let dataTab = this.dataset.tab
//         tabs.forEach(item =>
//           item.classList.remove('authorization-info__tab_active')
//         )
//         this.classList.add('authorization-info__tab_active')
//         console.log(dataTab)
//       })
//     })
//     authForm.addEventListener('submit', function (e) {
//       e.preventDefault()
//       e.stopPropagation()
//       let empty = [...inputs].filter(input => input.value.length < 1)
//       inputs.forEach(input =>
//         input.addEventListener('focus', function () {
//           this.classList.remove('error')
//         })
//       )
//       if (empty.length >= 1) {
//         empty.forEach(item => item.classList.add('error'))
//       } else {
//         let data = getFormDate(this)
//         let xhr = new XMLHttpRequest()
//         xhr.open('POST', 'https://httpbin.org/post', true)
//         xhr.onload = () => {
//           if (xhr.status === 200) xhr.send(data)
//         }
//         xhr.onerror = error => {
//           console.log('произошла ошибка' + error.code)
//         }
//         console.log(data)
//       }
//     })
//   }
// }
