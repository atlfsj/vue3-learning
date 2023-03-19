## 应用实例与组件实例

### 1. 创建 app 应用实例， vm 根组件实例

### 2. 生命周期：

```
beforeCreate
在实例初始化之后，数据观测 (data observer) 和 event/watcher 事件配置之前被调用

created
在实例创建完成后被立即调用。在这一步，实例已完成以下的配置：数据观测
(data observer)，property 和方法的运算，watch/event 事件回调。然而，挂载阶段还没开始，$el property 目前尚不可用

beforeMount
在挂载开始之前被调用：相关的 render 函数首次被调用

mounted
实例被挂载后调用，这时 Vue.createApp({}).mount() 被新创建的 vm.$el 替
换了。如果根实例挂载到了一个文档内的元素上，当 mounted 被调用时 vm.$el 也
在文档内。

beforeUpdate
数据更新时调用，发生在虚拟 DOM 打补丁之前

updated
由于数据更改导致的虚拟 DOM 重新渲染和打补丁，在这之后会调用该钩子

beforeUnmount
在卸载组件实例之前调用。在这个阶段，实例仍然是完全正常的

unmounted
卸载组件实例后调用。调用此钩子时，组件实例的所有指令都被解除绑定，所有事
件侦听器都被移除，所有子组件实例被卸载
```

![uTools_1675767675572.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/2258af87524d4fc1b26a8bb325c6a836~tplv-k3u1fbpfcp-watermark.image?)

### 3. 生命周期测试（demo2）

![uTools_1675782155889.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/8ad29afd78694e7e9e1ac88c893013b1~tplv-k3u1fbpfcp-watermark.image?)

### 4. 组件销毁测试

![uTools_1675784270764.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/e4e598dd74c94e4fa8417f1a1a28ef6d~tplv-k3u1fbpfcp-watermark.image?)

### 问题

1. Vue 有哪些生命周期钩⼦？
2. 如果需要发送 Ajax 请求，最好放在哪个钩⼦内？
3. 父子组件嵌套时，⽗组件视图和⼦组件视图渲染完成谁先谁后？
4. 父子组件嵌套时，如果希望在所有组件视图都渲染完成后再执⾏操
   作，该如何做？

### 解答

1. beforeCreate、created、beforeMount、mounted、beforeUpdate、updated、beforeUnmount、unmounted
2. created
3. 不确定
4.

```
mounted() {
 this.$nextTick(function () {
 // 仅在渲染整个视图之后运⾏的代码
 })
 }
```

### [补充](https://juejin.cn/post/7197414988058132541)
