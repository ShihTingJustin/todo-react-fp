const Blank = ({ text, onClick }: { text?: string; onClick?: () => void }) => {
  return (
    <div className="flex flex-col grow justify-center items-center" onClick={onClick}>
      <div>{text}</div>
    </div>
  );
};

export default Blank;
