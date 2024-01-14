type Count<Nums extends readonly number[], Num extends number, Result extends readonly unknown[] = []> =
Nums extends [infer First, ...infer Rest ]
? First extends Num 
    ? Count<Rest, Num, [...Result, unknown]>
    : Count<Rest, Num, Result>
: Result['length']

type X = Count<[1, 2, 2, 3], 2>  // => 
