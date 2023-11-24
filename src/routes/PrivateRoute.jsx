import Cookies from "js-cookie";
import { Navigate, Outlet } from "react-router-dom"

export const PrivateRoute = () => {
  const user = Cookies.get('token');

  if(!user) {
    return <Navigate to='/login' />
  } else {
    return <Outlet />
  }

}