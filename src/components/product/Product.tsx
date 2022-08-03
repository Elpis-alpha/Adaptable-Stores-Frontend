import styled from "styled-components"

const Product = ({ productData }: { productData: any }) => {

  const { title, description, price } = productData

  return (

    <ProductStyle>

      <div className="in-pro">

        <div className="heading">

          <h3>{title}</h3>

        </div>

        <div className="pics">

          All the pictures

        </div>

        <div className="body">

          <div className="price">

            <span className="dollar">$</span>{price}

          </div>

          <div className="cart-process">

            <button title={`Add ${title} to cart`}>

              <span className="init">Add to Cart</span>

            </button>

          </div>

          <div className="description">

            {description}

          </div>

        </div>

      </div>

    </ProductStyle>

  )

}

const ProductStyle = styled.div`

  .in-pro {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    flex-direction: column;

    .heading {
      width: 100%;
      
      h3 {
        font-size: 2pc;
        line-height: 3pc;
      }
    }
  }
`

export default Product
