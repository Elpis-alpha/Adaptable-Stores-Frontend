import { useDispatch } from "react-redux";

import styled from "styled-components"

import Stripe from "react-stripe-checkout";

import { createStripeOrder } from "../../api";

import { postApiJson } from "../../controllers/APICtrl";

import { sendMiniMessage } from "../../controllers/MessageCtrl";

import { setCartData } from "../../store/slice/cartSlice";

import { stripeKey } from "../../__env"

import { useState } from "react";

import { SpinnerCircular } from "spinners-react";


const StripeCheckout = ({ setCheckoutState }: { setCheckoutState: any }) => {

  const dispatch = useDispatch()

  const [loading, setLoading] = useState(false)

  const handleToken = async (token: any) => {

    setLoading(true)

    const stripeOrder = await postApiJson(createStripeOrder(), { source: token })

    setLoading(false)

    if (stripeOrder.error) {

      sendMiniMessage({

        icon: { name: "times", style: {} },

        content: { text: "Error while making order!", style: {} },

        style: {}

      }, 2000)

    } else {

      dispatch(setCartData(stripeOrder.cart))

      sendMiniMessage({

        icon: { name: "ok", style: {} },

        content: { text: "Order Created!", style: {} },

        style: {}

      }, 2000)

    }

    setCheckoutState("final")

  }

  const tokenHandler = (token: any) => {

    handleToken(token)

  }

  return (

    <StripeCheckoutStyle className={loading ? 'loading' : ''}>

      <div className="content">

        <Stripe stripeKey={stripeKey} token={tokenHandler} />

      </div>

      <div className="end">

        <button onClick={() => setCheckoutState("query")}>Back</button>

      </div>

      {loading && <div className="loading">

        <SpinnerCircular size="3pc" color="#fff" />

      </div>}

    </StripeCheckoutStyle>

  )

}

const StripeCheckoutStyle = styled.div`
  display: flex;
  flex-direction: column;

  .content {
    padding: 1pc;
    text-align: center;
  }

  .end {
    display: flex;
    align-items: center;
    justify-content: space-between;

    button, a {
      flex: 1;
      display: flex;
      align-items: center;
      justify-content: center;
      text-decoration: none;
      text-align: center;
      padding: .4pc 0;
      border-radius: 0.5pc;
      border: 0 none;
      background-color: rgba(0,0,0, .4);
      box-shadow: 2px 2px 4px #142044;
      color: white;
      transition: background-color .5s;
        
      &:hover {
        background-color: rgba(0,0,0, .8);
      }
    }
  }

  &.loading {

    .content {display: none}

    .end {display: none}

    .loading {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 100%;
      padding: 2pc;
    }
  }
`

export default StripeCheckout
