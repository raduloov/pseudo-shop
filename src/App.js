import { useCallback, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { uiActions } from './store/ui-slice';
import { cartActions } from './store/cart-slice';
import Spinner from './components/UI/Spinner';
import Navbar from './components/Navbar';
import MainContainer from './components/MainContainer';
import ItemsContainer from './components/ItemsContainer';
import Cart from './components/Cart/Cart';
import Modal from './components/UI/Modal';
import CheckoutForm from './components/Cart/CheckoutForm';
import OrderSuccess from './components/Cart/OrderSuccess';

function App() {
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const showCart = useSelector(state => state.ui.cartIsVisible);
  const showOrderSuccess = useSelector(state => state.ui.orderSuccessIsVisible);
  const showCheckout = useSelector(state => state.ui.checkoutIsVisible);

  const dispatch = useDispatch();

  const getAllProducts = async (url = 'https://fakestoreapi.com/products') => {
    setError(null);

    try {
      const res = await fetch(url);

      if (!res.ok) {
        setError(error.message);
        throw new Error('Could not get products. :(');
      }

      const data = await res.json();
      return data;
    } catch (error) {
      setError(error.message);
    }
  };

  const setData = useCallback(async url => {
    setIsLoading(true);

    const data = await getAllProducts(url);

    const loadedItems = [];

    data.forEach(item => {
      loadedItems.push({
        title: item.title,
        image: item.image,
        price: item.price,
        rating: item.rating,
        category: item.category,
        descriprion: item.descriprion,
        id: item.id,
      });
    });

    setItems(loadedItems);
    setIsLoading(false);
  }, []);

  useEffect(() => {
    setData();
  }, [setData]);

  useEffect(() => {
    const items = Object.keys(localStorage);
    dispatch(cartActions.fillCartFromLocalStorage(items));
  }, [dispatch]);

  const chooseCategoryHandler = category => {
    if (category === '') {
      setData();
    } else {
      setData(`https://fakestoreapi.com/products/category/${category}`);
    }
  };

  const sortHandler = method => {
    const currentItems = [...items];
    let sortedItems = [];

    switch (method) {
      case 'price-asc':
        sortedItems = currentItems.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        sortedItems = currentItems.sort((a, b) => b.price - a.price);
        break;
      case 'name-asc':
        sortedItems = currentItems.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case 'name-desc':
        sortedItems = currentItems.sort((a, b) => b.title.localeCompare(a.title));
        break;
    }

    setItems(sortedItems);
  };

  const searchHandler = async searchTerm => {
    setIsLoading(true);

    const data = await getAllProducts();

    const filteredItems = data.filter(item => {
      if (searchTerm === '') {
        return item;
      } else if (item.title.toLowerCase().includes(searchTerm.toLowerCase())) {
        return item;
      }
    });

    setIsLoading(false);
    setItems(filteredItems);
  };

  const toggleCartHandler = () => {
    dispatch(uiActions.toggleCart());
  };

  const orderSuccessHandler = () => {
    dispatch(uiActions.toggleOrderSuccess());

    if (showOrderSuccess) {
      dispatch(uiActions.toggleCart());
    }
  };

  const checkoutHandler = action => {
    if (action === 'confirm') {
      dispatch(uiActions.toggleCheckout());
      dispatch(uiActions.toggleOrderSuccess());
    }
    if (action === 'cancel') {
      dispatch(uiActions.toggleCheckout());
    }
  };

  let content = (
    <div className="flex justify-center h-[50vh]">
      <p className="mt-32 text-white text-2xl">
        No items available at this moment :(
      </p>
    </div>
  );

  if (items.length > 0) {
    content = <ItemsContainer items={items} />;
  }

  if (items.length === 0) {
    content = (
      <div className="flex justify-center h-[50vh]">
        <p className="p-10 mt-32 text-white text-center text-2xl">
          No items match your search criteria :(
        </p>
      </div>
    );
  }

  if (error) {
    console.log(error.message);
    content = <p>{error}</p>;
  }

  if (isLoading) {
    content = <Spinner />;
  }

  return (
    <div>
      {showOrderSuccess && (
        <Modal>
          <OrderSuccess onClose={orderSuccessHandler} />
        </Modal>
      )}
      {showCheckout && (
        <Modal>
          <CheckoutForm
            onClose={() => checkoutHandler('cancel')}
            onConfirm={() => checkoutHandler('confirm')}
          />
        </Modal>
      )}
      {showCart && <Cart onClose={toggleCartHandler} />}
      <Navbar onSearch={searchHandler} onShowCart={toggleCartHandler} />
      <MainContainer onChooseCategory={chooseCategoryHandler} onSort={sortHandler}>
        {content}
      </MainContainer>
    </div>
  );
}

export default App;
