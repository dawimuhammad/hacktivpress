<template> 
    <div class="admin">
        <v-container fluid>
            <v-layout row class="pb-4">
                <v-flex>
                    <v-container style="width: 75%">
                        <h2>POST AN ARTICLE</h2>
                        <v-form class="my-5">
                            <v-text-field v-model="articleTitle" label="Set an encouraging title .." required></v-text-field>
                            
                            <v-textarea outline v-model="articleContent" label="Type your words here .."></v-textarea>

                            <v-text-field v-model="articleImageUrl" label="Article image url here .."></v-text-field>

                            <v-text-field v-model="articleCategory" label="Type article category .."></v-text-field>

                            <v-btn @click="articleSubmit"> Post </v-btn>
                        </v-form>
                    </v-container>
                </v-flex>
            </v-layout>
            <v-layout row class="pb-4">
                <v-flex xs4 sm4 md4 style="padding: 20px;" v-for="(article, i) in articlesByAuthor" :key="i">
                    <v-card class="article-card">
                        <!-- <router-link :to='`/article/${article._id}`'> -->
                            <v-card-title>
                                <div class="title">{{article.title}}</div>
                            </v-card-title>
                            <v-card-media :src="article.imageUrl" height="300px" class="article-card">
                            </v-card-media>
                        <!-- </router-link> -->

                        <v-card-actions>
                        <v-spacer></v-spacer>
                        <!--  -->

                        <v-dialog v-model="dialog" persistent max-width="500px">
                            <v-btn flat small round slot="activator" color="primary" dark v-on:click="populateUpdateForm(article.title, article.content, article.imageUrl)"><v-icon>build</v-icon></v-btn>
                            <v-card class="dialog-update-article">
                                <v-card-title>
                                    <span class="headline">Article Edit</span>
                                </v-card-title>
                                <v-card-text>
                                    <v-container grid-list-md>

                                        <v-text-field v-model="updateArticleTitle" required></v-text-field>
                            
                                        <v-textarea outline v-model="updateArticleContent" label="Type your words here .."></v-textarea>

                                        <v-text-field v-model="updateArticleImageUrl" label="Article image url here .."></v-text-field>

                                        <!-- <v-text-field v-model="articleCategory" label="Type tags separated by a space .."></v-text-field> -->
                                        
                                    </v-container>
                                </v-card-text>
                                <v-card-actions>
                                    <v-spacer></v-spacer>
                                    <v-btn color="blue darken-1" flat @click.native="dialog = false">Close</v-btn>
                                    <v-btn color="blue darken-1" flat @click.native="updateArticle">Save</v-btn>
                                </v-card-actions>
                            </v-card>
                        </v-dialog>

                        <!--  -->
                        <v-btn icon v-on:click="deleteArticle(article._id)">
                                <v-icon>delete</v-icon>
                        </v-btn>
                        </v-card-actions>
                    </v-card>
                </v-flex>
            </v-layout>
        </v-container>
    </div>
</template>

<script>
import { mapState } from 'vuex'
import { mapActions } from 'vuex'
import swal from 'sweetalert2'

export default {
  name: 'Sidebar',
  components: {

  },
  data: function () {
      return {
          articleTitle: '',
          articleContent: '',
          articleImageUrl: '',
          articleCategory: '',
          dialog: false,
          updateArticleTitle: '',
          updateArticleContent: '',
          updateArticleImageUrl: ''
      }
  },
  methods: {
    ...mapActions([
      'getArticlesByAuthor',
      'postArticle',
      'deleteArticleById',
      'updateArticle'
    ]),
    updateArticle: function () {
        this.dialog = false

        let payload = {
            title: this.updateArticleTitle,
            content: this.updateArticleContent,
            url: this.updateArticleImageUrl
        }

        this.updateArticle(payload)

    },
    populateUpdateForm: function (title, content, url) {
        this.updateArticleTitle = title,
        this.updateArticleContent = content,
        this.updateArticleImageUrl = url
    },
    articleSubmit: function () {
        if (this.articleTitle === '' || this.articleContent === '' || this.articleImageUrl === '') {
            swal('Oopss ..', 'Fill all the fileld!', 'error')
        } else {
            let payload = {
                title: this.articleTitle,
                content: this.articleContent,
                imageUrl: this.articleImageUrl,
                category: this.articleCategory
            }

            this.postArticle(payload)

            this.articleTitle = '',
            this.articleContent = '',
            this.articleImageUrl = '',
            this.articleCategory = ''

            swal('Yeah', 'You have posted an Article!', 'success')
        }
    },
    deleteArticle: function (articleId) {
        swal({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        })
        .then((result) => {
            if (result.value === true) {
                this.deleteArticleById(articleId)
            }
        })
    }
  },
  created () {
    if (localStorage.hasOwnProperty('token')) {
        this.getArticlesByAuthor()
    } else {
        console.log('ga ada token, ga boleh masuk admin page')
        this.$router.push('/')
    }
  },
  computed: {
    ...mapState([
      'articlesByAuthor'
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
}

.article-title {
    text-decoration: none;
}

.dialog-update-article {
    background-color:whitesmoke;
    opacity: 1;
}
</style>
