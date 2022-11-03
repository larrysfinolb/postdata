import React from 'react';

function useSearcher(data: Array<any>, columns: Array<string>) {
  const [search, setSearch]: any = React.useState('');
  const [result, setResult]: any = React.useState([]);

  React.useEffect(() => {
    const newResult = data.map((item: any) => {
      let match: boolean = false;

      for (const value of columns) {
        const col: string =
          value === 'active'
            ? item[value]
              ? 'activado'
              : 'desactivado'
            : item[value].toString().toLowerCase();

        if (col.includes(search.toLowerCase())) {
          match = true;
          break;
        }
      }

      if (match) return item;
    });

    setResult(newResult.filter((item: any) => item !== undefined));
  }, [search, data]);

  return { result, setSearch };
}

export default useSearcher;
