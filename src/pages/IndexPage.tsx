import { useEffect, useMemo, useRef, useState } from "react"

import styled from "styled-components"

import { useLocation, useNavigate } from "react-router-dom"

import IndexQuery from "../components/index/IndexQuery"

import IndexCategory from "../components/index/IndexCategory"

import { capitalize } from "../controllers/SpecialCtrl"


const IndexPage = () => {

  const location = useLocation()

  const navigate = useRef(useNavigate())

  const locationString = location.search.replace("?view=", "")

  const locationOptions = useMemo(() => ['query', 'category:cloth', 'category:book', 'category:shoe', 'category:cosmetic'], [])

  const [displayString, setDisplayString] = useState(locationOptions.includes(locationString) ? locationString : '')

  // Sets the value of display string and ensures the queery string is valid 
  useEffect(() => {

    if (!locationOptions.includes(locationString)) navigate.current('/?view=query')

    else if (displayString !== locationString) setDisplayString(locationString)

  }, [locationString, displayString, locationOptions])

  
  return (

    <IndexPageStyle>

      <div className="page-container">

        {displayString === "query" && <IndexQuery />}

        {displayString.startsWith("category:") && <IndexCategory categoryName={capitalize(displayString.replace('category:', ''))} />}

      </div>


    </IndexPageStyle>

  )

}

const IndexPageStyle = styled.div`

  animation: opacity-in .5s ease-in 1;
  min-width: 100%;
  /* margin: 0 auto; */
  flex: 1;
  display: flex;
  align-items: center;
  /* justify-content: center; */
  flex-direction: column;

  .page-container {
    width: 80%;
    margin: auto 0;
  }
`

export default IndexPage
