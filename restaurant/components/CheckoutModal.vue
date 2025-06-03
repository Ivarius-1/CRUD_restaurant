<template>
  <div v-if="isVisible" class="modal fade show" tabindex="-1" style="display: block; background-color: rgba(0, 0, 0, 0.5);" @click.self="closeModal">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Оформление заказа</h5>
          <button type="button" class="close" @click="closeModal">
            <span>×</span>
          </button>
        </div>
        <div class="modal-body">
          <form @submit.prevent="submitOrder" class="checkout-form">
            <div class="form-group">
              <label for="name">Имя *</label>
              <input
                v-model="form.name"
                type="text"
                id="name"
                class="form-control"
                :class="{ 'is-invalid': errors.name }"
                placeholder="Введите ваше имя"
              >
              <div v-if="errors.name" class="invalid-feedback">{{ errors.name }}</div>
            </div>

            <div class="form-group">
              <label for="phone">Телефон *</label>
              <input
                v-model="form.phone"
                type="tel"
                id="phone"
                class="form-control"
                :class="{ 'is-invalid': errors.phone }"
                placeholder="Введите номер телефона (например, +79991234567)"
              >
              <div v-if="errors.phone" class="invalid-feedback">{{ errors.phone }}</div>
            </div>

            <div class="form-group">
              <label for="address">Адрес доставки *</label>
              <textarea
                v-model="form.address"
                id="address"
                class="form-control"
                :class="{ 'is-invalid': errors.address }"
                placeholder="Введите адрес доставки"
                rows="3"
              ></textarea>
              <div v-if="errors.address" class="invalid-feedback">{{ errors.address }}</div>
            </div>

            <button type="submit" class="btn btn-primary mt-3" :disabled="isFormInvalid">
              Оформить заказ
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CheckoutModal',
  props: {
    isVisible: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      form: {
        name: '',
        phone: '',
        address: ''
      },
      errors: {
        name: '',
        phone: '',
        address: ''
      }
    };
  },
  computed: {
    isFormInvalid() {
      this.validateForm();
      return Object.values(this.errors).some(error => error) || !this.form.name || !this.form.phone || !this.form.address;
    }
  },
  methods: {
    validateForm() {
      this.errors.name = this.form.name.length < 2 ? 'Имя должно содержать минимум 2 символа' : '';

      const phoneRegex = /^\+\d{10,15}$/;
      this.errors.phone = !phoneRegex.test(this.form.phone) ? 'Телефон должен начинаться с "+" и содержать 10-15 цифр' : '';

      this.errors.address = this.form.address.length < 5 ? 'Адрес должен содержать минимум 5 символов' : '';
    },
    submitOrder() {
      this.validateForm();
      if (!this.isFormInvalid) {
        const cart = JSON.parse(localStorage.getItem('cart')) || {};
        const order = {
          items: Object.values(cart),
          customer: { ...this.form },
          timestamp: new Date().toISOString()
        };
        localStorage.setItem('lastOrder', JSON.stringify(order));
        localStorage.removeItem('cart');
        console.log('Заказ отправлен:', order);
        this.closeModal();
        this.$emit('orderSubmitted');
        alert('Заказ сформирован');
      }
    },
    closeModal() {
      this.$emit('close');
      this.resetForm();
    },
    resetForm() {
      this.form = { name: '', phone: '', address: '' };
      this.errors = { name: '', phone: '', address: '' };
    }
  }
};
</script>

<style scoped>
.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1050;
}

.modal-dialog {
  max-width: 600px;
}

.modal-content {
  border: none;
  border-radius: 0.5rem;
}

.modal-header {
  border-bottom: 1px solid #dee2e6;
}

.close {
  font-size: 1.5rem;
  font-weight: 700;
  line-height: 1;
  color: #000;
  opacity: 0.5;
  background: none;
  border: none;
  padding: 0;
}

.close:hover {
  opacity: 0.75;
}

.checkout-form .form-group {
  margin-bottom: 1.5rem;
}

.checkout-form label {
  font-weight: 500;
}

.checkout-form .form-control {
  border-radius: 0.25rem;
}

.checkout-form .is-invalid {
  border-color: #dc3545;
}

.checkout-form .invalid-feedback {
  color: #dc3545;
  font-size: 0.875rem;
}

.checkout-form .btn-primary {
  width: 100%;
}
</style>