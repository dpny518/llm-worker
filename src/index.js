const JSON_HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Content-Type': 'application/json',
};

export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    if (request.method === 'OPTIONS') {
      return new Response(null, {
        status: 200,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type, Authorization',
        },
      });
    }

    const apiKey = request.headers.get('Authorization')?.replace('Bearer ', '');
    if (!apiKey || apiKey !== env.LLM_API_KEY) {
      return jsonResponse({ error: 'Unauthorized' }, 401);
    }

    if (request.method === 'GET') {
      return handleGet(url);
    }

    if (request.method !== 'POST') {
      return new Response('Method not allowed', {
        status: 405,
        headers: {
          'Access-Control-Allow-Origin': '*',
        },
      });
    }

    let body;
    try {
      body = await request.json();
    } catch {
      return jsonResponse({ error: 'Invalid JSON body' }, 400);
    }

    try {
      if (url.pathname === '/v1/chat/completions') {
        return await handleOpenAIChatCompletions(body, env);
      }

      if (url.pathname === '/v1/embeddings') {
        return await handleOpenAIEmbeddings(body, env);
      }

      return await handleLegacyPost(body, env);
    } catch (error) {
      console.error(`Error processing request for ${url.pathname}:`, error);
      return jsonResponse({ error: error.message || 'Internal server error' }, 500);
    }
  }
};

async function handleGet(url) {
  if (url.pathname === '/models') {
    return jsonResponse(getModelList());
  }

  if (url.pathname.startsWith('/models/')) {
    const modelName = url.pathname.split('/')[2];
    const schema = getModelSchema(modelName);
    if (schema) {
      return jsonResponse(schema);
    }
    return jsonResponse({ error: 'Model not found' }, 404);
  }

  if (url.pathname === '/cf/models') {
    return jsonResponse(getDetailedModelList());
  }

  if (url.pathname === '/cf/schema') {
    const modelName = url.searchParams.get('model');
    if (!modelName) {
      return jsonResponse({ error: 'Model parameter required' }, 400);
    }
    const schema = getDetailedModelSchema(modelName);
    if (schema) {
      return jsonResponse(schema);
    }
    return jsonResponse({ error: 'Model not found' }, 404);
  }

  if (url.pathname === '/v1/models') {
    return jsonResponse(formatOpenAIModels());
  }

  return jsonResponse({ error: 'Not found' }, 404);
}

async function handleLegacyPost(body, env) {
  const { model, task = 'text-generation' } = body;
  const modelConfig = getModelConfig(model);

  if (!modelConfig) {
    return jsonResponse({ error: `Invalid model: ${model}` }, 400);
  }

  const response = await runModel(task, body, modelConfig, env);
  return formatLegacyResponse(task, model, modelConfig, response);
}

async function handleOpenAIChatCompletions(body, env) {
  if (!body?.model) {
    return openAIError('The `model` field is required.', 400, 'invalid_request_error');
  }

  if (!Array.isArray(body.messages) || body.messages.length === 0) {
    return openAIError('The `messages` field must be a non-empty array.', 400, 'invalid_request_error');
  }

  if (body.stream) {
    return openAIError('Streaming is not implemented on this gateway.', 400, 'invalid_request_error');
  }

  const modelConfig = getModelConfig(body.model);
  if (!modelConfig) {
    return openAIError(`Unknown model '${body.model}'.`, 400, 'invalid_request_error', 'model');
  }

  if (modelConfig.type !== 'text-generation' && modelConfig.type !== 'unknown') {
    return openAIError(`Model '${body.model}' does not support chat completions.`, 400, 'invalid_request_error', 'model');
  }

  const response = await runModel('text-generation', body, modelConfig, env);
  return jsonResponse(formatOpenAIChatCompletion(body.model, response));
}

