export const GENERALINFORM = 'GENERALINFORM'
export const VARIANT_ATTRIBUTE = 'VARIANT_ATTRIBUTE'
export const IMPORT_PRICE = 'IMPORT_PRICE'

export const TAB_CREATEPRODUCT = [
  { id: GENERALINFORM, label: 'General Inform' },
  { id: VARIANT_ATTRIBUTE, label: 'Variant & Attribute' },
];

export const CLASSLIST_COLORS = ['btn-warning', 'btn-danger', 'btn-success', 'btn-secondary', 'btn-primary', 'btn-outline-primary']

export const getRandomColorClass = (): string => {
  const randomIndex = Math.floor(Math.random() * CLASSLIST_COLORS.length);
  return CLASSLIST_COLORS[randomIndex];
};

const API_URL = import.meta.env.VITE_API_URL
export const ATTRIBUTE_API = `${API_URL}/api/option`
export const PRODUCT_API = `${API_URL}/api/product`
export const SUPPLIER_API = `${API_URL}/api/Supplier`
