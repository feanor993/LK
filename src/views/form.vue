<template>
    <div id="app">
        <div class="register-wrap">
            <div class="register-photo">
                <a href="/" class="register__goBack">
                    На главную
                </a>
            </div>
            <forgot v-if="this.active === 'forgot'"></forgot>
            <register v-if="this.active === 'register'"></register>
            <auth v-if="this.active === 'auth'"></auth>
        </div>
    </div>
</template>
<script>
import axios from 'axios'
import register from '../components/Register.vue'
import forgot from '../components/Forgot'
import auth from '../components/Auth'
export default {
  components: {
    register: register,
    forgot: forgot,
    auth: auth
  },
  data () {
    return {
      active: 'auth'
    }
  },
  methods: {
    getElems () {
      let elems = []
      for (let ref in this.$children[0].$refs) {
        elems.push(this.$children[0].$refs[ref])
      }
      return elems
    },
    getEmpty () {
      return this.getElems().filter(el => el.value.length < 1)
    },
    getData () {
      let info = new FormData()
      let refs = this.$children[0].$refs

      for (let ref in refs) {
        if (ref) {
          info.append(ref, refs[ref].value)
        }
      }
      return info
    },
    logOut () {
      localStorage.removeItem('user_id')
      localStorage.removeItem('ID')
    },
    submit () {
      if (this.getEmpty().length < 1) {
        let formData = this.getData()
        if (!localStorage.getItem('searchObj')) {
          axios.post('http://lk-test.school-olymp.com/app/ajax/auth.php', formData).then(response => {
            console.log('передаю на обработчик http://lk-test.school-olymp.com/app/ajax/auth.php при авторизации без ссылки с публичной части')
            console.log(response.data)
            if (response.data.ID) {
              if (response.data.ID) {
                localStorage.ID = response.data.ID
                this.$router.push('/profile')
              } else {
                this.logOut()
              }
            }
          })
        }
      } else {
        this.addError(this.getEmpty())
      }
    },
    removeError () {
      this.getElems().forEach(el => {
        el.addEventListener('input', function () {
          el.classList.remove('error')
          if (el.parentNode.querySelector('.error-text')) {
            el.parentNode.querySelector('.error-text').classList.remove('active')
          }
        })
      })
    },
    addError (elems) {
      elems.forEach(e => {
        e.classList.add('error')
        if (!e.parentNode.querySelector('.reg-errorSpan')) {
          let errorSpan = document.createElement('span')
          errorSpan.classList.add('reg-errorSpan')
          errorSpan.textContent = 'Заполните обязательное поле'
          e.parentNode.insertBefore(errorSpan, e)
        }
      })
    }
  },
  mounted () {
    if (localStorage.ID && !localStorage.getItem('searchObj')) {
      this.$router.push('/profile')
    }
    // this.$router.push(window.user.path);
  }
}
</script>
<style lang="scss">
    .register-form .error-text{
        font-size: 11px;
        color: red;
        font-family: "Geometria-Bold", sans-serif;
        font-weight: 600;
        margin-bottom: 5px;
        display: none;
        &.active{
            display: block;
        }
    }
    .back-err{
        text-align: center;
        font-family: "Geometria", sans-serif;
        font-size: 20px;
        font-weight: 600;
        color: red;
        margin-top: 20px;
    }
</style>

