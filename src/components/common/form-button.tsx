'use client';

import { useFormStatus } from 'react-dom';
import { Button, ButtonProps } from '@nextui-org/react';

interface FormButtonProps extends ButtonProps {
  children: React.ReactNode;
}

export default function FormButton({ children, ...rest }: FormButtonProps) {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" {...rest} isLoading={pending}>
      {children}
    </Button>
  );
}
