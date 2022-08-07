import styled from "styled-components"


const QueryCheckout = ({ setCheckoutState }: { setCheckoutState: any }) => {

  return (

    <QueryCheckoutStyle>

      <div className="content">

        <div className="intro">

          Choose your preferred gateway client

        </div>

        <div className="opt-xc">

          <button onClick={() => setCheckoutState("paypal")}>Paypal</button>

          <span>or</span>

          <button onClick={() => setCheckoutState("stripe")}>Stripe</button>

        </div>

      </div>

      <div className="end">

        <button onClick={() => setCheckoutState("query")}>Back</button>

      </div>

    </QueryCheckoutStyle>

  )

}

const QueryCheckoutStyle = styled.div`
  display: flex;
  flex-direction: column;

  .content {
    text-align: center;
    padding: .5pc;

    .opt-xc {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding-top: .5pc;

      span {
        display: inline-block;
        margin: 0 .5pc;
      }

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

export default QueryCheckout
