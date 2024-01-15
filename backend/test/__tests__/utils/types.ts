type Cast<X, Y> = X extends Y ? X : Y
type ArrayElement<A> = A extends ReadonlyArray<infer T>
  ? T
  : never
export type FromEntries<T> = T extends Array<[infer Key, any]>
  ? { [K in Cast<Key, string>]: Extract<ArrayElement<T>, [K, any]>[1] }
  : { [key in string]: any }
