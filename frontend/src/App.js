import React, { Fragment, useState, useEffect } from "react";
import LineItem from "./components/LineItem/LineItem";
import PriceUI from "./components/PriceUI/PriceUI";
import axios from "axios";
import "./App.css";

function App() {
  //Styling variables
  const BLUE = "#172162"; //"rgb(23, 33, 98)";
  // const LIGHT_GREY = "#6e7484";
  const BLACK = "#000000";

  const [items, setItems] = useState([]);

  // const SUBTOTAL = 2094.97;
  // const HST = 272.3461;
  // const TOTAL = 2382.3161;
  const ESTIMATED_DELIVERY = "Nov 24, 2021";

  const [price, setPrice] = useState({
    subtotal: 0,
    hst: 0,
    total: 0,
  });

  const [postalCode, setPostalCode] = useState("");

  const removeLineItem = (lineItemId) => {
    setItems(items.filter(({ id }) => id !== lineItemId));
  };

  const addLineItem = (lineItem) => {
    // lineItem:{
    //   id: number,
    //   title: string,
    //   price: number (2 decimals),
    //   quantity: number,
    //   image: string (image url or src file)
    //   swatchTitle: string (color for the swatch),
    //   swatchTitle: string (color for swatch color),
    // }
    setItems([...items, lineItem]);
  };

  useEffect(() => {
    axios
      .get(`http://localhost:5000/items/${postalCode}`)
      .then((res) => setItems(res?.data?.items))
      .catch((err) => console.log(err));
  }, [postalCode]);

  useEffect(() => {
    const calculateFees = () => {
      let subtotal = items.reduce(
        (total, currItemPrice) => total + currItemPrice.price,
        0
      );
      let hst = subtotal * 0.13;
      // 15 for shipping default fee
      let total = subtotal + hst + 15;
      setPrice({
        subtotal: subtotal.toFixed(2),
        hst: hst.toFixed(2),
        total: total.toFixed(2),
      });
    };

    if (items.length > 0) {
      calculateFees();
    }
  }, [items]);

  return (
    <div className="App">
      <div>
        <h1 className="CartTitle" style={{ color: BLUE }}>
          Your Cart
        </h1>
      </div>
      <div>
        {items &&
          items.length > 0 &&
          items.map((item, index) => (
            <Fragment key={index}>
              <LineItem
                item={item}
                deliveryDate={ESTIMATED_DELIVERY}
                blueColor={BLUE}
                blackColor={BLACK}
                removeHandler={() => removeLineItem(item.id)}
              />
            </Fragment>
          ))}
      </div>
      <PriceUI
        hst={price?.hst}
        subtotal={price?.subtotal}
        total={price?.total}
        blueColor={BLUE}
      />
      <div className="inputDiv">
        <label>Postal Code:</label>
        <input type="text" onChange={(e) => setPostalCode(e.target.value)} />
      </div>
    </div>
  );
}

export default App;
