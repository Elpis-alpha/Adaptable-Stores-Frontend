import { useEffect, useState } from "react";

import { FaTimes } from "react-icons/fa";

import { useSelector } from "react-redux"

import { useNavigate } from "react-router-dom";

import styled from "styled-components";

import { createQueryString } from "../../controllers/SpecialCtrl";

import { waitFor } from "../../controllers/TimeCtrl";


const AbsoluteProduct = () => {

  const navigate = useNavigate()

  const { queryObject } = useSelector((store: any) => store.query)
  
  const { view, product } = queryObject
  
  const [startClosing, setStartClosing] = useState(false)

  const { singleProductDimensions, singleProduct } = useSelector((store: any) => store.product)

  useEffect(() => {

    console.log('Starting');

    console.log(singleProduct)

    console.log({ view, product });

  }, [view, product, singleProduct])


  const closeProduct = async () => {

    setStartClosing(true)

    await waitFor(500)

    navigate(createQueryString({ ...queryObject, product: undefined }))

    setStartClosing(false)

  }

  return (

    <AbsoluteProductStyle style={{ ...singleProductDimensions }} className={(product ? 'reveal' : '') + (startClosing ? ' start-closing' : '')}>

      <div className="inner-abs">

        Absolute Product

      </div>

      <div className="cancel-x" onClick={closeProduct}>

        <FaTimes size="2pc" color="red" />

      </div>

    </AbsoluteProductStyle>

  )

}

const AbsoluteProductStyle = styled.div`
  position: fixed;
  background-color: rgba(0,0,0, .3);
  width: 0; height: 0;
  transition: transform .5s;
  display: none;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  
  &.reveal {
    display: flex;
    width: 100%;
    height: 100%;
    top: 0; left: 0;
    z-index: 200;
    animation: scale-in 1s 1;
    
    &.start-closing {
      transform: scale(0);
    }
  }

  .inner-abs {  
    width: 90vw;
    min-height: 40vh;
    max-height: 90vh;
    background-color: #fff;
  }

  .cancel-x {
    position: absolute;
    top: 2pc; right: 2pc;
    display: flex;
    transform: scale(1);
    cursor: pointer;
    transition: transform .5s;
    
    &:hover {
      transform: scale(1.5);
    }
  }
`

export default AbsoluteProduct
