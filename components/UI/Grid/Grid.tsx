type GridProps = {
  children: React.ReactNode;
};

const Grid = (props: GridProps) => {
  return <div className="root-grid">{props.children}</div>;
};

export default Grid;
