// Verbatim snapshot of the content that used to be hardcoded in components,
// used only to seed the database so launching the CMS doesn't blank the live site.

export const services = [
  {
    slug: "dev",
    order: 0,
    tag: "Développement",
    headline: "On ne livre pas du code.",
    headlineAccent: "On livre de la croissance.",
    desc: "Applications web & mobile sur mesure, ERP, CRM, plateformes métier. Du prototype au système d'information complet.",
    items: [
      "Sites & e-commerce",
      "Apps métier sur mesure",
      "Mobile iOS & Android",
      "APIs & intégrations",
    ],
    featured: false,
    badge: null,
    color: "#3B82F6",
    icon: "Code2",
    imageUrl:
      "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=600&h=900&fit=crop&q=80",
  },
  {
    slug: "callcenter",
    order: 1,
    tag: "Call Center",
    headline: "50 voix.",
    headlineAccent: "Votre support permanent.",
    desc: "Prospection B2B, qualification de fichiers, support client bilingue FR/EN depuis Antananarivo.",
    items: [
      "Prospection B2B",
      "Qualification de fichiers",
      "Support entrant & sortant",
      "Reporting temps réel",
    ],
    featured: false,
    badge: "50 postes",
    color: "#F59E0B",
    icon: "Phone",
    imageUrl: "/images/callcenter-fetra.png",
  },
  {
    slug: "marketing",
    order: 2,
    tag: "Marketing Digital",
    headline: "Votre audience existe déjà.",
    headlineAccent: "On va la trouver.",
    desc: "SEO, SEA, réseaux sociaux, analytics. Une stratégie orientée résultats mesurables.",
    items: [
      "SEO / SEA",
      "Réseaux sociaux",
      "Email marketing",
      "Analytics & reporting",
    ],
    featured: false,
    badge: null,
    color: "#EC4899",
    icon: "TrendingUp",
    imageUrl: "/images/services/mark.jpg",
  },
  {
    slug: "digital",
    order: 3,
    tag: "Digitalisation",
    headline: "Vos processus papier",
    headlineAccent: "coûtent de l'argent.",
    desc: "Audit, conseil, déploiement ERP/CRM, formation équipes. Transformation numérique complète.",
    items: [
      "Audit & conseil",
      "Déploiement ERP/CRM",
      "Automatisation (RPA)",
      "Formation & conduite",
    ],
    featured: false,
    badge: null,
    color: "#10B981",
    icon: "RefreshCw",
    imageUrl: "/images/services/digit.jpg",
  },
  {
    slug: "data",
    order: 4,
    tag: "Traitement de données",
    headline: "Vos données dorment.",
    headlineAccent: "On les réveille.",
    desc: "Numérisation, saisie, nettoyage, structuration et analyse. Physique comme numérique.",
    items: [
      "Numérisation documents",
      "Nettoyage & déduplication",
      "Structuration & migration",
      "Visualisation & analyse",
    ],
    featured: false,
    badge: null,
    color: "var(--brand)",
    icon: "Database",
    imageUrl:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=900&fit=crop&q=80",
  },
  {
    slug: "materiel",
    order: 5,
    tag: "Matériel IT",
    headline: "L'infrastructure",
    headlineAccent: "qui tient la route.",
    desc: "Ordinateurs, serveurs, réseau, périphériques. Conseil, livraison et installation B2B sur Antananarivo et régions.",
    items: [
      "Postes de travail & laptops",
      "Serveurs & NAS",
      "Réseau (Cisco, Ubiquiti)",
      "Installation & support",
    ],
    featured: false,
    badge: null,
    color: "#06B6D4",
    icon: "Server",
    imageUrl:
      "https://images.unsplash.com/photo-1518770660439-4636190af475?w=600&h=900&fit=crop&q=80",
  },
  {
    slug: "comptabilite",
    order: 6,
    tag: "Comptabilité",
    headline: "Vos chiffres,",
    headlineAccent: "enfin lisibles.",
    desc: "Saisie comptable, rapprochements bancaires, reporting financier mensuel. Des décisions éclairées, fondées sur des données fiables.",
    items: [
      "Saisie comptable & TVA",
      "Rapprochements bancaires",
      "Reporting mensuel",
      "Tableaux de bord dirigeants",
    ],
    featured: false,
    badge: null,
    color: "#EF4444",
    icon: "DollarSign",
    imageUrl:
      "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=600&h=900&fit=crop&q=80",
  },
];

