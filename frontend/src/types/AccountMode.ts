export const AccountMode = {
    EDIT: 0,
    CREATE: 1,
    LOGIN: 2
} as const;

export type AccountMode = (typeof AccountMode)[keyof typeof AccountMode];
