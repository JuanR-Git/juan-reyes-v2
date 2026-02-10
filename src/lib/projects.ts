export interface ProjectLink {
  label: string;
  href: string;
  type: "github" | "website" | "devpost" | "documentation";
}

export interface ProjectMeta {
  slug: string;
  title: string;
  description: string;
  tags: string[];
  thumbnail: string;
  year: string;
  category: "software" | "embedded" | "ml";
  links?: ProjectLink[];
}

export const projects: ProjectMeta[] = [
  {
    slug: "mcmaster-exoskeleton",
    title: "Smart-E Pants",
    description:
      "A powered upper-body exoskeleton designed to compete in the Applied Collegiate Exoskeleton Competition. Custom actuators, real-time sensor fusion, and a clinician-facing control interface.",
    tags: ["Python", "C++", "Simulink", "Controls"],
    thumbnail: "/img/smartepants_cover.JPG",
    year: "2025",
    category: "embedded",
    links: [
      { label: "Website", href: "https://www.macexo.com/", type: "website" },
      { label: "GitHub", href: "https://github.com/McMaster-Exoskeleton", type: "github" },
    ],
  },
  {
    slug: "snoopi",
    title: "SNOOPI",
    description:
      "Robotics software for the Unitree Go 2 robot in hospital settings. Built a task management and health monitoring interface, implemented intelligent models with Python and OpenCV, and used ROS2 for sensor data visualization.",
    tags: ["Python", "OpenCV", "ROS2", "Unitree Go 2"],
    thumbnail: "/video/snoopi_cover.mp4",
    year: "2025",
    category: "embedded",
    links: [],
  },
  {
    slug: "chessmate",
    title: "ChessMate",
    description:
      "A robotic chessboard built at Hack the North 2025 that integrates AI and hardware to create a real-time game experience. Magnetic piece movement, computer vision for board state detection, and multiple AI difficulty levels.",
    tags: ["Python", "OpenCV", "Arduino", "Raspberry Pi", "3D Printing"],
    thumbnail: "/video/chessmate_cover.mp4",
    year: "2025",
    category: "embedded",
    links: [
      { label: "Devpost", href: "https://devpost.com/software/chessmate-nwygvq", type: "devpost" },
      { label: "GitHub", href: "https://github.com/o-bm/ChessMate", type: "github" },
    ],
  },
  {
    slug: "carlos-portfolio",
    title: "Photography Portfolio",
    description:
      "A portfolio website designed and developed for my brother. Custom design system, smooth animations, and a focus on showcasing creative work with a distinctive visual identity.",
    tags: ["Next.js", "TypeScript", "Tailwind", "Framer Motion"],
    thumbnail: "/video/carlosPortfolio_cover.mp4",
    year: "2024",
    category: "software",
    links: [
      { label: "Website", href: "https://photography-portfolio-two-omega.vercel.app/", type: "website" },
      { label: "GitHub", href: "https://github.com/JuanR-Git/photography-portfolio", type: "github" },
    ],
  },
  {
    slug: "trace-ai",
    title: "TraceAI",
    description:
      "A VS Code extension built at DeltaHacks 2026 that integrates AI prompts into the GitHub commit workflow. Automatically generates context-aware commit messages, PR descriptions, and changelog entries from staged diffs.",
    tags: ["TypeScript", "VS Code API", "OpenAI", "Git"],
    thumbnail: "/video/traceai_cover.mp4",
    year: "2025",
    category: "software",
    links: [
      { label: "Devpost", href: "https://devpost.com/software/traceai", type: "devpost" },
      { label: "GitHub", href: "https://github.com/umarkhan135/TraceAI", type: "github" },
    ],
  },
  {
    slug: "paced",
    title: "Paced",
    description:
      "A pacemaker with an interactive UI for real-time monitoring and settings adjustment. Hardware simulation of cardiac pacing modes with a clinician-facing dashboard for parameter tuning and telemetry.",
    tags: ["Python", "MATLAB", "Simulink", "Tkinter", "Serial"],
    thumbnail: "/img/paced_cover.png",
    year: "2024",
    category: "embedded",
    links: [
      { label: "Documentation", href: "https://drive.google.com/file/d/1ZIhKlqEDUXXbrAUTR-R1dYmR0VYDw45Z/view", type: "documentation" },
    ],
  },
  {
    slug: "blinking-id",
    title: "Blinking ID",
    description:
      "A digital circuit that sequentially displays 7 of 9 digits of my student ID in a loop. Designed in NI Multisim and built on a breadboard using NAND gates, JK flip-flops, and a seven-segment display.",
    tags: ["NI Multisim", "Digital Logic", "NAND Gates", "JK Flip-Flops"],
    thumbnail: "/video/blinkid_cover.mp4",
    year: "2024",
    category: "embedded",
    links: [],
  },
  {
    slug: "recycle-bot",
    title: "Recycle Bot",
    description:
      "Programmed a Q-Bot robot using custom Python-based simulation software for testing navigation and control algorithms. Validated code in simulation before deploying to physical bots.",
    tags: ["Python", "Robotics", "Simulation", "Navigation"],
    thumbnail: "/video/recycleBot_cover.mp4",
    year: "2023",
    category: "embedded",
    links: [
      { label: "GitHub", href: "https://github.com/JuanR-Git/Recycle-Bot", type: "github" },
    ],
  },
  {
    slug: "juan-reyes-v1",
    title: "Juan Reyes V1.0",
    description:
      "My original portfolio website built in Angular with custom Bootstrap and SCSS styling. Features Particles.js backgrounds, a reactive contact form powered by Formspree, and a typing animation.",
    tags: ["Angular", "Bootstrap", "SCSS", "Particles.js", "Formspree"],
    thumbnail: "/video/juanreyesv1_cover.mp4",
    year: "2022",
    category: "software",
    links: [
      { label: "Website", href: "https://juan-reyes-portfolio.vercel.app/", type: "website" },
      { label: "GitHub", href: "https://github.com/JuanR-Git/juan-reyes", type: "github" },
    ],
  },
  {
    slug: "wary",
    title: "Wary",
    description:
      "A front-end project created at TOHacks 2022. A React-based website for anonymously reporting suspicions within local communities, focused on safety and accessibility.",
    tags: ["React", "JavaScript", "CSS", "Hackathon"],
    thumbnail: "/video/wary_cover.mp4",
    year: "2022",
    category: "software",
    links: [
      { label: "Devpost", href: "https://devpost.com/software/wary", type: "devpost" },
      { label: "GitHub", href: "https://github.com/JuanR-Git/Wary", type: "github" },
    ],
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
    links: [
      { label: "GitHub", href: "https://github.com/JuanR-Git/nba-injury-predictor", type: "github" },
    ],
  },
  {
    slug: "credit-classifier",
    title: "Credit Classifier",
    description:
      "An application that predicts your credit class based on financial history. Ensemble ML models with explainable AI outputs so users understand the factors driving their classification.",
    tags: ["PyTorch", "Neural Networks", "scikit-learn", "Seaborn"],
    thumbnail: "/img/creditcardclass_cover.png",
    year: "2024",
    category: "ml",
    links: [
      { label: "Documentation", href: "https://drive.google.com/file/d/15uYLo_wlJvyOqTWl3uPpSPNr0vupmjIV/view?usp=sharing", type: "documentation" },
    ],
  },
];

export function getAllProjects(): ProjectMeta[] {
  return projects;
}

export function getProjectBySlug(slug: string): ProjectMeta | undefined {
  return projects.find((p) => p.slug === slug);
}
