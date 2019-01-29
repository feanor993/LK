<template>
    <nav class='user-nav'>
        <div class='user-nav__list'>
            <router-link :to="item.path"  v-for="item in this.items.items" v-bind:key="item.id" class='user-nav__item'>
                <div class='user-nav__icon' v-html="item.icon"></div>
                <span class="user-nav__link">{{item.text}}</span>
            </router-link>

        </div>
    </nav>
</template>
<script>
import axios from 'axios'
export default {
  name: 'user-nav',
  mounted () {
    axios
      .get('http://lk-test.school-olymp.com/json/userNav.php')
      .then(response => {
        this.items = response.data
      })
  },
  data () {
    return {
      items: {}
    }
  }
}
</script>
<style lang="scss">
    .user-nav__item{
        &:hover{
            .user-nav__link{
                color:  #d59617;
            }
            svg path, svg polygon{
                fill: #d59617;
            }

        }
    }
</style>
<style lang="sass">
    @import "../globalStyles/variables"
    .user-nav
        width: 272px
        height: calc(100vh - 84px)
        position: fixed
        left: 0
        top: 84px
        background-color: #fff
        overflow: hidden
        padding-left: 18px
        padding-right: 27px
        padding-top: 192px
        z-index: 10
        border-right: 1px solid #F1F1F1
        &__item
            display: flex
            border-radius: 3px
            height: 44px
            align-items: center
            padding-left: 17px
            cursor: pointer
            position: relative
            overflow: hidden
            &:before
                content: ''
                display: block
                width: 100%
                height: 100%
                position: absolute
                top: 0
                left: 0
                transform: translateX(-100%)
                transition: .4s ease
                background-color: #fff5e2
                z-index: 1

            /*&_active*/
                /*&:before*/
                    /*transform: none*/
                /*.user-nav__link*/
                    /*color: #d59617*/
                /*svg path, svg polygon*/
                    /*fill: #d59617*/
        &__link
            display: block
            font-family: $bold
            font-size: 14px
            color: #1D1D1D
            transition: .4s  ease
            position: relative
            z-index: 2
        &__icon
            width: 30px
            height: 30px
            display: flex
            align-items: flex-start
            justify-content: center
            flex-direction: column
            margin-right: 24px
            position: relative
            z-index: 2
            svg
                max-width: 100%
                max-height: 100%
                *
                    transform-origin: center center
                    transition: .3s ease-in-out
    .router-link-exact-active
        .user-nav__link
            color: #d59617
        svg path, svg polygon
            fill: #d59617
        &:before
            transform: none
</style>
