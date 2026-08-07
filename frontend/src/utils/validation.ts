export const required = (
    value: string,
    message: string,
): string => {
    return value.trim() === "" ? message : "";
};

export const maxLength = (
    value: string,
    max: number,
    message: string,
): string => {
    return value.length > max ? message : "";
};

export const errorMessages = (
    value: string,
    validators: Array<(value: string) => string>
): string[] => {
    return validators
        .map(validator => validator(value))
        .filter(msg => msg !== "");
};


type ValidationRule = {
    key: string; // 項目名
    value: string;
    validators: Array<(value: string) => string>;
};

export const validateForm = (rules: ValidationRule[]) => {
    const result: Record<string, string[]> = {};

    rules.forEach(rule => {
        const msgs = errorMessages(rule.value, rule.validators);
        if (msgs.length > 0) {
            result[rule.key] = msgs;
        }
    });

    return result;
};
