import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import VariantImagePreview from './VariantImagePreview/VariantImagePreview';
import { ProductVariantGet } from '../../Model/Product';
import { ProductVariantsGetAPI } from '../../Service/ProductService';
import { VariantGet } from '../../Model/Variant';
import { useAuth } from '../../Context/UseAuth';
import { addCartAPI } from '../../Service/CartService';
import { CartPost } from '../../Model/Cart';
import SliderImageVar from './SliderImageVar';
import DefaultUser from '/img/DefaultUser.png'

type AttributeSelected = {
    idValue: number,
    idAttr: number,
};

const VariantDetails = () => {
    const [quantity, setQuantity] = useState<number>(1);
    const [productVariants, setProductVariants] = useState<ProductVariantGet | null>(null);
    const [inavailableError, setInavailableError] = useState<boolean>(false);
    const [selectedValues, setSelectedValues] = useState<AttributeSelected[]>([]);
    const [variantSelected, setVariantSelected] = useState<VariantGet | undefined>();
    const { idProduct } = useParams<{ idProduct: string }>();
    const { user, isLoggedIn } = useAuth();
    const navigate = useNavigate();

    const getAllImages = () => {
        return productVariants?.variants.flatMap(variant =>
            variant.images.map(image => ({
                imageId: image.imageId,
                variantId: variant.variantId,
                imageUrl: image.imageUrl,
            }))
        ) || [];
    };

    useEffect(() => {
        if (idProduct) {
            ProductVariantsGetAPI(Number(idProduct))
                .then(res => {
                    if (res?.data) {
                        const productVariants: ProductVariantGet = res?.data;
                        const defaultSelectVar = productVariants.variants[0];
                        setProductVariants(productVariants);
                        setVariantSelected(defaultSelectVar);
                        setSelectedValues(prev => {
                            const selectedValuesDefault = defaultSelectVar.variantValues.map(value =>
                                ({ idAttr: value.attributeID, idValue: value.valueId })
                            );
                            return [...prev, ...selectedValuesDefault];
                        });
                    }
                });
        }
    }, [idProduct]);

    // Optimized `handleSelectVarByImg`
    const handleSelectVarByImg = (idVar: number) => {
        // Tìm biến thể tương ứng với idVar
        const selectedVar = productVariants?.variants.find(variant => variant.variantId === idVar);

        if (selectedVar) {
            // Cập nhật lại giá trị được chọn
            setVariantSelected(selectedVar);

            // Cập nhật lại selectedValues từ variantValues của biến thể
            const updatedSelectedValues = selectedVar.variantValues.map(value => ({
                idAttr: value.attributeID,
                idValue: value.valueId
            }));

            setSelectedValues(updatedSelectedValues);
        }
    };


    useEffect(() => {
        if (productVariants) {
            const variantSelected = productVariants.variants.find(v =>
                selectedValues.every(sv => v.variantValues.some(vvalue => vvalue.valueId === sv.idValue))
            );
            setVariantSelected(variantSelected);
        }
    }, [selectedValues, productVariants]);

    const handleValueChange = (attributeId: number, idValue: number) => {
        setSelectedValues(prevSelectedValues => {
            const value = prevSelectedValues.some(item => item.idAttr === attributeId)
                ? prevSelectedValues.map(item =>
                    item.idAttr === attributeId ? { idAttr: attributeId, idValue } : item
                )
                : [...prevSelectedValues, { idAttr: attributeId, idValue }];
            return value;
        });
    };

    const handleQuantityChange = (delta: number) => {
        setQuantity(prevQuantity => {
            const newQuantity = prevQuantity + delta;
            if (newQuantity < 1) return 1;
            if (variantSelected && newQuantity > variantSelected.quantity) {
                toast.error('Exceeds available stock');
                return variantSelected.quantity;
            }
            return newQuantity;
        });
    };

    const handleAddToCart = () => {
        if (variantSelected && quantity <= variantSelected.quantity && !inavailableError) {
            if (isLoggedIn()) {
                const cartPost: CartPost = {
                    customerId: user?.customerId!,
                    variantId: variantSelected.variantId,
                    quantity: quantity
                };
                addCartAPI(cartPost)
                    .then(res => {
                        if (res?.status === 200)
                            toast.success(`Add ${quantity} items!`);
                    }).catch(error => toast.error(error));
            } else {
                navigate("/login");
            }
        } else {
            toast.error('Invalid quantity!');
        }
    };
    return (
        productVariants && variantSelected && selectedValues ? (
            <>
                <div className="container-fluid pb-5">
                    <div className="row px-xl-5">
                        <div className="col-lg-5 mb-30">
                            <VariantImagePreview
                                variantSelected={variantSelected}
                                defaultImage={productVariants.imageUrl}
                                VariantList={productVariants?.variants!}
                            />

                            {/*Image Variant Slider Start*/}
                            <SliderImageVar handleSelect={handleSelectVarByImg} images={getAllImages()} />
                            {/*Image Variant Slider End*/}
                        </div>

                        <div className="col-lg-7 h-auto mb-30">
                            <div className="h-100 bg-light p-30">
                                <h3>{productVariants?.name}</h3>
                                <h3 className="font-weight-semi-bold mb-4">
                                    {variantSelected.salePrice?.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}
                                </h3>
                                {productVariants.attributes.map(attribute => {
                                    const valuesFilter = productVariants.variants.flatMap(v => v.variantValues.flatMap(vl => vl.value));
                                    return <div className="d-flex mb-3" key={attribute.attributeID}>
                                        <strong className="text-dark mr-3">{attribute.attributeName}:</strong>
                                        {attribute.values.map(value => {
                                            return (valuesFilter.some(vf => vf === value.value)) &&
                                                <div key={value.valueId} className="custom-control custom-radio custom-control-inline">
                                                    <input type="radio"
                                                        className="custom-control-input"
                                                        checked={selectedValues.some((item: AttributeSelected) =>
                                                            item.idValue === value.valueId && item.idAttr === attribute.attributeID)}
                                                        onChange={() => handleValueChange(attribute.attributeID, value.valueId)}
                                                        id={value.valueId.toString()}
                                                        name={attribute.attributeID.toString()} />
                                                    <label className="custom-control-label" htmlFor={value.valueId.toString()}>{value.value}</label>
                                                </div>
                                        })}
                                    </div>
                                })}
                                <div className="d-flex align-items-center mb-4 pt-2">
                                    <div className="input-group quantity mr-3" style={{ width: "130px" }}>
                                        <div className="input-group-btn">
                                            <button className="btn btn-primary btn-minus" onClick={() => handleQuantityChange(-1)}>
                                                <i className="fa fa-minus"></i>
                                            </button>
                                        </div>
                                        <input type="text" className="form-control bg-secondary border-0 text-center" value={quantity} readOnly />
                                        <div className="input-group-btn">
                                            <button className="btn btn-primary btn-plus" onClick={() => handleQuantityChange(1)}>
                                                <i className="fa fa-plus"></i>
                                            </button>
                                        </div>
                                    </div>
                                    <button
                                        className="btn btn-primary px-3" onClick={handleAddToCart}
                                    >
                                        <i className="fa fa-shopping-cart mr-1"></i> Add To Cart
                                    </button>
                                </div>
                                <div className="d-flex mb-3">
                                    {inavailableError ?
                                        <strong className="text-danger mr-3">Quantity: 0</strong>
                                        : <strong className="text-dark mr-3">Quantity: {variantSelected.quantity} items available</strong>
                                    }
                                </div>

                                <div className="d-flex pt-2">
                                    {/*description info*/}
                                    <div className="row">
                                        <div className="col">
                                            <div className="bg-light ">
                                                <div className="nav nav-tabs mb-4">
                                                    <a className="nav-item nav-link text-dark active" data-toggle="tab" href="#tab-pane-1">Description</a>
                                                    <a className="nav-item nav-link text-dark" data-toggle="tab" href="#tab-pane-3">Reviews (0)</a>
                                                </div>
                                                <div className="tab-content">
                                                    {/*description info*/}
                                                    <div className="tab-pane fade show active" id="tab-pane-1">
                                                        <h4 className="mb-3">Product Description</h4>
                                                        <p>
                                                            {productVariants.description}
                                                        </p>
                                                    </div>

                                                    <div className="tab-pane fade" id="tab-pane-3">
                                                        <div className="row">
                                                            <div className="col-md-6">
                                                                <h4 className="mb-4">Leave a review</h4>
                                                                <small>Your email address will not be published. Required fields are marked *</small>
                                                                <form>
                                                                    <div className="form-group">
                                                                        <label htmlFor="message">Your Review *</label>
                                                                        <textarea id="message" cols={30} rows={5} className="form-control"></textarea>
                                                                    </div>
                                                                    <div className="form-group">
                                                                        <label htmlFor="name">Your Name *</label>
                                                                        <input type="text" className="form-control" id="name" />
                                                                    </div>
                                                                    <div className="form-group">
                                                                        <label htmlFor="email">Your Email *</label>
                                                                        <input type="email" className="form-control" id="email" />
                                                                    </div>
                                                                    <div className="form-group mb-0">
                                                                        <input type="submit" value="Leave Your Review" className="btn btn-primary px-3" />
                                                                    </div>
                                                                </form>
                                                            </div>
                                                            <div className="col-md-6">
                                                                <h4 className="mb-4">1 review for "Product Name"</h4>
                                                                <div className="media mb-4">
                                                                    <img src={DefaultUser} alt="Image" className="img-fluid mr-3 mt-1" style={{ "width": "45px" }} />
                                                                    <div className="media-body">
                                                                        <h6>John Doe<small> - <i>01 Jan 2045</i></small></h6>
                                                                        <div className="text-primary mb-2">
                                                                            <i className="fas fa-star"></i>
                                                                            <i className="fas fa-star"></i>
                                                                            <i className="fas fa-star"></i>
                                                                            <i className="fas fa-star-half-alt"></i>
                                                                            <i className="far fa-star"></i>
                                                                        </div>
                                                                        <p>Diam amet duo labore stet elitr ea clita ipsum, tempor labore accusam ipsum et no at. Kasd diam tempor rebum magna dolores sed sed eirmod ipsum.</p>
                                                                    </div>
                                                                </div>
                                                            </div>

                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </>
        ) : <>Loading</>
    );
};

export default VariantDetails;
