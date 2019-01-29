<template>
    <div>
        <div class="main__singleBanner"
             :style="{ backgroundImage: 'url(' + this.backgroundImage + ')' }"
        ></div>
        <div class="main__main">
            <span style="margin-bottom: 15px; display: block;" @click="toggleModal">тест</span>
            <div class="main__blocks">
                <div class="main__left">
                    <div class="main__information">
                        <div class="main__time">{{this.information.time}}</div>
                        <div class="main__name">{{this.information.teacher}}</div>
                    </div>
                    <h1 class="main__title">{{this.information.title}}</h1>
                    <div class="main__buttons">
                        <a class="main__button"
                           v-for="button in this.buttons"
                           :href="button.link"
                           :download="button.download"
                           :key="button.id"><span class="main__task main__link" v-text="button.text"></span>
                        </a>
                    </div>
                </div>
                <div class="main__right">
                    <chart-circle
                            :persent="this.chartParams.persent"
                            :radius="this.chartParams.radius"></chart-circle>
                    <addFile :maxSize="this.maxFileSize"></addFile>
                </div>
            </div>
            <div class="main__tabs">
                <span class="main__tab main__tab_active">конспект</span>
                <span class="main__tab">тест</span>
            </div>
            <transition name="modal" v-if="this.showModal">
                <div class="modal-mask">
                    <div class="modal-overlay" @click="toggleModal"></div>
                    <div class="modal-wrapper">
                        <div class="modal-container">
                        </div>
                    </div>
                </div>
            </transition>
        </div>
    </div>
</template>
<script>
import chart from '@/components/chart.vue'
import addFile from '@/components/addFile.vue'

export default {
  name: 'lessonTop',
  components: {
    'chart-circle': chart,
    addFile
  },
  props: {
    chartParams: {
      type: Object,
      required: true
    },
    maxFileSize: {
      type: Number,
      default: 0
    },
    information: {
      type: Object,
      required: true
    },
    buttons: {
      type: Array,
      required: true
    },
    backgroundImage: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      showModal: false
    }
  },
  methods: {
    toggleModal () {
      this.showModal = !this.showModal
    }
  }
}
</script>
<style lang="sass">
    @import "../globalStyles/variables"
    .main
        &__singleBanner
            width: 100%
            height: 268px
            background-color: #B3D1D6
            border-radius: 4px 4px 0 0
            margin-bottom: 36px
            background-size: cover
            background-repeat: no-repeat
            background-position: center center
        &__main
            width: 98%
            margin-left: auto
            margin-right: auto
            padding-left: 105px
            padding-right: 105px
            border-bottom: 1px solid #f5f5f5
            margin-bottom: 35px
            padding-bottom: 14px
        &__blocks
            display: flex
            justify-content: space-between
            margin-bottom: 53px
        &__left
            width: 70%
        &__information
            display: flex
            font-size: 13px
            color: #8E9399
            letter-spacing: 0
            line-height: 17px
            margin-bottom: 19px
        &__time
            padding-left: 25px
            position: relative
            line-height: 17px
            margin-right: 35px
            &:before
                content: ''
                display: block
                position: absolute
                left: 0
                top: 0
                background: transparent url("../assets/clock.svg") no-repeat center center
                background-size: contain
                width: 17px
                height: 17px
        &__name
            position: relative
            line-height: 17px
            &:before
                content: ''
                display: block
                position: absolute
                top: 50%
                transform: translateY(-56%)
                left: -12px
                width: 5px
                height: 5px
                border-radius: 50%
                background-color: #8e9399
        &__title
            font-family: $bold
            font-size: 22px
            color: #1D1D1D
            line-height: 30px
            margin-bottom: 41px
        &__buttons
            display: flex
        &__button
            display: flex
            justify-content: center
            align-items: center
            background-color: #F8F9F9
            border: 1px solid #E6EAEB
            border-radius: 3px
            font-family: $bold
            font-size: 13px
            color: #41454D
            margin-right: 18px
            min-width: 149px
            min-height: 36px
        &__right
            display: flex
            flex-direction: column
            justify-content: space-between
            align-items: center
        &__link
            display: block
            position: relative
            &:before
                content: ''
                display: block
                position: absolute
                left: 0
                top: 50%
                transform: translateY(-50%)
        &__task
            &:before
                background: transparent url("../assets/book.svg") no-repeat center center
                background-size: contain
                width: 10px
                height: 15px
        &__tab
            display: block
            font-family: $bold
            font-size: 11px
            color: rgba(70, 70, 70, 0.3)
            letter-spacing: 1.19px
            position: relative
            text-transform: uppercase
            margin-right: 27px
            overflow: hidden
            transition: .3s ease-in-out
            height: 23px
            cursor: pointer
            &:last-of-type
                margin-right: 0
            &:after
                content: ''
                display: block
                position: absolute
                width: 100%
                height: 2px
                background-color: transparent
                left: 0
                bottom: 0
                transition: .3s ease-in-out
                transform: translateX(-110%)
            &_active
                color: #B1CD43
                &:after
                    background: #B1CD43
                    transform: none
        &__tabs
            display: flex
            margin-bottom: -14px

</style>
<style lang="scss">
.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: table;
  transition: opacity 0.3s ease;
}

.modal-overlay {
  width: 100%;
  height: 100%;
  position: absolute;
  z-index: 1;
  background-color: rgba(0, 0, 0, 0.5);
  transition: opacity 0.3s ease;
}

.modal-wrapper {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 2;
}

.modal-container {
  width: 1018px;
  height: 615px;
  margin: 0 auto;
  background-color: #fff;
  border-radius: 2px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
  transition: all 0.3s ease;
}

.modal-enter {
  opacity: 0;
}

.modal-leave-active {
  opacity: 0;
}

.modal-enter .modal-container,
.modal-leave-active .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}
</style>
