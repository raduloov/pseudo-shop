import { useSelector } from 'react-redux';

import { ShoppingCartIcon } from '@heroicons/react/outline';

const CartButton = props => {
  const totalQuantity = useSelector(state => state.cart.totalQuantity);

  return (
    <button
      onClick={props.onClick}
      className="flex items-center text-xl rounded-xl bg-[#8a8a8a] p-2 hover:brightness-125"
    >
      <ShoppingCartIcon className="h-6 w-6 m-2" />
      Cart
      <div className="bg-green-500 rounded-[50%] h-8 w-8 flex items-center justify-center m-2 text-white">
        <p>{totalQuantity}</p>
      </div>
    </button>
  );
};

export default CartButton;
