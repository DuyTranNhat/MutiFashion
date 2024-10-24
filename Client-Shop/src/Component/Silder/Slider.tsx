import React, { useEffect, useState } from 'react';
import { sliderGetAPI } from '../../Service/BannerService';
import { SliderGet } from '../../Model/Banner';
import { BASE_URL } from '../../Utils/constant';

const Slider = () => {
    const [sliders, setSliders] = useState<SliderGet[]>([]);
    const [sliderActive, setSliderActive] = useState<number | undefined>(undefined);

    useEffect(() => {
        sliderGetAPI().then(res => {
            if (res?.data) {
                const sliders = res?.data.items;
                setSliders(sliders);
                setSliderActive(sliders[0].slideId); 
            }
        });
    }, []);

    //handle images slider
    useEffect(() => {
        if (sliders.length > 0 && sliderActive !== undefined) {
            const interval = setInterval(() => {
                const currentIndex = sliders.findIndex(slider => slider.slideId === sliderActive);
                const nextIndex = (currentIndex + 1) % sliders.length;
                setSliderActive(sliders[nextIndex].slideId);
            }, 4000);
            return () => clearInterval(interval);
        }
    }, [sliders, sliderActive]);

    const handleActiveBanner = (id: number) => setSliderActive(id);

    return (
        <>
            {sliders.length > 0 ? (
                <div className="container-fluid mb-3">
                    <div className="row px-xl-5">
                        <div className="col-lg-8">
                            <div id="header-carousel" className="carousel slide carousel-fade mb-30 mb-lg-0" data-ride="carousel">
                                <ol className="carousel-indicators">
                                    {sliders.map((slider, index) => (
                                        <li
                                            key={slider.slideId}
                                            className={`${sliderActive === slider.slideId ? 'active' : ''}`}
                                            data-target="#header-carousel"
                                            data-slide-to={index}
                                            onClick={() => handleActiveBanner(slider.slideId)}
                                        ></li>
                                    ))}
                                </ol>
                                <div className="carousel-inner">
                                    {sliders.map(slider => (
                                        <div
                                            key={slider.slideId}
                                            className={`${sliderActive === slider.slideId ? 'active' : ''} carousel-item position-relative`}
                                            style={{ height: '430px' }}
                                        >
                                            <img
                                                className="position-absolute w-100 h-100"
                                                src={`${BASE_URL}/${slider.imageUrl}`}
                                                style={{ objectFit: 'cover' }}
                                                alt={slider.title}
                                            />
                                            <div className="carousel-caption d-flex flex-column align-items-center justify-content-center">
                                                <div className="p-3" style={{ maxWidth: '700px' }}>
                                                    <h1 className="display-4 text-white mb-3 animate__animated animate__fadeInDown">
                                                        {slider.title}
                                                    </h1>
                                                    <p className="mx-md-5 px-5 animate__animated animate__bounceIn">
                                                        {slider.description}
                                                    </p>
                                                    <a className="btn btn-outline-light py-2 px-4 mt-3 animate__animated animate__fadeInUp" href={slider.link}>
                                                        Shop Now
                                                    </a>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4">
                            <div className="product-offer mb-30" style={{ height: "200px" }}>
                                <img className="img-fluid" src="/img/offer-1.jpg" alt="" />
                                <div className="offer-text">
                                    <h6 className="text-white text-uppercase">New Fashion</h6>
                                    <h3 className="text-white mb-3">Special Offer</h3>
                                    <a href="http://127.0.0.1:5501/img/offer-1.jpg" className="btn btn-primary">Shop Now</a>
                                </div>
                            </div>
                            <div className="product-offer mb-30" style={{ height: "200px" }}>
                                <img className="img-fluid" src="/img/offer-2.jpg" alt="" />
                                <div className="offer-text">
                                    <h6 className="text-white text-uppercase">New Fashion</h6>
                                    <h3 className="text-white mb-3">Special Offer</h3>
                                    <a href="" className="btn btn-primary">Shop Now</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <h1>Loading...</h1>
            )}
        </>
    );
};

export default Slider;
