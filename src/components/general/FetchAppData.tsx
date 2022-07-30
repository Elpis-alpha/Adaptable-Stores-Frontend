import { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";

import { getCart, getUser } from "../../api";

import { getApiJson } from "../../controllers/APICtrl";

import { removeCartData, setCartData } from "../../store/slice/cartSlice";

import { removeUserData, setUserData } from "../../store/slice/userSlice";


const FetchBaseData = () => {

  const dispatch = useDispatch()

  const { available } = useSelector((store: any) => store.user)

  const { available: cartAvailable } = useSelector((store: any) => store.cart)

  const [userFetchedHere, setUserFetchedHere] = useState(false)

  useEffect(() => {

    // Fetch User Data
    const fetchUser = async () => {

      setUserFetchedHere(true)

      const userData = await getApiJson(getUser())

      if (userData.error) { setUserFetchedHere(false); dispatch(removeUserData()) }

      else dispatch(setUserData(userData))

      return userData

    }

    // Fetch Cart Data
    fetchUser().then(async userData => {

      if (userData.error) return dispatch(removeCartData())

      const cartData = await getApiJson(getCart())

      if (cartData.error) dispatch(removeCartData())

      else dispatch(setCartData(cartData))

    })

  }, [dispatch])

  useEffect(() => {

    // Fetch Cart Data
    const fetchCartData = async () => {

      const cartData = await getApiJson(getCart())

      if (cartData.error) dispatch(removeCartData())

      else dispatch(setCartData(cartData))

    }

    if (available && !userFetchedHere && !cartAvailable) fetchCartData()

  }, [dispatch, userFetchedHere, available, cartAvailable])

  return <></>

}

export default FetchBaseData