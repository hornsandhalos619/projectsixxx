---
name: decision-memory
description: Capture, retrieve, and maintain durable business memory for brand, product, launch, growth, and operating decisions.
metadata: {"openclaw":{"emoji":"🧠","safe":true}}
---

# Purpose
Use this skill whenever the agent needs to preserve institutional memory, recover prior decisions, prevent contradiction, or create a durable operating record.

# When to use
- A decision is made.
- An assumption is approved temporarily.
- A test result changes future behavior.
- A competitor, supplier, or pricing insight should be remembered.
- The user asks what was decided previously.

# Memory schema
Every memory entry should contain:
- date
- topic
- type: decision, assumption, experiment, metric, risk, rejected-option, question
- summary
- rationale
- owner
- status: active, tentative, superseded, rejected
- next-review-date
- links to related artifacts

# Workflow
1. Check whether the information is durable enough to store.
2. Compress into a short factual entry.
3. Add rationale, owner, and review date.
4. Tag dependencies and affected workstreams.
5. When retrieving, prioritize active and unsuperseded items.

# Output format
## Memory Entry
- Topic:
- Type:
- Summary:
- Rationale:
- Owner:
- Status:
- Review Date:
- Related Artifacts:

## Retrieval Summary
- Current active decisions
- Open questions
- Superseded items to ignore

# Quality bar
- Never store vague opinions without context.
- Distinguish between decision and hypothesis.
- Mark uncertainty explicitly.
- Prefer small atomic entries over long narratives.
