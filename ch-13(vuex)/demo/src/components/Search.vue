<template>
    <input type="text" :value="$store.state.search" @change="onChange">    
    <span>城市：{{ $store.getters.searchText }}</span>
</template>

/*
    注意第二行为默认展示的信息，value前要加 " : " ,否则出现字符串
    @change为要修改的数据
*/

<script>
    export default {
        method:{
            onChange(e) {
                this.$store.commit('setSearch', e.target.value)
                this.$store.dispatch('getWeather', e.target.value)
            }
        }        
    }
</script>