import React from 'react';
import {Logo} from '@ya.praktikum/react-developer-burger-ui-components';
import {BurgerIcon, ListIcon, ProfileIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import appHeader from './appHeader.module.css'
// import {Typography} from '@ya.praktikum/react-developer-burger-ui-components';
// import {Box} from '@ya.praktikum/react-developer-burger-ui-components';


const AppHeader = () => {
  return (
    <header className={appHeader.header}>
      <ul className={appHeader.header__navbar}>
        <li>
          <ul className={`pt-4 pb-4 ${appHeader.header__menu}`}>
            <li className={`pl-5 pr-5`}>
              <a className={` ${appHeader.header__link}`}>
                <BurgerIcon type="primary"/>
                <span className="pl-2 text text_type_main-default">Конструктор</span>
              </a>
            </li>
            <li className={`ml-2 pl-5 pr-5`}>
              <a className={`${appHeader.header__link}`}>
                <ListIcon type="primary"/><span className="pl-2 text text_type_main-default text_color_inactive">Лента заказов</span>
              </a>
            </li>
            <li className={`ml-25 pl-3`}>
              <Logo/>
            </li>
          </ul>
        </li>
        <li className={`pr-5`}>
          <a className={`${appHeader.header__link}`}>
            <ProfileIcon type="primary"/>
            <span className="pl-2 text text_type_main-default text_color_inactive">Личный кабинет</span>
          </a>
        </li>
      </ul>
    </header>
  );
};

export default AppHeader;