<template>
    <div>
        <router-link :to="order.params.link" v-for="order in this.orderList" :data-id="order.id" class="order-block" :key="order.identifier" >
            <span class="order-block__name">{{order.params.name}}</span>
            <div class="order-block__info">
                <div class="order-block__item">{{order.params.date}}</div>
                <div class="order-block__item">{{order.params.price}} руб.</div>
            </div>
        </router-link>
    </div>
</template>
<script>
import axios from 'axios'

export default {
  name: 'order',
  data () {
    return {
      orderList: []
    }
  },
  mounted () {
    axios
      .get('http://apois.school-olymp.ru/lk/json/orders.php')
      .then(response => {
        this.orderList = response.data.orders
      })
  }
}
</script>
<style lang="sass" scoped>
    @import "../globalStyles/variables"
    .order-block
        width: 100%
        display: flex
        justify-content: space-between
        background-color: #fff
        border: 1px solid #F1F1F1
        border-radius: 3px
        padding: 30px 54px 36px 40px
        margin-bottom: 10px
        transition: .3s ease-in-out
        cursor: pointer
        &:hover
            border: 1px solid #b1cd43
        &__name
            font-family: $bold
            font-size: 17px
            color: #333333
            line-height: 25px
            width: auto
            max-width: 60%
        &__item
            font-family: $basic
            font-size: 15px
            color: #83878C
            line-height: 21px
</style>
