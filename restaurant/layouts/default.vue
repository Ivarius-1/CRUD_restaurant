<template>
  <div class="layout">
    <Header />
    <div class="content-wrapper">
      <main class="content">
        <slot />
      </main>
    </div>
    <Footer />
  </div>
</template>

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
</style>