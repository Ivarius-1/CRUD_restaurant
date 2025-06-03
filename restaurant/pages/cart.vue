<template>

        <h1 class="text-center mb-4">Ваша корзина</h1>
        <div class="cart-content">
          <div v-if="cartItems.length > 0">
            <div v-for="item in cartItems" :key="item.id" class="cart-item">
              <h5 class="mb-1">{{ item.title }}</h5>
              <p class="text-muted mb-2">{{ item.category }}</p>
              <div class="d-flex align-items-center mb-2">
                <button class="btn btn-outline-primary quantity-btn" @click="updateQuantity(item.id, -1)">-</button>
                <span class="mx-3">{{ item.quantity }}</span>
                <button class="btn btn-outline-primary quantity-btn" @click="updateQuantity(item.id, 1)">+</button>
              </div>
              <div class="price mb-2">{{ item.price * item.quantity }} ₽</div>
              <button class="remove-btn btn btn-link" @click="removeItem(item.id)">Удалить</button>
            </div>
          </div>
          <p v-else class="text-center text-muted">Корзина пуста</p>
          <div class="total d-flex justify-content-between align-items-center mt-4">
            <h4 class="mb-0">Итого: <span>{{ totalPrice }} ₽</span></h4>
            <button class="btn btn-success" @click="showCheckoutModal = true" :disabled="cartItems.length === 0">
              Оформить заказ
            </button>
          </div>
        </div>


        <CheckoutModal v-if="showCheckoutModal" :isVisible="showCheckoutModal" @close="showCheckoutModal = false" @orderSubmitted="handleOrderSubmitted" />

</template>

<script>
import CheckoutModal from '../components/CheckoutModal.vue'; // Исправленный путь

export default {
  name: 'Basket',
  components: {
    CheckoutModal
  },
  data() {
    return {
      cartItems: [],
      showCheckoutModal: false
    };
  },
  computed: {
    totalPrice() {
      return this.cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
    }
  },
  mounted() {
    this.loadCart();
  },
  methods: {
    loadCart() {
      const cart = JSON.parse(localStorage.getItem('cart')) || {};
      this.cartItems = Object.values(cart);
      console.log('Содержимое корзины из localStorage:', this.cartItems);
    },
    updateQuantity(id, change) {
      let cart = JSON.parse(localStorage.getItem('cart')) || {};
      if (cart[id]) {
        cart[id].quantity = Math.max(1, cart[id].quantity + change);
        localStorage.setItem('cart', JSON.stringify(cart));
        console.log('Количество обновлено для id:', id, cart);
        this.loadCart();
      }
    },
    removeItem(id) {
      let cart = JSON.parse(localStorage.getItem('cart')) || {};
      delete cart[id];
      localStorage.setItem('cart', JSON.stringify(cart));
      console.log('Товар удален, новая корзина:', cart);
      this.loadCart();
    },
    handleOrderSubmitted() {
      this.loadCart(); // Обновляем корзину после оформления заказа
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

.cart-content {
  background-color: rgba(255, 255, 255, 0.9);
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.cart-item {
  border-bottom: 1px solid #eee;
  padding: 15px 0;
}

.cart-item h5 {
  color: #007bff;
  font-weight: 600;
}

.quantity-btn {
  width: 30px;
  height: 30px;
  font-size: 16px;
  line-height: 20px;
}

.price {
  font-weight: bold;
  color: #28a745;
}

.remove-btn {
  color: #dc3545;
}

.total {
  background-color: #fff;
  padding: 15px;
  border-radius: 5px;
  margin-top: 20px;
}
</style>