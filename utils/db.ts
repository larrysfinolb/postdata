import supabase from './supabase';

const getLastInsert = async (table: string) => {
  try {
    const result: any = await supabase.from(table).select('*');

    if (result.error) throw result.error.details;

    const data = result.data[result.data.length - 1];

    return { type: 'data', data };
  } catch (error) {
    return { type: 'error', error };
  }
};

const insertInDB = async (table: string, values: Array<Object>) => {
  try {
    const result: any = await supabase.from(table).insert(values);

    if (result.error) throw result.error.details;

    return null;
  } catch (error) {
    return error;
  }
};

const updateInDB = async (table: string, id: number, values: Object) => {
  try {
    const result: any = await supabase.from(table).update(values).eq('id', id);

    if (result.error) throw result.error.details;

    return null;
  } catch (error) {
    return error;
  }
};

const deleteInDB = async (table: string, id: number) => {
  try {
    const result = await supabase.from(table).delete().eq('id', id);

    if (result.error) throw result.error.details;

    return null;
  } catch (error) {
    return error;
  }
};

export { getLastInsert, insertInDB, updateInDB, deleteInDB };
