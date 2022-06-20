export type Parameter<T> = T extends (p: infer P) => any ? P : never;
