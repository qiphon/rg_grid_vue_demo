<script lang="ts" setup>
import { onMounted, reactive, ref } from 'vue'
const props = defineProps({
  params: Object,
})
const rating = ref(0)
onMounted(() => {
  rating.value = props.params?.value
})
</script>
<template>
  <div class="rating-container">
    <span
      v-for="i in 5"
      :key="i"
      class="star"
      :class="{
        'full-star': i <= rating,
        'half-star': i > rating && i < rating + 1,
        'empty-star': i > rating && i > rating + 1,
      }"
    >
      ★
    </span>
    <span class="rating-value">{{ rating.toFixed(1) }}</span>
  </div>
</template>
<style lang="less">
/* 评分样式 */
.rating-container {
  display: flex;
  align-items: center;
}

.star {
  font-size: 18px;
  line-height: 1;
}

.full-star {
  color: gold;
}

.half-star {
  position: relative;
  color: #ccc;
  &:before {
    content: '★';
    position: absolute;
    left: 0;
    top: 0;
    width: 50%;
    overflow: hidden;
    color: gold;
  }
}

.empty-star {
  color: #ccc;
}

.rating-value {
  margin-left: 5px;
  color: #666;
}
</style>
