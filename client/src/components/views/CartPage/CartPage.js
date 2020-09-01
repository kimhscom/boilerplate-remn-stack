import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getCartItem, removeCartItem } from "../../../_actions/user_actions";
import UserCardBlock from "./Sections/UserCardBlock";

function CartPage(props) {
  const dispatch = useDispatch();

  const [Total, setTotal] = useState(0);

  useEffect(() => {
    let cartItem = [];

    // Check if the product is in the cart in the Redux User state
    if (props.user.userData && props.user.userData.cart) {
      if (props.user.userData.cart.length > 0) {
        props.user.userData.cart.forEach((item) => {
          cartItem.push(item.id);
        });
        dispatch(getCartItem(cartItem, props.user.userData.cart)).then(
          (response) => {
            calculateTotal(response.payload);
          }
        );
      }
    }
  }, [props.user.userData]);

  let calculateTotal = (cartDetail) => {
    let total = 0;

    cartDetail.map((item) => {
      total += parseInt(item.price, 10) * item.quantity;
    });

    setTotal(total);
  };

  let removeFromCart = (productId) => {
    dispatch(removeCartItem(productId)).then((response) => {});
  };

  return (
    <div style={{ width: "85%", margin: "3rem auto" }}>
      <h1>My Cart</h1>

      <div>
        <UserCardBlock
          products={props.user.cartDetail}
          removeItem={removeFromCart}
        />
      </div>

      <div style={{ marginTop: "3rem" }}>
        <h2>Total Amount: ${Total}</h2>
      </div>
    </div>
  );
}

export default CartPage;
