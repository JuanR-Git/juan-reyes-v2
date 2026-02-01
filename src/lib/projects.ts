export interface ProjectMeta {
  slug: string;
  title: string;
  description: string;
  tags: string[];
  thumbnail: string;
  year: string;
  category: "software" | "embedded" | "ml";
}

export const projects: ProjectMeta[] = [
  {
    slug: "mcmaster-exoskeleton",
    title: "McMaster Exoskeleton",
    description:
      "A powered upper-body exoskeleton designed to assist rehabilitation patients with controlled, repeatable range-of-motion exercises. Custom actuators, real-time sensor fusion, and a clinician-facing control interface.",
    tags: ["ROS2", "C++", "Python", "SolidWorks", "Embedded"],
    thumbnail: "https://images.unsplash.com/photo-1561557944-6e7860d1a7eb?w=1200&q=85&auto=format&fit=crop",
    year: "2025",
    category: "embedded",
  },
  {
    slug: "chessmate",
    title: "ChessMate",
    description:
      "A robotic chessboard that integrates AI and hardware to create a real-time game experience at home. Magnetic piece movement, computer vision for board state detection, and multiple AI difficulty levels.",
    tags: ["Python", "OpenCV", "Arduino", "Stockfish", "3D Printing"],
    thumbnail: "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExcnRtOWR5NWt1dGV1cXVyOWNqcTN6dHFhbGxhZjV5NWJhMjZlNXZhaiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/3o7TKSjRrfIPjeiVyM/giphy.gif",
    year: "2025",
    category: "embedded",
  },
  {
    slug: "snoopi",
    title: "SNOOPI",
    description:
      "A companion robotic dog for hospital patients. Provides emotional support through responsive behavior, monitors patient vitals via onboard sensors, and alerts staff to anomalies.",
    tags: ["ROS2", "Python", "TensorFlow", "Raspberry Pi", "CAD"],
    thumbnail: "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExaXJ6bWw0OGNkMnJ0ZHBtcmRqeWFhcnFnODl6MWx5aWlhcG5uMHBheSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/mCRJDo24UvJMA/giphy.gif",
    year: "2024",
    category: "embedded",
  },
  {
    slug: "carlos-portfolio",
    title: "Carlos Portfolio",
    description:
      "A portfolio website designed and developed for my brother. Custom design system, smooth animations, and a focus on showcasing creative work with a distinctive visual identity.",
    tags: ["Next.js", "TypeScript", "Tailwind", "Framer Motion"],
    thumbnail: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=1200&q=85&auto=format&fit=crop",
    year: "2024",
    category: "software",
  },
  {
    slug: "trace-ai",
    title: "TraceAI",
    description:
      "A VS Code extension that integrates AI prompts into the GitHub commit workflow. Automatically generates context-aware commit messages, PR descriptions, and changelog entries from staged diffs.",
    tags: ["TypeScript", "VS Code API", "OpenAI", "Git"],
    thumbnail: "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExN2pyMHpteTdtNm9paHlkbmV5MXVtMnVuOGgxMGdzZXJ4d3NibnFnZiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/26tn33aiTi1jkl6H6/giphy.gif",
    year: "2025",
    category: "software",
  },
  {
    slug: "paced",
    title: "Paced",
    description:
      "A pacemaker with an interactive UI for real-time monitoring and settings adjustment. Hardware simulation of cardiac pacing modes with a clinician-facing dashboard for parameter tuning and telemetry.",
    tags: ["Python", "MATLAB", "Simulink", "Tkinter", "Serial"],
    thumbnail: "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExdGV6cWF4Z2NyMHphbmgzNjlhM3d6NW5wdDNrMnB6ZHRuY3J4bSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/l0HlBO7eyXzSZkJri/giphy.gif",
    year: "2024",
    category: "embedded",
  },
  {
    slug: "nba-injury-predictor",
    title: "NBA Injury Predictor",
    description:
      "An application that assesses player statistics, workload metrics, and biomechanical data to predict the likelihood of specific injuries. Machine learning models trained on historical NBA data.",
    tags: ["Python", "scikit-learn", "Pandas", "Flask", "D3.js"],
    thumbnail: "https://images.unsplash.com/photo-1546519638-68e109498ffc?w=1200&q=85&auto=format&fit=crop",
    year: "2025",
    category: "ml",
  },
  {
    slug: "credit-classifier",
    title: "Credit Classifier",
    description:
      "An application that predicts your credit class based on financial history. Ensemble ML models with explainable AI outputs so users understand the factors driving their classification.",
    tags: ["Python", "XGBoost", "SHAP", "FastAPI", "React"],
    thumbnail: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=1200&q=85&auto=format&fit=crop",
    year: "2024",
    category: "ml",
  },
];

export function getAllProjects(): ProjectMeta[] {
  return projects;
}

export function getProjectBySlug(slug: string): ProjectMeta | undefined {
  return projects.find((p) => p.slug === slug);
}
