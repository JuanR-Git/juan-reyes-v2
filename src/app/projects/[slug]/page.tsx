import { notFound } from "next/navigation";
import { getProjectBySlug, getAllProjects } from "@/lib/projects";
import McMasterExoskeleton from "@/app/projects/components/mcmaster-exoskeleton";

const componentMap: Record<string, React.ComponentType> = {
  "mcmaster-exoskeleton": McMasterExoskeleton,
};

interface Props {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return getAllProjects().map((p) => ({ slug: p.slug }));
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) notFound();

  const Component = componentMap[slug];

  if (!Component) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-fg-muted text-sm tracking-wider">
          Project page coming soon.
        </p>
      </div>
    );
  }

  return <Component />;
}
