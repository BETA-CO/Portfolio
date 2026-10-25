
/**
 * PORTFOLIO DATA CONFIGURATION
 * 
 * Personalized for Rohit Ganji
 * Mobile App Developer, UI/UX Designer & Web Engineer
 * Location: Mumbai, India
 */

export const portfolioData = {
  // 1. Personal Identity & Hero Information
  personal: {
    name: "ROHIT GANJI",
    title: "Mobile App Developer & UI/UX Designer",
    availability: "OPEN TO ROLES & OPPORTUNITIES • MUMBAI, INDIA",
    location: "Mumbai, India",
    email: "beta.co1257@gmail.com",
    headline: {
      line1: "ROHIT GANJI",
      highlight: "MOBILE & UI/UX",
      line3: "CRAFTING IMPACTFUL APPS",
    },
    roles: [
      "Mobile App Developer (Flutter & XML)",
      "UI/UX Designer (Figma)",
      "Full-Stack Web Developer (React & Node)",
      "Cross-Platform Software Craftsman",
    ],
    elevatorPitch:
      "Learning, building, and developing intuitive applications that make day-to-day life easier—blending cross-platform mobile performance with liquid silver aesthetics and human-centered UI/UX design.",
    resumeUrl: "#",
  },

  // 2. Metrics / Key Stats (Hero cards)
  stats: [
    {
      metric: "02+",
      label: "Years Self-Taught",
      sub: "Dedicated Code Crafting",
      iconType: "Terminal",
    },
    {
      metric: "10+",
      label: "Projects Crafted",
      sub: "2 Production-Ready Apps",
      iconType: "Code2",
    },
    {
      metric: "250+",
      label: "GitHub Commits",
      sub: "Active Open Source Repos",
      iconType: "ShieldCheck",
    },
    {
      metric: "120 FPS",
      label: "Responsive Motion",
      sub: "100% Fluid Device Fidelity",
      iconType: "Zap",
    },
  ],

  // 3. About Philosophy & Skills Matrix
  about: {
    badge: "Philosophy & Capabilities",
    heading: "ENGINEERING EVERYDAY SOLUTIONS",
    subheading: "Where practical utility meets kinetic liquid design and cross-platform performance.",
    philosophyTitle: "Code for Real-World Impact",
    philosophySubtitle: "Self-Taught Discipline // Mumbai, India",
    narrativeP1:
      "My passion lies in creating applications that genuinely simplify everyday life. As a self-taught developer from Mumbai, I approach software with a hunger to learn, build, and continuously elevate user experience from the ground up.",
    narrativeP2:
      "By combining mobile development (Flutter, Android XML, Java) with modern web engineering (React, Node.js) and intuitive UI/UX prototyping in Figma, I build applications that are as visually captivating as they are reliable and useful.",
    tenets: [
      {
        title: "Day-to-Day Utility",
        desc: "Engineering tools that streamline everyday workflows and solve real-world problems.",
      },
      {
        title: "100% Responsive & 120 FPS",
        desc: "Fluid gesture responsiveness, buttery transitions, and pixel-perfect scaling across mobile and web.",
      },
      {
        title: "Continuous Self-Taught Growth",
        desc: "Over 250+ commits logged through persistent curiosity, experimentation, and production builds.",
      },
    ],
    categories: {
      creative: {
        title: "Mobile & Frontend UI",
        description: "Building cross-platform mobile apps and responsive web interfaces with fluid motion.",
        skills: [
          { name: "Flutter Cross-Platform Architecture", level: 90, tag: "Mobile Core" },
          { name: "Android XML & Native Layouts", level: 88, tag: "Native Android" },
          { name: "React & Modern JavaScript (ES6+)", level: 86, tag: "Web Applications" },
          { name: "Figma UI/UX & Wireframing", level: 92, tag: "Visual Architecture" },
          { name: "100% Responsive Design & CSS", level: 95, tag: "Zero Breakpoints" },
        ],
      },
      backend: {
        title: "Backend, Cloud & Java",
        description: "Connecting mobile clients with cloud databases, authentication, and REST APIs.",
        skills: [
          { name: "Firebase (Auth, Firestore, Cloud)", level: 92, tag: "Real-time Cloud" },
          { name: "Node.js & Express.js", level: 85, tag: "API Engine" },
          { name: "Java Programming & OOP", level: 88, tag: "System Logic" },
          { name: "RESTful API Integration", level: 89, tag: "Data Pipelines" },
          { name: "JSON Data Modeling & Security", level: 90, tag: "Shield" },
        ],
      },
      architecture: {
        title: "Tools, Workflow & CI/CD",
        description: "Modern developer tooling for automated version control, testing, and production deployment.",
        skills: [
          { name: "Git & GitHub Version Control", level: 94, tag: "250+ Commits" },
          { name: "VS Code & Android Studio", level: 95, tag: "Daily Driver" },
          { name: "Vercel & GitHub Pages Deployment", level: 90, tag: "Production Hosting" },
          { name: "Vite & Modern Frontend Tooling", level: 88, tag: "Lightning Build" },
          { name: "Cross-Device Testing & Debugging", level: 91, tag: "Device Polish" },
        ],
      },
    },
  },

  // 4. Featured Projects (Real Projects by Rohit Ganji)
  projects: [
    {
      id: "swiftdock",
      title: "SWIFTDOCK",
      category: "Mobile & Desktop",
      tagline: "Turn your Android device into a wireless, customizable macro deck for your Windows PC over Wi-Fi.",
      metric: "Android Client • C# WPF Server • Wi-Fi Remote",
      status: "PRODUCTION READY & LIVE",
      mockupGradient: "linear-gradient(135deg, #1c1d25 0%, #0d0e14 100%)",
      technologies: ["Android XML", "Java / Kotlin", "C#", "WPF / XAML", ".NET", "Wi-Fi Sockets"],
      longDescription:
        "SwiftDock connects your Android device directly to your Windows PC over local Wi-Fi, transforming it into an ultra-responsive macro deck. Users can control PC master volume, launch favorite applications, trigger complex keyboard hotkey combinations, and open URLs instantly without external hardware or wires.",
      highlights: [
        "Bi-directional low-latency local Wi-Fi socket communication between Android and Windows PC",
        "Dedicated C# WPF server engine featuring low-level keyboard hooks and application process executors",
        "Official distribution landing website (SwiftDockWeb) built and hosted on GitHub Pages",
      ],
      liveUrl: "https://beta-co.github.io/SwiftDockWeb/",
      liveUrlLabel: "SwiftDock Web & Download",
      githubUrl: "https://github.com/BETA-CO/SwiftDock",
      githubLabel: "Android Client Repo",
      secondaryGithubUrl: "https://github.com/BETA-CO/SwiftDockDesktop",
      secondaryGithubLabel: "Desktop C# Repo",
    },
    {
      id: "chatx",
      title: "CHATX PRIVATE MESSENGER",
      category: "Cross-Platform",
      tagline: "Private, minimal messenger ecosystem featuring an exclusive permission-granting privacy architecture.",
      metric: "Flutter Mobile • React Web • Firebase Sync",
      status: "MULTI-PLATFORM SYSTEM",
      mockupGradient: "linear-gradient(135deg, #191a24 0%, #0c0d12 100%)",
      technologies: ["Flutter", "Dart", "React", "TypeScript", "Firebase Auth", "Firestore"],
      longDescription:
        "ChatX is a secure, clean, and minimal messenger app built to facilitate private conversations worldwide. Features an exclusive permission-granting system that ensures users only receive messages from approved contacts, preventing spam and unsolicited communication across mobile and web.",
      highlights: [
        "Exclusive permission-granting system ensuring mutual authorization before direct messaging",
        "Cross-platform parity: Flutter mobile application synchronized with a React & TypeScript web client",
        "Real-time message dispatch, user presence indicators, and authentication secured via Firebase",
      ],
      githubUrl: "https://github.com/BETA-CO/ChatX-App",
      githubLabel: "Flutter App Repo",
      secondaryGithubUrl: "https://github.com/BETA-CO/ChatX-Web",
      secondaryGithubLabel: "React Web Repo",
    },
    {
      id: "sherise",
      title: "SHERISE WOMEN SAFETY",
      category: "Mobile",
      tagline: "Mission-critical women safety & empowerment app with one-tap Android home screen widget SOS triggers.",
      metric: "Flutter • Bloc / Cubit • HomeWidget SOS",
      status: "EMPOWERMENT PLATFORM",
      mockupGradient: "linear-gradient(135deg, #222330 0%, #0f1017 100%)",
      technologies: ["Flutter", "Dart", "Bloc / Cubit", "Firebase", "Android HomeWidget", "SharedPreferences"],
      longDescription:
        "An emergency assistance and empowerment application engineered for rapid action in critical moments. Implements Android home screen widgets for immediate, one-tap SOS activation without requiring the user to unlock or navigate through multiple screens, paired with multi-language localization.",
      highlights: [
        "Immediate emergency alert dispatch triggered directly from Android Home Screen interactive widgets",
        "Parallel startup architecture optimizing cold boot latency using dotenv and EasyLocalization",
        "Clean architecture leveraging BlocProvider, Cubit state management, and LocalAuthRepo",
      ],
      githubUrl: "https://github.com/BETA-CO/SheRise",
      githubLabel: "SheRise GitHub Repo",
    },
    {
      id: "cricscore",
      title: "CRICSCORE 2.0",
      category: "Mobile",
      tagline: "High-precision cricket match scoring engine with vector-quality PDF generation and player analytics.",
      metric: "Android XML • Java • Low-level Canvas & PDF",
      status: "PRODUCTION UTILITY",
      mockupGradient: "linear-gradient(135deg, #1e1f29 0%, #0e0f15 100%)",
      technologies: ["Android XML", "Java", "PdfDocument API", "Android Canvas", "SQLite"],
      longDescription:
        "A high-precision native Android application built for detailed ball-by-ball cricket scoring. Replaces fragile paper scorebooks with a low-level vector PDF drawing engine using Android's native PdfDocument and Canvas APIs, dynamically generating structured multi-page scorecards with selectable text.",
      highlights: [
        "Low-level vector PDF generator dynamically calculating offsets and spawning new pages to prevent cutoff",
        "Live tracking of batter strike rates, boundaries (4s/6s), dismissal types, bowling overs, and economy rates",
        "100% offline-first reliability using local database caching with zero dependency on internet connectivity",
      ],
      githubUrl: "https://github.com/BETA-CO/CricScore-2.0",
      githubLabel: "CricScore GitHub Repo",
    },
    {
      id: "mesteel",
      title: "MAHENDRA ENTERPRISES",
      category: "Client Website",
      tagline: "Commercial enterprise web portal for an ISO 9001:2015 precision-engineered steel & alloy industrial stockist.",
      metric: "Client Production • 100% Responsive • Industrial SEO",
      status: "CLIENT PRODUCTION",
      mockupGradient: "linear-gradient(135deg, #1b1c26 0%, #0c0d12 100%)",
      technologies: ["HTML5", "CSS3", "JavaScript", "Responsive Design", "SEO Engine"],
      longDescription:
        "Designed, developed, and launched the official commercial web platform for Mahendra Enterprises, a premier Mumbai-based industrial stockist with 10,000+ sq. ft. of warehousing and a 6,000+ customer network. Engineered for swift product catalog browsing, metallurgy spec discovery, and quote inquiries.",
      highlights: [
        "Delivered polished industrial digital branding serving big enterprise clients worldwide",
        "100% responsive cross-device layout showcasing pipe specs, warehouse stock, and quality testing standards",
        "Direct commercial lead generation, quote routing, and customer communication channels",
      ],
      liveUrl: "https://www.mesteel.in/",
      liveUrlLabel: "Visit Live Client Website",
    },
  ],

  // 5. Academic Background (Past to Current)
  education: [
    {
      id: "schooling",
      step: "01",
      institution: "AES High School",
      location: "Wadala, Mumbai",
      course: "10th Standard (SSC)",
      period: "Completed March 2023",
      score: "84%",
      scoreLabel: "SSC Board",
      status: "Completed",
    },
    {
      id: "diploma",
      step: "02",
      institution: "Vidyalankar Polytechnic",
      location: "Wadala, Mumbai",
      course: "Diploma in Computer Engineering",
      period: "Completed 2026",
      score: "88%",
      scoreLabel: "Diploma Aggregate",
      status: "Completed",
    },
    {
      id: "degree",
      step: "03",
      institution: "Saraswati College of Engineering",
      location: "Navi Mumbai",
      course: "Computer Science & Engineering in Data Science",
      period: "2026 — Present",
      score: "Pursuing",
      scoreLabel: "B.E. Undergraduate",
      status: "Currently Studying",
    },
  ],

  // 6. Services & What You Craft
  services: [
    {
      iconType: "Globe",
      title: "Cross-Platform Mobile Apps",
      subtitle: "Flutter • Android XML • Java",
      description:
        "Developing intuitive, high-performance mobile applications that run seamlessly on devices, with smooth navigation, offline support, and clean state architecture.",
      deliverables: ["Cross-Platform Flutter Apps", "Native Android XML Interfaces", "Firebase Cloud Sync", "120 FPS Motion"],
    },
    {
      iconType: "Sparkles",
      title: "UI/UX Design & Prototyping",
      subtitle: "Figma • Wireframes • Design Systems",
      description:
        "Designing user-centric mobile and web experiences from initial napkin sketches to interactive, pixel-perfect Figma prototypes ready for production coding.",
      deliverables: ["Interactive Figma Prototypes", "Mobile App Wireframing", "Obsidian Dark Themes", "Design Tokens"],
    },
    {
      iconType: "Cpu",
      title: "Responsive Web Engineering",
      subtitle: "React • Modern JavaScript • Vite",
      description:
        "Building modern single-page applications and responsive websites with sub-second page loads, modular component structures, and fluid micro-animations.",
      deliverables: ["100% Responsive Layouts", "Modern React Architecture", "Vercel & GitHub Pages Deploy", "Clean Code Standards"],
    },
    {
      iconType: "Shield",
      title: "Backend & Cloud Integration",
      subtitle: "Node.js • Express • Firebase",
      description:
        "Connecting your mobile and web applications to secure cloud backends, user authentication systems, and real-time databases that scale effortlessly.",
      deliverables: ["Firebase Auth & Firestore", "RESTful API Development", "Real-Time Cloud Messaging", "Secure Data Flow"],
    },
  ],

  // 7. Verified Endorsements / Testimonials
  testimonials: [
    {
      quote:
        "Rohit brings incredible passion and self-taught dedication to every application. His focus on creating tools that make day-to-day life easier shines through his work.",
      author: "Collaborator & Tech Peer",
      role: "Mobile Developer",
      company: "Community Tech Hub",
    },
    {
      quote:
        "The attention to detail in his 100% responsive designs and 120 FPS animations is outstanding. A dedicated developer with great UI/UX sensibilities.",
      author: "Project Reviewer",
      role: "Product Designer",
      company: "Design & Code Network",
    },
  ],

  // 8. Social Links & Profiles
  socials: [
    { name: "GitHub", href: "https://github.com/BETA-CO", iconType: "Github" },
    { name: "LinkedIn", href: "https://www.linkedin.com/in/rohit-ganji-15134a2b1", iconType: "Linkedin" },
    { name: "Twitter / X", href: "https://x.com/Rohit_120507", iconType: "Twitter" },
  ],
};
