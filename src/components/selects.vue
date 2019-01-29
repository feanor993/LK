<template>
    <div>
        <select class='user-form__select'
                :data-text="this.dataText"
                :name='this.customName'
                :data-value="this.value"
                >
            <option v-for="opt in this.customOptions"
                    :value="opt.value"

                    v-text="opt.name"
                    :key="opt.id"
            >{{opt}}</option>
        </select>
    </div>
</template>
<script>
export default {
  name: 'userSelects',
  props: {
    dataText: {
      type: String,
      default: ''
    },
    customOptions: {
      type: Array,
      required: true
    },
    customName: {
      type: String,
      required: true
    },
    value: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      val: {}
    }
  },
  methods: {
    sun () {
      let wrapperClass = 'select-wrapper'

      let resultClass = 'result-wrapper'

      let listClass = 'options-list'

      let itemClass = 'options-item'
      let select = this.$el.querySelector('select')

      let options = select.querySelectorAll('option')
      let self = this
      setTimeout(() => {
        let result = document.createElement('div')
        result.classList.add(resultClass)
        let selectedOpt = [...options].filter(opt => opt.value === this.$el.querySelector('select').dataset.value)
        if (selectedOpt.length) {
          select.value = selectedOpt[0].value
          result.textContent = selectedOpt[0].textContent
        } else {
          select.value = ''
          result.textContent = this.dataText
        }
        select.hidden = true
        let wrapper = document.createElement('div')
        wrapper.classList.add(wrapperClass)
        let list = document.createElement('ul')
        list.classList.add(listClass)
        options.forEach(option => {
          let item = document.createElement('li')
          item.textContent = option.textContent || option.value
          item.classList.add(itemClass)
          item.setAttribute('rel', option.value)
          list.appendChild(item)
          item.addEventListener('click', function () {
            list.classList.remove('active')
            select.value = this.getAttribute('rel')
            result.textContent = this.textContent.trim()
            result.classList.remove('active')
            self.val.value = this.getAttribute('rel')
            self.val.label = this.textContent.trim()
            self.$emit('getValue', self.val)
          })
        })
        result.addEventListener('click', function () {
          list.classList.toggle('active')
          this.classList.toggle('active')
        })
        wrapper.appendChild(result)
        wrapper.appendChild(list)
        select.parentNode.appendChild(wrapper)
        document.addEventListener('mousedown', function (e) {
          if (
            !(
              e.target.classList.contains(resultClass) ||
                        e.target.classList.contains(wrapperClass) ||
                        e.target.classList.contains(listClass) ||
                        e.target.classList.contains(itemClass)
            )
          ) {
            document
              .querySelectorAll('.' + resultClass)
              .forEach(res => res.classList.remove('active'))
            document
              .querySelectorAll('.' + listClass)
              .forEach(list => list.classList.remove('active'))
          }
        })
      }, 15)
    }
  },

  mounted () {
    this.sun()
  }
}
</script>
<style lang="sass">
    @import "../globalStyles/variables"
    .select-wrapper
        width: 228px
        position: relative

    .options-list
        max-height: 0
        overflow-x: hidden
        transition: .1s ease-in-out
        position: absolute
        left: 0
        top: 39px
        width: 100%
        opacity: 0
        background-color: #fff
        z-index: 2
        border: 1px solid #DFE0E0
        border-radius: 0 0 4px 4px
        box-shadow: 0 3px 18px 2px rgba(0, 0, 0, 0.1)
        &.active
            max-height: 1000px
            opacity: 1

    .result-wrapper
        display: flex
        align-items: center
        padding: 0 2%
        font-family: $basic
        font-size: 14px
        color: #333333
        border: 1px solid #DFE0E0
        border-radius: 3px
        width: 228px
        height: 39px
        transition: .3s ease-in-out
        margin: 0
        position: relative
        cursor: pointer
        padding-left: 15px
        &:after
            content: ''
            position: absolute
            right: 10px
            top: calc(50% - 9px)
            width: 17px
            height: 17px
            background: url("../assets/arrowDown.svg") no-repeat center center
            background-size: contain
            transition: .3s ease-in-out
        &.active
            border: 1px solid #B1CD43
            &:after
                transform: rotate(180deg)
    .options-item
        font-family: $basic
        font-size: 14px
        color: #333333
        height: 37px
        align-items: center
        display: flex
        padding: 0 2%
        cursor: pointer
        transition: .5s ease-in-out
        background-color: #fff
        padding-left: 15px
        &:hover
            background-color: rgba(0, 0, 0, 0.03)
</style>
