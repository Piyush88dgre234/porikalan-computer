import { useState } from 'react'

export default function Certificate(){
  const [msg,setMsg]=useState('')
  const onSubmit = async (e)=>{
    e.preventDefault()
    setMsg('')
    const name = e.target.name.value.trim()
    const cert = e.target.cert.value.trim()
    if(!name||!cert){ setMsg('Please fill both fields'); return; }
    const res = await fetch('/api/find-cert', { method:'POST', headers:{'content-type':'application/json'}, body: JSON.stringify({name,cert}) })
    const data = await res.json()
    if(data.ok){
      window.open(data.url, '_blank')
    } else {
      setMsg(data.message||'Not found')
    }
  }
  return (
    <div>
      <header className="header"><div className="container flex items-center justify-between"><div className="brand">Porikalan Institute</div></div></header>
      <main className="container mt-8">
        <h2 className="text-2xl font-semibold">Download Certificate</h2>
        <form onSubmit={onSubmit} className="mt-4 max-w-md">
          <input name="name" placeholder="Student name" className="w-full p-2 border rounded mb-2" />
          <input name="cert" placeholder="Certificate number" className="w-full p-2 border rounded mb-2" />
          <button className="btn btn-primary w-full">Find & Download</button>
          <p className="text-red-600 mt-2">{msg}</p>
        </form>
      </main>
    </div>
  )
}
