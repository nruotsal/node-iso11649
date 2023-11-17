interface GenerateOptions {
    pretty?: boolean;
}
declare function generate(reference?: string, options?: GenerateOptions): string;

declare function validate(reference: string): boolean;

declare function parse(reference: string): string | null;

export { generate, parse, validate };
