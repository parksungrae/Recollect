'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { ArrowLeft, Plus, X, LayoutGrid, List } from 'lucide-react';
import { useStore } from '@/store/useStore';

export default function DrawerPage() {
  const { roomId, drawerId } = useParams<{ roomId: string; drawerId: string }>();
  const { drawers, items, addItem, deleteItem, viewMode, setViewMode } = useStore();

  const drawer = drawers.find((d) => d.id === drawerId);
  const drawerItems = items.filter((i) => i.drawerId === drawerId);

  const [adding, setAdding] = useState(false);
  const [title, setTitle] = useState('');
  const [subtitle, setSubtitle] = useState('');

  function submit() {
    if (!title.trim()) return;
    addItem({ drawerId, title: title.trim(), subtitle: subtitle.trim() || undefined });
    setTitle('');
    setSubtitle('');
    setAdding(false);
  }

  if (!drawer) {
    return (
      <div className="min-h-screen bg-[var(--bg)] flex items-center justify-center text-sm text-[var(--text-faint)]">
        서랍을 찾을 수 없습니다
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[var(--bg)] text-[var(--text)]">

      {/* Background image header */}
      {drawer.backgroundImage && (
        <div className="relative h-44 overflow-hidden">
          <img src={drawer.backgroundImage} alt="" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/30 to-[var(--bg)]" />
        </div>
      )}

      {/* Top nav */}
      <header className={`border-b border-[var(--border)] px-8 md:px-14 py-5 flex items-center justify-between ${drawer.backgroundImage ? '' : ''}`}>
        <Link
          href={`/app/room/${roomId}`}
          className="font-[family-name:var(--font-display)] text-xl tracking-[0.25em] font-light uppercase text-[var(--text-muted)] hover:text-[var(--text)] transition-colors"
        >
          Recollect
        </Link>
        <div className="flex items-center gap-3">
          {/* View toggle */}
          <div className="flex items-center border border-[var(--border)] bg-[var(--bg-card)]">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 transition-colors ${viewMode === 'grid' ? 'bg-[var(--accent)] text-[var(--accent-fg)]' : 'text-[var(--text-muted)] hover:text-[var(--text)]'}`}
            >
              <LayoutGrid size={14} />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 transition-colors ${viewMode === 'list' ? 'bg-[var(--accent)] text-[var(--accent-fg)]' : 'text-[var(--text-muted)] hover:text-[var(--text)]'}`}
            >
              <List size={14} />
            </button>
          </div>
          <button
            onClick={() => setAdding(true)}
            className="flex items-center gap-2 bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-[var(--accent-fg)] px-4 py-2 text-sm font-medium transition-colors"
          >
            <Plus size={14} />
            추가
          </button>
        </div>
      </header>

      <div className="px-8 md:px-14 py-10 max-w-5xl mx-auto">

        {/* Breadcrumb + title */}
        <div className="mb-8 border-b border-[var(--border)] pb-6">
          <div className="flex items-center gap-2 text-xs text-[var(--text-faint)] mb-3">
            <Link href={`/app/room/${roomId}`} className="hover:text-[var(--text-muted)] transition-colors flex items-center gap-1">
              <ArrowLeft size={12} />
              서랍 목록
            </Link>
          </div>
          <h1 className="font-[family-name:var(--font-display)] text-4xl font-light">{drawer.name}</h1>
          {drawer.description && (
            <p className="text-sm text-[var(--text-muted)] mt-1">{drawer.description}</p>
          )}
        </div>

        {/* Add item form */}
        {adding && (
          <div className="mb-8 p-5 border border-[var(--border)] bg-[var(--bg-card)] space-y-3">
            <p className="text-xs text-[var(--text-muted)] uppercase tracking-wider">새 아이템</p>
            <input
              autoFocus
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && submit()}
              placeholder="제목"
              className="w-full bg-[var(--bg-input)] border border-[var(--border)] px-3 py-2.5 text-sm outline-none focus:border-[var(--accent)] transition-colors placeholder:text-[var(--text-faint)]"
            />
            <input
              value={subtitle}
              onChange={(e) => setSubtitle(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && submit()}
              placeholder="아티스트 / 저자 (선택)"
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

        {/* Items */}
        {drawerItems.length === 0 ? (
          <div className="text-center py-28 text-[var(--text-faint)] text-sm">
            아이템을 추가해보세요
          </div>
        ) : viewMode === 'grid' ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-px bg-[var(--border)]">
            {drawerItems.map((item) => (
              <div key={item.id} className="group relative bg-[var(--bg)] p-5 hover:bg-[var(--bg-hover)] transition-colors">
                <p className="text-sm font-medium leading-snug">{item.title}</p>
                {item.subtitle && (
                  <p className="text-xs text-[var(--text-muted)] mt-1.5">{item.subtitle}</p>
                )}
                <button
                  onClick={() => deleteItem(item.id)}
                  className="absolute top-3 right-3 opacity-0 group-hover:opacity-30 hover:!opacity-100 text-[var(--text-muted)] transition-opacity"
                >
                  <X size={12} />
                </button>
              </div>
            ))}
          </div>
        ) : (
          <div className="border-t border-[var(--border)]">
            {drawerItems.map((item, idx) => (
              <div key={item.id} className="group flex items-center gap-4 py-3.5 border-b border-[var(--border)] hover:bg-[var(--bg-hover)] px-2 transition-colors">
                <span className="text-xs text-[var(--text-faint)] w-6 text-right shrink-0 font-[family-name:var(--font-display)]">
                  {idx + 1}
                </span>
                <div className="flex-1 min-w-0">
                  <p className="text-sm truncate">{item.title}</p>
                  {item.subtitle && (
                    <p className="text-xs text-[var(--text-muted)] truncate mt-0.5">{item.subtitle}</p>
                  )}
                </div>
                <button
                  onClick={() => deleteItem(item.id)}
                  className="opacity-0 group-hover:opacity-30 hover:!opacity-100 text-[var(--text-muted)] transition-opacity shrink-0"
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
