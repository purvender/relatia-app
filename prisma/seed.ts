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

  // 3. Seed Internal Employee Users & Platform Ops Users
  const employeeSeedData = [
    {
      clerkId: "clerk_relatia_platform_admin",
      email: "platform.admin@relatia.in",
      name: "Relatia Platform Admin",
      role: "PLATFORM_ADMIN" as const,
    },
    {
      clerkId: "clerk_northstar_ananya",
      email: "ananya.sharma@northstarconsumer.com",
      name: "Ananya Sharma",
      role: "COMPANY_ADMIN" as const,
    },
    {
      clerkId: "clerk_northstar_rahul",
      email: "rahul.mehra@northstarconsumer.com",
      name: "Rahul Mehra",
      role: "COMPANY_ADMIN" as const,
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

  const existingUsers = await db.orm.public.User.all();


  for (const u of employeeSeedData) {
    let user =
      existingUsers.find(
        (existing) => existing.email.toLowerCase() === u.email.toLowerCase(),
      ) ||
      existingUsers.find(
        (existing) => existing.clerkId === u.clerkId,
      );


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


  // 4. Seed Provider Organizations & Hierarchy (Fictional Hospitality Supply Partners)
  const providerSeedData = [
    {
      name: "Oberoi Luxury Hospitality Collective",
      legalName: "EIH Hospitality Services India Ltd",
      providerType: "HOTEL" as const,
      city: "Gurugram",
      status: "VERIFIED" as const,
      onboardingStatus: "READY_FOR_DISCOVERY" as const,
      internalNotes: "Tier-1 Gurugram hotel partner. Guaranteed SLA for corporate executive dining suites.",
    },
    {
      name: "Cyber City Executive Dining Group",
      legalName: "Impresario Culinary Partners Pvt Ltd",
      providerType: "RESTAURANT" as const,
      city: "Gurugram",
      status: "VERIFIED" as const,
      onboardingStatus: "READY_FOR_DISCOVERY" as const,
      internalNotes: "Prime DLF Cyber Hub partner for mid-to-large tech corporate dinners and mixers.",
    },
    {
      name: "Imperial Heritage Hospitality Group",
      legalName: "The Imperial Hotels & Resorts Pvt Ltd",
      providerType: "HOTEL" as const,
      city: "New Delhi",
      status: "VERIFIED" as const,
      onboardingStatus: "READY_FOR_DISCOVERY" as const,
      internalNotes: "Historic Connaught Place luxury partner for annual summits and CXO advisory boards.",
    },
  ];

  const providerMap = new Map<string, number>();

  for (const p of providerSeedData) {
    let org = await db.orm.public.ProviderOrganization.where((o) => o.name.eq(p.name)).first();
    if (!org) {
      org = await db.orm.public.ProviderOrganization.create({
        name: p.name,
        legalName: p.legalName,
        providerType: p.providerType,
        city: p.city,
        status: p.status,
        onboardingStatus: p.onboardingStatus,
        internalNotes: p.internalNotes,
      });
      console.log(`✅ Seeded provider organization: ${org.name} (id: ${org.id})`);
    } else {
      console.log(`ℹ️ Provider organization already exists: ${org.name}`);
    }
    providerMap.set(p.name, org.id);
  }

  // Seed Provider Contacts
  const providerContactSeedData = [
    {
      providerName: "Oberoi Luxury Hospitality Collective",
      name: "Vikramaditya Oberoi",
      role: "Director of Enterprise Hospitality",
      email: "v.oberoi@oberoicollective-demo.in",
      phone: "+91 98110 12345",
      preferredContactMethod: "EMAIL",
      category: "OPERATIONS" as const,
    },
    {
      providerName: "Oberoi Luxury Hospitality Collective",
      name: "Sunita Rao",
      role: "Corporate Sales Manager",
      email: "s.rao@oberoicollective-demo.in",
      phone: "+91 98110 54321",
      preferredContactMethod: "PHONE",
      category: "SALES" as const,
    },
    {
      providerName: "Cyber City Executive Dining Group",
      name: "Rohan Malhotra",
      role: "Events & Private Dining Concierge",
      email: "rohan.m@cybercitydining-demo.in",
      phone: "+91 98200 98765",
      preferredContactMethod: "WHATSAPP",
      category: "OPERATIONS" as const,
    },
    {
      providerName: "Imperial Heritage Hospitality Group",
      name: "Karan Johar-Singh",
      role: "General Manager — Heritage Banquets",
      email: "karan.js@imperialheritage-demo.in",
      phone: "+91 98100 11223",
      preferredContactMethod: "EMAIL",
      category: "MANAGEMENT" as const,
    },
  ];

  for (const c of providerContactSeedData) {
    const orgId = providerMap.get(c.providerName);
    if (!orgId) continue;

    const existing = await db.orm.public.ProviderContact.where({ providerOrgId: orgId })
      .where((contact) => contact.email.eq(c.email))
      .first();


    if (!existing) {
      await db.orm.public.ProviderContact.create({
        providerOrgId: orgId,
        name: c.name,
        role: c.role,
        email: c.email,
        phone: c.phone,
        preferredContactMethod: c.preferredContactMethod,
        category: c.category,
        isActive: true,
      });
      console.log(`✅ Seeded provider contact: ${c.name} (${c.role})`);
    }
  }

  // 5. Seed Enterprise Venues (10 Venues across allowed cities)
  const venueSeedData = [
    {
      name: "The Leela Palace Banquet",
      city: "Bengaluru",
      address: "23 HAL 2nd Stage, Kodihalli",
      locality: "Kodihalli",
      capacity: 250,
      cuisine: "Pan Asian & Indian Fine Dining",
      priceBand: "LUXURY",
      tags: ["Five Star", "Ballroom", "Executive Summit"],
      rating: 4.9,
      providerName: null,
      publicDescription: "Grand palatial venue featuring handcrafted ceilings, private royal dining rooms, and high-security executive reception.",
    },
    {
      name: "Mavalli Tiffin Room Executive Hall",
      city: "Bengaluru",
      address: "14 Lalbagh Road",
      locality: "Lalbagh",
      capacity: 180,
      cuisine: "South Indian Vegetarian",
      priceBand: "MODERATE",
      tags: ["Traditional", "Vegetarian", "Corporate Lunch"],
      rating: 4.8,
      providerName: null,
      publicDescription: "Authentic traditional banquet hall tailored for heritage corporate lunches and vegetarian distributor meets.",
    },
    {
      name: "Trident Nariman Point Executive Lounge",
      city: "Mumbai",
      address: "Nariman Point, Marine Drive",
      locality: "Nariman Point",
      capacity: 120,
      cuisine: "Modern European & Seafood",
      priceBand: "LUXURY",
      tags: ["Sea View", "Board Dining", "Financial District"],
      rating: 4.9,
      providerName: null,
      publicDescription: "South Mumbai waterfront dining lounge with panoramic Arabian Sea views and discreet private dining suites.",
    },
    {
      name: "Bastian Bandra Private Dining",
      city: "Mumbai",
      address: "Linking Road, Bandra West",
      locality: "Bandra West",
      capacity: 90,
      cuisine: "Asian Fusion & Seafood",
      priceBand: "PREMIUM",
      tags: ["Private Dining", "Cocktail Lounge", "Executive Dinner"],
      rating: 4.7,
      providerName: null,
      publicDescription: "High-energy culinary landmark with an exclusive mezzanine dining floor and bespoke cocktail pairings.",
    },
    {
      name: "The Oberoi Amarvilas Ballroom",
      city: "Gurugram",
      address: "Golf Course Road, Sector 54",
      locality: "Golf Course Road",
      capacity: 220,
      cuisine: "Contemporary North Indian & Asian",
      priceBand: "LUXURY",
      tags: ["Five Star", "Cyber City", "CXO Summit", "Private Dining"],
      rating: 4.9,
      providerName: "Oberoi Luxury Hospitality Collective",
      publicDescription: "Gurugram's premier executive hospitality destination on Golf Course Road, featuring dedicated private dining suites and acoustic isolation for CXO summits.",
    },
    {
      name: "Cyber Hub Social Corporate Lounge",
      city: "Gurugram",
      address: "DLF Cyber City",
      locality: "DLF Cyber City",
      capacity: 200,
      cuisine: "Multi-Cuisine & Craft Drinks",
      priceBand: "MODERATE",
      tags: ["Casual Corporate", "Tech Hub", "Team Dinner", "Lounge"],
      rating: 4.5,
      providerName: "Cyber City Executive Dining Group",
      publicDescription: "Vibrant tech-district lounge with dedicated semi-private dining sections and craft dining menus for engineering offsites and team celebrations.",
    },
    {
      name: "Olive Bar & Kitchen Courtyard",
      city: "New Delhi",
      address: "One Style Mile, Mehrauli",
      locality: "Mehrauli Heritage Zone",
      capacity: 160,
      cuisine: "Mediterranean & European",
      priceBand: "PREMIUM",
      tags: ["Heritage Courtyard", "Executive Dining", "Cocktails"],
      rating: 4.8,
      providerName: null,
      publicDescription: "Al-fresco Mediterranean courtyard in Mehrauli beneath the shadow of the Qutub Minar, perfect for milestone partner dinners.",
    },
    {
      name: "The Imperial Ballroom",
      city: "New Delhi",
      address: "Janpath, Connaught Place",
      locality: "Connaught Place",
      capacity: 300,
      cuisine: "Continental & Indian Fine Dining",
      priceBand: "LUXURY",
      tags: ["Heritage Hotel", "Diplomatic Quarter", "Annual Summit", "Boardroom"],
      rating: 4.9,
      providerName: "Imperial Heritage Hospitality Group",
      publicDescription: "New Delhi's iconic colonial-heritage grand ballroom and private boardroom salons, providing white-glove hospitality in the diplomatic district.",
    },
    {
      name: "Paasha Rooftop at JW Marriott",
      city: "Pune",
      address: "Senapati Bapat Road",
      locality: "Senapati Bapat Road",
      capacity: 150,
      cuisine: "North Indian & Awadhi",
      priceBand: "PREMIUM",
      tags: ["Rooftop", "Skyline View", "Leadership Dinner"],
      rating: 4.8,
      providerName: null,
      publicDescription: "Rooftop lounge overlooking Pune's skyline, serving slow-cooked Awadhi recipes for executive board retreats.",
    },
    {
      name: "Effingut Brewhouse Lounge",
      city: "Pune",
      address: "Koregaon Park",
      locality: "Koregaon Park",
      capacity: 140,
      cuisine: "Multi-Cuisine & Craft Beer",
      priceBand: "MODERATE",
      tags: ["Craft Brewery", "Informal Mixer", "Team Outing"],
      rating: 4.6,
      providerName: null,
      publicDescription: "Koregaon Park informal gathering venue with artisanal craft brews and global comfort dining.",
    },
  ];

  const venueMap = new Map<string, number>();

  for (const v of venueSeedData) {
    const providerOrgId = v.providerName ? providerMap.get(v.providerName) ?? null : null;

    let existing = await db.orm.public.Venue.where({ companyId: company.id })
      .where((venue) => venue.name.eq(v.name))
      .first();

    if (!existing) {
      existing = await db.orm.public.Venue.create({
        companyId: company.id,
        providerOrgId,
        name: v.name,
        city: v.city,
        locality: v.locality,
        address: v.address,
        capacity: v.capacity,
        cuisine: v.cuisine,
        priceBand: v.priceBand,
        tags: v.tags,
        rating: v.rating,
        active: true,
        venueType: "RESTAURANT",
        publicDescription: v.publicDescription,
        visibility: "DISCOVERABLE",
        isDiscoverable: true,
        verificationStatus: "VERIFIED",
        lastVerifiedAt: new Date().toISOString(),
      });
      console.log(`✅ Seeded venue: ${v.name} (${v.city})`);
    } else {
      await db.orm.public.Venue.where({ id: existing.id }).update({
        providerOrgId,
        locality: v.locality,
        publicDescription: v.publicDescription,
        visibility: "DISCOVERABLE",
        isDiscoverable: true,
        verificationStatus: "VERIFIED",
        lastVerifiedAt: new Date().toISOString(),
      });
      console.log(`ℹ️ Venue updated/exists: ${v.name}`);
    }

    venueMap.set(v.name, existing.id);

    // Seed Availability & Cancellation policies for each venue
    const avail = await db.orm.public.AvailabilityMetadata.where({ venueId: existing.id }).first();
    if (!avail) {
      await db.orm.public.AvailabilityMetadata.create({
        venueId: existing.id,
        requiresManualConfirmation: true,
        leadTimeHours: 24,
        operatingDaysNotes: "Open 7 days a week, lunch 12:30–15:30, dinner 19:00–23:30.",
        availabilityNotes: "Concierge confirms seating within 2 hours of booking dispatch.",
      });
    }

    const cancel = await db.orm.public.CancellationPolicy.where({ venueId: existing.id }).first();
    if (!cancel) {
      await db.orm.public.CancellationPolicy.create({
        venueId: existing.id,
        summary: "Complimentary cancellation up to 48 hours prior to reservation.",
        cutoffHours: 48,
        depositRequired: false,
        depositPercent: 0,
      });
    }
  }

  // 6. Seed Bookable Spaces (Private Dining Rooms, Terraces, Boardrooms)
  const spaceSeedData = [
    {
      venueName: "The Oberoi Amarvilas Ballroom",
      name: "Kohinoor Executive Private Dining Suite",
      spaceType: "PRIVATE_DINING" as const,
      minCapacity: 8,
      maxCapacity: 24,
      seatedCapacity: 18,
      standingCapacity: 25,
      privacyLevel: "EXCLUSIVE",
      publicDescription: "Sound-insulated executive dining room with private reception vestibule, 4K screen, and dedicated butler service.",
    },
    {
      venueName: "The Oberoi Amarvilas Ballroom",
      name: "Grand Amarvilas Ballroom",
      spaceType: "BALLROOM" as const,
      minCapacity: 40,
      maxCapacity: 220,
      seatedCapacity: 180,
      standingCapacity: 220,
      privacyLevel: "EXCLUSIVE",
      publicDescription: "Opulent column-free ballroom with dedicated pre-function foyer for large corporate summits.",
    },
    {
      venueName: "The Oberoi Amarvilas Ballroom",
      name: "The Glasshouse Terrace",
      spaceType: "TERRACE" as const,
      minCapacity: 15,
      maxCapacity: 50,
      seatedCapacity: 35,
      standingCapacity: 50,
      privacyLevel: "SEMI_PRIVATE",
      publicDescription: "Lush botanical semi-private terrace for sunset cocktails and senior leadership mixers.",
    },
    {
      venueName: "Cyber Hub Social Corporate Lounge",
      name: "Cyber Vault Private Dining Booths",
      spaceType: "SEMI_PRIVATE_DINING" as const,
      minCapacity: 6,
      maxCapacity: 20,
      seatedCapacity: 16,
      standingCapacity: 20,
      privacyLevel: "SEMI_PRIVATE",
      publicDescription: "High-top booth section with private acoustic sound damping and dedicated drink service.",
    },
    {
      venueName: "Cyber Hub Social Corporate Lounge",
      name: "The Mezzanine Event Clubroom",
      spaceType: "CLUB_EVENT_SPACE" as const,
      minCapacity: 25,
      maxCapacity: 100,
      seatedCapacity: 70,
      standingCapacity: 100,
      privacyLevel: "EXCLUSIVE",
      publicDescription: "Full upper-tier buyout space with integrated stage, DJ booth, and high-speed presentation screens.",
    },
    {
      venueName: "The Imperial Ballroom",
      name: "Viceroy Boardroom & Salon",
      spaceType: "BOARDROOM" as const,
      minCapacity: 6,
      maxCapacity: 18,
      seatedCapacity: 14,
      standingCapacity: 18,
      privacyLevel: "EXCLUSIVE",
      publicDescription: "Polished mahogany boardroom table with presidential dining service and state-of-the-art teleconferencing.",
    },
    {
      venueName: "The Imperial Ballroom",
      name: "The Royal Imperial Ballroom",
      spaceType: "BALLROOM" as const,
      minCapacity: 60,
      maxCapacity: 300,
      seatedCapacity: 240,
      standingCapacity: 300,
      privacyLevel: "EXCLUSIVE",
      publicDescription: "Historic crystal-chandelier grand ballroom in central New Delhi.",
    },
  ];

  const spaceMap = new Map<string, number>();

  for (const s of spaceSeedData) {
    const venueId = venueMap.get(s.venueName);
    if (!venueId) continue;

    const existing = await db.orm.public.BookableSpace.where({ venueId })
      .where((item) => item.name.eq(s.name))
      .first();

    if (!existing) {
      const space = await db.orm.public.BookableSpace.create({
        venueId,
        name: s.name,
        spaceType: s.spaceType,
        minCapacity: s.minCapacity,
        maxCapacity: s.maxCapacity,
        seatedCapacity: s.seatedCapacity,
        standingCapacity: s.standingCapacity,
        privacyLevel: s.privacyLevel,
        publicDescription: s.publicDescription,
        status: "ACTIVE",
        isActive: true,
      });
      console.log(`✅ Seeded bookable space: ${s.name} (${s.spaceType})`);
      spaceMap.set(s.name, space.id);
    } else {
      spaceMap.set(s.name, existing.id);
    }
  }

  // 7. Seed Offerings & Set Menus (Paise pricing)
  const offeringSeedData = [
    {
      venueName: "The Oberoi Amarvilas Ballroom",
      spaceName: "Kohinoor Executive Private Dining Suite",
      name: "5-Course CXO Degustation Table",
      offeringType: "SET_MENU" as const,
      pricingBasis: "PER_PERSON" as const,
      baseAmount: 650000, // ₹6,500 in paise
      minimumSpend: 5000000, // ₹50,000 in paise
      minGuests: 6,
      maxGuests: 20,
      dietaryNotes: "Includes bespoke Vegetarian & Non-Vegetarian chef pairings",
      description: "Custom 5-course plated dining experience featuring premium seasonal ingredients and personal sommelier introduction.",
    },
    {
      venueName: "The Oberoi Amarvilas Ballroom",
      spaceName: null,
      name: "Executive Summit Gala Dinner Package",
      offeringType: "FIXED_EVENT_PACKAGE" as const,
      pricingBasis: "PER_PERSON" as const,
      baseAmount: 480000, // ₹4,800 in paise
      minimumSpend: 15000000, // ₹1,50,000 in paise
      minGuests: 25,
      maxGuests: 200,
      dietaryNotes: "Multi-cuisine live stations with dedicated Jain & Vegan counters",
      description: "Comprehensive dinner package for enterprise annual summits, including appetizers, gourmet buffet, and dessert stations.",
    },
    {
      venueName: "Cyber Hub Social Corporate Lounge",
      spaceName: "Cyber Vault Private Dining Booths",
      name: "Quarterly Strategy Dinner & Cocktails",
      offeringType: "PER_PERSON_PACKAGE" as const,
      pricingBasis: "PER_PERSON" as const,
      baseAmount: 320000, // ₹3,200 in paise
      minimumSpend: 2500000, // ₹25,000 in paise
      minGuests: 6,
      maxGuests: 18,
      dietaryNotes: "Finger food, artisanal flatbreads, and main course bowls",
      description: "Designed for high-performing engineering and sales pods celebrating quarterly targets.",
    },
    {
      venueName: "The Imperial Ballroom",
      spaceName: "Viceroy Boardroom & Salon",
      name: "Presidential 4-Course Boardroom Luncheon",
      offeringType: "SET_MENU" as const,
      pricingBasis: "PER_PERSON" as const,
      baseAmount: 550000, // ₹5,500 in paise
      minimumSpend: 4000000, // ₹40,000 in paise
      minGuests: 6,
      maxGuests: 16,
      dietaryNotes: "Fine-dining Continental & North Indian plated courses",
      description: "Tailored for half-day board meetings with seamless working lunch service.",
    },
  ];

  for (const o of offeringSeedData) {
    const venueId = venueMap.get(o.venueName);
    const spaceId = o.spaceName ? spaceMap.get(o.spaceName) ?? null : null;
    if (!venueId) continue;

    const existing = await db.orm.public.Offering.where({ venueId })
      .where((item) => item.name.eq(o.name))
      .first();

    if (!existing) {
      await db.orm.public.Offering.create({
        venueId,
        bookableSpaceId: spaceId,
        name: o.name,
        offeringType: o.offeringType,
        pricingBasis: o.pricingBasis,
        baseAmount: o.baseAmount,
        currency: "INR",
        minimumSpend: o.minimumSpend,
        minGuests: o.minGuests,
        maxGuests: o.maxGuests,
        dietaryNotes: o.dietaryNotes,
        description: o.description,
        isActive: true,
        isDiscoverable: true,
      });
      console.log(`✅ Seeded offering: ${o.name} (₹${o.baseAmount / 100})`);
    }
  }

  // 8. Seed Verification Records
  for (const [providerName, orgId] of providerMap.entries()) {
    const existing = await db.orm.public.VerificationRecord.where({ providerOrgId: orgId }).first();
    if (!existing) {
      await db.orm.public.VerificationRecord.create({
        providerOrgId: orgId,
        status: "VERIFIED",
        verifiedAt: new Date().toISOString(),
        verifiedBy: "ananya.sharma@northstarconsumer.com",
        verificationSource: "PHYSICAL_AUDIT_&_FSSAI_CHECK",
        notes: "Onboarding audit complete. Clean private dining facilities, verified commercial GSTIN registration.",
      });
      console.log(`✅ Seeded verification audit for ${providerName}`);
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
