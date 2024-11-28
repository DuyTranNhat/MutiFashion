import React from 'react';
import { BASE_URL } from '../../Utils/constant';

type Props = {
    images: VariantImageGet[]; // Mảng hình ảnh từ VariantImageGet
    handleSelect: (idVar: number) => void; 
};

type VariantImageGet = {
    imageId: number;
    variantId: number;
    imageUrl: string;
};

const SliderImageVar = ({ images, handleSelect }: Props) => {
    // Chia mảng images thành các nhóm 4 phần tử
    const groupedImages = images.reduce<VariantImageGet[][]>((groups, image, index) => {
        const groupIndex = Math.floor(index / 4);
        if (!groups[groupIndex]) groups[groupIndex] = []; // Khởi tạo nhóm mới nếu chưa có
        groups[groupIndex].push(image); // Thêm hình ảnh vào nhóm
        return groups;
    }, []);

    return (
        <div className="py-2 bg-white">
            <div className="col-lg-12">
                <div id="product-carousel" className="carousel slide" data-ride="carousel">
                    <div className="carousel-inner bg-light">
                        {/* Render từng nhóm hình ảnh */}
                        {groupedImages.map((group, groupIndex) => (
                            <div
                                key={groupIndex}
                                className={`carousel-item ${groupIndex === 0 ? 'active' : ''}`} // Chỉ nhóm đầu tiên là 'active'
                            >
                                <div className="row">
                                    {/* Render từng hình ảnh trong nhóm */}
                                    {group.map((image, imageIndex) => (
                                        <div
                                            key={imageIndex}
                                            className="col-3 border p-2"
                                            onClick={() => handleSelect(image.variantId)} 
                                        >
                                            <img
                                                className="w-100 h-100"
                                                src={`${BASE_URL}/${image.imageUrl}`} 
                                                alt={`Image ${imageIndex}`} 
                                            />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                    {/* Các nút điều khiển chuyển slide */}
                    <a className="carousel-control-prev" href="#product-carousel" data-slide="prev">
                        <i className="fa fa-2x fa-angle-left text-dark"></i>
                    </a>
                    <a className="carousel-control-next" href="#product-carousel" data-slide="next">
                        <i className="fa fa-2x fa-angle-right text-dark"></i>
                    </a>
                </div>
            </div>
        </div>
    );
};

export default SliderImageVar;
