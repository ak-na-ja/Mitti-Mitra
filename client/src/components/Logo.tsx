import { Leaf } from 'lucide-react';
import { Link } from 'wouter';

interface LogoProps {
  className?: string;
  onClick?: () => void;
}

export default function Logo({ className = '', onClick }: LogoProps) {
  return (
    <Link href="/">
      <a
        className={`flex items-center justify-center gap-2 cursor-pointer ${className}`}
        onClick={onClick}
        data-testid="link-logo"
      >
        <Leaf className="h-7 w-7 md:h-9 md:w-9 text-[#6B8E23]" />
        <h1 
          className="text-[28px] md:text-[36px] font-bold tracking-tight"
          style={{
            fontFamily: 'Georgia, serif',
            color: '#8B6F47',
            textShadow: '0 1px 2px rgba(0, 0, 0, 0.1)',
          }}
        >
          Mitti Mitra
        </h1>
      </a>
    </Link>
  );
}
