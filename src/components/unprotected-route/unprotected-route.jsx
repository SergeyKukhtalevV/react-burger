import {Navigate, useNavigate} from 'react-router-dom';
import {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {getFreshToken, getUserInfo} from "../../services/actions/user";
import {getCookie} from "../../utils/utils";

export const UnprotectedRouteElement = ({element}) => {
  const dispatch = useDispatch();
  const {accessToken} = useSelector(store => store.user);
  const [data, setData] = useState({token: getCookie('token')});
  const [isUserLoaded, setUserLoaded] = useState(false);
  const init = async () => {
    await dispatch(getFreshToken(data));
    dispatch(getUserInfo({'accessToken': accessToken}))
    setUserLoaded(true);
  };

  useEffect(()=> {
    init()
      .then(
        dispatch(getUserInfo({'accessToken': accessToken}))
  ).catch( err =>
      console.log('Ошибка, запрос на получения данных пользователя не выполнен', err))
  },[dispatch]);

  if (!isUserLoaded) {
    return null;
  }

    if (!accessToken) {
      return element;
    } else {
      return <Navigate to="/" replace/>;
    }
}
