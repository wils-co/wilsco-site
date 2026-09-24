# Wilsco · Progress: fourteen weeks in

**Period:** mid-June to 24 September 2026 · **Location:** Melbourne, Australia
**Who:** Wilson (wilsco), moving from sales into AI engineering over about 18 months, in the open. GitHub: [wils-co](https://github.com/wils-co) · X: [wilsco_](https://x.com/wilsco_)

In mid-June 2026 a Mac Studio arrived and I started a public move from a sales career into AI engineering. This page is what fourteen weeks of evenings and weekends has actually produced, including the parts that broke.

## The goal

I'm aiming to move into AI engineering over about eighteen months, and I want the evidence to be public: working systems, real measurements and written-down decisions rather than a job title. The machine is a Mac Studio M3 Ultra with 256 GB of unified memory. I chose it for one reason. On Apple Silicon, single-user decode speed is limited by memory bandwidth, so mixture-of-experts models, which only use a small number of *active* parameters for each token, give you big-model quality at small-model speed. And 256 GB is enough to keep several different model families loaded at once.

I taught myself everything below as I went: Git and GitHub, the command line, Python environments, launchd automation, model serving and agent orchestration. I came to this from sales, not software.

## Timeline

### Mid–late June 2026: Arrival and first automations

The Studio arrived and I had projects running within days: scheduled data pipelines on launchd, a personal mission-control dashboard, a curriculum-aligned learning platform scaffold for my kids (Khaizen), and my first local inference experiments. Most of that code has since been replaced. I keep it anyway, because it shows where I started.

### 5–7 July 2026: The second brain, and the first principle written down

I set up a plain-markdown vault, organised with PARA, as shared memory for every agent on the machine. It's tracked in git, and every file records whether a human or an AI wrote it. I also wrote down the principle the whole stack rests on: **active parameters, not total parameters**, set the speed. The first real A/B test came straight after. I gave two models an actual task, editing a file according to written conventions. The slower one followed the instructions properly, so it got the default slot. In the same stretch I built the session summariser that now feeds this page, then switched off its automatic end-of-session trigger after it fired on the wrong signal (more on that under What failed).

### 8–10 July 2026: Root causes, not workarounds

I traced a hard crash in agent loops to a landmine in a stock chat template and fixed it in the template itself. Then a bigger find: a model that failed in one serving runtime ran cleanly in two others, with exactly the same weights. **The serving layer is part of the system.** A fixed-task eval series, scored out of 100 across nine configurations, settled my setup. A frontier orchestrator handing work to a local worker scored 100/100, but only when the worker ran on the right engine.

### Mid-July 2026: Real workloads move local

I moved my household finance workflow off a cloud chat product and onto a local pipeline. It's a categorisation engine whose rules live in markdown, with a fixed match order, golden-replay tests and a React dashboard. The first run on a real month's data categorised about 72% automatically. I worked through the actual failures rather than made-up ones until that month's close hit 100% across 190 unique transactions. One-offs got folded into rules, and I still expect later months to need some judgment calls.

Checking became a two-model routine: one agent writes tests that could genuinely fail, another runs them, and I don't trust either on its own. I also did my first stack audit and gave the agent roster a single source of truth, with named seats, engine rules and a change log.

### 23–28 July 2026: The eval gauntlet, and honest failure logs

I spent a week building test rigs: game-generation setups with real syntax checks, workspaces locked to a scope, and drills marked by a judge. They showed how the local models really fail. Polished code with a fatal one-character bug. Models claiming success without calling a single tool. Rewrite spirals on trivial tasks. I also retracted two findings publicly, in the same file, when re-testing showed my test method was the problem rather than the model.

The week ended with a bake-off on a real production job. Every model that actually ran the pipeline reached the same correct answer, but the local models fumbled running or delivering it in three different ways, while the API models got it right first time. I wrote that conclusion down with its caveats attached and didn't turn it into a rule.

### 26–31 July 2026: [agent-os](/work/agent-os/): one screen for the whole fleet

A single-file dashboard, with a plain Python backend and one HTML file, that reads every engine's state from disk and answers my morning questions in under two minutes: who's running, what's using resources, and where the handoffs are. A team of agents took it from v1 to v8.1 in six days, and I kept a map of who wrote what.

It finds engines by itself instead of trusting a list, and straight away it found more running profiles than my docs said existed. It also caught real bugs in the stack it watches: a stale state file, a broken scheduled delivery, and a timezone bug that was hiding half a day of usage data.

### 30–31 July 2026: Decisions become a pipeline

I built a repeatable way to answer "should I adopt this?". Every candidate tool gets a short brief: the gap it fills, what it clashes with, the smallest honest experiment, and a verdict of adopt, trial, park or skip. Briefs have a lifecycle and an index that builds itself. I had nine verdicts in the first two days, and a standing rule that no more than two things are on trial at once.

### 1–8 August 2026: Testing the fleet instead of trusting it

I ran the same real job on three model seats at once: pull two YouTube transcripts and distill them into an HTML page. A fast, free, cloud-routed model finished with a complete page. A slower local model needed a manual nudge past its own iteration limit. The third failed three tool calls, one of them a syntax error, and delivered nothing. I didn't take the winner at its word either. I checked its speaker lines and headline quotes against a separate transcript, and one claim about my own stack's speed didn't survive.

Separately, I re-tested a two-week-old verdict that a local model couldn't be trusted with stateful code, instead of just carrying it forward. Mechanical probes turned the hard no into a conditional yes: two game builds that failed in July passed in August. Paired with a stronger reasoning model as its planner, the same model then handled a kind of task it had died on alone in July. One stubborn failure along the way turned out to be a permission-grammar bug blocking file access, not a lack of ability. I found it and fixed it.

### 9–18 August 2026: A research pipeline that files its own notes

I read a lot of X threads and YouTube videos about AI tooling, and most of it used to vanish into bookmarks. Now there's a distill button on my dashboard. It sends a post or transcript to a free cloud model and files a structured page into my notes library. From 12 August a second loop grades those pages against a rubric and flags the thin ones for another pass. To choose the model for the heavier synthesis work, I ran the same messy 30,000-token bundle through three candidates and compared what came back.

### 13–22 August 2026: New models had to earn their seats

Two big model releases landed in the same week. I ran the same hard prompt through the old and new versions. Both passed and the new ones were a little more polished, so I changed a default and left the architecture alone. A dense 27B coding model won the careful-worker seat after head-to-head runs from 15 to 17 August. On 21 August I swapped the local 35B seat to a new build and retired a relay that had been quietly routing its thinking through a cloud model. The same week produced a reusable eval skill, so the next model swap is a command I run rather than a small project.

### 18–25 August 2026: Building the place this page lives

I made the first commit of this site on 18 August. On the 21st I put Cloudflare in front of wilsco.au, so one domain now serves the landing page, this report and tunnels back to the Studio. The same day I wrote a candid review of my public presence against the 18-month goal. An llms.txt file and a proper agent-os page followed on the 25th.

### 21–25 August 2026: [agent-os](/work/agent-os/) goes open source

I moved the routing policy into one file that says which seat does which job. The seats got little avatars on the dashboard, which helps more than it sounds when you're scanning ten of them. I hardened the server with an explicit route list, capped caches and authenticated writes, then open-sourced it. Stripping personal details out of the public copy took three passes, because the first two kept missing things.

### 25–28 August 2026: Trading, starting with a rule

Before I built any trading tools I wrote one rule down: the model never places orders. It can write specs, review my journal and point out anything odd. A plain, deterministic risk engine sits between any idea and any exchange, and it has the final veto. On 28 August I built a read-only market desk on that rule, and everything I've built for trading since has kept to it.

### 26 August 2026: Six weeks, boiled down

By late August I had six weeks of raw session logs and kept relearning the same lessons. So I condensed them into four reference notes: why local speed numbers so often don't hold up, a runbook of every gateway and tunnel failure that had already cost me an evening, the common serving pitfalls, and a map of which instruction files each coding agent actually reads. They don't all read the same files, and that difference had caused real bugs.

### 27 August – 5 September 2026: A real website for a real practice

My wife Julia is a dentist, and we're setting up her practice, Smiles by Design in Wheelers Hill. I look after the digital side. It started with a homepage prototype, a tooth-anatomy explainer, a look at a competitor's site and a catchment analysis. On 3 and 4 September it became a proper 14-page site: copy for eight treatments, a local SEO pack, an icon set, and then a restyle into something quieter and more boutique with a little scroll motion.

Every treatment page went through a pass against Australia's rules for health advertising. That means no outcome testimonials, no "guaranteed" or "best", and no before-and-after galleries that suggest a typical result. The site was deployed on the 5th, and [the code is public](https://github.com/wils-co/jaws-dental-practice).

### 8–11 September 2026: One brief, three models, three answers

Then I got distracted in a good way. I pulled apart bunqlabs.com, a site with beautiful WebGL motion, and noticed it draws all its text inside the canvas and leaves Google a few hidden lines. I wanted that polish without giving up real, crawlable text. So I gave the same brief to three agents from three different model families and let each one build a hero for the practice site.

agy (Gemini) made a night-time fluid simulation with the headline refracted through it. Claude Code made a pinned stage of 69,000 particles with real HTML text sitting on top. Grok Build started on a pale limestone bench and faded to night as a veneer dissolved into a point cloud. Same brief, three quite different tastes, which is exactly why I keep more than one model family around. On the 11th I put together a hands-on course covering the whole pipeline, right down to rendering in Blender on the Studio's GPU with no window open.

### 5–13 September 2026: [liq-tape](https://github.com/wils-co/liq-tape): a dashboard for reading liquidity

This started with an X thread about "liquidity grabs" and a simple question: is there anything real under the hype? US CPI came out that week and answered it live. ETH jumped more than $150 in under an hour as $215M of short positions were liquidated one after another, then gave most of it back. BTC swept its early-month lows, reclaimed them, ran and reversed. Both moves showed up clearly in the positioning data as they happened. What the data couldn't show me was intent, at least not until afterwards.

I turned that into a written framework and then into liq-tape, a read-only dashboard with open interest, order-book depth, funding and my own hand-drawn price levels on one screen. The rule is that it shows data and never gives signals: no alerts, no auto-detection, no orders, and CI checks enforce that. Review cut the first spec from seven panels to four and caught two things I'd assumed wrongly. Hyperliquid has no public liquidation feed, and the heatmap API I planned to use costs money. Six PRs went in over two days, each one reviewed before merging. At one point branch protection blocked my own merge because a rule named a check wrongly. Annoying, and exactly what I'd set it up to do.

### 14–17 September 2026: More layers on the board

Six more PRs: order-book walls and sampled CVD, a one-screen time-by-price view, a liquidation map rebuilt from the positions of the 200 largest accounts, a view of which liquidation clusters have already been swept, a live trade feed over websocket, and trade markers you can read without colour. I'm red-green colourblind, so that last one mattered to me. Old samples are archived after ten days, never deleted, and I can open the board from anywhere behind a login.

### 17–24 September 2026: Taking the desk to my phone

The board is great at a desk and useless on a phone. So I added a Telegram command: type "tape eth" and you get a one-screen summary built from the local board, with no calls out to the exchange and almost no cost. Everything uses arrows and plus/minus signs instead of red and green.

I also tested my own take-profit habit, where I anchor Fibonacci levels on candle bodies, against 1,000 bars of SOL on three timeframes. Price came back to the midline about 83–88% of the time and retraced fully about half the time. Useful context, but not a signal.

### 18–24 September 2026: The paper book, published in R

The desk grew into a paper-trading harness. Every trade is a ticket with a stop, sized from a fixed risk budget and checked by hard rules: a per-trade risk cap, a daily loss cap, a leverage cap and a drawdown kill switch. Each trade is tagged with its setup and closed at a real price.

On 24 September the journal started publishing itself. One command writes a [public ledger](https://github.com/wils-co/agent-trade-harness/blob/main/TRADES.md) and an equity curve in R, meaning profit or loss per unit of risk, after modelled fees and funding. Dollar amounts and my balance stay on my machine. After the first four closed trades it's +5.38R: three wins and one loss of −1.11R. That's four trades. No setup counts as an edge until it has thirty, and these are paper trades. The harness can't place real orders.

## Running now

| System | Status | What it is |
| --- | --- | --- |
| Local agent team | Active practice | Named seats on defined engines. A frontier orchestrator judges and hands out work, local models draft and execute, and the serving rules came from testing. Every model has a job. |
| Hermes | Active | An agent colleague with its own loop, tools and memory. I reach it in the terminal, or over Telegram when I'm away from the machine, and I'm building it up as a peer rather than a thin bot. |
| [agent-os](/work/agent-os/) | v8.1 · open source | A dashboard that reads live state across ten engines: activity feed, token usage, session viewer, project board, and a nightly self-audit that has caught real faults. |
| Second brain | Ongoing system | A markdown vault every agent can read and write, with a note on every file of whether a human or an AI wrote it. The storage is shared, but each agent pays its own cost to read it, and that difference matters. |
| Householdoor | In production | The local categorisation engine, with rules in markdown, golden-replay tests and a dashboard. I moved it off a cloud chat product, and it now doubles as a test bench for model reliability. |
| Open practice of learning | Living | Distilled topic notes, stack-fit decision cards and regular audits. This page is curated from them. |
| Smiles by Design | Live build | Julia's practice site: 14 pages, copy checked against health-advertising rules, and three motion prototypes on the bench. |
| [liq-tape](https://github.com/wils-co/liq-tape) | Public repo | My read-only liquidity dashboard. It shows the data and leaves the decisions to me, and CI blocks anything that looks like a signal. |
| [Trade harness](https://github.com/wils-co/agent-trade-harness) | Paper · public ledger | Paper trading with hard risk limits. The journal publishes itself in R, and dollar figures never reach the repo. |
| Research pipeline | Active | One click turns a post or video into a filed note, and a second loop checks the work. |

## Measured, not assumed

Decode speed on this machine, measured per model. This table is why I prefer mixture-of-experts models: the active parameters (the `a4b` / `a3b` in the names) set the speed, not the total size.

| Model | Architecture | tok/s |
| --- | --- | --- |
| gemma-4-26b-a4b (QAT 4-bit) | MoE, 4B active | ≈100 |
| qwen3.6-35b-a3b (8-bit) | MoE, 3B active | ≈80 |
| qwen3.6-27b (4-bit + speculative decode) | Dense 27B | ≈50 |
| qwen3.6-27b (8-bit) | Dense, all 27B active | ≈23 |
| gemma-4-31b (8-bit) | Dense, all 31B active | ≈20 |

Other results on record: 100/100 for a frontier orchestrator plus a local worker on a fixed, judged task. A three-way tie at 100% on pure tool-calling mechanics, which tells me the reliability gap is somewhere else. A 156 GB frontier-class local model that passed a production gate exactly, then ran at about 7.5 tok/s, so I filed it as "background jobs only". And a free, cloud-routed seat that did better than two local seats on the same real task. I checked its quotes and speakers against a separate transcript, and one claim about my stack in that page didn't hold.

## What failed

Building in public means writing down what broke, because that's where most of the learning happened. A session-summary hook fired twenty times in two minutes and polluted its own data. When I ran it on its own build log, it misread itself and exposed a truncation bug that dropped the first 24,000 or so characters of long transcripts. The most polished code kept hiding the worst bugs, including a local function that shadowed a JavaScript built-in and recursed forever on the first click. One model promised to do a task across four turns and never called a tool. Sensible, well-hedged advice from a credible source made my results measurably worse, because it came from a different serving stack. In late July I marked stateful single-file app builds as **closed** for the local models. August re-tests moved them to **conditional**, meaning run it and verify before shipping, and I recorded the change in the same file.

Twice in one day I retracted findings I'd already written down, because re-testing showed the test method was at fault rather than the model. If the record isn't honest, it's worthless.

Late August and September had their share too. Two agents edited two different copies of the practice site on the same day, and three pairs of files quietly drifted apart. I fixed it by making the repo the only place anything gets edited. The copy I read on my phone is now generated from it, with a do-not-edit banner and a check that fails if they drift.

A draft spec for liq-tape assumed a live liquidation feed that doesn't exist. If review hadn't caught it, the main panel would have shown guesses dressed up as data. My drawdown figure was divided by current equity instead of the previous peak, so it looked worse exactly when I was losing and better once I'd recovered. It now measures how far I am below the high-water mark. And going public took more than one try: the agent-os snapshot needed a third cleaning pass, and the trading repo's first push left my account size readable in a config file and a test. Those values now stay on my machine.

## Principles, earned the slow way

1. **Reliability beats speed beats size.** A fast model that mangles tool calls is useless in an agent loop. A broken free worker costs more than having no worker at all, about 2.4 times more once you count the clean-up.
2. **Active params, not total params.** On Apple Silicon, single-stream decode is limited by memory bandwidth. I prefer mixture-of-experts models, because dense models above about 14B get slow quickly.
3. **The serving layer is part of the model.** The same weights failed on one runtime and ran cleanly on two others. I test the model and runtime together, never the model alone.
4. **The orchestrator judges, local models draft.** A frontier model sets the quality ceiling and local models do the volume. Quality gets decided by the judge.
5. **Never accept "done" without checking.** Models have claimed passing exit codes that never happened. Polish doesn't mean correct, so I run it and look, every time.
6. **Measure on real tasks.** Every decision I kept came from a fixed task with a judge and a rubric, or from a real production job. None came from a leaderboard.
7. **Roles, not a model zoo.** Named seats with defined jobs and one source of truth. Adding a model is a roster decision with a test to pass, so models don't just pile up.
8. **Retract in writing.** When a finding turns out wrong, I correct it in the same file and say why. The record is the asset.
9. **One copy of everything.** If two copies can both be edited, they'll drift. Generate the second one instead.
10. **The model never places orders.** It describes and checks. A deterministic rule has the veto, and I make the call.
11. **Different families, not copies.** Three model families on one brief gave me three different designs. Three copies of one model would have given me one.

---

*Curated from my private vault's distilled notes. Absolute dates, Australian English, and no figures that aren't mine to publish.*
