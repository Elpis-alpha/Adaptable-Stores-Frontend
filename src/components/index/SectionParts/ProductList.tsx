import { useEffect } from "react"

import { useDispatch, useSelector } from "react-redux"

import styled from "styled-components"

import { loadingProductList, setProductList } from "../../../store/slice/productSlice"

const ProductList = () => {

  const dispatch = useDispatch()
  
  const { currentSection, loadingList, searchValue, useSearch, productList, currentList } = useSelector((store: any) => store.product)

  useEffect(() => {

    // If it in search mode
    if (useSearch) {

      // Make sure that the search hasn't been performed
      if (currentList.replace('search: ', '') !== searchValue) {

        // Fetch list with search value and section name

      }
      
    } else {
      // If its in section mode

      // Make sure that the current section isn't the one that is being displayed
      if (currentList.replace('section: ', '') !== currentSection) {

        // Fetch list with section name

      }

    }

    // dispatch(loadingProductList())

  }, [currentSection, searchValue, useSearch, dispatch, currentList])


  return (

    <ProductListStyle>

      {!loadingList && <div className="p-l-container">

        {productList.map((product: any) => <div key={product._id}>{product.title}</div>)}

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
  }

  .p-l-fake {
    /* Loading Stuff */
  }
`

export default ProductList
