# Wilsco — Progress: the first seven weeks

**Period:** mid-June — 8 August 2026 · **Location:** Melbourne, Australia
**Who:** Wilson (wilsco) — a public ~18-month repositioning from sales into AI engineering, documented in the open. GitHub: [wils-co](https://github.com/wils-co) · X: [wilsco_](https://x.com/wilsco_)

## The goal

A credible transition into AI engineering evidenced through working systems, real measurements, and decision records — not job titles. Platform: Mac Studio M3 Ultra, 256 GB unified memory, chosen because single-user decode on Apple Silicon is memory-bandwidth-bound, so mixture-of-experts models (small *active* parameter counts) give big-model quality at small-model speed, and 256 GB holds several model families resident at once. Git, CLI tooling, Python environments, launchd automation, model serving, and agent orchestration all self-taught along the way — starting from sales, not software.

## Timeline

- **Mid–late June 2026 — arrival and first automations.** The Studio lands. First projects within days: scheduled data pipelines on launchd, a personal mission-control dashboard, a curriculum-aligned learning platform scaffold for the kids (Khaizen), first local inference experiments. Most of this era's code was later superseded — that's the point of keeping it.
- **5–7 July — the second brain, and the first principle written down.** Plain-markdown PARA vault as shared memory for every agent, git-tracked, with human-vs-AI provenance on every file. Core principle recorded: **active parameters, not total parameters, set throughput.** First real A/B on an actual task (editing a file per written conventions): the slower model followed instructions reliably and won the default slot. Same stretch: built the session-summariser that now feeds this page's source notes — then disabled its automatic end-of-session trigger after it fired on the wrong signal (see What failed).
- **8–10 July — root causes, not workarounds.** A hard crash in agentic loops traced to a stock chat-template landmine and patched at template level. Bigger find: identical weights failed on one serving runtime and ran clean on two others — **the serving layer is part of the system.** A fixed-task 100-point eval series across nine configurations landed the keeper setup: frontier orchestrator + local worker scored 100/100, but only on the right engine.
- **Mid-July — real workloads move local.** A household finance workflow migrated off a cloud chat product into a local pipeline: rules-as-markdown categorisation engine, locked match order, golden-replay tests, React dashboard. First run on real monthly data landed at ~72% auto-categorised; iterated against the actual failures, not synthetic ones, to 100% auto across 190 unique transactions for that close (one-offs folded into rules; later months still expected to leave judgment cases). Verification became a two-model ritual (one designs falsifiable tests, another executes; neither trusted alone). First stack audit on record; team roster given a single source of truth with named seats, engine rules, and a change log.
- **23–28 July — the eval gauntlet.** Purpose-built harnesses (game-generation rigs with real syntax gates, scope-locked workspaces, judge-verified drills) surfaced the local tier's true failure modes: polished code with fatal one-character bugs, verbal commitment without a single tool call, rewrite spirals on trivial tasks. Two findings publicly retracted when re-testing showed the test method was the bug. A task-grounded bake-off on a real production job: every model that ran the pipeline converged on the identical correct answer, but local models fumbled execution/delivery three distinct ways while API models went clean first try — conclusion recorded with caveats attached.
- **26–31 July — agent-os.** A single-file fleet-control dashboard (stdlib Python + one HTML file) reading every engine's on-disk state: live activity, token usage, session viewer, project board, nightly self-audit. v1 → v8.1 in six days, multi-agent authored with an explicit provenance map. Discovers engines dynamically — and found more running profiles than the docs claimed, plus real bugs in the stack it observes: a stale state file, a broken scheduled delivery, a timezone bug hiding half a day of usage data.
- **30–31 July — decisions become a pipeline.** A repeatable stack-fit system: every candidate tool gets a structured brief (gap it closes, collisions, smallest honest experiment) and a verdict — adopt / trial / park / skip — with a lifecycle and an auto-generated index. Nine verdicts in two days; at most two trials at once.
- **1–8 August — testing the fleet instead of trusting it.** The identical real job — pull two YouTube transcripts, distill into an HTML page — run on three model seats in parallel: a fast free cloud-routed model finished with a complete artifact; a slower local model needed a manual nudge past its own iteration cap; a third failed three tool calls (including a syntax error) and produced nothing. The winning output wasn't taken at its word — speaker lines and headline quotes checked against an independent transcript; a stack-speed claim in the same page did not survive that check. Separately, a two-week-old "can't be trusted with stateful code" verdict on a local model got re-tested rather than carried forward: mechanical probes reversed the hard deny to conditional (two July-failing game builds passed in August). Paired with a stronger reasoning model as its planner, the same model cleared a task class it had died on solo in July. One stubborn failure along the way was a permission-grammar bug blocking file access, not a capability gap — found and fixed.

## Running now

| System | Status | One-liner |
| --- | --- | --- |
| Local agent team | Active practice | Named seats on defined engines; orchestrator judges, locals draft; hard serving rules earned through testing |
| Hermes | Active | Independent agent colleague — own loop, tools, memory; terminal or Telegram |
| [agent-os](/work/agent-os/) | v8.1, open source | Fleet-control dashboard across 10 engines with a nightly self-audit that has caught real faults |
| Second brain | Ongoing system | Markdown vault with human-vs-AI provenance; shared storage, not shared memory |
| Householdoor | In production | Local categorisation engine with golden-replay tests; doubles as a model-reliability harness |
| Open practice of learning | Living | Distilled topic notes, stack-fit decision cards, recurring audits — the source this page is curated from |

## Measured, not assumed

Decode speed per model on this machine (the table behind the MoE-first policy):

| Model | Architecture | tok/s |
| --- | --- | --- |
| gemma-4-26b-a4b (QAT 4-bit) | MoE, 4B active | ≈100 |
| qwen3.6-35b-a3b (8-bit) | MoE, 3B active | ≈80 |
| qwen3.6-27b (4-bit + speculative decode) | Dense 27B | ≈50 |
| qwen3.6-27b (8-bit) | Dense, all 27B active | ≈23 |
| gemma-4-31b (8-bit) | Dense, all 31B active | ≈20 |

Also on record: a 100/100 orchestrator+worker score on a fixed judged task; a three-model tie at 100% on pure tool-calling mechanics (the reliability gap lives elsewhere); a 156 GB frontier-class local model that passed a production gate exactly, then benchmarked at ≈7.5 tok/s and was filed as "background jobs only"; a free cloud-routed seat that outdelivered two local seats on an identical real task — quotes and speakers checked against an independent transcript; one stack claim in that page did not.

## What failed (the curriculum)

A session-summary hook fired twenty times in two minutes and polluted its own dataset — then, run on its own build log, showed a self-referential misread and a truncation bug that dropped the first ~24,000 characters of long transcripts. The most polished code repeatedly hid the most severe bugs — including a local function shadowing a JavaScript built-in, recursing infinitely on first click. One model verbally committed to a task across four turns without ever calling a tool. Credible, well-hedged advice made results measurably worse because it came from a different serving stack. Stateful single-file app generation was gated **closed** for the local tier in late July; August re-tests moved that class to **conditional** (run-verify before ship), in writing, in the same record. Twice in one day, written findings were retracted in place when re-testing showed the method, not the model, was at fault.

## Principles, earned the slow way

1. **Reliability > speed > size.** A fast model that malforms tool calls is useless in an agent loop. A broken free worker costs more than no worker (~2.4× once recovery is counted).
2. **Active params, not total params.** Decode is bandwidth-bound; prefer MoE. Dense models above ~14B get slow fast on a single stream.
3. **The serving layer is part of the model.** Identical weights failed on one runtime and ran clean on two others. Test the pair, never the model alone.
4. **Orchestrator judges; locals draft.** The judge is the quality ceiling.
5. **Never accept "done" without tracing it.** Models have claimed exit codes that never happened. Polish is not a correctness signal.
6. **Measure on real tasks, not benchmarks.** Every keeper decision came from a judged fixed task or a production job.
7. **Roles over a model zoo.** Adding a model is a roster decision with a test gate.
8. **Retract in writing.** Corrections live in the same file as the claim. The record is the asset.

---

*Curated from the private vault's distilled notes. Absolute dates, Australian English, no figures that aren't mine to publish.*
