import React from 'react';
import { Checkbox, useMantineTheme, MantineTheme } from '@mantine/core';

type Props = {
  label?: string;
  checked?: boolean;
};

function MainCheckBox({ label, checked }: Props) {
  const theme: MantineTheme = useMantineTheme();
  const styles = {
    root: {
      'input:checked': {
        backgroundColor: theme.colors.customYellow[0],
      },
    },
  };
  return <Checkbox color={theme.colors.customYellow[0]} label={label} checked={checked} styles={styles} />;
}

export default MainCheckBox;
