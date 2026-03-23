'use client';

import { useState, useRef } from 'react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { ArrowLeft, Plus, X, ImageIcon, LayoutGrid, Box } from 'lucide-react';
import dynamic from 'next/dynamic';
import { useStore } from '@/store/useStore';

// Three.js는 SSR 불가 → dynamic import
const ThreeRoom = dynamic(() => import('@/components/ThreeScene/ThreeRoom'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center text-[var(--text-faint)] text-sm">
      3D 로딩 중...
    </div>
  ),
});

type ViewMode = 'grid' | '3d';

export default function RoomPage() {
  const { roomId } = useParams<{ roomId: string }>();
  const router = useRouter();
  const { rooms, drawers, addDrawer, updateDrawer, deleteDrawer } = useStore();

  const room = rooms.find((r) => r.id === roomId);
  const roomDrawers = drawers.filter((d) => d.roomId === roomId);

  const [viewMode, setViewMode] = useState<ViewMode>('grid');
  const [adding, setAdding] = useState(false);
  const [name, setName] = useState('');
  const [desc, setDesc] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [pendingBg, setPendingBg] = useState<string | undefined>();

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setPendingBg(URL.createObjectURL(file));
  }

  function submit() {
    if (!name.trim()) return;
    addDrawer({ roomId, name: name.trim(), description: desc.trim() || undefined, backgroundImage: pendingBg });
    setName(''); setDesc(''); setPendingBg(undefined); setAdding(false);
  }

  function handleBgUpload(drawerId: string) {
    const input = document.createElement('input');
    input.type = 'file'; input.accept = 'image/*';
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (!file) return;
      updateDrawer(drawerId, { backgroundImage: URL.createObjectURL(file) });
    };
    input.click();
  }

  if (!room) {
    return (
      <div className="min-h-screen bg-[var(--bg)] flex items-center justify-center text-sm text-[var(--text-faint)]">
        방을 찾을 수 없습니다
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[var(--bg)] text-[var(--text)] flex flex-col">

      {/* Top nav */}
      <header className="border-b border-[var(--border)] px-8 md:px-14 py-5 flex items-center justify-between shrink-0">
        <Link
          href="/app"
          className="font-[family-name:var(--font-display)] text-xl tracking-[0.25em] font-light uppercase text-[var(--text-muted)] hover:text-[var(--text)] transition-colors"
        >
          Recollect
        </Link>
        <div className="flex items-center gap-3">
          {/* View toggle */}
          <div className="flex items-center border border-[var(--border)] bg-[var(--bg-card)]">
            <button
              onClick={() => setViewMode('grid')}
              className={`flex items-center gap-1.5 px-3 py-2 text-xs transition-colors ${viewMode === 'grid' ? 'bg-[var(--accent)] text-[var(--accent-fg)]' : 'text-[var(--text-muted)] hover:text-[var(--text)]'}`}
            >
              <LayoutGrid size={13} />
              그리드
            </button>
            <button
              onClick={() => setViewMode('3d')}
              className={`flex items-center gap-1.5 px-3 py-2 text-xs transition-colors ${viewMode === '3d' ? 'bg-[var(--accent)] text-[var(--accent-fg)]' : 'text-[var(--text-muted)] hover:text-[var(--text)]'}`}
            >
              <Box size={13} />
              3D
            </button>
          </div>
          <button
            onClick={() => setAdding(true)}
            className="flex items-center gap-2 bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-[var(--accent-fg)] px-4 py-2 text-sm font-medium transition-colors"
          >
            <Plus size={14} />
            서랍 추가
          </button>
        </div>
      </header>

      {/* Breadcrumb + title */}
      <div className="border-b border-[var(--border)] px-8 md:px-14 py-5 shrink-0">
        <div className="flex items-center gap-2 text-xs text-[var(--text-faint)] mb-2">
          <Link href="/app" className="hover:text-[var(--text-muted)] transition-colors flex items-center gap-1">
            <ArrowLeft size={11} />
            방 목록
          </Link>
        </div>
        <h1 className="font-[family-name:var(--font-display)] text-3xl font-light">{room.name}</h1>
        {room.description && (
          <p className="text-xs text-[var(--text-muted)] mt-0.5">{room.description}</p>
        )}
      </div>

      {/* Add drawer form */}
      {adding && (
        <div className="border-b border-[var(--border)] px-8 md:px-14 py-5 bg-[var(--bg-card)] shrink-0">
          <p className="text-xs text-[var(--text-muted)] uppercase tracking-wider mb-3">새 서랍</p>
          <div className="flex flex-wrap gap-3">
            <input
              autoFocus
              value={name}
              onChange={(e) => setName(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && submit()}
              placeholder="서랍 이름"
              className="bg-[var(--bg-input)] border border-[var(--border)] px-3 py-2 text-sm outline-none focus:border-[var(--accent)] transition-colors placeholder:text-[var(--text-faint)] w-48"
            />
            <input
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && submit()}
              placeholder="설명 (선택)"
              className="bg-[var(--bg-input)] border border-[var(--border)] px-3 py-2 text-sm outline-none focus:border-[var(--accent)] transition-colors placeholder:text-[var(--text-faint)] w-48"
            />
            <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={handleFileChange} />
            <button
              onClick={() => fileInputRef.current?.click()}
              className="flex items-center gap-2 text-xs text-[var(--text-muted)] hover:text-[var(--text)] transition-colors border border-[var(--border)] px-3 py-2"
            >
              <ImageIcon size={12} />
              {pendingBg ? '변경' : '배경'}
            </button>
            <button onClick={submit} className="bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-[var(--accent-fg)] px-4 py-2 text-sm font-medium transition-colors">
              추가
            </button>
            <button onClick={() => { setAdding(false); setPendingBg(undefined); }} className="px-4 py-2 text-sm text-[var(--text-muted)] hover:text-[var(--text)] transition-colors">
              취소
            </button>
          </div>
          {pendingBg && (
            <div className="mt-2 w-20 h-12 overflow-hidden border border-[var(--border)]">
              <img src={pendingBg} alt="preview" className="w-full h-full object-cover" />
            </div>
          )}
        </div>
      )}

      {/* Main content — flex-1 so 3D fills remaining height */}
      <div className="flex-1 relative">
        {viewMode === '3d' ? (
          // 3D Room View
          roomDrawers.length === 0 ? (
            <div className="absolute inset-0 flex items-center justify-center text-[var(--text-faint)] text-sm">
              서랍을 추가하면 3D 방에 선반이 생깁니다
            </div>
          ) : (
            <div className="absolute inset-0">
              <ThreeRoom
                roomId={roomId}
                onDrawerClick={(drawerId) =>
                  router.push(`/app/room/${roomId}/drawer/${drawerId}`)
                }
              />
              <div className="absolute bottom-5 right-5 text-[10px] text-[var(--text-faint)] pointer-events-none">
                드래그로 회전 · 스크롤로 줌 · 선반 클릭으로 열기
              </div>
            </div>
          )
        ) : (
          // Grid View
          <div className="px-8 md:px-14 py-8 max-w-5xl mx-auto w-full">
            {roomDrawers.length === 0 ? (
              <div className="text-center py-28 text-[var(--text-faint)] text-sm">
                서랍을 추가해서 시작하세요
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-[var(--border)]">
                {roomDrawers.map((drawer) => (
                  <div key={drawer.id} className="group relative bg-[var(--bg)]">
                    <Link
                      href={`/app/room/${roomId}/drawer/${drawer.id}`}
                      className="block overflow-hidden hover:bg-[var(--bg-hover)] transition-colors"
                    >
                      {drawer.backgroundImage ? (
                        <div className="relative h-36">
                          <img src={drawer.backgroundImage} alt="" className="w-full h-full object-cover" />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                          <div className="absolute bottom-0 left-0 p-4">
                            <p className="font-[family-name:var(--font-display)] text-xl font-light text-white">{drawer.name}</p>
                            {drawer.description && (
                              <p className="text-xs text-white/60 mt-0.5">{drawer.description}</p>
                            )}
                          </div>
                        </div>
                      ) : (
                        <div className="p-6">
                          <p className="font-[family-name:var(--font-display)] text-2xl font-light">{drawer.name}</p>
                          {drawer.description && (
                            <p className="text-xs text-[var(--text-muted)] mt-2">{drawer.description}</p>
                          )}
                          <p className="text-xs text-[var(--accent)] mt-4 opacity-0 group-hover:opacity-100 transition-opacity">
                            열기 →
                          </p>
                        </div>
                      )}
                    </Link>
                    <div className="absolute top-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button
                        onClick={() => handleBgUpload(drawer.id)}
                        className="bg-black/50 hover:bg-black/70 text-white p-1.5 transition-colors"
                        title="배경 이미지 변경"
                      >
                        <ImageIcon size={11} />
                      </button>
                      <button
                        onClick={() => deleteDrawer(drawer.id)}
                        className="bg-black/50 hover:bg-black/70 text-white p-1.5 transition-colors"
                        title="삭제"
                      >
                        <X size={11} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
