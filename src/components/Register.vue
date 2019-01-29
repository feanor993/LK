<template>
    <div>
        <div class="register-content">
            <a href="https://school-olymp.ru/" class="register-mobile-header">
                <img src="../assets/logo.svg" alt="">
            </a>
            <div class="register-entrance" @click="setAuth()">Войти</div>
            <a href="https://school-olymp.ru/" class="register-logo">
                <img src="../assets/logo.svg" alt="">
            </a>
            <div class="register-form-wrap">
                <div class="register__title">
                    Регистрация
                </div>
                <form  class="register-form" @submit.prevent="submit">
                    <div>
                        <span class="error-text">ФИО должно состоять из 2-3 слов</span>
                        <input type="text" class="register__input" @input="removeError" autocomplete="off"
                               placeholder="ФИО" name="userName"
                               ref="userName" v-model="userName">
                    </div>
                    <div>
                        <span class="error-text">Некорректный формат e-mail</span>
                        <input type="text" class="register__input" @input="removeError" autocomplete="off"
                               placeholder="E-mail"
                               name="userEmail" ref="userEmail" v-model="userEmail">
                    </div>
                    <div>
                        <span class="error-text">Ваш пароль слишком короткий, нужно минимум 6 символов</span>
                        <input type="password" class="register__input" @input="removeError" autocomplete="off"
                               placeholder="Пароль"
                               name="userPassword" ref="userPassword" v-model="userPassword">
                    </div>
                    <!--<div>-->
                        <!--&lt;!&ndash;<input type="text" class="register__input" @input="removeError" autocomplete="off"&ndash;&gt;-->
                               <!--&lt;!&ndash;placeholder="Телефон"&ndash;&gt;-->
                               <!--&lt;!&ndash;name="userPhone" ref="userPhone">&ndash;&gt;-->
                    <!--</div>-->
                    <button class="register__submit" type="submit">Зарегистрироваться</button>
                </form>
                <div ref="backendError" class="back-err"></div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
// import Inputmask from 'inputmask'
export default {
  name: 'register',
  data () {
    return {
      userPassword: '',
      userEmail: '',
      userName: ''
    }
  },
  // mounted () {
  //   let im = new Inputmask('+7(999)999-9999')
  //   im.mask(this.$refs.userPhone)
  // },
  methods: {
    submit () {
      let data = new FormData()
      let empty = []
      let resisterData = {}
      for (let value in this.$data) {
        if (this.$data[value].length > 1) {
          data.append(value, this.$data[value])
          // resisterData[value] = this.$data[value]
        } else {
          empty.push(value)
        }
      }
      let regExpMail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

      if (!empty.length) {
        let validEmail = this.$refs.userEmail.value.match(regExpMail)
        let validPassword = this.$refs.userPassword.value.length > 6
        let validName = this.$refs.userName.value.split(' ').length >= 2 && this.$refs.userName.value.split(' ').length <= 3
        if (!validEmail) {
          this.$refs.userEmail.previousSibling.classList.add('active')
        }
        if (!validPassword) {
          this.$refs.userPassword.previousSibling.classList.add('active')
        }
        if (!validName) {
          this.$refs.userName.previousSibling.classList.add('active')
        }
        if (validEmail && validPassword && validName) {
          axios.post('http://lk-test.school-olymp.com/app/ajax/addUser.php', data)
            .then(response => {
              console.log(response.data)
              let id = Number(response.data)
              if (!id) {
                this.$refs.backendError.textContent = response.data['USER_TEXT']
              } else {
                localStorage.setItem('ID', id)
                this.$router.push('/profile')
              }
            })
        }
      } else {
        empty.map(el => {
          this.$refs[el].classList.add('error')
        })
      }
    },
    removeError () {
      return this.$parent.removeError()
    },
    setAuth () {
      this.$parent._data.active = 'auth'
    }
  }
}
</script>
