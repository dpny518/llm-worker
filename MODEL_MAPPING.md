# Model Mapping — OpenAI & Claude → Cloudflare Workers AI

Map OpenAI and Anthropic Claude models to the closest Cloudflare-hosted equivalent available through this gateway. Use these mappings when migrating from OpenAI/Anthropic APIs.

**Key:** 🔵 = directly hosted on Cloudflare | 🟡 = approximate match (quality/use-case) | 🟢 = exact match

---

## OpenAI → Cloudflare Mapping

### Frontier Models (GPT-5.6 family)

| OpenAI Model | Cloudflare Model | Match | Notes |
|---|---|---|---|
| `gpt-5.6-sol` | `kimi-k2.7-code` | 🔵 | Both frontier-class. Sol is stronger but K2.7 is closest Cloudflare-hosted frontier coder |
| `gpt-5.6-terra` | `kimi-k2.7-code` | 🔵 | Balanced intelligence/cost — K2.7 for coding + agentic work |
| `gpt-5.6-luna` | `glm-5.2` | 🔵 | Cost-optimized — GLM-5.2 with coding + tool use |

### GPT-5.5 / GPT-5.4 Family

| OpenAI Model | Cloudflare Model | Match | Notes |
|---|---|---|---|
| `gpt-5.5` | `llama-3.3-70b` | 🔵 | General-purpose flagship |
| `gpt-5.5-pro` | `glm-5.2` | 🔵 | Pro tier — GLM-5.2 for agentic coding + tool calling |
| `gpt-5.4` | `llama-3.3-70b` | 🔵 | Affordable coding/professional work |
| `gpt-5.4-pro` | `glm-5.2` | 🔵 | Higher precision — GLM-5.2 with reasoning |
| `gpt-5.4-mini` | `gemma-4` | 🔵 | Strong mini model |
| `gpt-5.4-nano` | `llama-3.2-3b` | 🔵 | Cheapest for simple high-volume tasks |

### Reasoning Models (o-series)

| OpenAI Model | Cloudflare Model | Match | Notes |
|---|---|---|---|
| `o3-pro` | `qwq-32b` | 🔵 | Both reasoning-focused with chain-of-thought |
| `o3` | `deepseek-r1` | 🔵 | General-purpose reasoning |
| `o4-mini` | `llama-3.2-3b` | 🔵 | Fast, cost-efficient lightweight reasoning |
| `o3-mini` | `llama-3.2-1b` | 🔵 | Lightest reasoning option |

### Coding Models

| OpenAI Model | Cloudflare Model | Match | Notes |
|---|---|---|---|
| `gpt-5.3-codex` | `kimi-k2.7-code` | 🔵 | Most capable agentic coding — K2.7 is your strongest coder |
| `gpt-5.2-codex` | `glm-5.2` | 🔵 | Long-horizon coding tasks |
| `gpt-5.1-codex` | `glm-5.2` | 🔵 | Agentic coding with function calling |

### GPT-5 / GPT-4 Family (Legacy)

| OpenAI Model | Cloudflare Model | Match | Notes |
|---|---|---|---|
| `gpt-5.2` | `glm-5.2` | 🔵 | Previous frontier with coding/reasoning — GLM-5.2 matches this class |
| `gpt-5.1` | `glm-5.2` | 🔵 | Strong coding + agentic — GLM-5.2 with function calling |
| `gpt-5` | `llama-3.3-70b` | 🔵 | Configurable reasoning effort |
| `gpt-5-mini` | `gemma-4` | 🔵 | Near-frontier for cost-sensitive workloads |
| `gpt-5-nano` | `llama-3.2-1b` | 🔵 | Fastest, cheapest |
| `gpt-4.1` | `llama-3.3-70b` | 🔵 | Smart non-reasoning model |
| `gpt-4.1-mini` | `llama-3.2-3b` | 🔵 | Smaller, faster |
| `gpt-4.1-nano` | `llama-3.2-1b` | 🔵 | Fastest, cheapest |
| `gpt-4o` | `llama-3.1-8b` | 🔵 | Fast, intelligent, flexible |
| `gpt-4o-mini` | `llama-3.2-3b` | 🔵 | Small model for focused tasks |
| `gpt-4-turbo` | `llama-3-8b` | 🔵 | Older high-intelligence model |
| `gpt-4` | `llama-2-7b` | 🔵 | Legacy high-intelligence |
| `gpt-3.5-turbo` | `llama-3.2-1b` | 🔵 | Cheapest legacy chat |

### Open-Weight Models

| OpenAI Model | Cloudflare Model | Match | Notes |
|---|---|---|---|
| `gpt-oss-120b` | `gpt-oss-120b` | 🟢 | Exact match — same model |
| `gpt-oss-20b` | `gpt-oss-20b` | 🟢 | Exact match — same model |

### Embedding Models

| OpenAI Model | Cloudflare Model | Match | Notes |
|---|---|---|---|
| `text-embedding-3-large` | `bge-large` | 🔵 | 3072-dim vs 1024-dim; BGE Large is closest in quality |
| `text-embedding-3-small` | `bge-small` | 🔵 | 1536-dim vs 384-dim; BGE Small is closest in speed/size |
| `text-embedding-ada-002` | `bge-base` | 🔵 | Older embedding — BGE Base is comparable |

### Speech / Audio Models

