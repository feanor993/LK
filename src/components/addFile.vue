<template>

    <label class="addFile">
        <span class="addFile__btn">Решить задание</span>
        <input type="file" name="add" class="addFile__input" @change="add()">
    </label>

</template>
<script>
import axios from 'axios'

export default {
  name: 'addFile',
  props: {
    maxSize: {
      type: Number,
      default: 1
    }
  },
  methods: {
    add () {
      let file = this.$el.querySelector('input').files[0]

      let btn = this.$el.querySelector('.addFile__btn')

      let name
      if (file) {
        file.name.length > 14
          ? (name = file.name.slice(0, 14) + '...')
          : (name = file.name)
        if (file.size < this.maxSize) {
          btn.textContent = name
          const formData = new FormData()
          formData.append('userfile', file)
          axios
            .post('https://httpbin.org/post', formData, {
              headers: {
                'Content-Type': 'multipart/form-data'
              },
              onUploadProgress (progressEvent) {
                console.log(
                  ((progressEvent.loaded * 100) / progressEvent.total).toFixed(
                    2
                  )
                )
              }
            })
            .then(res => {
              console.log(res)
            })
            .catch(err => {
              throw new Error(err)
            })
        } else {
          alert('слишком большой файл')
        }
      }
    }
  }
}
</script>
<style lang="sass">
    @import "../globalStyles/variables"
    .addFile
        display: block
        &__input
            display: none
        &__btn
            display: flex
            justify-content: center
            align-items: center
            font-family: $bold
            font-size: 13px
            color: #FFFFFF
            background-color: #B1CD43
            border-radius: 3px
            min-width: 162px
            min-height: 36px
            width: 162px
            cursor: pointer
            transition: .3s ease-in-out
            &:hover
                opacity: .9
</style>
