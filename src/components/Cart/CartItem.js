import { useDispatch } from 'react-redux';

import { MinusIcon, PlusIcon } from '@heroicons/react/solid';
import { cartActions } from '../../store/cart-slice';

const CartItem = props => {
  const dispatch = useDispatch();

  const { title, image, quantity, total, price, id } = props.item;

  const addItemHandler = () => {
    dispatch(
      cartActions.addItemToCart({
        id,
        title,
        price,
      })
    );
  };

  const removeItemHandler = () => {
    dispatch(cartActions.removeItemFromCart(id));
  };

  return (
    <div className="flex bg-[rgba(115,115,115,0.7)] rounded-lg p-3 text-white my-1">
      <img src={image} alt="item" className="h-16 pr-2" />
      <div className="flex flex-col overflow-hidden w-full">
        <div className="flex justify-between w-full">
          <p className="text-ellipsis whitespace-nowrap overflow-hidden ">{title}</p>
          <p className="pl-3 text-xl">x{quantity}</p>
        </div>
        <div className="flex w-full justify-end">
          <p className="text-xl">${total.toFixed(2)}</p>
          <div className="px-3 flex">
            <button
              onClick={removeItemHandler}
              className="border-white border-2 rounded-[50%] w-7 h-7 text-xl text-white hover:bg-zinc-400 shadow-md mx-2"
            >
              <MinusIcon />
            </button>
            <button
              onClick={addItemHandler}
              className="bg-white rounded-[50%] text-2xl text-black w-7 h-7 hover:bg-zinc-400 shadow-md mx-2"
            >
              <PlusIcon />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
