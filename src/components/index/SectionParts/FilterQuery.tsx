import { useState } from "react"

import { FaSearch, FaTimes } from "react-icons/fa"

import { useNavigate } from "react-router-dom"

import styled from "styled-components"

import { createQueryString, getQueryObject } from "../../../controllers/SpecialCtrl"


const FilterQuery = () => {

  const navigate = useNavigate()

  const [searchValue, setSearchValue] = useState("")

  const { view } = getQueryObject()

  const filterHandler = (e: React.FormEvent<HTMLFormElement>) => {

    e.preventDefault()

    if (searchValue.trim().length < 1) {

      resetForm()

    } else {

      navigate(createQueryString({ view, search: searchValue.trim(), count: 10 }))

    }

  }

  const resetForm = () => {

    setSearchValue("")

    navigate(createQueryString({ view, count: 10 }))

  }

  return (

    <FilterQueryStyle>

      <form className="fq-inner" onSubmit={filterHandler}>

        <div className="form-pack">

          <div className="s-ico">

            <FaSearch size="1pc" />

          </div>

          <input type="text" placeholder="Search for anything..." value={searchValue} onInput={e => setSearchValue((e.target as HTMLInputElement).value)} />

          <div className="s-btns">

            <button className="cancel" type="button" onClick={resetForm}><FaTimes size="1pc" /></button>

            <button className="search" type="submit">Search</button>

          </div>

        </div>

      </form>

    </FilterQueryStyle>

  )

}

const FilterQueryStyle = styled.div`
  position: sticky;
  top: 2rem; left: 0;
  right: 0;
  width: 100%;
  z-index: 50;
  margin-top: .5rem;

  form.fq-inner {
    display: flex;
    margin: 0 auto;
    width: 80%;

    .form-pack {
      width: 100%;

      input {
        z-index: 10;
        display: block;
        width: 100%;
        border: 0 none;
        outline: 0 none;
        line-height: 2pc;
        padding: .5pc 0;
        border-radius: 1.5pc;
        padding-left: 3pc;
        padding-right: 8pc;
        background-color: #fff;
        box-shadow: 3px 3px 6px rgba(130, 145, 197,.2);

        @media screen and (max-width: 350px) {
          padding-right: 6pc;
        }
      }

      .s-ico {
        position: absolute;
        top: 0; left: 1pc;
        bottom: 0;
        width: 1pc;
        z-index: 15;
        display: flex;
        align-items: center;
        justify-content: center;
        color: #4363c9;

        svg {
          display: flex;
          align-items: center;
          justify-content: center;
        }
      }

      .s-btns {
        position: absolute;
        top: 0; right: 0;
        bottom: 0;
        width: 8pc;
        z-index: 15;
        display: flex;
        align-items: center;
        justify-content: space-evenly;

        button {
          display: flex;
          padding: 0;
          border: 0 none;
          color: #4363c9;

          &.search {
            background-color: #4363c9;
            padding: 0.1pc 1.2pc;
            line-height: 1.8pc;
            font-size: .8pc;
            border-radius: 1pc;
            color: white;
            transition: box-shadow .5s;

            &:hover {
              box-shadow: 1px 1px 3px 0 rgba(0,0,0,.5);
            }
          }

          &.cancel {
            transition: color .5s;
           
            &:hover {
              color: red;
            }
          }
        }

        @media screen and (max-width: 350px) {
          width: 6pc;

          button.cancel {
            display: none;
          }
        }

        svg {
          display: flex;
          align-items: center;
          justify-content: center;
        }
      }
    }

    @media screen and (max-width: 500px) {
      width: 90%;
    }
  }
  /* background-color: orange; */
`

export default FilterQuery
