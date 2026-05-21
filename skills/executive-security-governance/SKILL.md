
---
name: executive-security-governance
description: Define security, access control, secret handling, gateway restrictions, and governance rules for the founder and executive workflows.
metadata: {"openclaw":{"emoji":"🛡️","safe":true}}
---

# Purpose
Use for protecting sensitive business assets, founder communications, credentials, and agent capabilities.

# Security design rules
1. Use least privilege for each agent.
2. Keep executive workflows on a dedicated agent with narrower tool permissions.
3. Store API keys and tokens in environment variables, never in prompts or markdown files.
4. Bind the gateway to loopback or a private network unless remote access is intentionally configured.
5. Require a separate admin secret for executive channels and destructive actions.
6. Keep shell/network policies restricted by allowlist.
7. Review logs and access changes weekly.

# Output format
## Sensitive Assets
## Access Tiers
## Tool Restrictions
## Secret Management Rules
## Gateway and Network Rules
## Incident Response Checklist
