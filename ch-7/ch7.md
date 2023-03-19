## 插槽 slot 【demo1 区别】

- 子组件的模板里预留一个空位(slot)
- 父组件使用子组件时可以在子组件标签内插入内容/组
  件，即向子组件内预留的空位插入

```【demo】
<div id="app">
    <x-button>
        <icon name="yes"></icon> {{text}} </xbutton>
</div>
<script src="https://unpkg.com/vue@next"></script>
<script>
    const Icon = {
        props: ['name'],
        template: `<span>{{type}}</span>`,
        computed: {
            type() { return this.name === 'yes' ? '✔' : '✘' }
        }
    }
    const XButton = {
        template: `<button>
<slot></slot>
</button>`
    }
    Vue.createApp({
        components: { XButton, Icon },
        data() {
            return { text: '正确' }
        }
    }).mount('#app')
</script>
```

- 作用域：父组件往插槽插入的内容只能使用父组件实例的属性【demo2】

```
<div id="app">
    <x-button type="big"> OK </x-button>
    <x-button type="small"></x-button>
    <x-button type="default"> {{type}} </x-button>
    <!--type只能用在子组件里，不能用在这里-->
</div>
<script src="https://unpkg.com/vue@next"></script>
<script>
    const XButton = {
        props: ['type'],
        template: `<button :class="'btn-'+type">
<slot>确定</slot>       // 备选内容，若父组件里没有则会加上
</button>`
    }
    Vue.createApp({
        components: { XButton },
    }).mount('#app')
</script>
<style>
    .btn-big {
        padding: 8px 16px;
    }

    .btn-small {
        padding: 2px 4px;
    }
</style>
```

## 具名插槽 【demo3】

```
<div id = "app">
    <layout>
        <template v-slot:header>
            <h1>页面header</h1>
        </template>
        <template #default>
            <p>页面content</p>
        </template>
        <template #footer>
            <div>页面footer</div>
        </template>
    </layout>
</div>
<script src="https://unpkg.com/vue@next"></script>
<script>
    const Layout = {
        template: `<div class="container">
            <header> <slot name="header"></slot> </header>
            <main> <slot></slot></main>
            <footer><slot name="footer"></slot></footer>
            </div>`
    }
    Vue.createApp({
        components:{ Layout },
    }).mount('#app')
</script>
```

## 作用域插槽 【demo4】

由于作用域的存在，下例的父组件无法访问到子组件的 item。<br>
但当插槽里绑定了 item 属性以后，父组件就可以使用该变量

```
<div id="app">
    <news>hello world</news>
    <news v-slot="props"> {{props.item}}</news>  【props可换成其他名，指slot绑定的所有属性】
    <news v-slot="{ item }">✔ {{item}}</news>
</div>
<script src="https://unpkg.com/vue@next"></script>
<script>
    const News = {
        data() { return { news: ['first news', 'second news'] } },
        template: `<ul>
                <li v-for="item in news">
                    <slot :item="item"></slot>
                </li>
            </ul>`
    }
    Vue.createApp({
        components: { News },
    }).mount('#app')
</script>
```

## Provide Inject 【demo5】

- 适用于深度嵌套的组件，父组件可以为所有子组件直接
  提供数据
  ![uTools_1677598022810.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/1e51c942c8b24174b2c9f1da05892ffa~tplv-k3u1fbpfcp-watermark.image?)

```
<div id="app">
    <toolbar></toolbar>
    <button @click="isDark=!isDark">切换</button>
</div>
<script src="https://unpkg.com/vue@next"></script>
<script>
    const ThemeButton = {
        inject: ['theme'],
        template: `
            <div :class="['button', theme]" ><slot></slot></div>
        `
    }
    const Toolbar = {
        components: { ThemeButton },
        inject: ['theme'],
        template: `<div :class="['toolbar', theme]">
            <theme-button>确定</theme-button>
        </div>`
    }
    Vue.createApp({
        data() { return { isDark: false } },
        provide: { theme: 'dark' },
        components: { Toolbar },
    }).mount('#app')
</script>
```

## Provide Inject 响应式

几种 Props 写法范例

```
<div id="app">
    <toolbar></toolbar>
    <button @click="isDark=!isDark">切换</button>
</div>
<script src="https://unpkg.com/vue@next"></script>
<script>
    const ThemeButton = {
        inject: ['theme'],
        template: `
<div :class="['button', theme.value]" ><slot></slot></
div>
`
    }
    const Toolbar = {
        components: { ThemeButton },
        inject: ['theme'],
        template: `<div :class="['toolbar', theme.value]">
<theme-button>确定</theme-button>
</div>`
    }
    Vue.createApp({
        data() {
            return { isDark: false }
        },
        provide() {
            return {
                theme: Vue.computed(() => this.isDark ? 'dark' :
                    'white')
            }
        },
        components: { Toolbar },
    }).mount('#app')
</script>
```

```
<style>
    .toolbar {
        border: 1px solid #333;
        color: #333;
        padding: 10px;
    }

    .toolbar.dark {
        background: #333;
        color: #fff;
    }

    .button {
        padding: 2px 4px;
        border-radius: 4px;
        border: 1px solid #ccc;
        display: inline-block;
    }

    .button.dark {
        background: #666;
        color: #fff;
    }
</style>
```

## 动态组件与 keep-alive 【demo6】

- 作用：当切换组建时，组件一开始被创建就不会被销毁。如下例:表单输入内容切换 tab 后仍能保存记录
- 页面第一次进入，钩子的
  触发顺序 created->
  mounted-> activated，
- 退出时触发 deactivated
- 当再次进入时，只触发
  activated（当用户切换 tab 时可知）

```
<div id="app">
    <button vfor="tab in tabs" :key="tab" :class="{ active: currentTab === tab }" @click="currentTab = tab">
        {{ tab }}
    </button>
    <keep-alive>
        <component :is="currentTabComponent" class="tab"></component>
    </keep-alive>
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
        computed: {
            currentTabComponent() { return this.currentTab.toLowerCase() }
        }
    })
    app.component('tab1', {
        template: `<div>Tab1 content</div>`
    })
    app.component('tab2', {
        template: `<div>
<input v-model="value" /> {{value}}
</div>`,
        data() { return { value: 'hello' } },
        created() { console.log('tab2 created') },
        activated() { console.log('tab2 activated') }
    })
    app.mount('#app')
</script>
<style>
    .active {
        background: #e0e0e0;
    }
</style>
```

## 一些问题：

1. vue 的插槽作用：当子组件渲染时保留位置，让子组件更具有灵活性，父组件调用子组件时可以插入数据，组件等内容
2. 如何实现多层级嵌套的父子组件数据传递：provide(父组件) 和 inject(子组件)
3. keep-alive 有什么作用：实现组建的缓存。切换动态组件时会有组件的创建和销毁，使用 keep-alive 后会使组件缓存，下次使用时直接在缓存里渲染
