'use client';

import { create } from 'zustand';

export interface AuthUser {
  id: string;
  email: string;
  name: string;
}

interface AuthState {
  user: AuthUser | null;
  login: (email: string, password: string) => Promise<{ error?: string }>;
  signup: (name: string, email: string, password: string) => Promise<{ error?: string }>;
  logout: () => void;
}

// 데모 계정 (실제 Supabase 연동 전까지 사용)
const DEMO_ACCOUNTS: (AuthUser & { password: string })[] = [
  { id: 'demo-user', email: 'test@test.com', name: '데모 사용자', password: '1234' },
];

// 런타임에 추가된 계정 임시 저장 (새로고침 시 초기화)
const runtimeAccounts: (AuthUser & { password: string })[] = [];

export const useAuthStore = create<AuthState>((set) => ({
  user: null,

  login: async (email, password) => {
    // TODO: Supabase Auth로 교체
    // const { data, error } = await supabase.auth.signInWithPassword({ email, password })

    await new Promise((r) => setTimeout(r, 600)); // 네트워크 딜레이 시뮬레이션

    const all = [...DEMO_ACCOUNTS, ...runtimeAccounts];
    const match = all.find((a) => a.email === email && a.password === password);

    if (!match) {
      return { error: '이메일 또는 비밀번호가 올바르지 않습니다.' };
    }

    set({ user: { id: match.id, email: match.email, name: match.name } });
    return {};
  },

  signup: async (name, email, password) => {
    // TODO: Supabase Auth로 교체
    // const { data, error } = await supabase.auth.signUp({ email, password, options: { data: { name } } })

    await new Promise((r) => setTimeout(r, 600));

    const all = [...DEMO_ACCOUNTS, ...runtimeAccounts];
    if (all.find((a) => a.email === email)) {
      return { error: '이미 사용 중인 이메일입니다.' };
    }

    const newUser: AuthUser & { password: string } = {
      id: `user-${Math.random().toString(36).slice(2, 8)}`,
      email,
      name,
      password,
    };
    runtimeAccounts.push(newUser);
    set({ user: { id: newUser.id, email: newUser.email, name: newUser.name } });
    return {};
  },

  logout: () => {
    // TODO: await supabase.auth.signOut()
    set({ user: null });
  },
}));
