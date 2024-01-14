
## 判断是否是 never 类型

```typescript
type IsNever<T> = [T] extends [never] ? true : false
type IsNever<T> = (() => T) extends () => never ? true : false
```

never extends never 返回都是 never，使用元组或者函数包装一下都能正确判断。

```typescript
type IsNever<T> = T extends never ? true : false
type X = IsNever<never> // => never
```

## 判断类型相等

```typescript
type Equals<A, B> = (<T>() => T extends A ? 0 : 1) extends (<T>() => T extends B ? 0 : 1) ? true : false
```

多数人都会想到使用双向 extends 的方法，它能处理 **子类 extends 父类** 的情况，用元组包一下还能处理 `never`，但是处理不了 **any**：

```typescript
type Equals<A, B> = [A] extends [B]
    ? [B] extends [A]
        ? true
        : false
    : false;

type A = Equals<any, '1'> // true
```

## 表示键类型

TS 有内置类型 `PropertyKey`：

```typescript
type PropertyKey = string | number | symbol
```

## 表示一个键值对

麻烦的写法：

```typescript
type TupleToObject<T extends [any, any]> = {
    [K in T[0]]: T[1]
}

type X = TupleToObject<['name', 'ly']> // => { name: "ly" } 
```

可以直接用 Record：

```typescript
type TupleToObject<T extends [any, any]> = Record<T[0], T[1]>
```

## 交叉类型转接口类型

麻烦的写法：

```typescript
type IntersectionToInterface<I> = {
    [K in keyof I]: I[K]
}
type X = IntersectionToInterface<{ name: 'ly' } & { age: 27 }> // => { name: "ly"; age: 27; }
```

简写：

```typescript
type IntersectionToInterface<I> = Omit<I, never>
```

由此，可以可以把 Merge 类型写的非常简单：

```typescript
type IntersectionToInterface<I> = Omit<I, never>
type Merge<A, B> = IntersectionToInterface<Omit<A, keyof B> & B>

type A = {
    name: 'ly',
    age: 27
}

type B = {
    name: 'YuTengjing',
    height: 170
}

type C = Merge<A, B>

/*
type C = {
    name: "YuTengjing";
    age: 27;
    height: 170;
}
*/
```

## 类型映射可以使用 as 对 key 进行过滤

例如不用 Exclude 实现一个 MyOmit 类型：

```typescript
type MyOmit<T, L extends keyof T> = {
 [K in keyof T as K extends L ? never : K]: T[K]
}

type X = MyOmit<{name: 'ly', age: 27 }, 'name'>
/*
type X = {
    age: 27;
}
*/
```

## 类型映射对数组类型也是适用的

```typescript
type NumsToStrs<Arr extends readonly number[]> = 
{
    [K in keyof Arr]: `${Arr[K]}`
}

type Strs = NumsToStrs<[1, 2, 3]> // => type Strs = ["1", "2", "3"]
```

## infer + extends

在模式匹配的时候可以结合 extends 来限定 infer 出的类型

### 模板字符串中匹配数字

```typescript
// TS 没有 NaN 字面量类型
type StringToNumber<S extends string> = S extends `${infer Num extends number}${string}` ? Num : never; 
type A = StringToNumber<''> // => never
type B = StringToNumber<'1'> // => 1
type C = StringToNumber<'1.2'> // => 1
```

### 在对元组使用模式匹配时能正确识别成员类型

```typescript
type Count<Nums extends readonly number[], Num extends number, Result extends readonly unknown[] = []> =
Nums extends [infer First, ...infer Rest extends readonly number[]]
? First extends Num 
    ? Count<Rest, Num, [...Result, unknown]>
    : Count<Rest, Num, Result>
: Result['length']

type X = Count<[1, 2, 2, 3], 2>  // => type X = 2;
```

默认情况下 TS 推断上面 Rest 类型为 `unknown[]`，可以使用 extends 让 TS 只匹配时 `readonly number[]` 的情况。

## 数组参数推断为元组

场景：

