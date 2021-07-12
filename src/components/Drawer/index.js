import React from "react";
import axios from "axios";

import Info from "../../pages/Info";
import { useCart } from "../../hooks/useCart";

import cn from "classnames";
import s from "./Drawer.module.scss";


const delay = (ms) => new Promise((resolve => setTimeout(resolve, ms)));

function Drawer({ onClose, onRemove, items = [], opened }) {
  const { cartItems, setCartItems, totalPrice} = useCart();
  const [isOrderComplete, setIsOrderComplete] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const [orderId, setOrderId] = React.useState(null);

  const onClickOrder = async () => {
    try {
      setIsLoading(true);
      const { data } = await axios.post(
        "https://60e58d965bcbca001749ed75.mockapi.io/orders",
        { items: cartItems }
      );
      setOrderId(data.id);
      setIsOrderComplete(true);
      setCartItems([]);

      //Костыль из-за мок апи(отсутвует замена массива)

      for (let i = 0; i < cartItems.length; i++) {
        const item = cartItems[i];
        await axios.delete("https://60e58d965bcbca001749ed75.mockapi.io/cart/" + item.id);
        await delay(1000);
      }
    } catch (error) {
      alert("Ошибка при создани заказа :(");
    }
    setIsLoading(false);
  };
  return (
    <div className={`${s.overlay} ${opened ? s.overlayVisible : ''}`}>
      <div className={s.drawer}>
        <h2 className="d-flex justify-between mb-30">
          Корзина
          <img
            onClick={onClose}
            className="cu-p"
            src="/img/btn-remove.svg"
            alt="Remove"
          />
        </h2>

        {items.length > 0 ? (
          <>
            <div className={s.items}>
              {items.map((obj) => (
                <div
                  key={obj.id}
                  className={cn(s.cartItem, 'd-flex', 'align-center', 'mb-20')}
                >
                  <div
                    style={{ backgroundImage: `url(${obj.imgUrl})` }}
                    className={s.cartItemImg}
                  ></div>

                  <div className="mr-20 flex">
                    <p className="mb-5">{obj.title}</p>
                    <b>{obj.price} руб.</b>
                  </div>
                  <img
                    onClick={() => onRemove(obj.id)}
                    className={s.removeBtn}
                    src="/img/btn-remove.svg"
                    alt="Remove"
                  />
                </div>
              ))}
            </div>
            <div className={s.cartTotalBlock}>
              <ul>
                <li>
                  <span>Итого:</span>
                  <div></div>
                  <b>{totalPrice} руб.</b>
                </li>
                <li>
                  <span>Налог 5%</span>
                  <div></div>
                  <b>{totalPrice * 0.05} руб.</b>
                </li>
              </ul>
              <button
                disabled={isLoading}
                onClick={onClickOrder}
                className={s.greenButton}
              >
                Оформить заказ <img src="/img/arrow.svg" alt="Arrow" />
              </button>
            </div>
          </>
        ) : (
          <Info
            title={isOrderComplete ? "Заказ оформлен" : "Ваша корзина пуста"}
            description={
              isOrderComplete
                ? `Ваш заказ #${orderId} скоро будет передан курьерской доставке`
                : "Добавьте хотя бы одну пару кроссовок, чтобы сделать заказ."
            }
            image={
              isOrderComplete
                ? "/img/complete-order.jpg"
                : "/img/empty-cart.jpg"
            }
          />
        )}
      </div>
    </div>
  );
}

export default Drawer;