async function handleOpenAIEmbeddings(body, env) {
  if (!body?.model) {
    return openAIError('The `model` field is required.', 400, 'invalid_request_error');
  }

  if (body.input === undefined) {
    return openAIError('The `input` field is required.', 400, 'invalid_request_error');
  }

  const modelConfig = getModelConfig(body.model);
  if (!modelConfig) {
    return openAIError(`Unknown model '${body.model}'.`, 400, 'invalid_request_error', 'model');
  }

  if (modelConfig.type !== 'text-embeddings' && modelConfig.type !== 'unknown') {
    return openAIError(`Model '${body.model}' does not support embeddings.`, 400, 'invalid_request_error', 'model');
  }

  const legacyBody = {
    ...body,
    task: 'text-embeddings',
    text: body.input,
  };
  const response = await runModel('text-embeddings', legacyBody, modelConfig, env);
  return jsonResponse(formatOpenAIEmbeddings(body.model, response, body.input));
}

async function runModel(task, body, modelConfig, env) {
  const payload = buildPayload(task, body, modelConfig);
  console.log(`Processing ${task} request for model: ${body.model} (${modelConfig.id})`);

  const isDeepgramTTS = modelConfig.id.includes('deepgram/aura');
  const isNova3ASR = modelConfig.id.includes('deepgram/nova-3');
  const options = (isDeepgramTTS || isNova3ASR) ? { returnRawResponse: true } : undefined;

  const response = await env.AI.run(modelConfig.id, payload, options);
  console.log(`Successfully processed ${task} for ${body.model}`);
  console.log(`Response type: ${typeof response}, constructor: ${response?.constructor?.name}`);

  return response;
}

function formatLegacyResponse(task, model, modelConfig, response) {
  if (task === 'text-to-speech') {
    const audioData = extractAudioBuffer(response);
    if (audioData) {
      const base64Audio = btoa(String.fromCharCode(...new Uint8Array(audioData)));
      return jsonResponse({
        audio: base64Audio,
        _debug: buildDebug(model, modelConfig, task),
      });
    }
  }

  if (task === 'automatic-speech-recognition' && modelConfig.id.includes('deepgram/nova-3')) {
    return jsonResponse({
      text: extractNovaTranscript(response),
      _raw: response,
      _debug: buildDebug(model, modelConfig, task),
    });
  }

  if (response && typeof response === 'object' && !Array.isArray(response)) {
    response._debug = buildDebug(model, modelConfig, task);
  }

  return jsonResponse(response);
}

function buildDebug(model, modelConfig, task) {
  return {
    provider: 'cloudflare-workers-ai-demo',
    model,
    modelId: modelConfig.id,
    task,
    timestamp: new Date().toISOString(),
  };
}

function extractAudioBuffer(response) {
  if (response instanceof ArrayBuffer) {
    return response;
  }

  if (response instanceof Uint8Array) {
    return response.buffer.slice(response.byteOffset, response.byteOffset + response.byteLength);
  }

  if (response && typeof response === 'object') {
    if (response.audio instanceof Uint8Array) {
      return response.audio.buffer.slice(response.audio.byteOffset, response.audio.byteOffset + response.audio.byteLength);
    }
    if (response.audio instanceof ArrayBuffer) {
      return response.audio;
    }
  }

  return null;
}

function extractNovaTranscript(response) {
  if (!response?.results?.channels?.length) {
    return '';
  }

  const channel = response.results.channels[0];
  if (!channel?.alternatives?.length) {
    return '';
  }

  return channel.alternatives[0].transcript || '';
}

function formatOpenAIChatCompletion(model, response) {
  const content = extractTextResponse(response);
  const usage = extractUsage(response, content);

  return {
    id: `chatcmpl_${crypto.randomUUID()}`,
    object: 'chat.completion',
    created: Math.floor(Date.now() / 1000),
    model,
    choices: [
      {
        index: 0,
        message: {
          role: 'assistant',
          content,
        },
        finish_reason: 'stop',
      },
    ],
    usage,
  };
}

