import { useEffect, useMemo, useRef } from "react"

import styled from "styled-components"

import { useNavigate } from "react-router-dom"

import IndexQuery from "../components/index/IndexQuery"

import IndexSection from "../components/index/IndexSection"

import { createQueryString, getQueryObject } from "../controllers/SpecialCtrl"

import { useSelector } from "react-redux"


const IndexPage = () => {

  const navigate = useRef(useNavigate())

  const { queryObject, active } = useSelector((store: any) => store.query)

  const { view } = queryObject

  const locationOptions = useMemo(() => ['query', 'section:all', 'section:cloth', 'section:book', 'section:shoe', 'section:cosmetic'], [])

  // Sets the value of display string and ensures the query string is valid 
  useEffect(() => {

    const { view } = getQueryObject(window.location.href);

    if (!locationOptions.includes(view) && active) navigate.current(createQueryString({ view: 'query' }), { replace: true })

  }, [locationOptions, active])


  return (

    <IndexPageStyle>

      <div className="page-container">

        {(view === "query" || view === "" || view === undefined || !locationOptions.includes(view)) && <IndexQuery />}

        {view?.startsWith("section:") && <IndexSection />}

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
