<template>
  <header>
    <span>Todo List</span>
  </header>
  <hr>
  <RouterView />
</template>
<style>
@import '@/assets/base.css';
@font-face {
  font-family: Roboto;
  src: url('@/assets/fonts/Roboto-Light.ttf');
}
#app {
  max-width: 1280px;
  margin: 0 auto;
  font-family: Roboto;
  font-weight: normal;
}

header {
  text-align: center;
  font-size: 25px;
  margin: 0 auto;
}
</style>
