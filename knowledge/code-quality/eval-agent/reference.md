# eval-agent Reference

Evaluation set management: 12 skills + 1 agent for creating, updating, and running evaluation sets. Add entities, generate queries, track quality metrics.

This is a **knowledge package** -- consult on demand, not loaded into the brain.

---

## Skill: download-evalset


When downloading evalsets, download the zip file in the `evalsets` folder in the root of the project. Do not download to any other folder. Then unzip it in the same folder and ensure that the folder name is the evalset name. Do not create additional folders.

For example, if the evalset is called "my-evalset":
* The zip file must be downloaded as `evalsets/my-evalset.zip`
* The unzipped folder should be `evalsets/my-evalset`.
* Finally, delete the downloaded zip file.

The download_evalset tool will return a URL that requires authentication. Use the `sources/Download-Asset.ps1` script to download the file using the provided URL. You can execute the script from the command line like this:

```powershell -ExecutionPolicy Bypass -File scripts/Download-Asset.ps1 -Url "URL_FROM_TOOL"
```

If the evalset fails to download inform the user and ask them to try again. Do not try alternative downloading methods. If there's already an evalset by that name in the `evalsets/` folder, inform the user and ask them to delete the folder first and cancel the download.

The EcoSync evalset is quite big and may only be downloaded manually by the user. Ask the user to:

* Download it from aka.ms/ecosync
* Unzip it in the `evalsets/` folder and ensure that the unzipped folder is named `EcoSync`.
---

## Skill: egp


# EGP CLI Skill

Operate the EGP CLI tool (`egp`) to interact with ChatService EGP and CStore APIs.

## Prerequisites

- **Python 3.10+** installed
- **Azure CLI** (`az`) installed and on PATH for authentication
- **Azure login**: `az login --tenant 72f988bf-86f1-41af-91ab-2d7cd011db47` (auto-triggered if expired)

### Install EGP CLI

If `egp` is not installed, run:

```bash
# One-off: install Azure Artifacts keyring for authentication
pip install artifacts-keyring

# Install egp-cli
pip install egp-cli --index-url https://o365exchange.pkgs.visualstudio.com/_packaging/O365PythonPackagesV2/pypi/simple
```

### Check for Updates

Before starting a session, check for the latest version:

```bash
pip install --upgrade egp-cli --index-url https://o365exchange.pkgs.visualstudio.com/_packaging/O365PythonPackagesV2/pypi/simple
```

Confirm the installed version:

```bash
egp --version
```

## Session Setup

Before running pipeline operations:

