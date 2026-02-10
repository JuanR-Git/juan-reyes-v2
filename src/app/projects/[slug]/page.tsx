import { notFound } from "next/navigation";
import { getProjectBySlug, getAllProjects } from "@/lib/projects";
import ProjectLayout from "@/components/project-layout";

const componentMap: Record<string, React.ComponentType> = {
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

  return (
    <ProjectLayout project={project}>
      {Component ? (
        <Component />
      ) : (
        <p className="text-fg-muted text-sm tracking-wider py-12">
          Project description coming soon.
        </p>
      )}
    </ProjectLayout>
  );
}
