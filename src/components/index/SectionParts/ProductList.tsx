import { useEffect } from "react"

import { useDispatch, useSelector } from "react-redux"

import styled from "styled-components"

import { getApiJson } from "../../../controllers/APICtrl"

import { getAllItems } from "../../../api"

import ProductLView from "./ProductLView"

import { getQueryObject } from "../../../controllers/SpecialCtrl"

import { loadingMultiProductList, setMultiProductList } from "../../../store/slice/productSlice"

import { reterieveSectionName } from "../../../controllers/GeneralCtrl"


const ProductList = () => {

  const dispatch = useDispatch()

  const { view, search, count } = getQueryObject()

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

          const productData = await getApiJson(getAllItems(querySection, 0, count, search))

          if (productData.error) {

            console.log('Error in fetch');

          } else {

            dispatch(setMultiProductList({

              available: true,

              loading: false,

              queryData: getQueryObject(),

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

          const productData = await getApiJson(getAllItems(querySection, 0, count))

          if (productData.error) {

            console.log('Error in fetch');

          } else {

            dispatch(setMultiProductList({

              available: true,

              loading: false,

              queryData: getQueryObject(),

              data: productData

            }))

          }

        }

      }

    }

    initialFetch()

  }, [dispatch, count, queryData, search, view])


  return (

    <ProductListStyle>

      {(!loading && data.length > 0 && available) && <div className="p-l-container">

        {data.map((product: any) => <ProductLView key={product._id} productData={product} />)}

      </div>}

      {(!loading && data.length < 1) && <div className="p-l-empty">

        No Product Here

      </div>}

      {loading && <div className="p-l-fake">

        Loading...

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
  }

  .p-l-fake {
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
