import { AdminGame } from '@/widgets/admin-game';
import { AdminReady } from '@/widgets/admin-ready';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/admin')({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="h-dvh flex flex-col max-w-[1400px] mx-auto">
      <AdminReady />
      <AdminGame />
    </div>
  );
}
