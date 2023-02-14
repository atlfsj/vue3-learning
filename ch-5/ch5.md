## 1. 条件渲染 (`demo1`)

v-if 切换会创建/删除元素，v-show 切换只是元素
的展示/隐藏(display: none)

v-if 切换会创建/销毁组件， v-show 切换在创建完
组件后只会隐藏(display: none)

对于多个元素的控制可以用`<template>`包裹

![uTools_1676196834187.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/d6e8e658d3a9461e872923bbcdaf3e65~tplv-k3u1fbpfcp-watermark.image?)

## 2. v-for 列表渲染 (`demo2`)

v-for 可基于数组渲染列表

也可基于对象渲染列表

可以使用值的范围

可在组件上循环渲染

v-for 默认使用“就地更新”策略，数据项的顺序被改变，Vue 将不会移动 DOM 元素来匹配数据项的顺序，而是就地更新每个元素。

为能跟踪每个节点的身份，重用和重新排序现有元素，提升性能，需要使用 key

```
<li v-for="item in array">{{item}}</li>
<li v-for="(item, index) in array">{{item}}</li>
<li v-for="value in myObject">{{value}}</li>
<li v-for="(value, key) in myObject">{{key}}:
{{value}}</li>
<span v-for="n in 10">{{ n }} </span>     // 执行10次
<!--1,...,10-->
<my-component v-for="(item, index) in
items" :item="item" :key="item.id"></mycomponent>
```

## 3. 事件处理

@click 的值即可以是 methods 里的函数名，执行函
数时参数是点击事件

也可以是函数的调用，执行函数时参数是调用时传
递的参数，可以传递固定值，可传递 data 的属
性，也可传递$event

```
<span v-on:click="sayHello">click</span>
<span @click="sayHello">click</span>
<span @click="sayHello('hunger')">click</span>
<span @click="sayHello($event),
sayHi('hunger')">click</span>
<span @click.once="sayHello(name)">click</span>
<span @click.stop="sayHello">click</span>

Vue.createApp({
            data() {
                return { name: 'hunger' }
            },
            methods: {
                sayHello(arg) { console.log(arg) },
                sayHi(arg) { console.log(arg) }
            },
        }).mount('#app')
```

## 4. v-model 双向绑定 (`demo3`)

主要用于输入框表单

```
<input v-model="message" /> {{ message }}
<textarea v-model.lazy="message"></textarea> {{ message }}

<input type="checkbox" v-model="checked" /> {{checked}}

<!-- 复选框 -->
<input type="checkbox" value="a" v-model="list" />
<input type="checkbox" value="b" v-model="list" /> {{list}}

<!-- 单选框 -->
<input type="radio" value="a" v-model="theme" />
<input type="radio" value="b" v-model="theme" /> {{theme}}

<!-- select -->
<select v-model="selected">
    <option value="AA">A</option>
    <option value="BB">B</option>
    <option value="CC">C</option>
</select>
{{selected}}
```

![uTools_1676370654882.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/de025aa45a3b4fc8bc4b83c67a11ee93~tplv-k3u1fbpfcp-watermark.image?)

## 5. 组件基础 (`dmeo4`)

每个组件维护独立的数据

app.component('组件名',{}) 注册组件

通过 Prop 向子组件传递数据

子组件触发事件来实现子传父

## 6. v-model 实现组件双向绑定 (`demo5`)

父组件通过 v-model="属性" 把属性传递给子组件

子组件内有一个 modelValue 的 Prop，接收父组件传递的数据。

子组件通过触发 update:modelValue 修改父组件绑定的属性

```
<input v-model="searchText" />
<!--等价于-->
<input :value="searchText" @input="searchText =
$event.target.value" />
```

## 7. 单向数据流

### 什么是单向数据流？

很多框架都使用单向数据流，指的是子组件能直接传递数据给子组件，子组件不能随意修改子组件状态

###　为什么要单向？
单向数据流的目的是让数据的传递变得简单、可控、可追溯。假设都是用双向数据流，父组件维护一个状态，并且传递给所
有的子组件。当其中一个子组件通过双向数据流直接修改父组件的这个状态时，其他子组件也会被修改。当这个结果产生时
我们无法得知是哪个子组件修改了数据，在项目庞大时数据的管理和追溯变得更复杂。

### 如果要双向如何实现？

一般来说，父组件可通过设置子组件的 props 直接传递数据给子组件。子组件想传递数据给父组件时，可以在内部 emit 一
个自定义事件，父组件可在子组件上绑定该事件的监听，来处理子组件 emit 的事件和数据。
在 Vue 里，v-model 实现的所谓双向绑定，本质上就这种⽅式。
