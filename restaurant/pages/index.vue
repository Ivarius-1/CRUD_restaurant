<template>

          <div class="container text-center py-5">
            <h1 class="display-4 mb-4">Добро пожаловать в Sandwich House!</h1>
            <p class="lead mb-4">Наслаждайтесь вкуснейшими сэндвичами, приготовленными с любовью. Изучите наше меню и сделайте заказ прямо сейчас!</p>
            <router-link to="/menu" class="btn btn-primary btn-lg">Перейти в меню</router-link>
          </div>

  </template>
  
  <script>
  export default {
    name: 'Home'
  };
  </script>
  
  <style scoped>
  .layout {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
  }
  
  .content-wrapper {
    flex: 1;
    display: flex;
    padding: 0 20px;
  }
  
  .content {
    max-width: 1700px;
    margin: 0 auto;
    border-left: 2px solid #333;
    border-right: 2px solid #333;
    padding: 20px;
    width: 100%;
    min-height: 100%;
    box-sizing: border-box;
  }
  
  .container {
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
  </style>