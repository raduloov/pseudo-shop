import { useDispatch } from 'react-redux';

import { cartActions } from '../../store/cart-slice';
import { ShoppingCartIcon } from '@heroicons/react/outline';
import { StarIcon } from '@heroicons/react/solid';
import Button from './Button';

const ItemCard = ({ data }) => {
  const dispatch = useDispatch();

  const addToCartHandler = () => {
    dispatch(
      cartActions.addItemToCart({
        title: data.title,
        image: data.image,
        price: data.price,
        id: data.id,
      })
    );
  };

  return (
    <div className="bg-[rgba(34,34,34,0.80)] text-white sm:w-44 w-64 rounded-xl overflow-hidden my-4 mx-2 flex flex-col justify-between shadow-lg hover:scale-[1.035] hover:shadow-xl hover:cursor-pointer transition-all">
      <div>
        <div className="flex justify-center items-center p-5 sm:h-32 md:h-48">
          <img src={data.image} alt="" className="max-w-full max-h-full" />
        </div>
        <p className="md:text-xl p-2">{data.title}</p>
      </div>
      <div>
        <div className="p-2">
          <div className="py-2 flex">
            {[...Array(Math.round(data.rating.rate))].map(star => (
              <StarIcon className="sm:h-5 md:h-6" key={Math.random().toString(36)} />
            ))}
            <p className="px-2">({data.rating.count})</p>
          </div>
          <p className="sm:text-xl md:text-2xl">${data.price}</p>
        </div>
        <div className="flex items-center justify-center p-2 text-black">
          <Button onClick={addToCartHandler}>
            <ShoppingCartIcon className="h-8 p-1" />
            Add To Cart
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ItemCard;
