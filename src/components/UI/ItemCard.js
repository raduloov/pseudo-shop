import { ShoppingCartIcon } from '@heroicons/react/outline';
import { StarIcon } from '@heroicons/react/solid';
import Button from './Button';

const ItemCard = ({ data }) => {
  return (
    <div className="bg-[rgba(34,34,34,0.80)] text-white w-64 rounded-xl overflow-hidden my-4 mx-2 flex flex-col justify-between shadow-lg">
      <div>
        <div className="flex justify-center items-center p-5 h-48">
          <img src={data.image} className="max-w-full max-h-full" />
        </div>
        <p className="text-xl p-2">{data.title}</p>
      </div>
      <div>
        <div className="p-2">
          <div className="py-2 flex">
            {[...Array(Math.round(data.rating.rate))].map(star => (
              <StarIcon className="h-6" key={Math.random().toString(36)} />
            ))}
            <p className="px-2">({data.rating.count})</p>
          </div>
          <p className="text-2xl">${data.price}</p>
        </div>
        <div className="flex items-center justify-center p-2 text-black">
          <Button>
            <ShoppingCartIcon className="h-8 p-1" />
            Add To Cart
          </Button>
          {/* <button className="flex items-center text-xl rounded-xl bg-[#8a8a8a] p-2 hover:brightness-125">
            <ShoppingCartIcon className="h-8 p-1" />
            Add To Cart
          </button> */}
        </div>
      </div>
    </div>
  );
};

export default ItemCard;
