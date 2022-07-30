import styled from "styled-components"

import { TiShoppingCart } from "react-icons/ti"

import { BiError } from "react-icons/bi"

import { useSelector } from "react-redux"

import { useState } from "react"

import { SpinnerCircular } from "spinners-react";

import { sendMiniMessage } from "../../controllers/MessageCtrl"

import CartView from "./CartView"


const Cart = () => {

  const { newlyAdded } = useSelector((store: any) => store.cart)

  const { available: cartAvailable, tested: cartTested, data: cartData } = useSelector((store: any) => store.cart)

  const [cartShowClass, setCartShowClass] = useState("show-button")

  const displayCart = () => {

    if (cartShowClass === "show-button") {

      if ((cartAvailable && cartTested)) {

        setCartShowClass("show-cart")

      }

      else if (!cartTested) {

        sendMiniMessage({

          icon: { name: "info" },

          content: { text: "Obtaining User Data!" },

        }, 2000)

      }

      else {

        sendMiniMessage({

          icon: { name: "times" },

          content: { text: "Not Signed In!" },

        }, 2000)

      }

    }

  }


  return (

    <CartStyle className={cartShowClass} onClick={displayCart}>

      <div className="button-part">

        {/* If the user data is available, show the cart icon */}
        {(cartTested && cartAvailable) && <TiShoppingCart size="3pc" color="white" />}

        {/* If the user data is still been fetched, show the loading icon */}
        {!cartTested && <SpinnerCircular size="3pc" color="white" secondaryColor="#a3a3a3" />}

        {/* If the user data is not found, show the error icon */}
        {(cartTested && !cartAvailable) && <>

          <BiError size="2pc" color="yellow" />

          <span className="c-bi-cap">Not signed in</span>

        </>}

        {/* Always show the newly add count... Just kidding, It wont show anyways without the user and cart data */}
        {newlyAdded > 0 && <div className="newly-add">{newlyAdded}</div>}

      </div>

      <div className="cart-part">

        {cartAvailable && <CartView cartData={cartData} goBack={() => setCartShowClass("show-button")} />}

      </div>

    </CartStyle>

  )

}

const CartStyle = styled.div`
  position: fixed;
  background-color: #4a5c92;
  color: white;
  z-index: 80;
  overflow: hidden;
  width: 0; height: 0;
  display: flex;
  transition: width .5s, height .5s, right .5s, bottom .5s, border-radius .5s;

  .cart-part, .button-part {
    display: none;
  }

  &.show-button {
    
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    line-height: 2pc;
    width: 6pc;
    height: 6pc;
    right: 2pc;
    bottom: 2pc;
    cursor: pointer;

    .button-part {
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
      
      svg {
        display: flex;
        align-items: center;
        justify-content: center;
      }
      
      .newly-add {
        position: absolute;
        top: -.5pc; right: -.5pc;
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: red;
        font-size: .7pc;
        line-height: .7pc;
        border-radius: 50%;
        width: 1.2pc;
        height: 1.2pc;
        padding-bottom: 0.1pc;
      }

      .c-bi-cap {
        text-align: center;
        font-size: .8pc;
        line-height: 1pc;
        display: block;
        padding-bottom: 0.5pc;
        color: yellow;
      }
    }
  }

  &.show-cart {
    
    align-items: center;
    justify-content: center;
    border-radius: 1pc;
    line-height: 2pc;
    width: 15pc;
    height: 70vh;
    right: 2pc;
    bottom: 2pc;

    .cart-part {
      display: flex;
      align-items: center;
      justify-content: center;
      height: 100%;
      width: 100%;
      overflow: hidden;
    }
  }

`

export default Cart
