
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import { Pagination, A11y } from 'swiper/modules';
import { useAppSelector } from '../../hooks';
import CatalogCard from '../catalog-card/catalog-card';
import Loader from '../loader/loader';
import { getSimilarCameras, getSimilarCamerasStatus } from '../../store/cameras-data/selectors';
import styles from './similar-product.module.css';

function SimilarProduct(): JSX.Element {
  const similarCameras = useAppSelector(getSimilarCameras);

  const isSimilarCamerasLoading = useAppSelector(getSimilarCamerasStatus);

  if (isSimilarCamerasLoading) {
    return <Loader/>;
  }

  return (
    <section className="product-similar">
      <div className="container">
        <h2 className="title title--h3">Похожие товары</h2>
        <div className="product-similar__slider">
          <Swiper
            className='product-similar__slider-list'
            slidesPerView={3}
            slidesPerGroup={3}
            spaceBetween={32}
            modules={[Navigation, A11y, Pagination]}
            navigation={{
              prevEl: '.slider-controls--prev',
              nextEl: '.slider-controls--next'
            }}
          >
            {similarCameras.map((camera) => (
              <SwiperSlide key={`${camera.id}similars`} >
                <CatalogCard camera={camera} productClassName={similarCameras.includes(camera) ? 'is-active' : ''}/>
              </SwiperSlide>
            ))}
          </Swiper>
          <button
            className={`${styles['button-prev']} slider-controls--prev`}
            type="button"
            aria-label="Предыдущий слайд"
          >
            <svg width={7} height={12} aria-hidden="true">
              <use xlinkHref="#icon-arrow" />
            </svg>
          </button>
          <button
            className={`${styles['button-next']} slider-controls--next`}
            type="button"
            aria-label="Следующий слайд"
          >
            <svg width={7} height={12} aria-hidden="true">
              <use xlinkHref="#icon-arrow" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
}
export default SimilarProduct;
