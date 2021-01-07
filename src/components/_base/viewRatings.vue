<template>
    <div class="container bg-gray-100 flex flex-wrap rounded-md my-3 p-3 relative">
        <div class="">
            <div class="w-12 h-12 rounded-full mx-2">
                <img class="w-full h-full object-cover rounded-full" src="https://img2.pngdownload.id/20180521/ocp/kisspng-computer-icons-user-profile-avatar-french-people-5b0365e4f1ce65.9760504415269493489905.jpg" alt="">
            </div>
        </div>
        <div id="set" class="mx-1 text-left px-2">
            <div class="name text-lg">
                <h5>{{data.name}}</h5>
            </div>
            <div class="date text-gray-300">
                <p>{{getDate(data.created_at)}}</p>
            </div>
            <div class="rate">
                <starRatings v-model="data.review_star"/>
            </div>
            <div class="comment">
                <p>{{data.review_comment}}</p>
            </div>
            <div v-if="data.image.length" class="img flex flex-wrap">
                <div class="img-container w-40 h-32 m-1" v-for="(image, index) in data.image" :key="index">
                    <img class=" w-full h-full object-cover rounded-sm" :src="`data:image/png;base64,${image.b64}`" alt="">
                </div>
            </div>
        </div>
        <div class="w-14">
            <button @click="toogle()" class="text-gray-500 font-medium text-3xl hover:text-gray-800 focus:outline-none"><b-icon icon="three-dots"></b-icon></button>
        </div>
        <transition name="dropdown">
            <div v-show="show" v-click-outside="hide" class="drop-button absolute top-11 right-5 bg-gray-400 z-10 w-32 box-border overflow-hidden">
                <ul class="nav-links text-left">
                    <li class="nav-link font-bold hover:bg-gray-300 px-4 pt-2"><a class="w-full" @click="setUpdate(data)" href="javascript:void(0)">Edit</a></li>
                    <li class="nav-link font-bold hover:bg-gray-300 px-4 pb-2"><a class="w-full" @click="delReview(data._id)" href="javascript:void(0)">Delete</a></li>
                </ul>
            </div>
        </transition>
        <modal :data="setUpdateData" v-show="update" @handle-update="updateReview" @event-close="toggleUpdate"/>
    </div>
</template>

<script>
import _ from 'lodash'
import modal from './modal'
import moment from 'moment'
import ClickOutside from 'vue-click-outside'
import starRatings from './starRatings'
import { mapActions } from 'vuex'
export default {
  name: 'viewRatings',
  components: {
    starRatings,
    modal
  },
  props: ['data'],
  data () {
    return {
      show: false,
      update: false,
      setUpdateData: {
        comment: '',
        star_rating: 0,
        images: [],
        name: '',
        id: 0
      }
    }
  },
  methods: {
    ...mapActions(['getAllReview', 'deleteReview', 'editReview']),
    toogle () {
      this.show = !this.show
    },
    hide () {
      this.show = false
    },
    getDate (a) {
      moment.locale('id')
      return moment(a).format('LL')
    },
    delReview (id) {
      this.deleteReview(id)
        .then((res) => {
          this.getAllReview()
          this.hide()
        })
        .catch((err) => {
          console.log(err)
        })
    },
    toggleUpdate () {
      this.update = !this.update
      this.show = false
    },
    setUpdate (data) {
      const tabulasiData = []
      this.setUpdateData.comment = data.review_comment
      this.setUpdateData.star_rating = data.review_star
      this.setUpdateData.name = data.name
      this.setUpdateData.id = data._id
      this.setUpdateData.images = data.image
      this.setUpdateData.images.map((a, index) => {
        const url = `data:image/jpeg;base64,${a.b64}`
        const filename = `image${index}.jpeg`
        this.convertFile(url, filename, 'image/jpeg')
          .then((res) => {
            const isReady = tabulasiData.find(a => {
              console.log(a.name)
              return a.name === res.name
            })
            if (!isReady) {
              tabulasiData.push(res)
            }
          })
      })
      this.setUpdateData.images = tabulasiData
      this.toggleUpdate()
    },
    convertFile (url, filename, mimeType) {
      mimeType = mimeType || (url.match(/^data:([^;]+);/) || '')[1]
      return (fetch(url)
        .then(function (res) { return res.arrayBuffer() })
        .then(function (buf) { return new File([buf], filename, { type: mimeType }) })
      )
    },
    updateReview () {
      const id = this.setUpdateData.id
      const fd = new FormData()
      fd.append('name', this.setUpdateData.name)
      fd.append('review_comment', this.setUpdateData.comment)
      fd.append('review_star', this.setUpdateData.star_rating)
      _.forEach(this.setUpdateData.images, file => {
        fd.append('images', file)
      })
      const containerData = {
        id: id,
        data: fd
      }
      this.editReview(containerData)
        .then((res) => {
          this.getAllReview()
          this.toggleUpdate()
        })
        .catch((err) => {
          console.log(err)
        })
    }
  },
  mounted () {
    this.popupItem = this.$el
  },
  directives: {
    ClickOutside
  }
}
</script>

<style scoped>
.drop-button{
    border-radius: 23px 23px 23px 23px / 23px 0px 23px 23px;
}
.dropdown-enter-active, .dropdown-leave-active {
     transition: all 0.6s;
}
.dropdown-enter, .dropdown-leave-active {
     opacity: 0;
}
.dropdown-enter {
     transform: translateX(-31px);
}
.dropdown-leave-active {
     transform: translateX(31px);
}
.dropdown-enter-active, .dropdown-leave-active {
     transition: all 1s;
}
.dropdown-enter, .dropdown-leave-to {
     opacity: 0;
     transform: translateY(-30px);
}
</style>
