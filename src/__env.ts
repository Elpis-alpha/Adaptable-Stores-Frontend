export const creator = "Elpis"

export const siteName = "Adaptable Stores 🛒"

export const siteDescription = "A simple template of a functional next js application"

export const keywordx = ["elpis", "next", "nextjs"]

export const hostEmail = "site.overseer.alpha@gmail.com"

export const emailName = "Adaptable Stores 🛒"

export const tokenCookieName = "adaptables-user-token"


// Dynamic Variables
export const host = window ? window.location.origin : process.env.REACT_APP_HOST

export const backendLocation = process.env.REACT_APP_BACK_END

export const isProduction = process.env.REACT_APP_IS_PRODUCTION === "true"

export const complain = `${process.env.REACT_APP_BACK_END}/complain`