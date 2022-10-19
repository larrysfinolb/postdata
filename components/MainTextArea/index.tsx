import React from 'react';
import { Textarea, useMantineTheme, MantineTheme } from '@mantine/core';

type Props = {
  placeholder?: string;
};

function MainTextArea({ placeholder }: Props) {
  const theme: MantineTheme = useMantineTheme();
  const styles = {
    root: {
      'textarea:focus': {
        borderColor: theme.colors.customYellow[0],
        rows: 6,
      },
    },
  };

  return <Textarea placeholder={placeholder} styles={styles} minRows={5} />;
}

export default MainTextArea;
