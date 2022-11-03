import React from 'react';
import { Title, useMantineTheme, MantineTheme } from '@mantine/core';

type Props = {
  children: string;
  order: 1 | 2 | 3 | 4 | 5 | 6;
  size?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
  styles?: object;
};

function Heading({ children, order, size, styles }: Props) {
  const theme: MantineTheme = useMantineTheme();
  const style = {
    fontFamily: theme.headings.fontFamily,
    color: theme.colors.customBlack[0],
    ...styles,
  };

  return (
    <Title order={order} size={size} transform="uppercase" style={style}>
      {children}
    </Title>
  );
}

export default Heading;