0. **Check EGP CLI** — verify `egp` is installed; occasionally check for updates:
   - Run `egp --version` to confirm it's installed and note the current version
   - If not found, follow the [Install EGP CLI](#install-egp-cli) steps above
   - **Version check (~10% of sessions)**: Only occasionally (roughly 1 in 10 sessions) ask the user if they'd like to check for a newer version. Do NOT check every time — most sessions should skip this step.
   - When checking, run:
     ```bash
     pip install egp-cli --index-url https://o365exchange.pkgs.visualstudio.com/_packaging/O365PythonPackagesV2/pypi/simple --dry-run 2>&1
     ```
     - If the output says `Would install egp-cli-<version>`, a newer version is available — **ask whether they want to upgrade**
     - If the output says `Requirement already satisfied`, the CLI is up to date
   - Only if the user confirms, run the upgrade:
     ```bash
     pip install --upgrade egp-cli --index-url https://o365exchange.pkgs.visualstudio.com/_packaging/O365PythonPackagesV2/pypi/simple
     ```
   - After upgrading, run `egp --version` to confirm the new version

1. **Choose environment** — set via config or CLI flag:
   - NPE (default): `-e npe`
   - PPE: `-e ppe`
   - Prod: `-e prod`

2. **Create a working directory** for session files:

```
.coep/egp/YYYY-MM-DD-<short-trace-id>/
```

Example: `.coep/egp/2026-03-17-c2c311f0/`

- Generate a new UUID as the `trace_id` for this session (e.g., `c2c311f0-5b09-4ce1-a035-e544eaae1b00`)
- Use the first 8 characters of the UUID as the folder suffix
- Save the full UUID in `session.json` and set it in every `request.trace_id`

3. **Create a `session.json`** in the working directory to track pipeline state. This file must be created at the start and updated after every state change (submit, poll, completion):

```json
{
  "trace_id": "c2c311f0-5b09-4ce1-a035-e544eaae1b00",
  "environment": "npe",
  "scenario": "calendar",
  "created_at": "2026-03-17T10:30:00Z",
  "steps": {
    "company_structure_generation": {
      "job_id": "c2c311f0-5b09-4ce1-a035-e544eaae1b00",
      "status": "completed",
      "output_dataset_id": "abc123",
      "azure_ml_url": "https://ml.azure.com/...",
      "request_file": "step1/request.json"
    },
    "grounding_data_generation": {
      "job_id": "...",
      "status": "running",
      "output_dataset_id": null,
      "azure_ml_url": "...",
      "request_file": "step2/request.json"
    }
  },
  "golden_query_pattern_id": "35620fca..."
}
```

**What to track:**
- `trace_id` — the UUID generated when the working directory was created; used as the folder name and set in every `request.trace_id` before submission
- `job_id` — from submit response → **update `session.json` immediately after submit**
- `status` — **update `session.json` after every poll / status change**
- `output_dataset_id` — from completed job output (e.g., `output.company_structure_generation.id`) → **update `session.json` on completion**
- `azure_ml_url` — from `job.azure_ml.run_url` (available when status is `running`) → **update `session.json` when URL appears**
- `request_file` — path to the request JSON used

### Pipeline Workflow Steps

For each pipeline step:

1. **Init** config from template: `egp job init -t <type> [-s <scenario>] --output-dir $WORK/step<N>`
2. **Edit** the generated `request.json` — fill placeholders with IDs from previous steps and set `request.trace_id` to the session's `trace_id` UUID
3. **Show** the request to the user for confirmation before submitting
4. **Submit**: `egp job submit -d $WORK/step<N>/request.json -t <type>`
   - Save the submit response: `egp -f json job submit -d $WORK/step<N>/request.json -t <type> -o $WORK/step<N>/submit.json`
   - **Update `session.json`**: set `job_id`, `status` = `"submitted"`, and `request_file`
5. **Poll for AML URL** — after submit, poll `egp -f text job get <job-id>` every ~30s until status is `running` and `azure_ml.run_url` appears:
   - Print job info to console: `egp -e <env> -f text job get <job-id>`
   - Save full JSON response: `egp -e <env> -f json job get <job-id> -o $WORK/step<N>/result.json`
   - The AML URL is in `job.azure_ml.run_url` — show it to the user
   - **Update `session.json`**: set `status` = `"running"` and `azure_ml_url`
6. **Wait** for completion: `egp job wait <job-id> -o $WORK`
   - Save the final job state: `egp -f json job get <job-id> -o $WORK/step<N>/result.json`
7. **Extract output IDs** from the completed job for the next step
8. **Update `session.json`**: set `status` = `"completed"` and `output_dataset_id`

**Polling pattern after submit:**
```bash
# Submit and save response
egp -f json job submit -d $WORK/step1/request.json -t company_structure_generation -o $WORK/step1/submit.json
# → Update session.json with job_id and status="submitted"

# Poll until running (AML URL available)
egp -f text job get <job-id>
# When status=running and AML URL appears, save the response:
egp -f json job get <job-id> -o $WORK/step1/result.json
# → Update session.json with status="running" and azure_ml_url

# Wait for completion
egp job wait <job-id> -o $WORK
# Save final state
egp -f json job get <job-id> -o $WORK/step1/result.json
# → Update session.json with status="completed" and output_dataset_id
```
8. **Extract output IDs** from the saved result for the next step
9. **Update `session.json`** — must always reflect the latest state of every step

**CRITICAL**: Always show the user the modified request JSON and wait for confirmation before submitting. Never auto-submit without user approval.

> **Note**: All `egp` commands are cross-platform (Python CLI). For file operations (copy/delete), use Python or agent file tools — do NOT use shell-specific commands like `Copy-Item` (PowerShell) or `cp` (bash).

## Quick Start

```bash
# Interactive mode (auto-suggests, history, tab completion)
egp

# CLI mode
egp job list --me
egp -f text job get <job-id>
```

## Environment & Config

The CLI reads config from `.egp/config.json` (created automatically on first interactive session):

```json
{"env": "npe", "format": "text"}
```

**Config priority**: CLI flags > local `.egp/config.json` > `~/.egp/config.json` > defaults

| Environment | Flag | URL |
|-------------|------|-----|
| NPE (default) | `-e npe` | `https://coep-npe.microsoft.com/agents` |
| PPE | `-e ppe` | `https://coep-ppe.microsoft.com/agents` |
| Prod | `-e prod` | `https://coep.microsoft.com/agents` |

**Authentication**: The CLI uses `az login` automatically when token expires.

### Output Format

| Flag | Effect |
|------|--------|
| `-f text` | Human-readable output (tables, icons, hints) |
| `-f json` | Raw JSON (default, good for piping) |
| `-o file.json` | Save response to file (no console output) |

Flags can go anywhere: `egp job list --me -f text` = `egp -f text job list --me`

## Interactive TUI Mode

Run `egp` with no arguments to enter interactive mode:

```
egp(npe)> job list --me
egp(npe)> history          # browse & re-run past commands
egp(npe)> config show      # show effective config
egp(npe)> env ppe          # switch environment
egp(npe)> -f json          # switch format
egp(npe)> exit
```

Features: auto-suggest, tab completion with descriptions, command history, `egp` prefix optional.

## Commands

### Job Management

```bash
egp job init -t <type> [-s <scenario>] [--output-dir <dir>]   # init config from template
egp job emit -d <request.json>                                 # preview resolved request
egp job submit -d <request.json> -t <type> [--job-type aml|aca]
egp job get <job-id>
egp job list [--me] [--user USER] [--status STATUS] [-n LIMIT]
egp job wait <job-id> [-i INTERVAL] [-t TIMEOUT] [-o DIR]
```

**Job types**: `company_structure_generation`, `grounding_data_generation`, `query_assertion_generation`, `quality_metrics`

**`-d` auto-detects file paths** — no `@` prefix needed (still works for compatibility).

### Evalset Operations

```bash
egp evalset list [--keyword KW] [--tags TAGS] [-n SIZE] [--next TOKEN]
egp evalset get <id> <version>
egp evalset download <id> <version> [-o output.zip]
egp evalset versions <id>
egp evalset publish --name NAME [options]
egp evalset clone --name NAME --source-id ID --source-version VER
```

### Dataset Operations

```bash
egp dataset list [--name NAME] [--tag TAG] [-n SIZE] [--next TOKEN]
egp dataset get <id> <version>
egp dataset download <id> <version> [-o output.zip]
egp dataset create --files PATH --name NAME --dataset-type TYPE --entity-type TYPE
egp dataset versions <id>
egp dataset mainline <id>
```

### Config & Patterns

```bash
egp config init [--global]
egp config show
egp config set <key> <value>
egp pattern golden [--tags "email,calendar,chats"]
```

## Job Templates & Workflow

### Scenarios

Three pre-built scenarios are available for `grounding_data_generation` and `query_assertion_generation`:

| Scenario | `target_offering` | Actions (grounding) | Entity Types (query assertion) | Query Pattern Tag |
|----------|-------------------|---------------------|-------------------------------|-------------------|
| `calendar` | `calendar` | `SendMeetingRequest`, `AcceptCalendarItem`, `DeclineCalendarItem` | `["events"]` | `calendar` |
| `outlook` | `outlook` | `MessageSent`, `Reply` | `["emails"]` | `email` |
| `teams` | `bizchat` | `ChatMessageSent`, `ChatMessageReply`, `Flag` | `["chats"]` | `chats` |

### Template Placeholders

Each template has placeholders that must be filled before submitting:

| Placeholder | Where Used | How to Get |
|-------------|-----------|------------|
| `<COMPANY_STRUCTURE_DATASET_ID>` | `grounding_data_generation` → `request.company_structure_data.id` | From Step 1 completed job: `output.company_structure_generation.id` |
| `<EVALSET_ID>` | `query_assertion_generation` → `request.config.evalset.id`, `quality_metrics` → `evalset.id` | From Step 2 completed job: `output.grounding_data_generation.id` (this creates an evalset) |
| `<QUERY_PATTERN_DATASET_ID>` | `query_assertion_generation` → `request.config.query_pattern.id` | Run `egp pattern golden --tags "calendar"` to find |
| `<grounding_data\|query_assertion_data>` | `quality_metrics` → `dataset_type` | Use `grounding_data` for Step 3, `query_assertion_data` for Step 5 |

### Template Key Fields

**company_structure_generation** (`request.config`):
- `company_name` — Company name (e.g., "Contoso")
- `company_area` — Industry area (e.g., "Technology", "Global Technology/Enterprise")
- `company_size` — Number of users to generate (e.g., 50)
- `company_description` — Description of the company

**grounding_data_generation** (`request.config`):
- `time_range_start` / `time_range_end` — Simulation time window (ISO 8601)
- `time_bucket_size_minutes` — Bucket size (e.g., 1440 = 1 day)
- `action_configs` — List of actions with `distribution_config` (mean, std_dev, distribution_type)
- `ini_config` — `@file:config.ini` reference to simulation pipeline config

**query_assertion_generation** (`request.config`):
- `eval_datetime` — Evaluation datetime (ISO 8601)
- `email_me` — Email for notifications
- `generate_dual_queries` — Whether to generate dual queries (boolean)
- `entity_types` — List of entity types: `["events"]`, `["emails"]`, or `["chats"]`
- `evalset` — Reference to evalset from grounding data step
- `query_pattern` — Reference to golden query pattern dataset

**quality_metrics**:
- `evalset` — Reference to evalset to measure
- `dataset_type` — `"grounding_data"` or `"query_assertion_data"`
- `requirement` — `"standard_quality_metrics"`

**Common metadata fields** (in all templates):
- `upload_type` — `"create_new"` (create new dataset) or `"update"` (update existing)
- `metadata.entity_id` — `null` for new, or existing dataset ID for updates
- `metadata.name` — Display name for the output dataset
- `metadata.description` — Description
- `metadata.tags` — List of tags
- `metadata.target_offerings` — List of offerings (e.g., `["calendar"]`, `["outlook"]`, `["bizchat"]`)

### Initialize → Edit → Submit

```bash
# 1. Init template (with optional scenario)
egp job init -t grounding_data_generation -s calendar --output-dir ./my-job

# 2. Edit the generated request.json and config.ini

# 3. Submit
egp job submit -d ./my-job/request.json -t grounding_data_generation
```

Available scenarios for `job init`: `calendar`, `outlook`, `teams`

### File Reference Syntax

In request JSON, use `@file:` to include file content:
```json
{"ini_config": "@file:config.ini"}
```
Path is relative to the JSON file. Resolved recursively by `job submit` and `job emit`.

## Pipeline Dependency Graph

```
Step 1: company_structure_generation
  ↓ output.company_structure_generation.id
Step 2: grounding_data_generation
  ↓ output.grounding_data_generation.id → creates evalset
  ├→ Step 3: quality_metrics (grounding)
  └→ Step 4: query_assertion_generation
       ↓ output.query_assertion_generation.id
       └→ Step 5: quality_metrics (assertion)
```

### Data Flow Between Steps

| From → To | Extract | Set In Next Request |
|-----------|---------|---------------------|
| 1 → 2 | `output.company_structure_generation.id` | `request.company_structure_data.id` |
| 2 → 3 | `output.grounding_data_generation.id` | `evalset.id` |
| 2 → 4 | `output.grounding_data_generation.id` | `request.config.evalset.id` |
| 4 → 5 | `output.query_assertion_generation.id` | `evalset.id` |

### Golden Query Patterns

Find golden query pattern dataset IDs (needed for Step 4):

```bash
egp pattern golden [--tags "calendar"]
```

| Scenario | Tag | What it returns |
|----------|-----|-----------------|
| Calendar | `calendar` | Dataset with calendar event query patterns |
| Outlook | `email` | Dataset with email query patterns |
| Teams | `chats` | Dataset with chat message query patterns |

The returned `dataset_entity_id` goes into `request.config.query_pattern.id` in the query assertion template.

### Full Pipeline Example (Calendar)

```bash
# Step 1: Init & submit company structure
egp job init -t company_structure_generation --output-dir ./pipeline/step1
# Edit step1/request.json: set company_name, company_size, etc.
egp job submit -d ./pipeline/step1/request.json -t company_structure_generation
egp job wait <step1-job-id>
egp -f json job get <step1-job-id> -o ./pipeline/step1_result.json
# Extract: output.company_structure_generation.id → e.g., "abc123"

# Step 2: Init & submit grounding data
egp job init -t grounding_data_generation -s calendar --output-dir ./pipeline/step2
# Edit step2/request.json: set company_structure_data.id = "abc123"
egp job submit -d ./pipeline/step2/request.json -t grounding_data_generation
egp job wait <step2-job-id>
egp -f json job get <step2-job-id> -o ./pipeline/step2_result.json
# Extract: output.grounding_data_generation.id → e.g., "def456" (this is an evalset)

# Step 3: Quality metrics for grounding data
egp job init -t quality_metrics --output-dir ./pipeline/step3
# Edit step3/request.json: set evalset.id = "def456", dataset_type = "grounding_data"
egp job submit -d ./pipeline/step3/request.json -t quality_metrics
egp job wait <step3-job-id>

# Step 4: Query assertion generation
egp job init -t query_assertion_generation -s calendar --output-dir ./pipeline/step4
# Edit step4/request.json: set evalset.id = "def456", query_pattern.id from golden patterns
egp job submit -d ./pipeline/step4/request.json -t query_assertion_generation
egp job wait <step4-job-id>
egp -f json job get <step4-job-id> -o ./pipeline/step4_result.json
# Extract: output.query_assertion_generation.id → e.g., "ghi789"

# Step 5: Quality metrics for query assertions
egp job init -t quality_metrics --output-dir ./pipeline/step5
# Edit step5/request.json: set evalset.id = "ghi789", dataset_type = "query_assertion_data"
egp job submit -d ./pipeline/step5/request.json -t quality_metrics
egp job wait <step5-job-id>
```

### Job Status Values

| Status | Meaning |
|--------|---------|
| `submitted` | Queued, not yet started |
| `running` | Executing (AML URL available via `job get`) |
| `completed` | Finished, output dataset/evalset IDs available |
| `failed` | Failed, check `error` field |
| `canceled` | Canceled by user |

## History

Commands logged to `.egp/history/YYYY-MM-DD.txt`. In interactive mode, type `history` to browse and re-run.
---

## Skill: generate-data


There are two mechanisms to generate data:

1. Coding agent: This mechanism can be used to generate a new evalset from scratch, or to generate additional data for an existing evalset. This mechanism is best suited for smaller scale data generation tasks, or when the user needs a fast iteration loop.
2. EGP pipeline: This mechanism can be used to generate large amounts of data but not to add data to an existing evalset. This may involve more complex operations and potentially longer generation times. Best suited for larger scale data generation tasks, or when the user wants to leverage the capabilities of the EGP pipeline for data generation.

When selecting the mechanism, consider the user's request and the scale of data generation needed. If the user is asking for additional data for an existing evalset, the coding agent may be the best choice. If the user is asking for a new evalset, large amount of data, a longer simulation, or wants to use specific features of the EGP pipeline, then using the EGP pipeline will be more appropriate.

The skill to execute the coding agent is `local-generate-data` and the skill to execute the EGP pipeline is `egp`.
---

## Skill: generate-queries-assertions


There are two mechanisms to generate data:

1. Coding agent: This mechanism can be used to generate a set of queries and assertions, or to generate additional queries and assertions for an existing evalset.
2. EGP pipeline: This mechanism can be used to generate large amounts of queries and assertions, which may involve more complex operations and potentially longer generation times. This is best suited for larger scale query and assertion generation tasks, or when the user wants to leverage the capabilities of the EGP pipeline.

When selecting the mechanism, consider the user's request and the scale of generation needed. Use the Coding agent unless the user asks to use the EGP pipeline.

The skill to execute the coding agent is `local-generate-queries-assertions` and the skill to execute the EGP pipeline is `egp`.
---

## Skill: list-evalsets


When the user asks to list evalsets, focus on remote evalsets that can be downloaded using via the MCP server. Do not enumerate local evalsets that are already available in the system. If the MCP server is not available, respond with an appropriate error message indicating that the evalsets cannot be listed at this time.
---

## Skill: local-generate-data


IMPORTANT: When generating data, always ensure that the queries and gounding data are relevant to the grounding data that may already be present in the evalset.

IMPORTANT: When generating data, always ask the user if they want to validate the schema after generation using the appropriate tools. Before generating the data you should download the schema using the corresponding tool to ensure correctness.

# Realistic Synthetic Data Generation Instructions

You are an expert synthetic data generator. Your goal is to produce data that is indistinguishable from real human-generated activity within an enterprise or organizational context. Every piece of data you generate must feel like it was created by a real person going about their workday — not by a machine following templates.


## STATISTICAL DISTRIBUTIONS FOR REALISM

Use these distributions derived from real-world enterprise data to parameterize generated content. These are not suggestions — they are calibrated parameters that produce realistic output.

### Email Body Length (Log-Normal Distribution)

Derived from the Enron email corpus analysis:

- **Distribution:** Log-normal with μ=3.87, σ=1.0
- **Median:** ~48 words
- **Hard bounds:** [5, 1500] words
- **Practical effect:** Most emails are short (20-80 words). Long emails (300+) are rare but occur. Extremely short emails (5-15 words: "Sounds good", "See attached", "Let's discuss tomorrow") are common.

**Sampling guidance by percentile:**
- 10th percentile: ~10 words (quick acknowledgment)
- 25th percentile: ~22 words (brief reply)
- 50th percentile: ~48 words (standard message)
- 75th percentile: ~105 words (detailed reply)
- 90th percentile: ~230 words (substantial email)
- 99th percentile: ~900 words (rare long-form)

### Meeting Duration (Enterprise Distribution)

| Duration | Probability | Typical Use |
|----------|-------------|-------------|
| 15 min   | 4.9%        | Quick check-ins, stand-ups |
| 30 min   | 44.9%       | Most common — 1:1s, syncs, reviews |
| 45 min   | 5.1%        | Extended discussions |
| 60 min   | 33.6%       | Standard hour — design reviews, planning |
| 90 min   | 2.8%        | Workshops, deep dives |
| 120-180 min | 8.7%     | All-hands, training sessions, offsites |

### Activity Counts per Time Window

Use **Poisson distribution** for bursty, event-driven activity patterns (emails received, messages in a chat):
- λ (lambda) = mean rate per time window
- Property: variance equals the mean, producing natural clustering and quiet periods

Use **Normal distribution** for steadier, predictable patterns (meetings per day, files created per week):
- Parameters: mean and standard deviation
- Clip at zero (no negative counts)

### Email Response Timing

| Response Speed | Probability | Delay Range |
|----------------|-------------|-------------|
| Immediate      | 15%         | 1-15 minutes (urgent items) |
| Quick          | 30%         | 15-60 minutes |
| Normal         | 35%         | 1-3 hours |
| Delayed        | 15%         | 3-8 hours |
| Slow           | 5%          | 8+ hours (low priority, different timezone) |

### Email Tone Distribution

Randomly vary tone across generated emails. Available tones: **formal, informal, neutral, professional, casual**. Weight selection based on the persona:
- Executive communications: 60% formal, 25% professional, 15% neutral
- Peer-to-peer: 20% formal, 30% casual, 30% neutral, 20% informal
- Manager-to-report: 40% professional, 30% neutral, 20% casual, 10% formal


## USER PROFILE AND PERSONA-DRIVEN GENERATION

### Profile-Aware Content

Every generated item must reflect the sender's role, seniority, and personality:

| Attribute | Impact on Content |
|-----------|-------------------|
| Job Title / Role | Determines topics, vocabulary, authority level |
| Seniority | Executives are terse and directive; ICs are detailed and questioning |
| Department | Influences jargon, concerns, and collaboration patterns |
| Manager relationship | Manager emails include delegation, feedback, status requests |
| Direct reports | Influences meeting frequency, 1:1 patterns |
| Location / Timezone | Affects working hours, cultural communication style |
| Native language | May introduce second-language patterns (literal translations, different formality norms) |

### Organizational Hierarchy Influence

- **Manager → Report:** Delegation, feedback, coaching, status requests
- **Report → Manager:** Status updates, questions, escalations, approvals
- **Peer → Peer:** Collaboration, brainstorming, casual coordination
- **Skip-level (VP/Director):** Brief, high-level, strategic focus
- **Cross-team:** More formal, include context/background that same-team wouldn't need

### Personality Consistency

Once a user persona is established, maintain their behavioral patterns:
- A verbose writer stays verbose throughout. A terse communicator stays terse.
- A person who uses bullet points continues to use them.
- Morning emailers keep emailing in the morning.
- Fast responders stay fast. Slow responders stay slow.


## CONTENT TYPE SPECIFIC GUIDELINES

### Emails

- Subject lines: Specific and descriptive, not generic ("Q3 Revenue Dashboard Access" not "Quick Question")
- Body: Match the log-normal length distribution. Most emails are 1-3 sentences.
- Attachments: Reference real files from context when mentioning attachments
- Recipients: Select from existing users in the organization graph. Prefer realistic groupings (same team, same project, manager chain)
- Forward patterns: Include original message context. Forwarder adds a brief note ("FYI", "Thoughts?", "Can you handle this?")

### Chat Messages

- Shorter than emails. Median 10-30 words.
- More informal: contractions, emoji occasionally, incomplete sentences acceptable
- Rapid exchanges: Multiple messages within minutes during active conversations
- Channel-appropriate: Work channels are semi-formal; DMs are casual
- No redundant greetings in thread continuations

### Calendar Events / Meetings

- **Organizer and attendees MUST be real users from context.** Never invent attendees.
- **Recurring meetings** (15-25% of all meetings): Weekly standups, biweekly 1:1s, monthly reviews. Use consistent naming ("Sprint Planning", "Frontend Sync").
- **Meeting types by attendee count:**
  - 2 people: 1:1 (performance, mentoring, alignment)
  - 3-5 people: Working session (design, planning, debugging)
  - 6-15 people: Team meeting (status, sprint review)
  - 15+: All-hands, town halls, presentations
- Schedule respect: Don't double-book users. Check existing calendar before adding.

### Meeting Transcripts

- **Word density:** 130-160 words per minute of speaking, with 60-80% actual speaking time (rest is pauses, transitions)
  - 30-min meeting ≈ 3,900-4,800 total words
  - 60-min meeting ≈ 7,800-9,600 total words
- **First message** must be at or within 1-2 minutes of StartDateTime
- **Last message** must be at or within 1-2 minutes of EndDateTime
- **Timestamps distributed across the entire meeting**, not clustered at start
- **Natural speech patterns:** Include filler words ("um", "uh", "you know", "like"), self-corrections, and interruptions
- **Speaker balance:** Organizer/presenter speaks more, but others participate with questions and comments
- **Opening:** Brief greetings only for first topic (1-2 utterances max), then dive into substance
- **Middle topics:** NO opening remarks, NO closing remarks — dive directly into discussion as if mid-meeting
- **Closing:** Brief wrap-up in the final topic only ("Thanks everyone", action item recap)

### Files and Documents

- File names should follow realistic naming conventions: "Q3_Revenue_Report_v2.xlsx", not "file_001.txt"
- Content should relate to the user's role and current projects visible in context
- Version patterns: v1, v2, draft, final, FINAL, FINAL_v2 (the realistic chaos of enterprise files)


## ANTI-PATTERNS TO AVOID

These are the most common failures in synthetic data generation. Actively avoid them:

1. **Template voice.** If all emails from different users sound like they came from the same person, the data is useless. Vary vocabulary, sentence structure, greeting/sign-off patterns.

2. **Uniform length.** If every email is 50-100 words, it looks synthetic. Use the log-normal distribution: some are 5 words, some are 500.

3. **Perfect grammar everywhere.** Real chat messages have typos. Real quick replies skip punctuation. Transcripts have "gonna", "wanna", "kinda". Adjust formality to context.

4. **Unrealistic timestamps.** Events at exactly 09:00:00, 10:00:00, 11:00:00 scream synthetic. Use natural minutes and seconds.

5. **Random topic jumping.** A user discussing "Q3 budget" should not suddenly email about "team offsite" then "API deprecation" then "office supplies" with no continuity. Maintain 2-3 active work streams.

6. **Self-replies.** A user replying to their own email/message (without someone responding in between) is almost never realistic outside of "bump" or "following up" patterns.

7. **Star threading.** All replies pointing to the root message instead of the previous reply in the chain destroys realistic thread structure.

8. **Hallucinated references.** Mentioning a user, file, or email that doesn't exist in the context breaks data integrity. Always validate references against the provided context.

9. **Over-participation.** Not everyone in a 12-person meeting speaks. Not everyone on a CC list replies. Model realistic participation rates.

10. **Ignoring hierarchy.** An intern doesn't email the CEO directly. A VP doesn't write 500-word status updates. Match communication patterns to organizational position.


## MULTI-STEP GENERATION PATTERN

For complex content (meeting transcripts, multi-part documents), use a pipeline approach:

1. **Generate the structural outline first** (agenda, topic list, section headers)
2. **Generate each section independently** with context from the outline
3. **Ensure continuity** between sections (no repeated introductions, proper transitions)
4. **Validate the assembled output** against timing, length, and consistency constraints

For meeting transcripts specifically:
1. Generate the meeting agenda with topics
2. Generate the transcript for the first topic (opening remarks allowed)
3. Generate transcripts for middle topics (no opening/closing — mid-flow only)
4. Generate the transcript for the last topic (wrap-up allowed)
5. Stitch all segments together with consistent timestamps spanning the full meeting duration

---

## WEIGHTED SUBTYPE SELECTION

For content that has natural subtypes, use weighted random selection to ensure diversity:

```
Email subtypes:
  - Status update (25%): Regular project/task updates
  - Request/ask (20%): Asking for information, approvals, resources
  - FYI/informational (15%): Sharing articles, announcements, FYIs
  - Follow-up (15%): Following up on previous conversations
  - Coordination (15%): Scheduling, logistics, planning
  - Social/casual (10%): Team building, congratulations, personal

Meeting subtypes:
  - Status/sync (30%): Regular cadence meetings
  - Working session (25%): Active collaboration
  - 1:1 (20%): Manager-report or peer conversations
  - Planning (15%): Sprint planning, roadmap, strategy
  - Presentation/review (10%): Demos, design reviews, retrospectives
```

---

## Skill: local-generate-queries-assertions


IMPORTANT: Queries and assertions must be executed from the point of view of a user. If no user is specified, you should fail the generation and return an error.

IMPORTANT: When generating queries and assertions, always ensure that the queries are relevant to the grounding data visible to that particular User and that the assertions are specific, measurable, and are a faithful representation of the grounding data that is available and visible to the user.

IMPORTANT (assertion mix — strictly enforced): Each query MUST have multiple assertions, and the overall set MUST mix natural-language `text:` assertions with programmatic `test:` assertions. Specifically:

- **At least 50% of all queries** in `queries_assertions.yaml` MUST include at least one programmatic assertion of the form:
  ```yaml
  - test: citations_test.test_citation
    args:
      - <exact entity title/subject from grounding data>
    level: critical
  ```
  The `args` value MUST be the **exact** subject/title/name of the email, meeting, chat thread, file, or work item from the grounding data — copied verbatim, including punctuation and casing. Do not paraphrase, truncate, or summarize.
- A `test:` assertion is REQUIRED whenever the query targets a specific, named entity (e.g., "find the email titled X", "who is invited to meeting Y", "summarize the Z thread"). For broad/aggregate queries (e.g., "catch me up on sustainability"), include a `test:` assertion for at least one of the most important supporting entities.
- Every query that has a `test:` assertion MUST also have `text:` assertions covering metadata and content (sender, date, key facts) at appropriate levels.
- If you produce a YAML where fewer than 50% of queries contain a `test:` assertion, the generation is INVALID. Re-generate before writing the file.

IMPORTANT (allowed `level` values — strictly enforced): The `level` field on every assertion (both `text:` and `test:`) MUST be exactly one of these three lowercase strings:

- `critical`
- `expected`
- `aspirational`

No other values are valid. Do NOT use RFC-2119 keywords (`must`, `should`, `may`, `must not`, `should not`), severity words (`high`, `medium`, `low`, `p0`, `p1`, `p2`), priority numbers (`1`, `2`, `3`), or synonyms (`required`, `nice-to-have`, `optional`, `mandatory`). Do NOT capitalize (`Critical`, `Expected`). Do NOT quote them oddly. The value must be the bare lowercase token.

Normalization rules (apply BEFORE writing the file — if you catch yourself producing a forbidden value, map it; do not emit the forbidden value):

| If you were about to write… | Replace with |
|---|---|
| `must`, `must-have`, `required`, `mandatory`, `high`, `p0`, `1`, `Critical` | `critical` |
| `should`, `should-have`, `expected`, `medium`, `p1`, `2`, `Expected` | `expected` |
| `may`, `could`, `nice-to-have`, `optional`, `low`, `p2`, `3`, `Aspirational` | `aspirational` |

Self-check before writing the YAML: scan every `level:` line and confirm the value is one of `critical`, `expected`, `aspirational`. If any line uses a forbidden value, fix it before writing — do not emit a YAML with non-conforming levels.

To generate the queries and assertions you must modify two files. If the files do not exist, you need to create them. The two files are: 

* `queries.tsv`. A TSV file containing the queries that will be used in the evaluation. Each line in this file should contain a single query. It has two columns: `Segment 2` which will have the value `material_retrieval_assertion` or `form_assertion` depending on the semantic of the query, and `Utterance` which will have the query text. You must decide with value to use in the `Segment 2` column based on the semantic of the query based on the example below.

Sample `queries.tsv` file:

```tsv
Segment 2	Utterance
material_retrieval_assertion	please provide a list of invitees for each meeting: Enterprise Cloud Optimization Follow-Up: Action Item Progress Review, Global Technical Support Leads: Calendar Data Strategy Discussion, Enterprise Cloud Optimization Follow-Up: Action Item Progress Review
material_retrieval_assertion	please provide a list of invitees for each of these meetings: Follow-up Planning: Assignments & Deadlines for Calendar Workflow Improvements, Enterprise Cloud Optimization Follow-Up: Action Item Progress Review, and calendar data strategy
form_assertion	Any meeting where we discussed calendar data infrastructure with weizhang
material_retrieval_assertion	Are there any meetings with the title 'Team Discussion: New Strategies for Calendar Data & Forecasting Improvement'?
material_retrieval_assertion	Are there any meetings with the title 'enterprise cloud optimization'?
form_assertion	Are there any meetings in Cloud Optimization category during the last week?
form_assertion	Are there any meetings scheduled in locations_1?
form_assertion	Find meetings organized by jpatel during the last week
form_assertion	Is there a meeting titled 'Global Technical Support Leads: Calendar Data Strategy Discussion' on <user> calendar?
form_assertion	Is there a meeting called enterprise cloud optimization on my calendar?
form_assertion	Show me all high-priority meetings scheduled during the last week
form_assertion	Meeting with priya.sharma to discuss 'cloud platform optimization'
material_retrieval_assertion	List my meeting at 2026-01-02T09:00:00Z
```

* `queries_assertions.yaml`. A YAML file containing the queries and assertions that will be used in the evaluation. It must include all the queries from `queries.tsv`. Each query may have multiple assertions associated with it.

Sample `queries_assertions.yaml` file segment for some of the queries in the above `queries.tsv` file:

```yaml
- id: 603f5c7f-f059-4dfe-8b00-e7df869f8038
  query: 'please provide a list of invitees for each meeting: Technology Strategy Benchmark Alignment & Adoption Review, enterprise cloud optimization, technology strategy alignment'
  assertions:
  - test: citations_test.test_citation
    args:
    - 'Enterprise Cloud Optimization Follow-Up: Action Item Progress Review'
    level: critical
  - text: 'Response should list jpatel as a required attendee for the Enterprise Cloud Optimization Follow-Up: Action Item Progress Review meeting'
    level: critical
  - text: For each specified meeting, the response must include the complete list of required attendees with their email addresses. Each meeting should be clearly identified by its subject and the attendee list should be comprehensive.
    level: critical
  segmentTwo: form_assertion
- id: 33f828e1-1b93-4968-8a98-10c3448d1e4f
  query: please provide a list of invitees for each meeting on technology strategy alignment, calendar forecasting improvement, and enterprise cloud optimization
  assertions:
  - test: citations_test.test_citation
    args:
    - Technology Strategy Benchmark Alignment & Adoption Review
    level: critical
  - text: Response should list devon.kim as a required attendee for the Technology Strategy Benchmark Alignment & Adoption Review meeting
    level: critical
  - text: Response should identify the meeting subject as Technology Strategy Benchmark Alignment & Adoption Review
    level: expected
  - text: Response should mention sarah.lin as the sender of the Technology Strategy Benchmark Alignment & Adoption Review meeting
    level: aspirational
  - text: For each specified meeting, the response must include the complete list of required attendees with their email addresses. Each meeting should be clearly identified by its subject and the attendee list should be comprehensive.
    level: critical
  segmentTwo: form_assertion
- id: 88d859fc-7e39-44b2-ab45-30f54673c0ed
  query: Any meeting where we discussed calendar data infrastructure with weizhang
  assertions:
  - text: For each meeting in the response, it should have clear subject, start time, and attendee information.
    level: expected
  segmentTwo: form_assertion
- id: e98631ac-6118-4048-8225-bc14c3175c4c
  query: 'Are there any meetings with the title ''Team Discussion: New Strategies for Calendar Data & Forecasting Improvement''?'
  assertions:
  - test: citations_test.test_citation
    args:
    - 'Team Discussion: New Strategies for Calendar Data & Forecasting Improvement'
    level: critical
  - text: Response should mention the meeting is scheduled for January 2, 2026
    level: critical
  - text: Response should state the meeting starts at 09:00 UTC
    level: expected
  - text: Response should state the meeting ends at 12:00 UTC
    level: expected
  - text: Response should mention reviewing latest global employee calendar data trends
    level: expected
  - text: Response should mention discussing effectiveness of current forecasting models
    level: expected
  - text: Response should mention brainstorming improvements for calendar-driven workflows
    level: aspirational
  - text: For each meeting in the response, it should have clear subject, start time, and attendee information.
    level: expected
  segmentTwo: form_assertion
```

# Realistic Query and Assertion Generation

You are an expert query author and assertion engineer. Your job is to generate **realistic, diverse, organic user queries** and **rigorous, grounded assertions** that simulate how real people interact with an enterprise AI assistant. The queries and assertions you produce will be used to evaluate the quality of AI responses against known grounding data.

This skill distills the full logic, algorithms, and learnings from the AutoAssert evaluation pipeline — a production system used to generate evaluation test sets at scale.


## Part 2: The Query Generation Pipeline

Generate queries through these sequential stages. Each stage builds on the previous.

### Stage 1: Entity Classification

Before generating any query, determine which data entity types are relevant. Entities include but are not limited to:
- **emails** — subjects, senders, recipients, body content, attachments, folders
- **calendar/events** — meeting titles, participants, times, locations, topics
- **chats/teams_messages** — thread names, senders, content, channel vs. group chat
- **files** — document names, authors, modification dates, content
- **ado/work items** — titles, assignees, states, priorities, tags, descriptions
- **users** — names, roles, departments, reporting chains
- **signals** — third-party data outside M365

When the target domain is ambiguous, classify based on the query's semantic content, not surface keywords. "When did Sarah ask to sync?" could be a chat message or an email — use available grounding data to resolve.

### Stage 2: Intent Identification

For each query pattern, identify the **query intent** — the data structure the user expects back:
- "List of email subjects, senders, and summaries"
- "Single meeting name, date, time, and participants"
- "Count of work items matching criteria"
- "Summary of key discussion points"
- "Action items extracted from content"

The intent drives what assertions should test for. Be specific about whether the query expects a single item, a list, a count, a summary, or an action.

### Stage 3: Temporal Scoping

Determine the temporal frame of the query:
- **Past**: "What did I discuss last week?"
- **Present**: "What's on my calendar today?"
- **Future**: "What meetings do I have next week?"

Extract date ranges, identify which data fields to filter on, and determine sorting/limit requirements:
- "My next meeting" → future, sort by start date ascending, limit 1
- "Recent emails from Jordan" → past, sort by timestamp descending, no strict limit
- "Emails from May 2025" → past, filter by date range

**Critical temporal rules:**
- If a query uses placeholders like `<date>`, keep them unresolved for later hydration
- Resolve relative dates against the evaluation datetime — "last week" means the 7 days before eval_datetime, not the current real date
- Use the right entity date field: emails use Timestamp, calendar uses StartDate/EndDate, work items use CreatedDate/ChangedDate/DueDate

### Stage 4: Placeholder Hydration

Fill placeholders with **actual values from grounding data**. This is where the query becomes concrete and testable.

**Value selection principles:**
- For `<person>`: Prefer first names only. Use the person's name as it naturally appears in conversation. Never use email aliases or ObjectIds. Prefer names of people who appear in the grounding data.
- For `<topic>`: Extract a concise phrase from content fields (body, subject, description). Simplify lengthy phrases. Don't use the entire sentence — extract the core concept (e.g., "Strategic planning and resource allocation" → "strategic planning").
- For `<date>`: Convert from ISO timestamps to human-readable format. Vary between "May 26", "May 26, 2025", "the 26th", etc.
- For `<weekday>`: Derive from the actual timestamp in data.
- For `<location>`: Simplify detailed addresses to their most relevant part ("50 Eastcastle St, London, UK" → "London").
- For `<organization>`: Prefer external organizations over the user's own company.

**Value diversity:** Do NOT always pick the first matching value. Randomly select from all valid candidates to ensure coverage across the grounding data.

**Noise injection by match type:**
Different query types require different levels of precision in the hydrated values:

| Match Type | Strategy | Example |
|---|---|---|
| **exact** | Use the value exactly as-is | "Priority 1" → "Priority 1" |
| **partial** | Extract a meaningful substring (1-5 words) | "How to build the AI platform" → "AI platform" |
| **keyword** | Extract meaningful tokens, skip stopwords | "Strategic planning for Q3" → "strategic planning" |
| **semantic** | Generate a semantically similar alternative (same word count) | "urgent" → "critical", "bug fix" → "defect resolution" |
| **typo** | Introduce realistic typos (character swaps, missing chars) | "Management" → "Managment" |
| **regex** | Convert to a regex pattern | "analyzer" → ".*alyzer" |

### Stage 5: Humanization

Transform the hydrated query into natural language that a real person would type. This is the most critical step for realism.

**Humanization rules:**
1. **Preserve the query style**: If it starts as a keyword query, keep it as keywords. If it's natural language, keep it natural. Never transform one style into another.
2. **Add natural connectors** where appropriate: "items assigned to" instead of "items Assigned To:", "emails about" instead of "emails Subject:", "due on May 3" instead of "Due Date 2025-05-03"
3. **Preserve placeholder values exactly**: Never modify the actual values that replaced placeholders (names, dates, keywords). Only rephrase the structural words around them.
4. **Human-friendly dates**: Mix between exact dates ("May 26, 2025"), approximate dates ("around May 25"), and day references ("second Sunday of April"). Avoid "last week" or "yesterday" if they would be incorrect given a static evaluation date.
5. **Names**: Almost always use first name only. Sometimes full name. Never email aliases.
6. **Keep hyphenated/compound terms intact**: "pre-flight", "end-to-end", "check-list" should never be split.
7. **Canonicalization with diversity**: For domain terms, randomly keep ~50% as synonyms to preserve wording diversity. "Azure DevOps" might stay or become "ADO"; "work item" might stay or become "ticket".

**Explicit vs. implicit variants:**
Generate two versions of each query when the domain supports it:
- **Implicit**: The natural query as a user would say it ("find my priority 1 bugs")
- **Explicit**: Prepend or append a domain token for disambiguation ("ADO find my priority 1 bugs" or "find my priority 1 bugs in DevOps")

### Stage 6: Context-Aware Query Processing

Some queries have constraints that go beyond simple placeholder matching. A "context-aware" query pattern has additional semantic requirements embedded in its phrasing.

**Detection:** Compare what the query pattern semantically requests vs. what the placeholder tree captures:
- "Find emails mentioned steps to `<Content>`" → The `<Content>` placeholder alone doesn't capture that the email must contain steps toward a goal. This is context-aware.
- "Can you find the `<ContentType>` message with `<Content>` in the content?" → The placeholder tree fully captures the intent. This is NOT context-aware.

**Hydration for context-aware queries:**
When a query is context-aware, the placeholder value must be selected to satisfy the extra constraint:
- For "Find emails mentioned steps to `<Content>`", select the **goal/aim** from the email body (e.g., "build the AI platform"), not the steps themselves.
- The selected value must make the hydrated query grammatically and semantically correct.
- If no entity data satisfies the constraint, skip that entity — don't force unsuitable values.


## Part 4: Controlling for Domain, Culture, and Personality

This skill can be steered to simulate specific personas, industries, and cultural contexts via prompt configuration.

### Industry Simulation

Provide industry context to shape query phrasing and topics:

| Industry | Query Style Tendencies | Typical Topics |
|---|---|---|
| **Legal** | Formal, precise, reference-heavy | Contracts, filings, case law, deadlines, precedent |
| **Healthcare** | Mixed clinical/conversational | Patient records, schedules, lab results, referrals |
| **Finance** | Metric-heavy, abbreviation-rich | P&L, portfolio, risk, compliance, quarter-end |
| **Engineering** | Terse, technical, acronym-heavy | Sprint items, bugs, deployments, code reviews |
| **Marketing** | Casual, creative, campaign-focused | Campaigns, audience metrics, content calendars |
| **Education** | Range from formal to colloquial | Grades, assignments, curriculum, meetings |

When simulating an industry, adjust:
- **Vocabulary**: Use domain jargon naturally
- **Abbreviations**: Finance users say "P&L"; engineers say "PR" for pull request
- **Formality level**: Legal is more formal; marketing is more casual
- **Reference style**: Legal cites case numbers; engineering cites ticket IDs

### Personality Profiles

Apply these personality dimensions to vary query style:

- **Verbose ↔ Terse**: "Could you please provide me with a comprehensive summary of all the emails I received from Jordan regarding the Q3 budget proposal?" vs. "Q3 budget emails from Jordan"
- **Formal ↔ Casual**: "Kindly retrieve the meeting agenda for the strategic planning session" vs. "what's on the agenda for the strategy meeting?"
- **Precise ↔ Vague**: "Show me the email from Jordan Liu sent on May 26, 2025 about the Q3 budget" vs. "that email about the budget from Jordan"
- **Action-oriented ↔ Information-seeking**: "Create a todo list from my recent emails" vs. "what tasks are mentioned in my emails?"
- **Tech-savvy ↔ Non-technical**: "Find ADO work items in the cloud-integrations area path with state Active" vs. "show me the open tickets for cloud stuff"

### Cultural Sensitivity

Adjust for cultural communication patterns:

- **Name usage**: Some cultures use family name first, some use given name first, some always use titles
- **Directness**: Some cultures are more direct ("Give me the report"), others more indirect ("Would it be possible to see the report?")
- **Time references**: Date formats vary (MM/DD vs DD/MM); week start varies (Sunday vs Monday)
- **Formality gradient**: Business formality levels vary significantly across cultures

### Bias Simulation

To simulate specific testing biases (for evaluation purposes):

- **Recency bias**: Weight queries toward recent data ("What happened today/this week?")
- **Authority bias**: Weight queries toward emails/meetings from managers ("What did my manager say?")
- **Topic concentration**: Focus queries around 2-3 primary topics to test depth vs. breadth
- **Entity preference**: Prefer one entity type over others (e.g., heavy on emails, light on calendar)


## Part 6: Quality Checklist

Before finalizing any query-assertion pair, verify:

- [ ] **Grounding**: Every factual claim traces to actual grounding data
- [ ] **Atomicity**: Each assertion tests exactly one thing
- [ ] **Levels**: Assertion levels match the query's specificity and match types
- [ ] **Realism**: The query reads like something a real human would type
- [ ] **Diversity**: The set covers multiple styles, intents, and difficulty levels
- [ ] **No self-reference**: The user's own name doesn't appear in assertions
- [ ] **Temporal accuracy**: Date references are correct relative to eval_datetime
- [ ] **Specificity match**: Broad queries have focused assertions; specific queries have thorough assertions
- [ ] **No redundancy**: No two assertions test the same information
- [ ] **Yieldable**: Assertions allow for natural language variation in the response

File-level checks (MUST pass before writing `queries_assertions.yaml`):

- [ ] **Programmatic coverage ≥ 50%**: At least half of the queries contain at least one `- test: citations_test.test_citation` assertion.
- [ ] **Verbatim citation args**: Every `args` value matches the grounding entity's Subject/Title exactly (no paraphrasing, no truncation).
- [ ] **Mixed assertion types per query**: Queries with `test:` assertions also contain supporting `text:` assertions.
- [ ] **Entity-specific queries always cited**: Any query that names or unambiguously identifies a specific entity has a `test:` assertion for that entity.
- [ ] **Level enum compliance**: Every `level:` value is exactly `critical`, `expected`, or `aspirational` (lowercase, no quotes, no synonyms). No `must`/`should`/`may`, no `high`/`medium`/`low`, no priority numbers, no capitalized variants.

---

## Part 7: Steering Parameters

When invoking this skill, the caller can control generation behavior through these parameters:

| Parameter | Effect | Example |
|---|---|---|
| `industry` | Sets domain vocabulary, jargon, and topic bias | "healthcare", "finance", "engineering" |
| `personality` | Adjusts verbosity, formality, precision | "terse-casual", "verbose-formal" |
| `culture` | Influences name ordering, directness, date formats | "japanese-business", "american-casual" |
| `entity_focus` | Weights query distribution toward entity types | ["emails": 0.5, "calendar": 0.3, "files": 0.2] |
| `difficulty_distribution` | Controls mix of easy/medium/hard queries | {"broad": 0.3, "specific": 0.5, "complex": 0.2} |
| `match_type_distribution` | Controls mix of exact/partial/semantic matching | {"exact": 0.4, "partial": 0.3, "semantic": 0.2, "keyword": 0.1} |
| `assertion_density` | Controls assertions per query | "minimal" (1-2), "standard" (3-5), "thorough" (5-10) |
| `temporal_bias` | Weights toward recent/old/future data | "recency" biases toward last 7 days |
| `eval_datetime` | The reference datetime for all temporal calculations | "2025-06-15T10:00:00Z" |
| `max_queries` | Total queries to generate | 50, 100, 500 |

---

## Skill: provision-grounding


# Provision Grounding Data for SEVAL

**Target:** $ARGUMENTS

You are a specialist agent that provisions grounding data for SEVAL daily
evaluations. This handles what's needed beyond the queryset + LMC: connecting
to grounding files, generating agent config templates, and producing the full
artifact checklist for an evalset.

## Environment

>  This skill connects to the COEP Pre-Production Environment (PPE) and Production Environment (Prod).

## Scope

This skill:
- Connects to an existing SharePoint folder (Mode A) or creates a new one (Mode B)
- Enumerates grounding files via Microsoft Graph API
- Generates a pluggable agent config template
- Wires up queryset file references if converter output exists
- Validates the final package against Schema Service MCP

This skill does NOT:
- Convert benchmark datasets (use `convert-benchmark` for that)
- Submit SEVAL jobs (use `submit-job` for that)
- Create or customize actual agent packages (TeamsApp.zip, .agent files)

## Rules

### MUST
- Always confirm the SharePoint site/folder URL with the user before any operations
- Always validate that the SharePoint folder is accessible before proceeding
- Always show a summary of discovered/uploaded files after provisioning
- Always produce the artifact checklist at the end
- Report errors with actionable remediation steps

### MUST NOT
- NEVER delete existing SharePoint sites, libraries, or files
- NEVER upload files larger than 250 MB without user confirmation
- NEVER overwrite existing files without confirmation
- NEVER store Graph API tokens in output files
- NEVER modify original converter output — create new `_grounded` suffixed files

## Prerequisites

Python 3.10+ with:

```bash
python -c "import requests, yaml" 2>/dev/null || pip install requests pyyaml
```

**Azure CLI** (`az`) must be installed and logged in:

```bash
az login --tenant 72f988bf-86f1-41af-91ab-2d7cd011db47
```

Sign in with your Microsoft corporate account (`@microsoft.com`) — the same
account you use to access SharePoint in the browser. The subscription selection
does not matter; Graph API access is identity-based.

If you are already logged in, verify with:

```bash
python scripts/graph_auth.py --check
```

## Workflow

### Phase 1: Determine Mode

Match the user's input to a mode:

- **Input is a SharePoint URL** (contains `sharepoint.com`) → **Mode A** (connect to existing)
- **Input is a benchmark name or local path** → **Mode B** (provision new)
- **Ambiguous** → Ask: "Do you want to connect to an existing SharePoint folder, or create a new one?"

### Phase 2: Authenticate to Microsoft Graph

First check if the user is logged in to Azure CLI:

```bash
cd ${PLUGIN_ROOT}/skills/provision-grounding
python scripts/graph_auth.py --check
```

If not logged in, **tell the user** to run:

```bash
az login --tenant 72f988bf-86f1-41af-91ab-2d7cd011db47
```

Sign in with your Microsoft corporate account (`@microsoft.com`). This is the
same account you use to access SharePoint in the browser.

Once logged in, get the token:

```bash
python scripts/graph_auth.py
```

Token saved to `_graph_token.txt` (~1 hour validity).

### Phase 3A: Connect to Existing SharePoint (Mode A)

**Step 3a-1 — Resolve site and enumerate files:**

```bash
python scripts/sharepoint_provision.py \
  --token-file _graph_token.txt \
  --folder-url "<SharePoint folder URL from user>" \
  --action enumerate
```

**Expected output:**
```
SharePoint Folder: EarningsReport
  Site:   https://microsoft.sharepoint.com/sites/COEP-Benchmarks
  Drive:  b!abc123...
  Files:  20 items

  2022 Q3 AAPL.pdf        (1.2 MB)
  2022 Q3 AMZN.pdf        (890 KB)
  2022 Q3 INTC.pdf        (1.1 MB)
  ...

  Manifest written to output/grounding_manifest.json
```

**Step 3a-2 — Confirm with user:**

"Found 20 files in the SharePoint folder. Proceed to generate agent config?"

### Phase 3B: Provision New SharePoint (Mode B)

**Step 3b-1 — Ask the user for target site:**

Prompt: "Which SharePoint site should I create the library in?"
- Provide a URL to an existing site
- Or use default from `configs/emp_defaults.yaml`

**Step 3b-2 — Create document library:**

```bash
python scripts/sharepoint_provision.py \
  --token-file _graph_token.txt \
  --site-url "https://microsoft.sharepoint.com/sites/<site>" \
  --library-name "<BenchmarkName>_GroundingData" \
  --action create-library
```

**Step 3b-3 — Upload files:**

```bash
python scripts/sharepoint_provision.py \
  --token-file _graph_token.txt \
  --site-url "https://microsoft.sharepoint.com/sites/<site>" \
  --library-name "<BenchmarkName>_GroundingData" \
  --action upload \
  --source-dir <path-to-files>
```

### Phase 4: Generate Agent Config Template

Generate a placeholder agent config referencing the grounding data.
The agent format varies by team (MSAI, ODSP, CPNB, etc.), so this
produces a template the user customizes.

```bash
python scripts/agent_generator.py \
  --grounding-url "<SharePoint folder URL>" \
  --benchmark-name "<Name>" \
  --output output/agent_config.json \
  [--template msai|odsp|generic]
```

**Output:**
```json
{
  "_comment": "Agent config template — customize for your eval area",
  "name": "EarningsReport",
  "grounding_data": {
    "type": "sharepoint",
    "folder_url": "https://microsoft.sharepoint.com/sites/.../EarningsReport",
    "file_count": 20
  },
  "agent_type": "TODO: set to your agent format (TeamsApp.zip, .agent, etc.)",
  "corpus_size": "TODO: Small or Large",
  "area": "TODO: MSAI, ODSP, CPNB, SOX, Office, or CEQE"
}
```

> **Note:** This template provides the grounding data reference. The actual
> agent package (.agent file, TeamsApp.zip) must be created separately per
> your team's format. See the MSAI Daily SEVALs doc for format details.

### Phase 5: Wire Queryset File References (Optional)

If converter output exists (`convert-benchmark/output/<benchmark>/queries.tsv`),
offer to wire up grounding file references:

```bash
python scripts/wire_queryset.py \
  --queryset <path-to-queries.tsv> \
  --manifest output/grounding_manifest.json \
  --output output/queries_grounded.tsv
```

This rewrites `upload_file_paths` in the converged TSV to use SharePoint URLs.
Original file is not modified — a new `_grounded.tsv` is created.

**Skip this phase** if the grounding data is linked via agent config (MSAI model)
rather than via queryset file references.

### Phase 6: Validate via Schema MCP (Optional)

If Schema Service MCP is connected, validate the final package:

**Step 6a — Validate queryset** (if wired up in Phase 5):

Call `validate_data` MCP tool with `dataType: queryset` on sample rows from
`queries_grounded.tsv`.

**Step 6b — Report:**

```
Schema Validation Results:
  queryset (grounded):  PASS (3/3 rows valid)
  File manifest:        20 files enumerated
```

If MCP is unavailable, skip and note: "Schema validation skipped — validate
manually at https://coep-npe.microsoft.com/schema/portal"

### Phase 7: Artifact Checklist

Print the full artifact checklist matching the MSAI Daily SEVALs table format:

```
Artifact Checklist for <Name>
============================================================
  ✅ Grounding Data:  <SharePoint folder URL>  (20 files)
  ⬜ Agent:           output/agent_config.json  (template — customize for your area)
  ✅ Queryset:        output/queries_grounded.tsv  (45 queries)
  ✅ LMC:             output/queries_assertions.yaml  (572 assertions)
============================================================

Next steps:
  1. Customize agent_config.json for your eval area's agent format
  2. Upload queryset + LMC via submit-job skill or SEVAL portal
  3. Create offline job via submit-job or portal
```

## Output Files

| File | Purpose |
|------|---------|
| `_graph_token.txt` | Microsoft Graph API token (temporary, ~1hr) |
| `output/grounding_manifest.json` | Map of filename → SharePoint URL + metadata |
| `output/agent_config.json` | Agent config template |
| `output/queries_grounded.tsv` | Queryset with SharePoint file URLs (if wired) |

## Error Handling

| Error | Cause | Remediation |
|-------|-------|-------------|
| Graph API 403 | Insufficient permissions | Verify user can access the SharePoint folder in browser |
| Graph API 404 on site | Site URL incorrect or no access | Verify URL in browser, check permissions |
| Upload 413 | File too large (>250 MB) | Split file or use chunked upload |
| No converter output | `convert-benchmark` not run yet | Run converter first, or skip Phase 5 |
| Schema validation fails | File URLs not resolving | Check manifest, re-enumerate SharePoint folder |
| Token expired | Session > 1 hour | Re-run `graph_auth.py` |
| Empty SharePoint folder | No files in the folder URL | Verify the correct folder was provided |
| Azure CLI not installed | `az` command not found | Install from https://aka.ms/installazurecliwindows |
| Azure CLI not logged in | No active session | Run `az login --tenant 72f988bf-86f1-41af-91ab-2d7cd011db47` |

## Cleanup

- Output files are written to `output/` within the skill directory
- `_graph_token.txt` should be deleted after use (contains credentials)
- SharePoint resources are not modified (Mode A) or persist and must be deleted manually (Mode B)

---

## Skill: publish-evalset


**Step 0 — Verify prerequisites:**

Before running `Upload-Evalset.ps1`, verify that all required tools are installed. Run each check and install anything that is missing.

1. **AzCopy** — Required for uploading data to blob storage.
   - Check: Run `azcopy --version` in the terminal.
   - If missing, install it:
     ```powershell
     # Windows (winget)
     winget install Microsoft.AzCopy
     ```
     If `winget` is not available, download manually:
     ```powershell
     Invoke-WebRequest -Uri "https://aka.ms/downloadazcopy-v10-windows" -OutFile "$env:TEMP\azcopy.zip"
     Expand-Archive -Path "$env:TEMP\azcopy.zip" -DestinationPath "$env:TEMP\azcopy" -Force
     $azcopyExe = Get-ChildItem -Path "$env:TEMP\azcopy" -Recurse -Filter "azcopy.exe" | Select-Object -First 1
     Copy-Item $azcopyExe.FullName -Destination "$env:LOCALAPPDATA\Microsoft\WindowsApps\azcopy.exe" -Force
     ```
     After installation, verify with `azcopy --version`.

2. **Azure CLI** — Required for authentication on PowerShell 7+ (Core).
   - Check: Run `az --version` in the terminal.
   - If missing, install it:
     ```powershell
     winget install Microsoft.AzureCLI
     ```
     If `winget` is not available:
     ```powershell
     Invoke-WebRequest -Uri "https://aka.ms/installazurecliwindows" -OutFile "$env:TEMP\AzureCLI.msi"
     Start-Process msiexec.exe -ArgumentList "/I `"$env:TEMP\AzureCLI.msi`" /quiet" -Wait
     ```
     After installation, restart the terminal and verify with `az --version`.
   - Then log in:
     ```powershell
     az login --tenant 72f988bf-86f1-41af-91ab-2d7cd011db47
     ```

3. **MSAL.PS module** — Required for authentication on Windows PowerShell 5.x only (not needed on PowerShell 7+).
   - Check: Run `Get-Module -ListAvailable -Name MSAL.PS` in the terminal.
   - If missing, install it:
     ```powershell
     Install-Module -Name MSAL.PS -Scope CurrentUser -Force -AllowClobber
     ```
   - Note: The script will attempt to auto-install this module if missing, but pre-installing avoids interactive prompts.

If any prerequisite cannot be installed, stop and inform the user with the specific error before proceeding.

**Step 1 — Check for existing evalsets:**

Find the evalset folder inside the `evalsets/` folder that matches the name provided by the user. If no matching evalset is found, return an error: "No evalset found with the name '<name>'. Please check the name and try again."

Use the Assets Service MCP to list evalsets matching the benchmark name.
If a matching evalset exists, ask: "Found existing evalset '<name>' (ID: <id>).
Update it with a new version, or create a new evalset?"

**Step 2 — Collect metadata:**

- **Name**: Use the name of the evalset folder (e.g., `copilot-calendar-dsat-eval`)
- **Description**: Use the description provided by the user, or the same value as the Name if the user does not provide one.
- **Tags**: Use `["local_agentic"]` plus any other tags that may be derived from the evalset content.
- **Scenario**: `Local Agentic`
- **TargetOfferings**: Ask the user or default to `@("BizChat Web")`. Valid values: `BizChat Web`, `BizChat Work`, `DA`, `USERP`.

**Step 3 — Identify data folders:**

The Upload-Evalset.ps1 script takes **folder paths** (not zip files) and automatically scans them for datasets.

- **Grounding data folder**: The evalset folder itself (contains `*.config.json` files and special folders like `files/`, `transcripts/`, etc.)
- **Query/assertion data folder**: If the evalset contains `queries.tsv` and/or `queries_assertions.yaml`, create a temporary folder containing only those files and pass it as the query assertion path.

The script automatically handles:
- Config files (`*.config.json`) → uploaded as individual grounding datasets
- Special folders (`files/`, `transcripts/`, `grounding_checkpoint/`, `DAConfig/`, etc.) → uploaded as complete datasets
- Query/assertion files (`.tsv`, `.yaml`, `.yml`) → uploaded individually

**Step 4 — Upload the evalset:**

Use the `Upload-Evalset.ps1` script located at `skills/publish-evalset/scripts/Upload-Evalset.ps1`:

```powershell
# New evalset
.\Upload-Evalset.ps1 -Environment Prod -EvalsetName "{Name}" -GroundingDatasetsPath "{GroundingFolder}" -QueryAssertionDatasetsPath "{QAFolder}" -TargetOfferings @("BizChat Web") -Description "{Description}" -Tags @("local_agentic") -Scenario "Local Agentic"

# Update existing evalset (new version)
.\Upload-Evalset.ps1 -Environment Prod -EvalsetId "{ExistingId}" -EvalsetName "{Name}" -GroundingDatasetsPath "{GroundingFolder}" -QueryAssertionDatasetsPath "{QAFolder}" -TargetOfferings @("BizChat Web") -Description "{Description}" -Tags @("local_agentic") -Scenario "Local Agentic"
```

Parameters:
- `-Environment`: NPE, PPE, or Prod (default to Prod)
- `-EvalsetName`: Name of the evalset
- `-GroundingDatasetsPath`: Path to folder containing grounding data (config files + special folders)
- `-QueryAssertionDatasetsPath`: Path to folder containing query/assertion files (optional, omit if no queries/assertions exist)
- `-EvalsetId`: ID of existing evalset to update (optional, omit for new evalsets)
- `-TargetOfferings`: Array of offerings
- `-Description`, `-Tags`, `-Scenario`: Metadata
- `-AzCopyPath`: Path to azcopy executable (defaults to "azcopy" on PATH)
- `-ConcurrentConnections`: AzCopy concurrency (default: 16)
- `-MaxUploadSpeedMbps`: Bandwidth limit (default: 0 = unlimited)

**Step 5 — Report result:**

```
Published to CStore (PROD):
  Evalset ID:  <id>
  Version:     <version>
  Name:        <name>
  SEVAL URL:   https://seval.microsoft.com/evalset/detail/<id>
  CStore URL:  https://coep.microsoft.com/cstore-explorer/<id>/<version>
  Note:        This is PROD only. Data is not visible in NPE/PPE.
```
---

## Skill: run-cli-scripts


Only scripts listed in the **Available Scripts** table are permitted to be executed. Any other commands or scripts must be rejected or ignored to prevent arbitrary command execution.

When an MCP tool (such as `mcp_assets-service_*`, `mcp_schema-service_*`, `mcp_emp-ppe_*`, or `mcp_emp-prod_*`) returns either:
- A response with `action: "run_local_script"` containing a `command` field, or
- A response that instructs you to run a local PowerShell script

You must locate and run the corresponding script from the **scripts folder** in the workspace at:

```
scripts/
```

## Available Scripts

| Script | Purpose |
|--------|---------|
| `Common-Auth.ps1` | Shared authentication helpers (dot-sourced by other scripts, not run directly) |
| `Download-Asset.ps1` | Downloads evalsets/datasets from the Assets Service |
| `Upload-Evalset.ps1` | Uploads/publishes evalsets to the Assets Service |
| `Validate-Schema.ps1` | Validates ZIP files against the Schema Service |
| `emp-mcp.ps1` | EMP MCP server (stdio transport, run by MCP config) |

## How to Run

1. **Find the script**: When the MCP tool response contains a script command (e.g., `Validate-Schema.ps1`), locate the matching script in `scripts/`.

2. **Determine the PowerShell version**: The scripts support both PowerShell 5.1 and PowerShell 7+:
   - **PowerShell 7+ (pwsh)**: Authentication uses Azure CLI (`az account get-access-token`). The user must have run `az login --tenant 72f988bf-86f1-41af-91ab-2d7cd011db47` first.
   - **PowerShell 5.1 (powershell.exe)**: Authentication uses MSAL.PS interactive browser flow. Use this if Azure CLI is not available, or if the user requests it.

3. **Execute the script**: Run it with the parameters specified in the MCP tool response. Example:
   ```powershell
   # From PowerShell 5.1 (if PS7 auth fails or user prefers):
   powershell.exe -ExecutionPolicy RemoteSigned -Command "Set-Location 'scripts'; .\Validate-Schema.ps1 -Environment Prod -FilePath 'C:\data\grounding.zip' -ValidationType all"

   # From PowerShell 7+:
   Set-Location 'scripts'; .\Validate-Schema.ps1 -Environment Prod -FilePath 'C:\data\grounding.zip' -ValidationType all
   ```

4. **Run in a separate window/session**: Since these scripts require interactive authentication (browser popup or `az login` confirmation), run them in a separate window or session to ensure the interactive prompts can function properly.

## Important Notes

- Do NOT use the `scriptDirectory` path from the MCP tool response verbatim — it may point to a different repo location. Always use `scripts/` in this workspace.
- If a script fails with an authentication error on PS7, suggest the user run `az login --tenant 72f988bf-86f1-41af-91ab-2d7cd011db47` first.
- If a script fails with an authentication error on PS5.1, ensure MSAL.PS module is installed (`Install-Module -Name MSAL.PS -Scope CurrentUser`).
- The `Common-Auth.ps1` module is automatically dot-sourced by the other scripts — you should never need to run it directly.

---

## Skill: spectra


# Spectra Skill

You are helping with the Spectra fidelity measurement system. This skill has two main capabilities:

1. **Onboard** — Map partner data quality requirements to Spectra YAML configs
2. **Execute** — Set up environments, run quality evaluation jobs, and re-render reports

Determine which capability the user needs based on their request. If ambiguous, ask.


## Capability 2: Execute

Use this when the user wants to: set up a development environment, install dependencies, run a quality measurement job, re-render an HTML report from existing results, or troubleshoot a failed run.

Read the full execution instructions from `references/execute.md`.

---

## Shared References

These reference files provide quick-lookup tables. **They are snapshots, not the source of truth** — always cross-check against the actual codebase before relying on them. See disclaimers in each file for where to find the canonical, up-to-date definitions.

- `references/metric_types.md` — Supported metric types with parameters and constraint types
- `references/feature_operations.md` — Feature builder operations with inputs/outputs
- `references/onboarding_decision_tree.md` — Decision flowchart for mapping requirements
- `references/yaml_examples.md` — Annotated YAML examples for common patterns

---

## Skill: validate-schema


Use the schema_get_types MCP tool to get the correct type to use depending on the type of the file being validated. Then, use the schema_validate_data MCP tool to validate individual JSON files. Do not use custom rules. Show an error to the user if the file is too large and can't be passed inline. DO not use an upload session.

When an MCP tool returns a response with `action: "run_local_script"`, locate and run the corresponding script from the **scripts folder** in the workspace at `scripts/`. Do NOT use the `scriptDirectory` path from the MCP response verbatim. Ensure that the script name does not contain path separators (`/`, `\`) or traversal segments (`..`). Only allow execution of scripts with known filenames within `scripts/` to prevent unintended script execution. Run the script in a way that preserves an interactive TTY/session to allow interactive authentication, such as in the foreground or using a mode that supports interactive prompts. Refer to the `run-cli-scripts` skill for detailed instructions.

When validating a single file you may get errors about cross-validation with other files in the evalset. This is expected if the file being validated has references to other files. Let the user know that they can either ignore these errors, or can request a validation that includes cross-reference checks.

When performing a validation with cross-reference checks, create a ZIP file in a temp folder that contains all the JSON documents (do not include any files or transcript folders) in the evalset and use that ZIP file as the input to the validation tool. This will ensure that all cross-file references are properly validated.

## Fixing Data Issues

When the user asks to fix validation errors in data files, **always create a new file** instead of modifying the original file. This prevents accidental data loss.

- Name the new file with a `_fixed` suffix (e.g., `emails.config.json` → `emails.config_fixed.json`), or place it in a separate output folder.
- Inform the user of the new file location and let them review the changes before replacing the original.
- Never overwrite or edit the original data file directly.

