import { backendLocation } from './__env'


// User Routes
export const createUser = () => `${backendLocation}/api/users/create`

export const getUser = () => `${backendLocation}/api/users/user`

export const editUser = () => `${backendLocation}/api/users/update`

export const deleteUser = () => `${backendLocation}/api/users/delete`

export const getUserbyID = (userID: string) => `${backendLocation}/api/users/find?_id=${userID}`

export const getUserbyEmail = (email: string) => `${backendLocation}/api/users/find?email=${email}`

export const changePassword = () => `${backendLocation}/api/users/change-password`

export const sendVerificationEmail = () => `${backendLocation}/api/users/verify`

export const uploadAvatar = () => `${backendLocation}/api/users/avatar/upload`

export const deleteAvatar = () => `${backendLocation}/api/users/avatar/remove`

export const getUserPicture = (userID: string, size = 'small') => `${backendLocation}/api/users/avatar/view?_id=${userID}&size=${size}`

export const userExistence = (email: string) => `${backendLocation}/api/users/user/exists?email=${email}`

export const loginUser = () => `${backendLocation}/api/users/login`

export const logoutUser = () => `${backendLocation}/api/users/logout`


// Item routes
export const getAllItems = (sectionName: string, skip: number, limit: number, filter?: string) => {

  return `${backendLocation}/api/items/get-all?limit=${limit}&skip=${skip}&section=${sectionName}&sortBy=updatedAt:desc${filter ? `&filter=${filter}` : ''}`

}

export const getItemPicture = (itemID: string, picID: string) => {

  return `${backendLocation}/api/items/pictures/view?_id=${itemID}&picID=${picID}`

}

export const getProduct = (productID: string) => `${backendLocation}/api/items/get?_id=${productID}`

export const getProductbyTitle = (productTitle: string) => `${backendLocation}/api/items/get?title=${productTitle}`

export const verifyAdmin = (item_password: string) => `${backendLocation}/api/items/verify?item_password=${item_password}`

export const createProduct = (item_password: string) => `${backendLocation}/api/items/create?item_password=${item_password}`

export const updateProduct = (item_password: string, productID: string) => `${backendLocation}/api/items/update?item_password=${item_password}&_id=${productID}`

export const deleteProduct = (item_password: string, productID: string) => `${backendLocation}/api/items/delete?item_password=${item_password}&_id=${productID}`

export const uploadProductPicture = (item_password: string, productID: string) => {

  return `${backendLocation}/api/items/picture/upload?item_password=${item_password}&_id=${productID}`

}

export const deleteProductPicture = (item_password: string, productID: string, picID: string) => {

  return `${backendLocation}/api/items/pictures/remove?item_password=${item_password}&_id=${productID}&picID=${picID}`

}



// Cart Routes
export const getCart = () => `${backendLocation}/api/cart/get`

export const addItemToCart = () => `${backendLocation}/api/cart/add`

export const removeItemFromCart = () => `${backendLocation}/api/cart/remove`


// Order Routes
export const getOrder = () => `${backendLocation}/api/order/get`

export const createPaypalOrder = () => `${backendLocation}/api/order/add-paypal`

export const createStripeOrder = () => `${backendLocation}/api/order/add-stripe`
