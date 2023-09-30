import { Route, Routes, BrowserRouter } from 'react-router-dom';

import Product from '../../pages/product/product';
import Basket from '../../pages/basket/basket';
import Catalog from '../../pages/catalog/catalog';
import NotFoundPage from '../../pages/not-found-page/not-found-page';

import { AppRoute } from '../../const';

function App(): JSX.Element {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path={AppRoute.Main}
          element={<Catalog />}
        />
        <Route
          path={AppRoute.Product}
          element={<Product />}
        />
        <Route
          path={AppRoute.Basket}
          element={<Basket />}
        />
        <Route
          path="*"
          element={<NotFoundPage />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;