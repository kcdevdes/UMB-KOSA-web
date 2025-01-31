interface ButtonProps {
  children: React.ReactNode;
}

export default function Button({ children }: ButtonProps) {
  return (
    <button className="bg-beacon-blue hover:bg-slate-800 text-white font-bold py-4 px-6 rounded-full">
      <span className="font-bold text-2xl">{children}</span>
    </button>
  );
}
