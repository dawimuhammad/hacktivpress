import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
// import swal from 'sweetalert2'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    articles: [],
    articlesByAuthor: [],
    articleById: [],
    currentUser: []
  },
  mutations: {
    emptyCommit () {

    },
    updateCurrentUser (state, payload) {
      return state.currentUser = payload
    },
    updateArticles (state, payload) {
      return state.articles = payload
    },
    updateArticlesByAuthor (state, payload) {
      return state.articlesByAuthor = payload
    },
    updateArticleById (state, payload) {
      return state.articleById = payload
    }
  },
  actions: {
    getArticles ({ commit }) {
      axios.get('http://localhost:3000/articles/')

      .then(function (response) {
          if (response) {
            commit('updateArticles', response.data)
          } else {
            console.log(response)
          }
      })
      .catch(function (err) {
          console.log(err)
      })
    }
  }
})
