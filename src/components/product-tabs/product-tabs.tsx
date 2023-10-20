import { useNavigate, useParams, generatePath } from 'react-router-dom';
import { useAppSelector } from '../../hooks';
import { getCameraProduct } from '../../store/cameras-data/selectors';
import DescriptionTab from './description-tab/description-tab';
import SpecificationsTab from './specifications-tab/specifications-tab';
import { AppRoute } from '../../const';

function ProductTabs(): JSX.Element {
  const navigate = useNavigate();
  const params = useParams();
  const camera = useAppSelector(getCameraProduct);
  const activeTab = params.tab;

  const handleSpecificatiosClick = () => {
    navigate(generatePath(AppRoute.Product, {
      id: String(camera.id),
      tab: AppRoute.SpecificationsTab
    }));
  };

  const handleDescriptionClick = () => {
    navigate(generatePath(AppRoute.Product, {
      id: String(camera.id),
      tab: AppRoute.DescriptionTab
    }));
  };

  return (
    <div className="tabs product__tabs" data-testid="product-tabs-test">
      <div className="tabs__controls product__tabs-controls">
        <button
          onClick={handleSpecificatiosClick}
          className={activeTab === AppRoute.SpecificationsTab ? 'tabs__control is-active' : 'tabs__control'}
          type="button"
        >
          Характеристики
        </button>
        <button
          onClick={handleDescriptionClick}
          className={activeTab === AppRoute.DescriptionTab ? 'tabs__control is-active' : 'tabs__control'}
          type="button"
        >
          Описание
        </button>
      </div>
      <div className="tabs__content">
        <SpecificationsTab camera={camera} isActive={activeTab === AppRoute.SpecificationsTab} />
        <DescriptionTab camera={camera} isActive={activeTab === AppRoute.DescriptionTab}/>
      </div>
    </div>
  );
}

export default ProductTabs;
