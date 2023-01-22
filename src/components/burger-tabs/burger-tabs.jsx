import React from 'react';
import {Tab} from '@ya.praktikum/react-developer-burger-ui-components';
import burgerTabsStyles from './burger-tabs.module.css'

const BurgerTabs = (currentActiveTab) => {
  const [current, setCurrent] = React.useState('Булки')
  return (
    <div className={`mt-5 ${burgerTabsStyles.tabs}`}>
      <Tab value="Булки" active={current === 'Булки'} onClick={setCurrent}>
        Булки
      </Tab>
      <Tab value="Соусы" active={current === 'Соусы'} onClick={setCurrent}>
        Соусы
      </Tab>
      <Tab value="Начинки" active={current === 'Начинки'} onClick={setCurrent}>
        Начинки
      </Tab>
    </div>
  )
};

export default BurgerTabs;
