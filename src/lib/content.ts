export const site = {
  name: "Kairo",
  tagline: "A cash-flowing AI agency",
  description:
    "Kairo builds a fully automated AI business: website design, SEO, GEO, AEO, a mobile application, and an AI agent that runs marketing and follow-up.",
  email: "hello@kairo.ai",
  phone: "+1 (415) 555-0142",
};

export const trustedBy = [
  "Website design",
  "SEO",
  "GEO",
  "AEO",
  "Mobile application",
  "AI agent",
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
    id: "website-design",
    title: "Website design",
    description:
      "A conversion-focused website that explains the offer and hands visitors into marketing, follow-up, and sales.",
    guarantee: "Unhappy? Don't pay",
    metric: "01",
    metricLabel: "build the site",
    problem:
      "Attention has nowhere useful to land. Without a clear site, social, search, and campaigns cannot turn a visit into a lead.",
    approach: [
      "Shape the offer so a new visitor understands it quickly",
      "Design the pages marketing and social will send people to",
      "Place the forms and calls to action that start a lead",
      "Connect the site to the AI agent for follow-up",
    ],
    outcomes: [
      "A website that supports leads and sales",
      "A clear next step for every visitor",
      "A starting point for the rest of the system",
    ],
  },
  {
    id: "seo",
    title: "SEO",
    description:
      "Search engine optimization so the website can be found for the searches your buyers already type.",
    guarantee: "Built into the website, not bolted on later",
    metric: "02",
    metricLabel: "search visibility",
    problem:
      "A new site stays invisible if pages are not structured for search. Traffic never starts, so the funnel stays empty.",
    approach: [
      "Map the pages to the searches that match the offer",
      "Write titles, headings, and page copy for those searches",
      "Keep the site fast and clear enough for search engines to read",
      "Send the visits into the same lead path as campaigns",
    ],
    outcomes: [
      "Pages that can rank for real searches",
      "A steady path from search to the website",
      "Leads that can be followed up",
    ],
  },
  {
    id: "geo",
    title: "GEO",
    description:
      "Generative engine optimization so AI answers can mention the business when someone asks a related question.",
    guarantee: "Written so AI systems can quote the offer clearly",
    metric: "03",
    metricLabel: "AI answers",
    problem:
      "Buyers ask ChatGPT and other AI tools instead of only scrolling search results. If the offer is vague, the business never appears in those answers.",
    approach: [
      "State the offer in plain language an AI model can reuse",
      "Publish clear pages for the questions people ask",
      "Keep facts consistent across the site and marketing",
      "Point those answers at the website and the next step",
    ],
    outcomes: [
      "A clearer presence inside AI-generated answers",
      "The same offer, told the same way everywhere",
      "Visits that still land on the website",
    ],
  },
  {
    id: "aeo",
    title: "AEO",
    description:
      "Answer engine optimization so the business is the direct answer, not only a link buried under a result.",
    guarantee: "One clear answer for each important question",
    metric: "04",
    metricLabel: "direct answers",
    problem:
      "Search and AI surfaces show a short answer first. Pages that never answer the question lose the click.",
    approach: [
      "Pick the questions a buyer asks before they buy",
      "Answer each one in the first lines of the page",
      "Use structure that answer engines can lift",
      "Send the reader to a form, a call, or the agent",
    ],
    outcomes: [
      "Pages that answer before they sell",
      "A better chance to be the cited answer",
      "A handoff into follow-up",
    ],
  },
  {
    id: "mobile-application",
    title: "Mobile application",
    description:
      "A mobile app for the parts of the business people need in their pocket: offers, leads, and the next action.",
    guarantee: "The app serves the same offer as the website",
    metric: "05",
    metricLabel: "on the phone",
    problem:
      "The website captures the visit, then the conversation dies when the person is away from a desktop.",
    approach: [
      "Decide which actions must work on a phone",
      "Build the app around leads, follow-up, and the offer",
      "Keep the same path as the website and campaigns",
      "Hand repeat work to the AI agent",
    ],
    outcomes: [
      "A mobile place for the same business system",
      "Leads that can be worked from a phone",
      "One offer across site, search, and app",
    ],
  },
  {
    id: "ai-agent",
    title: "AI agent",
    description:
      "Access to an AI agent platform that researches, writes, follows up, and helps book the next conversation.",
    guarantee: "A person reviews anything that should not send itself",
    metric: "06",
    metricLabel: "agent platform",
    problem:
      "Leads arrive and then sit. Nobody researches them, writes the note, or books the call.",
    approach: [
      "Connect a chat model, memory, Gmail, and Google Calendar",
      "Add HTTP requests, a calculator, and knowledge search",
      "Run agents for cold email, research, marketing, and follow-up",
      "Show leads, replies, and booked calls on the dashboard",
    ],
    outcomes: [
      "An agent that moves the repeat work",
      "Cold email that starts with research, not a blast",
      "A dashboard for campaigns and follow-up",
    ],
  },
];

