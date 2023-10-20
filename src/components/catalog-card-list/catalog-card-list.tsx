import CatalogCard from '../catalog-card/catalog-card';
import { Camera } from '../../types/camera';
import { useAppSelector } from '../../hooks';
import { getCamerasStatus } from '../../store/cameras-data/selectors';
import Loader from '../loader/loader';
import { Status } from '../../const';

type CatalogCardListProps = {
  cameras: Camera[];
}

function CatalogCardList({cameras}: CatalogCardListProps): JSX.Element {
  const isDataLoading = useAppSelector(getCamerasStatus);

  if (isDataLoading === Status.Pending) {
    return <Loader />;
  }
  if(!cameras.length) {
    return <p style={{textAlign: 'center', fontSize: 26}}>Камеры не найдены</p>;
  }

  return (
    <div className="cards catalog__cards" data-testid="camera-cards-test">
      {
        cameras.map((camera) => (
          <CatalogCard
            key={camera.id}
            camera={camera}
            productClassName={''}
          />
        ))
      }
    </div>
  );
}

export default CatalogCardList;
