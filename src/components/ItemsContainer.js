import ItemCard from './UI/ItemCard';

const ItemsContainer = ({ items }) => {
  return (
    <div className="flex flex-wrap mt-10">
      {items.map(item => (
        <ItemCard data={item} key={item.id} />
      ))}
    </div>
  );
};

export default ItemsContainer;
