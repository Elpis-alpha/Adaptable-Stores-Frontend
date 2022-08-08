import { useEffect, useState } from "react";

import { FaTimes } from "react-icons/fa";

import { useDispatch, useSelector } from "react-redux"

import { useNavigate } from "react-router-dom";
import { SpinnerCircular } from "spinners-react";

import styled from "styled-components";

import { getProduct } from "../../api";

import { getApiJson } from "../../controllers/APICtrl";

import { createQueryString } from "../../controllers/SpecialCtrl";

import { waitFor } from "../../controllers/TimeCtrl";

import { setSingleProduct } from "../../store/slice/productSlice";

import Product from "./Product";


const AbsoluteProduct = () => {

  const navigate = useNavigate()

  const dispatch = useDispatch()

  const { queryObject } = useSelector((store: any) => store.query)

  const { product } = queryObject

  const [startClosing, setStartClosing] = useState(false)

  const [productError, setProductError] = useState(false)

  const { singleProductDimensions, singleProduct } = useSelector((store: any) => store.product)

  const { available, loading, data: productData } = singleProduct

  useEffect(() => {

    const fetchProductData = async () => {

      if (product && (product !== singleProduct.queryData.product)) {

        dispatch(setSingleProduct({

          available: false,

          loading: true,

          queryData: queryObject,

          data: {}

        }))

        setProductError(false)

        const productData = await getApiJson(getProduct(product))

        if (productData.error) {

          dispatch(setSingleProduct({

            available: false,

            loading: false,

            queryData: queryObject,

            data: {}

          }))

          setProductError(true)

          console.log('Error on product fetch');

        } else {

          dispatch(setSingleProduct({

            available: true,

            loading: false,

            queryData: queryObject,

            data: productData

          }))

        }

      }

    }

    fetchProductData()

  }, [dispatch, product, singleProduct, queryObject])


  const closeProduct = async () => {

    setStartClosing(true)

    await waitFor(500)

    navigate(createQueryString({ ...queryObject, product: undefined }))

    setStartClosing(false)

    if (productError) {

      setProductError(false)

      dispatch(setSingleProduct({

        available: false,

        loading: false,

        queryData: {},

        data: {}

      }))

    }

  }

  return (

    <AbsoluteProductStyle style={{ ...singleProductDimensions }} className={(product ? 'reveal' : '') + (startClosing ? ' start-closing' : '')}>

      <div className="inner-abs">

        <div className="product-holder">

          {available && <Product productData={productData} full={false} />}

          {loading && <div className="loader"><SpinnerCircular size="5pc" color="#4a5c92" secondaryColor="#c9d4f5" /></div>}

          {productError && <>Error occured while fetching the product</>}

        </div>

        <div className="cancel-x" onClick={closeProduct}>

          <FaTimes size="2pc" color="red" />

        </div>

      </div>

    </AbsoluteProductStyle>

  )

}

const AbsoluteProductStyle = styled.div`
  position: fixed;
  background-color: rgba(0,0,0, .4);
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
    background-color: #fff;
    /* border-radius: 1.5pc; */
    overflow: hidden;
    
    .product-holder {
      width: 80vw;
      max-height: 80vh;
      overflow: auto;
      z-index: 50;
      padding: 1pc;

      .loader {
        padding: 2pc;
        display: flex;
        align-items: center;
        justify-content: center;
      }
    }
  
    .cancel-x {
      position: absolute;
      top: 1.8pc; right: 2pc;
      display: flex;
      transform: scale(1);
      cursor: pointer;
      z-index: 150;
      transition: transform .5s;
  
      &:hover {
        transform: scale(1.5);
      }
    }
  }
`

export default AbsoluteProduct
