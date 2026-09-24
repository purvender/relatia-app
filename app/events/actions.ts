"use server";

import { redirect } from "next/navigation";
import { requireAppUser } from "@/lib/auth";
import { db } from "@/prisma/db";
import { submitEventForApproval } from "@/lib/events/submit-event-for-approval";

function readString(formData: FormData, key: string) {
  const value = formData.get(key);

  if (typeof value !== "string") {
    throw new Error(`${key} is required.`);
  }

  return value.trim();
}

function readPositiveInt(value: string, field: string) {
  const parsed = Number(value);

  if (!Number.isFinite(parsed) || parsed <= 0 || !Number.isInteger(parsed)) {
    throw new Error(`${field} must be a positive whole number.`);
  }

  return parsed;
}

function readPositiveMoneyRupees(value: string, field: string) {
  const parsed = Number(value);

  if (!Number.isFinite(parsed) || parsed <= 0) {
    throw new Error(`${field} must be greater than 0.`);
  }

  return Math.round(parsed * 100);
}

export async function createEventAction(formData: FormData) {
  const user = await requireAppUser();

  const title = readString(formData, "title");
  const eventType = readString(formData, "eventType");
  const purposeRaw = readString(formData, "purpose");
  const city = readString(formData, "city");
  const dateTime = readString(formData, "dateTime");
  const attendeesValue = readString(formData, "attendees");
  const budgetValue = readString(formData, "budget");
  const dietRaw = readString(formData, "diet");

  if (title.length < 3) {
    throw new Error("Title must be at least 3 characters.");
  }

  if (eventType.length < 2) {
    throw new Error("Event type must be at least 2 characters.");
  }

  if (city.length < 2) {
    throw new Error("City must be at least 2 characters.");
  }

  const attendees = readPositiveInt(attendeesValue, "Attendees");
  const budgetPaise = readPositiveMoneyRupees(budgetValue, "Budget");

  const parsedDate = new Date(dateTime);

  if (Number.isNaN(parsedDate.getTime())) {
    throw new Error("Please provide a valid event date and time.");
  }

  const policy = await db.orm.public.Policy.where({ companyId: user.companyId }).first();

  if (!policy) {
    throw new Error("No company policy found. Please complete onboarding first.");
  }

  const cityAllowed = policy.allowedCities.some(
    (allowedCity) => allowedCity.toLowerCase() === city.toLowerCase(),
  );

  if (!cityAllowed) {
    throw new Error(`City is not allowed by company policy.`);
  }

  if (budgetPaise > policy.maxBudget) {
    throw new Error("Budget exceeds company max budget policy.");
  }

  const perPerson = Math.floor(budgetPaise / attendees);

  if (perPerson > policy.perPersonCap) {
    throw new Error("Per-person budget exceeds company policy.");
  }

  const event = await db.orm.public.Event.create({
    companyId: user.companyId,
    createdById: user.id,
    title,
    eventType,
    purpose: purposeRaw || null,
    city,
    dateTime: parsedDate.toISOString(),
    attendees,
    budget: budgetPaise,
    diet: dietRaw || "NONE",
    status: "DRAFT",
  });

  redirect(`/events`);
}

export async function submitEventForApprovalAction(eventId: number) {
  if (!Number.isInteger(eventId) || eventId <= 0) {
    throw new Error("Invalid event ID.");
  }
  return await submitEventForApproval(eventId);
}