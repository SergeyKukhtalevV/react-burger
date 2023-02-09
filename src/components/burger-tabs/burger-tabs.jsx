import React, {useEffect} from 'react';
import {Tab} from '@ya.praktikum/react-developer-burger-ui-components';
import burgerTabsStyles from './burger-tabs.module.css'
import {useSelector} from "react-redux";

const BurgerTabs = () => {
  const { currentTab } = useSelector(store => store.ingredients);
  //console.log(currentTab);
  return (
    <div className={`mt-5 ${burgerTabsStyles.tabs}`}>
      <Tab value="Булки" active={currentTab === 'Булки'} >
        Булки
      </Tab>
      <Tab value="Соусы" active={currentTab === 'Соусы'} >
        Соусы
      </Tab>
      <Tab value="Начинки" active={currentTab === 'Начинки'} >
        Начинки
      </Tab>
    </div>
  )
};

export default BurgerTabs;
