<template>
    <div>
        <form class='user-form' method="post" @submit.prevent="postForm">
            <formFile
                    :information="this.forFile.fileInformation"
                    :name="this.forFile.name"
                    :img="photo"
                    @getFiles="getFiles"
            ></formFile>
            <div class="user-form__content">
                <div class="user-form__block">
                    <div class='user-form__subtitle'>
                        Основная информация
                    </div>
                    <label class="user-form__label">
                        <span class='user-form__inputName'>Фамилия*</span>
                        <input type="text"
                               class="user-form__input user-form__input_req"
                               v-model="userData.surname"
                               name="surname"
                               ref="surname"
                        >
                    </label>

                    <label class="user-form__label">
                        <span class='user-form__inputName'>Имя*</span>
                        <input type="text"
                               class="user-form__input user-form__input_req"
                               v-model="userData.name"
                               name="name"
                               ref="name"
                        >
                    </label>
                    <label class="user-form__label">
                        <span class='user-form__inputName'>Отчество*</span>
                        <input type="text"
                               class="user-form__input user-form__input_req"
                               v-model="userData.secondName"
                               name="secondName"
                               ref="secondName"
                        >
                    </label>

                </div>
                <div class="user-form__block">
                    <div class='user-form__subtitle'>
                        Контакты
                    </div>
                    <label class="user-form__label">
                        <span class="user-form__inputName">Телефон*</span>

                        <input type="text" class="user-form__input user-form__input_req"
                               v-model="userData.phoneNumber"
                               name="phoneNumber"
                               ref="phoneNumber"
                        >
                    </label>
                    <label class="user-form__label">
                        <span class="user-form__inputName">E-mail*</span>
                        <input type="text" class="user-form__input user-form__input_req"
                               v-model="userData.email"
                               name="email"
                               ref="email"
                        >
                    </label>
                    <label class="user-form__label">
                        <span class="user-form__inputName">Город</span>
                        <input type="text" class="user-form__input"
                               v-model="userData.city"
                               name="city"
                               ref="city"
                        >
                    </label>
                </div>
                <div class="user-form__block">
                    <div class='user-form__subtitle'>
                        Обучение
                    </div>
                    <label class="user-form__label">
                        <span class="user-form__inputName">Школа</span>
                        <input type="text" class="user-form__input"
                               v-model="userData.school"
                               name="school"
                               ref="school"
                        >
                    </label>
                    <label class="user-form__label">
                        <span class="user-form__inputName">Класс</span>

                        <userSelects
                                :customOptions=this.forSelect.options
                                :dataText=this.forSelect.text
                                :customName=this.forSelect.name
                                :value="schoolClass.value"
                                @getValue="getValue"
                        ></userSelects>
                    </label>
                    <div class='user-form__label'>
                        <span class='user-form__inputName'>К чему готовишься</span>
                        <div class='user-form__checkboxes'>
                            <div class='checkboxes-rit'>
                                <label>
                                    <input type='checkbox'
                                           v-model="training.EGE"
                                           ref="EGE"
                                           name='EGE'>
                                    <span class='checkbox-title'> ЕГЭ </span>
                                </label>
                            </div>
                            <div class='checkboxes-rit'>
                                <label>
                                    <input type='checkbox'
                                           v-model="training.OGE"
                                           ref="OGE"
                                           name='OGE'>
                                    <span class='checkbox-title'> ОГЭ </span>
                                </label>
                            </div>
                            <div class='checkboxes-rit'>
                                <label>
                                    <input type='checkbox'
                                           v-model="training.olymp"
                                           ref="olymp"
                                           name='olymp'>
                                    <span class='checkbox-title'> Олимпиады </span>
                                </label>
                            </div>
                        </div>

                    </div>
                </div>
                <div class="user-form__block">
                    <div class='user-form__subtitle'>
                        Смена пароля
                    </div>
                    <label class="user-form__label">
                        <span class="user-form__inputName">Текущий пароль</span>
                        <input type="password" class="user-form__input"
                               v-model="userData.password"
                               name="password"
                               ref="password"
                        >
                    </label>
                    <label class="user-form__label">
                        <span class="user-form__inputName">Новый пароль</span>
                        <input type="password" class="user-form__input"
                               v-model="userData.newPassword"
                               name="newPassword"
                               ref="newPassword"
                        >
                    </label>
                    <label class="user-form__label">
                        <span class="user-form__inputName">Повторите пароль</span>
                        <input type="password" class="user-form__input"
                               v-model="userData.doublePassow"
                               name="doublePassow"
                               ref="doublePassow"
                        >
                    </label>
                </div>
                <button class='user-form__btn' type='submit'>Сохранить</button>
            </div>
        </form>
    </div>

</template>
<script>

import Inputmask from 'inputmask'
import userSelects from '@/components/selects.vue'
import formFile from '@/components/formFile.vue'
import axios from 'axios'

