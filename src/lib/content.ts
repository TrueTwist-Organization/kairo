export const site = {
  name: "Kairo",
  tagline: "AI agents for enterprise operations",
  description:
    "Kairo deploys governed AI agents that capture how your process actually runs, then audit and execute work inside SAP, portals, spreadsheets, and inboxes — with humans in control.",
  email: "hello@kairo.ai",
  phone: "+1 (415) 555-0142",
};

export const trustedBy = [
  "Rohlik Group",
  "Notino",
  "Brand24",
  "Injective",
  "Semrush",
  "Trasti",
  "GenHealth",
  "Mosaic",
];

export type Solution = {
  id: string;
  title: string;
  description: string;
  guarantee: string;
  metric: string;
  metricLabel: string;
  problem: string;
  approach: string[];
  outcomes: string[];
};

export const solutions: Solution[] = [
  {
    id: "freight",
    title: "Freight Audit",
    description:
      "Audit 100% of carrier invoices against contracts before payment. Typically recover 3–5% of freight spend.",
    guarantee: "Find at least 3% or the audit is free",
    metric: "3–5%",
    metricLabel: "spend recovered",
    problem:
      "Carrier invoices slip through with rate errors, accessorials, and contract mismatches. Teams sample a fraction — leakage compounds every month.",
    approach: [
      "Ingest invoices, contracts, and shipment data from TMS, email, and portals",
      "Agents match every line to contracted rates and service levels",
      "Exceptions queue for human approval before claims are filed",
      "Evidence packs write back to finance systems with full audit trails",
    ],
    outcomes: [
      "100% invoice coverage instead of sampling",
      "Typical 3–5% freight spend recovered",
      "Claims filed with contract-backed evidence",
    ],
  },
  {
    id: "payables",
    title: "Payables Audit",
    description:
      "Match supplier invoices to POs, receipts, and contracts before the payment run.",
    guarantee: "Find 5× the run price or it’s free",
    metric: "5×",
    metricLabel: "validated value",
    problem:
      "Payment runs push duplicate invoices, missed credits, and PO mismatches. Finding them after money leaves is expensive and slow.",
    approach: [
      "Reconcile invoices against POs, goods receipts, and statements",
      "Flag duplicates, price variance, and missing credits before payment",
      "Route high-risk items through human approval gates",
      "Export validated exceptions with replayable run history",
    ],
    outcomes: [
      "Errors caught before the payment run",
      "Guaranteed validated value vs. pilot price",
      "Finance-ready evidence for every exception",
    ],
  },
  {
    id: "inventory",
    title: "Inventory Ops",
    description:
      "Replenishment, transfers, and availability workflows across ERP and supplier portals.",
    guarantee: "Human approval on every sensitive write",
    metric: "15%",
    metricLabel: "availability lift",
    problem:
      "Stock gaps hide across warehouses, portals, and spreadsheets. Planners chase exceptions manually while availability slips.",
    approach: [
      "Monitor availability signals across ERP and supplier portals",
      "Propose replenishment and transfer actions with context",
      "Require human approval on every sensitive write-back",
      "Close the loop with status updates and exception learning",
    ],
    outcomes: [
      "Faster gap closure across sites",
      "Measurable availability lift in weeks",
      "Operators stay in control of writes",
    ],
  },
  {
    id: "claims",
    title: "Claims & Deductions",
    description:
      "Dispute OTIF fines, recover deductions, and close returns with full evidence packs.",
    guarantee: "Audit-ready run history on every case",
    metric: "E2E",
    metricLabel: "case closure",
    problem:
      "OTIF fines and deductions pile up without owners. Evidence is scattered — disputes stall and money stays unrecovered.",
    approach: [
      "Detect fine and deduction events from carrier and retailer feeds",
      "Assemble shipment, contract, and correspondence evidence",
      "Draft disputes and route for human sign-off",
      "Track cases to closure with end-to-end audit history",
    ],
    outcomes: [
      "Faster dispute cycles with complete packs",
      "Recovered deductions with clear ownership",
      "Audit-ready history for every case",
    ],
  },
];

