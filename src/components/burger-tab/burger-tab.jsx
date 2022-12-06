import React from 'react';
import {Tab} from '@ya.praktikum/react-developer-burger-ui-components';
import burgerTabStyles from './burger-tab.module.css'

const BurgerTab = () => {
  const [current, setCurrent] = React.useState('Булки')
  return (
    <div className={`mt-5 ${burgerTabStyles.tab}`}>
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

export default BurgerTab;
