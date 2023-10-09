//import { useNavigate } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../../../hooks';
import { getSelectedProduct, getCartSuccessModalStatus } from '../../../store/product-data/selectors';
import { selectProduct, setSuccessModalOpen } from '../../../store/product-data/product-data';
import CatalogAddItem from '../catalog-add-item/catalog-add-item';
import CatalogAddSucces from '../catalog-add-succes/catalog-add-succes';
//import { AppRoute } from '../../../const';
import ReactModal from 'react-modal';

function CatalogPopup(): JSX.Element {
  const camera = useAppSelector(getSelectedProduct);
  const isSuccessModalOpen = useAppSelector(getCartSuccessModalStatus);

  //const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const onModalClose = () => {
    dispatch(selectProduct(null));
    dispatch(setSuccessModalOpen(false));
  };
  const handleModalClose = () => onModalClose();

  const handleAddToCartClick = () => {

    dispatch(setSuccessModalOpen(true));
  };

  /*const handleLinkToCartClick = () => {
    onModalClose();
    navigate(AppRoute.Main);
  };*/

  if (!camera) {
    return <div></div>;
  }

  return (
    <ReactModal
      isOpen
      ariaHideApp={false}
      style={{content: {inset: 'unset'}}}
      bodyOpenClassName='scroll-lock'
      overlayClassName='custom-modal-overlay'
      onRequestClose={handleModalClose}
    >
      {isSuccessModalOpen
        ?
        <CatalogAddSucces />
        :
        <CatalogAddItem camera={camera} handleAddToCartClick={handleAddToCartClick} handleModalClose={handleModalClose} />}
    </ReactModal>

  );
}

export default CatalogPopup;