export const projectTagMeta = [
  { name: "CALL CENTER", color: "#F59E0B", bg: "rgba(245,158,11,0.10)", border: "rgba(245,158,11,0.30)", order: 0 },
  { name: "DÉVELOPPEMENT", color: "#3B82F6", bg: "rgba(59,130,246,0.10)", border: "rgba(59,130,246,0.30)", order: 1 },
  { name: "MARKETING", color: "#EC4899", bg: "rgba(236,72,153,0.10)", border: "rgba(236,72,153,0.30)", order: 2 },
  { name: "DIGITALISATION", color: "#10B981", bg: "rgba(16,185,129,0.10)", border: "rgba(16,185,129,0.30)", order: 3 },
  { name: "DONNÉES", color: "#8B5CF6", bg: "rgba(139,92,246,0.10)", border: "rgba(139,92,246,0.30)", order: 4 },
  { name: "INFRASTRUCTURE", color: "#06B6D4", bg: "rgba(6,182,212,0.10)", border: "rgba(6,182,212,0.30)", order: 5 },
];

export const projects = [
  { tag: "DÉVELOPPEMENT", title: "Application de gestion de boutique cosmétique & habillement", desc: "Solution de gestion de magasin en temps réel pour une boutique de cosmétique et prêt-à-porter. Gestion des stocks, des commerçants, transferts de produits par employé et chat intégré.", metrics: ["Flux de stock en temps réel", "Chat client intégré", "Gestion multi-commerçants"], order: 0 },
  { tag: "CALL CENTER", title: "Prospection B2B France — Secteur Immobilier", desc: "Campagne de qualification de fichiers et prise de rendez-vous pour un réseau d'agences immobilières français. 3 mois, 12 agents dédiés, 400+ RDV qualifiés livrés.", metrics: ["400+ RDV qualifiés", "12 agents", "3 mois"], order: 1 },
  { tag: "CALL CENTER", title: "Support client multicanal — E-commerce FR", desc: "Gestion des appels entrants, emails et chat pour une boutique en ligne française. 98% de satisfaction client mesuré sur 6 mois.", metrics: ["98% satisfaction", "8 agents", "6 mois"], order: 2 },
  { tag: "DÉVELOPPEMENT", title: "Plateforme de gestion RH — Secteur Education", desc: "Application web de gestion du personnel pour un réseau d'écoles privées à Madagascar. 500 utilisateurs, gestion des contrats, paie et congés.", metrics: ["500 utilisateurs", "React + Node.js", "6 mois"], order: 3 },
  { tag: "DÉVELOPPEMENT", title: "Application mobile logistique iOS/Android", desc: "Application React Native de suivi de flotte et gestion des livraisons. Synchronisation temps réel, offline-first, 200 chauffeurs.", metrics: ["200 utilisateurs", "React Native", "4 mois"], order: 4 },
  { tag: "MARKETING", title: "Refonte SEO & campagnes Google Ads", desc: "Audit SEO complet, refonte de la stratégie de contenu et gestion de campagnes Google Ads pour un e-commerçant français. +180% de trafic organique.", metrics: ["+180% trafic", "+45% conversions", "6 mois"], order: 5 },
  { tag: "MARKETING", title: "Stratégie social media B2B — LinkedIn", desc: "Community management et stratégie de contenu LinkedIn pour un cabinet de conseil. Audience triplée, 15 leads qualifiés par mois.", metrics: ["×3 audience", "15 leads/mois", "4 mois"], order: 6 },
  { tag: "DIGITALISATION", title: "Déploiement ERP Odoo — PME Madagascar", desc: "Migration d'un système papier vers Odoo pour une entreprise de distribution. Comptabilité, stocks, achats et ventes centralisés. Formation de 30 employés.", metrics: ["30 utilisateurs", "Odoo", "4 mois"], order: 7 },
  { tag: "DIGITALISATION", title: "SIRH sur mesure — Réseau d'hôtels", desc: "Logiciel de gestion RH adapté au droit malgache pour un groupe hôtelier. Bulletins de paie, gestion des plannings, suivi des absences.", metrics: ["250 employés", "Sur mesure", "5 mois"], order: 8 },
  { tag: "DONNÉES", title: "Traitement & enrichissement base CRM", desc: "Nettoyage et enrichissement d'une base de 50 000 contacts pour une société de marketing direct. Déduplication, vérification emails, enrichissement secteur.", metrics: ["50 000 contacts", "98% précision", "3 semaines"], order: 9 },
  { tag: "DONNÉES", title: "Numérisation archives documentaires", desc: "12 ans d'archives papier numérisés, indexés et classés en GED pour un cabinet notarial. Recherche full-text, conformité RGPD.", metrics: ["80 000 docs", "GED complète", "2 mois"], order: 10 },
  { tag: "INFRASTRUCTURE", title: "Équipement réseau bureau — Antananarivo", desc: "Installation complète réseau WiFi, câblage structuré, NAS et postes de travail pour un cabinet de 25 personnes.", metrics: ["25 postes", "Infrastructure complète", "2 semaines"], order: 11 },
  { tag: "INFRASTRUCTURE", title: "Infrastructure réseau ONG internationale", desc: "Modernisation complète de l'infrastructure réseau d'une ONG internationale, 3 sites à Antananarivo. Zéro downtime pendant les travaux.", metrics: ["3 sites", "Cisco", "3 semaines"], order: 12 },
];

