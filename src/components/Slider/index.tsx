import React, { useState } from 'react'

import { Swiper, SwiperSlide } from 'swiper/react'
import { Thumbs } from 'swiper'

import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/thumbs'
import './Slider.scss'

interface SliderProps {
    productImages: string[]
}

const Slider: React.FC<SliderProps> = ({ productImages }) => {
    const [activeSlider, setActiveSlider] = useState(null)

    return (
        <>
            <p></p>
            <Swiper
                loop={true}
                spaceBetween={10}
                grabCursor={true}
                className='slider'
                modules={[Thumbs]}
                thumbs={{ swiper: activeSlider }}
            >
                {productImages &&
                    productImages.map((image, i) => (
                        <SwiperSlide key={i}>
                            <img src={image} alt='product images' />
                        </SwiperSlide>
                    ))}
            </Swiper>

            <Swiper
                //@ts-ignore
                onSwiper={setActiveSlider}
                spaceBetween={10}
                slidesPerView={4}
                className='slider__thumbnails'
                modules={[Thumbs]}
            >
                {productImages &&
                    productImages.map((image, i) => (
                        <SwiperSlide key={i}>
                            <div className='slider__thumbnails-wrapper'>
                                <img src={image} alt='product images' />
                            </div>
                        </SwiperSlide>
                    ))}
            </Swiper>
        </>
    )
}

export default Slider
