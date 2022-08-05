import { Link } from "react-router-dom";

import styled from "styled-components"

import { SpinnerDiamond, SpinnerCircular } from "spinners-react";

import { useEffect, useRef, useState } from "react";

import { getItemPicture, addItemToCart as addItemToCartP } from "../../../api";

import { FaCamera } from "react-icons/fa";

import { postApiJson } from "../../../controllers/APICtrl";

import { sendMiniMessage } from "../../../controllers/MessageCtrl";

import { setCartData } from "../../../store/slice/cartSlice";

import { useDispatch, useSelector } from "react-redux";

import { createQueryString } from "../../../controllers/SpecialCtrl";

import { setSingleProductDimensions } from "../../../store/slice/productSlice";


const ProductLView = ({ productData, queryObject }: any) => {

  const dispatch = useDispatch()

  const leftSideRef = useRef(null)

  const { _id, title, description, price, section, pics } = productData

  const [startedLoadingPic, setStartedLoadingPic] = useState(false)

  const saveCartData = (cartData: any) => dispatch(setCartData(cartData))

  const { data: cartData } = useSelector((store: any) => store.cart)

  const numberInCart = cartData?.items?.find((item: any) => item.productID === productData._id)?.quantity

  useEffect(() => {

    const displayPicture = () => {

      if (pics.length > 0) {

        const proImage = new Image()

        proImage.src = getItemPicture(_id, pics[0].picID)

        proImage.onload = () => {

          proImage.alt = `Picture of ${title}`;

          proImage.title = `Picture of ${title}`;

          (leftSideRef.current as any)?.firstElementChild?.replaceWith(proImage);

          (leftSideRef.current as any)?.firstElementChild?.nextElementSibling?.classList.add('show')

        }

        proImage.onerror = () => {

          const errorImage = new Image()

          errorImage.src = '/images/default/error-image.png'

          errorImage.onload = () => {

            errorImage.alt = 'Error Image';

            errorImage.title = 'Error Image';

            (leftSideRef.current as any)?.firstElementChild?.replaceWith(errorImage);

            (leftSideRef.current as any)?.firstElementChild?.nextElementSibling?.classList.add('show')

          }

        }

      } else {

        const noImage = new Image()

        noImage.src = `/images/default/${section.toLowerCase()}.png`

        noImage.onload = () => {

          noImage.alt = `Default image for ${section} section`;

          noImage.title = `Default image for ${section} section`;

          (leftSideRef.current as any)?.firstElementChild?.replaceWith(noImage);

          (leftSideRef.current as any)?.firstElementChild?.nextElementSibling?.classList.add('show')

        }

        noImage.onerror = () => {

          const errorImage = new Image()

          errorImage.src = '/image/default/error-image.png'

          errorImage.onload = () => {

            errorImage.alt = 'Error Image';

            errorImage.title = 'Error Image';

            (leftSideRef.current as any)?.firstElementChild?.replaceWith(errorImage);

            (leftSideRef.current as any)?.firstElementChild?.nextElementSibling?.classList.add('show')

          }

        }

      }

    }

    if (!startedLoadingPic) {

      setStartedLoadingPic(true)

      displayPicture()

    }

  }, [pics, section, _id, title, startedLoadingPic])

  const addItemToCart = async (e: any) => {

    e.preventDefault()

    const holder = (e.currentTarget.parentElement as HTMLElement)

    // adding a class of 'l' will change the text to adding
    holder.classList.add('l')

    const cartData = await postApiJson(addItemToCartP(), { _id: productData._id, qty: 1 })

    if (cartData.error) {

      console.log(cartData);

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

  const setProductDimensions = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {

    const productBox = e.currentTarget

    const { top, left, width, height } = productBox.getBoundingClientRect()

    dispatch(setSingleProductDimensions({ top, left, width, height }))

  }

  return (

    <ProductLViewStyle>

      <div className="pl-item">

        <Link to={createQueryString({ ...queryObject, product: _id })} className="pl-content" onClick={setProductDimensions} title={"Click to open a detailed view on this product"}>

          <div className="inner">

            <div className="left-side">

              <div className="img-holder" ref={leftSideRef}>

                <SpinnerDiamond size="3pc" />

                <div className="img-end">

                  <FaCamera size=".8pc" color="white" /> {pics.length}

                </div>

              </div>

            </div>

            <div className="right-side">

              <h3 title={title}>{title}</h3>

              <p title={description}>{description}</p>

              <div className="end">

                <span className="ad-cart" title={`Add ${title} to cart`}>

                  <span className="init" onClick={addItemToCart}>Add to Cart {numberInCart && <span className="in-cart">{numberInCart}</span>}</span>

                  <span className="load">Adding <SpinnerCircular size=".9pc" color="white" secondaryColor="#a2a2a2" style={{ marginLeft: ".2pc" }} /></span>

                </span>

                <span className="price">${price}</span>

              </div>

            </div>

          </div>

        </Link>

      </div>

    </ProductLViewStyle>

  )

}

const ProductLViewStyle = styled.div`
  padding: 1rem;
  width: 33%;
  
  @media screen and (max-width: 1000px) {
    width: 50%;
  }
  
  @media screen and (max-width: 700px) {
    width: 100%;
  }

  .pl-item {
    padding-top: 50%;

    .pl-content {
      position: absolute;
      top: 0; bottom: 0;
      left: 0; right: 0;
      width: 100%;
      height: 100%;
      display: block;
      /* background-color: rgba(0,0,0,.5); */
      color: inherit;
      text-decoration: none;
      background-color: #fff;
      border-radius: 1rem;
      border-left: 3px solid rgb(130, 145, 197);
      overflow: hidden;
      box-shadow: 5px 5px 10px rgba(130, 145, 197,.3);
      transition: transform .5s;

      &:hover {
        transform: scale(1.05);
      }

      .inner {
        display: flex;
        align-items: center;
        justify-content: center;
        height: 100%;
        width: 100%;
        padding: 2rem 1.5rem;

        .left-side {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 40%;
          z-index: 15;
          flex: 1;
          height: 100%;

          svg {
            display: flex;
          }

          .img-holder {
            width: 80%;
            height: 80%;
            display: flex;
            justify-content: center;
            align-items: center;


            img {
              width: 100%;
              height: 100%;
              display: block;
              object-fit: cover;
            }
          }

          .img-end {
            display: none;
            align-items: center;
            justify-content: center;
            position: absolute;
            bottom: 0; right: 0;
            background-color: rgba(0, 0, 0, .5);
            font-size: .9pc;
            line-height: 1pc;
            padding: 0.2rem .4rem;
            /* border-radius: 0.2pc; */
            color: white;
            
            &.show { display: flex }

            svg {
              color: white;
              fill: white;
              margin-right: .2rem;
            }
          }
        }

        .right-side {
          width: 60%;
          z-index: 15;

          h3 {
            font-size: 1.5pc;
            line-height: 1.8pc;
            overflow: hidden;
            white-space: pre;
            text-overflow: ellipsis;
            padding-bottom: .5pc;
            
            @media screen and (max-width: 390px) {
              font-size: 1.2pc;
              padding-bottom: .2pc;
            }
          }
          
          p {
            font-size: .9pc;
            line-height: 1.2pc;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;

            @media screen and (max-width: 390px) {
              font-size: .8pc;
            }
          }
          
          .end {
            display: flex;
            align-items: center;
            justify-content: space-between;
            font-size: .9pc;

            .ad-cart {
              display: inline-block;
              background-color: #4a5c92;
              margin-top: .3pc;
              border-radius: 0.4pc;
              color: white;
              line-height: .9pc;
              
              >span {
                display: flex;
                align-items: center;
                justify-content: center;
                padding: 0.4pc .6pc;
                
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

              &.i {

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
            
            .price {
              font-size: 2.2pc;
              position: absolute;
              top: .7pc;
              right: 0;
            }
            
            @media screen and (max-width: 390px) {
              font-size: .8pc;
              
              .price {
                font-size: 2pc;
              }
            }
          }
        }

        svg {
          fill: #485c9b;
          z-index: 10;
          // opacity: .5;
        }
        
        .bottom-fix {
          position: absolute;
          bottom: 0;
          right: 0;
          width: 70%;
          display: none;
        }

        .top-fix {
          position: absolute;
          top: 0;
          left: 0;
          width: 40%;
          display: none;
        }
      }
    }

  }
`

export default ProductLView
