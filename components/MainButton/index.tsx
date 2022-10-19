import React from 'react';
import { Button, MantineTheme, useMantineTheme } from '@mantine/core';

type Props = {
  children: string;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  fullWidth?: boolean;
};

function MainButton({ children, size, fullWidth }: Props) {
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
    <Button size={size} uppercase styles={styles} fullWidth={fullWidth}>
      {children}
    </Button>
  );
}

export default MainButton;
