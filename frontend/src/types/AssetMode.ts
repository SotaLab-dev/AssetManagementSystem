export const AssetMode = {
    EDIT: 0,
    CREATE: 1
} as const;

export type AssetMode = (typeof AssetMode)[keyof typeof AssetMode];



