import React from 'react';
import { MantineTheme, useMantineTheme } from '@mantine/core';
import styled from '@emotion/styled';

type Props = {
  children: string;
  align?: string;
};

function Paragraph({ children, align }: Props) {
  const theme: MantineTheme = useMantineTheme();
  const P = styled.p`
    margin: 0;
    line-heigth: '160%';
    color: ${theme.colors.customBlack[0]};
    text-align: ${align ? align : 'left'};
  `;

  return <P>{children}</P>;
}

export default Paragraph;
