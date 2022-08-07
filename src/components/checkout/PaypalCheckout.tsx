import { PayPalButtons, PayPalScriptProvider, usePayPalScriptReducer } from "@paypal/react-paypal-js"

import { useDispatch } from "react-redux";
import { SpinnerCircular } from "spinners-react";

import styled from "styled-components"

import { createPaypalOrder } from "../../api";

import { postApiJson } from "../../controllers/APICtrl";

import { sendMiniMessage } from "../../controllers/MessageCtrl";

import { setCartData } from "../../store/slice/cartSlice";

import { paypalKey } from "../../__env"


const PaypalCheckout = ({ checkoutData, setCheckoutState }: { checkoutData: any, setCheckoutState: any }) => {

  const initialOptions = {

    "client-id": paypalKey,

    currency: "USD",

    intent: "capture",

  };

  return (

    <PaypalCheckoutStyle>

      <div className="content">

        <PayPalScriptProvider options={initialOptions}>

          <InsidePayPalScriptProvider {...{ checkoutData, setCheckoutState }} />

        </PayPalScriptProvider>

      </div>

      <div className="end">

        <button onClick={() => setCheckoutState("query")}>Back</button>

      </div>

    </PaypalCheckoutStyle>

  )

}

const InsidePayPalScriptProvider = ({ checkoutData, setCheckoutState }: { checkoutData: any, setCheckoutState: any }) => {

  const dispatch = useDispatch()

  const [{ isPending, isRejected }] = usePayPalScriptReducer();

  const createOrder = (data: any, actions: any) => {

    return actions.order.create({

      purchase_units: [

        {

          amount: {

            value: checkoutData.reduce((tot: any, x: any) => { return tot + x.price }, 0),

            "currency_code": "USD",

            "breakdown": {

              "item_total": {

                "currency_code": "USD",

                "value": checkoutData.reduce((tot: any, x: any) => { return tot + x.price }, 0)

              },

            },

          },

          "items": checkoutData.map((checkoutItem: any) => {

            return {

              "name": checkoutItem.name,

              "unit_amount": {

                "currency_code": "USD",

                "value": checkoutItem.price / checkoutItem.quantity

              },

              "quantity": checkoutItem.quantity

            }

          })

        },

      ],

    });

  }

  const onApprove = (data: any, actions: any) => {

    return actions.order.capture().then(async (details: any) => {

      const serverData = {

        gateway: "paypal",

        info: { details, approveData: data }

      }

      const paypalOrder = await postApiJson(createPaypalOrder(), { data: serverData })

      if (paypalOrder.error) {

        sendMiniMessage({

          icon: { name: "times", style: {} },

          content: { text: "Error while saving order!", style: {} },

          style: {}

        }, 2000)

      } else {

        dispatch(setCartData(paypalOrder.cart))

        sendMiniMessage({

          icon: { name: "ok", style: {} },

          content: { text: "Order Saved!", style: {} },

          style: {}

        }, 2000)

      }

      setCheckoutState("final")

    });

  }

  return <>

    {isPending && <div className="loading">

      <SpinnerCircular size="3pc" color="#fff" />

    </div>}

    {isRejected && <div>An Error Occured</div>}

    <PayPalButtons style={{ layout: "horizontal" }} createOrder={createOrder} onApprove={onApprove} />

  </>

}

const PaypalCheckoutStyle = styled.div`
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
`

export default PaypalCheckout