```typescript
type GetReturn<T extends readonly any[]> = T extends readonly [infer First, ...infer Rest]
? [Awaited<First>, ...GetReturn<Rest>]
: T extends [] 
 ? []
 : T extends Array<infer E>
  ? Array<Awaited<E>>
  : []

declare function PromiseAll< T extends readonly any[]>(values: T): Promise<GetReturn<T>>;
const R = PromiseAll([1, 2, 3]) // const R: Promise<number[]>
```

有没有办法推断触结果为 `Promise<1, 2, 3>`，这里的核心问题在于，按照我们定义函数参数 values 的方式，目前这种方式定义推出的 values 是 number[] 类型。

### 解构一次

```typescript
declare function PromiseAll< T extends readonly any[]>(values: readonly [...T]): Promise<GetReturn<T>>;
// => const R: Promise<[number, number, number]>
```

通过将类型参数 T 解构一次来提示 TS 编译器将 values 尽可能推断为元组，但是这种方式没法将 values 推断为字面量类型。

### 常量泛型参数

TS 5.0 引进的一个新语法：[const Type Parameters](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-5-0.html#const-type-parameters)，允许你对泛型参数标记为 const，这样 TS 在对函数参数推断时会直接将参数推断为字面类型：

```typescript
declare function PromiseAll<const T extends readonly any[]>(values: T): Promise<GetReturn<T>>;
const R = PromiseAll([1, 2, 3])
// => const R: Promise<[1, 2, 3]>
```

## 排列组合问题

按照返回得类型可以分为字符串类型和数组类型。

### 实现排列组合的手段

1. extends 左侧类型是 union 具有分配特性
2. 对元组使用 number 类型索引返回的是成员 union
3. 模板字符串参数为 union 会返回所有组合
4. 对数组 union 解构，返回的是 union

```typescript
// 1
type NumberToString<U extends number, E = U> =  E extends U ? `${E}` : never
type X = NumberToString<1 | 2 | 3> // => type X = "1" | "2" | "3"

// 2
type Menbers =  [1, 2, 3, 4][number] // => type Menbers = 4 | 1 | 2 | 3

// 3
type S = `${'a' | 'b'}${'c' | 'd'}` // type S = "ac" | "ad" | "bc" | "bd"

// 4
type Arr = [1, ...([2] | [3])] // type Arr = [1, 2] | [1, 3]
```

灵活运用上面四个基本手段，可以解决大多数排列组合问题。但是这些知识一些类型上的技巧，本质上解决一个类型体操问题还是需要找到问题的思路，多数体操问题可以用递归来解决问题。

### 实战解析

#### 全排列

原题：[permutation](https://typehero.dev/challenge/permutation)

递归思路：第一个坑位可以选取任意一个成员，然后对剩下的元素全排列，和第一个坑位组合的结果就是要的结果。

利用了手段 1 和 4，需要注意的是对 never 进行解构会导致整个数组返回 never 类型，这里 Exclude<U, E> 最后会是 never，所以最开始需要判断是否为 never。

````typescript
type Permutation<U, E = U> = [U] extends [never]
 ? []
 : E extends U
  ? [E, ...Permutation<Exclude<U, E>>]
  : never;

type X = Permutation<"A" | "B" | "C">;
// type X = ["A", "B", "C"] | ["A", "C", "B"] | ["B", "A", "C"] | ["B", "C", "A"] | ["C", "A", "B"] | ["C", "B", "A"]
```ss

#### 不去重的组合

原题：[combination](https://typehero.dev/challenge/combination)

递归思路：组合要求至少有一个元素，那第一个坑位可以是任意一个成员，此时有两种选择，要和不和剩余元素组合，要么和剩下的元素的组合进行组合。

利用了手段1, 2 和 3。

```typescript
type Comb<U extends string, E = U> = E extends U ? `${E}${` ${Comb<Exclude<U, E>>}` | ""}` : "";
type Combination<T extends readonly string[]> = Comb<T[number]>;
type X = Combination<["foo", "bar", "baz"]>;
// => type X = "foo" | "bar" | "baz" | "bar baz" | "baz bar" | "foo bar" | "foo baz" | "foo bar baz" | "foo baz bar" | "baz foo" | "bar foo" | "bar foo baz" | "bar baz foo" | "baz foo bar" | "baz bar foo"

````

#### 元组全排列

原题：[permutations-of-tuple](https://typehero.dev/challenge/permutations-of-tuple)

测试用例：

```typescript
Expect<Equal<
    PermutationsOfTuple<[any, unknown, never]>,
    | [any, unknown, never]
    | [unknown, any, never]
    | [unknown, never, any]
    | [any, never, unknown]
    | [never, any, unknown]
    | [never, unknown, any]
  >>
```

这道题难点在于如果使用 number 索引元组返回得类型不对，你可能会想说先把数组 map 成每个成员被一个元组包围再去做全排列（也就是 [[any], [unknown], [never]]），我试过，很麻烦，而且还其它问题。所以这道题其实不适合用 number 去索引元组类型。

我们可以采用循环插入的方式来解决：

1. 这里的递归作用其实只是起到的循环遍历成员的作用
2. 将每个成员插入之前的结果
3. 每次插入的时候利用 union extends 分配特性

```typescript
type Insert<
  T extends unknown[],
  U
> = 
T extends [infer F,...infer L]
  ? [F,U,...L] | [F,...Insert<L,U> ] 
  : [U]

// 
type PermutationsOfTuple<
  T extends unknown[],
  R extends unknown[] = []
> = 
T extends [infer F,...infer L]?
  PermutationsOfTuple<L,Insert<R,F> | [F,...R] >
  :R
```

## 分享几道精妙的体操题

## [Zip](https://typehero.dev/challenge/zip)

这道题就是说给定两个元组 A 和 B，返回一个元组 C， 满足：C[index] = [A[index], B[index]]

```typescript
import type { Equal, Expect } from '@type-challenges/utils'

type cases = [
  Expect<Equal<Zip<[], []>, []>>,
  Expect<Equal<Zip<[1, 2], [true, false]>, [[1, true], [2, false]]>>,
  Expect<Equal<Zip<[1, 2, 3], ['1', '2']>, [[1, '1'], [2, '2']]>>,
  Expect<Equal<Zip<[], [1, 2, 3]>, []>>,
  Expect<Equal<Zip<[[1, 2]], [3]>, [[[1, 2], 3]]>>,
]
```

正常人的解法：

```typescript
type Zip<
 A extends readonly any[],
 B extends readonly any[],
 R extends readonly any[] = [],
 RL extends number = R["length"],
> = R["length"] extends A["length"] | B["length"] ? R : Zip<A, B, [...R, [A[RL], B[RL]]]>;

```

牛逼的解法，将模式匹配发挥到极致：

```typescript
type Zip<T extends readonly any[], U extends readonly any[]> = [T, U] extends [
 [infer TF, ...infer TR],
 [infer UF, ...infer UR],
]
 ? [[TF, UF], ...Zip<TR, UR>]
 : [];
```

### [Integer](https://typehero.dev/challenge/integer)

这道题判断给定类型是否为整数。

```typescript
let x = 1
let y = 1 as const

type cases1 = [
  Expect<Equal<Integer<1>, 1>>,
  Expect<Equal<Integer<1.1>, never>>,
  Expect<Equal<Integer<1.0>, 1>>,
  Expect<Equal<Integer<1.000000000>, 1>>,
  Expect<Equal<Integer<0.5>, never>>,
  Expect<Equal<Integer<28.00>, 28>>,
  Expect<Equal<Integer<28.101>, never>>,
  Expect<Equal<Integer<typeof x>, never>>,
  Expect<Equal<Integer<typeof y>, 1>>,
]
```

正常人的解法

```typescript
type Integer<T extends number> = `${T}` extends `${infer Int extends number}.${string}` 
 ? never
 : number extends T
  ? never
  : T

```

神的解法：

```typescript
type Integer<T extends number> = `${T}` extends `${bigint}` ? T : never;
```
