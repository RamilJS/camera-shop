import CatalogCard from '../catalog-card/catalog-card';
import { Camera } from '../../types/camera';
import { useAppSelector } from '../../hooks';
import { getStatus } from '../../store/cameras-data/selectors';
import Loader from '../loader/loader';
import { Status } from '../../const';

type CatalogCardListProps = {
  cameras: Camera[];
}

function CatalogCardList({cameras}: CatalogCardListProps): JSX.Element {
  const isDataLoading = useAppSelector(getStatus);

  if (isDataLoading === Status.Pending) {
    return <Loader />;
  }
  if(!cameras.length) {
    return <p style={{textAlign: 'center', fontSize: 24}}>Квесты не найдены</p>;
  }

  return (
    <div className="cards catalog__cards">
      {
        cameras.map((camera) => (
          <CatalogCard
            key={camera.id}
            camera={camera}
            isActive={false}
          />
        ))
      }
    </div>
  );
}

export default CatalogCardList;
