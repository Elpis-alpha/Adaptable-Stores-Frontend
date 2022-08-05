import styled from "styled-components"

import ImageGallery from "react-image-gallery"

import { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";

import { SpinnerCircular } from "spinners-react";

import { postApiJson } from "../../controllers/APICtrl";

import { getItemPicture, addItemToCart as addItemToCartP } from "../../api";

import { sendMiniMessage } from "../../controllers/MessageCtrl";

import { setCartData } from "../../store/slice/cartSlice";

import { FiExternalLink } from "react-icons/fi";
import { Link } from "react-router-dom";


const Product = ({ productData, full }: { productData: any, full: boolean }) => {

  const dispatch = useDispatch()

  const saveCartData = (cartData: any) => dispatch(setCartData(cartData))

  const [imageArray, setImageArray] = useState([])

  const { _id, title, description, price, pics, section } = productData

  const { data: cartData } = useSelector((store: any) => store.cart)

  const numberInCart = cartData?.items?.find((item: any) => item.productID === productData._id)?.quantity

  const addItemToCart = async (e: any) => {

    e.preventDefault()

    const holder = (e.currentTarget.parentElement as HTMLElement)

    // adding a class of 'l' will change the text to adding
    holder.classList.add('l')

    const cartData = await postApiJson(addItemToCartP(), { _id: productData._id, qty: 1 })

    if (cartData.error) {

      if (cartData.error === "Not Authenticated") {

        sendMiniMessage({

          icon: { name: "times" },

          content: { text: "You are not signed in!" }

        }, 2000)

      } else {

        sendMiniMessage({

          icon: { name: "times" },

          content: { text: "An Error Occured!" }

        }, 2000)

      }

    } else {

      sendMiniMessage({

        icon: { name: "ok" },

        content: { text: "Product Added!" }

      }, 2000)

      saveCartData(cartData)

    }

    holder.classList.remove('l')

  }

  useEffect(() => {

    setImageArray(pics.map((pic: any) => {

      return {

        original: getItemPicture(_id, pic.picID),

        thumbnail: getItemPicture(_id, pic.picID),

        originalHeight: full ? 400 : 300, thumbnailHeight: 80

      }

    }).concat({

      original: `/images/default/${section.toLowerCase()}.png`,

      thumbnail: `/images/default/${section.toLowerCase()}.png`,

      originalHeight: full ? 400 : 300, thumbnailHeight: 80

    }))

  }, [_id, pics, section, full])


  return (

    <ProductStyle>

      <div className="in-pro">

        <div className="heading">

          <h3>{title}{!full && <Link target="_blank" to={`/product?product=${_id}`}><FiExternalLink /></Link>}</h3>

        </div>

        <div className="pics">

          <div className="in-pics">

            <ImageGallery items={imageArray} showIndex={true} showThumbnails={false} showBullets={true} showFullscreenButton={false} />

          </div>

        </div>

        <div className="cart-stuff">

          <div className="price">

            <span className="dollar">$</span>{price}

          </div>

          <div className="add-cart">

            <button title={`Add ${title} to cart`}>

              <span className="init" onClick={addItemToCart}>Add to Cart {numberInCart && <span className="in-cart">{numberInCart}</span>}</span>

              <span className="load">Adding <SpinnerCircular size=".9pc" color="white" secondaryColor="#a2a2a2" style={{ marginLeft: ".2pc" }} /></span>

            </button>

          </div>

        </div>

        <div className="description">

          {description}

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
    padding: 1pc;
    border: .5pc dotted #4a5c92;
    border-style: double;

    .heading {
      width: 100%;
      padding-bottom: 1pc;
      margin-bottom: 1pc;
      border-bottom: .5pc dotted #4a5c92;
      
      h3 {
        font-size: 2pc;
        line-height: 3pc;
        /* display: inline-flex; */
        /* align-items: stretch; */
        width: 100%;
        
        a {
          display: inline-flex;
          padding-left: 0.4pc;
          height: 2.5pc;
          align-items: center;
          color: #4a5c92;

          svg {
            display: inline-flex;
          }
        }
      }
    }

    .pics {
      width: 100%;
      background-color: rgba(0,0,0,.01);
      background: radial-gradient(rgba(0,0,0,.2), transparent, transparent);

      padding-bottom: 1pc;
      margin-bottom: 1pc;
      border-bottom: .5pc dotted #4a5c92;
    }

    .cart-stuff {
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: space-between;

      
      padding-bottom: 1pc;
      margin-bottom: 1pc;
      border-bottom: .5pc dotted #4a5c92;

      .price {
        font-size: 4pc;
        line-height: 5pc;
        display: flex;
        align-items: flex-start;
        justify-content: flex-start;
        
        .dollar {
          font-size: 3pc;
          line-height: 3.8pc;
          font-weight: bold;
          display: inline-block;
          padding-right: 0.2pc;
        }
        
        @media screen and (max-width: 500px) {
          font-size: 2.5pc;
          line-height: 3.5pc;

          .dollar {
            font-size: 1.5pc;
            line-height: 2.3pc;
          }
        }
        
        @media screen and (max-width: 390px) {
          font-size: 2pc;
          line-height: 3pc;

          .dollar {
            font-size: 1pc;
            line-height: 1.9pc;
          }
        }
      }

      .add-cart {
        /* padding-right: 1pc; */

        button {
          display: inline-block;
          border: 0 none;
          background-color: #4a5c92;
          border-radius: 0.4pc;
          color: white;
          padding: 0;
          line-height: .9pc;

          >span {
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 1pc 2pc;

            @media screen and (max-width: 500px) {
              padding: .8pc .6pc;
            }

            @media screen and (max-width: 390px) {
              padding: .5pc;
            }

            &.load {
              display: none;
            }

            &.init {

              >.in-cart {
                position: absolute;
                top: -.5pc; right: -.5pc;
                background: orangered;
                font-size: .7pc;
                line-height: 1pc;
                width: 1pc;
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
              }
            }
          }

          &.l {
            opacity: .5;
            cursor: not-allowed;

            span.init {
              display: none;
            }

            span.load {
              display: flex;
            }
          }
          
        }
      }
    }
  }
`

export default Product