export const jobTagMeta = [
  { name: "CALL CENTER", color: "#F59E0B", bg: "rgba(245,158,11,0.10)", border: "rgba(245,158,11,0.30)", order: 0 },
  { name: "DÉVELOPPEMENT", color: "#3B82F6", bg: "rgba(59,130,246,0.10)", border: "rgba(59,130,246,0.30)", order: 1 },
  { name: "MARKETING", color: "#EC4899", bg: "rgba(236,72,153,0.10)", border: "rgba(236,72,153,0.30)", order: 2 },
  { name: "DIGITALISATION", color: "#10B981", bg: "rgba(16,185,129,0.10)", border: "rgba(16,185,129,0.30)", order: 3 },
  { name: "DONNÉES", color: "#8B5CF6", bg: "rgba(139,92,246,0.10)", border: "rgba(139,92,246,0.30)", order: 4 },
  { name: "COMPTABILITÉ", color: "#EF4444", bg: "rgba(239,68,68,0.10)", border: "rgba(239,68,68,0.30)", order: 5 },
  { name: "INFRASTRUCTURE", color: "#06B6D4", bg: "rgba(6,182,212,0.10)", border: "rgba(6,182,212,0.30)", order: 6 },
];

export const jobOffers = [
  { tag: "CALL CENTER", title: "Agent Call Center Bilingue FR/EN", contrat: "CDI · Temps plein", lieu: "Antananarivo", niveau: "Débutant accepté", desc: "Rejoignez notre plateau de 50 postes pour la prospection B2B et le support client de nos clients français et internationaux. Formation assurée dès l'intégration.", missions: ["Prospection B2B", "Support client FR/EN", "Qualification de fichiers", "Prise de rendez-vous"], urgent: true, order: 0 },
  { tag: "CALL CENTER", title: "Superviseur Plateau Call Center", contrat: "CDI · Temps plein", lieu: "Antananarivo", niveau: "2 ans d'expérience", desc: "Encadrez une équipe d'agents, suivez les indicateurs de performance et garantissez la qualité de service sur nos campagnes B2B et support client.", missions: ["Management d'équipe", "Suivi KPI", "Reporting client", "Formation continue"], urgent: true, order: 1 },
  { tag: "DÉVELOPPEMENT", title: "Développeur Full-Stack Next.js / Node.js", contrat: "CDI · Temps plein", lieu: "Antananarivo / Hybride", niveau: "2+ ans d'expérience", desc: "Concevez et développez des applications web et mobiles pour nos clients européens et africains. Stack moderne, standards de code exigeants.", missions: ["Développement Next.js/React", "APIs Node.js", "Revue de code", "Déploiement CI/CD"], urgent: false, order: 2 },
  { tag: "DÉVELOPPEMENT", title: "Développeur React Native", contrat: "CDI · Temps plein", lieu: "Antananarivo / Hybride", niveau: "1+ an d'expérience", desc: "Participez au développement d'applications mobiles iOS/Android pour des clients dans la logistique, l'e-commerce et les services.", missions: ["Développement React Native", "Intégration API", "Tests & débogage", "Publication stores"], urgent: false, order: 3 },
  { tag: "MARKETING", title: "Chargé(e) de Marketing Digital & SEO", contrat: "CDI · Temps plein", lieu: "Antananarivo", niveau: "1+ an d'expérience", desc: "Pilotez des campagnes SEO, Google Ads et social media pour des clients français et malgaches. Résultats mesurables, reporting mensuel.", missions: ["SEO & contenu", "Campagnes Google/Meta Ads", "Community management", "Analytics & reporting"], urgent: false, order: 4 },
  { tag: "DIGITALISATION", title: "Consultant ERP Odoo", contrat: "CDI · Temps plein", lieu: "Antananarivo", niveau: "2+ ans d'expérience", desc: "Accompagnez nos clients dans le déploiement et la configuration d'ERP Odoo : comptabilité, stocks, ventes, RH.", missions: ["Paramétrage Odoo", "Formation utilisateurs", "Migration de données", "Support post-déploiement"], urgent: false, order: 5 },
  { tag: "DONNÉES", title: "Data Analyst / Traitement de Données", contrat: "CDI · Temps plein", lieu: "Antananarivo", niveau: "Débutant accepté", desc: "Nettoyage, enrichissement et analyse de bases de données pour des clients en marketing direct et gestion de la relation client.", missions: ["Saisie & nettoyage", "Déduplication", "Analyse & dataviz", "Automatisation ETL"], urgent: false, order: 6 },
  { tag: "COMPTABILITÉ", title: "Comptable Externalisation FR", contrat: "CDI · Temps plein", lieu: "Antananarivo", niveau: "2+ ans d'expérience", desc: "Gérez la saisie comptable, les rapprochements bancaires et le reporting mensuel pour un portefeuille de clients français.", missions: ["Saisie comptable", "Rapprochements bancaires", "Reporting mensuel", "Relation client dédiée"], urgent: false, order: 7 },
  { tag: "INFRASTRUCTURE", title: "Technicien Support IT & Réseau", contrat: "CDI · Temps plein", lieu: "Antananarivo", niveau: "1+ an d'expérience", desc: "Installation et maintenance de parcs informatiques, réseaux et serveurs pour nos clients à Antananarivo.", missions: ["Installation postes & réseau", "Maintenance parc IT", "Support utilisateurs", "Câblage structuré"], urgent: false, order: 8 },
];

