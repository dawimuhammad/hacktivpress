<template>
  <div class="home">
    <Carousel/>
    <Articles/>
  </div>
</template>

<script>
// @ is an alias to /src
import Carousel from '@/components/Carousel.vue'
import Articles from '@/components/Articles.vue'

export default {
  name: 'home',
  components: {
    Carousel,
    Articles
  }
}
</script>
