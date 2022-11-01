import supabase from 'utils/supabase';

async function useInsertValue(
  table: string,
  values: Object,
  form: any,
  setShowSpinner: Function,
  setLoad: Function
) {
  try {
    const { id }: any = values;

    setShowSpinner(true);

    const result: any = await supabase.from(table).update(values).eq('id', id);

    if (result.error) throw result.error.details;

    setLoad(true);
    setShowSpinner(false);
    form.reset();

    return null;
  } catch (error) {
    setShowSpinner(false);
    return error;
  }
}

export default useInsertValue;
