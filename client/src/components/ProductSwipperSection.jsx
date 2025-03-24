import React, { useState, useEffect, useRef, useLayoutEffect } from 'react';
import { useAxiosInstance } from '../../config/axiosInstance';
import { Link } from 'react-router-dom';


const ProductSwiper = () => {
    const [slidesPerView, setSlidesPerView] = useState(6);
    const [products, setProducts] = useState([])
    const [pageLoading, setPageLoading] = useState(true);

    const swiperRef = useRef(null);
    const axiosInstance = useAxiosInstance();

    useEffect(() => {
        const fetchProProducts = async () => {
            setPageLoading(true);
            const response = await axiosInstance.get(`/api/products/random-products?limit=${20}`)
            if (response.status === 200) {
                setProducts(response.data);
            }
            setPageLoading(false);
        }

        fetchProProducts();
    }, [])

    // Handle responsive breakpoints
    const updateSlidesPerView = () => {
        if (window.innerWidth < 1024) {
            setSlidesPerView(3);
        } else {
            setSlidesPerView(6);
        }
    };

    // Update slides per view when the window is resized
    useEffect(() => {
        updateSlidesPerView();
        window.addEventListener('resize', updateSlidesPerView);
        return () => window.removeEventListener('resize', updateSlidesPerView);
    }, []);

    const scrollRight = () => {
        // const swiperContainer = swiperRef.current;

        if (slidesPerView > 6) {
            document.querySelector('.overflow-x-auto').scrollLeft += 1000
        } else if (slidesPerView > 5) {
            document.querySelector('.overflow-x-auto').scrollLeft += 800
        } else if (slidesPerView > 4) {
            document.querySelector('.overflow-x-auto').scrollLeft += 400
        } else {
            document.querySelector('.overflow-x-auto').scrollLeft += 400
        }

        // if (swiperContainer.scrollLeft >= swiperContainer.scrollWidth - swiperContainer.offsetWidth) {
        //     setShowRightButton(false)
        // }

    }
    const scrollLeft = () => {
        //const swiperContainer = swiperRef.current;

        if (slidesPerView > 6) {
            document.querySelector('.overflow-x-auto').scrollLeft -= 1000
        } else if (slidesPerView > 5) {
            document.querySelector('.overflow-x-auto').scrollLeft -= 800
        } else if (slidesPerView > 4) {
            document.querySelector('.overflow-x-auto').scrollLeft -= 400
        } else {
            document.querySelector('.overflow-x-auto').scrollLeft -= 300
        }

        // if (swiperContainer.scrollLeft === 0) {
        //     setShowLeftButton(false)
        // }
    }

    useLayoutEffect(() => {
        //const swiperContainer = swiperRef.current;
        let scrollInterval;

        const autoSlide = () => {
            //console.log("Sweipper containter: ", swiperRef?.current)
            if (swiperRef?.current) {
                swiperRef.current.scrollLeft += swiperRef.current.offsetWidth / slidesPerView + 150;

                if (swiperRef.current.scrollLeft >= swiperRef.current.scrollWidth - swiperRef.current.offsetWidth) {
                    swiperRef.current.scrollLeft = 0;
                }
            }
        };

        scrollInterval = setInterval(autoSlide, 3000);

        return () => clearInterval(scrollInterval);
    }, [slidesPerView]);


    return (
        <div className="relative my-4">
            {/* <h2 className="text-3xl font-bold text-blue-700 mb-6">
                Buyers' choice
            </h2> */}
            {/* Product container with horizontal scroll */}
            {pageLoading ? <div className="w-full flex gap-2 px-2">
                <div className="w-4 h-4 rounded-full animate-pulse bg-blue-600"></div>
                <div className="w-4 h-4 rounded-full animate-pulse bg-blue-600"></div>
                <div className="w-4 h-4 rounded-full animate-pulse bg-blue-600"></div>
            </div> : <div>
                <div ref={swiperRef} className="flex overflow-x-auto pb-0 sm:pb-2 scroll-smooth scrollbar-hide">
                    {products.map((product) => (
                        <Link
                            key={product._id}
                            to={`/product/${product._id}`}
                            className="flex-none w-1/4 sm:w-1/4 md:w-1/5 lg:w-1/5 xl:w-1/6 2xl:w-1/6 px-0.5 sm:px-2 py-2 transform transition-all duration-300 ease-in-out hover:scale-105"
                        >
                            {/* Product Card */}
                            <div className="bg-white rounded-lg shadow-lg overflow-hidden h-full">
                                {/* Image */}
                                <div className="relative">
                                    <img
                                        src={product.imageUrls[0]}
                                        alt={product.name}
                                        className="w-full h-24 sm:h-56 object-cover"
                                    />
                                    {/* Price Overlay */}
                                    <div className="absolute bottom-1 sm:bottom-2 left-1 sm:left-2 bg-blue-800 bg-opacity-85 text-white text-xs font-semibold py-1 px-2 rounded uppercase">
                                        ₵{product.price}
                                    </div>
                                </div>

                                {/* Product Name */}
                                {/* <div className="py-4 px-1 flex-grow">
                                    <h3 className="text-sm text-gray-800 line-clamp-2 lowercase first-letter:uppercase">{product.name}</h3>
                                </div> */}
                            </div>
                        </Link>
                    ))}
                </div>



                {/* Optional navigation buttons (for user experience) */}
                <div className="flex justify-between mt-4">
                    <button
                        className="px-4 py-2 bg-gray-800 opacity-85 text-white rounded-full absolute top-1/2 left-2 sm:left-4 transform -translate-y-1/2"
                        onClick={scrollLeft}
                    >
                        &#10094;
                    </button>
                    <button
                        className="px-4 py-2 bg-gray-800 opacity-85 text-white rounded-full absolute top-1/2 right-2 sm:right-4 transform -translate-y-1/2"
                        onClick={scrollRight}
                    >
                        &#10095;
                    </button>
                </div>
            </div>}
        </div>
    );
};

export default ProductSwiper;
