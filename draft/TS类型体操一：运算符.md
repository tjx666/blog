## 什么是类型体操

函数有高阶函数，就是参数为函数，返回一个封装过的函数。组件有高阶组件，传入一个组件，返回一个新的组件。

类型有高阶类型，在 TypeScript 就是传给一个 type 类型作为泛型参数，返回新的类型。可以把 TypeScript 中的 type 看做类型空间里的函数：

```typescript
type HigherOrderType<T> = {
  [K in keyof T]?: T[K];
};

type Person = {
  name: string;
  age: number;
};
// 传入一个类型 T，返回所以属性都变成可选的新类型
type PartialPerson = HigherOrderType<Person>;

/* 
// PartialPerson 的结果
type PartialPerson = {
    name?: string;
    age?: number;
}
*/
```

> 类型体操就是实现一些具有特殊功能的高阶类型

这是一个系列文章，预计有分为以下章节：

- 运算符篇
- 控制流篇
- 实例解析篇

## 类型运算符

先做个汇总，这里只列举我用过的：

- &：用于实现交叉类型（Intersection Type）
- |: 联合类型（Union Type）
- extends: 用于实现泛型参数约束或者条件类型
- as: 用于过滤 key 类型
- keyof：获取对象的 key 类型
- readonly: 实现属性只读
- -: 去除类型的 readonly 修饰或者可选修饰
- infer：通过模式匹配来推断类型，新增一个类型变量用于后序的类型计算
- ...: 类型世界的解构运算符，用于构造数组类型
- in: 用于遍历 key 类型
- ?: 用于实现条件类型，key 可选，元组类型成员可选
- this: 描述参数类型
- ThisType：this 上下文类型
- []：用于访问对象的值类型

### 交叉类型

#### 用法 一：作用于两个对象

两个对象类型使用 `&` 返回的类型包含所有的属性

```typescript
type A = { a: number }
type B = { b: string }
type Intersection = A & B;
const i: Intersection = {
    a: 1,
    b: 'b'
}
```

但是有公共的 key，但是值类型不一样那么返回的类型就是 never：

```typescript
type A = { a: number, common: boolean }
type B = { b: string, common: string }
// never 类型
type Intersection = A & B;
```

#### 用法二：作用于两个 Union

两个联合类型使用 `&` 返回它俩的数学意义上的交集

```typescript
type A = 'a' | 'c'
type B = 'b' | 'c'
type R = A & B;
// type R = "c"
```

#### 用法三：用于约束泛型参数类型

某种意义上的类型断言，为了的直观演示，这里有点刻意为之了：

```typescript
// 为了把类型 T 插到模板字符串类型中
// T & string 结果只能是 string 或者 never
type AppendPeriod<T> = `${T & string}。`;
type R = AppendPeriod<'我是一只鱼'>;
// type R = "我是一只鱼。"

// 正常情况可能直接就
type AppendPeriod1<T extends string> = `${T}。`;
type R1 = AppendPeriod<'我是一只小小鸟'>;
// type R1 = "我是一只小小鸟。"

```

实际用的时候往往是不方便通过泛型参数 extends 约束的时候才会这么用。例如 [type-challenges 第 5310 题](https://github.com/type-challenges/type-challenges/blob/master/questions/5310-medium-join/README.md)，字符串数组 Join 类型。这道题中如果通过 `T extends readonly string[]` 来约束成员类型，会导致后面推断 Rest 的类型反而不好处理，Rest 会被识别为 unknown[]，从而不能插进模板字符串。所以这里才 `T extends any[]`

```typescript
// Implement the type version of Array.join, Join<T, U> takes an Array T, string or number U and returns the Array T with U stitching up.

type Res = Join<["a", "p", "p", "l", "e"], "-">; // expected to be 'a-p-p-l-e'
type Res1 = Join<["Hello", "World"], " ">; // expected to be 'Hello World'
type Res2 = Join<["2", "2", "2"], 1>; // expected to be '21212'
type Res3 = Join<["o"], "u">; // expected to be 'o'

// 题解
type Join<T extends any[], U extends string | number> = T extends [
    infer First,
    ...infer Rest
]
    ? Rest extends []
        ? First
        : `${First & string}${U}${Join<Rest, U>}`
    : '';
```

### 联合类型

#### 用法一：做用于两个对象

返回的类型表示类型的或，意味着这个类型对应变量只能接受

