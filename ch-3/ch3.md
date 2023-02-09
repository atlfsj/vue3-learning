## 1. 模板语法：文本，表达式，原始 HTML，属性，事件

```
<div id="app">
 <span v-text="text"></span>
 <span v-html="text"></span>
</div>
<script src="https://unpkg.com/vue@next"></script>
<script>
    const vm = Vue.createApp({
        data() {
            return {
                text: '<style>body{background:red;}</style>'
            }
        }
    }).mount('#app')
</script>

<span>Message: {{ msg }}</span>
<span>{{ number + 1 }}</span>
<span v-once>这个将不会改变: {{ msg }}</span>    // 只渲染一次data，以后不变
<span v-html="rawHtml"></span>
<a :href="url"> ... </a>
<a v-bind:href="url"> ... </a>           // 属性绑定
<a v-on:click="doSomething"> ... </a>
<a @click="doSomething"> ... </a>
<a @[event]="doSomething"> ... </a>      // []里可以是个变量，是什么就写什么

```

### 注意：

不能在模版表达式中访问用户定义的全局变量,只能是 data 里的数据；<br>
`v-html`容易引发 XSS，当确定获取的数据为自己写死的数据而不是用户提交的数据才能使用

### 补充：v-html 和 v-text 的区别

v-html：不仅用于渲染数据，还能够输出真正的 html，即能够解析 html 代码 <br>
v-text：用于渲染普通文本，绑定的数据对象发生变化时，插值处的内容也会发生改变，注意它不解析标签 <br>
上例可知，html 页面背景为红色，text 输出了插入 text 的内容

## 2. data Property 和 methods

1. data 选项是一个函数，返回一个对象
2. 对尚未提供所需值的 property 使用 null、
   undefined 等占位
3. 实例创建后再添加的 property，响应式系统不会
   跟踪（视图不再变更）
4. method 里不能使用箭头函数，否则 this 就不指向 vm 了

```
<div id="app">
    <fieldset>
        <legend>data和methods</legend>
        {{ counter }} {{ property }} <button @click="add">Click Me</button>
    </fieldset>
</div>
<script src="https://unpkg.com/vue@next"></script>
<script>
    const App = {
        data() {
            return {
                counter: 0
                property: 'ok'
            }
        },
        methods: {
            add() {
                this.counter++
            }
        },
    }
    const vm = Vue.createApp(App).mount('#app')
</script>
```

### 注意：

Vue2 的 data 可以是对象，但 Vue3 的 data 只能是函
数否则报错

Vue2 的自定义组件里的 data 要使用函数，否则创建
的多个自定义组件实例会共⽤数据。一般来说组件
需要维护的状态应该是独立的

## 3. 计算属性

计算属性 count 会依赖 data 中的属性 books，books

发生改变自动触发 count 的变化

### 注意：

注意 methods 和 computed 里面的方法不要使用箭头函数，否则 this 就不是 vm 对象了

计算属性有缓存机制，如果依赖的数据未发生改变，则不会重新计算而是直接使用缓存值

> 如下例，在控制台输入 vm.count，结果不会发生不安化

```
<div id="app">
    <p>{{name}} published {{count}} books:</p>
    <button @click="add">Add book</button>
</div>
<script src="https://unpkg.com/vue@next"></script>
<script>
    const vm = Vue.createApp({
        data() {
            return {
                name: 'John Doe',
                books: ['book1']
            }
        },
        methods: {
            add() {
                this.books.push('book')
            }
        },
        computed: {
            count() {
                return this.books.length
            }
        }
    }).mount('#app')
</script>
```

## 4. methods 和 computed 的区别

computed 依赖的数据未改变则用缓存值，不会重新渲染到页面

```
<div id="app">
    <p>{{name}} published {{count()}} books:</p>
    <button @click="add">Add book</button>
</div>
<script src="https://unpkg.com/vue@next"></script>
<script>
    const vm = Vue.createApp({
        data() {
            return {
                name: 'John Doe',
                books: ['book1']
            }
        },
        methods: {
            add() {
                this.books.push('book')
            },
            count() {
                return this.books.length
            }
        },
        computed: {

        }
    }).mount('#app')
</script>
```

## 5. watch 的用法

watch 会监控 data 中某个 property 的变化，执行函数

### 什么时候需要 watch?

• 当只需要根据 data 中某个 property 的变化做出反
应，但不一定需要结果时 （如：搜索框输入内容显示联想词）

• 当有异步操作时

• 当需要用旧值时

```
const vm = Vue.createApp({
    data() {
        return {
            name: 'jirengu'
        }
    },
    watch: {
        name(newname, oldname) {
            console.log(oldname + '-> + newname)
        }
    }
}).mount('#app')
```

```
<div id="app">
    <input type="text" v-model="name">
    <span>{{text}}</span>

</div>
<script src="https://unpkg.com/vue@next"></script>
<script>
    const delayer1s = () => new Promise(r => setTimeout(r, 1000))
    const vm = Vue.createApp({
        data() {
            return {
                name: ''
            }
        },
        watch: {
            async name(newname, oldname) {
                await delayer1s()
                console.log(oldname + '-->' + newname)
            }
        }
    }).mount('#app')
</script>
```

## 问题：

1. v-text 和 v-html 有什么区别
2. data 为什么要是函数
3. 计算属性缓存是什么
4. watch、计算属性有什么区别

## 答案：

1. v-text 和 v-html 都是模版插值，前者相当于 innerText，
   会把字符串作为文本内容插入页面；后者相当于
   innerHTML，会把字符串作为 HTML 片段插入页面。
   后者容易引起 XSS 攻击需要谨慎使用。
2. vue3 ⾥强制规定 data 的值为函数，vue2 ⾥未做强制规
   定。在 vue2 一般建议 data 的值为函数，返回多个新
   对象，特别是针对⾃定义组件。如果自定义组件的
   data 的值是⼀个对象，这个对象会被多个组件实例共
   享，带来数据管理的混乱。
3. 当依赖 data 中的某个属性发生变化时，依赖该属性的
   计算属性会自动变化。 计算属性有缓存机制，如果依
   赖的数据未发生改变，使用该计算属性时不会重新计
   算而是直接使用缓存值
4. watch 会监控 data 中某个 property 的变化，执⾏函数。
   ⽽计算属性是根据监控某个 property 变化得到的⼀个
   返回值。在这些场景使用 watch：1. 当只需要根据 data
   中某个 property 的变化做出反应，但不⼀定需要结果
   时；2. 当有异步操作时；3. 当需要⽤旧值时
