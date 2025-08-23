import nextConnect from 'next-connect';
import multer from 'multer';
import fs from 'fs';
import path from 'path';
import { createClient } from '@supabase/supabase-js';

// configure multer to store file in memory
const upload = multer({ storage: multer.memoryStorage() });

const handler = nextConnect();
handler.use(upload.single('file'));

handler.post(async (req, res)=>{
  try{
    const { name, cert } = req.body;
    if(!name || !cert || !req.file) return res.status(400).json({ ok:false, message:'Missing fields' });

    const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const SUPABASE_SERVICE_ROLE = process.env.SUPABASE_SERVICE_ROLE_KEY;
    const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE);

    const fileBuffer = req.file.buffer;
    const filename = Date.now() + '_' + req.file.originalname.replace(/\s+/g,'_');
    // upload into 'certificates' bucket
    const { data, error } = await supabase.storage.from('certificates').upload(filename, fileBuffer, { contentType: req.file.mimetype, upsert: false });
    if(error) return res.status(500).json({ ok:false, message: error.message });

    // make public URL (assuming bucket is public)
    const publicUrl = `${SUPABASE_URL}/storage/v1/object/public/certificates/${encodeURIComponent(filename)}`;

    // insert into table using service role
    const { data:inserted, error:insErr } = await supabase.from('certs').insert([{ name: name.trim(), cert_number: cert.trim(), file_url: publicUrl }]);
    if(insErr) return res.status(500).json({ ok:false, message: insErr.message });

    res.status(200).json({ ok:true, url: publicUrl });
  }catch(err){
    console.error(err); res.status(500).json({ ok:false, message: err.message });
  }
});

export const config = { api: { bodyParser: false } };
export default handler;
