import Dropdown from './UI/Dropdown';

const MainContainer = props => {
  return (
    <div className="flex flex-col justify-center items-center">
      <div className="sm:w-full md:w-[1360px] bg-[rgba(255,255,255,0.1)] shadow-md rounded-b-xl">
        <div className="flex justify-between items-center mt-7">
          <Dropdown chooseCategory={props.onChooseCategory} />
        </div>
        {props.children}
      </div>
    </div>
  );
};

export default MainContainer;
