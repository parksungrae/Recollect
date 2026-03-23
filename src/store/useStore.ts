import { create } from 'zustand';

export interface Room {
  id: string;
  name: string;
  description?: string;
  createdAt: string;
}

export interface Drawer {
  id: string;
  roomId: string;
  name: string;
  description?: string;
  backgroundImage?: string;
  createdAt: string;
}

export interface Item {
  id: string;
  drawerId: string;
  title: string;
  subtitle?: string;
  imageUrl?: string;
  notes?: string;
  createdAt: string;
}

interface AppState {
  rooms: Room[];
  drawers: Drawer[];
  items: Item[];

  addRoom: (room: Omit<Room, 'id' | 'createdAt'>) => void;
  updateRoom: (id: string, data: Partial<Room>) => void;
  deleteRoom: (id: string) => void;

  addDrawer: (drawer: Omit<Drawer, 'id' | 'createdAt'>) => void;
  updateDrawer: (id: string, data: Partial<Drawer>) => void;
  deleteDrawer: (id: string) => void;

  addItem: (item: Omit<Item, 'id' | 'createdAt'>) => void;
  updateItem: (id: string, data: Partial<Item>) => void;
  deleteItem: (id: string) => void;

  viewMode: 'grid' | 'list';
  setViewMode: (mode: 'grid' | 'list') => void;
}

function uid() {
  return Math.random().toString(36).slice(2, 10);
}

// ─── 데모 데이터 ──────────────────────────────────────────────
const DEMO_ROOMS: Room[] = [
  { id: 'r1', name: '음악실', description: '바이닐, CD, 카세트 컬렉션', createdAt: '2024-01-01T00:00:00Z' },
  { id: 'r2', name: '서재', description: '소설, 에세이, 만화책', createdAt: '2024-01-02T00:00:00Z' },
  { id: 'r3', name: '거실 수납장', description: '영화 DVD & 블루레이', createdAt: '2024-01-03T00:00:00Z' },
];

const DEMO_DRAWERS: Drawer[] = [
  { id: 'd1', roomId: 'r1', name: 'LP 서랍', description: '12인치 바이닐', createdAt: '2024-01-01T00:00:00Z' },
  { id: 'd2', roomId: 'r1', name: 'CD 선반', description: '음악 CD', createdAt: '2024-01-01T00:00:00Z' },
  { id: 'd3', roomId: 'r1', name: '카세트 박스', description: '90년대 테이프들', createdAt: '2024-01-01T00:00:00Z' },
  { id: 'd4', roomId: 'r2', name: '소설 1단', description: '한국 소설', createdAt: '2024-01-02T00:00:00Z' },
  { id: 'd5', roomId: 'r2', name: '소설 2단', description: '해외 소설', createdAt: '2024-01-02T00:00:00Z' },
  { id: 'd6', roomId: 'r2', name: '만화책 서랍', description: '단행본', createdAt: '2024-01-02T00:00:00Z' },
  { id: 'd7', roomId: 'r3', name: 'DVD 케이스', description: '영화 DVD', createdAt: '2024-01-03T00:00:00Z' },
  { id: 'd8', roomId: 'r3', name: '블루레이 케이스', description: '4K 블루레이', createdAt: '2024-01-03T00:00:00Z' },
];