| OpenAI Model | Cloudflare Model | Match | Notes |
|---|---|---|---|
| `whisper-1` | `whisper` | 🟢 | Exact match — same Whisper model |
| `whisper-1` (turbo) | `whisper-turbo` | 🟢 | Whisper Large v3 Turbo — faster, more accurate |
| `gpt-4o-transcribe` | `nova-3` | 🔵 | Both SOTA speech-to-text |
| `tts-1` | `aura-2-en` | 🔵 | Real-time TTS |
| `tts-1-hd` | `aura-2-en` | 🔵 | High-quality TTS |

### Image Generation

| OpenAI Model | Cloudflare Model | Match | Notes |
|---|---|---|---|
| `gpt-image-2` | `flux-2-dev` | 🔵 | SOTA text-to-image |
| `gpt-image-1.5` | `flux-1-schnell` | 🔵 | Previous generation |
| `dall-e-3` | `stable-diffusion-xl` | 🔵 | Previous generation |

---

## Claude → Cloudflare Mapping

### Frontier Models

| Claude Model | Cloudflare Model | Match | Notes |
|---|---|---|---|
| `claude-fable-5` | `kimi-k2.7-code` | 🔵 | Both frontier — Claude stronger, K2.7 is closest 1T coder + agent |
| `claude-mythos-5` | `kimi-k2.7-code` | 🔵 | Defensive cybersecurity — K2.7 as closest frontier agent |

### Opus Family (Most Capable)

| Claude Model | Cloudflare Model | Match | Notes |
|---|---|---|---|
| `claude-opus-4-8` | `kimi-k2.7-code` | 🔵 | Complex agentic coding, enterprise — K2.7 1T for top-tier agentic work |
| `claude-opus-4-7` | `kimi-k2.7-code` | 🔵 | Strong agentic coding — K2.7 with function calling + vision |
| `claude-opus-4-6` | `glm-5.2` | 🔵 | Complex multi-step work — GLM-5.2 with function calling |
| `claude-opus-4-5` | `glm-5.2` | 🔵 | Reasoning, coding, agentic — GLM-5.2 covers this well |

### Sonnet Family (Balanced)

| Claude Model | Cloudflare Model | Match | Notes |
|---|---|---|---|
| `claude-sonnet-5` | `kimi-k2.7-code` | 🔵 | Speed + intelligence, strong coding — K2.7 for fast agentic coding |
| `claude-sonnet-4-6` | `glm-5.2` | 🔵 | Balanced coding/reasoning |
| `claude-sonnet-4-6` | `glm-5.2` | 🔵 | Balanced coding/reasoning |
| `claude-sonnet-4-5` | `llama-4-scout` | 🔵 | Best coding model of its generation |
| `claude-sonnet-4` | `llama-3.3-70b` | 🔵 | Previous generation balanced |

### Haiku Family (Fastest)

| Claude Model | Cloudflare Model | Match | Notes |
|---|---|---|---|
| `claude-haiku-4-5` | `gemma-4` | 🔵 | Fast with near-frontier intelligence |
| `claude-haiku-3-5` | `llama-3.2-3b` | 🔵 | Fast, cost-efficient |

---

## How to Use This Mapping

### OpenAI SDK → Cloudflare

```javascript
// Before (OpenAI)
const completion = await openai.chat.completions.create({
  model: 'gpt-5.4-mini',
  messages: [{ role: 'user', content: 'Hello!' }]
});

// After (Cloudflare via this gateway)
const completion = await openai.chat.completions.create({
  model: 'gemma-4',  // ← mapped from gpt-5.4-mini
  messages: [{ role: 'user', content: 'Hello!' }]
});
// Same SDK, same baseURL change — just swap the model name
```

### Anthropic SDK → Cloudflare

To use this gateway as a Claude replacement, use the OpenAI-compatible endpoints with the mapped model name:

```javascript
// Before (Claude)
const response = await anthropic.messages.create({
  model: 'claude-sonnet-5',
  messages: [{ role: 'user', content: 'Hello!' }]
});

// After (Cloudflare via this gateway — use OpenAI SDK or REST)
const response = await fetch(`${WORKER_BASE_URL}/v1/chat/completions`, {
  method: 'POST',
  headers: {
    'Authorization': `Bearer ${LLM_API_KEY}`,
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    model: 'llama-4-scout',  // ← mapped from claude-sonnet-5
    messages: [{ role: 'user', content: 'Hello!' }]
  })
});
```

### Latency / Capability Trade-offs

| Priority | Use this Cloudflare model |
|---|---|
| **Maximum capability** | `kimi-k2.7-code` |
| **Best coding / agentic** | `kimi-k2.7-code` |
| **Fast coding / tool use** | `glm-5.2` |
| **Best reasoning** | `qwq-32b` / `deepseek-r1` |
| **Best speed** | `llama-3.2-1b` / `llama-3.2-3b` |
| **Best balance** | `llama-3.3-70b` / `llama-4-scout` |
| **Best embeddings** | `bge-large` |
| **Best multilingual** | `bge-m3` (embeddings) / `gemma-3` (text) |

---

_Last updated: July 2026. OpenAI models sourced from [developers.openai.com/api/docs/models](https://developers.openai.com/api/docs/models). Claude models sourced from [platform.claude.com/docs/en/about-claude/models/overview](https://platform.claude.com/docs/en/about-claude/models/overview)._
