<template>
    <div class="container my-5">
        <div class="container mb-2 flex justify-between items-end">
            <h1 class="text-left">Review</h1>
            <inputStarRatings v-model="value"/>
        </div>
        <form>
            <input class="bg-gray-300 w-full py-3 px-5 placeholder-black focus:outline-none mb-2" type="text" name="name" id="name" placeholder="Tulis Nama Kamu">
            <textarea class=" bg-gray-300 w-full py-3 px-5 resize-none placeholder-black focus:outline-none" name="comment" id="comment" cols="30" rows="4" placeholder="Tulis Review Terbaikmu"></textarea>
            <div class="btn-group mt-2 flex justify-between items-end">
                <input class="hidden" type="file" name="img" id="img" accept="image/*">
                <label class="bg-gray-300 w-36 h-10 flex justify-center items-center" for="img">Upload Gambar</label>
                <button class=" w-36 h-10 bg-gray-300" id="button" type="button">Kirim</button>
            </div>
        </form>
    </div>
</template>

<script>
import inputStarRatings from './inputStarRatings'
export default {
  name: 'inputRatings',
  data () {
    return {
      value: 0
    }
  },
  components: {
    inputStarRatings
  }
}
</script>

<style scoped>

</style>
