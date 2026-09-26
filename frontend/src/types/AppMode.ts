export const AppMode = {
 LOGIN: 0,
 MAIN: 1
} as const;

export type AppMode = (typeof AppMode)[keyof typeof AppMode];