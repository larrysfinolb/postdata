import React from 'react';
import supabase from 'utils/supabase';

function useData(table: string, setShowSpinner: Function) {
  const [data, setData] = React.useState([]);
  const [load, setLoad] = React.useState(true);

  React.useEffect(() => {
    if (load) {
      const getData = async () => {
        try {
          type Result = {
            data: any;
            error: any;
          };

          setShowSpinner(true);
          const { data, error }: Result = await supabase
            .from(table)
            .select('*');
          if (error) throw error;

          setData(data);
          setLoad(false);
          setShowSpinner(false);
        } catch (error) {
          console.error(error);
          setShowSpinner(false);
          return [];
        }
      };

      getData();
    }
  }, [load]);

  return { data, setLoad };
}

export default useData;
