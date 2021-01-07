<template>
  <div class="container lg:w-3/6 md:w-4/6 xs:w-9/12 p-3 mx-auto">
    <inputRatings/>
    <hr>
    <div class="container" v-for="(review, index) in getAllReviews" :key="index">
      <viewRatings :data="review"/>
    </div>
  </div>
</template>

<script>
import viewRatings from '../components/_base/viewRatings'
import inputRatings from '../components/_base/inputRatings'
import { mapActions, mapGetters } from 'vuex'
export default {
  name: 'Home',
  components: {
    viewRatings,
    inputRatings
  },
  methods: {
    ...mapActions(['getAllReview'])
  },
  computed: {
    ...mapGetters(['getAllReviews'])
  },
  mounted () {
    this.getAllReview()
  }
}
</script>
