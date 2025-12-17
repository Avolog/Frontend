import { createBrowserRouter } from 'react-router-dom';
import Login from '../pages/Login';
import Main from '../pages/Main';
import GoogleCallback from '../pages/GoogleCallback';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Login />,
  },
  {
    path: '/main',
    element: <Main />,
  },
  {
  path: '/auth/google/callback',
  element: <GoogleCallback />
  },
]);

export default router;
