import React from 'react';
import { TextInput, useMantineTheme, MantineTheme } from '@mantine/core';

type Props = {
  placeholder?: string;
};

function MainTextInput({ placeholder }: Props) {
  const theme: MantineTheme = useMantineTheme();
  const styles = {
    root: {
      'input:focus': {
        borderColor: theme.colors.customYellow[0],
      },
    },
  };

  return <TextInput placeholder={placeholder} styles={styles} />;
}

export default MainTextInput;
