import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import swal from 'sweetalert2'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    articles: [],
    articlesByAuthor: [],
    articleById: [],
    currentUser: [],
    isLogin: false
  },
  mutations: {
    emptyCommit () {

    },
    updateLoginStatus (state, payload) {
        return state.isLogin = payload
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
    },
    loginAccount ({ commit }, payload) {
      let url =`http://localhost:3000/users/login`
      
      axios({
        method: 'post',
        url: url,
        data: {
            username: payload.username,
            password: payload.password
        }
      })
      .then(function (response) {
        // console.log(response.data.token)
        localStorage.setItem('token', response.data.token)
        commit('updateLoginStatus', true)
        swal('Yeah ..', 'Login Success!', 'success')
      })
      .catch(function (err) {
          console.log(err)
          swal('Ooops ..', `Login Failed! Error: ${err.message}`, 'error')
      })

        commit('emptyCommit')
    }
  }
})