const DEMO_ITEMS: Item[] = [
  // LP 서랍
  { id: 'i1',  drawerId: 'd1', title: 'The Dark Side of the Moon', subtitle: 'Pink Floyd', createdAt: '2024-01-01T00:00:00Z' },
  { id: 'i2',  drawerId: 'd1', title: 'OK Computer', subtitle: 'Radiohead', createdAt: '2024-01-01T00:00:00Z' },
  { id: 'i3',  drawerId: 'd1', title: 'Kind of Blue', subtitle: 'Miles Davis', createdAt: '2024-01-01T00:00:00Z' },
  { id: 'i4',  drawerId: 'd1', title: 'Rumours', subtitle: 'Fleetwood Mac', createdAt: '2024-01-01T00:00:00Z' },
  { id: 'i5',  drawerId: 'd1', title: 'Blue', subtitle: 'Joni Mitchell', createdAt: '2024-01-01T00:00:00Z' },
  { id: 'i6',  drawerId: 'd1', title: 'Abbey Road', subtitle: 'The Beatles', createdAt: '2024-01-01T00:00:00Z' },
  { id: 'i7',  drawerId: 'd1', title: 'Thriller', subtitle: 'Michael Jackson', createdAt: '2024-01-01T00:00:00Z' },
  { id: 'i8',  drawerId: 'd1', title: '소년이 온다', subtitle: '한강 (OST LP)', createdAt: '2024-01-01T00:00:00Z' },

  // CD 선반
  { id: 'i9',  drawerId: 'd2', title: 'In Rainbows', subtitle: 'Radiohead', createdAt: '2024-01-01T00:00:00Z' },
  { id: 'i10', drawerId: 'd2', title: 'The Miseducation of Lauryn Hill', subtitle: 'Lauryn Hill', createdAt: '2024-01-01T00:00:00Z' },
  { id: 'i11', drawerId: 'd2', title: 'Random Access Memories', subtitle: 'Daft Punk', createdAt: '2024-01-01T00:00:00Z' },
  { id: 'i12', drawerId: 'd2', title: '2집 Repackage', subtitle: 'IU', createdAt: '2024-01-01T00:00:00Z' },
  { id: 'i13', drawerId: 'd2', title: 'MMLP2', subtitle: 'Eminem', createdAt: '2024-01-01T00:00:00Z' },

  // 카세트 박스
  { id: 'i14', drawerId: 'd3', title: 'Nevermind', subtitle: 'Nirvana', notes: '1991 원본 카세트', createdAt: '2024-01-01T00:00:00Z' },
  { id: 'i15', drawerId: 'd3', title: '서태지와 아이들 2집', subtitle: '서태지와 아이들', createdAt: '2024-01-01T00:00:00Z' },
  { id: 'i16', drawerId: 'd3', title: 'Jagged Little Pill', subtitle: 'Alanis Morissette', createdAt: '2024-01-01T00:00:00Z' },

  // 소설 1단 (한국)
  { id: 'i17', drawerId: 'd4', title: '채식주의자', subtitle: '한강', createdAt: '2024-01-02T00:00:00Z' },
  { id: 'i18', drawerId: 'd4', title: '82년생 김지영', subtitle: '조남주', createdAt: '2024-01-02T00:00:00Z' },
  { id: 'i19', drawerId: 'd4', title: '아몬드', subtitle: '손원평', createdAt: '2024-01-02T00:00:00Z' },
  { id: 'i20', drawerId: 'd4', title: '해리포터와 마법사의 돌', subtitle: 'J.K. 롤링', createdAt: '2024-01-02T00:00:00Z' },
  { id: 'i21', drawerId: 'd4', title: '백년의 고독', subtitle: '가브리엘 가르시아 마르케스', createdAt: '2024-01-02T00:00:00Z' },

  // 소설 2단 (해외)
  { id: 'i22', drawerId: 'd5', title: 'The Stranger', subtitle: 'Albert Camus', createdAt: '2024-01-02T00:00:00Z' },
  { id: 'i23', drawerId: 'd5', title: 'Norwegian Wood', subtitle: 'Haruki Murakami', createdAt: '2024-01-02T00:00:00Z' },
  { id: 'i24', drawerId: 'd5', title: '1984', subtitle: 'George Orwell', createdAt: '2024-01-02T00:00:00Z' },
  { id: 'i25', drawerId: 'd5', title: 'Kafka on the Shore', subtitle: 'Haruki Murakami', createdAt: '2024-01-02T00:00:00Z' },

  // 만화책 서랍
  { id: 'i26', drawerId: 'd6', title: '슬램덩크 1권', subtitle: '이노우에 다케히코', createdAt: '2024-01-02T00:00:00Z' },
  { id: 'i27', drawerId: 'd6', title: '슬램덩크 2권', subtitle: '이노우에 다케히코', createdAt: '2024-01-02T00:00:00Z' },
  { id: 'i28', drawerId: 'd6', title: '원피스 1권', subtitle: '오다 에이이치로', createdAt: '2024-01-02T00:00:00Z' },
  { id: 'i29', drawerId: 'd6', title: '미생 1권', subtitle: '윤태호', createdAt: '2024-01-02T00:00:00Z' },

  // DVD 케이스
  { id: 'i30', drawerId: 'd7', title: '올드보이', subtitle: '박찬욱 감독', createdAt: '2024-01-03T00:00:00Z' },
  { id: 'i31', drawerId: 'd7', title: '기생충', subtitle: '봉준호 감독', createdAt: '2024-01-03T00:00:00Z' },
  { id: 'i32', drawerId: 'd7', title: 'Blade Runner 2049', subtitle: '드니 빌뇌브 감독', createdAt: '2024-01-03T00:00:00Z' },
  { id: 'i33', drawerId: 'd7', title: 'Interstellar', subtitle: '크리스토퍼 놀란 감독', createdAt: '2024-01-03T00:00:00Z' },

  // 블루레이 케이스
  { id: 'i34', drawerId: 'd8', title: 'Dune: Part Two', subtitle: '드니 빌뇌브 감독 (4K)', createdAt: '2024-01-03T00:00:00Z' },
  { id: 'i35', drawerId: 'd8', title: 'Oppenheimer', subtitle: '크리스토퍼 놀란 감독 (4K)', createdAt: '2024-01-03T00:00:00Z' },
  { id: 'i36', drawerId: 'd8', title: '헤어질 결심', subtitle: '박찬욱 감독 (4K)', createdAt: '2024-01-03T00:00:00Z' },
];