export const blogPosts = [
  { slug: "externaliser-call-center-madagascar", tag: "CALL CENTER", publishedAt: new Date("2026-05-01"), title: "Externaliser son call center à Madagascar : ce que personne ne vous dit", excerpt: "Madagascar n'est pas le premier pays qui vient à l'esprit pour l'externalisation. C'est exactement pourquoi les entreprises qui y vont en premier gardent un avantage compétitif durable.", readtime: "5 min" },
  { slug: "nextjs-14-migration-projets-clients", tag: "DÉVELOPPEMENT", publishedAt: new Date("2026-04-01"), title: "Next.js 14 : pourquoi on a migré tous nos projets clients dessus", excerpt: "App Router, Server Components, performances Core Web Vitals. Retour d'expérience après 12 mois de projets en production sur Next.js 14.", readtime: "8 min" },
  { slug: "erp-sur-mesure-vs-odoo", tag: "DIGITALISATION", publishedAt: new Date("2026-04-01"), title: "ERP sur mesure vs Odoo : comment choisir pour une PME ?", excerpt: "La question revient sur chaque projet de digitalisation. Voici notre grille de décision après avoir déployé les deux solutions pour des dizaines d'entreprises.", readtime: "6 min" },
  { slug: "seo-b2b-erreurs-qui-coutent-cher", tag: "MARKETING", publishedAt: new Date("2026-03-01"), title: "SEO pour entreprises B2B : les 3 erreurs qui coûtent cher", excerpt: "Le SEO B2B n'obéit pas aux mêmes règles que le B2C. Volume faible, intentions précises, cycle long. Voici ce qu'on ne corrige plus chez nos clients.", readtime: "4 min" },
  { slug: "nettoyer-base-crm-50000-contacts", tag: "DONNÉES", publishedAt: new Date("2026-03-01"), title: "Comment nettoyer une base CRM de 50 000 contacts en 3 semaines", excerpt: "Déduplication, validation emails, enrichissement sectoriel. Le processus exact qu'on a utilisé pour un client marketing direct.", readtime: "7 min" },
  { slug: "antananarivo-hub-tech-ocean-indien", tag: "STRATÉGIE", publishedAt: new Date("2026-02-01"), title: "Pourquoi Antananarivo devient le hub tech de l'océan Indien", excerpt: "Universités techniques, vivier de talents bilingues, coûts compétitifs. Les données derrière la montée en puissance de la tech malgache.", readtime: "5 min" },
];

