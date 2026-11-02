# SOP 04: Something is broken

**When:** a bug, a failing build, a form that does not save, a page that looks wrong, or
behaviour that does not match the code.
**Tier:** whatever the *fix* turns out to be. Diagnosis itself is never a reason to escalate.

## Procedure

1. **Reproduce it first.** If you cannot reproduce it, you are guessing, and a guessed fix
   often makes things worse. Ask her what she clicked, on which device, and for a screenshot.
2. **Read the actual error.** The full text, not a summary and not just the exit code.
3. **Find the narrowest failing case.** One page, one form, one row.
4. **Form one hypothesis and test it.** Not three fixes at once.
5. Fix. Then check the original steps again, the way she did them.

## Where to look, in order

1. The error text, in full (browser console, build log)
2. **Production logs:** Vercel runtime errors and logs for the deployment (Vercel tools), and
   Supabase logs and advisors (Supabase tools)
3. The data itself: query the real row, do not infer it from the code
4. `error` values that were destructured away; writes without `.select('id')`
5. The launch switch file: is the page or button simply switched off?
6. Git: did a merge quietly undo an earlier fix? (SOP 03, both-sides diff)

## Green is not proof

A passing build cannot see: a column nobody selects, a wrong column name (a runtime error,
never a type error), a missing environment variable in Vercel, an RLS policy that hides rows.
For those, load the real page, logged in as the right user.

A test that has never failed proves nothing. Before trusting a new test: break the code, watch it
fail for the right reason, restore, watch it pass.

An empty result from a subagent means it died, not that it found nothing; its edits may still be
on disk.

## Gates

- [ ] Reproduced before fixing
- [ ] Real logs read (Vercel and/or Supabase), not guessed
- [ ] One hypothesis tested at a time
- [ ] Original steps re-run after the fix, in the preview
- [ ] If it cost more than an hour, or will happen again: a `docs/wiki/lessons/` page the same day,
      and the check added to the SOP or skill that would have caught it
- [ ] She got one plain sentence: what broke, why, and that it is fixed (or what is next)
