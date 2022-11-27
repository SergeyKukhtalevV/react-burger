import React from 'react';
import {Logo} from '@ya.praktikum/react-developer-burger-ui-components';
import {BurgerIcon, ListIcon, ProfileIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import {Typography} from '@ya.praktikum/react-developer-burger-ui-components';
import {Box} from '@ya.praktikum/react-developer-burger-ui-components';


const AppHeader = () => {
  return (
    <div>
      <ul >
      <li className="p-2"><BurgerIcon  type="primary" /><span className="text text_type_main-default">Конструктор</span></li>
        <li ><ListIcon type="primary" /><span className="text text_type_main-default">Лента заказов</span></li>
      </ul>
      <Logo />
      <ProfileIcon type="primary" /><span className="text text_type_main-default">Личный кабинет</span>
    </div>
  );
};

export default AppHeader;