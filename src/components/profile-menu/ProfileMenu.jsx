import React, {useEffect} from 'react';
import styles from "./profile-menu.module.css";
import {NavLink, useNavigate} from "react-router-dom";
import {Outlet} from "react-router";
import {getLogOutUser, getUserInfo} from "../../services/actions/user";
import {useDispatch, useSelector} from "react-redux";
import {getCookie} from "../../utils/utils";

const ProfileMenu = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = getCookie('token');
  const {accessToken} = useSelector(store => store.user);
  const getOut = () => {
    dispatch(getLogOutUser({token}));
  }

  useEffect(() => {
    const token = getCookie('token');
    if (!token) {
      navigate('/login');
    }
    dispatch(getUserInfo({accessToken}));

  }, // eslint-disable-next-line
    [accessToken]);

  const setActive = ({isActive}) => isActive ? `${styles.link} text text_type_main-medium ${styles.link_active}`
    : `${styles.link} text text_type_main-medium`;

  return (
    <main className={styles.wrapper}>
      <div className={styles.container}>
        <ul className={styles.menu}>
          <li>
            <NavLink to="/profile" className={setActive} end
            >Профиль</NavLink>
          </li>
          <li>
            <NavLink to={"/profile/orders"} className={setActive}>История
              заказов</NavLink>
          </li>
          <li>
            <NavLink to={"/login"} className={setActive} onClick={getOut}>Выход</NavLink>
          </li>
          <li className={"mt-20 "}>
            <p className={"text text_type_main-default text_color_inactive"}>В этом разделе вы можете
              изменить свои персональные данные</p>
          </li>
        </ul>

        <Outlet/>

      </div>
    </main>
  );
};

export default ProfileMenu;
