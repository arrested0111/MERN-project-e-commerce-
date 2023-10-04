import { Outlet } from "react-router-dom";
import { useGetLoginCheckQuery } from "../../store/reducer/authSlice";

function RouteMiddleware(){

  let token = localStorage.getItem('token') ?? '';
  let {data, isLoading} = useGetLoginCheckQuery(token);
  if (!isLoading) {
      if (data.success) {
          return (
              <Outlet/>
          );
      } else {
          window.location.href = "/login";
      }
  }
}



export default RouteMiddleware;