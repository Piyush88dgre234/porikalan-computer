
Porikalan Next.js + Supabase (Ready-to-deploy)
---------------------------------------------
Steps to use:
1. Create a Supabase project and Storage bucket named 'certificates' (public).
2. Create table 'certs' using SQL:
   create table certs (
     id bigint generated always as identity primary key,
     name text not null,
     cert_number text not null,
     file_url text not null
   );

3. Copy this project to your machine. Install deps: npm install
4. Create a .env.local file at project root with:
   NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
   SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
   NEXT_PUBLIC_ADMIN_PW=porikalanAdmin123

5. Run locally: npm run dev
6. Deploy to Vercel: Add the above env vars in Vercel dashboard. Deploy.
   Important: Use the SERVICE_ROLE key only on server-side (we use it in api/upload-cert).

Notes:
- Uploaded files are saved to Supabase storage and the public URL is stored in 'certs' table.
- For security, restrict service role key usage and rotate keys as needed.
