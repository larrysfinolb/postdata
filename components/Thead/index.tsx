import React from 'react';
import { Table, useMantineTheme } from '@mantine/core';

type Props = {
  thead: Array<string>;
  tbody: Array<object>;
};

function MainTable({ thead, tbody }: Props) {
  const theme = useMantineTheme();
  const stylesThead = {
    backgroundColor: theme.colors.customGreen[0],
  };
  const stylesTh = {
    color: theme.colors.customWhite[0],
  };

  return (
    <Table highlightOnHover withBorder>
      <thead style={stylesThead}>
        <tr>
          {thead.map(col => (
            <th key={col} style={stylesTh}>
              {col}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {tbody.map((row, index) => (
          <tr key={index}>
            {Object.values(row).map(col => (
              <td key={col}>{col}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </Table>
  );
}

export default MainTable;
