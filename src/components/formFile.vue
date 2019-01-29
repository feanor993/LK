<template>
    <div class='user-form__ava'>
        <label class='user-form__image'>
            <img class='user-form__pict' alt='' :src='this.img'>
            <input type='file' class='user-form__file' :name='this.name'
                   @change="downloadAvatarka($event, $el)"
            >
            <div class="zagl" v-if="!this.img">
                <div class="zagl-content">
                    <div class="zagl-img">
                        <img src="../assets/photo-camera.svg" alt="">
                    </div>
                    <div class="zagl-text">Загрузить
                        фотографию</div>
                </div>
            </div>
            <div class="zagl zagl2" v-else>
                <div class="zagl-content">
                    <div class="zagl-img">
                        <img src="../assets/photo-camera.svg" alt="">
                    </div>
                    <div class="zagl-text">Загрузить
                        фотографию</div>
                </div>
            </div>
        </label>
        <div class='user-form__fileDescription'>
            {{this.information}}
        </div>
    </div>
</template>
<script>
export default {
  name: 'formFile',
  props: {
    information: {
      type: String,
      default: ''
    },
    name: {
      type: String,
      default: ''
    },
    img: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      file: {}
    }
  },
  methods: {
    downloadAvatarka (evt, elem) {
      let reader = new FileReader()
      reader.onload = e =>
        elem
          .querySelector('.user-form__pict')
          .setAttribute('src', e.target.result)
      reader.readAsDataURL(evt.target.files[0])
      this.img = evt.target.files[0]
      this.$emit('getFiles', evt.target.files[0])
    }
  }
}
</script>
<style lang="scss">
    .user-form__btn{
        margin-left: 155px;
    }
    .user-form__image{
        width: 128px;
        height: 128px;
        overflow: hidden;
        border-radius: 50%;
        position: relative;
        display: block;
        margin-bottom: 10px;
        &:hover{
            .zagl2{
                display: block;
            }
        }
    }
    .zagl{
        position: absolute;
        width: 100%;
        height: 100%;
        border-radius: 50%;
        top: 0;
        left: 0;
        background: url("../assets/man.svg") no-repeat center center / contain;
        z-index: 4;
        cursor: pointer;
        &:hover{
            opacity: .95;
        }
        &.zagl2{
            background: none;
            display: none;
        }
    }
    .zagl-content{
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        color: #ffffff;
        flex-direction: column;
        background-color: rgba(0, 0, 0, 0.6);
    }
    .zagl-text{
        font-size: 13px;
        font-weight: bold;
        line-height: 1.23;
        text-align: center;
        color: #ffffff;
        font-family: "Geometria-Bold", sans-serif;

    }
</style>
<style lang="sass">
    @import "../globalStyles/variables"
    .user-form
        &__ava
            width: 128px
            margin-right: 94px
        &__pict
            width: 128px
            height: 128px
            border-radius: 50%
            display: block
            margin-bottom: 14px
            cursor: pointer
        &__file
            display: none
        &__fileDescription
            font-family: $basic
            font-size: 12px
            color: #83878C
            line-height: 16px
            text-align: center
</style>
