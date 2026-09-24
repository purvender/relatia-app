import "dotenv/config";
import postgres from "@prisma/orm-postgres/runtime";
import type { Contract } from "./schema.d";
import contractJson from "./schema.json" with { type: "json" };

const databaseUrl = process.env.DATABASE_URL;

if (!databaseUrl) {
  throw new Error("DATABASE_URL is not configured in environment variables.");
}

const db = postgres<Contract>({
  contractJson,
  url: databaseUrl,
});

async function main() {
  if (process.env.NODE_ENV === "production") {
    console.error("❌ Refusing to run seed script in production environment.");
    process.exit(1);
  }

  console.log("🌱 Starting enterprise workflow seed for Northstar Consumer India...");

  // 1. Seed Company Tenant
  const companySlug = "northstar-consumer-india";
  const companyName = "Northstar Consumer India Private Limited";

  let company = await db.orm.public.Company.where({ slug: companySlug }).first();

  if (!company) {
    company = await db.orm.public.Company.create({
      name: companyName,
      slug: companySlug,
    });
    console.log(`✅ Created company tenant: ${company.name} (id: ${company.id})`);
  } else {
    console.log(`ℹ️ Company tenant already exists: ${company.name} (id: ${company.id})`);
  }

  // 2. Seed Company Expense & Approval Policy
  let policy = await db.orm.public.Policy.where({ companyId: company.id }).first();

  if (!policy) {
    policy = await db.orm.public.Policy.create({
      companyId: company.id,
      maxBudget: 75_000_000, // ₹7,50,000 in paise
      perPersonCap: 1_500_000, // ₹15,000 in paise
      allowedCities: ["Bengaluru", "Mumbai", "Pune", "Gurugram", "New Delhi"],
      approverRole: "APPROVER",
    });
    console.log(`✅ Created expense policy for ${company.name}`);
  } else {
    console.log(`ℹ️ Policy already exists for ${company.name}`);
  }

  // 3. Seed Internal Employee Users (8 Employees across 4 roles)
  const employeeSeedData = [
    {
      clerkId: "clerk_northstar_ananya",
      email: "ananya.sharma@northstarconsumer.com",
      name: "Ananya Sharma",
      role: "ADMIN" as const,
    },
    {
      clerkId: "clerk_northstar_rahul",
      email: "rahul.mehra@northstarconsumer.com",
      name: "Rahul Mehra",
      role: "ADMIN" as const,
    },
    {
      clerkId: "clerk_northstar_priya",
      email: "priya.nair@northstarconsumer.com",
      name: "Priya Nair",
      role: "REQUESTER" as const,
    },
    {
      clerkId: "clerk_northstar_arjun",
      email: "arjun.singh@northstarconsumer.com",
      name: "Arjun Singh",
      role: "REQUESTER" as const,
    },
    {
      clerkId: "clerk_northstar_neha",
      email: "neha.kapoor@northstarconsumer.com",
      name: "Neha Kapoor",
      role: "REQUESTER" as const,
    },
    {
      clerkId: "clerk_northstar_vikram",
      email: "vikram.joshi@northstarconsumer.com",
      name: "Vikram Joshi",
      role: "APPROVER" as const,
    },
    {
      clerkId: "clerk_northstar_meera",
      email: "meera.iyer@northstarconsumer.com",
      name: "Meera Iyer",
      role: "APPROVER" as const,
    },
    {
      clerkId: "clerk_northstar_sandeep",
      email: "sandeep.gupta@northstarconsumer.com",
      name: "Sandeep Gupta",
      role: "FINANCE" as const,
    },
  ];

  const userMap = new Map<string, number>();

  for (const u of employeeSeedData) {
    let user = await db.orm.public.User.where({ clerkId: u.clerkId }).first();

    if (!user) {
      user = await db.orm.public.User.where({ email: u.email }).first();
    }

    if (!user) {
      user = await db.orm.public.User.create({
        clerkId: u.clerkId,
        email: u.email,
        name: u.name,
        role: u.role,
        companyId: company.id,
      });
      console.log(`✅ Seeded employee: ${user.name} <${user.email}> [${user.role}]`);
    } else {
      await db.orm.public.User.where({ id: user.id }).update({
        email: u.email,
        name: u.name,
        companyId: company.id,
        role: u.role,
      });
      console.log(`ℹ️ Employee updated/exists: ${u.email} [${u.role}]`);
    }

    userMap.set(u.email, user.id);
  }

  // 4. Seed Enterprise Venues (10 Venues across allowed cities)
  const venueSeedData = [
    {
      name: "The Leela Palace Banquet",
      city: "Bengaluru",
      address: "23 HAL 2nd Stage, Kodihalli",
      capacity: 250,
      cuisine: "Pan Asian & Indian Fine Dining",
      priceBand: "LUXURY",
      tags: ["Five Star", "Ballroom", "Executive Summit"],
      rating: 4.9,
    },
    {
      name: "Mavalli Tiffin Room Executive Hall",
      city: "Bengaluru",
      address: "14 Lalbagh Road",
      capacity: 180,
      cuisine: "South Indian Vegetarian",
      priceBand: "MODERATE",
      tags: ["Traditional", "Vegetarian", "Corporate Lunch"],
      rating: 4.8,
    },
    {
      name: "Trident Nariman Point Executive Lounge",
      city: "Mumbai",
      address: "Nariman Point, Marine Drive",
      capacity: 120,
      cuisine: "Modern European & Seafood",
      priceBand: "LUXURY",
      tags: ["Sea View", "Board Dining", "Financial District"],
      rating: 4.9,
    },
    {
      name: "Bastian Bandra Private Dining",
      city: "Mumbai",
      address: "Linking Road, Bandra West",
      capacity: 90,
      cuisine: "Asian Fusion & Seafood",
      priceBand: "PREMIUM",
      tags: ["Private Dining", "Cocktail Lounge", "Executive Dinner"],
      rating: 4.7,
    },
    {
      name: "The Oberoi Amarvilas Ballroom",
      city: "Gurugram",
      address: "Golf Course Road, Sector 54",
      capacity: 220,
      cuisine: "Contemporary North Indian & Asian",
      priceBand: "LUXURY",
      tags: ["Five Star", "Cyber City", "CXO Summit"],
      rating: 4.9,
    },
    {
      name: "Cyber Hub Social Corporate Lounge",
      city: "Gurugram",
      address: "DLF Cyber City",
      capacity: 200,
      cuisine: "Multi-Cuisine & Craft Drinks",
      priceBand: "MODERATE",
      tags: ["Casual Corporate", "Tech Hub", "Team Dinner"],
      rating: 4.5,
    },
    {
      name: "Olive Bar & Kitchen Courtyard",
      city: "New Delhi",
      address: "One Style Mile, Mehrauli",
      capacity: 160,
      cuisine: "Mediterranean & European",
      priceBand: "PREMIUM",
      tags: ["Heritage Courtyard", "Executive Dining", "Cocktails"],
      rating: 4.8,
    },
    {
      name: "The Imperial Ballroom",
      city: "New Delhi",
      address: "Janpath, Connaught Place",
      capacity: 300,
      cuisine: "Continental & Indian Fine Dining",
      priceBand: "LUXURY",
      tags: ["Heritage Hotel", "Diplomatic Quarter", "Annual Summit"],
      rating: 4.9,
    },
    {
      name: "Paasha Rooftop at JW Marriott",
      city: "Pune",
      address: "Senapati Bapat Road",
      capacity: 150,
      cuisine: "North Indian & Awadhi",
      priceBand: "PREMIUM",
      tags: ["Rooftop", "Skyline View", "Leadership Dinner"],
      rating: 4.8,
    },
    {
      name: "Effingut Brewhouse Lounge",
      city: "Pune",
      address: "Koregaon Park",
      capacity: 140,
      cuisine: "Multi-Cuisine & Craft Beer",
      priceBand: "MODERATE",
      tags: ["Craft Brewery", "Informal Mixer", "Team Outing"],
      rating: 4.6,
    },
  ];

  for (const v of venueSeedData) {
    const existing = await db.orm.public.Venue.where({ companyId: company.id })
      .where((venue) => venue.name.eq(v.name))
      .first();

    if (!existing) {
      await db.orm.public.Venue.create({
        companyId: company.id,
        name: v.name,
        city: v.city,
        address: v.address,
        capacity: v.capacity,
        cuisine: v.cuisine,
        priceBand: v.priceBand,
        tags: v.tags,
        rating: v.rating,
        active: true,
      });
      console.log(`✅ Seeded venue: ${v.name} (${v.city})`);
    } else {
      console.log(`ℹ️ Venue already exists: ${v.name}`);
    }
  }

  // 5. Seed Corporate Events (10 Events across statuses)
  const eventSeedData = [
    {
      title: "Q3 Enterprise Leadership Dinner",
      eventType: "Client Dinner",
      purpose: "Quarterly strategic alignment with key enterprise partners",
      city: "Bengaluru",
      dateTime: "2026-10-15T19:30:00Z",
      attendees: 12,
      budget: 4_800_000, // ₹48,000 in paise
      diet: "VEG",
      status: "APPROVED" as const,
      creatorEmail: "priya.nair@northstarconsumer.com",
    },
    {
      title: "CXO Strategic Alignment Meeting",
      eventType: "Executive Dinner",
      purpose: "Annual commercial agreement discussions with financial partners",
      city: "Mumbai",
      dateTime: "2026-10-20T19:00:00Z",
      attendees: 8,
      budget: 7_200_000, // ₹72,000 in paise
      diet: "NON_VEG",
      status: "REQUESTED" as const,
      creatorEmail: "arjun.singh@northstarconsumer.com",
    },
    {
      title: "Annual Distributor Partner Summit",
      eventType: "Distributor Meet",
      purpose: "Annual trade distributor performance and incentive rewards dinner",
      city: "Gurugram",
      dateTime: "2026-11-05T12:30:00Z",
      attendees: 40,
      budget: 32_000_000, // ₹3,20,000 in paise
      diet: "NONE",
      status: "APPROVED" as const,
      creatorEmail: "neha.kapoor@northstarconsumer.com",
    },
    {
      title: "North India Region Sales Dinner",
      eventType: "Sales Team Dinner",
      purpose: "Regional sales milestone celebration dinner",
      city: "New Delhi",
      dateTime: "2026-10-28T20:00:00Z",
      attendees: 15,
      budget: 9_000_000, // ₹90,000 in paise
      diet: "NONE",
      status: "REQUESTED" as const,
      creatorEmail: "priya.nair@northstarconsumer.com",
    },
    {
      title: "Western India Trade Partner Dinner",
      eventType: "Channel Partner Dinner",
      purpose: "Q4 product line launch with tier-1 retail partners",
      city: "Pune",
      dateTime: "2026-11-12T19:30:00Z",
      attendees: 20,
      budget: 11_000_000, // ₹1,10,000 in paise
      diet: "VEG",
      status: "DRAFT" as const,
      creatorEmail: "arjun.singh@northstarconsumer.com",
    },
    {
      title: "Key Account Growth Review Dinner",
      eventType: "Client Dinner",
      purpose: "Key account renewal discussion",
      city: "Bengaluru",
      dateTime: "2026-09-30T19:30:00Z",
      attendees: 6,
      budget: 3_600_000, // ₹36,000 in paise
      diet: "JAIN",
      status: "BOOKED" as const,
      creatorEmail: "neha.kapoor@northstarconsumer.com",
    },
    {
      title: "Institutional Investor Luncheon",
      eventType: "Investor Lunch",
      purpose: "Half-yearly institutional investor update lunch",
      city: "Mumbai",
      dateTime: "2026-10-10T13:00:00Z",
      attendees: 10,
      budget: 8_500_000, // ₹85,000 in paise
      diet: "NONE",
      status: "COMPLETED" as const,
      creatorEmail: "priya.nair@northstarconsumer.com",
    },
    {
      title: "Product Advisory Council Dinner",
      eventType: "Executive Dinner",
      purpose: "Customer advisory council strategy feedback dinner",
      city: "Gurugram",
      dateTime: "2026-11-18T19:30:00Z",
      attendees: 14,
      budget: 12_500_000, // ₹1,25,000 in paise
      diet: "VEGAN",
      status: "REQUESTED" as const,
      creatorEmail: "arjun.singh@northstarconsumer.com",
    },
    {
      title: "Regional Operations Offsite Dinner",
      eventType: "Team Offsite",
      purpose: "Supply chain team operational planning dinner",
      city: "Pune",
      dateTime: "2026-12-02T20:00:00Z",
      attendees: 25,
      budget: 15_000_000, // ₹1,50,000 in paise
      diet: "NONE",
      status: "DRAFT" as const,
      creatorEmail: "neha.kapoor@northstarconsumer.com",
    },
    {
      title: "APAC Commercial Alignment Dinner",
      eventType: "Executive Dinner",
      purpose: "Cross-border commercial review",
      city: "New Delhi",
      dateTime: "2026-10-22T19:30:00Z",
      attendees: 12,
      budget: 10_500_000, // ₹1,05,000 in paise
      diet: "NONE",
      status: "REJECTED" as const,
      creatorEmail: "priya.nair@northstarconsumer.com",
    },
  ];

  const eventMap = new Map<string, number>();

  for (const e of eventSeedData) {
    const creatorId = userMap.get(e.creatorEmail);
    if (!creatorId) continue;

    let event = await db.orm.public.Event.where({ companyId: company.id })
      .where((item) => item.title.eq(e.title))
      .first();

    if (!event) {
      event = await db.orm.public.Event.create({
        companyId: company.id,
        createdById: creatorId,
        title: e.title,
        eventType: e.eventType,
        purpose: e.purpose,
        city: e.city,
        dateTime: e.dateTime,
        attendees: e.attendees,
        budget: e.budget,
        diet: e.diet,
        status: e.status,
      });
      console.log(`✅ Seeded event: ${event.title} [${event.status}]`);
    } else {
      console.log(`ℹ️ Event already exists: ${event.title}`);
    }

    eventMap.set(e.title, event.id);
  }

  // 6. Seed Approval Records (5 Approvals)
  const approvalSeedData = [
    {
      eventTitle: "Q3 Enterprise Leadership Dinner",
      approverEmail: "vikram.joshi@northstarconsumer.com",
      status: "APPROVED" as const,
      reason: "Budget ₹4,800/person is compliant with Q3 sales allocation cap.",
    },
    {
      eventTitle: "CXO Strategic Alignment Meeting",
      approverEmail: "meera.iyer@northstarconsumer.com",
      status: "PENDING" as const,
      reason: null,
    },
    {
      eventTitle: "Annual Distributor Partner Summit",
      approverEmail: "vikram.joshi@northstarconsumer.com",
      status: "APPROVED" as const,
      reason: "Approved for 40 key distribution partners.",
    },
    {
      eventTitle: "North India Region Sales Dinner",
      approverEmail: "meera.iyer@northstarconsumer.com",
      status: "PENDING" as const,
      reason: null,
    },
    {
      eventTitle: "APAC Commercial Alignment Dinner",
      approverEmail: "vikram.joshi@northstarconsumer.com",
      status: "REJECTED" as const,
      reason: "Per-person budget exceeded tier threshold without prior VP pre-approval.",
    },
  ];

  for (const a of approvalSeedData) {
    const eventId = eventMap.get(a.eventTitle);
    const approverId = userMap.get(a.approverEmail);

    if (!eventId || !approverId) continue;

    const existing = await db.orm.public.Approval.where({
      eventId,
    })
      .where({ approverId })
      .first();

    if (!existing) {
      await db.orm.public.Approval.create({
        eventId,
        approverId,
        status: a.status,
        reason: a.reason,
      });
      console.log(`✅ Seeded approval record for: ${a.eventTitle} [${a.status}]`);
    } else {
      console.log(`ℹ️ Approval record already exists for: ${a.eventTitle}`);
    }
  }

  console.log("🌱 Enterprise workflow seed completed successfully!");
  process.exit(0);
}

main().catch((err) => {
  console.error("❌ Error running enterprise seed script:", err);
  process.exit(1);
});
