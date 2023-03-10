import {Navigate, useLocation, useNavigate} from 'react-router-dom';
import {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {getFreshToken, getUserInfo} from "../../services/actions/user";
import {getCookie} from "../../utils/utils";

export const UnprotectedRouteElement = ({element}) => {
  const location = useLocation();
  const token = getCookie('token');
  const  fromPage = location.state?.from?.pathname || '/';
  if (!token) {
    return element;
  }
  return <Navigate to={fromPage}/>;
}
