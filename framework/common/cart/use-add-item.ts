const useAddItem = () => {
  return (input: any) => {
    return {
      output: JSON.stringify(input) + "modified",
    };
  };
};

export default useAddItem;
