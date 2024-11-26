export const PAGE_LIMIT_SUPPLIER = 4
export const PAGE_LIMIT_VARIANT = 4
export const PAGE_LIMIT_ATTRIBUTE = 4
export const PAGE_LIMIT_CATEGORY = 4
export const PAGE_LIMIT_PRODUCT = 12
export const PAGE_LIMIT_BANNER = 12
export const PAGE_LIMIT_ORDERS = 8

export const PENDING_ORDER = 'pending'
export const APPROVE_ORDER = 'completed'
export const CANCEL_ORDER = 'cancelled'


export const GENERALINFORM = 'GENERALINFORM'
export const VARIANT_ATTRIBUTE = 'VARIANT_ATTRIBUTE'
export const IMPORT_PRICE = 'IMPORT_PRICE'

export const TAB_CREATEPRODUCT = [
  { id: GENERALINFORM, label: 'General Inform' },
  { id: VARIANT_ATTRIBUTE, label: 'Variant & Attribute' },
];


export const CLASSLIST_COLORS = ['btn-warning', 'btn-danger', 'btn-success', 'btn-secondary', 'btn-primary', 'btn-outline-primary']
export const CLASSLIST_COLORS_OL = ['btn-outline-warning', 'btn-outline-danger', 'btn-outline-success', 'btn-outline-secondary', 'btn-outline-primary', 'btn-outline-primary']


export const getRandomColorClass = (): string => {
  const randomIndex = Math.floor(Math.random() * CLASSLIST_COLORS.length);
  return CLASSLIST_COLORS[randomIndex];
};

export const getRandomColorClassOL = (): string => {
  const randomIndex = Math.floor(Math.random() * CLASSLIST_COLORS_OL.length);
  return CLASSLIST_COLORS_OL[randomIndex];
};

export const BASE_URL = import.meta.env.VITE_BASE_URL
export const ATTRIBUTE_API = `${BASE_URL}/api/option`
export const PRODUCT_API = `${BASE_URL}/api/product`
export const VARIANT_API = `${BASE_URL}/api/variant`
export const SUPPLIER_API = `${BASE_URL}/api/supplier`
export const BANNER_API = `${BASE_URL}/api/banner`
export const CATEGORY_API = `${BASE_URL}/api/category`
export const ORDER_API = `${BASE_URL}/api/order`

