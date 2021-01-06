import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    reviews: []
  },
  mutations: {
    setReviews (state, payload) {
      state.reviews = payload
    }
  },
  actions: {
    getAllReview (context) {
      return new Promise((resolve, reject) => {
        axios.get(process.env.VUE_APP_API_URL + '/review/')
          .then((res) => {
            console.log(res.data)
            context.commit('setReviews', res.data.data)
            resolve(res.data)
          })
          .catch((err) => {
            console.log(err)
            reject(err)
          })
      })
    },
    insertReview (context, payload) {
      console.log(payload)
      return new Promise((resolve, reject) => {
        axios.post(process.env.VUE_APP_API_URL + '/review/', payload)
          .then((res) => {
            resolve(res.data.result)
          })
          .catch((err) => {
            reject(err)
          })
      })
    },
    deleteReview (context, payload) {
      console.log(payload)
      return new Promise((resolve, reject) => {
        axios.delete(process.env.VUE_APP_API_URL + '/review/' + payload)
          .then((res) => {
            resolve(res.data.result)
          })
          .catch((err) => {
            reject(err)
          })
      })
    },
    editReview (context, payload) {
      console.log(payload)
      return new Promise((resolve, reject) => {
        axios.patch(process.env.VUE_APP_API_URL + '/review/' + payload.id, payload.data)
          .then((res) => {
            resolve(res.data.result)
          })
          .catch((err) => {
            reject(err)
          })
      })
    }
  },
  getters: {
    getAllReviews (state) {
      return state.reviews.reverse()
    }
  }
})
