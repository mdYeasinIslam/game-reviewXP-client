import { useRouteError } from "react-router-dom";

type ErrorPage = {
    data: string
    status: number
    statusText:string
}

const ErrorHandler = () => {
    const error = useRouteError()
    console.log(error)
    const {data,status,statusText} = error as ErrorPage
    return (
        <div className="text-center mt-32"> 
            <header>
                <h1 className="text-3xl font-semibold">{status}</h1>
                <p>{ statusText}</p>
            </header>
            <main>
                <h3>{ data}</h3>
            </main>
        </div>
    );
};

export default ErrorHandler;