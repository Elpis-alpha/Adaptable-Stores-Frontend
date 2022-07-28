import { useEffect } from "react"

import { useDispatch, useSelector } from "react-redux"

import styled from "styled-components"

import { getApiJson } from "../../../controllers/APICtrl"

import { loadingProductList, setProductList } from "../../../store/slice/productSlice"

import { getAllItems } from "../../../api"

import ProductLView from "./ProductLView"

import { getQueryObject } from "../../../controllers/SpecialCtrl"


const ProductList = () => {

  const dispatch = useDispatch()

  const { currentSection, loadingList, searchValue, useSearch, productList, currentList } = useSelector((store: any) => store.product)

  useEffect(() => {

    const initialFetch = async () => {

      const { search } = getQueryObject()

      // If it in search mode
      if (search && search?.length > 0) {

        // Make sure that the search hasn't been performed
        if (currentList.split(' || ')[1]?.replace('search: ', '') !== search) {

          // Fetch list with search value and section name

          dispatch(loadingProductList())

          const productData = await getApiJson(getAllItems(currentSection, 0, 10, search))

          if (productData.error) {

            console.log('Error in fetch');

          } else {

            dispatch(setProductList({ data: productData, limit: 10, skip: 0, section: currentSection }))

          }

        }

      } else {
        // If its in section mode

        // Make sure that the current section isn't the one that is being displayed
        if (currentList.replace('section: ', '') !== currentSection) {

          // Fetch list with section name

          dispatch(loadingProductList())

          const productData = await getApiJson(getAllItems(currentSection, 0, 10))

          if (productData.error) {

            console.log('Error in fetch');

          } else {

            dispatch(setProductList({ data: productData, limit: 10, skip: 0, section: currentSection }))

          }

        }

      }

    }

    initialFetch()

  }, [currentSection, searchValue, useSearch, dispatch, currentList])


  return (

    <ProductListStyle>

      {(!loadingList && productList.length > 0) && <div className="p-l-container">

        {productList.map((product: any) => <ProductLView key={product._id} productData={product} />)}

      </div>}

      {(!loadingList && productList.length < 1) && <div className="p-l-empty">

        No Product Here

      </div>}

      {loadingList && <div className="p-l-fake">

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
