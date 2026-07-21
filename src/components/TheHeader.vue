<template>
<header>
    <span class="logo">🎵</span>
    <div class="search-wrapper">
      <input 
      type="text" 
      placeholder="输入关键词搜索..." 
      :value="searchQuery" 
      @input="emit('update:searchQuery', ($event.target as HTMLInputElement).value)"
      @keyup.enter ="emit('search', ($event.target as HTMLInputElement).value)"
      >
      <button>🔍</button>
    </div>
    <span class="user">😁</span>
<button @click="changeTheme" class="changeTheme" :class="{spinning:isSpinning}">
  {{ isDark ? '🌙' : '☀️'}}
</button>
</header>
</template>

<script setup lang="ts" name="TheHeader">
// const emit = defineEmits<{
//   (e: 'toggle-theme'): void
//   (e: 'update:searchQuery', value: string): void
// }>()
const emit = defineEmits(['toggle-theme','update:searchQuery','search'])
import { ref } from 'vue';
const isSpinning = ref(false)
function changeTheme (){
  emit('toggle-theme')
  isSpinning.value = true
  setTimeout(() =>{
    isSpinning.value = false
  },300)
}
defineProps<{
  isDark:boolean
  searchQuery:string
}>()
</script>

<style scoped>
header{
  display: flex;
  justify-content: flex-end;
  gap: 10px;
}
.changeTheme{
  position: fixed;
  left: 50%;
  z-index: 999;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  border: none;
  background: var(--btn-bg);
  box-shadow: 0 5px 15px var(--card-shadow), var(--btn-glow);
  cursor: pointer;
  font-size: 25px;
  transition: all 0.3s ease;
}

.changeTheme:hover{
  transform: scale(1.08);
  box-shadow: 0 5px 20px var(--card-shadow), 0 0 50px rgba(255, 200, 50, 0.5);
}
.changeTheme:active{
  transform: scale(0.95);
}

@keyframes spin{
  from { transform: rotate(0deg) } to { transform: rotate(360deg) }
}
.spinning {
  animation: spin 0.3s ease-in-out;
}
.logo{
  font-size: 15px;
  margin-right:5px;
}
.search-wrapper{
  display: flex;
  align-items: center;
  gap: 0;
}
.search-wrapper input,button{
  border-radius: 15px;
  background-color: #333;
  color: #fff;
  box-shadow: 0,5px,15px,rgba(255, 200, 50, 0.5);
}
.user{
  width: 35px;
  height: 35px;
  border-radius: 50%;
  background: var(--card-shadow);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 15px;
}
</style>