import { useCallback, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { uiActions } from './store/ui-slice';
import Header from './components/Header';
import MainContainer from './components/MainContainer';
import ItemsContainer from './components/ItemsContainer';
import { Spinner } from './components/UI/Spinner';
import CartContainer from './components/Cart/CartContainer';

function App() {
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const showCart = useSelector(state => state.ui.cartIsVisible);
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

  const setData = useCallback(async () => {
    setIsLoading(true);

    const data = await getAllProducts();

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

  const chooseCategoryHandler = category => {
    if (category === '') {
      setData();
    } else {
      setData(`https://fakestoreapi.com/products/category/${category}`);
    }
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
    dispatch(uiActions.toggle());
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
        <p className="mt-32 text-white text-2xl">
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
      {showCart && <CartContainer onClose={toggleCartHandler} />}
      <Header onSearch={searchHandler} onClick={toggleCartHandler} />
      <MainContainer onChooseCategory={chooseCategoryHandler}>
        {content}
      </MainContainer>
    </div>
  );
}

export default App;