export const capabilities = [
  {
    number: "01",
    title: "Process capture",
    text: "Walkthroughs, interviews, and documents become a shared process catalogue with BPMN export.",
  },
  {
    number: "02",
    title: "Governed agents",
    text: "Agents run across APIs, browsers, and files with RBAC, SSO, policy gates, and approvals.",
  },
  {
    number: "03",
    title: "Outcome guarantees",
    text: "Fixed price per completed unit of work — not seats, not toolkit licenses.",
  },
  {
    number: "04",
    title: "Evidence by default",
    text: "Every action writes back with replayable audit trails for finance and ops sign-off.",
  },
  {
    number: "05",
    title: "Messy systems ready",
    text: "Where APIs are incomplete, Kairo combines hosted connections, browser automation, and MCP.",
  },
];

export const platformSteps = [
  {
    title: "Capture",
    text: "Map the real process from walkthroughs, systems, and documents.",
  },
  {
    title: "Govern",
    text: "Set policies, roles, and human approval gates before agents act.",
  },
  {
    title: "Execute",
    text: "Run across SAP, portals, sheets, and inboxes — APIs or browsers.",
  },
  {
    title: "Prove",
    text: "Write outcomes back with evidence packs finance can sign off.",
  },
];

export const results = [
  {
    company: "Notino",
    industry: "E-commerce",
    title: "Freed ~€40M working capital",
    detail: "DSO cut from 70–120 days to 15 with automated collections ops.",
    tags: ["Finance", "Working capital"],
    value: 40,
    suffix: "M€",
  },
  {
    company: "Rohlik Group",
    industry: "Grocery logistics",
    title: "€2.1M revenue protected / year",
    detail: "Inbound invoice errors fixed at source before payment leakage.",
    tags: ["Payables", "Supply chain"],
    value: 2.1,
    suffix: "M€",
  },
  {
    company: "Pilulka",
    industry: "Health retail",
    title: "15% stock availability in 2 weeks",
    detail: "Replenishment agents closed gaps across warehouses and suppliers.",
    tags: ["Inventory", "Ops"],
    value: 15,
    suffix: "%",
  },
];

export const testimonials = [
  {
    quote:
      "Kairo moves at startup speed while keeping craft, clarity, and control — rare for enterprise automation.",
    name: "Bryant Chou",
    role: "Co-Founder, Ploy AI",
  },
  {
    quote:
      "They understood the operational mess. Agents handled the repetitive work; our team kept the judgment calls.",
    name: "Julie Lee",
    role: "Injective",
  },
  {
    quote:
      "Quick iterations, clear communication, and deliverables that exceeded what we scoped for finance ops.",
    name: "Maxim Shen",
    role: "Mosaic Markets",
  },
  {
    quote:
      "World-class execution with Slack-native project rhythm. Responsiveness and design of the ops UI were top-notch.",
    name: "Michał Sadowski",
    role: "Brand24",
  },
];

export const faqs = [
  {
    q: "What does Kairo do, and who is it for?",
    a: "Kairo is an agentic automation platform for supply chain, logistics, and finance leaders. Production agents capture real processes, then audit and run work inside your existing systems with humans in the loop.",
  },
  {
    q: "How are Kairo agents different from chatbots or RPA?",
    a: "Agents execute real operational work across SAP, portals, spreadsheets, and inboxes. They pause for human approval on sensitive actions, keep audit trails, and are sold against guaranteed business outcomes — not seats.",
  },
  {
    q: "Can agents work without clean APIs?",
    a: "Yes. Hosted connections, browser automation, custom MCP servers, and approval gates let agents work across messy enterprise systems.",
  },
  {
    q: "Is there a public sandbox?",
    a: "Evaluation workspaces are provisioned after a technical demo or approved pilot. Book a call and we’ll set up a scoped environment for your team.",
  },
  {
    q: "How do pilots and pricing work?",
    a: "Pilots run on a fixed price per completed unit of work. Outcomes are measurable — recoveries found, cases closed, hours returned — before you scale.",
  },
];

export function getSolution(id: string) {
  return solutions.find((s) => s.id === id);
}
