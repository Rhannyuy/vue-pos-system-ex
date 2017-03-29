<template>

  <div class="items">
    <!-- List items in inventory -->
    <button
    v-for="(item, index) of inventory"
    v-on:click="addToCart(item)"
    ><img v-bind:src="'/static/' + item.image" width = "50">
    <br><br><br>
    {{ item.name + " " + (item.cost * .01).toFixed(2) }}</button>


    <div>
      <input id="counter" v-bind:value="cart">
      <!-- remove from function that affects cost variable-->
      <button v-on:click="removeFromTotal">delete item</button>
    </div>




    <div>
      <p>{{ "Subtotal:  " + (getSum() * .01).toFixed(2)}}</p>
      <p>Sales Tax: 8.5%</p>
      <p>{{ "Total:  " + ((getSum() * .01) / .85).toFixed(2)}}</p>
    </div>
    <!--Cart section-->
  <div>
    <ul class="list">
              <li v-for="(item, index) in cart">
                  {{ item.name }}: ${{ (item.cost * .01).toFixed(2) }}
              </li>
    </ul>

  </div>



    <div>
      <!--clears total-->
      <button v-on:click="clearTotal">Finish</button>
    </div>
  </div>
</template>

<script>
// j
import inventory from '@/assets/inventory'
export default {
  name: 'items',
  data () {
    return {
      inventory: inventory,
      cart: []
    }
  },
  methods: {
    addToCart (item) {
      this.cart.push(item)
    },
    removeFromTotal () {
      this.cart.pop()
    },
    clearTotal () {
      for (var i = this.cart.length; i >= 0; i--) {
        this.cart.pop()
      }
    },
    getSum () {
      var sum = 0
      for (var item of this.cart) {
        sum += item.cost
      }
      return sum
    }
  }
}
</script>

// Add "scoped" attribute to limit CSS to this component only
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
#counter {
  width: 65%;
}
</style>
