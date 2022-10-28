import React from 'react';
import supabase from 'utils/supabase';

function useData(table: string) {
  const [data, setData] = React.useState([]);

  React.useEffect(() => {
    const getData = async () => {
      try {
        type Result = {
          data: any;
          error: any;
        };

        const { data, error }: Result = await supabase.from(table).select('*');
        if (error) throw error;

        setData(data);
      } catch (error) {
        console.error(error);
      }
    };

    getData();
  }, []);

  return data;
}

export default useData;
