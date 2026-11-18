// Every project of the portfolio, newest first. This file is the single source:
// `node build.mjs` writes the list on the home page and one case page per project from it.
//
// Fields of a project:
//   slug      the URL (/work/<slug>/) and the name of its image in assets/work/
//   cat       claude | automation | product | chatbot (the filter on the home page)
//   summary   the short text of the home page, also the lead of the case page
//   tags      the tech shown on the home page
//   role      optional, what Pablo was in the project
//   context, built, method, result    optional sections of the case page.
//             A string is a paragraph; an array inside the array is a list.
//   stack     [technology, what it did in this project]
//   review    optional key of REVIEWS

export const REVIEWS = {
  webprofits: {
    quote: "Pablo got our whole team working with Claude Code and made us actually use it day to day. He has a way of explaining the hard parts that makes everything click the first time, and we come out of every session having moved forward. Some of the most valuable hours we invest.",
    name: "Alex Cleanthous", role: "Director", company: "Webprofits", url: "https://webprofits.com.au", avatar: "alex-cleanthous.jpg",
  },
  sixgun: {
    quote: "Pablo has helped us a lot to really integrate AI into our systems. He has helped us build a solid AI foundation based on good practices. Highly recommended.",
    name: "David Pagotto", role: "Founder and Managing Director", company: "Sixgun", url: "https://sixgun.com.au", avatar: "david-pagotto.jpg",
  },
  shape: {
    quote: "Most consultants just follow instructions. Pablo thinks through the strategy with you: he challenged our approach where it mattered, saved us from building something we didn't need, and his feedback was expert-level from start to finish.",
    name: "Pasha Irshad", role: "Founder", company: "Shape & Scale", url: "https://shapeandscale.co", avatar: "pasha-irshad.jpg",
  },
  rmg: {
    quote: "I interviewed several before deciding, and my instinct didn't fail me. Pablo has been a trusted advisor and someone to think out loud with. At this point I consider him part of my team.",
    name: "Roy Gatling", role: "Founder", company: "RMG Associates", url: "https://rmgassociatesllc.com", avatar: "roy-gatling.jpg",
  },
  telavox: {
    quote: "Very high quality work and a process that flows without friction. Pablo found a solution to our problem that nobody else had found.",
    name: "Alexander Bergström", role: "GTM Director", company: "Telavox", url: "https://telavox.se", avatar: "alexander-bergstrom.jpg",
  },
  salatan: {
    quote: "Pablo is brilliant at what he does and a pleasure to work with. He knows a huge amount, he's very professional, and he's the kind of partner you work with again.",
    name: "Cristian Tanase", role: "Founder", company: "Salatan", url: "https://salatan.io", avatar: "cristian-tanase.jpg",
  },
  lpl: {
    quote: "Pablo delivered exactly what we needed, on time and without endless back and forth. He's a step ahead, and it feels like having him inside the team, not like an outside vendor. Highly recommended for automation and AI.",
    name: "Tyce Hilton", role: "Founder", company: "Landing Page Labs", url: "https://www.landingpagelabs.co", avatar: "tyce-hilton.jpg",
  },
};

