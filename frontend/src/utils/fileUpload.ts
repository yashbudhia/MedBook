import { supabase } from '../lib/supabase';

export async function uploadFile(file: File, userId: string): Promise<string> {
  const fileExt = file.name.split('.').pop();
  const fileName = `${userId}/${Math.random()}.${fileExt}`;
  const filePath = `medical-records/${fileName}`;

  const { error: uploadError } = await supabase.storage
    .from('records')
    .upload(filePath, file);

  if (uploadError) {
    throw uploadError;
  }

  const { data: recordData, error: recordError } = await supabase
    .from('medical_records')
    .insert([
      {
        user_id: userId,
        file_path: filePath,
        file_name: file.name,
        file_type: file.type,
        status: 'processing'
      }
    ])
    .select()
    .single();

  if (recordError) {
    throw recordError;
  }

  return recordData.id;
}