import { ReactNode } from 'react';
import { Button as MuiButton, CircularProgress } from '@mui/material';
import { ButtonProps as MuiButtonProps } from '@mui/material/Button';

interface ButtonProps extends Omit<MuiButtonProps, 'variant' | 'size'> {
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'danger' | 'ghost';
  size?: 'small' | 'medium' | 'large';
  loading?: boolean;
}

export const Button = ({
  children,
  variant = 'primary',
  size = 'medium',
  disabled = false,
  loading = false,
  onClick,
  sx,
  ...props
}: ButtonProps) => {
  const getVariantProps = () => {
    switch (variant) {
      case 'primary':
        return {
          variant: 'contained' as const,
          color: 'primary' as const,
        };
      case 'secondary':
        return {
          variant: 'contained' as const,
          color: 'secondary' as const,
        };
      case 'danger':
        return {
          variant: 'contained' as const,
          color: 'error' as const,
        };
      case 'ghost':
        return {
          variant: 'outlined' as const,
          color: 'primary' as const,
        };
      default:
        return {
          variant: 'contained' as const,
          color: 'primary' as const,
        };
    }
  };

  const variantProps = getVariantProps();

  return (
    <MuiButton
      {...variantProps}
      size={size}
      disabled={disabled || loading}
      onClick={onClick}
      startIcon={loading ? <CircularProgress size={16} color="inherit" /> : undefined}
      sx={{
        fontWeight: 600,
        textTransform: 'none',
        ...sx,
      }}
      {...props}
    >
      {children}
    </MuiButton>
  );
};

// Simple loading spinner component for backward compatibility
interface LoadingSpinnerProps {
  size?: 'small' | 'medium' | 'large';
}

export const LoadingSpinner = ({ size = 'medium' }: LoadingSpinnerProps) => {
  const sizeMap = {
    small: 16,
    medium: 24,
    large: 32,
  };

  return <CircularProgress size={sizeMap[size]} />;
};
