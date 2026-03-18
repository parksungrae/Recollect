import Image from "next/image";

export default function Home() {
  return (
    <div className="min-h-screen relative overflow-hidden text-slate-900 dark:text-slate-100 flex flex-col font-sans">
      {/* Background decoration */}
      <div className="hero-glow top-0 -left-20" />
      <div className="hero-glow bottom-0 -right-20" style={{ background: "radial-gradient(circle, #a855f7, transparent 70%)" }} />

      {/* Navigation */}
      <nav className="z-10 px-8 py-6 flex justify-between items-center max-w-7xl mx-auto w-full">
        <div className="text-2xl font-bold tracking-tight bg-gradient-to-r from-blue-500 to-indigo-600 bg-clip-text text-transparent">
          Recollect
        </div>
        <div className="hidden md:flex space-x-8 text-sm font-medium opacity-70">
          <a href="#" className="hover:opacity-100 transition-opacity">Features</a>
          <a href="#" className="hover:opacity-100 transition-opacity">Security</a>
          <a href="#" className="hover:opacity-100 transition-opacity">Pricing</a>
        </div>
        <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2.5 rounded-full text-sm font-semibold transition-all shadow-lg hover:shadow-indigo-500/20 active:scale-95">
          Get Started
        </button>
      </nav>

      <main className="flex-1 flex flex-col items-center justify-center -mt-16 relative">
        <div className="max-w-7xl mx-auto px-8 w-full flex flex-col md:flex-row items-center gap-16">
          {/* Left Hero Content */}
          <div className="flex-1 space-y-8 animate-in fade-in slide-in-from-bottom-5 duration-700">
            <h1 className="text-6xl md:text-8xl font-extrabold leading-tight tracking-tight">
              Recollect your <br />
              <span className="text-indigo-500">digital scattered</span> <br />
              memories.
            </h1>
            <p className="text-xl opacity-60 max-w-lg leading-relaxed">
              Capture, organize, and recall every piece of your digital life. 
              Securely stored, intelligently searchable, beautifully presented.
            </p>
            <div className="flex items-center space-x-4">
              <button className="bg-indigo-600 text-white px-8 py-4 rounded-2xl text-lg font-bold shadow-2xl hover:bg-indigo-700 transition-all hover:translate-y-[-2px] active:translate-y-0">
                Start Collecting
              </button>
              <button className="bg-slate-100 dark:bg-slate-800 px-8 py-4 rounded-2xl text-lg font-bold border border-slate-200 dark:border-slate-700 hover:border-indigo-500 transition-all">
                Learn More
              </button>
            </div>
          </div>

          {/* Right Hero Image */}
          <div className="flex-1 relative animate-in fade-in zoom-in duration-1000">
            <div className="relative z-10 glass-card p-4 overflow-hidden shadow-2xl">
              <Image
                src="/hero.png"
                alt="Recollect app abstract preview"
                width={800}
                height={800}
                className="rounded-lg object-cover"
                priority
              />
            </div>
            {/* Soft shadow backgrounds */}
            <div className="absolute -inset-2 bg-gradient-to-r from-indigo-500 to-purple-500 opacity-20 blur-3xl -z-1" />
          </div>
        </div>
      </main>

      <footer className="py-12 px-8 border-t border-slate-200 dark:border-slate-800 flex justify-between items-center max-w-7xl mx-auto w-full text-sm opacity-50">
        <p>&copy; {new Date().getFullYear()} Recollect AI project. All rights reserved.</p>
        <div className="flex space-x-6">
          <a href="#">Privacy</a>
          <a href="#">Terms</a>
          <a href="#">GitHub</a>
        </div>
      </footer>
    </div>
  );
}
