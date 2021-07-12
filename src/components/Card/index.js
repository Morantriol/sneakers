import React from "react";
import ContentLoader from "react-content-loader";

import AppContext from "../../context"

import s from "./Card.module.scss";

function Card({
  id,
  imgUrl,
  title,
  price,
  onClickFavorite,
  onClickAddToCart,
  favorited = false,
  loading = false,
}) {
  const { isItemAdded } = React.useContext(AppContext);
  const [isFavorite, setIsFavorite] = React.useState(favorited);
  const obj = { id, parentId: id, imgUrl, title, price }

  const onClickPlus = () => {
    onClickAddToCart(obj);
  };

  const onClickFavoriteBtn = () => {
    onClickFavorite(obj);
    setIsFavorite(!isFavorite);
  };

  return (
    <div className={s.card}>
      {loading ? (
        <ContentLoader
          speed={2}
          width={165}
          height={250}
          viewBox="0 0 155 265"
          backgroundColor="#f3f3f3"
          foregroundColor="#ecebeb"
        >
          <rect x="1" y="0" rx="10" ry="10" width="155" height="155" />
          <rect x="0" y="167" rx="5" ry="5" width="155" height="15" />
          <rect x="0" y="187" rx="5" ry="5" width="100" height="15" />
          <rect x="1" y="234" rx="5" ry="5" width="80" height="25" />
          <rect x="124" y="230" rx="10" ry="10" width="32" height="32" />
        </ContentLoader>
      ) : (
        <>
          {onClickFavorite && <div className={s.favorite} onClick={onClickFavoriteBtn}>
            <img
              src={
                isFavorite ? "/img/heart-liked.svg" : "/img/heart-unliked.svg"
              }
              alt="unliked-heart"
            />
          </div>}
          <img width='100%' height={135} src={imgUrl} alt="Sneakers" />
          <h5>{title}</h5>
          <div className="d-flex justify-between align-center">
            <div className="d-flex flex-column">
              <p>Цена:</p>
              <b>{price} руб.</b>
            </div>
            {onClickAddToCart && <img
              className={s.plus}
              onClick={onClickPlus}
              src={isItemAdded(id) ? "/img/btn-cheked.svg" : "/img/btn-plus.svg"}
              alt="plus"
            />}
          </div>
        </>
      )}
    </div>
  );
}

export default Card;
