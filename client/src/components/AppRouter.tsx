import { FC } from 'react'
import { RouterProvider } from 'react-router-dom';
import { router } from '../routes/routeconfig';

interface AppRouterProps {} 


const AppRouter : FC<AppRouterProps> = () => {
return(
  <RouterProvider router={router} /> )
} 

export default AppRouter;