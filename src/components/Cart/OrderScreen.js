const OrderScreen = props => {
  return (
    <div className="w-96 flex flex-col items-center">
      <h3 className="text-2xl text-center text-white mb-10">
        Your order has been successfully sent, however don't expect it any time soon,
        thank you! :)
      </h3>
      <button
        onClick={props.onClose}
        className="border-white border-2 rounded-lg p-2 text-2xl text-white  hover:bg-[rgba(0,0,0,0.6)] shadow-md active:scale-[0.95] "
      >
        Continue Shopping
      </button>
    </div>
  );
};

export default OrderScreen;
