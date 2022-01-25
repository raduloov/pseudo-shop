import CategoryDropdown from './UI/CategoryDropdown';
import SortDropdown from './UI/SortDropdown';

const MainContainer = props => {
  return (
    <div className="flex flex-col justify-center items-center">
      <div className="sm:w-full md:w-[1360px] bg-[rgba(255,255,255,0.1)] shadow-md rounded-b-xl pt-24">
        <div className="flex justify-between items-center mt-7">
          <CategoryDropdown chooseCategory={props.onChooseCategory} />
          <SortDropdown sortBy={props.onSort} />
        </div>
        {props.children}
      </div>
    </div>
  );
};

export default MainContainer;
