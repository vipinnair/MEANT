import MemberLayout from '@/components/layout/MemberLayout';

export default function PortalLayout({ children }: { children: React.ReactNode }) {
  return <MemberLayout>{children}</MemberLayout>;
}
