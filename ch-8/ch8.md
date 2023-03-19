opacity: 0----透明度为 0

## 使用 class 实现动画 【demo1】

在 CSS 里配置好样式，通过切换 class 实现效果切换

```
<div id="app">
    <div :class="['box', {active:isActive}]">box</div>
    <button @click="isActive = !isActive">Click me</button>
</div>
<script src="https://unpkg.com/vue@next"></script>
<script>
    Vue.createApp({
        data() {
            return {
                isActive: false
            }
        }
    }).mount('#app')
</script>
<style>
    .box {
        width: 250px;
        height: 250px;
        box-shadow: 0 0 2px rgba(0, 0, 0, 0.2);
        transition: all 0.3s ease;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .active {
        transform: translateX(100px);
    }
</style>
```

## 修改 style 实现动画 【demo2】

修改 style 和 data 中数据绑定

```
<div id="app">
    <div class="box" :style="{width:`${R}px`, backgroundColor: `rgb(${R},${G},${B})`}"></div>
    <div>
        <input type="range" min="0" max="255" v-model="R">R: {{R}} <br>
        <input type="range" min="0" max="255" v-model="G">G: {{G}} <br>
        <input type="range" min="0" max="255" v-model="B">B: {{B}} <br>
    </div>
</div>
<script src="https://unpkg.com/vue@next"></script>
<script>
    Vue.createApp({
        data(){
            return{
                R: 0,
                G: 0,
                B: 0,
            }
        }
    }).mount('#app')
</script>

<style>
    .box{
        width: 100px;
        height: 100px;
    }
</style>
```

## transition 组件 【demo3】

- v-enter-from：在元素被插入之前生效，在元素被插入之
  后的下一帧移除
- v-enter-active：定义进入过渡生效时的状态
- v-enter-to：定义进入过渡的结束状态。在元素被插入之
  后下一帧生效 ，在过渡/动画完成之后移除
- v-leave-from：在离开过渡被触发时立刻生效，下一帧被
  移除
- v-leave-active：定义离开过渡生效时的状态
- v-leave-to：离开过渡的结束状态。在离开过渡被触发之
  后下一帧生效 ，在过渡/动画完成之后移除

```
<div id="app">
    <button @click="show = !show">Toggle</button>
    <transition name="fade">
        <p v-if="show">hello</p>
    </transition>
</div>
<script src="https://unpkg.com/vue@next"></script>
<script>
    Vue.createApp({
        data() {
            return {
                show: true
            }
        }
    }).mount('#app')
</script>
<style>
    .fade-enter-active,
    .fade-leave-active {
        transition: opacity 0.5s ease;
    }

    .fade-enter-from,
    .fade-leave-to {
        opacity: 0;
    }
</style>
```

## transition 和 animate.css 结合 [animate.style](https://animate.style) 【demo4】

自定义过渡 class 类名，结合 animate.css 写动画更简单

```
<div id="app">
    <button @click="show = !show">Toggle</button>
    <transition name="fade" :duration="400" enter-active-class="animate__animated animate__fadeInTopRight"
        leave-active-class="animate__animated animate__fadeOutTopRight">
        <p v-if="show">hello</p>
    </transition>
</div>
<script src="https://unpkg.com/vue@next"></script>
<script>
    Vue.createApp({
        data() {
            return { show: true }
        }
    }).mount('#app')
</script>
<link href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.0/animate.min.css" rel="stylesheet" />
<!-- https://animate.style/ -->
```

## 多个元素过渡 【demo5】

- 多元素过渡指的是多元素进行切换，同一时间只展示一个
- 使用不同的 key 提升性能
- mode 属性解决两个元素同时存在的现象<br>
  out-in : 当前元素先出，下一个元素再进<br>
  in-out: 下一个元素先进，当前元素在出

```
<div id="app">
    <button @click="show = !show">Toggle</button>
    <transition mode="out-in" enter-activeclass="animate__animated animate__fadeInUp"
        leave-activeclass="animate__animated animate__fadeOutDown">
        <p v-if="show" key="hello">hello</p>
        <p v-else="!show" key="world">world</p>
    </transition>
</div>
<script src="https://unpkg.com/vue@next"></script>
<script>
    Vue.createApp({
        data() {
            return { show: true }
        }
    }).mount('#app')
</script>
<link href="https://cdnjs.cloudflare.com/ajax/libs/animate
.css/4.1.0/animate.min.css" rel="stylesheet" />
<!-- https://animate.style/ -->
```

## 多组件切换 【demo6】

- 使用动态组件实现 Tab 切换效果
- 如果动态组件使用了 keep-alive，需要放在 transition 内部

```
<div id="app">
    <button v-for="tab in tabs" :key="tab" :class="{ active: currentTab=== tab }" @click="currentTab = tab">
        {{ tab }}
    </button>
    <transition mode="out-in" enter-active-class="animate__animated animate__fadeInLeft"
        leave-active-class="animate__animated animate__fadeOutRight">
        <keep-alive>
            <component :is="currentTab" class="tab"></component>
        </keep-alive>
    </transition>
</div>
<script src="https://unpkg.com/vue@next"></script>
<script>
    const app = Vue.createApp({
        data() {
            return {
                currentTab: 'Tab1',
                tabs: ['Tab1', 'Tab2']
            }
        },
    })
    app.component('Tab1', {
        template: `<div>Tab1 content</div>`,
    })
    app.component('Tab2', {
        template: `<div>
<input v-model="value" /> {{value}}
</div>`,
        data() { return { value: 'hello' } },
    })
    app.mount('#app')
</script>
<link href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.0/animate.min.css" rel="stylesheet" />
<style>
    :root {
        --animate-duration: 0.3s;
        --animate-delay: 0;
    }

    .active {
        background: #ccc;
    }
</style>
```

## 列表的过渡效果 【demo7】

- 使用 transition-group 实现列表过渡

```
<div id="app">
    <button @click="add">添加</button>
    <transition-group name="list" tag="div">
        <div v-for="(value, index) in news" :key="value">
            {{value}}
            <button @click="news.splice(index, 1)">删除</button>
        </div>
    </transition-group>
</div>
<script src="https://unpkg.com/vue@next"></script>
<script>
    Vue.createApp({
        data() {
            return {
                news: []
            }
        },
        methods: {
            add() {
                let value = window.prompt('输入新闻')
                if (value) {
                    this.news.push(value)
                    this.news = this.news.sort()
                }
            }
        }
    }).mount('#app')
</script>
<style>
    .list-enter-active,
    .list-leave-active {
        transition: all .4s ease;
    }

    .list-enter-from {
        opacity: 0;
        transform: translateX(-30px);
    }

    .list-leave-to {
        opacity: 0;
        transform: translateX(30px);
    }
</style>
```
