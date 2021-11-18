import React from "react";
import classes from "./LineItem.module.scss";

const LineItem = ({
  item,
  deliveryDate,
  blueColor,
  blackColor,
  removeHandler,
}) => {
  return (
    <div className={classes.LineItem}>
      <img src={item?.image} alt="item" />
      <div className={classes.ItemInfo}>
        <h3 style={{ color: blueColor }}>{item?.title}</h3>
        <div>
          <span style={{ backgroundColor: item?.swatchColor }}></span>
          <h5>{item?.swatchTitle}</h5>
        </div>
      </div>
      <div className={classes.PriceContainer}>
        <h4>${item?.price}</h4>
        <span>
          <h5 style={{ color: blackColor }}>Estimated Delivery Date: </h5>
          <h5 style={{ color: blueColor }}>
            {item?.estimatedDeliveryDate
              ? item?.estimatedDeliveryDate
              : "Being Processed"}
          </h5>
        </span>
        <p onClick={removeHandler}>Remove</p>
      </div>
    </div>
  );
};

export default LineItem;
