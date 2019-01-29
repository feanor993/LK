<template>
    <div>
        <div class="register-content">
            <a href="https://school-olymp.ru/" class="register-mobile-header">
                <img src="../assets/logo.svg" alt="">
            </a>
            <a href="https://school-olymp.ru/" class="register-logo">
                <img src="../assets/logo.svg" alt="">
            </a>
            <div class="register-form-wrap">
                <div class="register__title">
                    Вход

                </div>
                <form class="register-form" @submit.prevent="submit">
                    <div>
                        <input type="text" class="register__input" @input="removeError" autocomplete="off" placeholder="E-mail" name="userEmail" ref="email">
                    </div>
                    <div>
                        <input type="password" class="register__input" @input="removeError" autocomplete="off" placeholder="Пароль" name="userPassword" ref="pass">
                    </div>
                    <div class="register__forgot" @click="setForgot()">Забыли пароль?</div>
                    <button class="register__submit" type="submit">Войти</button>
                </form>
                <div class="create-block">
                    <div class="create-text">Нет аккаунта?</div>
                    <div class="create-link" @click="setRegister()">Создать</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
  name: 'auth',
  methods: {
    submit () {
      return this.$parent.submit()
    },
    removeError () {
      return this.$parent.removeError()
    },
    setForgot () {
      this.$parent._data.active = 'forgot'
    },
    setRegister () {
      this.$parent._data.active = 'register'
    },
    setAuth () {
      this.$parent._data.active = 'auth'
    }
  }
}
</script>
