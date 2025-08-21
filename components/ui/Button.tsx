const Button = ({
  type,
  text,
}: {
  type: 'default' | 'primary' | 'secondary';
  text: string;
}) => {
  return (
    <button
      className={`px-6 py-2 rounded-full drop-shadow-md ${
        type === 'primary' ? 'text-white' : 'text-black'
      } ${
        type === 'primary'
          ? 'bg-beacon-blue hover:bg-blue-600 transition duration-300 ease-in-out'
          : 'bg-gray-200 hover:bg-gray-300 transition duration-300 ease-in-out'
      }
     `}
    >
      {text}
    </button>
  );
};

export default Button;
