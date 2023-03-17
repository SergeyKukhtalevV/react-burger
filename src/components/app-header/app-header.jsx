import React from 'react';
import {Logo, BurgerIcon, ListIcon, ProfileIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import appHeaderStyles from './app-header.module.css'
import {NavLink} from "react-router-dom";

const AppHeader = () => {
  const setActive = ({isActive}) => isActive ? `${appHeaderStyles.header__link} ${appHeaderStyles.header__link_active}`
    : `${appHeaderStyles.header__link} `;
  return (
    <header className={appHeaderStyles.header}>
      <ul className={appHeaderStyles.header__navbar}>
        <li>
          <ul className={`pt-4 pb-4 ${appHeaderStyles.header__menu}`}>
            <li className={`pl-5 pr-5`}>
              <NavLink to={"/"} className={setActive}>
                <BurgerIcon type="secondary"/>
                <span className="pl-2 text text_type_main-default">Конструктор</span>
              </NavLink>
            </li>
            <li className={`ml-2 pl-5 pr-5`}>
              <NavLink to={"/feed"} className={setActive}>
                <ListIcon type="secondary"/><span className="pl-2 text text_type_main-default text_color_inactive">Лента заказов</span>
              </NavLink>
            </li>
            <li className={`ml-25 pl-3`}>
              <Logo/>
            </li>
          </ul>
        </li>
        <li className={`pr-5`}>
          <NavLink to={"/profile"} className={setActive}>
            <ProfileIcon type="secondary"/>
            <span className="pl-2 text text_type_main-default ">Личный кабинет</span>
          </NavLink>
        </li>
      </ul>
    </header>
  );
};

export default AppHeader;
