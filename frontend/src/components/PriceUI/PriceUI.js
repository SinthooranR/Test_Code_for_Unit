import React from "react";
import classes from "./PriceUI.module.scss";

const PriceUI = ({ subtotal, hst, total, blueColor }) => {
  return (
    <div className={classes.PriceUI}>
      <span>
        Subtotal:
        <h2> ${subtotal}</h2>
      </span>
      <span>
        Taxes (estimated):
        <h2> ${hst}</h2>
      </span>
      <span>
        Shipping:
        <h2> {subtotal > 0 && hst > 0 && total > 0 ? "$15" : "Free"}</h2>
      </span>
      <span style={{ color: blueColor, fontWeight: "700" }}>
        Total: <h2>${subtotal > 0 && hst > 0 && total ? total : 0}</h2>
      </span>
    </div>
  );
};

export default PriceUI;
