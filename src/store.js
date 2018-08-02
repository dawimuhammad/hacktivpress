import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import swal from 'sweetalert2'
import jwt from 'jsonwebtoken'

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
    },
    registerAccount ({ commit }, payload) {
      let url =`http://localhost:3000/users/register`

      axios({
        method: 'post',
        url: url,
        data: {
            username: payload.username,
            password: payload.password
        }
      })
      .then(function (response) {
          console.log(response)
          swal('Yeah ..', 'User has been registered!', 'success')
      })
      .catch(function (err) {
          console.log(err)
          swal('Opps ..', `Something went wrong! Message: ${err.message}`, 'error')
      })

      commit('emptyCommit')
    },
    getArticleById ({ commit }, payload) {
      let url =`http://localhost:3000/articles/${payload}`

      axios.get(url)
      .then(function (response) {
            // console.log(response.data)
            commit('updateArticleById', response.data)
      })
      .catch(function (err) {
          console.log(err)
      })
    },

    getArticlesByAuthor ({ commit }) {
      let decodedToken = jwt.decode(localStorage.getItem('token'))
      
      let url = `http://localhost:3000/articles/author/${decodedToken._id}`
      
      axios.get(url)
      .then(function (response) {
        commit('updateArticlesByAuthor', response.data)
        })
        .catch(function (err) {
          console.log(err)
        })
    },
    postArticle ({commit, dispatch}, payload) {

      let authorId = (jwt.decode(localStorage.getItem('token')))._id

      console.log(authorId)

      let url =`http://localhost:3000/articles/`
      
      axios({
        method: 'post',
        url: url,
        data: {
          author: authorId,
          title: payload.title, 
          content: payload.title, 
          imageUrl: payload.imageUrl, 
          category: payload.category
        }
      })
      .then(function () {
        dispatch('getArticlesByAuthor')
        commit('emptyCommit')
      })
      .catch(function (err) {
          console.log(err)
      })
    },
    updateArticle ({commit}, payload) {
      console.log(payload)
      commit('emptyCommit')
    },
    deleteArticleById ({dispatch}, payload) {
      let url = `http://localhost:3000/articles`
      
      axios({
        method: 'delete',
        url: url,
        data: {
          id: payload
        }
      })
      .then(function (response) {
        console.log(response)
        dispatch('getArticlesByAuthor')
        swal(
          'Deleted!',
          `Article with ID ${ payload } has been deleted.`,
          'success'
        )
      })
      .catch(function (err) {
        console.log(err)
      })
    }
  }
})
