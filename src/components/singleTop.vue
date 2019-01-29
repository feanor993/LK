<template>
    <div>
        <div class="main-banner">
            <div class="main-banner__content">
                <div class="main__left">
                    <div class="main__information">
                        <div class="main__time">{{this.information.time}}</div>
                        <div class="main__name">{{this.information.teacher}}</div>
                    </div>
                    <h2 class="main-banner__title" v-text="this.title"></h2>
                    <div v-if="mainButton">
                        <a v-if="String(mainButton.type) === '1'" :href="mainButton.link" target="_blank"
                           class="main-banner__btn">Смотреть трансляцию</a>
                        <div v-if="String(mainButton.type) === '2'" class="main-banner__btn">В обработке</div>
                        <a v-if="String(mainButton.type) === '3'" :href="mainButton.link" target="_blank"
                           class="main-banner__btn">Смотреть запись</a>
                    </div>

                </div>
            </div>
        </div>
        <div class="main__main">
            <div class="main__blocks">
                <div class="main__left">

                    <div class="main__buttons">
                        <a class="main__button"
                           v-for="button in this.buttons"
                           :href="button.link"
                           :download="button.download"
                           :key="button.id"><span class="main__task main__link" v-text="button.text"></span>
                        </a>
                        <a href="#" class="main__button"><span class="button-icon"><img src="../assets/book1.svg" alt="" style="margin-right: 14px;"></span><span class="main__task main__link">Задание</span></a>
                        <a href="#" class="main__button"><span class="button-icon"><img src="../assets/skrepka1.svg" alt="" style="margin-right: 9px;"></span><span class="main__materials main__link">Материалы</span></a>
                        <div @click="showDz()" class="homeWork-add">Решить задание</div>

                    </div>
                </div>
                <div class="main__right" style="display: none;">
                    <chart-circle
                            :persent="this.chartParams.persent"
                            :radius="this.chartParams.radius || 33"></chart-circle>
                </div>
            </div>
            <!--<div class="main__tabs">-->
            <!--<span class="main__tab main__tab_active">конспект</span>-->
            <!--<span class="main__tab">тест</span>-->
            <!--</div>-->
        </div>
        <transition name="modal">
            <dropzone
                    :visible="this.dropzoneVis"
                    @getFiles="getFiles"
                    @delDZ="delDZ"
            ></dropzone>
        </transition>
    </div>

</template>
<script>
import chart from '@/components/chart.vue'
import myDropZone from '@/components/myDropZone.vue'
import axios from 'axios'
export default {
  name: 'singleTop',
  components: {
    'chart-circle': chart,
    'dropzone': myDropZone
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
    title: {
      type: String,
      default: ' '
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
    },
    mainButton: {
      type: Object,
      required: false
    }
  },
  data () {
    return {
      dropzoneVis: false,
      taskForSending: {}
    }
  },
  methods: {
    beforeEnter: function (el) {
      el.style.height = '0'
    },
    enter (el) {
      el.style.height = el.scrollHeight + 'px'
    },
    beforeLeave (el) {
      el.style.height = el.scrollHeight + 'px'
    },
    leave (el) {
      el.style.height = '0'
    },
    showDz () {
      this.dropzoneVis = true
      document.documentElement.style.overflow = 'hidden'
    },

    buildTask (item) {
      this.taskForSending.lesson = item.name
      this.taskForSending.course = this.courseData.id
      this.taskForSending.link = item.buttons.solve.downloadLink
      this.showDz()
    },
    getFiles (file) {
      let data = new FormData()
      let id = localStorage.getItem('ID')
      let webinarPath = location.pathname.split('/')[location.pathname.split('/').length - 1]
      data.append('user_id', id)
      data.append('webinar_code', webinarPath)
      data.append('file', file)
      axios.post('/app/ajax/addHomework.php', data)
        .then(responce => {
          console.log(responce.data)
          this.dropzoneVis = false
          document.documentElement.style.overflow = 'auto'
        })
    },
    delDZ (dz) {
      this.dropzoneVis = false
      document.documentElement.style.overflow = 'auto'
      dz.removeAllFiles(true)
    }
  }
}
</script>
<style lang="scss" scoped>
    .button-icon{
        display: block;
        position: relative;
        &:after{
            content: '';
            display: block;
            position: absolute;
            bottom: -4px;
            right: 4px;
            width: 15px;
            height: 15px;
            background: #f3bc1f url("../assets/littleArrow.svg") no-repeat center center / 60%;
            border-radius: 50%;
            transition: .4s ease;
            transform: translateY(5px);
            opacity: 0;
        }

    }
    .main__button:hover{
        .button-icon:after{
            opacity: 1;
            transform: none;
        }
    }
</style>
<style lang="sass">
    @import "../globalStyles/variables"
    .homeWork-add
        width: 162px
        min-width: 162px
        height: 36px
        border-radius: 3px
        background-color: #b1cd43
        display: flex
        justify-content: center
        align-items: center
        transition: .4s ease
        font-size: 13px
        font-weight: bold
        color: #ffffff
        font-family: $bold
        cursor: pointer
        &:hover
            background-color: #98D930

    .main__time
        padding-left: 25px
        position: relative
        line-height: 17px
        margin-right: 35px

    .main__time:before
        content: ""
        display: block
        position: absolute
        left: 0
        top: 0
        background: transparent url(../assets/clock.svg) no-repeat 50%
        background-size: contain
        width: 17px
        height: 17px

    .main__name
        position: relative
        line-height: 17px

    .main__name:before
        content: ""
        display: block
        position: absolute
        top: 50%
        transform: translateY(-56%)
        left: -12px
        width: 5px
        height: 5px
        border-radius: 50%
        background-color: #fff

    .main__information
        display: flex
        font-size: 13px
        color: #8e9399
        letter-spacing: 0
        line-height: 17px
        margin-bottom: 19px

    .main-banner
        background: #82A3C5
        border-radius: 3px 3px 0 0
        width: 100%
        height: 348px
        display: flex
        flex-direction: column
        justify-content: center
        margin-bottom: 33px
        &__content
            width: 98%
            margin-left: auto
            margin-right: auto
            padding-left: 105px
            padding-right: 105px
        &__title
            font-family: $eb
            font-size: 26px
            color: #FFFFFF
            line-height: 34px
            margin-bottom: 35px
        .main__information
            color: #ffffff !important
        .main__name
            &:before
                background-color: #fff
        .main__time
            &:before
                background-image: url(../assets/clockWhite.svg)
        &__btn
            background-color: #ffbb30
            border-radius: 3px
            font-family: $bold
            font-size: 15px
            color: #FFFFFF
            display: flex
            justify-content: center
            align-items: center
            height: 43px
            width: 184px
            transition: .3s ease-in-out
            &:hover
                background-color: #fdd01b
</style>
