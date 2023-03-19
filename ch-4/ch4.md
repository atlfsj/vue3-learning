## 响应式原理

追踪数据的变化，在读取数据或者设置数据时能劫持做一些操作（[数据拦截](https://www.cnblogs.com/bbxiaxia1998/p/16757099.html)）

使用 Object.defineProperty

使用 Proxy

```
var obj = {}
var age
Object.defineProperty(obj, 'age', {
    get: function(){
        console.log('get age...')
        return age
    },
    set: function(val){
        console.log('set age...')
        age = val
    }
})
obj.age = 100 // 'set age...'
console.log(obj.age) // 'get age...', 100
```

## 1. [Object.defineProperty()](https://blog.csdn.net/weixin_46726346/article/details/115913752)实现响应式

在 Vue 中其实就是通过 Object.defineProperty 来劫持对象属性的 setter 和 getter 操作，并“种下”一个监听器，当数据发生变化的时候发出通知，可以控制对象属性的设置和读取。

如下例，本来输入 data.name 就打印'hunger',现在对 data 做其他操作

对下例对象观测后，之后新增的属性无响应式

```
<script>
    function observe(data) {
            if (!data || typeof data !== 'object') return
            for (var key in data) {
                let val = data[key]
                Object.defineProperty(data, key, {
                    enumerable: true,
                    configurable: true,
                    get: function () {
                        track(data, key)
                        return val
                    },
                    set: function (newVal) {
                        trigger(data, key, newVal)
                        val = newVal
                    }
                })
                if (typeof val === 'object') {
                    observe(val)
                }
            }
        }
//////////////////////////////////////////////////////////
        function track(data, key) {
            console.log('get data ', key)
        }

        function trigger(data, key, value) {
            console.log('set data', key, ":", value)
        }
//////////////////////////////////////////////////////////
        var data = {
            name: 'hunger',
            friends: [1, 2, 3]
        }
        observe(data)

        console.log(data.name)
        data.name = 'valley'
        data.friends[0] = 4
        data.friends[3] = 5 // 非响应式
        data.age = 6  //非响应式
</script>
```

## 2. [Proxy 和 Reflect](https://www.jianshu.com/p/c440aac3ab1a)

Proxy 对象用于创建一个对象的代理，从而实现基本操作的拦截和自定义（如属性查找、赋值、枚举、函数调用等）

Reflect 是一个内置的对象，它提供拦截 JavaScript 操作的用法，这些用法和 Proxy handlers 相同

Reflect.set(target, propertyKey, value[, receiver])将值分配给属性的函数。返回一个 Boolean，如果更新成功，则返回 true。

Reflect.get(target, propertyKey[, receiver])获取对象身上某个属性的值，类似于 target[name]。

```
const dinner = {
            meal: 'tacos'
        }
        const handler = {
            get(target, prop) {
                console.log('get...', prop)
                //return target[prop]
                return Reflect.get(...arguments)
            },
            set(target, key, value) {
                console.log('set...', key, value)
                //target[key] = value
                return Reflect.set(...arguments)
            }
        }
        const proxy = new Proxy(dinner, handler)
        // 用handler操作dinner
        console.log(proxy.meal)
```

![uTools_1676128983888.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/96c8a461d5094956a91ec68e03889d0a~tplv-k3u1fbpfcp-watermark.image?)

**proxy 代理整个对象，对其他任何属性操作均有效。**

**Object.defineProperty()只监控一个属性，要遍历对象所有属性才能操作其他属性。**

## 问题

1. Vue3 的响应式原理和 Vue2 有什么不同
2. 手写 reactive 实现 track trigger
3. 用 Proxy 和 Object.defineProperty 相比有什么优点

## 答案

1. 前者是使用 Proxy，后者是使用 Object.defineProperty。前者 IE 兼容较差。
2. demo2(用了递归)
3. Proxy 能劫持整个对象，而 Object.defineProperty 只能
   劫持对象的属性；前者递归返回属性对应的值的代理
   即可实现响应式，后者需要深度遍历每个属性；后者
   对数组的操作很不友好

## [补充](https://juejin.cn/post/7197414988058132541)
