import React from 'react';
import { Button, MantineTheme, useMantineTheme } from '@mantine/core';

type Props = {
  children: string;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
};

function MainButton({ children, size }: Props) {
  const theme: MantineTheme = useMantineTheme();
  const styles = {
    root: {
      backgroundColor: theme.colors.customYellow[0],
      '&:hover': {
        backgroundColor: theme.colors.customYellow[0],
      },
    },
    label: {
      fontWeight: 800,
    },
  };

  return (
    <Button size={size} uppercase styles={styles}>
      {children}
    </Button>
  );
}

export default MainButton;
