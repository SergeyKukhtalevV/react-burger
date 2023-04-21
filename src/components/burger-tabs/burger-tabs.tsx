import React, {FC} from 'react';
import {Tab} from '@ya.praktikum/react-developer-burger-ui-components';
import burgerTabsStyles from './burger-tabs.module.css'
import {useSelector} from '../../services/hooks';


const BurgerTabs: FC<React.ButtonHTMLAttributes<HTMLBodyElement>> = () => {
  const { currentTab } = useSelector(store => store.ingredients);
  const consoleTab = (currentTab: string) => {
    console.log(currentTab);
  }
  return (
    <div className={`mt-5 ${burgerTabsStyles.tabs}`}>
      <Tab value="Булки" active={currentTab === 'Булки'} onClick={(currentTab) => consoleTab(currentTab)} >
        Булки
      </Tab>
      <Tab value="Соусы" active={currentTab === 'Соусы'} onClick={(currentTab) => consoleTab(currentTab)}>
        Соусы
      </Tab>
      <Tab value="Начинки" active={currentTab === 'Начинки'} onClick={(currentTab) => consoleTab(currentTab)}>
        Начинки
      </Tab>
    </div>
  )
};

export default BurgerTabs;