function formatOpenAIEmbeddings(model, response, input) {
  const embeddings = normalizeEmbeddings(response);
  const inputItems = Array.isArray(input) ? input : [input];
  const usage = extractUsage(response, inputItems.join(' '));

  return {
    object: 'list',
    data: embeddings.map((embedding, index) => ({
      object: 'embedding',
      index,
      embedding,
    })),
    model,
    usage: {
      prompt_tokens: usage.prompt_tokens,
      total_tokens: usage.total_tokens,
    },
  };
}

function normalizeEmbeddings(response) {
  if (Array.isArray(response?.data)) {
    if (response.data.length > 0 && Array.isArray(response.data[0])) {
      return response.data;
    }
    if (response.data.length > 0 && typeof response.data[0] === 'number') {
      return [response.data];
    }
  }

  if (Array.isArray(response)) {
    if (response.length > 0 && Array.isArray(response[0])) {
      return response;
    }
    if (response.length > 0 && typeof response[0] === 'number') {
      return [response];
    }
  }

  if (Array.isArray(response?.embeddings)) {
    return response.embeddings;
  }

  return [];
}

function extractTextResponse(response) {
  if (typeof response === 'string') {
    return response;
  }

  if (typeof response?.response === 'string') {
    return response.response;
  }

  if (typeof response?.result?.response === 'string') {
    return response.result.response;
  }

  if (typeof response?.output_text === 'string') {
    return response.output_text;
  }

  if (Array.isArray(response?.choices) && response.choices[0]?.message?.content) {
    return response.choices[0].message.content;
  }

  if (Array.isArray(response?.messages)) {
    return response.messages
      .map((message) => {
        if (typeof message?.content === 'string') {
          return message.content;
        }
        return '';
      })
      .filter(Boolean)
      .join('\n');
  }

  return '';
}

function extractUsage(response, fallbackText = '') {
  if (response?.usage && typeof response.usage === 'object') {
    return {
      prompt_tokens: response.usage.prompt_tokens || 0,
      completion_tokens: response.usage.completion_tokens || 0,
      total_tokens: response.usage.total_tokens || ((response.usage.prompt_tokens || 0) + (response.usage.completion_tokens || 0)),
    };
  }

  const promptTokens = 0;
  const completionTokens = estimateTokens(fallbackText);
  return {
    prompt_tokens: promptTokens,
    completion_tokens: completionTokens,
    total_tokens: promptTokens + completionTokens,
  };
}

function estimateTokens(text) {
  if (!text || typeof text !== 'string') {
    return 0;
  }

  return Math.max(1, Math.ceil(text.length / 4));
}

function formatOpenAIModels() {
  const modelGroups = getDetailedModelList();
  const models = [
    ...modelGroups['text-generation'],
    ...modelGroups['text-embeddings'],
  ];

  return {
    object: 'list',
    data: models.map((model) => ({
      id: model.name,
      object: 'model',
      created: 0,
      owned_by: 'cloudflare-workers-ai',
    })),
  };
}

function jsonResponse(body, status = 200) {
  return Response.json(body, {
    status,
    headers: JSON_HEADERS,
  });
}

function openAIError(message, status = 400, type = 'invalid_request_error', param = null) {
  return jsonResponse({
    error: {
      message,
      type,
      param,
      code: null,
    },
  }, status);
}

