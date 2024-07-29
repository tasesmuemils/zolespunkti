'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

import { createClient } from '../../utils/superbase/server';

export async function signup(formData) {
  const supabase = createClient();

  // type-casting here for convenience
  // in practice, you should validate your inputs
  console.log(formData);
  // const data = {
  //   email: formData.get('email'),
  //   password: formData.get('password'),
  // };

  const { error } = await supabase.auth.signUp(data);

  // console.log(error);

  if (error) {
    redirect('/error');
  }

  revalidatePath('/', 'layout');
  redirect('/');
}
