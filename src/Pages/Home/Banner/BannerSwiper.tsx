import  { useRef } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

import './swiperStyle.css';
 
// import required modules
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import { Typewriter } from 'react-simple-typewriter';

const BannerSwiper = () => {
    const progressCircle = useRef<SVGSVGElement>(null);
    const progressContent = useRef<HTMLDivElement>(null);
    const onAutoplayTimeLeft = (_s: any, time: any, progress: any) => { 
        if (progressCircle.current) {
            progressCircle.current.style.setProperty('--progress', `${1 - progress}`);
        }
        if (progressContent.current) {
            progressContent.current.textContent = `${Math.ceil(time / 1000)}s`;
        }
        // console.log(s)
    };
    return (
        <div className='z-[-1] container mx-auto'>
            <Swiper
                spaceBetween={30}
                centeredSlides={true}
                autoplay={{
                    delay: 6000,
                    disableOnInteraction: false,
                }}
                pagination={{
                    clickable: true,
                }}
                navigation={true}
                modules={[Autoplay, Pagination, Navigation]}
                onAutoplayTimeLeft={onAutoplayTimeLeft}
                className="mySwiper"
            >
                <SwiperSlide>
                    <article className='relative'>
                        <figure className='h-full w-full md:h-[500px] lg:h-[600px] xl:h-full'>
                            <img className='h-full w-full brightness-50 ' src="/images/banner4.jpg" alt="" />
                        </figure>
                        <div className='absolute top-[20%] md:top-[20%] lg:top-[25%] xl:top-[35%] w-full lg:left-10 space-y-3 '>
                            <h1 className='font-semibold text-xl md:text-5xl '>
                                Where Every Game<br className='hidden md:block  lg:hidden' /> Tells {' '}
                                <span style={{ color: 'red', fontWeight: 'bold' }}>
                                    {/* Style will be inherited from the parent element */}
                                    <Typewriter
                                        words={['a Story', 'a Journey', 'an Adventure', '']}
                                        loop={100}
                                        cursor
                                        cursorStyle='_'
                                        typeSpeed={70}
                                        deleteSpeed={50}
                                        delaySpeed={1000}
                                    />
                                </span>
                            </h1>
                            <p className=''>Explore diverse gaming worlds, from mystical forests to futuristic cities<span className='hidden md:block'>and experience the thrill of top-rated games reviewed by passionate gamers</span> .</p>
                        </div>
                    </article>
                </SwiperSlide>

                {/* second slider */}

                <SwiperSlide>
                    <article className='relative'>
                        <figure className='h-full w-full'>
                            <img className='h-full w-full brightness-50' src="/images/banner5.jpg" alt="" />
                        </figure>
                        <div className='absolute w-full top-[30%]  lg:top-[39%]  lg:left-10 space-y-3 '>
                            <h1 className='font-semibold text-xl md:text-5xl '>
                                Experience Gaming <br className='hidden md:block  lg:hidden'/> like {' '}
                                <span style={{ color: 'red', fontWeight: 'bold' }}>
                                    {/* Style will be inherited from the parent element */}
                                    <Typewriter
                                        words={['never before', 'Madly', 'Adventurous', '']}
                                        loop={100}
                                        cursor
                                        cursorStyle='_'
                                        typeSpeed={70}
                                        deleteSpeed={50}
                                        delaySpeed={1000}
                                    />
                                </span>
                            </h1>
                            <p className=''>Explore diverse gaming worlds, from mystical forests to futuristic cities
                                <span className='hidden md:block'>and experience the thrill of top-rated games reviewed by passionate gamers</span> .</p>
                        </div>
                    </article>
                </SwiperSlide>
                <SwiperSlide>
                    <article className='relative'>
                        <figure className='h-full w-full'>
                            <img className='h-full w-full brightness-50' src="/images/banner6.jpg" alt="" />
                        </figure>
                        <div className='absolute w-full top-[30%] lg:top-[35%] xl:top-[40%] lg:left-10 space-y-3 '>
                            <h1 className='font-semibold text-xl md:text-5xl'>
                                The Art of Gaming is {' '}
                                <span style={{ color: 'red', fontWeight: 'bold' }}>
                                    {/* Style will be inherited from the parent element */}
                                    <Typewriter
                                        words={['Redefined', 'a Journey', 'an Adventure', '']}
                                        loop={100}
                                        cursor
                                        cursorStyle='_'
                                        typeSpeed={70}
                                        deleteSpeed={50}
                                        delaySpeed={1000}
                                    />
                                </span>
                            </h1>
                            <p className=''>From stunning visuals to immersive gameplay,  <span className='hidden md:block'>and experience the thrill of top-rated games reviewed by passionate gamers</span> </p>
                        </div>
                    </article>
                </SwiperSlide>
                <div className="autoplay-progress" slot="container-end">
                    <svg viewBox="0 0 48 48" ref={progressCircle}>
                        <circle cx="24" cy="24" r="20"></circle>
                    </svg>
                    <span ref={progressContent}></span>
                </div>
            </Swiper>
        </div>
    );
}
export default BannerSwiper
