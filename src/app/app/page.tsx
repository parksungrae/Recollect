'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Plus, X, LogOut } from 'lucide-react';
import { useStore } from '@/store/useStore';
import { useAuthStore } from '@/store/useAuthStore';

export default function AppHome() {
  const { rooms, addRoom, deleteRoom } = useStore();
  const { user, logout } = useAuthStore();
  const router = useRouter();

  function handleLogout() {
    logout();
    router.push('/login');
  }

  const [adding, setAdding] = useState(false);
  const [name, setName] = useState('');
  const [desc, setDesc] = useState('');

  function submit() {
    if (!name.trim()) return;
    addRoom({ name: name.trim(), description: desc.trim() || undefined });
    setName('');
    setDesc('');
    setAdding(false);
  }

  return (
    <div className="min-h-screen bg-[var(--bg)] text-[var(--text)]">

      {/* Top nav */}
      <header className="border-b border-[var(--border)] px-8 md:px-14 py-5 flex items-center justify-between">
        <span className="font-[family-name:var(--font-display)] text-xl tracking-[0.25em] font-light uppercase">
          Recollect
        </span>
        <div className="flex items-center gap-5">
          {user && (
            <span className="text-xs text-[var(--text-muted)] hidden sm:block">{user.name}</span>
          )}
          <button
            onClick={() => setAdding(true)}
            className="flex items-center gap-2 bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-[var(--accent-fg)] px-4 py-2 text-sm font-medium transition-colors"
          >
            <Plus size={14} />
            방 추가
          </button>
          <button
            onClick={handleLogout}
            className="text-[var(--text-faint)] hover:text-[var(--text-muted)] transition-colors"
            title="로그아웃"
          >
            <LogOut size={15} />
          </button>
        </div>
      </header>

      <div className="px-8 md:px-14 py-10 max-w-5xl mx-auto">

        {/* Page title */}
        <div className="mb-8 border-b border-[var(--border)] pb-6">
          <h1 className="font-[family-name:var(--font-display)] text-4xl font-light">방</h1>
          <p className="text-sm text-[var(--text-muted)] mt-1">컬렉션을 보관하는 공간</p>
        </div>

        {/* Add room form */}
        {adding && (
          <div className="mb-8 p-5 border border-[var(--border)] bg-[var(--bg-card)] space-y-3">
            <p className="text-xs text-[var(--text-muted)] uppercase tracking-wider">새 방</p>
            <input
              autoFocus
              value={name}
              onChange={(e) => setName(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && submit()}
              placeholder="방 이름"
              className="w-full bg-[var(--bg-input)] border border-[var(--border)] px-3 py-2.5 text-sm outline-none focus:border-[var(--accent)] transition-colors placeholder:text-[var(--text-faint)]"
            />
            <input
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && submit()}
              placeholder="설명 (선택)"
              className="w-full bg-[var(--bg-input)] border border-[var(--border)] px-3 py-2.5 text-sm outline-none focus:border-[var(--accent)] transition-colors placeholder:text-[var(--text-faint)]"
            />
            <div className="flex gap-2 pt-1">
              <button
                onClick={submit}
                className="bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-[var(--accent-fg)] px-5 py-2 text-sm font-medium transition-colors"
              >
                추가
              </button>
              <button
                onClick={() => setAdding(false)}
                className="px-5 py-2 text-sm text-[var(--text-muted)] hover:text-[var(--text)] transition-colors"
              >
                취소
              </button>
            </div>
          </div>
        )}

        {/* Rooms grid */}
        {rooms.length === 0 ? (
          <div className="text-center py-28 text-[var(--text-faint)] text-sm">
            방을 추가해서 컬렉션을 시작하세요
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-[var(--border)]">
            {rooms.map((room) => (
              <div key={room.id} className="group relative bg-[var(--bg)]">
                <Link
                  href={`/app/room/${room.id}`}
                  className="block p-6 hover:bg-[var(--bg-hover)] transition-colors"
                >
                  <p className="font-[family-name:var(--font-display)] text-2xl font-light">{room.name}</p>
                  {room.description && (
                    <p className="text-xs text-[var(--text-muted)] mt-2">{room.description}</p>
                  )}
                  <p className="text-xs text-[var(--accent)] mt-4 opacity-0 group-hover:opacity-100 transition-opacity">
                    열기 →
                  </p>
                </Link>
                <button
                  onClick={() => deleteRoom(room.id)}
                  className="absolute top-4 right-4 opacity-0 group-hover:opacity-30 hover:!opacity-100 text-[var(--text-muted)] transition-opacity"
                >
                  <X size={13} />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
