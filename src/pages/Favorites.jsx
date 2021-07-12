import React from "react";
import { Link } from "react-router-dom";

import Card from "../components/Card";
import AppContext from "../context";

function Favorites() {
  const { favorites, onAddToFavorite } = React.useContext(AppContext);
  return (
    <div className="content p-40">
      <div className="d-flex align-center justify-between mb-40">
        <h1>Мои закладки</h1>
      </div>

      {favorites.length > 0 ? (
        <div className="d-flex flex-wrap">
          {favorites.map((item, index) => (
            <Card
              key={index}
              // id={item.id}
              // title={item.title}
              // price={item.price}
              // imgUrl={item.imgUrl}
              favorited={true}
              onClickFavorite={onAddToFavorite}
              {...item}
            />
          ))}
        </div>
      ) : (
        <div className="favorites d-flex flex-column align-center justify-center">
          <img
            className="smile mb-20"
            src="/img/sad-smile.jpg"
            alt="Sad smile"
          />
          <h1>Закладок нет :(</h1>
          <p>Вы ничего не добавляли в закладки</p>
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

export default Favorites;
