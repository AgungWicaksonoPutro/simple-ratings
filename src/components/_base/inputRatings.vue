<template>
    <form enctype="multipart/form-data">
      <div class="container my-5">
        <div class="container mb-2 flex justify-between items-end">
            <h1 class="text-left">Review</h1>
            <inputStarRatings v-model="review_star"/>
        </div>
            <input v-model="name" class="bg-gray-300 w-full py-3 px-5 placeholder-black focus:outline-none mb-2" type="text" name="name" id="name" placeholder="Tulis Nama Kamu">
            <textarea v-model="comment" class=" bg-gray-300 w-full py-3 px-5 resize-none placeholder-black focus:outline-none" name="comment" id="comment" cols="30" rows="4" placeholder="Tulis Review Terbaikmu"></textarea>
            <div class="btn-group flex justify-between items-end">
                <input @change="handleImage" class="hidden" type="file" name="img" id="img" accept="image/*">
                <label class="bg-gray-300 w-36 h-10 flex justify-center items-center" for="img">Upload Gambar</label>
                <button @click.prevent="sendReview" class="button w-36 h-10 bg-gray-300" id="button" type="button">Kirim</button>
            </div>
      </div>
    </form>
</template>

<script>
import inputStarRatings from './inputStarRatings'
import { mapActions, mapGetters } from 'vuex'
export default {
  name: 'inputRatings',
  data () {
    return {
      review_star: 0,
      name: '',
      comment: '',
      images: null
    }
  },
  methods: {
    ...mapActions(['insertReview', 'getAllReview']),
    handleImage (e) {
      console.log(e)
      this.images = e.target.files[0]
    },
    cleanform () {
      this.review_star = 0
      this.name = ''
      this.comment = ''
      this.images = null
    },
    sendReview () {
      const fd = new FormData()
      fd.append('name', this.name)
      fd.append('review_comment', this.comment)
      fd.append('review_star', this.review_star)
      fd.append('images', this.images)
      this.insertReview(fd)
        .then((res) => {
          this.getAllReview()
          this.cleanform()
        })
        .catch((err) => {
          console.log(err)
        })
    }
  },
  computed: {
    ...mapGetters(['getAllReviews'])
  },
  components: {
    inputStarRatings
  }
}
</script>

<style scoped>

</style>
