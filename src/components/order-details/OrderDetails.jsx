import React from 'react';
import OrderDoneSvg from "../../images/graphics.svg";
import orderDetailsStyles from "./order-details.module.css";
import PropTypes from "prop-types";

const OrderDetails = ({orderNum}) => {
  return (

    <div className={`${orderDetailsStyles.modal_order}`}>
      {!orderNum
        ? <p className="mt-20 mb-20 text text_type_main-medium">Пожалуйста, подождите. Идет загрузка...</p>
        : <div>
          <p className="mt-30 text text_type_digits-large">{orderNum}</p>
          <p className="mt-8 text text_type_main-medium">идентификатор заказа</p>
          <img className={"mt-15"} src={OrderDoneSvg} alt={"иконка принятия заказа"}/>
          <p className="mt-15 text text_type_main-default">Ваш заказ начали готовить</p>
          <p className="mt-2 mb-30 text text_type_main-default  text_color_inactive">Дождитесь готовности на орбитальной
            станции</p>
        </div>
      }
        </div>

      );
      };

      export default OrderDetails;

      OrderDetails.propTypes = {
      orderNum: PropTypes.any
    }

