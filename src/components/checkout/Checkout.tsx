import { useEffect, useState } from "react"

import { useSelector } from "react-redux"

import styled from "styled-components"

import DisclaimerCheckout from "./DisclaimerCheckout"

import QueryCheckout from "./QueryCheckout"

import ViewItemsCheckout from "./ViewItemsCheckout"


const Checkout = () => {

  const { available, data: checkoutData } = useSelector((store: any) => store.checkout)

  const [checkoutState, setCheckoutState] = useState("view-items") // "view-items", "disclaimer" "query", ("paypal" / "stripe") , "final"

  useEffect(() => { if (!available) { setCheckoutState("view-items") } }, [available])

  if (!available) return <></>

  return (

    <CheckoutStyle className="ck-ot">

      <div className="checkout">

        <div className="heading">

          <h1>Checkout</h1>

        </div>

        <div className="component">

          {checkoutState === "view-items" && <ViewItemsCheckout {...{ checkoutData, setCheckoutState }} />}

          {checkoutState === "disclaimer" && <DisclaimerCheckout {...{ setCheckoutState }} />}

          {checkoutState === "query" && <QueryCheckout {...{ setCheckoutState }} />}

        </div>

      </div>

    </CheckoutStyle>

  )

}

const CheckoutStyle = styled.div`
  position: fixed;
  display: flex;
  align-items: center;
  justify-content: center;
  top: 0; bottom: 0;
  right: 0; left: 0;
  width: 100%; height: 100%;
  background-color: rgba(0,0,0, .2);
  animation: opacity-in .5s 1;
  
  .checkout {
    overflow: hidden;
    background-color: #263154;
    color: white;
    width: 80vw; max-height: 80vh;
    border-radius: 1pc;
    padding: 1pc;
    animation: scale-in 1s 1;
    display: flex;
    flex-direction: column;
  
    .heading {
      width: 100%;
      text-align: center;
    }
  
    .component {
      width: 100%;
      overflow: auto;
    }
  }
`

export default Checkout
