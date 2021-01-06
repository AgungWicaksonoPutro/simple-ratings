<template>
    <div class="container bg-gray-100 flex rounded-md my-3 p-3 relative">
        <div class="lg:w-28 md:w-28">
            <div class="w-12 h-12 rounded-full mx-auto">
                <img class="w-full h-full object-cover rounded-full" src="https://img2.pngdownload.id/20180521/ocp/kisspng-computer-icons-user-profile-avatar-french-people-5b0365e4f1ce65.9760504415269493489905.jpg" alt="">
            </div>
        </div>
        <div class="w-full mx-1 text-left px-2">
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
                <div class="img-container w-44 h-32 m-1">
                    <img class=" w-full h-full object-cover rounded-sm" src="https://topcareer.id/wp-content/uploads/2019/08/70991566060841_sabtu_171.jpg" alt="">
                </div>
            </div>
        </div>
        <div class="w-14">
            <button @click="toogle ()" class="text-gray-500 font-medium text-3xl hover:text-gray-800 focus:outline-none"><b-icon icon="three-dots"></b-icon></button>
        </div>
        <transition name="dropdown">
            <div v-show="show" v-click-outside="hide" class="drop-button absolute top-11 right-5 bg-gray-400 z-10 w-32 box-border overflow-hidden">
                <ul class="nav-links text-left">
                    <li class="nav-link font-bold hover:bg-gray-300 px-4 pt-2"><a href="#">Edit</a></li>
                    <li class="nav-link font-bold hover:bg-gray-300 px-4 pb-2"><a href="#">Delete</a></li>
                </ul>
            </div>
        </transition>
    </div>
</template>

<script>
import moment from 'moment'
import ClickOutside from 'vue-click-outside'
import starRatings from './starRatings'
export default {
  name: 'viewRatings',
  props: ['data'],
  data () {
    return {
      show: false,
      rating: 3
    }
  },
  components: {
    starRatings
  },
  methods: {
    toogle () {
      this.show = !this.show
    },
    hide () {
      this.show = false
    },
    getDate (a) {
      moment.locale('id')
      return moment(a).format('LL')
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
     transform: translateX(31px);
}
.dropdown-leave-active {
     transform: translateX(-31px);
}
.dropdown-enter-active, .dropdown-leave-active {
     transition: all 1s;
}
.dropdown-enter, .dropdown-leave-to {
     opacity: 0;
     transform: translateY(30px);
}
</style>
