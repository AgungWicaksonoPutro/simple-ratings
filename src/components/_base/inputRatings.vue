<template>
    <form enctype="multipart/form-data">
      <div class="w-full my-5">
        <div class="mb-2 flex justify-between items-end flex-wrap">
            <div class="title text-left text-7xl">Review</div>
            <inputStarRatings v-model="review_star"/>
        </div>
            <input v-model="name" class="bg-gray-300 w-full py-3 px-5 placeholder-black focus:outline-none mb-2" type="text" name="name" id="name" placeholder="Tulis Nama Kamu">
            <textarea v-model="comment" class=" bg-gray-300 w-full py-3 px-5 resize-none placeholder-black focus:outline-none" name="comment" id="comment" cols="30" rows="4" placeholder="Tulis Review Terbaikmu"></textarea>
            <div class="btn-group flex justify-between items-end flex-wrap">
                <input multiple ref="files" @change="handleImage" class="hidden" type="file" name="img" id="img" accept="image/*">
                <label class="bg-gray-300 w-36 h-10 flex justify-center items-center my-2" for="img">Upload Gambar</label>
                <button @click.prevent="sendReview" class="button w-36 h-10 bg-gray-300 my-2" id="button" type="button">Kirim</button>
            </div>
      </div>
    <div v-show="show" class="bg-yellow-200 text-red-400 my-3 p-2">{{message}}</div>
    </form>
</template>

<script>
import inputStarRatings from './inputStarRatings'
import _ from 'lodash'
import { mapActions, mapGetters } from 'vuex'
export default {
  name: 'inputRatings',
  props: ['updateData'],
  data () {
    return {
      show: false,
      message: '',
      review_star: 0,
      name: '',
      comment: '',
      images: []
    }
  },
  methods: {
    ...mapActions(['insertReview', 'getAllReview']),
    handleImage (e) {
      const imgs = this.$refs.files.files
      if (imgs.length > 4) {
        this.show = !this.show
        this.message = 'Maksimal upload gambar 4'
      } else {
        this.show = false
        this.images = [...this.images, ...imgs]
      }
    },
    cleanform () {
      this.review_star = 0
      this.name = ''
      this.comment = ''
      this.images = []
    },
    sendReview () {
      const fd = new FormData()
      fd.append('name', this.name)
      fd.append('review_comment', this.comment)
      fd.append('review_star', this.review_star)
      _.forEach(this.images, file => {
        fd.append('images', file)
      })
      if (this.name !== '' && this.comment !== '' && this.review_star !== 0) {
        this.show = false
        this.insertReview(fd)
          .then((res) => {
            this.getAllReview()
            this.cleanform()
          })
          .catch((err) => {
            console.log(err)
          })
      } else {
        this.show = !this.show
        this.message = 'Pastikan anda sudah mengisi name, comment dan bintang'
      }
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
