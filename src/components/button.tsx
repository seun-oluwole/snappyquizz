interface Props {
  children: React.ReactNode;
  handleClick: () => void;
}

export default function Button({ children, handleClick }: Props) {
  return (
    <button className="h-16 grow-0 text-2xl font-semibold bg-violet-600 hover:bg-violet-500 rounded-3xl" onClick={handleClick}>
      <div>{children}</div>
    </button>
  );
}
