import { useDispatch } from "react-redux"

import styled from "styled-components"

import { removeCheckoutData } from "../../store/slice/checkoutSlice"


const ViewItemsCheckout = ({ checkoutData, setCheckoutState }: { checkoutData: any, setCheckoutState: any }) => {

  const dispatch = useDispatch()

  return (

    <ViewItemsCheckoutStyle>

      <div className="content">

        <table>

          <tr>

            <th>Name</th>

            <th>Qty</th>

            <th>Price</th>

          </tr>

          {checkoutData.map((checkoutItem: any) => <tr key={checkoutItem._id}>

            <td>{checkoutItem.name}</td>

            <td>{checkoutItem.quantity}</td>

            <td>${checkoutItem.price}</td>

          </tr>)}

          <tr>

            <th>Grand Total</th>

            <th>{checkoutData.reduce((tot: any, x: any) => { return tot + x.quantity }, 0)}</th>

            <th>${checkoutData.reduce((tot: any, x: any) => { return tot + x.price }, 0)}</th>

          </tr>

        </table>

      </div>

      <div className="end">

        <button onClick={() => dispatch(removeCheckoutData())}>Back</button>

        <button onClick={() => { setCheckoutState("disclaimer") }}>Proceed</button>

      </div>

    </ViewItemsCheckoutStyle>

  )

}

const ViewItemsCheckoutStyle = styled.div`
  display: flex;
  flex-direction: column;

  table {
    width: 95%;
    margin: 0 auto;
    border-collapse: collapse;
    margin-bottom: 1pc;

    th, td {
      border-bottom: 1px solid rgba(255,255,255,.3);
      padding: 0.5pc;
      font-size: 0.9pc;
      text-align: left;

      &:nth-of-type(2) {
        width: 3pc;
      }
      
      &:last-of-type {
        min-width: 3.5pc;
        text-align: right;
      }

      @media screen and (min-width: 600px) {

        &:nth-of-type(2) {
          width: 4pc;
        }
        
        &:last-of-type {
          min-width: 5pc;
          text-align: right;
        }        
      }
    }

    th {
      font-size: 1.1pc;
    }
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

      &:first-of-type {
        margin-right: .5pc;
      }
        
      &:hover {
        background-color: rgba(0,0,0, .8);
      }
    }
  }
`

export default ViewItemsCheckout