export const testimonialsHome = [
  { quote: "On cherchait un call center francophone fiable pour nos campagnes B2B en France. On a trouvé une équipe qui comprend nos prospects mieux que certains de nos propres commerciaux. Taux de prise de RDV en hausse de 40% dès le deuxième mois.", author: "François B.", role: "Directeur Commercial", company: "PME industrielle, Lyon", tag: "Call Center", color: "#D4AF37", gradientColor: "from-amber-500/20 to-yellow-600/10", context: "home", order: 0 },
  { quote: "Livraison en 6 semaines, dans les délais et dans le budget. Le code est propre, la documentation complète. On a déjà démarré un deuxième projet — cette fois plus ambitieux.", author: "Hery R.", role: "Directeur Général", company: "Groupe éducatif, Antananarivo", tag: "Développement Web", color: "#3B82F6", gradientColor: "from-blue-500/20 to-blue-600/10", context: "home", order: 1 },
  { quote: "80 000 documents numérisés en trois mois, zéro interruption de service. Chaque fichier est indexé, searchable, conforme RGPD. Label Technology a transformé une contrainte en vrai avantage opérationnel.", author: "Isabelle M.", role: "Directrice des Systèmes d'Information", company: "Institution publique, Madagascar", tag: "Traitement de données", color: "#10B981", gradientColor: "from-emerald-500/20 to-teal-600/10", context: "home", order: 2 },
];

export const testimonialsAbout = [
  { quote: "En 18 mois de partenariat, Label Technology est devenu une extension naturelle de notre équipe. Réactivité, qualité, transparence — c'est rare de trouver les trois ensemble.", author: "François D.", role: "CEO", company: "Startup B2B, Paris", tag: null, color: null, gradientColor: null, context: "about", order: 0 },
  { quote: "On a commencé par un projet de développement web, puis on leur a confié notre call center, puis notre SEO. Aujourd'hui ils gèrent 3 pôles pour nous. C'est la définition d'un partenaire.", author: "Marie-Claire V.", role: "COO", company: "Groupe retail, Lyon", tag: null, color: null, gradientColor: null, context: "about", order: 1 },
  { quote: "La combinaison de talent local et standards européens qu'ils proposent est vraiment unique en Afrique de l'Est. On les recommande systématiquement à notre réseau.", author: "Dr. Andry R.", role: "Président", company: "Association Tech Madagascar", tag: null, color: null, gradientColor: null, context: "about", order: 2 },
];