function getModelConfig(model) {
  const models = {
    'llama-3.3-70b': { id: '@cf/meta/llama-3.3-70b-instruct-fp8-fast', type: 'text-generation', inputType: 'messages' },
    'llama-4-scout': { id: '@cf/meta/llama-4-scout-17b-16e-instruct', type: 'text-generation', inputType: 'messages' },
    'llama-3.2-3b': { id: '@cf/meta/llama-3.2-3b-instruct', type: 'text-generation', inputType: 'messages' },
    'llama-3.2-1b': { id: '@cf/meta/llama-3.2-1b-instruct', type: 'text-generation', inputType: 'messages' },
    'llama-3.2-11b-vision': { id: '@cf/meta/llama-3.2-11b-vision-instruct', type: 'text-generation', inputType: 'messages' },
    'llama-3-8b': { id: '@cf/meta/llama-3-8b-instruct', type: 'text-generation', inputType: 'messages' },
    'llama-3.1-8b': { id: '@cf/meta/llama-3.1-8b-instruct-fp8', type: 'text-generation', inputType: 'messages' },
    'llama-3.1-8b-awq': { id: '@cf/meta/llama-3.1-8b-instruct-awq', type: 'text-generation', inputType: 'messages' },
    'llama-3-8b-awq': { id: '@cf/meta/llama-3-8b-instruct-awq', type: 'text-generation', inputType: 'messages' },
    'llama-2-7b': { id: '@cf/meta/llama-2-7b-chat-fp16', type: 'text-generation', inputType: 'messages' },
    'llama-2-7b-int8': { id: '@cf/meta/llama-2-7b-chat-int8', type: 'text-generation', inputType: 'messages' },
    'llama-guard-3': { id: '@cf/meta/llama-guard-3-8b', type: 'text-generation', inputType: 'messages' },
    'gpt-oss-120b': { id: '@cf/openai/gpt-oss-120b', type: 'text-generation', inputType: 'input' },
    'gpt-oss-20b': { id: '@cf/openai/gpt-oss-20b', type: 'text-generation', inputType: 'input' },
    'qwen3-30b': { id: '@cf/qwen/qwen3-30b-a3b-fp8', type: 'text-generation', inputType: 'messages' },
    'qwq-32b': { id: '@cf/qwen/qwq-32b', type: 'text-generation', inputType: 'messages' },
    'qwen2.5-coder': { id: '@cf/qwen/qwen2.5-coder-32b-instruct', type: 'text-generation', inputType: 'messages' },
    'mistral-7b': { id: '@cf/mistral/mistral-7b-instruct-v0.1', type: 'text-generation', inputType: 'messages' },
    'mistral-small': { id: '@cf/mistralai/mistral-small-3.1-24b-instruct', type: 'text-generation', inputType: 'messages' },
    'deepseek-r1': { id: '@cf/deepseek-ai/deepseek-r1-distill-qwen-32b', type: 'text-generation', inputType: 'messages' },
    'kimi-k2.7-code': { id: '@cf/moonshotai/kimi-k2.7-code', type: 'text-generation', inputType: 'messages' },
    'kimi-k2.6': { id: '@cf/moonshotai/kimi-k2.6', type: 'text-generation', inputType: 'messages' },
    'nemotron-3': { id: '@cf/nvidia/nemotron-3-120b-a12b', type: 'text-generation', inputType: 'messages' },
    'gemma-3': { id: '@cf/google/gemma-3-12b-it', type: 'text-generation', inputType: 'messages' },
    'gemma-4': { id: '@cf/google/gemma-4-26b-a4b-it', type: 'text-generation', inputType: 'messages' },
    'granite-4': { id: '@cf/ibm-granite/granite-4.0-h-micro', type: 'text-generation', inputType: 'messages' },
    'glm-4.7-flash': { id: '@cf/zai-org/glm-4.7-flash', type: 'text-generation', inputType: 'messages' },
    'glm-5.2': { id: '@cf/zai-org/glm-5.2', type: 'text-generation', inputType: 'messages' },
    'bge-large': { id: '@cf/baai/bge-large-en-v1.5', type: 'text-embeddings', inputType: 'text' },
    'bge-base': { id: '@cf/baai/bge-base-en-v1.5', type: 'text-embeddings', inputType: 'text' },
    'bge-small': { id: '@cf/baai/bge-small-en-v1.5', type: 'text-embeddings', inputType: 'text' },
    'bge-m3': { id: '@cf/baai/bge-m3', type: 'text-embeddings', inputType: 'text' },
    'qwen3-embedding': { id: '@cf/qwen/qwen3-embedding-0.6b', type: 'text-embeddings', inputType: 'text' },
    'embedding-gemma': { id: '@cf/google/embeddinggemma-300m', type: 'text-embeddings', inputType: 'text' },
    'flux-2-dev': { id: '@cf/black-forest-labs/flux-2-dev', type: 'text-to-image', inputType: 'prompt' },
    'flux-2-klein-9b': { id: '@cf/black-forest-labs/flux-2-klein-9b', type: 'text-to-image', inputType: 'prompt' },
    'flux-2-klein-4b': { id: '@cf/black-forest-labs/flux-2-klein-4b', type: 'text-to-image', inputType: 'prompt' },
    'flux-1-schnell': { id: '@cf/black-forest-labs/flux-1-schnell', type: 'text-to-image', inputType: 'prompt' },
    'phoenix': { id: '@cf/leonardo/phoenix-1.0', type: 'text-to-image', inputType: 'prompt' },
    'lucid-origin': { id: '@cf/leonardo/lucid-origin', type: 'text-to-image', inputType: 'prompt' },
    'stable-diffusion-xl': { id: '@cf/stabilityai/stable-diffusion-xl-base-1.0', type: 'text-to-image', inputType: 'prompt' },
    'whisper': { id: '@cf/openai/whisper', type: 'automatic-speech-recognition', inputType: 'audio' },
    'whisper-turbo': { id: '@cf/openai/whisper-large-v3-turbo', type: 'automatic-speech-recognition', inputType: 'audio' },
    'nova-3': { id: '@cf/deepgram/nova-3', type: 'automatic-speech-recognition', inputType: 'audio' },
    'aura-2-en': { id: '@cf/deepgram/aura-2-en', type: 'text-to-speech', inputType: 'input_text' },
    'aura-2-es': { id: '@cf/deepgram/aura-2-es', type: 'text-to-speech', inputType: 'input_text' },
    'aura-1': { id: '@cf/deepgram/aura-1', type: 'text-to-speech', inputType: 'input_text' },
    'melotts': { id: '@cf/myshell-ai/melotts', type: 'text-to-speech', inputType: 'input_text' },
  };

  return models[model] || (model?.startsWith('@cf/') ? { id: model, type: 'unknown', inputType: 'auto' } : null);
}

