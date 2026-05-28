import type { FC } from 'react';
import './ShinyText.css';

interface ShinyTextProps {
  text: string;
  disabled?: boolean;
  speed?: number;
  className?: string;
}

const ShinyText: FC<ShinyTextProps> = ({
  text,
  disabled = false,
  className = '',
}) => {
  return (
    <span className={`shiny-text ${disabled ? 'disabled' : ''} ${className}`}>
      {text}
    </span>
  );
};

export default ShinyText;
