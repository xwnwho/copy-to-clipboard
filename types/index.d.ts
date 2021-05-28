declare const clipboardToIE11Formatting: {
    'text/plain': string;
    'text/html': string;
};
interface Options {
    debug?: boolean;
    format?: keyof typeof clipboardToIE11Formatting;
}
declare const copy: (text: string, options?: Options) => Promise<boolean | Error>;
export default copy;
