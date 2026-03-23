import Link from "next/link";

const SAMPLE_ITEMS = [
  { title: "Pink Floyd — The Wall", sub: "LP · 1979" },
  { title: "Miles Davis — Kind of Blue", sub: "LP · 1959" },
  { title: "하루키 무라카미 — 노르웨이의 숲", sub: "책 · 1987" },
  { title: "Radiohead — OK Computer", sub: "CD · 1997" },
  { title: "Cormac McCarthy — The Road", sub: "책 · 2006" },
  { title: "David Bowie — Ziggy Stardust", sub: "LP · 1972" },
  { title: "Nick Cave — Murder Ballads", sub: "CD · 1996" },
  { title: "村上春樹 — 세계의 끝과 하드보일드", sub: "책 · 1985" },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-[var(--bg)] text-[var(--text)] flex flex-col">

      {/* Navigation */}
      <nav className="px-8 md:px-14 py-6 flex justify-between items-center border-b border-[var(--border)]">
        <span className="font-[family-name:var(--font-display)] text-xl tracking-[0.25em] font-light uppercase">
          Recollect
        </span>
        <div className="flex items-center gap-6">
          <Link
            href="/login"
            className="text-sm text-[var(--text-muted)] hover:text-[var(--text)] transition-colors"
          >
            로그인
          </Link>
          <Link
            href="/signup"
            className="text-sm bg-[var(--accent)] text-[var(--accent-fg)] px-5 py-2 font-medium hover:bg-[var(--accent-hover)] transition-colors"
          >
            시작하기
          </Link>
        </div>
      </nav>

      {/* Hero — Split Grid */}
      <main className="flex-1 grid md:grid-cols-2">

        {/* Left — Headline */}
        <div className="flex flex-col justify-center px-8 md:px-14 py-16 md:py-24 border-r border-[var(--border)]">
          <p className="text-[var(--text-faint)] text-xs tracking-[0.35em] uppercase mb-10">
            Collection Management
          </p>
          <h1 className="font-[family-name:var(--font-display)] text-[clamp(4rem,10vw,8rem)] leading-[0.88] tracking-tight font-light">
            Re—<br />collect
          </h1>
          <p className="mt-10 text-[var(--text-muted)] text-sm leading-relaxed max-w-[22rem]">
            LP, CD, 책. 쌓여가는 물리적 컬렉션을<br />
            방과 서랍으로 정리하고,<br />
            언제든 다시 꺼내보세요.
          </p>
          <div className="mt-10 flex items-center gap-6">
            <Link
              href="/app"
              className="bg-[var(--accent)] text-[var(--accent-fg)] px-8 py-3 text-sm font-medium tracking-wide hover:bg-[var(--accent-hover)] transition-colors"
            >
              컬렉션 시작하기
            </Link>
            <Link
              href="/login"
              className="text-sm text-[var(--text-muted)] hover:text-[var(--text)] transition-colors border-b border-[var(--border)] pb-px"
            >
              로그인
            </Link>
          </div>
        </div>

        {/* Right — Decorative catalog */}
        <div className="hidden md:flex flex-col justify-center px-14 py-24">
          <p className="text-[var(--text-faint)] text-xs tracking-[0.35em] uppercase mb-6">
            Sample Collection
          </p>
          <div className="border-t border-[var(--border)]">
            {SAMPLE_ITEMS.map((item, i) => (
              <div
                key={i}
                className="flex items-center justify-between py-3.5 border-b border-[var(--border)] group cursor-default"
              >
                <p className="text-sm text-[var(--text)] group-hover:text-[var(--accent)] transition-colors duration-200">
                  {item.title}
                </p>
                <p className="text-xs text-[var(--text-faint)] shrink-0 ml-4">{item.sub}</p>
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="px-8 md:px-14 py-5 border-t border-[var(--border)] flex justify-between items-center text-xs text-[var(--text-faint)]">
        <p>© {new Date().getFullYear()} Recollect</p>
        <div className="flex gap-6">
          <a href="#" className="hover:text-[var(--text-muted)] transition-colors">Privacy</a>
          <a href="#" className="hover:text-[var(--text-muted)] transition-colors">GitHub</a>
        </div>
      </footer>
    </div>
  );
}
