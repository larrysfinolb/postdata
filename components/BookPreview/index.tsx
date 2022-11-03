import React from 'react';
import styled from '@emotion/styled';
import Image from 'next/image';
import { Text, Button } from '@mantine/core';
import Link from 'next/link';

type Props = {
  id: number;
  title: string;
  author: string;
  cover_url: string;
  price: number;
};

const StyledContainer = styled.article`
  width: 220px;
  height: 450px;
  border-radius: 6px;
  background-color: #fff;
  border: 1px solid #222;
  margin: 15px;
  padding: 8px;
  display: flex;
  flex-direction: column;
  align-items: center;
  row-gap: 5px;
  justify-content: space-between;
`;

const StyledDivider = styled.div`
  width: 100%;
  height: 1px;
  margin-top: 4px;
  background-color: #333;
`;

const StyledPrice = styled.span`
  font-size: 18px;
`;

const StyledLink = styled.a`
  font-size: 14px;
  text-decoration: none;
  cursor: pointer;
  color: #006854;
  font-weight: 700;
  text-align: center;
  align-self: center;
`;

function Index({ id, title, author, cover_url, price }: Props) {
  return (
    <StyledContainer>
      <img
        src={cover_url}
        alt={`Imagen del libro ${title}`}
        style={{ margin: 'auto', width: '95%', height: '260px' }}
        loading="lazy"
      />
      <StyledDivider />
      <div style={{ width: '100%' }}>
        <Text weight="bold" lineClamp={1} size={18} style={{ width: '100%' }}>
          {title}
        </Text>
        <Text
          weight="bold"
          lineClamp={1}
          color="#006854"
          size={14}
          style={{ width: '100%' }}
        >
          {author}
        </Text>
      </div>
      <Text weight="bold" lineClamp={1} size={36} style={{ width: '100%' }}>
        {price}
        <StyledPrice>PDX</StyledPrice>
      </Text>
      <div
        style={{
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          rowGap: '4px',
        }}
      >
        <Link href={`/buy/book/${id}`} passHref>
          <Button fullWidth style={{ backgroundColor: '#FCB84C' }}>
            Comprar
          </Button>
        </Link>
        <Link href={`/books/${id}`}>
          <StyledLink>Ver libro</StyledLink>
        </Link>
      </div>
    </StyledContainer>
  );
}

export default Index;
