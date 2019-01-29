<template>
    <div id="app">
        <router-view/>
    </div>
</template>

<style lang="sass">
    @import "globalStyles/normalize"
</style>

<script>
import axios from 'axios'

export default {
  name: 'LK',

  methods: {
      // https://appdividend.com/2017/08/05/laravel-vuejs-tutorial/


      // https://laravelnews.ru/sozdaem-spa-s-pomoshchyu-vue-i-laravel-chast-3
      // https://laravel.com/docs/5.6/frontend#writing-vue-components
    // не авторизован
    // http:// /vebinars?user_id=false&webinar_id=2455&token=false&auth=false
    // авторизован
    // http:// /vebinars?user_id=9&webinar_id=6&token=ea060bcc3b8da573ed4e13491afb0c18&auth=true
    logOut () {
      localStorage.removeItem('userInformation')
      localStorage.removeItem('ID')
      this.$router.push('/')
    }
  },
  created () {
    localStorage.removeItem('searchObj')

    if (location.search.length) {
      let params = new URLSearchParams(location.search)
      let data = new FormData()
      let searchObj = {}
      for (let param of params) {
        searchObj[param[0]] = param[1]
      }
      localStorage.setItem('searchObj', JSON.stringify(searchObj))
      if (searchObj.auth === 'true') {
        for (let param of params) {
          data.append(param[0], param[1])
        }
        axios.post('http://lk-test.school-olymp.com/app/ajax/auth_token.php', data)
          .then(response => {
            this.logOut()
            localStorage.ID = response.data.ID
            console.log(response.data)
            this.$router.push('/vebinars')
            // location.reload()
          })
          .catch(err => {
            throw new Error(err)
          })
      } else {
        this.logOut()
      }
    } else {
      if (!localStorage.getItem('ID')) {
        this.$router.push('/')
      }
    }
  }
}
</script>
<style>

</style>