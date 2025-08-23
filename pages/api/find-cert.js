import { createClient } from '@supabase/supabase-js';

export default async function handler(req, res){
  if(req.method !== 'POST') return res.status(405).json({ ok:false, message:'Method not allowed' });
  const { name, cert } = req.body;
  if(!name || !cert) return res.status(400).json({ ok:false, message:'Missing fields' });

  const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const SUPABASE_ANON = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  const supabase = createClient(SUPABASE_URL, SUPABASE_ANON);

  const { data, error } = await supabase.from('certs').select('*').ilike('name', name.trim()).eq('cert_number', cert.trim()).limit(1);
  if(error) return res.status(500).json({ ok:false, message: error.message });
  if(data && data.length>0){
    return res.status(200).json({ ok:true, url: data[0].file_url });
  }
  return res.status(200).json({ ok:false, message:'No record found' });
}
