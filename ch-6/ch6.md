## 全局组件可以在任何组件内使用

```
<div id="app">
    <component-a></component-a>
</div>
<script src="https://unpkg.com/vue@next"></script>
<script>
    const app = Vue.createApp({})
    app.component('component-a',{
        template:`
            div>a</div>
            <component-b></component-b>
        `
    })
    app.component('ComponentB',{
        template:`<div>b</div>`
    })
    app.mount('#app')
</script>
```

## 局部组件只能在使用该组件的组件内使用 【demo1】

```
<div id="app">
    <component-a></component-a>
    // <component-b></component-b>
</div>
<script src="https://unpkg.com/vue@next"></script>
<script>
    const ComponentB = {
        template:`<div>ComponentB</div>`
    }
    const ComponentA = {
        components:{
            // 'component-b':ComponentB,
            ComponentB  // 简写
        },
        template:`
            <div>ComponentA</div>
            <component-b></component-b>
        `
    }
    const App = {
        components:{ ComponentA }
    }
    Vue.creatApp(App).mount('#app')

/* 45-48行可以这样写
    Vue.createApp({
        components:{
            ComponentA: ComponentA,    // 多个组件继续写
            // ComponentB: ComponentB , 可以简写为ComponentB
        }
    }).mount('#app')
*/
</script>
```

## 组件命名

- kebab-case 短横线连接全小写的单词
- 声明时使用 kebab-case，模板里必须用 kebab-case <br>
  app.component('component-a',({}) <br>
  <component-a></component-a>
- PascalCase 多个首字母大写单词直接连接
- 声明时使用 PascalCase，模板里可以用 kebab-case 和 PascalCase <br>
  app.component('ComponentB',({}) <br>
  <component-b></component-b> <br>
  <ComponentB></Component-B>

## Props 【demo2】

作用：通过 Props 组件 传递/接收 数据

```
<div id="app">
    <User :name="username"></User>
    <User :name="user"></User>
    <User name="username"></User>
</div>
<script src="https://unpkg.com/vue@next"></script>
<script>
    const User = {
        props:['name'],
        template: `<div>{{name}}</div>`    // propKey
    }   // 怎么找到确定的div的，是子组件向根组件传递参数？
    Vue.createApp({
        components:{ User },
        data(){
            return { username:'hunger' }   // propValue
        }
    }).mount('#app')
</script>
```

Props 的写法范例(规定类型，其他定义)

```
props: ['name', 'other']

props: {
    name: String,
    other: Number //Boolean, Array, Object, Function
}

props: {
    name: {
        //传递的prop如果不满足条件，控制台会有警告
        type: String,
        required: true,
        //default: 'hello'
    }
}
```

## 如果要传入的是表达式而不是字符串，需要用 v-bind:property 绑定 【demo2】

```
<User :name="3+4"></User>    // 布尔值
<User name="3+4"></User>     // 字符串
```

## v-bind

```
post: {
    id: 1,
    title: 'My Journey with Vue'
}
以下两种写法等价

<blog-post v-bind="post"></blog-post>
<blog-post v-bind:id="post.id"
           v-bind:title="post.title"></blog-post>
```

## 举例：【demo3】

## 非 Prop 的 Attribute

- 指的是父组件模板里在使用子组件时设置了属性，但
  子组件内没有通过 Props 接收
- 当组件返回单个根节点时，非 prop attribute 将自动添
  加到根节点的 attribute 中
- 在子组件里可以通过$attrs / this.$attrs 获取 attributes
- 如果想在非根节点应用传递的 attribute，使用 vbind="$attrs"

```
// Attribute传递
<div id="app">
    <user class="username" :data-user="username"></user>
</div>
<script src="https://unpkg.com/vue@next"></script>
<script>
    const User = {
        template: `<div>{{$attrs['data-user']}}</div>`
    }
    Vue.createApp({
        components: { User },
        data() {
            return { username: 'hunger' }
        }
    }).mount('#app')
</script>
```

```
// Prop、Attribute、非根节点应用
<div id="app">
    <username class="username" :error="errorMsg" @input="onInput"></username>
</div>
<script src="https://unpkg.com/vue@next"></script>
<script>
    const Username = {
        props: ['error'],
        template: `
<fieldset>
<legend>用户名</legend>
<input v-bind="$attrs">
<div>{{error}}</div>
</fieldset>
`
    }
    Vue.createApp({
        components: { Username },
        data() {
            return { errorMsg: '' }
        },
        methods: {
            onInput(e) {
                this.errorMsg = e.target.value.length < 6 ? "长
度不够":""
            }
        }
    }).mount('#app')
</script>
```

## 自定义事件

【demo4】

- 子组件内触发事件用 `this.$emit('my-event')`
- 父组件使用子组件时绑定
  `<component-a @my-event="doSomething"></component-a>`
- 推荐 `kebab-case` 事件名，区分大小写
- `<com v-model:foo="bar"></com>` 等价于 `<com :foo="bar"
@update:foo="bar=$event">`

【demo5】
`<com v-model:foo="bar"></com>` 等价于
`<com :foo="bar" @update:foo="bar=$event">`
