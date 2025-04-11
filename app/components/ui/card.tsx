interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
}

const Card: React.FC<CardProps> = ({ children, className = "", ...props }) => {
  return (
    <div
      className={`bg-white shadow-md rounded-md p-4 cursor-pointer ${className}`}
      {...props} // Isme onClick aur dusre props automatically pass ho jayenge
    >
      {children}
    </div>
  );
};

export default Card;
