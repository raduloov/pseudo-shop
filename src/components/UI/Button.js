const Button = props => {
  return (
    <button
      onClick={props.onClick}
      className="flex items-center text-xl rounded-xl bg-[#8a8a8a] p-2 hover:brightness-125"
    >
      {props.children}
    </button>
  );
};

export default Button;
