// 宿主侧（Node 进程）插件入口，对应 lib/index.js
export const inject: string[];
export const name: string;
export function apply(ctx: unknown): void;
