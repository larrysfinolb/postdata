import styled from '@emotion/styled';
import React from 'react';

type Props = {
  children: React.ReactNode;
};

const SectionStyles = styled.section`
  position: relative;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
`;

function Section({ children }: Props) {
  return <SectionStyles>{children}</SectionStyles>;
}

export default Section;
