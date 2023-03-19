<template>
  <div class="weather">
    <h2>{{searchText}} 天气详情</h2>
    <p>天气 {{weather.text}}</p>
    <p>体感温度 {{weather.feels_like}}</p>
    <p>风力 {{weather.wind_class}}</p>
    <button @click="setDefault">杭州天气</button>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapMutations, mapState } from 'vuex'
export default {
  computed: {
    ...mapState(['search', 'weather']),
    ...mapGetters(['searchText'])
  },
  methods: {
    ...mapMutations(['setSearch']),
    ...mapActions(['getWeather']),
    setDefault() {
      this.setSearch('杭州')
      this.getWeather('杭州')
    }
  },
}
</script>

/*
<template>
    <div class="weather">
        <h2> {{ $store.getters.searchText }} 天气预报 </h2>
        <p>天⽓ {{$store.state.weather.text}}</p>
        <p>体感温度 {{$store.state.weather.feels_like}}</p>
        <p>⻛⼒ {{$store.state.weather.wind_class}}</p>
        <button @click="setDefault">杭州天⽓</button>
    </div>
</template>

<script>
    export default {
        method:{
            setDefault() {
                this.$store.commit('setSearch', '杭州')
                this.$store.dispatch('getWeather', '杭州')
            }
        },
    }
</script>
*/