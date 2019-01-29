<template>
    <div>
        <div class="goBack">
            <router-link to="/vebinars" class="goBack__link">Все курсы</router-link>
        </div>
    </div>
</template>

<script>
export default {
  name: 'goBack'
}
</script>
<style lang="sass">
    @import "../globalStyles/variables"

    .goBack
        padding: 21px 0
        border-bottom: 1px solid #F1F1F1
        position: relative
        background-color: #fff
        height: 60px
        &__link
            font-family: $bold
            font-size: 17px
            color: #333333
            position: absolute
            left: 0
            top: 0
            height: 100%
            width: 395px
            display: flex
            align-items: center
            transition: .4s ease
            padding-left: 73px
            &:hover
                color: #d59617
                &:before
                    background: transparent url("../assets/arrowLeftOrange.svg") no-repeat center center / contain
            &:before
                content: ''
                display: block
                position: absolute
                top: 44%
                transform: translateY(-50%)
                left: 43px
                width: 18px
                height: 16px
                background: transparent url("../assets/arrowLeft.svg") no-repeat center center / contain
                transition: .4s ease

</style>