function buildPayload(task, body, modelConfig) {
  const { model: _, task: __, ...params } = body;

  switch (task) {
    case 'text-generation':
      if (modelConfig.inputType === 'input') {
        let inputValue;

        if (params.input) {
          inputValue = params.input;
        } else if (params.messages && Array.isArray(params.messages)) {
          const normalizedMessages = normalizeMessages(params.messages);
          if (params.messages.length === 1 && params.messages[0].role === 'user') {
            inputValue = normalizedMessages[0].content;
          } else {
            inputValue = normalizedMessages.map((msg) => ({
              role: msg.role,
              content: msg.content,
            }));
          }
        } else {
          inputValue = '';
        }

        const payload = {
          input: inputValue,
          max_tokens: params.max_tokens || 512,
        };

        if (params.instructions) payload.instructions = params.instructions;
        if (params.reasoning) payload.reasoning = params.reasoning;
        if (params.temperature !== undefined) payload.temperature = params.temperature;
        if (params.top_p !== undefined) payload.top_p = params.top_p;
        if (params.top_k !== undefined) payload.top_k = params.top_k;
        if (params.frequency_penalty !== undefined) payload.frequency_penalty = params.frequency_penalty;
        if (params.presence_penalty !== undefined) payload.presence_penalty = params.presence_penalty;
        if (params.stream !== undefined) payload.stream = params.stream;

        return payload;
      }

      return {
        ...params,
        messages: normalizeMessages(params.messages || []),
        max_tokens: params.max_tokens || 512,
      };

    case 'text-embeddings':
      return {
        text: params.text || params.texts || params.input,
      };

    case 'text-to-image': {
      const isFlux2 = modelConfig.id.includes('flux-2');

      if (isFlux2) {
        const formData = new FormData();
        formData.append('prompt', params.prompt);

        if (params.num_steps !== undefined) formData.append('num_steps', String(params.num_steps));
        if (params.guidance !== undefined) formData.append('guidance', String(params.guidance));
        if (params.width !== undefined) formData.append('width', String(params.width));
        if (params.height !== undefined) formData.append('height', String(params.height));

        return {
          multipart: {
            body: formData,
            contentType: 'multipart/form-data',
          },
        };
      }

      return {
        prompt: params.prompt,
        num_steps: params.num_steps || 20,
        guidance: params.guidance || 7.5,
        ...params,
      };
    }

    case 'automatic-speech-recognition': {
      const isNova3 = modelConfig.id.includes('deepgram/nova-3');

      if (isNova3) {
        let audioData = params.audio;
        if (typeof audioData === 'string') {
          const binaryString = atob(audioData);
          const bytes = new Uint8Array(binaryString.length);
          for (let i = 0; i < binaryString.length; i++) {
            bytes[i] = binaryString.charCodeAt(i);
          }
          audioData = bytes;
        }

        const stream = new ReadableStream({
          start(controller) {
            controller.enqueue(audioData);
            controller.close();
          }
        });

        return {
          audio: {
            body: stream,
            contentType: params.contentType || 'audio/mpeg',
          },
          ...params,
        };
      }

      return { audio: params.audio, ...params };
    }

    case 'text-to-speech':
      if (modelConfig.id.includes('myshell-ai/melotts')) {
        return {
          prompt: params.input_text,
          lang: params.lang || 'en',
          ...params,
        };
      }

      return {
        text: params.input_text,
        speaker: params.voice || 'luna',
        encoding: 'mp3',
        ...params,
      };

    default:
      return params;
  }
}

