<template>
    <div class="fixed z-10 inset-0 overflow-y-auto">
        <div class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div class="fixed inset-0 transition-opacity" aria-hidden="true">
                <div class="absolute inset-0 bg-gray-500 opacity-40"></div>
            </div>
            <span class="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
            <div class="relative inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-md transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full" role="dialog" aria-modal="true" aria-labelledby="modal-headline">
                <button @click="$emit('event-close')" class="text-red-500 font-medium text-3xl hover:text-gray-800 focus:outline-none absolute top-2 right-3"><b-icon icon="x-circle"></b-icon></button>
                <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                    <form>
                        <InputStarRatings v-model="data.star_rating"/>
                        <textarea v-model="data.comment" class=" bg-gray-300 mt-2 w-full py-3 px-5 resize-none placeholder-black focus:outline-none" name="comment" id="comment" cols="30" rows="4" placeholder="Tulis Review Terbaikmu"></textarea>
                        <div class="btn-group flex justify-between items-end">
                            <label class="bg-gray-300 w-36 h-10 flex justify-center items-center" for="update-image">Update Gambar</label>
                            <input multiple ref="files" class="hidden" @change="handleImage" type="file" accept="image/*" id="update-image">
                            <button @click="$emit('handle-update')" class="button w-36 h-10 bg-gray-300" id="button" type="button">Update</button>
                        </div>
                    </form>
                    <div v-show="show" class="bg-yellow-200 text-red-400 my-3 p-2">{{message}}</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import InputStarRatings from './inputStarRatings'
export default {
  name: 'modal',
  props: {
    data: {
      type: Object
    }
  },
  data () {
    return {
      message: '',
      show: false
    }
  },
  components: {
    InputStarRatings
  },
  methods: {
    handleImage (e) {
      const imgs = this.$refs.files.files
      if (imgs.length > 4) {
        this.show = !this.show
        this.message = 'Maksimal upload gambar 4'
      } else {
        this.show = !this.show
        this.data.images = [...this.data.images, ...imgs]
      }
    }
  }
}
</script>

<style scoped>

</style>
