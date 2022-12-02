import React from 'react';
import data from '../../utils/data';
import burgerConstructor from "./burgerConstructor.module.css";
import BurgerElement from "../BurgerElement/BurgerElement";
import {ConstructorElement} from "@ya.praktikum/react-developer-burger-ui-components";

const BurgerConstructor = () => {
  return (
    <div className={burgerConstructor.burgerConstructor}>
    <ul className={`mt-25 mr-4 mb-10 ml-4 ${burgerConstructor.cards}`}>
      {
        data.map(info => {
          return (
            <ConstructorElement {...info} key={info._id} text={info.name} thumbnail={info.image}/>
          )
        })

      }
    </ul>
    </div>
  );
};

export default BurgerConstructor;