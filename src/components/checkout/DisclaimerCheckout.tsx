import styled from "styled-components"


const DisclaimerCheckout = ({ setCheckoutState }: { setCheckoutState: any }) => {

  return (

    <DisclaimerCheckoutStyle>

      <div className="content">

        <p>

          Hello Customer! Adaptable Stores wishes to inform you that it is simply an imitation of a store. Products advertised in this store does not

          exist anywhere within our reach neither will it be delivered to you upon checkout.

        </p>

        <p>

          This is a disclaimer from the <a href="https://elpis-portfolio.vercel.app/" target="_blank" rel="noopener noreferrer">developer</a> informing

          anyone testing this e-commerce store that there exist no actual product in the store

          however even if one continues to the end, no amount will be deducted from the individual

          but the <a href="https://elpis-portfolio.vercel.app/" target="_blank" rel="noopener noreferrer">developer</a> is

          not to be held responsible for any unexpected event.

        </p>

      </div>

      <div className="end">

        <button onClick={() => setCheckoutState("view-items")}>Back</button>

        <button onClick={() => setCheckoutState("query")}>Proceed</button>

      </div>

    </DisclaimerCheckoutStyle>

  )

}

const DisclaimerCheckoutStyle = styled.div`
  display: flex;
  flex-direction: column;

  .content {
    text-align: center;

    p {
      padding: 1pc;
    }
  }

  .end {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-top: .5pc;

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

export default DisclaimerCheckout
