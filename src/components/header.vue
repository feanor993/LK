<template>
    <div>
        <header class="header">
            <router-link to="/" class="header__logo">
                <img src="../assets/logodark.svg" alt="">
            </router-link>
            <div class="header__profile" >
                <div class="header__img"
                     v-if="!!getPhoto()"
                     :style="{ backgroundImage: 'url(' + getPhoto() + ')' }"
                ></div>
                <div class="header__img header__img-ns" v-else>
                    {{getNS() }}
                </div>
                <div class="header__name" v-text="getName()"></div>
                <transition name="slide-fade">
                <div class="header__profile-list" v-if="visible">
                    <router-link to="/profile" class="header__profile__item">Профиль</router-link>
                    <div class="header__profile__item" @click="exit()">Выйти</div>
                </div>
                </transition>
            </div>
        </header>
    </div>

</template>

<script>
export default {
  name: 'headerLK',
  data () {
    return {
      visible: false
    }
  },
  mounted () {
    let self = this
    document.documentElement.addEventListener('click', function (ev) {
      if (ev.target.closest('.header__profile') !== null) {
        self.visible = !self.visible
      } else {
        self.visible = false
      }
    })
  },
  methods: {
    getName () {
      if (localStorage.userInformation) {
        let obj = JSON.parse(localStorage.userInformation)
        return obj.name + ' ' + obj.surname
      } else {
        return 'Неизвестно'
      }
    },
    getNS () {
      if (localStorage.getItem('NS')) {
        return localStorage.getItem('NS')
      } else {
        return null
      }
    },
    getPhoto () {
      if (localStorage.userInformation) {
        let obj = JSON.parse(localStorage.userInformation)
        return obj.photo
      } else {
        return ''
      }
    },
    exit () {
      localStorage.clear()
      this.$router.push('/')
    },
    toggleVisible () {
      this.visible = !this.visible
    }
  }
}
</script>
<style lang="scss">
    body{
        display: block;
    }
    .header__profile-list{
        position: absolute;
        background: #fff;
        border-radius: 4px;
        -webkit-box-shadow: 2px 3px 11px 0 rgba(2,2,2,.2);
        box-shadow: 2px 3px 11px 0 rgba(2,2,2,.2);
        border: 1px solid #eee;
        padding-top: 10px;
        width: 215px;
        z-index: 10;
        top: 120%;
        right: -6px;
    }
    .header__profile-list:after {
        width: 0;
        height: 0;
        border-style: solid;
        border-width: 0 5px 7px;
        border-color: transparent transparent #fff;
        position: absolute;
        top: -7px;
        right: 36px;
    }
    .header__profile__item{
        width: 100%;
        padding: 0 30px;
        color: #767676;
        display: flex;
        align-items: center;
        border-bottom: 1px solid #eee;
        font-size: 13px;
        cursor: pointer;
        transition: color .3s ease-in-out;
        height: 35px;
        &:hover{
            color: #000
        }
    }
    .slide-fade-enter-active {
        transition: all .1s ease;
    }
    .slide-fade-leave-active {
        transition: all .1s cubic-bezier(1.0, 0.5, 0.8, 1.0);
    }
    .slide-fade-enter, .slide-fade-leave-to
        /* .slide-fade-leave-active до версии 2.1.8 */ {
        transform: translateY(10px);
        opacity: 0;
    }
    .header__img-ns.header__img{
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: transparent;
        border: 1px solid #d59617;
        width: 40px;
        height: 40px;
        font-size: 15px;
        font-family: "Geometria-Medium", sans-serif;
        color: #d59617;
        padding-top: 2px;
    }
</style>
<style lang="sass">
    @import "../globalStyles/variables"
    .header
        display: flex
        justify-content: space-between
        align-items: center
        padding: 14px 43px
        background-color: #fff
        border-bottom: 1px solid #F1F1F1
        &__logo
            width: 183px
            transition: .3s ease-in-out
            &:hover
                opacity: .8
            img
                width: 100%
        &__profile
            display: flex
            align-items: center
            position: relative
        &__img
            border-radius: 50%
            background: #FFBB30 center center no-repeat
            background-size: cover
            width: 33px
            height: 33px
            margin-right: 13px
        &__name
            font-size: 14px
            color: #333333
            position: relative
            padding-right: 21px
            transition: .4s ease
            font-family: $medium
            font-weight: 500
            cursor: pointer
            &:hover
                color: #d59617
                &::after
                    background: transparent url("../assets/arrowOrange.svg") no-repeat center center / contain
            &::after
                content: ''
                display: block
                position: absolute
                top: 50%
                transform: translateY(-50%)
                right: 0
                width: 12px
                height: 10px
                background: transparent url("../assets/arrowDown.svg") no-repeat center center
                background-size: contain
                transition: .4s ease
    .header__profile-list
        padding-bottom: 10px
    .header__profile__item
        font-family: $medium
        font-weight: 500
        color: #333333
        transition: .4s ease
        &:hover
            color: #d59617
        &:last-of-type
            border-bottom: none
</style>
