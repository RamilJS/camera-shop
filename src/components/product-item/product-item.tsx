
import { useAppSelector } from '../../hooks';
import Loader from '../loader/loader';
import Rating from '../rating/rating';
//import { setCameraInBasketModal } from '../../store/cameras-data/cameras-data';
import { getCameraProductStatus } from '../../store/cameras-data/selectors';
import { Camera } from '../../types/camera';
import { formatPrice } from '../../utils';
import ProductTabs from '../product-tabs/product-tabs';

type ProductItemProps = {
  camera: Camera;
}

function ProductItem({camera}: ProductItemProps): JSX.Element {
  const isCameraLoading = useAppSelector(getCameraProductStatus);

  if (isCameraLoading || !camera) {
    return <Loader />;
  }

  /*
  const handleBuyClick = () => {
    setCameraInBasketModal(camera);
  };*/

  return (
    <section className="product">
      <div className="container">
        <div className="product__img">
          <picture>
            <source
              type="image/webp"
              srcSet={`/${camera.previewImgWebp}, /${camera.previewImgWebp2x} 2x`}
            />
            <img
              src={`/${camera.previewImg}`}
              srcSet={`/${camera.previewImg2x}`}
              width={560}
              height={480}
              alt={camera.name}
            />
          </picture>
        </div>
        <div className="product__content">
          <h1 className="title title--h3">{camera.name}</h1>
          <Rating
            rating={camera.rating}
            id={camera.id}
            reviewCount={camera.reviewCount}
          />
          <p className="product__price">
            <span className="visually-hidden">Цена:</span>{formatPrice(camera.price)}
          </p>
          <button
            //onClick={handleBuyClick}
            className="btn btn--purple"
            type="button"
          >
            <svg width={24} height={16} aria-hidden="true">
              <use xlinkHref="#icon-add-basket" />
            </svg>
            Добавить в корзину
          </button>
          <ProductTabs/>
        </div>
      </div>
    </section>
  );
}

export default ProductItem;