export const useStore = create<AppState>((set) => ({
  rooms: DEMO_ROOMS,
  drawers: DEMO_DRAWERS,
  items: DEMO_ITEMS,

  addRoom: (data) =>
    set((s) => ({
      rooms: [...s.rooms, { ...data, id: uid(), createdAt: new Date().toISOString() }],
    })),
  updateRoom: (id, data) =>
    set((s) => ({ rooms: s.rooms.map((r) => (r.id === id ? { ...r, ...data } : r)) })),
  deleteRoom: (id) =>
    set((s) => {
      const drawerIds = s.drawers.filter((d) => d.roomId === id).map((d) => d.id);
      return {
        rooms: s.rooms.filter((r) => r.id !== id),
        drawers: s.drawers.filter((d) => d.roomId !== id),
        items: s.items.filter((i) => !drawerIds.includes(i.drawerId)),
      };
    }),

  addDrawer: (data) =>
    set((s) => ({
      drawers: [...s.drawers, { ...data, id: uid(), createdAt: new Date().toISOString() }],
    })),
  updateDrawer: (id, data) =>
    set((s) => ({ drawers: s.drawers.map((d) => (d.id === id ? { ...d, ...data } : d)) })),
  deleteDrawer: (id) =>
    set((s) => ({
      drawers: s.drawers.filter((d) => d.id !== id),
      items: s.items.filter((i) => i.drawerId !== id),
    })),

  addItem: (data) =>
    set((s) => ({
      items: [...s.items, { ...data, id: uid(), createdAt: new Date().toISOString() }],
    })),
  updateItem: (id, data) =>
    set((s) => ({ items: s.items.map((i) => (i.id === id ? { ...i, ...data } : i)) })),
  deleteItem: (id) =>
    set((s) => ({ items: s.items.filter((i) => i.id !== id) })),

  viewMode: 'grid',
  setViewMode: (mode) => set({ viewMode: mode }),
}));
