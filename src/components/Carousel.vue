<template>
    <v-carousel>
        <v-carousel-item v-for="(item,i) in items" :key="i" :src="item.src"></v-carousel-item>
  </v-carousel>
</template>

<script>
  export default {
    data () {
      return {
        items: [
          {
            src: 'https://images.unsplash.com/photo-1521185496955-15097b20c5fe?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=b73970e97b923e72be9355cb15099091&auto=format&fit=crop&w=1547&q=80'
          },
          {
            src: 'https://images.unsplash.com/photo-1511376777868-611b54f68947?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=443ecc7e4ff4ad0f3fbf446325d76ede&auto=format&fit=crop&w=1950&q=80'
          },
          {
            src: 'https://images.unsplash.com/photo-1520085601670-ee14aa5fa3e8?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=cdc4d332eab7ae54a6449ef4918730f5&auto=format&fit=crop&w=1950&q=80'
          }
        ]
      }
    }
  }
</script>

<style>

</style>