<style lang="sass" >

    .register-wrap
        display: flex
        width: 100vw
        height: 100vh

    .register-photo
        width: 50vw
        height: 100%
        background: url("../assets/register.jpg") no-repeat center center / cover
        &:after
            content: ''
            display: block
            position: absolute
            width: 100%
            height: 100%
            top: 0
            left: 0
            background: rgba(0, 0, 0, 0.1)

    .register-content
        display: flex
        flex-direction: column
        justify-content: center
        align-items: center
        width: 50vw
        height: 100%
        position: relative
        background-color: #fff

    .register-logo
        transition: .3s ease-in-out
        margin-bottom: 70px
        &:hover
            opacity: .8

    .register__title
        font-family: "Geometria-Bold", sans-serif
        font-size: 32px
        color: #333333
        text-align: center
        line-height: 27px
        margin-bottom: 40px

    .register__input
        display: block
        transition: .3s ease-in-out
        width: 360px
        height: 50px
        border: 1px solid #e0e0e0
        border-radius: 4px
        margin-bottom: 25px
        font-family: "Geometria-Medium", sans-serif
        font-size: 15px
        color: #333333
        padding-left: 20px
        margin-left: auto
        margin-right: auto
        &.error
            border-color: red
        &::placeholder
            font-family: "Geometria-Medium", sans-serif
            font-size: 15px
            color: #CDD0D0
        &:focus
            border-color: #bec1c1

    .register__forgot
        font-family: "Geometria-Medium", sans-serif
        font-size: 14px
        color: #333333
        margin-top: -10px
        display: block
        text-decoration: none
        cursor: pointer

    .register__submit
        display: block
        margin-top: 40px
        background: #FFA42E
        border-radius: 4px
        font-family: "Geometria-Bold", sans-serif
        font-size: 16px
        color: #FFFFFF
        width: 360px
        height: 55px
        cursor: pointer
        -webkit-appearance: none
        transition: .3s ease-in-out
        margin-left: auto
        margin-right: auto
        border: none
        box-shadow: none
        &:hover
            background: #ff9a2b

    .create-block
        margin-top: 50px
        width: 360px
        padding-top: 50px
        border-top: 1px solid #CDD0D0

    .create-text
        font-family: "Geometria-Medium", sans-serif
        font-size: 14px
        color: #333333
        text-align: center
        margin-bottom: 20px

    .create-link
        display: block
        text-align: center
        position: relative
        font-family: "Geometria-Medium", sans-serif
        font-size: 14px
        color: #FFA42E
        text-decoration: none
        width: max-content
        max-width: 60px
        margin-left: auto
        margin-right: auto
        transition: .3s ease-in-out
        transform: translateX(-7px)
        cursor: pointer
        &:hover
            opacity: .8
        &:after
            content: ''
            display: block
            position: absolute
            right: -20px
            top: 50%
            transform: translateY(-50%)
            width: 13px
            height: 10px
            background: url("../assets/createArrow.svg") no-repeat center center / cover

    .reg-errorSpan
        display: block
        font-size: 11px
        color: red
        margin-bottom: 3px

    .register-mobile-header
        display: none

    .register__goBack
        position: absolute
        display: block
        font-family: "Geometria-Medium", sans-serif
        font-size: 16px
        color: #FFFFFF
        text-decoration: none
        top: 51px
        left: 112px
        z-index: 3
        &:before
            content: ''
            display: block
            border-radius: 50%
            left: -15px
            top: 50%
            transform: translate(-100%, -50%)
            border: 1px solid rgba(255, 255, 255, 0.5)
            transition: .3s ease-in-out
            width: 36px
            height: 36px
            background: url("../assets/backDesctop.svg") no-repeat center center /  35%
            position: absolute
        &:hover
            &:before
                border-color: #fff

    .register-entrance
        position: absolute
        display: block
        font-family: "Geometria-Bold", sans-serif
        font-size: 16px
        color: #333333
        top: 50px
        left: 82px
        transition: .3s ease-in-out
        text-decoration: none
        cursor: pointer
        &:before
            content: ''
            display: block
            position: absolute
            top: 46%
            transform: translate(-100%, -50%)
            width: 7px
            height: 13px
            background: url("../assets/backEntrance.svg") no-repeat center center / cover
            left: -15px

        &:hover
            opacity: .8

    .register-passwordText
        font-family: "Geometria-Medium", sans-serif
        font-size: 16px
        color: #333333
        text-align: center
        margin-bottom: 40px
        margin-top: -10px

    @media all and (max-width: 1300px)
        .register-logo
            margin-bottom: 50px
        .register__title
            font-size: 30px
            margin-bottom: 35px
        .register__input
            margin-bottom: 20px
        .create-block
            margin-top: 40px
            padding-top: 40px

    @media all and (max-width: 1000px)
        .register-photo
            display: none
        .register-content
            width: 100vw
        .register__input, .register__submit, .create-block, .register__forgot, .reg-errorSpan, .register-form-wrap
            max-width: 84%
            margin-left: auto
            margin-right: auto
            width: 360px

    @media all and (max-width: 700px)
        .register-logo
            display: none

        .register-mobile-header
            display: block
            width: 100%
            height: 80px
            position: absolute
            left: 0
            top: 0
            background-color: #F1F2F2
            img
                width: 177px
                display: block
                margin-left: auto
                margin-right: auto
                margin-top: 14px
            &:before
                content: ''
                position: absolute
                left: 20px
                width: 40px
                height: 40px
                top: 50%
                border-radius: 50%
                border: 1px solid #CDD0D0
                transform: translateY(-50%)
                background: url("../assets/backMobile.svg") no-repeat center center / 38%

        .register-content
            position: relative
            padding-top: 80px

        .create-block, .register-form-wrap
            max-width: 100%
            width: 100%

        .register-entrance
            top: 106px
            left: 45px
        .register__title
            width: 360px
            max-width: 84%
            font-family: "Geometria-Bold", sans-serif
            font-size: 26px
            color: #333333
            text-align: center
            line-height: 30px
            margin-left: auto
            margin-right: auto

        .register__submit
            margin-top: 30px
        .register-passwordText
            margin-bottom: 30px

    @media all and (max-width: 350px)
        .create-block
            margin-top: 30px
            padding-top: 30px
        .register-mobile-header img
            width: 140px
            margin-top: 18px
</style>
