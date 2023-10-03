import { Link } from 'react-router-dom';
import { useAppSelector } from '../../hooks';
import { Status} from '../../const';
import { Promo } from '../../types/promo';
import { getPromoStatus } from '../../store/cameras-data/selectors';
import Loader from '../loader/loader';

type PromoProps = {
  promoCamera: Promo | null;
}

function Banner({promoCamera}: PromoProps): JSX.Element {

  const isLoading = useAppSelector(getPromoStatus);

  if (isLoading === Status.Pending || !promoCamera) {
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
          //to={generatePath(AppRoute.Product, {id: String(promoCamera.id), tab: AppRoute.ProductDescriptionTabx})}
          to={'#'}
        >
          Подробнее
        </Link>
      </p>
    </div>
  );
}

export default Banner;
