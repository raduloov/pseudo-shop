export const Spinner = () => {
  return (
    <div className="flex justify-center h-[50vh]">
      <div
        style={{ borderTopColor: 'transparent' }}
        className="w-32 h-32 border-4 border-white border-solid rounded-full animate-spin mt-40"
      ></div>
    </div>
  );
};
