export interface EducationItem {
  id: string;
  degree: string;
  institution: string;
  specialization?: string;
  focusAreas: string[];
  description: string;
}

export interface SkillCategory {
  name: string;
  iconName: string;
  skills: {
    name: string;
    description: string;
    badge?: string;
  }[];
}

export interface ProjectItem {
  id: string;
  title: string;
  tagline: string;
  description: string;
  category: "Cybersecurity & ML" | "Web Development" | "Systems & Tools";
  technologies: string[];
  keyFeatures: string[];
  problem: string;
  approach: string;
  solution: string;
  githubUrl?: string; // Only provided when authentic link exists
  demoUrl?: string;   // Only provided when authentic link exists
  isFeatured: boolean;
  status: "Completed" | "In Development" | "Upcoming";
  metrics?: { label: string; value: string }[];
}

export const PORTFOLIO_DATA = {
  personal: {
    name: "Prince Prajapati",
    headline: "Building Digital Experiences. Exploring Cybersecurity. Solving Real-World Problems.",
    location: "Mumbai, Maharashtra, India",
    timeZone: "Asia/Kolkata (IST)",
    availability: "Open to Internships, Projects & Full-time Roles",
    identities: [
      "Aspiring Web Developer",
      "Cybersecurity Enthusiast",
      "Information Technology Student",
    ],
    aboutMe:
      "I'm a final-year B.Tech Information Technology student specializing in Cybersecurity. I enjoy building technology-driven solutions and exploring the intersection of software development, network security, and threat detection. I'm passionate about learning new technologies, experimenting with ideas, and solving real-world problems.",
    careerGoals:
      "Aiming to bridge robust software engineering with defensive security architectures. Dedicated to building secure, performant web applications and proactive threat-detection systems that safeguard digital infrastructure.",
    interests: [
      "Defensive Security & Threat Detection",
      "Modern Web Development (React & FastAPI)",
      "Network Protocol Analysis & Packet Inspection",
      "Cloud Security & SASE Frameworks",
      "Automated Security Telemetry & Monitoring",
    ],
    socialLinks: {
      // Configurable links - update with authentic URLs
      github: "https://github.com/princep266",
      linkedin: "https://www.linkedin.com/in/prince-prajapat",
      email: "princeprajapati8392@gmail.com",
    },
    resume: {
      filename: "Prince_Prajapati.pdf",
      url: "/Prince_Prajapati.pdf",
      lastUpdated: "November 2026",
    },
  },

  education: [
    {
      id: "btech-it",
      degree: "B.Tech in Information Technology",
      specialization: "Cybersecurity Honors",
      institution: "Shree L.R. Tiwari College of Engineering",
      focusAreas: [
        "Network Defense & Forensics",
        "Cyber Threat Intelligence",
        "Cryptography & Access Controls",
        "Modern Software Architecture",
        "Database Systems & Security",
      ],
      description:
        "Comprehensive engineering curriculum concentrated on defensive cybersecurity, secure application lifecycles, and modern distributed systems.",
    },
    {
      id: "diploma-ce",
      degree: "Diploma in Computer Engineering",
      institution: "Thakur Polytechnic",
      focusAreas: [
        "Core Computer Systems & Architecture",
        "Object-Oriented Programming",
        "Data Structures & Algorithms",
        "Computer Networking Protocols",
        "Web Technologies Fundamentals",
      ],
      description:
        "Rigorous technical foundation in computing fundamentals, systems programming, network configurations, and practical hardware-software integration.",
    },
  ] as EducationItem[],

  skillCategories: [
    {
      name: "Programming",
      iconName: "Code2",
      skills: [
        { name: "Python", description: "Scripting, machine learning automation, socket programming, security tool development." },
        { name: "JavaScript", description: "Modern ES6+, asynchronous paradigms, dynamic frontend workflows, client-side interactions." },
      ],
    },
    {
      name: "Frontend Development",
      iconName: "Layout",
      skills: [
        { name: "React.js", description: "Component-driven user interfaces, state management, custom hooks, responsive web design." },
        { name: "React Native", description: "Cross-platform mobile application development with reusable architectures." },
      ],
    },
    {
      name: "Backend Development",
      iconName: "Server",
      skills: [
        { name: "FastAPI", description: "High-performance Python web APIs, async request handling, automated OpenAPI documentation." },
      ],
    },
    {
      name: "Database",
      iconName: "Database",
      skills: [
        { name: "PostgreSQL", description: "Relational schema design, ACID transactions, complex queries, indexing." },
        { name: "Firebase", description: "Realtime data synchronization, authentication integration, cloud datastores." },
      ],
    },
    {
      name: "Network Security",
      iconName: "ShieldAlert",
      skills: [
        { name: "Wireshark", description: "Deep packet inspection, protocol decoding, pcap traffic analysis, forensic anomaly identification." },
        { name: "Nmap", description: "Port scanning, host discovery, service enumeration, network topology mapping." },
        { name: "tcpdump", description: "Command-line packet capture, raw traffic filtering, low-overhead network diagnostics." },
      ],
    },
    {
      name: "Security Monitoring",
      iconName: "Activity",
      skills: [
        { name: "Snort", description: "Rule-based Network Intrusion Detection System (NIDS), packet logging, signature inspection." },
        { name: "Wazuh", description: "Unified XDR and SIEM platform, log analysis, threat intelligence, file integrity monitoring." },
        { name: "pfSense", description: "Stateful open-source firewall configuration, routing rules, network traffic segmentation." },
      ],
    },
    {
      name: "Security Tools",
      iconName: "Terminal",
      skills: [
        { name: "Kali Linux", description: "Security auditing OS, penetration testing environment, custom security tooling." },
        { name: "Burp Suite", description: "Web application vulnerability scanning, proxy inspection, HTTP request manipulation." },
      ],
    },
    {
      name: "Other Technologies",
      iconName: "Layers",
      skills: [
        { name: "Git", description: "Distributed version control, atomic commits, branching strategies, collaborative workflows." },
        { name: "GitHub", description: "Remote repository management, code collaboration, pull requests, CI/CD integrations." },
        { name: "DNSSEC", description: "Cryptographic validation of DNS responses, prevention of DNS spoofing and cache poisoning." },
        { name: "Cloud Security", description: "Identity and access management (IAM), principle of least privilege, cloud network posture." },
        { name: "SASE", description: "Secure Access Service Edge architecture, convergence of WAN and comprehensive security services." },
      ],
    },
  ] as SkillCategory[],

  projects: [
    {
      id: "ml-dos-ids",
      title: "ML-Based DoS Intrusion Detection System",
      tagline: "Intelligent packet analysis engine for automated Denial-of-Service threat mitigation.",
      category: "Cybersecurity & ML",
      isFeatured: true,
      status: "Completed",
      description:
        "A machine-learning-based intrusion detection project focused on identifying Denial-of-Service attacks through network packet analysis.",
      problem:
        "Traditional signature-based firewalls often struggle to mitigate polymorphic or high-volume volumetric Denial-of-Service (DoS) floods in real time without causing high false-positive drops on legitimate user traffic.",
      approach:
        "Engineered a feature extraction pipeline for incoming packet flows. Integrated real-time network capture with trained machine learning classifiers to discriminate abnormal burst patterns, SYN flood frequencies, and volumetric anomalies from legitimate sessions.",
      solution:
        "Developed a unified monitoring system integrating pfSense firewall logs, packet capture pipelines, and automated SOC-style security alerts. When anomalous patterns cross confidence thresholds, immediate automated mitigation alerts notify security operators and trigger defensive routing rules.",
      technologies: [
        "Python",
        "Machine Learning",
        "pfSense",
        "Wireshark / Packet Analysis",
        "FastAPI",
        "Network Sockets",
      ],
      keyFeatures: [
        "Network packet analysis with flow feature extraction",
        "pfSense integration for stateful firewall telemetry",
        "Automated SOC-style security alerts with severity levels",
        "Real-time threat detection and live monitoring dashboard",
      ],
      // GitHub & Demo links: Set authentic links here if available; otherwise placeholders handled gracefully
      githubUrl: undefined,
      demoUrl: undefined,
    },
    {
      id: "upcoming-web-project",
      title: "Upcoming Project Showcase",
      tagline: "New secure software engineering project currently in active research & development.",
      category: "Web Development",
      isFeatured: false,
      status: "In Development",
      description:
        "Reserved slot for Prince's next full-stack project combining modern React web engineering with hardened API defenses and PostgreSQL.",
      problem: "Currently in development phase.",
      approach: "Applying secure-by-design patterns, clean TypeScript interfaces, and end-to-end data validation.",
      solution: "Will be published with repository links upon initial release milestone.",
      technologies: ["React.js", "FastAPI", "PostgreSQL", "Tailwind CSS"],
      keyFeatures: [
        "Secure architecture blueprint",
        "Responsive, accessible user interface",
        "Automated API documentation",
      ],
      githubUrl: undefined,
      demoUrl: undefined,
    },
  ] as ProjectItem[],

  contact: {
    headline: "Let's Build Something Meaningful Together.",
    description:
      "I'm always interested in connecting with people, exploring opportunities and working on meaningful technology projects.",
    locationText: "Mumbai, Maharashtra, India",
    responseTime: "Typically responds within 24–48 hours",
  },
};
