import { useEffect, useMemo, useRef } from "react"

import styled from "styled-components"

import { useLocation, useNavigate } from "react-router-dom"

import IndexQuery from "../components/index/IndexQuery"

import IndexSection from "../components/index/IndexSection"

import { useDispatch, useSelector } from "react-redux"

import { setDisplayString } from "../store/slice/productSlice"


const IndexPage = () => {

  const location = useLocation()

  const dispatch = useDispatch()

  const navigate = useRef(useNavigate())

  const locationString = location.search.replace("?view=", "")

  const { displayString } = useSelector((store: any) => store.product)

  const locationOptions = useMemo(() => ['query', 'section:all', 'section:cloth', 'section:book', 'section:shoe', 'section:cosmetic'], [])

  // Sets the value of display string and ensures the queery string is valid 
  useEffect(() => {

    if (!locationOptions.includes(locationString)) navigate.current('/?view=query')

    else if (displayString !== locationString) dispatch(setDisplayString(locationString))

  }, [locationString, displayString, locationOptions, dispatch])


  return (

    <IndexPageStyle>

      <div className="page-container">

        {(displayString === "query" || displayString === "") && <IndexQuery />}

        {displayString.startsWith("section:") && <IndexSection />}

      </div>

    </IndexPageStyle>

  )

}

const IndexPageStyle = styled.div`

  min-width: 100%;
  flex: 1;
  display: flex;
  align-items: center;
  flex-direction: column;

  .page-container {
    display: contents;
  }
`

export default IndexPage
