import { Link } from "react-router-dom";

import styled from "styled-components"

import { SpinnerDiamond } from "spinners-react";
import { useEffect, useRef, useState } from "react";


const ProductLView = ({ productData }: any) => {

  const { _id, title, description, price, section, pics } = productData

  const [startedLoadingPic, setStartedLoadingPic] = useState(false)

  const leftSideRef = useRef(null)

  useEffect(() => {

    const displayPicture = async () => {

      console.log("pics[0]");
      // console.log(pics);
      // console.log(leftSideRef.current);

    }

    if (!startedLoadingPic) {

      setStartedLoadingPic(true)

      displayPicture()

    }

  }, [pics, startedLoadingPic])


  return (

    <ProductLViewStyle>

      <div className="pl-item">

        <Link to={`/product?id=${_id}`} className="pl-content">

          <div className="inner">

            <div className="left-side" ref={leftSideRef}>

              <SpinnerDiamond size="3pc" />

            </div>

            <div className="right-side">

              <h3>{title}</h3>

              <p>{description}</p>

              <div className="end">

                <span>{section}</span>

                <span>${price}</span>

              </div>

            </div>

            <svg viewBox="0 0 100 20" className="bottom-fix">

              <defs>

                <linearGradient id="gradient-pl" x1="0%" y1="50%" x2="100%" y2="50%">

                  <stop offset="5%" stopColor="#4165d2ff"></stop>

                  <stop offset="95%" stopColor="#4a5784ff"></stop>

                </linearGradient>

              </defs>

              <polygon points="100,0 100,20 0,20" fill="url(#gradient-pl)"></polygon>

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
        padding: 1rem;

        .left-side {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 40%;
          z-index: 15;
        }

        .right-side {
          width: 60%;
          z-index: 15;
        }

        svg {
          fill: #485c9b;
          z-index: 10;
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
          width: 70%;
        }
      }
    }

  }
`

export default ProductLView
