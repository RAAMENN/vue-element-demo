<template>
  <div class="carousel">
    <el-carousel :interval="4000" height="600px">
      <el-carousel-item v-for="(item, idx) in picList" :key="idx">
        <el-image style="width: 500px" :src="item[0]" :fit="fit"></el-image>
        <el-image style="width: 500px" :src="item[1]" :fit="fit"></el-image>
      </el-carousel-item>
    </el-carousel>
  </div>
</template>

<script>
import pic from '@/assets/images/A/20200612_134806.jpg'
import pic1 from '@/assets/images/A/20200612_134811.jpg'
import pic2 from '@/assets/images/A/20200612_134816.jpg'
import pic3 from '@/assets/images/A/20200612_134821.jpg'
import pic4 from '@/assets/images/A/20200612_134826.jpg'
import pic5 from '@/assets/images/A/20200612_134831.jpg'
import pic6 from '@/assets/images/A/20200612_134836.jpg'
import pic7 from '@/assets/images/A/20200612_134841.jpg'
import pic8 from '@/assets/images/A/20200612_134846.jpg'
import pic9 from '@/assets/images/A/20200612_134851.jpg'
import picB from '@/assets/images/B/134806.jpg'
import picB1 from '@/assets/images/B/134811.jpg'
import picB2 from '@/assets/images/B/134816.jpg'
import picB3 from '@/assets/images/B/134821.jpg'
import picB4 from '@/assets/images/B/134826.jpg'
import picB5 from '@/assets/images/B/134831.jpg'
import picB6 from '@/assets/images/B/134836.jpg'
import picB7 from '@/assets/images/B/134841.jpg'
import picB8 from '@/assets/images/B/134846.jpg'
import picB9 from '@/assets/images/B/134851.jpg'

export default {
  name: 'home',
  data() {
    return {
      picList: [
        [pic, picB],
        [pic1, picB1],
        [pic2, picB2],
        [pic3, picB3],
        [pic4, picB4],
        [pic5, picB5],
        [pic6, picB6],
        [pic7, picB7],
        [pic8, picB8],
        [pic9, picB9]
      ]
    }
  },
  mounted() {},
  methods: {}
}
</script>
<style lang="less" scoped></style>
