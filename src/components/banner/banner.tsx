
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Link } from 'react-router-dom';
import { useAppSelector } from '../../hooks';
import { getPromoStatus } from '../../store/cameras-data/selectors';
import Loader from '../loader/loader';
import { Promo } from '../../types/promo';
import { AppRoute, Status, TIMEOUT_SWIPER } from '../../const';
import'./banner.css';

type PromoProps = {
  promoCamera: Promo[] | null;
}

function Banner({promoCamera}: PromoProps): JSX.Element {

  const isLoading = useAppSelector(getPromoStatus);

  if (isLoading === Status.Pending || !promoCamera) {
    return <Loader />;
  }

  const pagination = {
    clickable: true,
  };

  return (
    <Swiper
      autoplay={{
        delay: TIMEOUT_SWIPER,
        disableOnInteraction: false,
      }}
      pagination = {pagination}
      modules={[Autoplay, Pagination, Navigation]}
      loop
    >
      {promoCamera.map((elem) => (
        <SwiperSlide key={`${elem.id}banner`}>
          <div

            className="banner"
          >
            <picture>
              <source
                type="image/webp"
                srcSet={`${elem.previewImgWebp} , ${elem.previewImgWebp2x} 2x`}
              />
              <img
                src={elem.previewImg}
                srcSet={`${elem.previewImg2x} 2x`}
                width={1280}
                height={280}
                alt="баннер"
              />
            </picture>
            <p className="banner__info">
              <span className="banner__message"></span>
              <span className="title title--h1">
                {elem.name}
              </span>
              <span className="banner__text">
          Профессиональная камера от&nbsp;известного производителя
              </span>
              <Link className="btn" to={`${AppRoute.Main}${elem.id}`}>
          Подробнее
              </Link>
            </p>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}

export default Banner;
