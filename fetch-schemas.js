const fs = require('fs');

const accountId = process.env.CLOUDFLARE_ACCOUNT_ID;
const apiToken = process.env.CLOUDFLARE_API_TOKEN;

const models = [
  "@cf/pipecat-ai/smart-turn-v2",
  "@cf/zai-org/glm-4.7-flash",
  "@cf/openai/gpt-oss-120b",
  "@cf/qwen/qwen1.5-0.5b-chat",
  "@cf/baai/bge-m3",
  "@cf/huggingface/distilbert-sst-2-int8",
  "@cf/google/gemma-2b-it-lora",
  "@cf/nexusflow/starling-lm-7b-beta",
  "@cf/black-forest-labs/flux-2-klein-9b",
  "@cf/meta/llama-3-8b-instruct",
  "@cf/meta/llama-3.2-3b-instruct",
  "@cf/thebloke/neural-chat-7b-v3-1-awq",
  "@cf/meta/llama-guard-3-8b",
  "@cf/qwen/qwen3-embedding-0.6b",
  "@cf/meta/llama-2-7b-chat-fp16",
  "@cf/mistral/mistral-7b-instruct-v0.1",
  "@cf/myshell-ai/melotts",
  "@cf/mistral/mistral-7b-instruct-v0.2-lora",
  "@cf/deepgram/aura-2-es",
  "@cf/openai/whisper",
  "@cf/tinyllama/tinyllama-1.1b-chat-v1.0",
  "@cf/pfnet/plamo-embedding-1b",
  "@cf/mistral/mistral-7b-instruct-v0.2",
  "@cf/fblgit/una-cybertron-7b-v2-bf16",
  "@cf/llava-hf/llava-1.5-7b-hf",
  "@cf/deepseek-ai/deepseek-r1-distill-qwen-32b",
  "@cf/runwayml/stable-diffusion-v1-5-inpainting",
  "@cf/deepgram/flux",
  "@cf/deepgram/nova-3",
  "@cf/black-forest-labs/flux-1-schnell",
  "@cf/thebloke/discolm-german-7b-v1-awq",
  "@cf/meta/llama-2-7b-chat-int8",
  "@cf/meta/llama-3.1-8b-instruct-fp8",
  "@cf/thebloke/mistral-7b-instruct-v0.1-awq",
  "@cf/qwen/qwen1.5-7b-chat-awq",
  "@cf/meta/llama-3.2-1b-instruct",
  "@cf/thebloke/llama-2-13b-chat-awq",
  "@cf/microsoft/resnet-50",
  "@cf/bytedance/stable-diffusion-xl-lightning",
  "@cf/thebloke/deepseek-coder-6.7b-base-awq",
  "@cf/meta-llama/llama-2-7b-chat-hf-lora",
  "@cf/meta/llama-3.3-70b-instruct-fp8-fast",
  "@cf/ibm-granite/granite-4.0-h-micro",
  "@cf/lykon/dreamshaper-8-lcm",
  "@cf/leonardo/phoenix-1.0",
  "@cf/stabilityai/stable-diffusion-xl-base-1.0",
  "@cf/thebloke/openhermes-2.5-mistral-7b-awq",
  "@cf/meta/m2m100-1.2b",
  "@cf/ai4bharat/indictrans2-en-indic-1B",
  "@cf/thebloke/deepseek-coder-6.7b-instruct-awq",
  "@cf/black-forest-labs/flux-2-klein-4b",
  "@cf/baai/bge-small-en-v1.5",
  "@cf/qwen/qwen2.5-coder-32b-instruct",
  "@cf/deepseek-ai/deepseek-math-7b-instruct",
  "@cf/tiiuae/falcon-7b-instruct",
  "@cf/nousresearch/hermes-2-pro-mistral-7b",
  "@cf/baai/bge-base-en-v1.5",
  "@cf/aisingapore/gemma-sea-lion-v4-27b-it",
  "@cf/qwen/qwen3-30b-a3b-fp8",
  "@cf/meta/llama-3.1-8b-instruct-awq",
  "@cf/unum/uform-gen2-qwen-500m",
  "@cf/black-forest-labs/flux-2-dev",
  "@cf/thebloke/zephyr-7b-beta-awq",
  "@cf/google/gemma-7b-it-lora",
  "@cf/qwen/qwen1.5-1.8b-chat",
  "@cf/mistralai/mistral-small-3.1-24b-instruct",
  "@cf/meta/llama-3-8b-instruct-awq",
  "@cf/meta/llama-3.2-11b-vision-instruct",
  "@cf/openai/whisper-tiny-en",
  "@cf/openai/whisper-large-v3-turbo",
  "@cf/deepgram/aura-1",
  "@cf/defog/sqlcoder-7b-2",
  "@cf/microsoft/phi-2",
  "@cf/facebook/bart-large-cnn",
  "@cf/runwayml/stable-diffusion-v1-5-img2img",
  "@cf/openai/gpt-oss-20b",
  "@cf/google/embeddinggemma-300m",
  "@cf/baai/bge-reranker-base",
  "@cf/google/gemma-7b-it",
  "@cf/leonardo/lucid-origin",
  "@cf/qwen/qwen1.5-14b-chat-awq",
  "@cf/openchat/openchat-3.5-0106",
  "@cf/meta/llama-4-scout-17b-16e-instruct",
  "@cf/google/gemma-3-12b-it",
  "@cf/qwen/qwq-32b",
  "@cf/baai/bge-large-en-v1.5",
  "@cf/deepgram/aura-2-en"
];

async function fetchAllSchemas() {
  if (!accountId || !apiToken) {
    throw new Error('Set CLOUDFLARE_ACCOUNT_ID and CLOUDFLARE_API_TOKEN before running this script.');
  }

  const results = {};

  for (let i = 0; i < models.length; i++) {
    const model = models[i];
    console.log(`Fetching ${i + 1}/${models.length}: ${model}`);

    try {
      const response = await fetch(
        `https://api.cloudflare.com/client/v4/accounts/${accountId}/ai/models/schema?model=${model}`,
        {
          headers: {
            'Authorization': `Bearer ${apiToken}`
          }
        }
      );

      const data = await response.json();
      if (data.success) {
        results[model] = data.result;
      } else {
        console.error(`Failed to fetch ${model}:`, data.errors);
      }
    } catch (error) {
      console.error(`Error fetching ${model}:`, error.message);
    }

    // Small delay to avoid rate limiting
    await new Promise(resolve => setTimeout(resolve, 100));
  }

  return results;
}

fetchAllSchemas().then(schemas => {
  fs.writeFileSync('model-schemas.json', JSON.stringify(schemas, null, 2));
  console.log('Schemas saved to model-schemas.json');
});
