import axios from "axios";
import React from "react";
import { Link } from "react-router-dom";

import Card from "../components/Card";

function Orders() {
  const [orders, setOrders] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);

  console.log(isLoading);

  React.useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get(
          "https://60e58d965bcbca001749ed75.mockapi.io/orders"
        );
        // console.log(data.map((obj) => obj.items).flat());
        // console.log(data.reduce((prev, obj) => [...prev, ...obj.items], []));
        setOrders(data.map((obj) => obj.items).flat());
        setIsLoading(false);
      } catch (error) {
        alert("Ошибка при запросе совершенных заказов");
      }
    })();
  }, []);

  return (
    <div className="content p-40">
      <div className="d-flex align-center justify-between mb-40">
        <h1>Мои заказы</h1>
      </div>

      {/* Не отображаются фейковые карточки во время isLoading = true */}

      {isLoading ? [...Array(8)] : orders.length > 0 ? (
        <div className="d-flex flex-wrap">
          {orders.map((item, index) => (
            <Card
              key={index}
              //   id={item.id}
              //   title={item.title}
              //   price={item.price}
              //   imgUrl={item.imgUrl}
              // onClickFavorite={(obj) => onAddToFavorite(obj)}
              // onClickAddToCart={(obj) => onAddToCart(obj)}
              // added={isItemAdded(item && item.id)}
              loading={isLoading}
              {...item}
            />
          ))}
        </div>
      ) : (
        <div className="favorites d-flex flex-column align-center justify-center">
          <img
            className="smile mb-20"
            src="/img/sorry-smile.jpg"
            alt="Sad smile"
          />
          <h1>У вас нет заказов</h1>
          <p>Оформите хотя бы один заказ.</p>
          <Link to="/">
            <button className="greenButton mt-50">
              <img src="/img/arrow.svg" alt="Arrow" />
              Вернуться назад
            </button>
          </Link>
        </div>
      )}
    </div>
  );
}

export default Orders;
