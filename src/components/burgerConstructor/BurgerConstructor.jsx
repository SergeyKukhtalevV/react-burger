import React from 'react';
import data from '../../utils/data';
import burgerConstructor from "./burgerConstructor.module.css";
import BurgerElement from "../burgerElement/BurgerElement";
import {ConstructorElement} from "@ya.praktikum/react-developer-burger-ui-components";
import {DragIcon} from "@ya.praktikum/react-developer-burger-ui-components";

const BurgerConstructor = () => {
  return (
    <div className={burgerConstructor.burgerConstructor}>
    <ul className={`mt-25 mr-4 mb-10 ml-4 ${burgerConstructor.ingredients}`}>
      {
        data.map(info => {
          return (
            <div className={burgerConstructor.cell} key={info._id} >
            <DragIcon type="primary" />
            <ConstructorElement {...info} text={info.name} thumbnail={info.image}/>
            </div>
          )
        })

      }
    </ul>
    </div>
  );
};

export default BurgerConstructor;