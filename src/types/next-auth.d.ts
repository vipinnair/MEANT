import 'next-auth';

declare module 'next-auth' {
  interface Session {
    user: {
      name?: string | null;
      email?: string | null;
      image?: string | null;
      role?: 'admin' | 'committee' | 'member' | null;
      memberId?: string | null;
    };
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    role?: 'admin' | 'committee' | 'member' | null;
    memberId?: string | null;
  }
}
