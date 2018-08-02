<template> 
    <v-container fluid>
    <v-layout column>
    <v-flex>
      <v-card flat>
        <v-container fluid grid-list-md>
          <v-layout row wrap>
            <!-- <v-flex v-for="card in cards" v-bind="{ [`xs${card.flex}`]: true }" :key="article.title"> -->
            <v-flex xs4 p-4 v-for="article in articles" :key="article.title">
              <v-card class="article-card">
                <router-link :to='`/article/${article._id}`'>
                    <v-card-title>
                        <div class="title">{{article.title}}</div>
                    </v-card-title>
                    <v-card-media :src="article.imageUrl" height="300px" class="article-card">
                    <!-- <v-container fill-height fluid pa-5>
                      <v-layout row>
                        <v-flex xs12 align-center flexbox>
                            <span color="blue" class="headline text-xs-center article-title" v-text="article.title"></span>
                        </v-flex>
                      </v-layout>
                    </v-container> -->
                  </v-card-media>
                </router-link>

                <v-card-actions>
                  <p>Created by {{ article.author.name }}</p>
                  <v-spacer></v-spacer>
                  <v-btn icon v-on:click="upvoteArticle">
                    <v-icon>thumb_up_alt</v-icon>
                  </v-btn>
                  <v-btn icon v-on:click="downvoteArticle">
                    <v-icon>thumb_down_alt</v-icon>
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-flex>
          </v-layout>
        </v-container>
      </v-card>
    </v-flex>
  </v-layout>
  </v-container>
</template>

<script>
import { mapState } from 'vuex'
import { mapActions } from 'vuex'
import swal from 'sweetalert2'

export default {
  name: 'Sidebar',
  methods: {
    ...mapActions([
      'getArticles'
    ]),
    articleDetails(articleId) {
        swal('Test', `ini article id: ${articleId}`, 'success')
    },
    upvoteArticle: function () {
      swal({
        type: 'success',
        title: 'Yeah ..',
        text: 'Thank you for your appreciation!',
        showConfirmButton: false,
        timer: 1000
      })
    },
    downvoteArticle: function () {
      swal({
        type: 'success',
        title: 'Oh no ..',
        text: 'We wish you have a good sense of reading ..',
        showConfirmButton: false,
        timer: 1000
      })
    }
  },
  created () {
    this.getArticles()
  },
  computed: {
    ...mapState([
      'articles'
    ])
  }
}
</script>

<style>
.article-card:hover {
    opacity: 0.8;
    cursor: pointer;
    transition: 0.4s ease;
}

.article-card {
    opacity: 0.9;
}

.article-card a {
    text-decoration: none;
    color: black;
}

.article-title {
    text-decoration: none;
}
</style>
