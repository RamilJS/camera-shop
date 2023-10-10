import ReactModal from 'react-modal';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../../../hooks';
//import { getCameraInBasketModal } from '../../../store/basket-data/selectors';
import { getBasketSuccessModalStatus } from '../../../store/basket-data/selectors';
import { setSuccessModalOpen } from '../../../store/basket-data/basket-data';
//import { setCameraInBasketModal } from '../../../store/basket-data/basket-data';
import { getSelectedProduct } from '../../../store/cameras-data/selectors';
import { selectProduct } from '../../../store/cameras-data/cameras-data';
import CatalogAddItem from '../catalog-add-item/catalog-add-item';
import CatalogAddSucces from '../catalog-add-succes/catalog-add-succes';
import { AppRoute } from '../../../const';

function CatalogPopup(): JSX.Element {

  // const camera = useAppSelector(getCameraInBasketModal);
  const camera = useAppSelector(getSelectedProduct);
  const isSuccessModalOpen = useAppSelector(getBasketSuccessModalStatus);

  const [isModalOpen, setIsModalOpen] = useState(true);

  useEffect(() => {
    setIsModalOpen(!!camera);
  }, [camera]);

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const onModalClose = () => {
    dispatch(selectProduct(null));
    dispatch(setSuccessModalOpen(false));
  };
  const handleModalClose = () => onModalClose();

  const handleAddToBasketClick = () => {

    dispatch(setSuccessModalOpen(true));
  };

  const handleLinkToBasketClick = () => {
    onModalClose();
    navigate(AppRoute.Basket);
  };

  if (!camera) {
    return <div>{'We dont have product at this moment'}</div>;
  }

  return (
    <ReactModal
      isOpen={isModalOpen}
      //isOpen
      ariaHideApp={false}
      style={{content: {inset: 'unset'}}}
      bodyOpenClassName='scroll-lock'
      overlayClassName='custom-modal-overlay'
      onRequestClose={handleModalClose}
    >
      {isSuccessModalOpen
        ?
        <CatalogAddSucces handleModalClose={handleModalClose} handleLinkToBasketClick={handleLinkToBasketClick } />
        :
        <CatalogAddItem camera={camera} handleAddToBasketClick={handleAddToBasketClick} handleModalClose={handleModalClose} />}
    </ReactModal>
  );
}

export default CatalogPopup;
