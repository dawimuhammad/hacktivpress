<template>
  <div class="article">
    <v-container fluid class="article-id-fluid">
        <v-layout row>
          <!-- <v-flex xs12 sm6 offset-sm3 style="border: 1px solid green"> -->
          <v-flex xs12 sm6 offset-sm3>
            <v-card-title primary-title>
              <div style="text-align: left">
                <div class="py-2 display-2" style="text-align: center">{{ articleById.title }}</div>
                <div class="py-2 title font-weight-light">{{ articleById.author.username }}</div>
                <div class="py-2 subheading font-weight-light">{{ articleById.time }}</div>
              </div>
            </v-card-title>
            
            <v-card flat>
              <v-card-media :src="articleById.imageUrl" height="500px"></v-card-media>

            <v-card-title>
              <div>
                <p class="subheading font-weight-light article-content">{{ articleById.content }}</p>
              </div>
            </v-card-title>

            </v-card>
          </v-flex>
        </v-layout>
    </v-container>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import { mapState } from 'vuex'

export default {
  data: function () {
    return {

    }
  },
  methods: {
      ...mapActions([
        'getArticleById',
      ])
  },
  computed: {
      ...mapState([
        'articleById',
      ])
  },
  created: function () {
      this.getArticleById(`${this.$route.params.id}`)
  }
}
</script>

<style>
.article-content {
  text-align: justify;
  text-justify: inter-word;
}  
</style>
