import supabase from 'utils/supabase';

async function useInsertValue(
  table: string,
  values: Object,
  form: any,
  setShowSpinner: Function,
  setLoad: Function
) {
  try {
    setShowSpinner(true);
    const result: any = await supabase.from(table).insert([values]);

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
