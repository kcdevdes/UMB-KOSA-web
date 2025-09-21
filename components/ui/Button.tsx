import {Link} from '@/i18n';

type ButtonVariant = 'default' | 'primary' | 'secondary';

type ButtonProps = {
  type: ButtonVariant;
  text: string;
  href?: string;
};

const Button = ({type, text, href}: ButtonProps) => {
  const className = `px-6 py-2 rounded-full drop-shadow-md transition duration-300 ease-in-out ${
    type === 'primary'
      ? 'bg-beacon-blue text-white hover:bg-blue-600'
      : 'bg-gray-200 text-black hover:bg-gray-300'
  }`;

  if (href) {
    return (
      <Link href={href} className={className}>
        {text}
      </Link>
    );
  }

  return <button className={className}>{text}</button>;
};

export default Button;
