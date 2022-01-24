import { useState, useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { cartActions } from '../../store/cart-slice';

const isEmpty = value => value.trim() === '';

const CheckoutForm = props => {
  const [formInputValidity, setFormInputValidity] = useState({
    name: true,
    city: true,
    street: true,
  });
  const [enteredName, setEnteredName] = useState('');
  const [enteredStreet, setEnteredStreet] = useState('');
  const [enteredCity, setEnteredCity] = useState('');

  const items = useSelector(state => state.cart.items);
  const totalAmount = Math.abs(
    useSelector(state => state.cart.totalAmount).toFixed(2)
  );
  const dispatch = useDispatch();

  const checkValidity = useCallback(() => {
    const enteredNameIsValid = !isEmpty(enteredName);
    const enteredCityIsValid = !isEmpty(enteredCity);
    const enteredStreetIsValid = !isEmpty(enteredStreet);

    setFormInputValidity({
      name: enteredNameIsValid,
      city: enteredCityIsValid,
      street: enteredStreetIsValid,
    });
  }, [enteredName, enteredCity, enteredStreet]);

  useEffect(() => {
    checkValidity();
  }, [enteredName, enteredCity, enteredStreet, checkValidity]);

  const orderHandler = async () => {
    const orderItems = items.map(item => {
      return {
        id: item.id,
        name: item.title,
        price: item.price,
        quantity: item.quantity,
        totalPrice: item.totalPrice,
      };
    });

    const userDetails = {
      name: enteredName,
      city: enteredCity,
      street: enteredStreet,
    };

    const order = JSON.stringify({
      order: { ...orderItems, total: totalAmount },
      'user-details': userDetails,
    });

    const response = await fetch(
      'https://pseudo-shop-firebase-default-rtdb.europe-west1.firebasedatabase.app/orders.json',
      {
        method: 'POST',
        body: order,
        headers: { 'Content-Type': 'application/json' },
      }
    );
    const data = await response.json();

    props.onConfirm();
  };

  const confirmHandler = e => {
    e.preventDefault();

    checkValidity();

    const formIsValid =
      formInputValidity.name && formInputValidity.city && formInputValidity.street;

    if (!formIsValid) return;

    orderHandler();

    dispatch(cartActions.emptyCart());
  };

  return (
    <div
      style={{
        backgroundColor: '#333333',
        backgroundImage:
          "url(\"data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%234a4a4a' fill-opacity='0.37' fill-rule='evenodd'%3E%3Cpath d='M0 40L40 0H20L0 20M40 40V20L20 40'/%3E%3C/g%3E%3C/svg%3E\")",
      }}
      className="text-white p-4 rounded-xl"
    >
      <form>
        <h3 className="text-2xl text-center">Please fill out the form</h3>
        <div className="mt-3 p-2 flex justify-between">
          <label htmlFor="name" className={` mr-4 text-xl`}>
            Your Name
          </label>
          <input
            onChange={e => {
              setEnteredName(e.target.value);
            }}
            type="text"
            id="name"
            className={`${
              formInputValidity.name
                ? 'hover:bg-white focus:bg-white'
                : 'bg-red-400 hover:bg-red-300 focus:bg-red-300'
            } rounded-md p-1 bg-[rgba(255,255,255,0.8)] text-black text-xl  w-42 mr-2`}
          />
        </div>
        <div className="p-2 flex justify-between">
          <label htmlFor="city" className={`mr-4 text-xl`}>
            City
          </label>
          <input
            onChange={e => {
              setEnteredCity(e.target.value);
            }}
            type="text"
            id="city"
            className={`${
              formInputValidity.city
                ? 'hover:bg-white focus:bg-white'
                : 'bg-red-400 hover:bg-red-300 focus:bg-red-300'
            } rounded-md p-1 bg-[rgba(255,255,255,0.8)] text-black text-xl w-42 mr-2`}
          />
        </div>
        <div className="p-2 flex justify-between">
          <label htmlFor="street" className={`mr-4 text-xl`}>
            Street
          </label>
          <input
            onChange={e => {
              setEnteredStreet(e.target.value);
            }}
            type="text"
            id="street"
            className={`${
              formInputValidity.street
                ? 'hover:bg-white focus:bg-white'
                : 'bg-red-400 hover:bg-red-300 focus:bg-red-300'
            } rounded-md p-1 bg-[rgba(255,255,255,0.8)] text-black text-xl w-42 mr-2`}
          />
        </div>
        <div className="flex justify-evenly mt-5">
          <button
            onClick={e => {
              e.preventDefault();
              props.onClose();
            }}
            className="border-white border-2 rounded-lg p-2 text-2xl text-white w-24 hover:bg-zinc-500 shadow-md active:scale-[0.95] "
          >
            Cancel
          </button>
          <button
            onClick={confirmHandler}
            className="bg-white rounded-lg p-2 text-2xl text-black w-24 hover:bg-[#cfcfcf] shadow-md active:scale-[0.95]"
          >
            Confirm
          </button>
        </div>
      </form>
    </div>
  );
};

export default CheckoutForm;
