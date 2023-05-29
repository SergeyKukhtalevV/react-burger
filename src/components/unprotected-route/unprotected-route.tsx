import {Navigate, useLocation} from 'react-router-dom';
import {getCookie} from "../../utils/utils";
import {FC} from 'react';
import {TElement} from "../../services/types/data";

export const UnprotectedRouteElement: FC<TElement> = ({element}) => {
  const location = useLocation();
  const token = getCookie('token');
  const  fromPage = location.state?.from?.pathname || '/';
  if (!token) {
    return element;
  }
  return <Navigate to={fromPage}/>;
}
