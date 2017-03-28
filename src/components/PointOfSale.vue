<template>
  <div class="items">
    <button
    v-for="(item, index) of inventory"
    v-on:click="addToTotal(item.cost)"
    >{{ item.name + " " + (item.cost * .01).toFixed(2) }}</button>
    <div>
      <input id="counter" v-bind:value="costs">
      <button v-on:click="removeFromTotal">delete item</button>
    </div>
    <div>
      <p>{{ "Subtotal:  " + (getSum() * .01).toFixed(2)}}</p>
      <p>Sales Tax: 8.5%</p>
      <p>{{ "Total:  " + ((getSum() * .01) / .85).toFixed(2)}}</p>
    </div>
    <div>
      <button v-on:click="clearTotal">Finish</button>
    </div>
  </div>
</template>

<script>
import inventory from '@/assets/inventory'
export default {
  name: 'items',
  data () {
    return {
      inventory: inventory,
      costs: []
    }
  },
  methods: {
    addToTotal (cost) {
      this.costs.push(cost)
    },
    removeFromTotal (cost) {
      this.costs.pop()
    },
    clearTotal (costs) {
      for (var i = this.costs.length; i >= 0; i--) {
        this.costs.pop()
      }
    },
    getSum () {
      var sum = 0
      for (var item of this.costs) {
        sum += item
      }
      return sum
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
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
