export const BASE_URL = import.meta.env.VITE_BASE_URL
export const GENERALINFORM = 'GENERALINFORM'
export const VARIANT_ATTRIBUTE = 'VARIANT_ATTRIBUTE'
export const IMPORT_PRICE = 'IMPORT_PRICE'
export const AUTH_API = `${BASE_URL}/api/auth`
export const ATTRIBUTE_API = `${BASE_URL}/api/option`
export const PRODUCT_API = `${BASE_URL}/api/product`
export const VARIANT_API = `${BASE_URL}/api/variant`
export const BANNER_API = `${BASE_URL}/api/banner`
export const CATEGORY_API = `${BASE_URL}/api/category`
export const CART_API = `${BASE_URL}/api/cart`
export const USER_API = `${BASE_URL}/api/customer`
export const ORDER_API = `${BASE_URL}/api/order`

export const PAYPAL = "PAYPAL"
export const COD = "COD"

export const PAYMENT_METHODS = [
    { id: 1, name: PAYPAL },
    { id: 2, name: COD },
]

export const PAGE_LIMIT_CART = 3
export const PAGE_LIMIT_SUPPLIER = 4
export const PAGE_LIMIT_VARIANT = 4
export const PAGE_LIMIT_ATTRIBUTE = 4
export const PAGE_LIMIT_CATEGORY = 4
export const PAGE_LIMIT_PRODUCT = 3
export const PAGE_LIMIT_BANNER = 12



