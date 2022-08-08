import { useEffect, useState } from "react"

import { useDispatch, useSelector } from "react-redux"
import { SpinnerCircular } from "spinners-react"
import styled from "styled-components"

import { getProduct } from "../api"

import Product from "../components/product/Product"

import { getApiJson } from "../controllers/APICtrl"

import { setSingleProduct } from "../store/slice/productSlice"


const ProductPage = () => {

  const dispatch = useDispatch()

  const [productError, setProductError] = useState(false)

  const { queryObject } = useSelector((store: any) => store.query)

  const { singleProduct } = useSelector((store: any) => store.product)

  const { available, loading, data: productData } = singleProduct

  const { product } = queryObject

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

  return (

    <ProductPageStyle className="product-page">

      {available && <Product productData={productData} full={true} />}

      {loading && <div className="loader"><SpinnerCircular size="5pc" color="#4a5c92" secondaryColor="#c9d4f5" /></div>}

      {productError && <div>Error occured while fetching the product</div>}

    </ProductPageStyle>

  )

}

const ProductPageStyle = styled.div`
  width: 100%;
  
  &.product-page > div > div.in-pro {
    border: 0 none;
    padding-top: 0;
    
    > div {
      /* border: 0 none; */
    }
  }

  .loader {
    width: 100%;
    padding: 25vh 2pc;
    display: flex;
    align-items: center;
    justify-content: center;
  }
`

export default ProductPage
