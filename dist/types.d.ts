declare const generate: (reference?: string) => string;
declare const validate: (reference: string) => boolean;
declare const parse: (reference: string) => string | null;

export { generate, validate, parse }
