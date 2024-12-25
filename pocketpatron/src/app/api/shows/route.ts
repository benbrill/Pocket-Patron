import { createClient } from '../../../../utils/supabase/server';

export async function GET() {
  const supabase = await createClient();
  const { data: shows } = await supabase.from("shows").select();

  return Response.json( shows )
}

  