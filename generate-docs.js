const fs = require('fs');

const schemas = JSON.parse(fs.readFileSync('model-schemas.json', 'utf8'));

function generateMarkdown() {
  let markdown = `# Cloudflare AI Models - Complete API Documentation

## Overview
This document contains the complete API schemas and examples for all available Cloudflare AI models.

## Authentication
\`\`\`
Authorization: Bearer YOUR_API_TOKEN
\`\`\`

## Base URL
\`\`\`
https://api.cloudflare.com/client/v4/accounts/{account_id}/ai/run/{model_name}
\`\`\`

---

`;

  const modelsByTask = {};
  
  // Group models by task type
  Object.keys(schemas).forEach(modelName => {
    const schema = schemas[modelName];
    const taskType = getTaskType(modelName, schema);
    
    if (!modelsByTask[taskType]) {
      modelsByTask[taskType] = [];
    }
    modelsByTask[taskType].push(modelName);
  });

  // Generate documentation for each task type
  Object.keys(modelsByTask).sort().forEach(taskType => {
    markdown += `## ${taskType}\n\n`;
    
    modelsByTask[taskType].forEach(modelName => {
      const schema = schemas[modelName];
      markdown += generateModelDoc(modelName, schema);
    });
  });

  return markdown;
}

function getTaskType(modelName, schema) {
  if (modelName.includes('whisper') || modelName.includes('nova') || modelName.includes('flux') && modelName.includes('deepgram')) {
    return 'Speech Recognition';
  }
  if (modelName.includes('aura') || modelName.includes('melotts')) {
    return 'Text-to-Speech';
  }
  if (modelName.includes('flux') || modelName.includes('stable-diffusion') || modelName.includes('phoenix') || modelName.includes('lucid')) {
    return 'Text-to-Image';
  }
  if (modelName.includes('bge') || modelName.includes('embedding')) {
    return 'Text Embeddings';
  }
  if (modelName.includes('resnet')) {
    return 'Image Classification';
  }
  if (modelName.includes('llava') || modelName.includes('uform')) {
    return 'Image-to-Text';
  }
  if (modelName.includes('bart')) {
    return 'Summarization';
  }
  if (modelName.includes('m2m100') || modelName.includes('indictrans')) {
    return 'Translation';
  }
  if (modelName.includes('distilbert') || modelName.includes('reranker')) {
    return 'Text Classification';
  }
  return 'Text Generation';
}

function generateModelDoc(modelName, schema) {
  let doc = `### ${modelName}\n\n`;
  
  // Input schema
  if (schema.input) {
    doc += `**Input Schema:**\n\`\`\`json\n${JSON.stringify(schema.input, null, 2)}\n\`\`\`\n\n`;
    
    // Generate example
    const example = generateExample(modelName, schema.input);
    if (example) {
      doc += `**Example Request:**\n\`\`\`javascript\n${example}\n\`\`\`\n\n`;
    }
  }
  
  // Output schema
  if (schema.output) {
    doc += `**Output Schema:**\n\`\`\`json\n${JSON.stringify(schema.output, null, 2)}\n\`\`\`\n\n`;
  }
  
  doc += '---\n\n';
  return doc;
}

function generateExample(modelName, inputSchema) {
  const accountId = "{account_id}";
  const apiToken = "YOUR_API_TOKEN";
  
  let exampleInput = {};
  
  // Generate example input based on schema
  if (inputSchema.properties) {
    Object.keys(inputSchema.properties).forEach(key => {
      const prop = inputSchema.properties[key];
      exampleInput[key] = generateExampleValue(key, prop);
    });
  } else if (inputSchema.oneOf) {
    // Use the first option for oneOf schemas
    const firstOption = inputSchema.oneOf[0];
    if (firstOption.properties) {
      Object.keys(firstOption.properties).forEach(key => {
        const prop = firstOption.properties[key];
        if (firstOption.required && firstOption.required.includes(key)) {
          exampleInput[key] = generateExampleValue(key, prop);
        }
      });
    }
  }
  
  return `const response = await fetch(
  'https://api.cloudflare.com/client/v4/accounts/${accountId}/ai/run/${modelName}',
  {
    method: 'POST',
    headers: {
      'Authorization': 'Bearer ${apiToken}',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(${JSON.stringify(exampleInput, null, 6)})
  }
);

const result = await response.json();
console.log(result);`;
}

function generateExampleValue(key, prop) {
  if (prop.default !== undefined) {
    return prop.default;
  }
  
  switch (prop.type) {
    case 'string':
      if (key === 'prompt') return "Hello, how are you?";
      if (key === 'text') return "Sample text to process";
      if (key === 'input_text') return "Hello world";
      if (key === 'voice') return "alloy";
      return "example";
    case 'integer':
      return prop.default || 256;
    case 'number':
      return prop.default || 0.7;
    case 'boolean':
      return prop.default || false;
    case 'array':
      if (key === 'messages') {
        return [{"role": "user", "content": "Hello!"}];
      }
      return [];
    case 'object':
      return {};
    default:
      return null;
  }
}

const markdown = generateMarkdown();
fs.writeFileSync('CLOUDFLARE_AI_MODELS.md', markdown);
console.log('Documentation generated: CLOUDFLARE_AI_MODELS.md');
