import { Link, useSearchParams } from "react-router-dom";

import styled from "styled-components"

import { SpinnerDiamond } from "spinners-react";

import { useEffect, useRef, useState } from "react";

import { getItemPicture } from "../../../api";


const ProductLView = ({ productData }: any) => {

  const { _id, title, description, price, section, pics } = productData

  const [startedLoadingPic, setStartedLoadingPic] = useState(false)

  const leftSideRef = useRef(null)

  const params = useSearchParams()

  useEffect(() => {

    const displayPicture = () => {

      if (pics.length > 0) {

        const proImage = new Image()

        proImage.src = getItemPicture(_id, pics[0].picID)

        proImage.onload = () => {

          proImage.alt = `Picture of ${title}`;

          proImage.title = `Picture of ${title}`;

          (leftSideRef.current as any).firstElementChild?.replaceWith(proImage)

        }

        proImage.onerror = () => {

          const errorImage = new Image()

          errorImage.src = '/images/default/error-image.png'

          errorImage.onload = () => {

            errorImage.alt = 'Error Image';

            errorImage.title = 'Error Image';

            (leftSideRef.current as any).firstElementChild?.replaceWith(errorImage)

          }

        }

      } else {

        const noImage = new Image()

        noImage.src = `/images/default/${section.toLowerCase()}.png`

        noImage.onload = () => {

          noImage.alt = `Default image for ${section} section`;

          noImage.title = `Default image for ${section} section`;

          (leftSideRef.current as any).firstElementChild?.replaceWith(noImage)

        }

        noImage.onerror = () => {

          const errorImage = new Image()

          errorImage.src = '/image/default/error-image.png'

          errorImage.onload = () => {

            errorImage.alt = 'Error Image';

            errorImage.title = 'Error Image';

            (leftSideRef.current as any).firstElementChild?.replaceWith(errorImage)

          }

        }

      }

    }

    if (!startedLoadingPic) {

      setStartedLoadingPic(true)

      displayPicture()

    }

  }, [pics, section, _id, title, startedLoadingPic])

  return (

    <ProductLViewStyle>

      <div className="pl-item">

        <Link to={`/product?id=${_id}`} className="pl-content" title={"Click to open a detailed view on this product"}>

          <div className="inner">

            <div className="left-side" ref={leftSideRef}>

              <SpinnerDiamond size="3pc" />

            </div>

            <div className="right-side">

              <h3>{title}</h3>

              <p>{description}</p>

              <div className="end">

                {/* <span>{section}</span> */}
                <span>Add to Cart</span>

                <span className="price">${price}</span>

              </div>

            </div>

            <svg viewBox="0 0 100 12" className="bottom-fix">

              <defs>

                <linearGradient id="gradient-pl" x1="0%" y1="50%" x2="100%" y2="50%">

                  <stop offset="5%" stopColor="#4165d2ff"></stop>

                  <stop offset="95%" stopColor="#4a5784ff"></stop>

                </linearGradient>

              </defs>

              <polygon points="100,0 100,12 0,12" fill="url(#gradient-pl)"></polygon>

            </svg>

            <svg viewBox="0 0 100 20" className="top-fix">

              <defs>

                <linearGradient id="gradient-plx" x1="0%" y1="50%" x2="100%" y2="50%">

                  <stop offset="5%" stopColor="#4165d2ff"></stop>

                  <stop offset="95%" stopColor="#4a5784ff"></stop>

                </linearGradient>

              </defs>

              <polygon points="0,0 100,0 0,20" fill="url(#gradient-plx)"></polygon>

            </svg>

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
      overflow: hidden;
      box-shadow: 2px 2px 5px rgba(0,0,0,.5);

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

          img {
            max-width: 80%;
            max-height: 80%;
            // border-radius: 1rem;
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
          }
          
          p {
            font-size: .9pc;
            line-height: 1.2pc;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
          }

          .end {
            display: flex;
            align-items: center;
            justify-content: space-between;

            .price {
              font-size: 2.2pc;
              position: absolute;
              top: .7pc;
              right: 0;
            }
          }
        }

        svg {
          fill: #485c9b;
          z-index: 10;
          // opacity: .5;
          // display: none;
        }

        .bottom-fix {
          position: absolute;
          bottom: 0;
          right: 0;
          width: 70%;
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