function getModelList() {
  return {
    'text-generation': [
      'llama-3.3-70b', 'llama-4-scout', 'llama-3.2-3b', 'llama-3.2-1b', 'llama-3.2-11b-vision',
      'llama-3-8b', 'llama-3.1-8b', 'llama-3.1-8b-awq', 'llama-3-8b-awq', 'llama-2-7b', 'llama-2-7b-int8',
      'llama-guard-3', 'gpt-oss-120b', 'gpt-oss-20b', 'qwen3-30b', 'qwq-32b', 'qwen2.5-coder',
      'mistral-7b', 'mistral-small', 'deepseek-r1', 'gemma-3', 'gemma-4', 'granite-4', 'glm-4.7-flash',
      'glm-5.2', 'kimi-k2.7-code', 'kimi-k2.6', 'nemotron-3'
    ],
    'text-embeddings': ['bge-large', 'bge-base', 'bge-small', 'bge-m3', 'qwen3-embedding', 'plamo-embedding', 'embedding-gemma'],
    'text-to-image': ['flux-2-dev', 'flux-2-klein-9b', 'flux-2-klein-4b', 'flux-1-schnell', 'phoenix', 'lucid-origin', 'stable-diffusion-xl'],
    'automatic-speech-recognition': ['whisper', 'whisper-turbo', 'nova-3', 'flux'],
    'text-to-speech': ['aura-2-en', 'aura-2-es', 'aura-1', 'melotts'],
  };
}

function normalizeMessages(messages) {
  return messages.map((message) => ({
    ...message,
    content: normalizeMessageContent(message.content),
  }));
}

function normalizeMessageContent(content) {
  if (typeof content === 'string') {
    return content;
  }

  if (Array.isArray(content)) {
    return content
      .map((part) => {
        if (typeof part === 'string') {
          return part;
        }
        if (part?.type === 'text' && typeof part.text === 'string') {
          return part.text;
        }
        return '';
      })
      .filter(Boolean)
      .join('\n');
  }

  return '';
}