export const capabilities = [
  {
    number: "01",
    title: "Website and presence",
    text: "Build the website, then social and marketing so the offer has somewhere to send people.",
  },
  {
    number: "02",
    title: "SEO, GEO, and AEO",
    text: "Make the business findable in search, in AI answers, and as the direct answer to a question.",
  },
  {
    number: "03",
    title: "Marketing campaigns",
    text: "Set up and launch campaigns that create visits, leads, and sales conversations.",
  },
  {
    number: "04",
    title: "Mobile application",
    text: "Put the same offer and follow-up on a phone, so the path does not stop at the desktop.",
  },
  {
    number: "05",
    title: "AI agent platform",
    text: "Connect a chat model, memory, Gmail, Google Calendar, HTTP, and search so follow-up can run.",
  },
];

export const platformSteps = [
  {
    title: "Connect",
    text: "Link a chat model with memory, Gmail, Google Calendar, HTTP requests, and search.",
  },
  {
    title: "Launch",
    text: "Put the website, campaigns, and mobile app on one offer.",
  },
  {
    title: "Automate",
    text: "The AI agent researches, writes, follows up, and helps book the next conversation.",
  },
  {
    title: "Review",
    text: "Read leads, replies, booked calls, and campaigns on the dashboard.",
  },
];

export const results = [
  {
    company: "Example view",
    industry: "Source video",
    title: "Dashboard of leads, calls, and cash",
    detail:
      "The source video shows a sample dashboard: contacted leads, positive replies, booked calls, and cash collected. Those figures are an example view, not verified Kairo client results.",
    tags: ["Example", "Not a guarantee"],
    value: 35,
    suffix: "k",
  },
  {
    company: "Example view",
    industry: "Source video",
    title: "Cold email campaigns in one place",
    detail:
      "The video shows a cold email campaign agent with active campaigns, reply rate, and booked calls. It is a product example, not a promise of those numbers.",
    tags: ["AI agent", "Example"],
    value: 4,
    suffix: "",
  },
  {
    company: "The offer",
    industry: "Cash-flowing AI agency",
    title: "Unhappy? Don't pay",
    detail:
      "The whiteboard in the source video states the guarantee in plain language. Paid scope is still confirmed in writing.",
    tags: ["Guarantee"],
    value: 0,
    suffix: "",
  },
];

export const testimonials = [
  {
    quote:
      "A fully automated AI business starts with the website, then search, then campaigns, then the agent that follows up.",
    name: "The path",
    role: "Website → SEO, GEO, AEO → campaigns → agent",
  },
  {
    quote:
      "GEO is how the offer shows up inside an AI answer. AEO is how it becomes the short answer itself. SEO is how search still finds the page.",
    name: "The visibility",
    role: "SEO, GEO, and AEO",
  },
  {
    quote:
      "The agent connects a chat model, memory, Gmail, Google Calendar, HTTP requests, a calculator, and knowledge search.",
    name: "The workflow",
    role: "AI agent platform",
  },
  {
    quote:
      "The mobile app carries the same offer off the desktop, so a lead can still move to a call.",
    name: "The phone",
    role: "Mobile application",
  },
];

export const faqs = [
  {
    q: "What does Kairo do?",
    a: "Kairo builds a cash-flowing AI business: website design, SEO, GEO, AEO, a mobile application, and an AI agent for marketing and follow-up.",
  },
  {
    q: "What are SEO, GEO, and AEO?",
    a: "SEO helps the site show up in search. GEO helps it show up when an AI model writes an answer. AEO helps the business be the short, direct answer to a buyer’s question.",
  },
  {
    q: "What does the AI agent connect to?",
    a: "The agent platform connects a chat model, memory, Gmail, Google Calendar, HTTP requests, a calculator, and knowledge search. Typical work includes cold email, research, marketing, and follow-up. A person reviews what should not send itself.",
  },
  {
    q: "What does the mobile application cover?",
    a: "The app carries the same offer as the website: leads, the next action, and follow-up, so the business is not only a desktop site.",
  },
  {
    q: "What if the work is not right?",
    a: "The offer on the source material is simple: unhappy, don't pay. Scope is confirmed in writing before paid work starts.",
  },
];

export function getSolution(id: string) {
  return solutions.find((s) => s.id === id);
}
