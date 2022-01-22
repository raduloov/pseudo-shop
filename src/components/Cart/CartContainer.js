import { ShoppingCartIcon } from '@heroicons/react/outline';

const CartContainer = props => {
  return (
    <>
      <div
        onClick={props.onClose}
        className="bg-[rgba(0,0,0,0.8)] w-screen h-screen fixed backdrop-blur-sm z-10 shadow-md animate-[blur-in_0.5s_ease]"
      ></div>
      <div className="w-96 h-screen fixed bg-white right-0 z-20 animate-[slide-left_0.5s_ease]">
        <div className="w-full h-24 bg-neutral-700 text-white text-3xl flex justify-center items-center shadow-md">
          <div className="flex items-center">
            Your Cart
            <ShoppingCartIcon className="h-10 m-3" />
          </div>
        </div>
      </div>
    </>
  );
};

export default CartContainer;
