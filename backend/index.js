const express = require("express");
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(cors());

const DELIVERY_DATES = [
  {
    postal: "V",
    ids: [2],
    estimatedDeliveryDate: "Nov 24, 2021",
  },
  {
    postal: "V",
    ids: [1, 3],
    estimatedDeliveryDate: "Nov 19, 2021",
  },
  {
    postal: "M",
    ids: [2, 3],
    estimatedDeliveryDate: "Nov 22, 2021",
  },
  {
    postal: "M",
    ids: [1],
    estimatedDeliveryDate: "Dec 19, 2021",
  },
  {
    postal: "K",
    ids: [1, 2, 3],
    estimatedDeliveryDate: "Dec 24, 2021",
  },
];

//First part given
const lineItems = [
  {
    id: 1,
    title: "Grey Sofa",
    price: 499.99,
    quantity: 1,
    image:
      "https://www.cozey.ca/_next/image?url=https%3A%2F%2Fcdn.shopify.com%2Fs%2Ffiles%2F1%2F0277%2F3057%2F5462%2Fproducts%2F2_Single_shot_DARK_GREY_OFF_OFF_SLOPE_17f0f115-11f8-4a78-b412-e9a2fea4748d.png%3Fv%3D1629310667&w=1920&q=75",
    swatchColor: "#959392",
    swatchTitle: "Grey",
  },
  {
    id: 2,

    title: "Blue Sofa",
    price: 994.99,
    quantity: 1,
    image:
      "https://www.cozey.ca/_next/image?url=https%3A%2F%2Fcdn.shopify.com%2Fs%2Ffiles%2F1%2F0277%2F3057%2F5462%2Fproducts%2F3_Seater_SofaSofa_Ottoman_Off_Arm_Configuration_Two_Arms_Arm_Design_Slope_Chaise_Off_Fabric_Navy_Blue2.png%3Fv%3D1629231450&w=1920&q=75",
    swatchColor: "#191944",
    swatchTitle: "Blue",
  },
  {
    id: 3,
    title: "White Sofa",
    price: 599.99,
    quantity: 1,
    image:
      "https://www.cozey.ca/_next/image?url=https%3A%2F%2Fcdn.shopify.com%2Fs%2Ffiles%2F1%2F0277%2F3057%2F5462%2Fproducts%2F2_Single_shot_IVORY_OFF_OFF_SLOPE_5379af1f-9318-4e37-b514-962d33d1ce64.png%3Fv%3D1629231450&w=1920&q=75",
    swatchColor: "#F8F1EC",
    swatchTitle: "White",
  },
];

app.get("/items/:pCode?", (req, res, next) => {
  let postalCode = req.params.pCode;
  let findPostalCodeItems;
  let newItems;

  if (postalCode) {
    findPostalCodeItems = DELIVERY_DATES.filter(
      ({ postal }) => postal === postalCode.charAt(0).toUpperCase()
    );
  }

  if (findPostalCodeItems && findPostalCodeItems.length > 0) {
    newItems = lineItems.map((item) =>
      findPostalCodeItems.map(({ ids }) => ids.some((id) => id === item.id))
        ? {
            ...item,
            ...findPostalCodeItems.find(({ ids }) =>
              ids.find((id) => id === item.id)
            ),
          }
        : item
    );
  }

  if (newItems && newItems.length > 0) {
    res.status(201).json({ items: newItems });
  } else {
    res.status(201).json({ items: lineItems });
  }
});

app.listen(5000, () => {
  console.log("Listening on Port 5000");
});
