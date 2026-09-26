## Summary

<!-- Provide a concise summary of the changes introduced in this pull request. -->

## Motivation & Context

<!-- Why is this change required? What problem does it solve? Relate to the 35-day roadmap or issue number if applicable. -->

## Changes Checklist

- [ ] Route or Page Changes
- [ ] Database Schema / Migration Changes
- [ ] UI / Styling / Motion Updates
- [ ] Server Action / API Route Changes
- [ ] Documentation Updates

## Testing & Verification

<!-- List the exact commands executed and testing steps performed. -->

- [ ] `npx tsc --noEmit` passed with 0 errors
- [ ] `npm run lint` passed with 0 errors
- [ ] `npm run build` passed with 0 errors
- [ ] Tested on mobile viewport (375px/390px)
- [ ] Tested on desktop viewport (1280px+)

## Visual / UI Evidence (Screenshots / Recordings)

<!-- Attach before/after screenshots, recordings, or terminal output if visual UI was modified. -->

## Risk Assessment & Backward Compatibility

<!-- Are there any risks of breaking existing routes, Clerk auth, multi-tenant isolation, or payment webhooks? -->
- [ ] No regression on existing routes (`/dashboard`, `/events`, `/venues`, `/dashboard/finance`)
- [ ] No exposure of credentials or secrets in `.env*`
- [ ] Multi-tenant isolation verified with `currentCompany()`

## Reviewer Checklist

- [ ] Code follows project conventions (TypeScript strict, Server Actions, Client boundary separation)
- [ ] Copy and marketing text avoids unsubstantiated claims
- [ ] Documentation in `/docs` updated if architecture or flows changed
