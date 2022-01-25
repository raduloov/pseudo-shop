import ItemCard from './UI/ItemCard';

const ItemsContainer = ({ items }) => {
  const sortHandler = () => {
    console.log(items);
    const sortedItems = items.sort((a, b) => a.title.localeCompare(b.title));
    console.log(sortedItems);
  };
  // const sortedItems = items.sort((a, b) => b.price - a.price);

  return (
    <div className="flex flex-wrap sm:mt-20 md:mt-10 sm:justify-center">
      {items.map(item => (
        <ItemCard data={item} key={item.id} />
      ))}
    </div>
  );
};

export default ItemsContainer;
