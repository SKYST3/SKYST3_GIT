import { TeamSelectForm } from '@/widgets/team-select';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/select-team')({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="flex items-center justify-center min-h-dvh bg-cool-gray-0">
      <TeamSelectForm />
    </div>
  );
}
