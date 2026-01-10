interface Props {
  children: React.ReactNode;
}

export default function ViewContainer({ children }: Props) {
  return <div className="flex flex-col font-poppins items-center justify-center bg-violet-400 h-[100svh] w-full">{ children }</div>;
}
