<template>
    <div class="wrapper">
        <div class="top">
        <header-lk></header-lk>
        </div>
      <div v-if="this.isLogin">
        <div class="content content_user">
          <user-nav></user-nav>
          <div class="main main_user">

            <h1 class="title">{{title}}</h1>
            <div class="main-content">
              <userForm></userForm>
            </div>
          </div>
        </div>
      </div>
      <div v-else>
        <router-link to="/userForm">Авторизуйтесь на сайте</router-link>
      </div>

    </div>
</template>
<script>
import headerLK from '@/components/header.vue'
import userNav from '@/components/userNav.vue'
import userForm from '@/components/userForm.vue'
export default {
  name: 'profile',
  components: {
    'header-lk': headerLK,
    'user-nav': userNav,
    userForm
  },
  data () {
    return {
      title: 'Профиль'
    }
  },
  computed: {
    isLogin () {
      return localStorage.ID
    }
  }
}
</script>
