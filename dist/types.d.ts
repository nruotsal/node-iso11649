export interface GenerateOptions {
  reference?: string;
  pretty?: boolean;
}

declare function generate(reference?: string) => string;
declare function generate(options: GenerateOptions) => string;
declare function validate(reference: string) => boolean;

export { generate, validate }
