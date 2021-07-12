import React from "react";

import cn from "classnames";
import s from "./Promo.module.scss";

function Promo() {
  return (
    <div className={cn(s.banner, "mb-40")}>
      <img
        className={s.logo}
        width={120}
        height={50}
        src="img/promo/adidas-logo.jpg"
        alt="Adidas Logotype"
      />
      <div className={s.bannerText}>
        <h2>
          <span>Stan Smith</span>, Forever!
        </h2>
      </div>
      <img className={s.sneakers} src="img/promo/kermit-sneakers.jpg" alt="Froggy" />
    </div>
  );
}

export default Promo;
