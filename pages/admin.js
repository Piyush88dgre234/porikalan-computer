import { useState } from 'react'

export default function Admin(){
  const [ok,setOk]=useState(false)
  const [msg,setMsg]=useState('')
  const login = (e)=>{ e.preventDefault(); const pw = e.target.pw.value; if(pw===process.env.NEXT_PUBLIC_ADMIN_PW) setOk(true); else alert('Wrong password') }
  const upload = async (e)=>{
    e.preventDefault(); setMsg('')
    const form = new FormData()
    form.append('name', e.target.name.value)
    form.append('cert', e.target.cert.value)
    form.append('file', e.target.file.files[0])
    const res = await fetch('/api/upload-cert', { method:'POST', body: form })
    const data = await res.json()
    if(data.ok){ setMsg('Uploaded successfully') } else setMsg(data.message||'Error')
  }
  return (
    <div>
      <header className="header"><div className="container flex items-center justify-between"><div className="brand">Porikalan Institute</div></div></header>
      <main className="container mt-8">
        <h2 className="text-2xl font-semibold">Admin Upload</h2>
        {!ok? <form onSubmit={login} className="max-w-md mt-4"><input name="pw" placeholder="Admin password" className="w-full p-2 border rounded mb-2"/><button className="btn btn-primary">Login</button></form> :
        <form onSubmit={upload} className="max-w-md mt-4">
          <input name="name" placeholder="Student name" className="w-full p-2 border rounded mb-2"/>
          <input name="cert" placeholder="Certificate number" className="w-full p-2 border rounded mb-2"/>
          <input name="file" type="file" accept="application/pdf" className="mb-2"/>
          <button className="btn btn-primary">Upload to Supabase</button>
          <p className="text-green-600 mt-2">{msg}</p>
        </form> }
      </main>
    </div>
  )
}
