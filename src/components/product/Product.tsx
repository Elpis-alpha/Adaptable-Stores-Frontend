import styled from "styled-components"
import ImageGallery from "react-image-gallery"
import { getItemPicture } from "../../api";
import { useEffect, useState } from "react";


const Product = ({ productData }: { productData: any }) => {

  const { _id, title, description, price, pics, section } = productData

  const [imageArray, setImageArray] = useState([])

  useEffect(() => {

    setImageArray(pics.map((pic: any) => {

      return {

        original: getItemPicture(_id, pic.picID),

        thumbnail: getItemPicture(_id, pic.picID),

        originalHeight: 300, thumbnailHeight: 80

      }

    }).concat({

      original: `/images/default/${section.toLowerCase()}.png`,

      thumbnail: `/images/default/${section.toLowerCase()}.png`,

      originalHeight: 300, thumbnailHeight: 80

    }))

  }, [_id, pics, section])



  return (

    <ProductStyle>

      <div className="in-pro">

        <div className="heading">

          <h3>{title}</h3>

        </div>

        <div className="pics">

          <div className="in-pics">

            <ImageGallery items={imageArray} showIndex={true} showThumbnails={false} showBullets={true} showFullscreenButton={false} />

          </div>

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
      padding-bottom: 1pc;
      
      h3 {
        font-size: 2pc;
        line-height: 3pc;
      }
    }

    .pics {
      width: 100%;
      background-color: rgba(0,0,0,.01);
      background: radial-gradient(rgba(0,0,0,.2), #fff, #fff);
    }
  }
`

export default Product
