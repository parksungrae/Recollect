'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/useAuthStore';

export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuthStore();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    setLoading(true);
    const result = await login(email, password);
    setLoading(false);
    if (result.error) {
      setError(result.error);
    } else {
      router.push('/app');
    }
  }

  function fillDemo() {
    setEmail('test@test.com');
    setPassword('1234');
  }

  return (
    <div className="min-h-screen bg-[var(--bg)] text-[var(--text)] flex">

      {/* Left — Decorative */}
      <div className="hidden lg:flex w-[45%] border-r border-[var(--border)] flex-col justify-between p-12 bg-[var(--bg-card)]">
        <Link href="/" className="font-[family-name:var(--font-display)] text-xl tracking-[0.25em] font-light uppercase text-[var(--text)]">
          Recollect
        </Link>
        <div>
          <h2 className="font-[family-name:var(--font-display)] text-5xl font-light leading-[1.15] text-[var(--text)]">
            모든 컬렉션의<br />
            <em>이야기를</em><br />
            기억합니다.
          </h2>
        </div>
        <p className="text-xs text-[var(--text-faint)] tracking-wider">LP · CD · 책 · 그리고 더</p>
      </div>

      {/* Right — Form */}
      <div className="flex-1 flex items-center justify-center px-8 py-12">
        <div className="w-full max-w-sm space-y-7">

          {/* Mobile logo */}
          <div className="lg:hidden">
            <Link href="/" className="font-[family-name:var(--font-display)] text-2xl tracking-[0.25em] font-light uppercase">
              Recollect
            </Link>
          </div>

          <div>
            <h1 className="font-[family-name:var(--font-display)] text-4xl font-light">
              다시 접속
            </h1>
            <p className="text-sm text-[var(--text-muted)] mt-1.5">컬렉션이 기다리고 있습니다</p>
          </div>

          {/* Google login */}
          <button
            disabled
            className="w-full flex items-center justify-center gap-3 border border-[var(--border)] bg-[var(--bg-card)] px-4 py-3 text-sm opacity-35 cursor-not-allowed"
            title="준비 중"
          >
            <GoogleIcon />
            Google로 로그인 (준비 중)
          </button>

          <div className="flex items-center gap-3 text-xs text-[var(--text-faint)]">
            <div className="flex-1 h-px bg-[var(--border)]" />
            or
            <div className="flex-1 h-px bg-[var(--border)]" />
          </div>

          {/* Email form */}
          <form onSubmit={handleSubmit} className="space-y-3">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="이메일"
              required
              className="w-full bg-[var(--bg-input)] border border-[var(--border)] px-4 py-3 text-sm outline-none focus:border-[var(--accent)] transition-colors placeholder:text-[var(--text-faint)]"
            />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="비밀번호"
              required
              className="w-full bg-[var(--bg-input)] border border-[var(--border)] px-4 py-3 text-sm outline-none focus:border-[var(--accent)] transition-colors placeholder:text-[var(--text-faint)]"
            />

            {error && (
              <p className="text-[var(--destructive)] text-xs px-1">{error}</p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[var(--accent)] hover:bg-[var(--accent-hover)] disabled:opacity-50 text-[var(--accent-fg)] py-3 text-sm font-medium tracking-wide transition-colors"
            >
              {loading ? '로그인 중...' : '로그인'}
            </button>
          </form>

          <div className="flex items-center justify-between text-xs">
            <button
              onClick={fillDemo}
              className="text-[var(--text-faint)] hover:text-[var(--text-muted)] transition-colors"
            >
              데모 계정으로 채우기
            </button>
            <Link href="/signup" className="text-[var(--text-muted)] hover:text-[var(--accent)] transition-colors">
              회원가입 →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

function GoogleIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
    </svg>
  );
}
