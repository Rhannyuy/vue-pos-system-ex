<template>
  <div class="hello">
    {{error}}
    <div v-if="inventory.length">
      <button v-on:click="logout">Logout</button>
      <div
        v-for="(item, index) of inventory"
        class="item-button"
      >
        <div v-on:click="addToCart(item)">
          <p> {{item.name }} </p>
          <img v-bind:src="'./static/' + item.image">
          <p>{{ (item.cost / 100).toFixed(2) }}</p>
        </div>
      </div>
    </div>
    <div v-if="!inventory.length && !this.error">
      Loading...
    </div>
    <div v-if="this.error === 'Not authenticated...'">
      <input v-model="username">
      <input type="password" v-model="password" v-on:keyup.13="login">
      <button v-on:click="login">Login</button>
      </div>
  </div>
</template>

<script>

export default {
  name: 'hello',
  data () {
    return {
      inventory: [],
      cart: [],
      error: '',
      username: '',
      password: '',
      msg: 'Welcome to Your Vue.js App'
    }
  },
  created () {
    this.getItems()
  },
  methods: {
    addToCart (item) {
      this.cart.push(item)
      console.log(this.cart)
    },
    getAuthHeader () {
      return {
        'Authorization': 'Bearer ' + localStorage.getItem('jwt')
      }
    },
    getItems () {
      this.$http.get(
        'http://localhost:3030/inventory',
        { headers: this.getAuthHeader() }
      )
      .then(
        function (res) { // first func is the success function
          if (res.body === 'error') {
            this.error = 'Not authenticated...'
          } else {
            this.error = ''
            this.inventory = res.body
          }
        },
        function (err) { // second func is the fail function
          console.log(err)
          this.error = 'Error getting data from server...'
        }
      )
    },
    login () {
      this.$http.post('http://localhost:3030/login', {
        username: this.username,
        password: this.password
      }).then(function (res) {
        localStorage.setItem('jwt', res.body.jwt)
        this.getItems()
      }, function (err) {
        console.log(err)
        this.error = 'Not authenticated...'
      })
    },
    logout () {
      localStorage.clear()
      this.inventory = []
      this.error = 'Not authenticated...'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.item-button img {
  max-height: 128px;
}
.item-button {
  float: left;
  width: 128px;
  height: 256px;
  border: 2px solid black;
  border-radius: 3px;
}
</style>