function getModelSchema(modelName) {
  const config = getModelConfig(modelName);
  if (!config) return null;

  const baseSchemas = {
    'text-generation': {
      required: ['messages'],
      properties: {
        messages: { type: 'array', description: 'Array of message objects with role and content' },
        max_tokens: { type: 'integer', default: 512, description: 'Maximum tokens to generate' },
        temperature: { type: 'number', description: 'Controls randomness (0.0-2.0)' },
        top_p: { type: 'number', description: 'Nucleus sampling parameter' },
        top_k: { type: 'number', description: 'Top-k sampling parameter' },
        frequency_penalty: { type: 'number', description: 'Frequency penalty (-2.0 to 2.0)' },
        presence_penalty: { type: 'number', description: 'Presence penalty (-2.0 to 2.0)' },
        stream: { type: 'boolean', default: false, description: 'Stream response' },
      },
    },
    'text-embeddings': {
      required: ['text'],
      properties: {
        text: { type: ['string', 'array'], description: 'Text or array of texts to embed' },
      },
    },
    'text-to-image': {
      required: ['prompt'],
      properties: {
        prompt: { type: 'string', description: 'Text prompt for image generation' },
        num_steps: { type: 'integer', default: 20, description: 'Number of inference steps' },
        guidance: { type: 'number', default: 7.5, description: 'Guidance scale' },
        width: { type: 'integer', description: 'Image width' },
        height: { type: 'integer', description: 'Image height' },
      },
    },
    'automatic-speech-recognition': {
      required: ['audio'],
      properties: {
        audio: { type: 'string', description: 'Base64 encoded audio data' },
      },
    },
    'text-to-speech': {
      required: ['input_text'],
      properties: {
        input_text: { type: 'string', description: 'Text to convert to speech' },
        voice: { type: 'string', default: 'alloy', description: 'Voice to use' },
      },
    },
  };

  return {
    model: modelName,
    modelId: config.id,
    type: config.type,
    schema: baseSchemas[config.type] || { properties: {} },
  };
}

