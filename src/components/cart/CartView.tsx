import { useRef, useState } from "react";

import { FaTimes } from "react-icons/fa";

import { useDispatch, useSelector } from "react-redux";

import { Link } from "react-router-dom";

import styled from "styled-components";

import { addItemToCart, deleteAvatar, getUserPicture, removeItemFromCart, uploadAvatar } from "../../api";

import { deleteApiJson, postApiFormData, postApiJson } from "../../controllers/APICtrl";

import { sendMiniMessage } from "../../controllers/MessageCtrl";

import { apostrophifyName } from "../../controllers/SpecialCtrl";

import { setCartData } from "../../store/slice/cartSlice";
import { setCheckoutData } from "../../store/slice/checkoutSlice";


const CartView = ({ cartData, goBack }: { cartData: any, goBack: any }) => {

  const dispatch = useDispatch()

  const ulRef = useRef(null)

  const { data: userData } = useSelector((store: any) => store.user)

  const [userImageAvailable, setUserImageAvailable] = useState(false)

  const saveCartData = (cartData: any) => dispatch(setCartData(cartData))

  const changeUserAvatar = async (e: React.FormEvent<HTMLInputElement>) => {

    if (!e) return false

    const input = e.currentTarget

    // @ts-ignore
    const avatar = input.files[0]

    if (!avatar) return false

    if (input.disabled === true) return false

    input.disabled = true;

    sendMiniMessage({

      icon: { name: "loading" },

      content: { text: "Updating Avatar!" }

    })

    const avatarData = await postApiFormData(uploadAvatar(), { avatar });

    input.disabled = false

    if (avatarData.error) {

      // Set up default avatar image if there was an error

      setUserImageAvailable(false)

      sendMiniMessage({

        icon: { name: "times" },

        content: { text: "An Error Occured!" }

      }, 2000)

      const avatarImage = new Image()

      avatarImage.src = '/images/avatar-small.png'

      avatarImage.onload = () => {

        avatarImage.alt = 'avatar';

        (e.target as HTMLImageElement).previousElementSibling?.replaceWith(avatarImage)

      }

    } else {

      const newImg = new Image()

      await fetch(getUserPicture(userData._id), { cache: 'reload', mode: "no-cors" })

      newImg.src = getUserPicture(userData._id);

      newImg.onload = () => {

        console.log('success');

        newImg.alt = "Cart owner";

        (e.target as HTMLImageElement).previousElementSibling?.replaceWith(newImg)

        setUserImageAvailable(true)

      }

      newImg.onerror = () => {

        const avatarImage = new Image()

        avatarImage.src = '/images/avatar-small.png'

        avatarImage.onload = () => {

          avatarImage.alt = 'avatar';

          (e.target as HTMLImageElement).previousElementSibling?.replaceWith(avatarImage)

          setUserImageAvailable(false)

        }

      }

      sendMiniMessage({

        icon: { name: "save" },

        content: { text: "Avatar Updated!" }

      }, 2000)

    }

  }

  const imgLoadHandler = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {

    setUserImageAvailable(e.currentTarget.src === getUserPicture(userData._id))

  }

  const removeUserAvatar = async (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {

    const imageTag = (e.currentTarget as HTMLImageElement).previousElementSibling?.previousElementSibling

    setUserImageAvailable(false)

    sendMiniMessage({

      icon: { name: "loading" },

      content: { text: "Removing Avatar!" }

    })

    const avatarDeletedData = await deleteApiJson(deleteAvatar());

    if (avatarDeletedData.message) {

      // Set up default avatar image if there was an error

      setUserImageAvailable(false)

      sendMiniMessage({

        icon: { name: "ok" },

        content: { text: "Avatar Deleted!" }

      }, 2000)

      const avatarImage = new Image()

      avatarImage.src = '/images/avatar-small.png'

      avatarImage.onload = () => {

        avatarImage.alt = 'avatar';

        imageTag?.replaceWith(avatarImage)

      }

    } else {

      setUserImageAvailable(true)

      sendMiniMessage({

        icon: { name: "times" },

        content: { text: "An Error Occured!" }

      }, 2000)

    }

  }

  const reduceCartItemByOne = async (cartItem: any, all?: boolean) => {

    sendMiniMessage({

      icon: { name: "loading" },

      content: { text: "Removing product!" }

    })

    let qty = all ? cartItem.quantity : 1

    const cartData = await deleteApiJson(removeItemFromCart(), { _id: cartItem.productID, qty })

    if (cartData.error) {

      sendMiniMessage({

        icon: { name: "times" },

        content: { text: "An Error Occured!" }

      }, 2000)

    } else {

      saveCartData(cartData)

      sendMiniMessage({

        icon: { name: "ok" },

        content: { text: "Product Removed!" }

      }, 2000)

    }

  }

  const addCartItemByOne = async (cartItem: any) => {

    sendMiniMessage({

      icon: { name: "loading" },

      content: { text: "Adding product!" }

    })

    const cartData = await postApiJson(addItemToCart(), { _id: cartItem.productID, qty: 1 })

    if (cartData.error) {

      sendMiniMessage({

        icon: { name: "times" },

        content: { text: "An Error Occured!" }

      }, 2000)

    } else {

      saveCartData(cartData)

      sendMiniMessage({

        icon: { name: "ok" },

        content: { text: "Product Added!" }

      }, 2000)

    }

  }

  const beginCheckout = async (e: any) => {

    const ulElement: any = ulRef.current

    if (cartData.items.length < 1) {

      return sendMiniMessage({

        icon: { name: "times" },

        content: { text: "Cart is Empty!" }

      }, 2000)

    }

    const getBottom = (item: any) => item.getBoundingClientRect().bottom

    if (Math.abs(getBottom(ulElement) - getBottom(ulElement?.parentElement)) > 25) {

      return ulElement.parentElement.scrollBy({ top: ulElement.scrollHeight, left: 0, behavior: 'smooth' });
      
    }
    
    dispatch(setCheckoutData(cartData.items))
    
    goBack() // Proceed to checkout

  }

  return (

    <CartViewStyle>

      <div className="heading">

        <div className="img-hol">

          <img src={getUserPicture(userData._id)} alt="Cart owner" onError={e => (e.target as HTMLImageElement).src = '/images/avatar-small.png'} onLoad={imgLoadHandler} />

          <input type="file" accept="image/png, image/jpg, image/jpeg" onInput={changeUserAvatar} />

          {userImageAvailable && <div className="remove-img" onClick={removeUserAvatar} ><FaTimes size=".6pc" color="white" /></div>}

        </div>

        <div className="intro-txt">

          <h1>{apostrophifyName(userData.name)} Cart</h1>

        </div>

      </div>

      <div className="body">

        <ul ref={ulRef}>

          {cartData.items.length === 0 && <div className="empt">No item in cart</div>}

          {cartData.items.map((cartItem: any) => <li key={cartItem._id}>

            <div className="li-top">{cartItem.name}</div>

            <div className="li-mid">

              <div className="qty">

                <button onClick={() => reduceCartItemByOne(cartItem)}>-</button>

                <span>{cartItem.quantity}</span>

                <button onClick={() => addCartItemByOne(cartItem)}>+</button>

              </div>

              <div className="pri">${cartItem.price}</div>

            </div>

            <div className="li-end">

              <Link target="_blank" to={`/product?product=${cartItem.productID}`}>View Item</Link>

              <button onClick={() => reduceCartItemByOne(cartItem, true)}>Remove</button>

            </div>

          </li>)}

          {cartData.items.length > 0 && <div className="total">

            <span>Total:</span>

            <span>${cartData.items.reduce((tot: any, x: any) => { return tot + x.price }, 0)}</span>

          </div>}

        </ul>

      </div>

      <div className="foot">

        <button className="back" onClick={() => goBack()}>Back</button>

        <button className="order" onClick={beginCheckout}>Checkout</button>

      </div>

    </CartViewStyle>

  )

}

const CartViewStyle = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  flex-direction: column;
  width: 100%;
  height: 100%;

  .heading {
    margin: .5pc auto;
    margin-top: 1pc;
    width: 100%;
    
    .img-hol {
      margin: 0 auto;
      width: 4pc; height: 4pc;
      overflow: hidden;
      
      img {
        width: 100%;
        height: 100%;
        z-index: 5;
        border-radius: 50%;
        object-fit: cover;
      }
      
      input {
        position: absolute;
        border-radius: 50%;
        top: 0; bottom: 0;
        left: 0; right: 0;
        width: 100%;
        height: 100%;
        cursor: pointer;
        opacity: 0;
        z-index: 10;
      }

      .remove-img {
        z-index: 15;
        position: absolute;
        top: 0; right: 0;
        width: 1pc;
        height: 1pc;
        cursor: pointer;
        line-height: .5pc;
        color: white;
        background-color: red;
        border-radius: 50%;
        display: flex; 
        align-items: center;
        justify-content: center;

        svg {
          display: flex; 
          align-items: center;
          justify-content: center;
        }
      }
    }
    
    .intro-txt {
      width: 90%;
      margin: 0 auto;
      text-align: center;
      border-bottom: 1px solid #fff;
  
      h1 {
        font-size: 1.2pc;
        line-height: 2pc;
        white-space: pre;
        text-overflow: ellipsis;
        overflow: hidden;
        padding: 0 1pc;
      }
    }
  }

  .body {

    width: 85%;
    margin: 0 auto;
    flex: 1;
    overflow: auto;
    
    ul {
      padding: 0 .5pc;
      padding-top: 0.2pc;
      min-height: 100%;
      display: flex;
      align-items: center;
      justify-content: flex-start;
      flex-direction: column;

      li {
        width: 100%;
        list-style-type: none;
        margin-bottom: 1pc;
        padding: .5pc 1pc;
        border-radius: 0.5pc;
        background: linear-gradient(145deg, #586DAD, #3C4B77);
        box-shadow: 2px 2px 4px #435485;

        .li-top {
          font-size: 1.1pc;
          font-weight: bold;
          padding-bottom: 0.3pc;
        }

        .li-mid {
          display: flex;
          align-items: center;
          justify-content: space-between;

          .pri {
            font-size: 1.4pc;
          }

          .qty {
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 1pc;
            line-height: 1pc;

            span {
              display: inline-block;
              padding: 0 .4pc;
            }
            
            button {
              display: flex;
              align-items: center;
              justify-content: center;
              height: 1pc;
              width: 1pc;
              padding: 0;
              border-radius: 0.5pc;
              border: 0 none;
              box-shadow: 0 0 4px rgba(0,0,0, .3);
              background-color: rgba(0,0,0, .2);
              color: white;
              transition: background-color .5s;
              
              &:hover {
                background-color: rgba(0,0,0, .4);
              }
            }
          }
        }

        .li-end {
          display: flex;
          font-size: .8pc;
          line-height: 1pc;
          padding: 0.3pc 0;
          
          button, a {
            flex: 1;
            display: flex;
            align-items: center;
            justify-content: center;
            text-decoration: none;
            text-align: center;
            padding: .4pc 0;
            border-radius: 0.5pc;
            border: 0 none;
            background-color: rgba(0,0,0, .1);
            box-shadow: 2px 2px 4px #142044;
            color: white;
            transition: background-color .5s;

            &:first-of-type {
              margin-right: .5pc;
            }
              
            &:hover {
              background-color: rgba(0,0,0, .4);
            }
          }
        }
      }

      .total {
        width: 100%;
        margin-top: auto;
        display: flex;
        align-items: baseline;
        justify-content: space-between;
        font-size: 2pc;
        line-height: 3pc;
      }

      .empt {
        /* font-size: 1.5pc; */
        font-style: italic;
        text-align: center;
        margin: auto;
      }
    }

    ::-webkit-scrollbar {
      width: .2rem;
      height: .2rem;
    }

    /* Track */
    ::-webkit-scrollbar-track {
      background: #3e4f83;
    }

    /* Handle */
    ::-webkit-scrollbar-thumb {
      background: #202a4a;
    }

    /* Handle on hover */
    ::-webkit-scrollbar-thumb:hover {
      background: #0b1328;
    }
  }

  .foot {
    margin: .5pc auto;
    margin-bottom: 1pc;
    width: 90%;
    display: flex;

    button {
      flex: 1;
      font-size: .9pc;
      line-height: 1.7pc;
      border-radius: 0.3pc;
      border: 0 none;
      color: white;
      background-color: rgba(0,0,0, .3);
      box-shadow: 2px 2px 4px rgba(0,0,0, .5);
      transition: background-color .5s;
      
      &:hover {
        background-color: rgba(0,0,0, .5);
      }
      
      &.back {
        margin-right: 1pc;
        background-color: lightsteelblue;
        color: black;

        &:hover {
          background-color: #5782bb;
        }
      }
    }
  }
`

export default CartView
