interface ButtonProps {
  children: React.ReactNode;
}

export default function Button({ children }: ButtonProps) {
  return (
    <button className="bg-white hover:bg-slate-500 text-white font-bold px-2 py-2 rounded-full">
      <span className="font-bold text-red-500">{children}</span>
    </button>
  );
}
