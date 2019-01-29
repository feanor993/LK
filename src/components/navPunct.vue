<template>
    <div>
        <div class="nav__punkt"
             :key="item.idd"
             :class="this.getActive"
             @click="goToVebinar(item)"
             :data-path="item.path"
            >
            <div class="nav__left">
                <div class="nav__itemIcon"
                     :class="item.access"></div>
            </div>
            <div class="nav__right">
                <div class="nav__information">
                    <div class="nav__title">
                        {{item.name}}
                    </div>
                    <div class="nav__date" v-if="item.now">
                        <span style="color: #D0021B">Сейчас идёт</span>
                    </div>
                    <div class="nav__date" v-else>
                        {{item.rusDate}}
                    </div>
                </div>
                <div class="nav__quantity" v-if="!item.point">
                    0
                </div>
                <div class="nav__quantity" v-else :class="item.clName">
                    {{item.point}}
                </div>

            </div>
        </div>
    </div>
</template>
<script>
export default {
  name: 'nav-punkt',
  props: {
    item: {
      type: Object,
      required: true
    }
  },

  methods: {
    goToVebinar (elem) {
      localStorage.setItem('vebinarId', elem.id)
      let rout = '/vebinar/' + elem.path
      this.$router.push(rout)
    }
  },
  computed: {
    getActive () {
      return this.item.active
    }
  }
}
</script>
<style lang="scss">
    .nav__punkt{
        transition: .4s ease;
        &:hover{
            background-color: #f4f4f4;
        }
    }
</style>
