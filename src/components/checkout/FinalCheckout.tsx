import { useDispatch } from "react-redux"

import styled from "styled-components"

import { removeCheckoutData } from "../../store/slice/checkoutSlice"


const FinalCheckout = () => {

  const dispatch = useDispatch()

  return (

    <FinalCheckoutStyle>

      <div className="content">

        <p>Congratulations, your purchase has been made. The product(s) will arrive in 10 minutes at the billing address.</p>

        <p>Thanks and Goodbye</p>

      </div>

      <div className="end">

        <button onClick={() => dispatch(removeCheckoutData())}>Back to Store</button>

      </div>

    </FinalCheckoutStyle>

  )

}

const FinalCheckoutStyle = styled.div`
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

export default FinalCheckout
