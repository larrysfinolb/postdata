import supabase from './supabase';

const uploadFile = async (bucket: string, name: string, file: File) => {
  try {
    const result: any = await supabase.storage
      .from(bucket)
      .upload(`${name}`, file, { upsert: true });

    if (result.error) throw result.error.details;

    return { type: 'data', data: result.data.path };
  } catch (error) {
    return { type: 'error', error: error };
  }
};

const getUrlFile = (bucket: string, path: string) => {
  const result: any = supabase.storage.from(bucket).getPublicUrl(path);
  return result.data.publicUrl;
};

export { uploadFile, getUrlFile };
