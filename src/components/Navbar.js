import { SearchIcon } from '@heroicons/react/outline';
import { useState } from 'react';

import Logo from './UI/Logo';
import CartButton from './Cart/CartButton';
import Button from './UI/Button';

const Navbar = props => {
  const [searchTerm, setSearchTerm] = useState('');

  const searchHandler = e => {
    e.preventDefault();

    setSearchTerm(e.target.value);
  };

  const submitHandler = e => {
    e.preventDefault();

    props.onSearch(searchTerm);
    setSearchTerm('');
  };

  return (
    <div className="w-full md:h-24 flex justify-center shadow-md bg-[rgba(39,39,42,1)] fixed z-10">
      <div className="h-full sm:w-full md:w-[1360px] flex items-center justify-between p-2">
        <div className="flex">
          <div
            onClick={() => {
              window.scrollTo({
                top: 0,
                behavior: 'smooth',
              });
            }}
            className="flex"
          >
            <Logo />
            <div className="sm:hidden">
              <h1 className="text-[#fff] md:text-3xl">Pseudo Shop</h1>
              <h4 className="text-zinc-400 sm:text-sm">Free shipping worldwide</h4>
            </div>
          </div>
          <form onSubmit={submitHandler} className="flex items-center md:ml-20">
            <input
              onChange={searchHandler}
              type="text"
              value={searchTerm}
              placeholder="Search for a product..."
              className="rounded-md px-1 py-2 bg-[rgba(255,255,255,0.8)] text-black md:text-xl hover:bg-[rgba(255,255,255,1)] sm:w-28 md:w-42 sm:mr-1 md:mr-2"
            />
            <Button>
              <SearchIcon className="h-7" />
            </Button>
          </form>
        </div>
        <CartButton onClick={props.onShowCart} />
      </div>
    </div>
  );
};

export default Navbar;