export default {
  components: {
    formFile,
    userSelects
  },
  name: 'userForm',
  data () {
    return {
      forSelect: {
        options: [
          {
            value: '1',
            name: 'Первый'
          },
          {
            value: '2',
            name: 'Второй'
          },
          {
            value: '3',
            name: 'Третий'
          },
          {
            value: '4',
            name: 'Четвертый'
          }
        ],
        text: 'Выбрать',
        name: 'schoolClass'
      },
      forFile: {
        fileInformation:
                        'Рекомендованный размер фото - не менее 200x200 px, jpg, png',
        name: 'img'
      },
      userData: {},
      training: {},
      photo: '',
      schoolClass: '',
      NS: ''
    }
  },
  created () {
    let data = new FormData()
    data.append('user_id', localStorage.getItem('ID'))
    let obj = {}
    obj['user_id'] = localStorage.getItem('ID')
    console.log(obj)
    axios
      .post('http://lk-test.school-olymp.com/app/ajax/profiles.php', data)
      .then(response => {
        console.log('получаю  при заходе на форму с обработчика http://lk-test.school-olymp.com/app/ajax/profiles.php')
        console.log(response.data)
        if (response.data.schoolClass) {
          this.schoolClass = response.data.schoolClass
        }
        this.NS = response.data.surname.split('')[0].toUpperCase() + response.data.name.split('')[0].toUpperCase()
        localStorage.setItem('NS', response.data.surname.split('')[0].toUpperCase() + response.data.name.split('')[0].toUpperCase())
        this.userData = response.data
        this.training = response.data.training
        this.photo = response.data.photo
        let userInformation = {
          surname: response.data.surname,
          name: response.data.name,
          photo: response.data.photo
        }
        localStorage.setItem('userInformation', JSON.stringify(userInformation))
      })
      .catch(err => {
        throw new Error(err)
      })
  },
  mounted () {
    let buildIcic = (str) => str.trim().split(' ').map(word => word.split('')[0].toUpperCase()).join('')

    let im = new Inputmask('+7(999)999-9999')
    im.mask(this.$refs.phoneNumber)
    this.userData.newPassword = null
    this.userData.doublePassow = null
  },
  methods: {
    postForm () {
      let reqs = this.$el.querySelectorAll('.user-form__input_req')
      reqs.forEach(req => req.addEventListener('input', function () {
        req.classList.remove('error')
      }))
      let empty = [...reqs].filter(req => req.value.length < 1)
      if (empty.length) {
        empty.forEach(e => e.classList.add('error'))
        let top = Math.abs(empty[0].getBoundingClientRect().top)
        let scrollAnimate = setInterval(() => {
          if (top > 0) {
            top -= 10
            document.documentElement.scrollTop = top
          } else {
            clearInterval(scrollAnimate)
          }
        }, 10)
      } else if (this.userData.newPassword || this.userData.doublePassow) {
        this.userData.newPassword === this.userData.doublePassow ? this.sendForm(this.userData) : alert('пароли не совпадают')
      } else {
        this.sendForm(this.userData)
      }
    },
    getValue (resp) {
      this.userData.schoolClass = resp
    },
    getFiles (resp) {
      this.userData.photo = resp
    },
    sendForm (sData) {
      let formData = new FormData()
      for (let e in sData) {
        if (typeof this.userData[e] === 'string' || e === 'photo') {
          formData.append(e, sData[e])
        } else {
          formData.append(e, JSON.stringify(sData[e]))
        }
      }

      axios
        .post('/app/ajax/editUser.php', formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        })
        .then(function (resp) {
          console.log(resp)
        })
        .catch(function () {
          console.log('ошибка')
        })
    }

  }

}
</script>
<style lang="scss">
    .user-form__content {
        width: calc(100% - 220px);
    }
    .user-form__block {
        padding: 30px 0;
        position: relative;
    }
</style>
<style lang="sass" scoped>

    @import "../globalStyles/variables"
    .user-form__checkboxes
        display: flex

    .user-form__label
        display: flex
        align-items: center
        margin-bottom: 13px

    .user-form__input
        display: block
        border: 1px solid #DFE0E0
        border-radius: 3px
        width: 228px
        height: 39px
        transition: .3s ease-in-out
        margin: 0
        font-family: $basic
        font-size: 14px
        color: #333333
        padding: 1% 2%
        padding-left: 15px
        &:focus
            border: 1px solid #B1CD43
        &.error
            border: 1px solid red

    .user-form__inputName
        display: block
        font-family: $medium
        font-size: 14px
        color: #333333
        min-width: 140px
        margin-right: 30px
        text-align: right
        margin-left: -65px

    .user-form
        padding-top: 58px
        padding-bottom: 68px
        padding-left: 104px
        overflow: hidden
        display: flex
        justify-content: space-between
        &__group
            display: flex

        &__block
            &_hasCheckbox
                padding-right: 100px
            &:after
                content: ''
                display: block
                position: absolute
                right: 0
                bottom: 0
                width: 540px
                height: 1px
                background-color: #F1F2F2
            &:last-of-type
                &:after
                    display: none
        &__subtitle
            font-family: $bold
            font-size: 16px
            color: #333333
            margin-bottom: 25px
        &__btn
            background: #B1CD43
            border-radius: 3px
            width: 177px
            height: 44px
            font-family: $bold
            font-size: 15px
            color: #FFFFFF
            border: none
            transition: .3s ease-in-out
            cursor: pointer
            margin-left: 107px
            &:hover
                background-color: #98D930

    .checkboxes-rit
        text-align: center
        display: flex
        justify-content: center
        cursor: pointer
        position: relative
        margin-left: 10px
        margin-right: 22px
        label
            display: block
            width: 100%
            span
                width: 100%
                display: block
                cursor: pointer
                font-family: $basic
                font-size: 14px
                color: #333333
                position: relative
        input[type="checkbox"]
            display: none
            &:checked + span::before
                background: #fff url(../assets/schecked.svg) no-repeat center
                background-size: 80%
                border: 1px solid #B1CD43
            &:checked + span::after
                border: 1px solid #B1CD43
            + span::before
                position: relative
                top: 5px
                left: -2px
                content: ""
                display: inline-block
                cursor: pointer
                border: 1px solid #CDD0D0
                border-radius: 2px
                width: 19px
                height: 19px
                background-color: #fff
            + span::after
                content: ''
                position: absolute
                left: -10px
                top: 50%
                transform: translateY(-39%)
                display: block
                width: 130%
                height: 130%
                border: 1px solid #DFE0E0
                border-radius: 3px
    .checkboxes-rit:last-of-type span::after
        width: 119% !important
</style>
