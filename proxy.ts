import {
  clerkMiddleware,
  createRouteMatcher,
} from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

const isEnterpriseProtectedRoute = createRouteMatcher([
  "/dashboard(.*)",
  "/onboarding(.*)",
  "/events(.*)",
  "/approvals(.*)",
  "/venues(.*)",
  "/bookings(.*)",
  "/settings(.*)",
]);

const isPartnerProtectedRoute = createRouteMatcher([
  "/partners/portal(.*)",
]);

export default clerkMiddleware(async (auth, req) => {
  if (isEnterpriseProtectedRoute(req)) {
    await auth.protect();
  }
  if (isPartnerProtectedRoute(req)) {
    const { userId } = await auth();
    if (!userId) {
      const loginUrl = new URL("/partners/login", req.url);
      loginUrl.searchParams.set("redirect_url", req.url);
      return NextResponse.redirect(loginUrl);
    }
  }
});

export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/(api|trpc)(.*)",
  ],
};