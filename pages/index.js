import Link from 'next/link'
export default function Home(){
  return (
    <div>
      <header className="header">
        <div className="container flex items-center justify-between">
          <div className="brand">Porikalan Institute</div>
          <nav className="space-x-3">
            <Link href="/"><a className="btn btn-ghost">Home</a></Link>
            <Link href="/certificate"><a className="btn btn-ghost">Certificate</a></Link>
            <Link href="/admin"><a className="btn btn-ghost">Admin</a></Link>
          </nav>
        </div>
      </header>

      <main className="container">
        <section className="mt-6">
          <h1 className="text-3xl font-bold">Porikalan Computer Institute</h1>
          <p className="mt-2 text-gray-600">Join our courses. Use the certificate portal to download certificates.</p>
        </section>

        <section className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
          <img src="/images/IMG_4640.jpg" alt="img1" className="w-full rounded-lg shadow" />
          <img src="/images/IMG_4641.jpg" alt="img2" className="w-full rounded-lg shadow" />
        </section>
      </main>
    </div>
  )
}
