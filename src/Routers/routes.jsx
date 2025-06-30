import {createBrowserRouter} from 'react-router-dom';

import App from '../App';
import Register from '../Pages/Register';
import Login from '../Pages/Login';
import ResetLink from '../Pages/ResetLink';
import ResetPassword from '../Pages/ResetPassword';
import Conversation from '../Pages/Conversation';
import ConversationError from '../Pages/ConversationError';
import RootError from '../Pages/RootError';

import registerAction from './Actions/registerAction';
import loginAction from './Actions/loginAction';
import resetLinkAction from './Actions/resetLinkAction';
import resetPasswordAction from './Actions/resetPasswordAction';
import appAction from './Actions/appAction';
import conversationAction from './Actions/conversationAction';

import registerLoader from './Loaders/registerLoader';
import loginLoader from './Loaders/loginLoader';
import resetLinkLoader from './Loaders/resetLinkLoader';
import resetPasswordLoader from './Loaders/resetPasswordLoader';
import appLoader from './Loaders/appLoader';
import conversationLoader from './Loaders/conversationLoader';

const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        loader: appLoader,
        action: appAction,
        errorElement: <RootError/>,
        children: [
            {
                path: '/:conversationId',
                element: <Conversation />,
                loader: conversationLoader,
                action: conversationAction,
                errorElement: <ConversationError />,
            },
        ]
    },

    {
        path: '/register',
        element: <Register />,
        loader: registerLoader,
        action: registerAction,
    },

    {
        path: '/login',
        element: <Login />,
        loader: loginLoader,
        action: loginAction,
    },

    {
        path: '/reset-link',
        element: <ResetLink />,
        loader: resetLinkLoader,
        action: resetLinkAction,
    },

    {
        path: '/reset-password',
        element: <ResetPassword />,
        loader: resetPasswordLoader,
        action: resetPasswordAction,
    },
]);

export default router;