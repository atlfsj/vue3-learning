<template>
  <h1>天气预报</h1>
  <Search></Search>
  <Weather></Weather>
</template>

<script>
import Search from './components/Search.vue'
import Weather from './components/Weather.vue'
export default {
  components: {
    Search,
    Weather
  }
}
</script>
