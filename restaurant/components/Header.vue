<template>
    <header class="header">
      <h1>SANDWICH HOUSE</h1>
      <nav>
        <NuxtLink to="/">Главная</NuxtLink>
        <NuxtLink to="/menu">Меню</NuxtLink>
        <NuxtLink to="/cart">Корзина</NuxtLink>
      </nav>
    </header>
</template>
  
  <style scoped>
  .header {
    background-color: #333;
    color: white;
    padding: 1rem;
    text-align: center;
    position: relative;
    height: 80px;
  }
  nav {
  position: relative;
  margin-top: 12px;
}

nav a {
  color: white;
  text-decoration: none;
  margin-left: 20px;
  display: inline-block;
}

nav {
  text-align: right;
  padding-right: 50px; 
}
  h1{
    position: absolute;
    align-items: left;
    left: 50px;
  }
  </style>