export const PROJECTS = [
  {
    slug: "seo-sales-proposal-skill",
    cat: "claude",
    client: "Sixgun",
    clientUrl: "https://sixgun.com.au",
    year: "2026",
    title: "Claude Skill for SEO Sales Proposals",
    summary: "A Claude skill for an SEO agency that builds the slides of a sales proposal on its own, pulling the prospect's data from Ahrefs, Firecrawl and Screaming Frog.",
    tags: ["Claude", "Ahrefs", "Firecrawl", "Screaming Frog"],
    role: "Consultant and skill builder",
    context: [
      "Sixgun is a digital marketing agency in Melbourne that does SEO, Google Ads, social, CRO and analytics. They already had Claude Code and their own plugins in place when we started.",
      "Part of their SEO sales proposal is built from the prospect's own data, and that data lives in three tools: Ahrefs, Firecrawl and Screaming Frog.",
    ],
    built: [
      "A Claude skill that writes that block of the proposal deck on its own. You give it the prospect, it pulls the data from the three tools and it builds the five slides that depend on it.",
      "Around the skill I left a few more pieces for the team:",
      [
        "Lessons of their own on agents, MCPs, plugins, commands, security and token costs, with a sandbox folder to practise without touching what is in use.",
        "A plugin that audits a single skill, or the whole shared library, for security problems.",
        "A skill that writes new skills with a fixed structure, so they all look the same.",
      ],
    ],
    method: [
      "Weekly sessions with the agency's team for a month.",
      "The proposal skill went through three versions before I called it done. I built and tested everything in a separate development space, so nothing reached the team half finished.",
    ],
    stack: [
      ["Claude skills", "The skill itself."],
      ["Ahrefs", "SEO data of the prospect's site."],
      ["Firecrawl", "Reads the pages of the prospect's site."],
      ["Screaming Frog", "Technical crawl of the site."],
    ],
    review: "sixgun",
  },
  {
    slug: "claude-code-rollout-marketing-agency",
    cat: "claude",
    client: "Webprofits",
    clientUrl: "https://webprofits.com.au",
    year: "2026",
    title: "Claude Code Rollout and Training for a Marketing Agency",
    summary: "Consulting and training for a 300-person marketing agency moving its whole team onto Claude Code, plus custom skills for their data, their client research and a security audit across all their repos.",
    tags: ["Claude Code", "GitHub", "Shopify API", "Klaviyo"],
    role: "Consultant and trainer",
    context: [
      "Webprofits is a performance marketing agency in Australia that works on ecommerce and lead generation. The company decided that the whole team would work in Claude Code.",
      "A decision like that raises practical questions fast. Where does each person's work live? How do skills get shared and updated? What stops a client's data from leaking into another client's project? How much is all of this going to cost in tokens?",
    ],
    built: [
      "I helped them set it up, learn to use it and fix what broke along the way. The most concrete pieces:",
      [
        "A GitHub structure for the team: one repo per person, a shared repo of skills and a security audit on every push.",
        "Custom skills for their data: Shopify through its API, Klaviyo, and their customer enrichment tool, which I moved from n8n and Apify over to Claude Code skills.",
        "Routines and plugins: the skills people used to launch by hand now run as scheduled routines, and reach the team as plugins that update with one command.",
        "Security: each client repo only sees that client's database, and every change comes in through a pull request with automatic checks. On top of that, a security audit skill that runs as a routine across their 140 to 200 repos.",
        "New session start and wrap-up skills for their internal academy. Measured with a benchmark, the new version runs in half the time.",
        "Token costs: a set of measures to bring spending down and local telemetry to see how much each person uses.",
      ],
    ],
    method: [
      "A one-hour call every week and a strategy call once a month, over several months.",
      "I did not hand over a finished system. They were moving their own team, and my job was to help them set it up, teach them to use it and fix what broke along the way.",
      "When I rewrote their session skills I benchmarked the old version against the new one, so \"better\" was a number and not an opinion.",
    ],
    result: [
      "The session start and wrap-up skills went from four minutes to two.",
      "We ended the engagement when they no longer needed me: the team works in Claude Code every day on its own.",
    ],
    stack: [
      ["Claude Code", "Where the whole team works: skills, plugins, routines."],
      ["GitHub", "A repo per person, a shared skills repo, pull requests with checks."],
      ["Shopify API", "Store data for the skills."],
      ["Klaviyo", "Email marketing data for the skills."],
    ],
    review: "webprofits",
  },
  {
    slug: "email-copywriting-automation",
    cat: "automation",
    client: "Emailio",
    year: "2025",
    title: "AI Copywriting Automation for Email Campaigns",
    summary: "An n8n workflow with AI agents that writes the email copy for the clients of a French email marketing agency. We benchmarked the models and switched to the best one as new versions came out.",
    tags: ["n8n", "Gemini", "OpenAI API", "Claude"],
    context: [
      "Emailio is a French email marketing agency. For every client there are emails to write, campaign after campaign.",
    ],
    built: [
      "An n8n workflow with AI agents that writes the copy of the emails for each of the agency's clients.",
    ],
    method: [
      "Copy is a matter of taste, so I did not pick a model by reputation. We benchmarked Gemini, OpenAI and Claude models to see which one wrote the best copy.",
      "The project ran for months, and new model versions kept coming out during that time. Each time we benchmarked again and switched when the new one wrote better.",
    ],
    stack: [
      ["n8n", "The workflow and its agents."],
      ["Gemini, OpenAI API, Claude", "The models we compared and used to write the copy."],
    ],
  },
  {
    slug: "bidaible-construction-hiring-marketplace",
    cat: "product",
    client: "RMG Associates",
    clientUrl: "https://rmgassociatesllc.com",
    year: "2025",
    title: "Bidaible: AI-powered Hiring Marketplace for Construction",
    summary: "A marketplace where construction companies post projects and plumbers, electricians and other trades sign up for them. AI handles the search and the matching between people and projects.",
    tags: ["OpenAI API", "Python", "React", "TypeScript", "PostgreSQL"],
    context: [
      "RMG Associates builds software for the construction industry in the United States. Bidaible was their second product with me, after Snapz AI.",
      "The idea: something like a freelance platform, but for construction trades. A company has a project and needs a plumber, a bricklayer or an electrician. Those people need to find the projects that fit them.",
    ],
    built: [
      "A marketplace with two sides. Construction companies post their projects, and tradespeople create a profile and sign up for the ones they want.",
      "AI does two jobs in it: it helps each person create their profile, and it powers the search and the matching between people and projects.",
    ],
    method: [
      "The AI features call the OpenAI API directly, with no framework in between.",
    ],
    stack: [
      ["React, Vite, TypeScript", "The web app."],
      ["Python", "The backend."],
      ["PostgreSQL", "The database."],
      ["OpenAI API", "Profiles, search and matching."],
    ],
    review: "rmg",
  },
  {
    slug: "live-music-events-platform",
    cat: "automation",
    client: "Phrogg",
    year: "2025",
    title: "Live Music Scraping and Events Platform",
    summary: "A US company wanted the live music at bars and terraces from about 30 websites in one place. I built the scrapers, a web app where the team sees every event and a weekly email with the next week's events.",
    tags: ["n8n", "Web Scraping", "Lovable"],
    context: [
      "A company in the United States wanted to know about every live music night at bars and terraces. The information was public, but spread across about 30 websites, each with its own format.",
      "Checking 30 sites by hand every week is the kind of job nobody keeps doing for long.",
    ],
    built: [
      "Three pieces that work together:",
      [
        "An n8n system that scrapes all the websites and turns what it finds into one list of events.",
        "A web app, built with Lovable, where the team sees every event in one place.",
        "An internal newsletter that emails the team the following week's events, every week.",
      ],
    ],
    method: [
      "I split the problem in three: getting the data, showing it and sending it. Each piece does one thing and can be changed without touching the other two.",
      "The web app is an internal tool for the team, built with Lovable.",
    ],
    stack: [
      ["n8n", "The scrapers and the weekly email."],
      ["Lovable", "The internal web app."],
    ],
  },
  {
    slug: "landing-page-copywriting-automation",
    cat: "automation",
    client: "Landing Page Labs",
    clientUrl: "https://www.landingpagelabs.co",
    year: "2025",
    title: "AI Copywriting Automation for Landing Pages",
    summary: "Workflows for a landing page agency that use AI to write the copy for each page, ready to go straight onto the site.",
    tags: ["n8n", "OpenAI API"],
    context: [
      "Landing Page Labs is an agency in Australia that designs and builds landing pages. Of everything a landing page needs, the copy was what cost them the most on each project.",
    ],
    built: [
      "A set of n8n workflows that write the copy of each page with AI. What comes out is ready to go straight onto the site.",
    ],
    stack: [
      ["n8n", "The workflows."],
      ["OpenAI API", "Writes the copy."],
    ],
    review: "lpl",
  },
  {
    slug: "mcp-server-sales-team",
    cat: "automation",
    client: "Telavox",
    clientUrl: "https://telavox.se",
    year: "2025",
    title: "Custom MCP Server and Automations for a Sales Team",
    summary: "An MCP server and several automations for a sales team. MCP was still very new and didn't support the authentication they needed, so I found a way around it and shipped it.",
    tags: ["MCP", "FastMCP", "Python", "n8n"],
    context: [
      "Telavox is a telecom company. Its go-to-market team wanted Claude connected to the tools the sales team works with every day.",
      "In 2025 the way to do that was MCP, and MCP was very young. The protocol did not yet support the kind of authentication they needed.",
    ],
    built: [
      "An MCP server, built with FastMCP and n8n, that gives Claude access to the sales team's tools, plus several automations for their everyday tasks.",
    ],
    method: [
      "The authentication was the real problem: the protocol did not cover it yet. I worked out a way around the gap and shipped it.",
    ],
    result: [
      "The server went into use with the sales team.",
    ],
    stack: [
      ["MCP", "The protocol that connects Claude to the tools."],
      ["FastMCP, Python", "The server."],
      ["n8n", "The automations, and part of the server."],
    ],
    review: "telavox",
  },
  {
    slug: "facebook-ads-image-generation",
    cat: "automation",
    client: "OptiGrow",
    year: "2025",
    title: "AI Image Generation for Facebook Ads",
    summary: "A prototype for a Facebook Ads agency that generates ad images with the client's brand colour and the text on top. Producing creatives was their bottleneck.",
    tags: ["n8n", "Gemini"],
    context: [
      "OptiGrow is a Facebook Ads agency in the United States. Their strategy was about volume, and that made producing the creatives the bottleneck.",
      "The ads were simple on purpose: the client's brand colour as the background and the text on top.",
    ],
    built: [
      "A prototype in n8n that generates the ad images with Gemini from the brand colour and the text of each ad.",
    ],
    result: [
      "The prototype worked. It stayed a prototype: it did not go on to production.",
    ],
    stack: [
      ["n8n", "The workflow."],
      ["Gemini", "Generates the images."],
    ],
  },
  {
    slug: "crm-automation",
    cat: "automation",
    client: "Klyma",
    year: "2025",
    title: "AI-powered CRM Automation",
    summary: "Workflows for a German company that connect its CRM to the rest of its tools and keep the data up to date. An AI agent classifies the records and writes their descriptions and tags.",
    tags: ["n8n", "OpenAI API", "CRM API"],
    context: [
      "Klyma is a German company that needed its CRM connected to the rest of its tools, with the data kept up to date.",
    ],
    built: [
      "Several n8n workflows that connect the CRM to the other tools and keep the records in sync.",
      "Some of them use an agent built on the OpenAI API that classifies each record and writes its description and its tags.",
    ],
    stack: [
      ["n8n", "The workflows."],
      ["OpenAI API", "The agent that classifies and describes the records."],
      ["CRM API", "Reads and writes the records."],
    ],
  },
  {
    slug: "law-firm-ai-platform",
    cat: "product",
    client: "Abogados LegalSHA",
    year: "2025",
    title: "Custom AI Platform for a Law Firm",
    summary: "A week on site with a law firm to gather its requirements, then its own AI platform built as tech lead with a freelance team I hired. It reads documents, transcribes calls and lets lawyers query their cases.",
    tags: ["OpenAI API", "OCR", "RAG", "React", "TypeScript", "PostgreSQL"],
    role: "Consultant, then tech lead",
    context: [
      "Abogados LegalSHA is a law firm that was a client of Salatan, a legal platform I had helped build. They wanted their own platform: one that automates their internal processes and fits the way this particular firm works.",
    ],
    built: [
      "A platform built only for this firm. It does what Salatan does, shaped around their processes:",
      [
        "Reads documents. Scans and PDFs go through OCR with Tesseract and OpenAI vision models, and then an LLM classifies each document and extracts its key data.",
        "Transcribes calls.",
        "Automates chats and calls.",
        "Lets lawyers ask questions about their cases, with RAG over the case documents.",
      ],
    ],
    method: [
      "It started with an intensive week at their offices. I went through their processes with them, gathered every requirement and proposed ideas of my own.",
      "With the requirements closed, I built the platform as tech lead. I hired a team of freelancers and led the development.",
      "Doing the discovery in person first meant the team built from the firm's real processes, not from assumptions about how a law firm works.",
    ],
    stack: [
      ["OpenAI API", "Vision models for OCR, and the LLM that classifies and extracts."],
      ["Tesseract", "OCR for scans and PDFs."],
      ["RAG", "Questions over the documents of each case."],
      ["React, Vite, TypeScript", "The web app."],
      ["PostgreSQL", "The database."],
    ],
    review: "salatan",
  },
  {
    slug: "job-scraping-recruitment-agency",
    cat: "automation",
    client: "Shape & Scale",
    clientUrl: "https://shapeandscale.co",
    year: "2025",
    title: "Job Scraping Automation for a Recruitment Agency",
    summary: "An automation for a recruitment agency that collects new job openings in its regions, filters out the ones not worth pursuing and flags the ones from existing clients for follow-up.",
    tags: ["Make", "n8n", "Apify", "HubSpot"],
    context: [
      "A recruitment agency lives on knowing who is hiring. This one needed to see every new job opening in the regions it covers, and most openings were not worth their time.",
    ],
    built: [
      "An automation that does the first pass for them:",
      [
        "It collects the new job openings in their regions.",
        "It drops the ones that are not worth pursuing and sorts the rest.",
        "If an opening comes from a company that is already a client, it flags it so the right person follows up.",
      ],
    ],
    method: [
      "It started as a simple project in Make and grew from there.",
      "Before building, I questioned the plan with the client. Part of what they had in mind they did not need, and we left it out.",
    ],
    stack: [
      ["Make, n8n", "The automation."],
      ["Apify", "Collects the job openings."],
      ["HubSpot", "Where the existing clients are, to flag their openings."],
    ],
    review: "shape",
  },
  {
    slug: "salatan-legal-ai-platform",
    cat: "product",
    client: "Salatan",
    clientUrl: "https://salatan.io",
    year: "2025",
    title: "Salatan: AI Document Processing and Voice Agent for Lawyers",
    summary: "An AI operations platform for lawyers. I built the document reading, which runs OCR and lets an LLM classify each document and extract its key data, and a voice agent that calls new leads.",
    tags: ["OpenAI API", "Tesseract", "ElevenLabs", "React", "TypeScript", "PostgreSQL"],
    context: [
      "Salatan is an AI operations platform for lawyers. It reads documents, transcribes calls, automates chats and calls, and lets lawyers query their cases with RAG.",
      "A law firm receives its documents as scans and PDFs. Before any of the rest can work, the platform has to know what each document is and what it says.",
    ],
    built: [
      "Two parts of the platform are mine:",
      [
        "The document reading. Scans and PDFs go through OCR, with Tesseract and OpenAI vision models. Then an LLM classifies each document and extracts its key data.",
        "A voice agent, built with ElevenLabs, that calls new leads, asks them a few questions and follows up. The team only talks to people who have already shown interest.",
      ],
    ],
    method: [
      "The document reading runs in two steps on purpose: first turn the document into text, then understand it. Each step can be checked and improved on its own.",
      "For the OCR I combined two tools: Tesseract and OpenAI vision models.",
    ],
    stack: [
      ["Tesseract", "OCR for scans and PDFs."],
      ["OpenAI API", "Vision models for OCR, and the LLM that classifies and extracts."],
      ["ElevenLabs", "The voice agent that calls new leads."],
      ["React, Vite, TypeScript", "The web app."],
      ["PostgreSQL", "The database."],
    ],
    review: "salatan",
  },
  {
    slug: "snapz-ai-construction-rag",
    cat: "product",
    client: "RMG Associates",
    clientUrl: "https://rmgassociatesllc.com",
    year: "2024",
    title: "Snapz AI: Agentic RAG for Construction Documents",
    summary: "A portal where US construction companies chat with their project documents. Documents go through OCR into a vector database, and an agentic RAG finds what it needs and answers in one reply.",
    tags: ["Python", "LangGraph", "FastAPI", "Mistral OCR", "Pinecone", "React"],
    context: [
      "A construction project produces a huge amount of documents, and the answer to a simple question is often spread across several of them.",
      "RMG Associates wanted a portal where construction companies in the United States could ask their project documentation a question and get one answer back.",
    ],
    built: [
      "A portal with a chat over the documents of each project. Behind the chat:",
      [
        "Every document goes through OCR and is loaded into a vector database in Pinecone.",
        "An agentic RAG, built with LangChain and LangGraph, decides which documents it needs, pulls the information out of each one and combines it into a single answer.",
        "It also extracts the key data of each document and prepares reports and notifications on its own.",
      ],
    ],
    method: [
      "We started the OCR with Tesseract. As AI models improved, we moved to Mistral OCR: it read the documents better and was worth the cost.",
      "The RAG is agentic for a reason. A plain search returns the passages that look most like the question. Here the agent first works out what it needs, searches for it, and only then writes the answer.",
    ],
    stack: [
      ["Mistral OCR, Tesseract", "OCR. Tesseract first, Mistral OCR later."],
      ["Pinecone", "The vector database with the documents."],
      ["LangChain, LangGraph", "The agentic RAG."],
      ["Python, FastAPI, Pydantic", "The backend."],
      ["PostgreSQL", "The database."],
      ["React, Vite, TypeScript", "The portal."],
    ],
    review: "rmg",
  },
  {
    slug: "ai-task-manager-app",
    cat: "product",
    client: "Together",
    year: "2024",
    title: "Task Manager App Powered by AI",
    summary: "A startup building a simpler Notion designed for mobile. I worked on both the frontend and the backend of the app and acted as the link between the two developers on the team.",
    tags: ["React Native", "Node.js", "n8n"],
    role: "Full-stack engineer",
    context: [
      "Together was a startup building a simpler, more accessible kind of Notion: notes, documents and tasks, designed for the phone first.",
    ],
    built: [
      "I worked on both sides of the app: the mobile frontend in React Native and the backend in Node.js, with n8n for the automations.",
    ],
    method: [
      "The team had one frontend developer and one backend developer. I worked on both sides and acted as the link between the two.",
    ],
    stack: [
      ["React Native", "The mobile app."],
      ["Node.js", "The backend."],
      ["n8n", "Automations."],
    ],
  },
  {
    slug: "hubspot-ai-automation",
    cat: "automation",
    client: "Speakeasy",
    clientUrl: "https://speakeasy.com",
    year: "2024",
    title: "AI-powered HubSpot Automation",
    summary: "A microservice that uses AI to classify the deals, users and other records in HubSpot, so the CRM keeps itself organized.",
    tags: ["Go", "OpenAI API", "HubSpot API"],
    context: [
      "A CRM is only useful while its records are classified, and classifying them by hand is the first thing a busy team stops doing.",
    ],
    built: [
      "A microservice in Go, integrated with HubSpot, that uses the OpenAI API to classify the deals, the users and the rest of the records. The CRM keeps itself organized.",
    ],
    stack: [
      ["Go", "The microservice."],
      ["OpenAI API", "Classifies each record."],
      ["HubSpot API", "Reads the records and writes the classification back."],
    ],
  },
  {
    slug: "services-marketplace-backend",
    cat: "product",
    client: "Vindy",
    year: "2023",
    title: "Backend for a Services Marketplace App",
    summary: "A marketplace where people post jobs, from hairdressing to plumbing, and hire someone to do them. I built the whole backend for its mobile apps, with an early OpenAI integration.",
    tags: ["TypeScript", "NestJS", "PostgreSQL", "OpenAI API"],
    role: "Backend engineer",
    context: [
      "Vindy was a Venezuelan startup building a marketplace for everyday services. People post a job, from hairdressing to electrical work or plumbing, and hire someone to do it.",
    ],
    built: [
      "The entire backend behind its mobile apps, as a REST API, plus an early integration with the OpenAI API.",
    ],
    method: [
      "I wrote the backend with tests. The mobile apps depended on that API, and it had to keep changing without breaking them.",
    ],
    stack: [
      ["NestJS, TypeScript", "The backend and its REST API."],
      ["PostgreSQL", "The database."],
      ["OpenAI API", "An early AI integration."],
    ],
  },
  {
    slug: "idealista-chrome-extension",
    cat: "automation",
    client: "Deplace",
    year: "2020",
    title: "Chrome Extension to Automate Idealista Listings",
    summary: "The sales team copied each property from the CRM into Idealista by hand, half an hour per listing. A Chrome extension turned it into pasting an ID and clicking three buttons.",
    tags: ["JavaScript", "Chrome Extensions"],
    role: "Backend engineer at Deplace",
    context: [
      "Deplace sold homes, and every home had to be published on Idealista, the main property portal in Spain. The details of each property were already in our CRM.",
      "The sales team copied them from one screen to the other by hand, field by field. Each listing took half an hour.",
    ],
    built: [
      "A Chrome extension that does the copying for them. They enter the ID of the property in the CRM, the extension pulls all its data and, with one click, fills in the whole Idealista listing.",
    ],
    method: [
      "The extension works on the Idealista page itself, the same one the sales team was already using. Nothing changed for them except the typing.",
      "I wrote it in plain JavaScript, with no framework: a small tool with one job.",
    ],
    result: [
      "Half an hour of data entry per listing became pasting an ID and clicking three buttons.",
    ],
    stack: [
      ["JavaScript", "The whole extension, with no framework."],
      ["Chrome Extensions", "Runs on the Idealista page and fills in the listing."],
    ],
  },
  {
    slug: "property-viewings-chatbot",
    cat: "chatbot",
    client: "Deplace",
    year: "2019",
    title: "Chatbot to Automate Property Viewings",
    summary: "A chatbot, with its integrations, that schedules and manages property viewings as part of the home-buying process.",
    tags: ["TypeScript", "Node.js", "Google Cloud", "MongoDB"],
    role: "Backend engineer at Deplace",
    context: [
      "Buying a home starts with visiting it, and every visit has to be arranged between the buyer and the seller.",
    ],
    built: [
      "A chatbot, built from scratch, that schedules and manages property viewings between buyers and sellers, with the integrations it needed to fit into the rest of the buying process.",
    ],
    method: [
      "I built it from scratch and owned it for more than a year, from development to growing the product.",
    ],
    stack: [
      ["TypeScript, Node.js", "The chatbot and its integrations."],
      ["Google Cloud", "Where it runs."],
      ["MongoDB", "The database."],
    ],
  },
  {
    slug: "metro-sevilla-whatsapp-chatbot",
    cat: "chatbot",
    client: "Chatbot Chocolate",
    year: "2019",
    title: "WhatsApp Chatbot for Metro de Sevilla",
    summary: "A WhatsApp chatbot that tells you when the next train reaches your stop and how long a trip between two stations takes. It won a best chatbot award in a competition.",
    tags: [".NET Core", "C#", "SQL Server", "WhatsApp API"],
    role: "Backend engineer at Chatbot Chocolate",
    context: [
      "A chatbot for the passengers of Metro de Sevilla, on WhatsApp. I built it at Chatbot Chocolate, a company that made chatbots for clients.",
      "This was years before LLMs. A chatbot was mostly built by hand: every question it understood and every answer it gave was designed and programmed.",
    ],
    built: [
      "A WhatsApp chatbot that answers the two questions a passenger has: how long until the next train reaches my stop, and how long it takes to get from one station to another.",
    ],
    result: [
      "It won a best chatbot award in a competition.",
    ],
    stack: [
      [".NET Core, C#", "The chatbot."],
      ["SQL Server", "The database."],
      ["WhatsApp API", "The channel the passengers write to."],
    ],
  },
];
