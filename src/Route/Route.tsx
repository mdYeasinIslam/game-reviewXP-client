import {createBrowserRouter, RouterProvider} from 'react-router-dom'
import Main from '../Layout/Main';
import Home from '../Pages/Home/Home';
import About from '../Pages/About/About';
import SignIn from '../Authentication/SignIn';
import SignUp from '../Authentication/SignUp';
import AllReviews from '../Pages/ReviewSection/AllReviews';
import AddReviews from '../Pages/ReviewSection/AddReview/AddReviews';
import PrivateRoot from './PrivateRoot';
import AllWatchList from '../Pages/ReviewSection/WatchLists/AllWatchList';
import ErrorHandler from '../ErroPage/ErrorHandler';
import ReviwDetails from '../Pages/ReviewSection/ReviwDetails';
import My_allReviews from '../Pages/ReviewSection/My_Reviews/My_allReviews';
import GameDetails from '../Pages/Home/AllGames/GameDetails';


const Route = () => {
    const routes = createBrowserRouter([
        {
            path: '/',
            element: <Main />,
            errorElement:<ErrorHandler/>,
            children: [
                {
                    path: '/',
                    element:<Home/>
                },
                {
                    path: '/allGames/:id',
                    element: <GameDetails />,
                    loader: ({ params }) => fetch(`https://b10-game-review-server.vercel.app/allGames/${params.id}`)
                },
                {
                    path: '/signIn',
                    element:<SignIn/>
                },
                {
                    path: '/signUp',
                    element:<SignUp/>
                },
                {
                    path: '/allReviews',
                    element:<AllReviews/>
                },
                {
                    path: '/allReviews/:id',
                    element: <PrivateRoot><ReviwDetails /></PrivateRoot>,
                    loader: ({ params }) => fetch(`https://b10-game-review-server.vercel.app/reviews/${params.id}`)
                },
                {
                    path: '/addReviews',
                    element: <PrivateRoot><AddReviews /></PrivateRoot>
                },
                
                {
                    path: '/displayMyReviews',
                    element: <PrivateRoot><My_allReviews /></PrivateRoot>
                }, {
                    path: '/watchList',
                    element: <PrivateRoot><AllWatchList /></PrivateRoot>,
                    loader: () => fetch(`https://b10-game-review-server.vercel.app/watchlist`)
                },
                {
                    path: '/about',
                    element: <About />
                }
            ]
        }
    ])

    return (
        <RouterProvider router={routes}/>
    );
};

export default Route;