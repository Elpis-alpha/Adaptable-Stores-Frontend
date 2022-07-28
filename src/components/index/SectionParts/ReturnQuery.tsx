import { FaAngleLeft } from "react-icons/fa"

import { Link } from "react-router-dom"

import styled from "styled-components"

import { createQueryString } from "../../../controllers/SpecialCtrl"

const ReturnQuery = () => {

  return (

    <ReturnQueryStyle>

      <Link to={createQueryString({ view: "query" })}>

        <div className="center">

          <FaAngleLeft size="2pc" />

        </div>

        <div className="expanded">

          Back to Home

        </div>

      </Link>

    </ReturnQueryStyle>

  )

}

const ReturnQueryStyle = styled.div`
  position: fixed;
  bottom: 1pc; left: 1pc;
  z-index: 70;

  a {
    height: 3pc; 
    width: 3pc;
    border-radius: 1.5pc;
    display: block;
    background-color: #4a5884;
    color: #fff;
    display: flex;
    align-items: center;
    justify-content: center;
    text-decoration: none;

    .center {
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 10;

      svg {
        display: flex;
        align-items: center;
        justify-content: center;
      }
    }

    .expanded {
      background-color: inherit;
      position: absolute;
      top: 0; bottom: 0;
      left: 0;
      border-radius: 1.5pc;
      z-index: 5;
      padding-left: 3pc;
      display: flex;
      align-items: center;
      justify-content: flex-start;
      overflow: hidden;
      white-space: pre;
      width: 3pc;
      transition: width .5s;
    }

    &:hover {

      .expanded {
        width: 10pc;
      }
    }
  }
`

export default ReturnQuery
