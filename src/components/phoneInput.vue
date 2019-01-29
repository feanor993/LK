<template>
<div>
    <the-mask mask="+7(###)-###-###-##" />
</div>
</template>
<script>
import { TheMask } from 'vue-the-mask'
export default {
  components: { TheMask },
  name: 'maskVue'
}
</script>
<style>
</style>
