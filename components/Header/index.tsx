import React from 'react';
import { Header, Container, MantineTheme } from '@mantine/core';

type Props = {
  widthContent?: number;
  children: React.ReactNode;
};

function index({ children, widthContent = 1012 }: Props) {
  const styles = (theme: MantineTheme) => ({
    root: { width: '100%', backgroundColor: theme.colors.customGreen[0] },
  });

  return (
    <Header height={65} styles={styles}>
      <Container
        fluid
        style={{
          height: '100%',
          width: `${widthContent}px`,
          maxWidth: `${widthContent}px`,
          padding: 0,
        }}
      >
        {children}
      </Container>
    </Header>
  );
}

export default index;
