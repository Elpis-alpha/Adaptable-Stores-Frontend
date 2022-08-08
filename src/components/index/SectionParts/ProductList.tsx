import { useEffect, useState } from "react"

import { useDispatch, useSelector } from "react-redux"

import styled from "styled-components"

import { getApiJson } from "../../../controllers/APICtrl"

import { getAllItems } from "../../../api"

import ProductLView from "./ProductLView"

import { addMultiProductList, loadingMultiProductList, setMultiProductList } from "../../../store/slice/productSlice"

import { reterieveSectionName } from "../../../controllers/GeneralCtrl"

import { SpinnerCircular } from "spinners-react"

import { useNavigate } from "react-router-dom"

import { createQueryString } from "../../../controllers/SpecialCtrl"


const ProductList = () => {

  const dispatch = useDispatch()

  const navigate = useNavigate()

  const [moreAvailable, setMoreAvailable] = useState(true)

  const { queryObject } = useSelector((store: any) => store.query)

  const { view, search, count } = queryObject

  const { multiProduct } = useSelector((store: any) => store.product)

  const { available, loading, queryData, data } = multiProduct

  useEffect(() => {

    const initialFetch = async () => {

      const querySection = reterieveSectionName(view)

      // If it in search mode
      if (search) {

        // Make sure that the search hasn't been performed
        if (queryData.search !== search || queryData.view !== view) {

          // Fetch list with search value and section name

          dispatch(loadingMultiProductList(true))

          const productData = await getApiJson(getAllItems(querySection, 0, parseInt(count), search))

          if (productData.error) {

            console.log('Error in fetch');

          } else {

            setMoreAvailable(productData.length === parseInt(count))

            dispatch(setMultiProductList({

              available: true,

              loading: false,

              queryData: queryObject,

              data: productData

            }))

          }

        }

      } else {
        // If its in section mode

        // Make sure that the current section isn't the one that is being displayed
        if (queryData.view !== view || queryData.search !== undefined) {

          // Fetch list with section name

          dispatch(loadingMultiProductList(true))

          const productData = await getApiJson(getAllItems(querySection, 0, parseInt(count)))

          if (productData.error) {

            console.log('Error in fetch');

          } else {

            setMoreAvailable(productData.length === parseInt(count))

            dispatch(setMultiProductList({

              available: true,

              loading: false,

              queryData: queryObject,

              data: productData

            }))

          }

        }

      }

    }

    initialFetch()

  }, [dispatch, count, queryData, search, view, queryObject])

  const loadMoreHandler = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {

    const incrementValue = 10

    const butt: HTMLButtonElement = e.currentTarget

    const querySection = reterieveSectionName(view)

    if (butt.disabled) return false

    butt.disabled = true

    if (search) {

      const productData = await getApiJson(getAllItems(querySection, parseInt(count), incrementValue, search))

      butt.disabled = false

      if (productData.error) {

        console.log('Error in fetch');

      } else {

        setMoreAvailable(productData.length === incrementValue)

        dispatch(addMultiProductList(productData))

        navigate(createQueryString({ ...queryObject, count: parseInt(count) + incrementValue }))

      }

    } else {

      const productData = await getApiJson(getAllItems(querySection, parseInt(count), incrementValue))

      butt.disabled = false

      if (productData.error) {

        console.log('Error in fetch');

      } else {

        setMoreAvailable(productData.length === incrementValue)

        dispatch(addMultiProductList(productData))

        navigate(createQueryString({ ...queryObject, count: parseInt(count) + incrementValue }))

      }

    }

  }


  return (

    <ProductListStyle>

      {(!loading && data.length > 0 && available) && <div className="p-l-container">

        {data.map((product: any) => <ProductLView key={product._id} productData={product} queryObject={queryObject} />)}

        {moreAvailable && <button onClick={loadMoreHandler}>

          <span className="bee">Load More</span>

          <span className="lee">Loading <SpinnerCircular color="#fff" size="1pc" className="lep-x" /></span>

        </button>}

      </div>}

      {(!loading && data.length < 1) && <div className="p-l-empty">

        No Product Found Here

      </div>}

      {loading && <div className="loading-pl">

        <SpinnerCircular size="5pc" color="#4a5c92" secondaryColor="#e3eaff" />

      </div>}

    </ProductListStyle>

  )

}

const ProductListStyle = styled.div`
  display: flex;
  flex: 1;
  width: 100%;
  overflow: hidden;

  .p-l-container {
    width: 100%;
    padding: .5rem;
    padding-top: 1rem;
    display: flex;
    align-items: flex-start;
    justify-content: space-around;
    align-content: flex-start;
    flex-wrap: wrap;

    button {
      background-color: #2e3960;
      border: 0 none;
      padding: .7pc 1pc;
      width: 90%;
      font-size: 1pc;
      border-radius: .5pc;
      color: #fff;
      transition: box-shadow .5s;
      display: flex;
      align-items: center;
      justify-content: center;
      
      span {
        display: flex;
        align-items: center;
        justify-content: center;

        &.lee {
          display: none;
        }
        
        .lep-x {
          display: flex;
          margin-left: .5pc;
        }
      }

      &:disabled {
        opacity: .5;

        span {

          &.lee {
            display: flex;
          }

          &.bee {
            display: none;
          }
        }

      }

      &:hover {
        box-shadow: 2px 2px 4px rgba(0, 0, 0, .7);
      }
    }
  }

  .loading-pl {
    /* Loading Stuff */
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
  }

  .p-l-empty {
    /* Loading Stuff */
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
  }
`

export default ProductList
