import { SearchIcon } from '@heroicons/react/outline';
import { useState } from 'react';

import CartButton from './Cart/CartButton';
import Button from './UI/Button';

const Header = props => {
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
    <div className="w-full h-24 flex justify-center shadow-md bg-zinc-800">
      <div className="h-full w-[1360px] flex items-center justify-between p-2">
        <div className="flex">
          <h1 className="text-[#fff] text-3xl">Pseudo Shop</h1>
          <form onSubmit={submitHandler} className="flex">
            <input
              onChange={searchHandler}
              type="text"
              value={searchTerm}
              placeholder="Search in category..."
              className="rounded-md px-1 bg-[rgba(255,255,255,0.8)] text-black text-xl hover:bg-[rgba(255,255,255,1)] w-42 ml-20 mr-2"
            />
            <Button>
              <SearchIcon className="h-8" />
            </Button>
          </form>
        </div>
        <CartButton onClick={props.onClick} />
      </div>
    </div>
  );
};

export default Header;
