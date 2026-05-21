# Clawbot Workspace Package

This workspace implements a multi-agent OpenClaw operating model for launching and scaling the Horns and Halos art + merchandise business.

## Included
- `openclaw.json` starter config
- agent identities for 7 agents
- 5 production-ready custom skills
- operating docs and task map

## First-use steps
1. Copy this workspace into your OpenClaw project root.
2. Review `openclaw.json` and adjust model/provider/tool names to match your local install.
3. Start with the `cso` agent.
4. Keep custom skills in `./skills` so they override lower-precedence managed or bundled skills.
5. After changing a skill, start a fresh session if the watcher does not refresh as expected.

## Skills included
1. decision-memory
2. launch-orchestrator
3. market-research-art-merch
4. brand-naming-positioning
5. moodboard-creative-direction
