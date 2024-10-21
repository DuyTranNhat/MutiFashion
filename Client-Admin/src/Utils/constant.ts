export const PAGE_LIMIT_SUPPLIER = 3
export const PAGE_LIMIT_VARIANT = 5
export const PAGE_LIMIT_ATTRIBUTE = 5
export const PAGE_LIMIT_PRODUCT = 10

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


export const API_URL = import.meta.env.VITE_API_URL
export const ATTRIBUTE_API = `${API_URL}/api/option`
export const PRODUCT_API = `${API_URL}/api/product`
export const VARIANT_API = `${API_URL}/api/variant`
export const SUPPLIER_API = `${API_URL}/api/Supplier`

