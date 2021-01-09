import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    reviews: [],
    loader: true
  },
  mutations: {
    setReviews (state, payload) {
      state.reviews = payload
    },
    setLoader (state, payload) {
      console.log(payload)
      state.loader = payload
    }
  },
  actions: {
    getAllReview (context) {
      return new Promise((resolve, reject) => {
        axios.get(process.env.VUE_APP_API_URL + '/review/')
          .then((res) => {
            context.commit('setReviews', res.data.data)
            resolve(res.data.data)
          })
          .then((res) => {
            context.commit('setLoader', false)
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
            console.log(res.data)
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
    },
    getLoader (state) {
      return state.loader
    }
  }
})
