import React from 'react';
import { MantineTheme, useMantineTheme } from '@mantine/core';

type Props = {
  children: string;
};

function Paragraph({ children }: Props) {
  const theme: MantineTheme = useMantineTheme();
  const styles = {
    margin: 0,
    lineHeight: '160%',
    color: theme.colors.customBlack[0],
  };

  return <p style={styles}>{children}</p>;
}

export default Paragraph;