function getDetailedModelList() {
  return {
    'text-generation': [
      { name: 'llama-3.3-70b', id: '@cf/meta/llama-3.3-70b-instruct-fp8-fast', description: 'Meta Llama 3.3 70B (fp8, fast)', input: 'messages', output: 'text' },
      { name: 'llama-4-scout', id: '@cf/meta/llama-4-scout-17b-16e-instruct', description: 'Meta Llama 4 Scout 17B', input: 'messages', output: 'text' },
      { name: 'llama-3.2-3b', id: '@cf/meta/llama-3.2-3b-instruct', description: 'Llama 3.2 3B', input: 'messages', output: 'text' },
      { name: 'llama-3.2-1b', id: '@cf/meta/llama-3.2-1b-instruct', description: 'Llama 3.2 1B', input: 'messages', output: 'text' },
      { name: 'llama-3.2-11b-vision', id: '@cf/meta/llama-3.2-11b-vision-instruct', description: 'Llama 3.2 11B Vision', input: 'messages', output: 'text' },
      { name: 'qwq-32b', id: '@cf/qwen/qwq-32b', description: 'QwQ 32B (reasoning model)', input: 'messages', output: 'text' },
      { name: 'deepseek-r1', id: '@cf/deepseek-ai/deepseek-r1-distill-qwen-32b', description: 'DeepSeek R1 Distill 32B', input: 'messages', output: 'text' },
      { name: 'glm-4.7-flash', id: '@cf/zai-org/glm-4.7-flash', description: 'GLM-4.7-Flash', input: 'messages', output: 'text' },
      { name: 'glm-5.2', id: '@cf/zai-org/glm-5.2', description: 'GLM-5.2 (agentic coding)', input: 'messages', output: 'text' },
      { name: 'gemma-4', id: '@cf/google/gemma-4-26b-a4b-it', description: 'Gemma 4 (26B MoE)', input: 'messages', output: 'text' },
      { name: 'kimi-k2.7-code', id: '@cf/moonshotai/kimi-k2.7-code', description: 'Kimi K2.7 Code (1T)', input: 'messages', output: 'text' },
      { name: 'kimi-k2.6', id: '@cf/moonshotai/kimi-k2.6', description: 'Kimi K2.6 (1T)', input: 'messages', output: 'text' },
      { name: 'nemotron-3', id: '@cf/nvidia/nemotron-3-120b-a12b', description: 'NVIDIA Nemotron 3 (120B MoE)', input: 'messages', output: 'text' },
    ],
    'text-embeddings': [
      { name: 'bge-large', id: '@cf/baai/bge-large-en-v1.5', description: 'BGE Large (1024-dim)', input: 'text', output: 'embeddings' },
      { name: 'bge-base', id: '@cf/baai/bge-base-en-v1.5', description: 'BGE Base (768-dim)', input: 'text', output: 'embeddings' },
      { name: 'bge-small', id: '@cf/baai/bge-small-en-v1.5', description: 'BGE Small (384-dim)', input: 'text', output: 'embeddings' },
      { name: 'bge-m3', id: '@cf/baai/bge-m3', description: 'BGE M3 (multilingual)', input: 'text', output: 'embeddings' },
      { name: 'qwen3-embedding', id: '@cf/qwen/qwen3-embedding-0.6b', description: 'Qwen 3 Embedding', input: 'text', output: 'embeddings' },
      { name: 'plamo-embedding', id: '@cf/pfnet/plamo-embedding-1b', description: 'PLaMo Embedding (Japanese)', input: 'text', output: 'embeddings' },
      { name: 'embedding-gemma', id: '@cf/google/embeddinggemma-300m', description: 'EmbeddingGemma 300M', input: 'text', output: 'embeddings' },
    ],
    'text-to-image': [
      { name: 'flux-2-dev', id: '@cf/black-forest-labs/flux-2-dev', description: 'FLUX.2 [dev]', input: 'prompt', output: 'image' },
      { name: 'flux-2-klein-9b', id: '@cf/black-forest-labs/flux-2-klein-9b', description: 'FLUX.2 [klein] 9B', input: 'prompt', output: 'image' },
      { name: 'flux-1-schnell', id: '@cf/black-forest-labs/flux-1-schnell', description: 'FLUX.1 [schnell]', input: 'prompt', output: 'image' },
      { name: 'stable-diffusion-xl', id: '@cf/stabilityai/stable-diffusion-xl-base-1.0', description: 'Stable Diffusion XL', input: 'prompt', output: 'image' },
    ],
    'automatic-speech-recognition': [
      { name: 'whisper', id: '@cf/openai/whisper', description: 'OpenAI Whisper', input: 'audio', output: 'text' },
      { name: 'whisper-turbo', id: '@cf/openai/whisper-large-v3-turbo', description: 'Whisper Large v3 Turbo', input: 'audio', output: 'text' },
      { name: 'nova-3', id: '@cf/deepgram/nova-3', description: 'Deepgram Nova 3', input: 'audio', output: 'text' },
      { name: 'flux', id: '@cf/deepgram/flux', description: 'Deepgram Flux (voice agents)', input: 'audio', output: 'text' },
    ],
    'text-to-speech': [
      { name: 'aura-2-en', id: '@cf/deepgram/aura-2-en', description: 'Deepgram Aura 2 (English)', input: 'text', output: 'audio' },
      { name: 'aura-2-es', id: '@cf/deepgram/aura-2-es', description: 'Deepgram Aura 2 (Spanish)', input: 'text', output: 'audio' },
      { name: 'melotts', id: '@cf/myshell-ai/melotts', description: 'MeloTTS', input: 'text', output: 'audio' },
    ],
  };
}

function getDetailedModelSchema(modelId) {
  const allModels = getDetailedModelList();

  for (const [task, models] of Object.entries(allModels)) {
    const model = models.find((item) => item.id === modelId || item.name === modelId);
    if (model) {
      return {
        id: model.id,
        name: model.name,
        description: model.description,
        task,
        input_type: model.input,
        output_type: model.output,
        schema: getModelSchema(model.name)?.schema || {},
      };
    }
  }

  return null;
}
turn null;
}
