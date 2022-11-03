import styled from '@emotion/styled';
import React from 'react';

type Props = {
  children: React.ReactNode;
};

const ContainerStyles = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

function Container({ children }: Props) {
  return <ContainerStyles>{children}</ContainerStyles>;
}

export default Container;
