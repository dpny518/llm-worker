# LLM Worker — OpenAI-Compatible Cloudflare AI Gateway

An OpenAI-compatible API gateway that proxies requests to Cloudflare Workers AI. Drop this into any OpenAI SDK by changing the `baseURL`, and your requests route to Cloudflare's hosted models.

## Quick Start (Deploy in 5 Minutes)

### 1. Create a Cloudflare Account
Go to [dash.cloudflare.com/sign-up](https://dash.cloudflare.com/sign-up) and create a free account. No credit card required — Workers AI has a generous free tier.

### 2. Create an API Token
  1. Go to [dash.cloudflare.com/profile/api-tokens](https://dash.cloudflare.com/profile/api-tokens)
  2. Click **Create Token** → Use the **Edit Cloudflare Workers** template
  3. Under **Account Resources**, select your account
  4. Under **Zone Resources**, select **All zones**
  5. Click **Continue to summary** → **Create Token**
  6. Copy the token — you won't see it again

### 3. Install Wrangler CLI
```bash
npm install -g wrangler
```

### 4. Connect Wrangler to Your Cloudflare Account
```bash
wrangler login
```
This opens a browser window. Log in and authorize Wrangler to access your account.

### 5. Clone and Deploy
```bash
git clone <this-repo-url> llm-worker
cd llm-worker
npm install

# Generate a strong random API key (32+ characters) — this is what clients use
openssl rand -hex 32

# Set it as the worker secret
wrangler secret put LLM_API_KEY
# Paste your API key when prompted

# Deploy
wrangler deploy
```

After deploying, note the worker URL (looks like `https://llm-worker.your-subdomain.workers.dev`).

### 6. Make Your First Request
```bash
export WORKER_BASE_URL="https://llm-worker.your-subdomain.workers.dev"
export LLM_API_KEY="your-api-key-from-step-5"

# List available models
curl -H "Authorization: Bearer $LLM_API_KEY" "$WORKER_BASE_URL/v1/models"

# Chat completion
curl "$WORKER_BASE_URL/v1/chat/completions" \
  -H "Authorization: Bearer $LLM_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{"model":"llama-3.3-70b","messages":[{"role":"user","content":"Hello!"}]}'

# Or use the OpenAI SDK
```

### Using the OpenAI SDK
```javascript
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.LLM_API_KEY,
  baseURL: `${process.env.WORKER_BASE_URL}/v1`
});

const completion = await openai.chat.completions.create({
  model: 'llama-3.3-70b',
  messages: [{ role: 'user', content: 'Hello!' }]
});

const embeddings = await openai.embeddings.create({
  model: 'bge-large',
  input: 'Hello world'
});
```

## Updating the API Key
```bash
# Change the key clients must use
wrangler secret put LLM_API_KEY
# Paste the new key
# Then redeploy
wrangler deploy
```

---

## OpenAI-Compatible Endpoints
```text
POST ${WORKER_BASE_URL}/v1/chat/completions
POST ${WORKER_BASE_URL}/v1/embeddings
GET  ${WORKER_BASE_URL}/v1/models
```

The worker accepts OpenAI-style payloads for chat completions and embeddings. The legacy root `POST /` endpoint remains available for the older custom contract.

## Authentication
All requests must include the API key set via `wrangler secret put LLM_API_KEY`:
```
Authorization: Bearer ${LLM_API_KEY}
```

## Environment Variables
```bash
cp .env.example .env          # local helper scripts
cp .dev.vars.example .dev.vars # local Wrangler dev secrets

export WORKER_BASE_URL="https://your-worker.your-subdomain.workers.dev"
export LLM_API_KEY="your-client-facing-api-key"
export CLOUDFLARE_ACCOUNT_ID="your-cloudflare-account-id"
export CLOUDFLARE_API_TOKEN="your-cloudflare-api-token"
```

- `WORKER_BASE_URL`: deployed worker URL
- `LLM_API_KEY`: secret checked by the worker before forwarding to AI binding
- `CLOUDFLARE_ACCOUNT_ID` / `CLOUDFLARE_API_TOKEN`: only needed for helper scripts or CI

## OpenAI SDK Example

```javascript
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.LLM_API_KEY,
  baseURL: `${process.env.WORKER_BASE_URL}/v1`
});

const completion = await openai.chat.completions.create({
  model: 'llama-3.3-70b',
  messages: [
    { role: 'user', content: 'Hello!' }
  ]
});

const embeddings = await openai.embeddings.create({
  model: 'bge-large',
  input: 'Hello world'
});
```

## Chat Completions

### Request Format
```json
{
  "model": "llama-3.3-70b",
  "messages": [
    {"role": "user", "content": "Hello!"}
  ],
  "max_tokens": 512
}
```

### Available Models
- `llama-3.3-70b` - Meta Llama 3.3 70B (fp8, fast)
- `llama-4-scout` - Meta Llama 4 Scout 17B
- `llama-3.2-3b` - Llama 3.2 3B
- `llama-3.2-1b` - Llama 3.2 1B
- `llama-3.2-11b-vision` - Llama 3.2 11B Vision
- `llama-3-8b` - Llama 3 8B
- `llama-3.1-8b` - Llama 3.1 8B (fp8)
- `llama-3.1-8b-awq` - Llama 3.1 8B (quantized)
- `llama-3-8b-awq` - Llama 3 8B (quantized)
- `llama-2-7b` - Llama 2 7B (fp16)
- `llama-2-7b-int8` - Llama 2 7B (int8)
- `llama-guard-3` - Llama Guard 3 8B (content safety)
- `gpt-oss-120b` - OpenAI GPT OSS 120B
- `gpt-oss-20b` - OpenAI GPT OSS 20B
- `qwen3-30b` - Qwen 3 30B (fp8)
- `qwq-32b` - QwQ 32B (reasoning model)
- `qwen2.5-coder` - Qwen 2.5 Coder 32B
- `mistral-7b` - Mistral 7B v0.1
- `mistral-small` - Mistral Small 3.1 24B
- `deepseek-r1` - DeepSeek R1 Distill 32B
- `gemma-3` - Gemma 3 12B
- `gemma-4` - Gemma 4 (26B MoE)
- `granite-4` - IBM Granite 4.0 Micro
- `glm-4.7-flash` - GLM-4.7-Flash
- `glm-5.2` - GLM-5.2 (agentic coding)
- `kimi-k2.7-code` - Kimi K2.7 Code (1T params)
- `kimi-k2.6` - Kimi K2.6 (1T params)
- `nemotron-3` - NVIDIA Nemotron 3 (120B MoE)

## Embeddings

### Request Format
```json
{
  "model": "bge-large",
  "input": "Your text to embed"
}
```

### Response Format
```json
{
  "object": "list",
  "data": [
    {
      "object": "embedding",
      "index": 0,
      "embedding": [0.0123, -0.0456]
    }
  ],
  "model": "bge-large",
  "usage": {
    "prompt_tokens": 3,
    "total_tokens": 3
  }
}
```

### Available Models
- `bge-large` - BGE Large (1024-dim)
- `bge-base` - BGE Base (768-dim)
- `bge-small` - BGE Small (384-dim)
- `bge-m3` - BGE M3 (multilingual)
- `qwen3-embedding` - Qwen 3 Embedding
- `plamo-embedding` - PLaMo Embedding 1B (Japanese)
- `embedding-gemma` - EmbeddingGemma 300M

## Text-to-Image

### Request Format
```json
{
  "model": "flux-2-dev",
  "task": "text-to-image",
  "prompt": "A beautiful sunset over mountains",
  "num_steps": 20,
  "guidance": 7.5
}
```

### Available Models
- `flux-2-dev` - FLUX.2 [dev]
- `flux-2-klein-9b` - FLUX.2 [klein] 9B
- `flux-2-klein-4b` - FLUX.2 [klein] 4B
- `flux-1-schnell` - FLUX.1 [schnell]
- `phoenix` - Leonardo Phoenix 1.0
- `lucid-origin` - Leonardo Lucid Origin
- `stable-diffusion-xl` - Stable Diffusion XL

## Speech Recognition

### Request Format
```json
{
  "model": "whisper",
  "task": "automatic-speech-recognition",
  "audio": "base64_encoded_audio_data"
}
```

### Available Models
- `whisper` - OpenAI Whisper
- `whisper-turbo` - Whisper Large v3 Turbo
- `nova-3` - Deepgram Nova 3
- `flux` - Deepgram Flux (conversational, voice agents)

## Text-to-Speech

### Request Format
```json
{
  "model": "aura-2-en",
  "task": "text-to-speech",
  "input_text": "Hello, how are you today?",
  "voice": "alloy"
}
```

### Available Models
- `aura-2-en` - Deepgram Aura 2 (English)
- `aura-2-es` - Deepgram Aura 2 (Spanish)
- `aura-1` - Deepgram Aura 1
- `melotts` - MeloTTS

## Examples

### Chat Completions
```javascript
const response = await fetch(`${process.env.WORKER_BASE_URL}/v1/chat/completions`, {
  method: 'POST',
  headers: {
    'Authorization': `Bearer ${process.env.LLM_API_KEY}`,
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    model: 'llama-3.3-70b',
    messages: [
      { role: 'user', content: 'What is AI?' }
    ],
    max_tokens: 100
  })
});
```

### Embeddings
```javascript
const response = await fetch(`${process.env.WORKER_BASE_URL}/v1/embeddings`, {
  method: 'POST',
  headers: {
    'Authorization': `Bearer ${process.env.LLM_API_KEY}`,
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    model: 'bge-large',
    input: 'Hello world'
  })
});
```

### Legacy Root Endpoint
```javascript
const response = await fetch(process.env.WORKER_BASE_URL, {
  method: 'POST',
  headers: {
    'Authorization': `Bearer ${process.env.LLM_API_KEY}`,
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    model: 'llama-3.3-70b',
    task: 'text-generation',
    messages: [
      { role: 'user', content: 'What is AI?' }
    ]
  })
});
```

### Text-to-Image
```javascript
const response = await fetch(process.env.WORKER_BASE_URL, {
  method: 'POST',
  headers: {
    'Authorization': `Bearer ${process.env.LLM_API_KEY}`,
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    model: 'flux-2-dev',
    task: 'text-to-image',
    prompt: 'A futuristic city at sunset'
  })
});
```

## Response Format
```json
{
  "id": "chatcmpl_123",
  "object": "chat.completion",
  "created": 1710000000,
  "model": "llama-3.3-70b",
  "choices": [
    {
      "index": 0,
      "message": {
        "role": "assistant",
        "content": "AI response text here..."
      },
      "finish_reason": "stop"
    }
  ],
  "usage": {
    "prompt_tokens": 0,
    "completion_tokens": 19,
    "total_tokens": 67
  }
}
```

## Complete Model Documentation

For detailed schemas, parameters, and examples for all available Cloudflare AI models, see:
**[CLOUDFLARE_AI_MODELS.md](./CLOUDFLARE_AI_MODELS.md)**

This comprehensive guide includes:
- Input/output schemas for all 75+ models
- Complete parameter documentation
- Ready-to-use code examples
- Models organized by task type (Text Generation, Image Generation, etc.)

## Model Information Endpoints

### List All Models
```
GET ${WORKER_BASE_URL}/models
```

Returns all available models organized by task type.

### List OpenAI-Compatible Models
```
GET ${WORKER_BASE_URL}/v1/models
```

Returns models in OpenAI's `object: "list"` format.

### Get Model Schema
```
GET ${WORKER_BASE_URL}/models/{model_name}
```

Returns the input schema and parameters for a specific model.

**Example:**
```javascript
// Get schema for llama-3.3-70b
const response = await fetch(`${process.env.WORKER_BASE_URL}/models/llama-3.3-70b`);
const schema = await response.json();
console.log(schema);
```

### Cloudflare AI Direct Endpoints

### List All Cloudflare Models
```
GET ${WORKER_BASE_URL}/cf/models
```

Returns all models directly from Cloudflare AI platform with full metadata.

### Get Cloudflare Model Schema
```
GET ${WORKER_BASE_URL}/cf/schema?model={cloudflare_model_id}
```

Returns the official schema for a Cloudflare model ID.

**Example:**
```javascript
// Get all CF models
const cfModels = await fetch(`${process.env.WORKER_BASE_URL}/cf/models`);

// Get schema for specific CF model
const cfSchema = await fetch(`${process.env.WORKER_BASE_URL}/cf/schema?model=@cf/meta/llama-3.3-70b-instruct-fp8-fast`);
```

## Deployment
```bash
# authenticate Wrangler first
wrangler login

# set the API key your clients must send
wrangler secret put LLM_API_KEY

# Deploy after authenticating Wrangler
wrangler deploy
```

## GitHub Deploy
This repo includes a GitHub Actions workflow at [.github/workflows/deploy.yml](/Users/dhonampemba/Development/llm-gateway/.github/workflows/deploy.yml) that deploys on pushes to `main` or manual runs.

Required GitHub repository secrets:
- `CLOUDFLARE_API_TOKEN`
- `CLOUDFLARE_ACCOUNT_ID`
- `LLM_API_KEY`

What the workflow does:
- installs dependencies
- writes `LLM_API_KEY` to the Worker with `wrangler secret put`
- runs `wrangler deploy`

If you want GitHub to be the only deployment path, you can skip local `wrangler login` and deploy directly from the workflow.

## Publishing As A Template
Use your own values for deployment and secrets. Do not commit `.env`, `.dev.vars`, or bearer tokens.

For GitHub-based deploys, define secrets in Cloudflare or GitHub Actions rather than hardcoding them in the repo.


## Error Responses
- `401` - Invalid or missing API key
- `400` - Invalid model or request format
- `405` - Method not allowed (use POST)
- `500` - Server error
