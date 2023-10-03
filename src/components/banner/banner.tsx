import { Link, generatePath } from 'react-router-dom';
import { useAppSelector } from '../../hooks';
import { getPromo, getPromoStatus } from '../../store/promo-data/promo-data.selectors';
import Loader from '../loader/loader';
import { AppRoute, Status } from '../../const';

function Banner(): JSX.Element {
  const promoCamera = useAppSelector(getPromo);
  //console.log(promoCamera);
  const isLoading = useAppSelector(getPromoStatus);

  if (isLoading === Status.Pending) {
    return <Loader />;
  }

  return (
    <div className="banner">
      <picture>
        <source
          type="image/webp"
          srcSet={`${promoCamera.previewImgWebp}, ${promoCamera.previewImg2x} 2x`}
        />
        <img
          src={promoCamera.previewImg}
          srcSet={`${promoCamera.previewImg2x} 2x`}
          width={1280}
          height={280}
          alt="баннер"
        />
      </picture>
      <p className="banner__info">
        <span className="banner__message">Новинка!</span>
        <span className="title title--h1">
          {promoCamera.name}
        </span>
        <span className="banner__text">
          Профессиональная камера от&nbsp;известного производителя
        </span>
        <Link
          className="btn"
          to={generatePath(AppRoute.Product, {id: String(promoCamera.id), tab: AppRoute.ProductDescriptionTabx})}
        >
          Подробнее
        </Link>
      </p>
    </div>
  );
}

export default Banner;
