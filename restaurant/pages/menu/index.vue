<template>
        <div class="category-filter mb-4 text-center">
          <button
            class="btn btn-outline-primary mx-1"
            :class="{ 'active': selectedCategory === 'Все' }"
            @click="selectedCategory = 'Все'"
          >
            Все
          </button>
          <button
            v-for="category in categories"
            :key="category"
            class="btn btn-outline-primary mx-1"
            :class="{ 'active': selectedCategory === category }"
            @click="selectedCategory = category"
          >
            {{ category }}
          </button>
        </div>

        <div class="row">
          <div v-for="item in filteredMenuItems" :key="item.id" class="col-md-4 p-2">
            <div class="menu-item bg-white border rounded p-4 text-center">
              <div class="menu-image mb-3" style="height: 120px; background-color: #f0f0f0;">
                <img :src="`/images/${item.image}`" :alt="item.sandwich_title" style="max-height: 120px; object-fit: cover;">
              </div>
              <div class="menu-details">
                <div class="menu-name mb-1" style="height: 20px;">{{ item.sandwich_title }}</div>
                <div class="menu-price mb-1" style="height: 20px;">{{ item.sandwich_price }} ₽</div>
                <div class="menu-category" style="height: 20px;">{{ item.sandwich_category }}</div>
              </div>
              <button class="btn btn-primary mt-2" @click="addToCart(item.id, item.sandwich_title, item.sandwich_price, item.sandwich_category)">
                Добавить в корзину
              </button>
            </div>
          </div>
        </div>
</template>

<script>
export default {
  name: 'Menu',
  data() {
    return {
      menuItems: [],
      selectedCategory: 'Все',
      categories: [] 
    };
  },
  computed: {
    filteredMenuItems() {
      if (this.selectedCategory === 'Все') {
        return this.menuItems;
      }
      return this.menuItems.filter(item => item.sandwich_category === this.selectedCategory);
    }
  },
  mounted() {
    this.showMenu();
  },
  methods: {
    async showMenu() {
      try {
        console.log('Загрузка меню...');
        const response = await fetch('http://localhost:5000/product/showall');
        if (!response.ok) {
          throw new Error(`Ошибка HTTP: ${response.status}`);
        }
        const menu = await response.json();
        console.log('Рендеринг меню...', menu);
        this.menuItems = menu;

        this.categories = [...new Set(menu.map(item => item.sandwich_category))];
        console.log('Категории:', this.categories);
      } catch (err) {
        console.error('Ошибка загрузки карточек:', err);
      }
    },
    addToCart(id, title, price, category) {
      let cart = JSON.parse(localStorage.getItem('cart')) || {};

      if (cart[id]) {
        cart[id].quantity += 1;
      } else {
        cart[id] = {
          id: id,
          title: title,
          price: price,
          category: category,
          quantity: 1
        };
      }

      localStorage.setItem('cart', JSON.stringify(cart));
      console.log('Товар добавлен в корзину:', cart);
    }
  }
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

.category-filter .btn {
  transition: all 0.3s;
}

.category-filter .btn.active {
  background-color: #007bff;
  color: white;
  border-color: #007bff;
}
</style>