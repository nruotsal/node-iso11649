export interface GenerateOptions {
  reference?: string;
  pretty?: boolean;
}

declare function generate(reference?: string) => string;
declare function generate(options: GenerateOptions) => string;
declare function validate(reference: string) => boolean;
declare const parse: (reference: string) => string | null;

export { generate, validate, parse }
