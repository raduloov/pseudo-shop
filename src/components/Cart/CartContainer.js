import { useSelector } from 'react-redux';

import { ShoppingCartIcon } from '@heroicons/react/outline';
import CartItem from './CartItem';

const CartContainer = props => {
  const cartItems = useSelector(state => state.cart.items);
  const totalAmount = Math.abs(
    useSelector(state => state.cart.totalAmount).toFixed(2)
  );

  return (
    <>
      <div
        onClick={props.onClose}
        className="bg-[rgba(0,0,0,0.8)] w-screen h-screen fixed backdrop-blur-sm z-10 shadow-md animate-[blur-in_0.5s_ease]"
      ></div>
      <div
        style={{
          backgroundColor: '#333333',
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%234a4a4a' fill-opacity='0.37' fill-rule='evenodd'%3E%3Cpath d='M0 40L40 0H20L0 20M40 40V20L20 40'/%3E%3C/g%3E%3C/svg%3E\")",
        }}
        className="w-96 h-screen fixed right-0 z-20 animate-[slide-left_0.5s_ease] flex flex-col justify-between"
      >
        <div className="w-full h-32 bg-neutral-500 text-white text-3xl flex justify-center items-center shadow-md">
          <div className="flex items-center">
            Your Cart
            <ShoppingCartIcon className="h-10 m-3" />
          </div>
        </div>
        <div className="flex flex-col overflow-y-auto h-full p-3">
          {cartItems.map(item => (
            <CartItem
              key={item.id}
              item={{
                title: item.title,
                image: item.image,
                quantity: item.quantity,
                total: item.totalPrice,
                price: item.price,
                id: item.id,
              }}
            />
          ))}
        </div>
        <div className="w-full py-5 bg-neutral-500 shadow-md flex flex-col items-center justify-evenly">
          <p className="pb-5 text-2xl text-white">Total: ${totalAmount}</p>
          <div className="flex justify-evenly w-full">
            <button
              onClick={props.onClose}
              className="border-white border-2 rounded-lg p-2 text-2xl text-white w-24 hover:bg-zinc-400 shadow-md"
            >
              Cancel
            </button>
            <button className="bg-white rounded-lg p-2 text-2xl text-black w-24 hover:bg-zinc-400 shadow-md">
              Order
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default CartContainer;
