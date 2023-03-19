import { createStore } from 'vuex'

export default createStore({
    state: {
        search: '',
        weather: {}
    },

    getters: {
        searchText(state) {
            return state.search + '市'
        }
    },

    mutations: {
        setWeather(state, weather) {
            state.weather = weather
        },

        setSearch(state, search) {
            state.search = search
        }
    },

    actions: {
        async getWeather({ commit, state }, city){
            let res = await fetch('//api2.jirengu.com/getWeather.php?city='+state.search)
            let ret = await res.json()
            commit('setWeather', ret.result.now)
        }
    }
})