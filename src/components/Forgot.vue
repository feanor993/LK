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
                    Восстановление пароля
                </div>
                <div class="register-passwordText">
                    Пароль будет отправлен на e-mail.
                </div>
                <form action="https://httpbin.org/post" class="register-form" @submit.prevent="submit">
                    <div>
                        <span class="error-text">Некорректный формат e-mail</span>
                        <input type="text" class="register__input" autocomplete="off" @input="removeError"  placeholder="E-mail" name="userEmail" ref="userEmail" v-model="userEmail">
                    </div>
                    <button class="register__submit" type="submit">Восстановить</button>
                </form>
                <div ref="backendError" class="back-err"></div>

            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'auth',
  data () {
    return {
      userEmail: ''
    }
  },
  methods: {
    submit () {
        let regExpMail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

        if (this.userEmail.match(regExpMail)) {
        let data = new FormData()
        data.append('user_email', this.userEmail)
        axios.post('/app/ajax/rememberPassword.php', data)
          .then(response => {
              ///это вставка ответа с обработчика в текст
              this.$refs.backendError.textContent = response.data
          })
      } else {
        this.$refs.userEmail.classList.add('error')
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
