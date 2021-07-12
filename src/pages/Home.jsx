import React from "react";
import Card from "../components/Card";
import Promo from "../components/Promo";

function Home({
  items,
  searchValue,
  setSearchValue,
  onChangeSearchInput,
  onAddToFavorite,
  onAddToCart,
  isLoading,
}) {

  const renderItems = () => {
    const filtredItems = items.filter((item) =>
      item.title.toLowerCase().includes(searchValue.toLowerCase())
    );
    return (isLoading ? [...Array(12)] : filtredItems).map((item, index) => (
      <Card
        key={index}
        //   id={item.id}
        //   title={item.title}
        //   price={item.price}
        //   imgUrl={item.imgUrl}
        onClickFavorite={(obj) => onAddToFavorite(obj)}
        onClickAddToCart={(obj) => onAddToCart(obj)}
        // added={isItemAdded(item && item.id)}
        loading={isLoading}
        {...item}
      />
    ));
  };

  return (
    <div className="content p-40">
      <Promo />
      <div className="d-flex align-center justify-between mb-40">
        <h1>
          {searchValue ? `Поиск по запросу: "${searchValue}"` : "Все кроссовки"}
        </h1>
        <div className="search-block d-flex">
          {searchValue && (
            <img
              onClick={() => setSearchValue("")}
              className="reset cu-p"
              src="/img/btn-remove.svg"
              alt="Reset"
            />
          )}
          <img src="/img/search.svg" alt="Search" />
          <input
            onChange={onChangeSearchInput}
            value={searchValue}
            placeholder="Поиск..."
          />
        </div>
      </div>
      <div className="d-flex flex-wrap">{renderItems()}</div>
    </div>
  );
}

export default Home;
