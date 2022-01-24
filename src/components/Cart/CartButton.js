import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

import { ShoppingCartIcon } from '@heroicons/react/outline';

const CartButton = props => {
  const [btnIsHighlighted, setBtnIsHighlighted] = useState(false);
  const items = useSelector(state => state.cart.items);
  const totalQuantity = useSelector(state => state.cart.totalQuantity);

  useEffect(() => {
    if (items.length === 0) {
      return;
    }
    setBtnIsHighlighted(true);

    const timer = setTimeout(() => {
      setBtnIsHighlighted(false);
    }, 300);

    return () => {
      clearTimeout(timer);
    };
  }, [items]);

  return (
    <button
      onClick={props.onClick}
      className={`${
        btnIsHighlighted && 'animate-[bump_0.3s_ease-out]'
      } flex items-center text-xl rounded-xl bg-[#8a8a8a] md:p-2 hover:brightness-125`}
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
