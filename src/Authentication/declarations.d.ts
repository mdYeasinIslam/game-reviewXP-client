// declare module '@lottiefiles/dotlottie-react' {
//     const DotLottieReact: any;
//     export default DotLottieReact;
// }
declare module '@lottiefiles/dotlottie-react' {
    interface DotLottieReactProps {
        src: string;
        autoplay?: boolean;
        loop?: boolean;
        onEvent?: (event: string) => void;
        [key: string]: any;
    }

    const DotLottieReact: React.FC<DotLottieReactProps>;
    export {DotLottieReact};
}