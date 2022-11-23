import React from 'react';
import { Badge, useMantineTheme, MantineTheme } from '@mantine/core';

type Props = {
  children: Array<string>;
};

function ListBadges({ children }: Props) {
  const theme: MantineTheme = useMantineTheme();

  const stylesUl = {
    margin: 0,
    padding: 0,
    display: 'flex',
    gap: '1rem',
    listStyle: 'none',
  };
  const stylesBadge = {
    backgroundColor: theme.colors.customGreen[0],
  };

  return (
    <ul style={stylesUl}>
      {children.map((badge, index) => (
        <li key={index}>
          <Badge size="xl" variant="filled" style={stylesBadge}>
            {badge}
          </Badge>
        </li>
      ))}
    </ul>
  );
}

export default ListBadges;
