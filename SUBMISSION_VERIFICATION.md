# Submission Verification Checklist

Run these commands from `PrismStructure` and record the actual output.

- [ ] `npm install`
- [ ] `npx playwright install`
- [ ] `npm run test:smoke`
- [ ] `npm run test:regression`
- [ ] `npm run test:api`
- [ ] `npm test`
- [ ] Inspect `execution-report/results.json`
- [ ] Inspect the HTML report
- [ ] Keep traces/screenshots for real failures
- [ ] Update `ai-prompts/automation-and-debugging.md` with real evidence
- [ ] Update README with verified counts
- [ ] Commit `TraceabilityMatrix.csv`
- [ ] Validate both CSV files can be opened by Excel/GitHub
