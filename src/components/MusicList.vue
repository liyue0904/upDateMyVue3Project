<template>
<div class="music-list">
  <MusicCard
  v-for="item in list"
  :key="item.id"
  :music="item"
  @play="nextPlay"
  @like="$emit('like', $event)"
/>
</div>
</template>

<script setup lang="ts" name="MusicList">
import type { MusicItem } from '@/data/mockMusic';
import MusicCard from './MusicCard.vue';

defineProps<{
  list:MusicItem[]
}>()
const emit = defineEmits(['play','like'])
function nextPlay(music: MusicItem) {
  emit('play', music)
}
</script>

<style scoped>
.music-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
  gap: 20px;
  padding: 20px;
}
</style>