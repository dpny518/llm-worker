# Cloudflare AI Models - Complete API Documentation

## Overview
This document contains the complete API schemas and examples for all available Cloudflare AI models.

## Authentication
```
Authorization: Bearer YOUR_API_TOKEN
```

## Base URL
```
https://api.cloudflare.com/client/v4/accounts/{account_id}/ai/run/{model_name}
```

---

## Image Classification

### @cf/microsoft/resnet-50

**Input Schema:**
```json
{
  "oneOf": [
    {
      "type": "string",
      "format": "binary",
      "description": "The image to classify"
    },
    {
      "type": "object",
      "properties": {
        "image": {
          "type": "array",
          "description": "An array of integers that represent the image data constrained to 8-bit unsigned integer values",
          "items": {
            "type": "number",
            "description": "A value between 0 and 255 (unsigned 8bit)"
          }
        }
      },
      "required": [
        "image"
      ]
    }
  ]
}
```

**Example Request:**
```javascript
const response = await fetch(
  'https://api.cloudflare.com/client/v4/accounts/{account_id}/ai/run/@cf/microsoft/resnet-50',
  {
    method: 'POST',
    headers: {
      'Authorization': 'Bearer YOUR_API_TOKEN',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({})
  }
);

const result = await response.json();
console.log(result);
```

**Output Schema:**
```json
{
  "type": "array",
  "contentType": "application/json",
  "items": {
    "type": "object",
    "properties": {
      "score": {
        "type": "number",
        "description": "A confidence value, between 0 and 1, indicating how certain the model is about the predicted label"
      },
      "label": {
        "type": "string",
        "description": "The predicted category or class for the input image based on analysis"
      }
    }
  }
}
```

---

## Image-to-Text

### @cf/llava-hf/llava-1.5-7b-hf

**Input Schema:**
```json
{
  "oneOf": [
    {
      "type": "string",
      "format": "binary",
      "description": "Binary string representing the image contents."
    },
    {
      "type": "object",
      "properties": {
        "image": {
          "oneOf": [
            {
              "type": "array",
              "description": "An array of integers that represent the image data constrained to 8-bit unsigned integer values",
              "items": {
                "type": "number",
                "description": "A value between 0 and 255"
              }
            },
            {
              "type": "string",
              "format": "binary",
              "description": "Binary string representing the image contents."
            }
          ]
        },
        "temperature": {
          "type": "number",
          "description": "Controls the randomness of the output; higher values produce more random results."
        },
        "prompt": {
          "type": "string",
          "description": "The input text prompt for the model to generate a response."
        },
        "raw": {
          "type": "boolean",
          "default": false,
          "description": "If true, a chat template is not applied and you must adhere to the specific model's expected formatting."
        },
        "top_p": {
          "type": "number",
          "description": "Controls the creativity of the AI's responses by adjusting how many possible words it considers. Lower values make outputs more predictable; higher values allow for more varied and creative responses."
        },
        "top_k": {
          "type": "number",
          "description": "Limits the AI to choose from the top 'k' most probable words. Lower values make responses more focused; higher values introduce more variety and potential surprises."
        },
        "seed": {
          "type": "number",
          "description": "Random seed for reproducibility of the generation."
        },
        "repetition_penalty": {
          "type": "number",
          "description": "Penalty for repeated tokens; higher values discourage repetition."
        },
        "frequency_penalty": {
          "type": "number",
          "description": "Decreases the likelihood of the model repeating the same lines verbatim."
        },
        "presence_penalty": {
          "type": "number",
          "description": "Increases the likelihood of the model introducing new topics."
        },
        "max_tokens": {
          "type": "integer",
          "default": 512,
          "description": "The maximum number of tokens to generate in the response."
        }
      },
      "required": [
        "image"
      ]
    }
  ]
}
```

**Example Request:**
```javascript
const response = await fetch(
  'https://api.cloudflare.com/client/v4/accounts/{account_id}/ai/run/@cf/llava-hf/llava-1.5-7b-hf',
  {
    method: 'POST',
    headers: {
      'Authorization': 'Bearer YOUR_API_TOKEN',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({})
  }
);

const result = await response.json();
console.log(result);
```

**Output Schema:**
```json
{
  "type": "object",
  "contentType": "application/json",
  "properties": {
    "description": {
      "type": "string"
    }
  }
}
```

---

### @cf/unum/uform-gen2-qwen-500m

**Input Schema:**
```json
{
  "oneOf": [
    {
      "type": "string",
      "format": "binary",
      "description": "Binary string representing the image contents."
    },
    {
      "type": "object",
      "properties": {
        "prompt": {
          "type": "string",
          "description": "The input text prompt for the model to generate a response."
        },
        "raw": {
          "type": "boolean",
          "default": false,
          "description": "If true, a chat template is not applied and you must adhere to the specific model's expected formatting."
        },
        "top_p": {
          "type": "number",
          "description": "Controls the creativity of the AI's responses by adjusting how many possible words it considers. Lower values make outputs more predictable; higher values allow for more varied and creative responses."
        },
        "top_k": {
          "type": "number",
          "description": "Limits the AI to choose from the top 'k' most probable words. Lower values make responses more focused; higher values introduce more variety and potential surprises."
        },
        "seed": {
          "type": "number",
          "description": "Random seed for reproducibility of the generation."
        },
        "repetition_penalty": {
          "type": "number",
          "description": "Penalty for repeated tokens; higher values discourage repetition."
        },
        "frequency_penalty": {
          "type": "number",
          "description": "Decreases the likelihood of the model repeating the same lines verbatim."
        },
        "presence_penalty": {
          "type": "number",
          "description": "Increases the likelihood of the model introducing new topics."
        },
        "image": {
          "oneOf": [
            {
              "type": "array",
              "description": "An array of integers that represent the image data constrained to 8-bit unsigned integer values",
              "items": {
                "type": "number",
                "description": "A value between 0 and 255"
              }
            },
            {
              "type": "string",
              "format": "binary",
              "description": "Binary string representing the image contents."
            }
          ]
        },
        "max_tokens": {
          "type": "integer",
          "default": 512,
          "description": "The maximum number of tokens to generate in the response."
        }
      },
      "required": [
        "image"
      ]
    }
  ]
}
```

**Example Request:**
```javascript
const response = await fetch(
  'https://api.cloudflare.com/client/v4/accounts/{account_id}/ai/run/@cf/unum/uform-gen2-qwen-500m',
  {
    method: 'POST',
    headers: {
      'Authorization': 'Bearer YOUR_API_TOKEN',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({})
  }
);

const result = await response.json();
console.log(result);
```

**Output Schema:**
```json
{
  "type": "object",
  "contentType": "application/json",
  "properties": {
    "description": {
      "type": "string"
    }
  }
}
```

---

## Speech Recognition

### @cf/openai/whisper

**Input Schema:**
```json
{
  "oneOf": [
    {
      "type": "string",
      "format": "binary"
    },
    {
      "type": "object",
      "properties": {
        "audio": {
          "type": "array",
          "description": "An array of integers that represent the audio data constrained to 8-bit unsigned integer values",
          "items": {
            "type": "number",
            "description": "A value between 0 and 255"
          }
        }
      },
      "required": [
        "audio"
      ]
    }
  ]
}
```

**Example Request:**
```javascript
const response = await fetch(
  'https://api.cloudflare.com/client/v4/accounts/{account_id}/ai/run/@cf/openai/whisper',
  {
    method: 'POST',
    headers: {
      'Authorization': 'Bearer YOUR_API_TOKEN',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({})
  }
);

const result = await response.json();
console.log(result);
```

**Output Schema:**
```json
{
  "type": "object",
  "contentType": "application/json",
  "properties": {
    "text": {
      "type": "string",
      "description": "The transcription"
    },
    "word_count": {
      "type": "number"
    },
    "words": {
      "type": "array",
      "items": {
        "type": "object",
        "properties": {
          "word": {
            "type": "string"
          },
          "start": {
            "type": "number",
            "description": "The second this word begins in the recording"
          },
          "end": {
            "type": "number",
            "description": "The ending second when the word completes"
          }
        }
      }
    },
    "vtt": {
      "type": "string"
    }
  },
  "required": [
    "text"
  ]
}
```

---

### @cf/deepgram/flux

**Input Schema:**
```json
{
  "type": "object",
  "properties": {
    "encoding": {
      "type": "string",
      "description": "Encoding of the audio stream. Currently only supports raw signed little-endian 16-bit PCM.",
      "enum": [
        "linear16"
      ]
    },
    "sample_rate": {
      "type": "string",
      "description": "Sample rate of the audio stream in Hz.",
      "pattern": "^[0-9]+$"
    },
    "eager_eot_threshold": {
      "type": "string",
      "description": "End-of-turn confidence required to fire an eager end-of-turn event. When set, enables EagerEndOfTurn and TurnResumed events. Valid Values 0.3 - 0.9."
    },
    "eot_threshold": {
      "type": "string",
      "description": "End-of-turn confidence required to finish a turn. Valid Values 0.5 - 0.9.",
      "default": "0.7"
    },
    "eot_timeout_ms": {
      "type": "string",
      "description": "A turn will be finished when this much time has passed after speech, regardless of EOT confidence.",
      "default": "5000",
      "pattern": "^[0-9]+$"
    },
    "keyterm": {
      "type": "string",
      "description": "Keyterm prompting can improve recognition of specialized terminology. Pass multiple keyterm query parameters to boost multiple keyterms."
    },
    "mip_opt_out": {
      "type": "string",
      "description": "Opts out requests from the Deepgram Model Improvement Program. Refer to Deepgram Docs for pricing impacts before setting this to true. https://dpgr.am/deepgram-mip",
      "enum": [
        "true",
        "false"
      ],
      "default": "false"
    },
    "tag": {
      "type": "string",
      "description": "Label your requests for the purpose of identification during usage reporting"
    }
  },
  "required": [
    "sample_rate",
    "encoding"
  ]
}
```

**Example Request:**
```javascript
const response = await fetch(
  'https://api.cloudflare.com/client/v4/accounts/{account_id}/ai/run/@cf/deepgram/flux',
  {
    method: 'POST',
    headers: {
      'Authorization': 'Bearer YOUR_API_TOKEN',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      "encoding": "example",
      "sample_rate": "example",
      "eager_eot_threshold": "example",
      "eot_threshold": "0.7",
      "eot_timeout_ms": "5000",
      "keyterm": "example",
      "mip_opt_out": "false",
      "tag": "example"
})
  }
);

const result = await response.json();
console.log(result);
```

**Output Schema:**
```json
{
  "type": "object",
  "description": "Output will be returned as websocket messages.",
  "properties": {
    "request_id": {
      "type": "string",
      "description": "The unique identifier of the request (uuid)"
    },
    "sequence_id": {
      "type": "integer",
      "description": "Starts at 0 and increments for each message the server sends to the client.",
      "minimum": 0
    },
    "event": {
      "type": "string",
      "description": "The type of event being reported.",
      "enum": [
        "Update",
        "StartOfTurn",
        "EagerEndOfTurn",
        "TurnResumed",
        "EndOfTurn"
      ]
    },
    "turn_index": {
      "type": "integer",
      "description": "The index of the current turn",
      "minimum": 0
    },
    "audio_window_start": {
      "type": "number",
      "description": "Start time in seconds of the audio range that was transcribed"
    },
    "audio_window_end": {
      "type": "number",
      "description": "End time in seconds of the audio range that was transcribed"
    },
    "transcript": {
      "type": "string",
      "description": "Text that was said over the course of the current turn"
    },
    "words": {
      "type": "array",
      "description": "The words in the transcript",
      "items": {
        "type": "object",
        "required": [
          "word",
          "confidence"
        ],
        "properties": {
          "word": {
            "type": "string",
            "description": "The individual punctuated, properly-cased word from the transcript"
          },
          "confidence": {
            "type": "number",
            "description": "Confidence that this word was transcribed correctly"
          }
        }
      }
    },
    "end_of_turn_confidence": {
      "type": "number",
      "description": "Confidence that no more speech is coming in this turn"
    }
  }
}
```

---

### @cf/deepgram/nova-3

**Input Schema:**
```json
{
  "type": "object",
  "properties": {
    "audio": {
      "type": "object",
      "properties": {
        "body": {
          "type": "object"
        },
        "contentType": {
          "type": "string"
        }
      },
      "required": [
        "body",
        "contentType"
      ]
    },
    "custom_topic_mode": {
      "type": "string",
      "enum": [
        "extended",
        "strict"
      ],
      "description": "Sets how the model will interpret strings submitted to the custom_topic param. When strict, the model will only return topics submitted using the custom_topic param. When extended, the model will return its own detected topics in addition to those submitted using the custom_topic param."
    },
    "custom_topic": {
      "type": "string",
      "description": "Custom topics you want the model to detect within your input audio or text if present Submit up to 100"
    },
    "custom_intent_mode": {
      "type": "string",
      "description": "Sets how the model will interpret intents submitted to the custom_intent param. When strict, the model will only return intents submitted using the custom_intent param. When extended, the model will return its own detected intents in addition those submitted using the custom_intents param",
      "enum": [
        "extended",
        "strict"
      ]
    },
    "custom_intent": {
      "type": "string",
      "description": "Custom intents you want the model to detect within your input audio if present"
    },
    "detect_entities": {
      "type": "boolean",
      "description": "Identifies and extracts key entities from content in submitted audio"
    },
    "detect_language": {
      "type": "boolean",
      "description": "Identifies the dominant language spoken in submitted audio"
    },
    "diarize": {
      "type": "boolean",
      "description": "Recognize speaker changes. Each word in the transcript will be assigned a speaker number starting at 0"
    },
    "dictation": {
      "type": "boolean",
      "description": "Identify and extract key entities from content in submitted audio"
    },
    "encoding": {
      "type": "string",
      "description": "Specify the expected encoding of your submitted audio",
      "enum": [
        "linear16",
        "flac",
        "mulaw",
        "amr-nb",
        "amr-wb",
        "opus",
        "speex",
        "g729"
      ]
    },
    "extra": {
      "type": "string",
      "description": "Arbitrary key-value pairs that are attached to the API response for usage in downstream processing"
    },
    "filler_words": {
      "type": "boolean",
      "description": "Filler Words can help transcribe interruptions in your audio, like 'uh' and 'um'"
    },
    "keyterm": {
      "type": "string",
      "description": "Key term prompting can boost or suppress specialized terminology and brands."
    },
    "keywords": {
      "type": "string",
      "description": "Keywords can boost or suppress specialized terminology and brands."
    },
    "language": {
      "type": "string",
      "description": "The BCP-47 language tag that hints at the primary spoken language. Depending on the Model and API endpoint you choose only certain languages are available."
    },
    "measurements": {
      "type": "boolean",
      "description": "Spoken measurements will be converted to their corresponding abbreviations."
    },
    "mip_opt_out": {
      "type": "boolean",
      "description": "Opts out requests from the Deepgram Model Improvement Program. Refer to our Docs for pricing impacts before setting this to true. https://dpgr.am/deepgram-mip."
    },
    "mode": {
      "type": "string",
      "description": "Mode of operation for the model representing broad area of topic that will be talked about in the supplied audio",
      "enum": [
        "general",
        "medical",
        "finance"
      ]
    },
    "multichannel": {
      "type": "boolean",
      "description": "Transcribe each audio channel independently."
    },
    "numerals": {
      "type": "boolean",
      "description": "Numerals converts numbers from written format to numerical format."
    },
    "paragraphs": {
      "type": "boolean",
      "description": "Splits audio into paragraphs to improve transcript readability."
    },
    "profanity_filter": {
      "type": "boolean",
      "description": "Profanity Filter looks for recognized profanity and converts it to the nearest recognized non-profane word or removes it from the transcript completely."
    },
    "punctuate": {
      "type": "boolean",
      "description": "Add punctuation and capitalization to the transcript."
    },
    "redact": {
      "type": "string",
      "description": "Redaction removes sensitive information from your transcripts."
    },
    "replace": {
      "type": "string",
      "description": "Search for terms or phrases in submitted audio and replaces them."
    },
    "search": {
      "type": "string",
      "description": "Search for terms or phrases in submitted audio."
    },
    "sentiment": {
      "type": "boolean",
      "description": "Recognizes the sentiment throughout a transcript or text."
    },
    "smart_format": {
      "type": "boolean",
      "description": "Apply formatting to transcript output. When set to true, additional formatting will be applied to transcripts to improve readability."
    },
    "topics": {
      "type": "boolean",
      "description": "Detect topics throughout a transcript or text."
    },
    "utterances": {
      "type": "boolean",
      "description": "Segments speech into meaningful semantic units."
    },
    "utt_split": {
      "type": "number",
      "description": "Seconds to wait before detecting a pause between words in submitted audio."
    },
    "channels": {
      "type": "number",
      "description": "The number of channels in the submitted audio"
    },
    "interim_results": {
      "type": "boolean",
      "description": "Specifies whether the streaming endpoint should provide ongoing transcription updates as more audio is received. When set to true, the endpoint sends continuous updates, meaning transcription results may evolve over time. Note: Supported only for webosockets."
    },
    "endpointing": {
      "type": "string",
      "description": "Indicates how long model will wait to detect whether a speaker has finished speaking or pauses for a significant period of time. When set to a value, the streaming endpoint immediately finalizes the transcription for the processed time range and returns the transcript with a speech_final parameter set to true. Can also be set to false to disable endpointing"
    },
    "vad_events": {
      "type": "boolean",
      "description": "Indicates that speech has started. You'll begin receiving Speech Started messages upon speech starting. Note: Supported only for webosockets."
    },
    "utterance_end_ms": {
      "type": "boolean",
      "description": "Indicates how long model will wait to send an UtteranceEnd message after a word has been transcribed. Use with interim_results. Note: Supported only for webosockets."
    }
  },
  "required": [
    "audio"
  ]
}
```

**Example Request:**
```javascript
const response = await fetch(
  'https://api.cloudflare.com/client/v4/accounts/{account_id}/ai/run/@cf/deepgram/nova-3',
  {
    method: 'POST',
    headers: {
      'Authorization': 'Bearer YOUR_API_TOKEN',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      "audio": {},
      "custom_topic_mode": "example",
      "custom_topic": "example",
      "custom_intent_mode": "example",
      "custom_intent": "example",
      "detect_entities": false,
      "detect_language": false,
      "diarize": false,
      "dictation": false,
      "encoding": "example",
      "extra": "example",
      "filler_words": false,
      "keyterm": "example",
      "keywords": "example",
      "language": "example",
      "measurements": false,
      "mip_opt_out": false,
      "mode": "example",
      "multichannel": false,
      "numerals": false,
      "paragraphs": false,
      "profanity_filter": false,
      "punctuate": false,
      "redact": "example",
      "replace": "example",
      "search": "example",
      "sentiment": false,
      "smart_format": false,
      "topics": false,
      "utterances": false,
      "utt_split": 0.7,
      "channels": 0.7,
      "interim_results": false,
      "endpointing": "example",
      "vad_events": false,
      "utterance_end_ms": false
})
  }
);

const result = await response.json();
console.log(result);
```

**Output Schema:**
```json
{
  "type": "object",
  "contentType": "application/json",
  "properties": {
    "results": {
      "type": "object",
      "properties": {
        "channels": {
          "type": "array",
          "items": {
            "type": "object",
            "properties": {
              "alternatives": {
                "type": "array",
                "items": {
                  "type": "object",
                  "properties": {
                    "confidence": {
                      "type": "number"
                    },
                    "transcript": {
                      "type": "string"
                    },
                    "words": {
                      "type": "array",
                      "items": {
                        "type": "object",
                        "properties": {
                          "confidence": {
                            "type": "number"
                          },
                          "end": {
                            "type": "number"
                          },
                          "start": {
                            "type": "number"
                          },
                          "word": {
                            "type": "string"
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        },
        "summary": {
          "type": "object",
          "properties": {
            "result": {
              "type": "string"
            },
            "short": {
              "type": "string"
            }
          }
        },
        "sentiments": {
          "type": "object",
          "properties": {
            "segments": {
              "type": "array",
              "items": {
                "type": "object",
                "properties": {
                  "text": {
                    "type": "string"
                  },
                  "start_word": {
                    "type": "number"
                  },
                  "end_word": {
                    "type": "number"
                  },
                  "sentiment": {
                    "type": "string"
                  },
                  "sentiment_score": {
                    "type": "number"
                  }
                }
              }
            },
            "average": {
              "type": "object",
              "properties": {
                "sentiment": {
                  "type": "string"
                },
                "sentiment_score": {
                  "type": "number"
                }
              }
            }
          }
        }
      }
    }
  }
}
```

---

### @cf/openai/whisper-tiny-en

**Input Schema:**
```json
{
  "oneOf": [
    {
      "type": "string",
      "format": "binary"
    },
    {
      "type": "object",
      "properties": {
        "audio": {
          "type": "array",
          "description": "An array of integers that represent the audio data constrained to 8-bit unsigned integer values",
          "items": {
            "type": "number",
            "description": "A value between 0 and 255"
          }
        }
      },
      "required": [
        "audio"
      ]
    }
  ]
}
```

**Example Request:**
```javascript
const response = await fetch(
  'https://api.cloudflare.com/client/v4/accounts/{account_id}/ai/run/@cf/openai/whisper-tiny-en',
  {
    method: 'POST',
    headers: {
      'Authorization': 'Bearer YOUR_API_TOKEN',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({})
  }
);

const result = await response.json();
console.log(result);
```

**Output Schema:**
```json
{
  "type": "object",
  "contentType": "application/json",
  "properties": {
    "text": {
      "type": "string",
      "description": "The transcription"
    },
    "word_count": {
      "type": "number"
    },
    "words": {
      "type": "array",
      "items": {
        "type": "object",
        "properties": {
          "word": {
            "type": "string"
          },
          "start": {
            "type": "number",
            "description": "The second this word begins in the recording"
          },
          "end": {
            "type": "number",
            "description": "The ending second when the word completes"
          }
        }
      }
    },
    "vtt": {
      "type": "string"
    }
  },
  "required": [
    "text"
  ]
}
```

---

### @cf/openai/whisper-large-v3-turbo

**Input Schema:**
```json
{
  "type": "object",
  "properties": {
    "audio": {
      "type": "string",
      "description": "Base64 encoded value of the audio data."
    },
    "task": {
      "type": "string",
      "default": "transcribe",
      "description": "Supported tasks are 'translate' or 'transcribe'."
    },
    "language": {
      "type": "string",
      "description": "The language of the audio being transcribed or translated."
    },
    "vad_filter": {
      "type": "boolean",
      "default": false,
      "description": "Preprocess the audio with a voice activity detection model."
    },
    "initial_prompt": {
      "type": "string",
      "description": "A text prompt to help provide context to the model on the contents of the audio."
    },
    "prefix": {
      "type": "string",
      "description": "The prefix it appended the the beginning of the output of the transcription and can guide the transcription result."
    }
  },
  "required": [
    "audio"
  ]
}
```

**Example Request:**
```javascript
const response = await fetch(
  'https://api.cloudflare.com/client/v4/accounts/{account_id}/ai/run/@cf/openai/whisper-large-v3-turbo',
  {
    method: 'POST',
    headers: {
      'Authorization': 'Bearer YOUR_API_TOKEN',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      "audio": "example",
      "task": "transcribe",
      "language": "example",
      "vad_filter": false,
      "initial_prompt": "example",
      "prefix": "example"
})
  }
);

const result = await response.json();
console.log(result);
```

**Output Schema:**
```json
{
  "type": "object",
  "contentType": "application/json",
  "properties": {
    "transcription_info": {
      "type": "object",
      "properties": {
        "language": {
          "type": "string",
          "description": "The language of the audio being transcribed or translated."
        },
        "language_probability": {
          "type": "number",
          "description": "The confidence level or probability of the detected language being accurate, represented as a decimal between 0 and 1."
        },
        "duration": {
          "type": "number",
          "description": "The total duration of the original audio file, in seconds."
        },
        "duration_after_vad": {
          "type": "number",
          "description": "The duration of the audio after applying Voice Activity Detection (VAD) to remove silent or irrelevant sections, in seconds."
        }
      }
    },
    "text": {
      "type": "string",
      "description": "The complete transcription of the audio."
    },
    "word_count": {
      "type": "number",
      "description": "The total number of words in the transcription."
    },
    "segments": {
      "type": "array",
      "items": {
        "type": "object",
        "properties": {
          "start": {
            "type": "number",
            "description": "The starting time of the segment within the audio, in seconds."
          },
          "end": {
            "type": "number",
            "description": "The ending time of the segment within the audio, in seconds."
          },
          "text": {
            "type": "string",
            "description": "The transcription of the segment."
          },
          "temperature": {
            "type": "number",
            "description": "The temperature used in the decoding process, controlling randomness in predictions. Lower values result in more deterministic outputs."
          },
          "avg_logprob": {
            "type": "number",
            "description": "The average log probability of the predictions for the words in this segment, indicating overall confidence."
          },
          "compression_ratio": {
            "type": "number",
            "description": "The compression ratio of the input to the output, measuring how much the text was compressed during the transcription process."
          },
          "no_speech_prob": {
            "type": "number",
            "description": "The probability that the segment contains no speech, represented as a decimal between 0 and 1."
          },
          "words": {
            "type": "array",
            "items": {
              "type": "object",
              "properties": {
                "word": {
                  "type": "string",
                  "description": "The individual word transcribed from the audio."
                },
                "start": {
                  "type": "number",
                  "description": "The starting time of the word within the audio, in seconds."
                },
                "end": {
                  "type": "number",
                  "description": "The ending time of the word within the audio, in seconds."
                }
              }
            }
          }
        }
      }
    },
    "vtt": {
      "type": "string",
      "description": "The transcription in WebVTT format, which includes timing and text information for use in subtitles."
    }
  },
  "required": [
    "text"
  ]
}
```

---

## Summarization

### @cf/facebook/bart-large-cnn

**Input Schema:**
```json
{
  "type": "object",
  "properties": {
    "input_text": {
      "type": "string",
      "minLength": 1,
      "description": "The text that you want the model to summarize"
    },
    "max_length": {
      "type": "integer",
      "default": 1024,
      "description": "The maximum length of the generated summary in tokens"
    }
  },
  "required": [
    "input_text"
  ]
}
```

**Example Request:**
```javascript
const response = await fetch(
  'https://api.cloudflare.com/client/v4/accounts/{account_id}/ai/run/@cf/facebook/bart-large-cnn',
  {
    method: 'POST',
    headers: {
      'Authorization': 'Bearer YOUR_API_TOKEN',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      "input_text": "Hello world",
      "max_length": 1024
})
  }
);

const result = await response.json();
console.log(result);
```

**Output Schema:**
```json
{
  "type": "object",
  "contentType": "application/json",
  "properties": {
    "summary": {
      "type": "string",
      "description": "The summarized version of the input text"
    }
  }
}
```

---

## Text Classification

### @cf/huggingface/distilbert-sst-2-int8

**Input Schema:**
```json
{
  "type": "object",
  "properties": {
    "text": {
      "type": "string",
      "minLength": 1,
      "description": "The text that you want to classify"
    }
  },
  "required": [
    "text"
  ]
}
```

**Example Request:**
```javascript
const response = await fetch(
  'https://api.cloudflare.com/client/v4/accounts/{account_id}/ai/run/@cf/huggingface/distilbert-sst-2-int8',
  {
    method: 'POST',
    headers: {
      'Authorization': 'Bearer YOUR_API_TOKEN',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      "text": "Sample text to process"
})
  }
);

const result = await response.json();
console.log(result);
```

**Output Schema:**
```json
{
  "type": "array",
  "contentType": "application/json",
  "description": "An array of classification results for the input text",
  "items": {
    "type": "object",
    "properties": {
      "score": {
        "type": "number",
        "description": "Confidence score indicating the likelihood that the text belongs to the specified label"
      },
      "label": {
        "type": "string",
        "description": "The classification label assigned to the text (e.g., 'POSITIVE' or 'NEGATIVE')"
      }
    }
  }
}
```

---

## Text Embeddings

### @cf/baai/bge-m3

**Input Schema:**
```json
{
  "type": "object",
  "oneOf": [
    {
      "title": "Input Query and Contexts",
      "properties": {
        "query": {
          "type": "string",
          "minLength": 1,
          "description": "A query you wish to perform against the provided contexts. If no query is provided the model with respond with embeddings for contexts"
        },
        "contexts": {
          "type": "array",
          "items": {
            "type": "object",
            "properties": {
              "text": {
                "type": "string",
                "minLength": 1,
                "description": "One of the provided context content"
              }
            }
          },
          "description": "List of provided contexts. Note that the index in this array is important, as the response will refer to it."
        },
        "truncate_inputs": {
          "type": "boolean",
          "default": false,
          "description": "When provided with too long context should the model error out or truncate the context to fit?"
        }
      },
      "required": [
        "contexts"
      ]
    },
    {
      "title": "Input Embedding",
      "properties": {
        "text": {
          "oneOf": [
            {
              "type": "string",
              "description": "The text to embed",
              "minLength": 1
            },
            {
              "type": "array",
              "description": "Batch of text values to embed",
              "items": {
                "type": "string",
                "description": "The text to embed",
                "minLength": 1
              },
              "maxItems": 100
            }
          ]
        },
        "truncate_inputs": {
          "type": "boolean",
          "default": false,
          "description": "When provided with too long context should the model error out or truncate the context to fit?"
        }
      },
      "required": [
        "text"
      ]
    },
    {
      "properties": {
        "requests": {
          "type": "array",
          "description": "Batch of the embeddings requests to run using async-queue",
          "items": {
            "type": "object",
            "oneOf": [
              {
                "title": "Input Query and Contexts",
                "properties": {
                  "query": {
                    "type": "string",
                    "minLength": 1,
                    "description": "A query you wish to perform against the provided contexts. If no query is provided the model with respond with embeddings for contexts"
                  },
                  "contexts": {
                    "type": "array",
                    "items": {
                      "type": "object",
                      "properties": {
                        "text": {
                          "type": "string",
                          "minLength": 1,
                          "description": "One of the provided context content"
                        }
                      }
                    },
                    "description": "List of provided contexts. Note that the index in this array is important, as the response will refer to it."
                  },
                  "truncate_inputs": {
                    "type": "boolean",
                    "default": false,
                    "description": "When provided with too long context should the model error out or truncate the context to fit?"
                  }
                },
                "required": [
                  "contexts"
                ]
              },
              {
                "title": "Input Embedding",
                "properties": {
                  "text": {
                    "oneOf": [
                      {
                        "type": "string",
                        "description": "The text to embed",
                        "minLength": 1
                      },
                      {
                        "type": "array",
                        "description": "Batch of text values to embed",
                        "items": {
                          "type": "string",
                          "description": "The text to embed",
                          "minLength": 1
                        },
                        "maxItems": 100
                      }
                    ]
                  },
                  "truncate_inputs": {
                    "type": "boolean",
                    "default": false,
                    "description": "When provided with too long context should the model error out or truncate the context to fit?"
                  }
                },
                "required": [
                  "text"
                ]
              }
            ]
          }
        }
      },
      "required": [
        "requests"
      ]
    }
  ]
}
```

**Example Request:**
```javascript
const response = await fetch(
  'https://api.cloudflare.com/client/v4/accounts/{account_id}/ai/run/@cf/baai/bge-m3',
  {
    method: 'POST',
    headers: {
      'Authorization': 'Bearer YOUR_API_TOKEN',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      "contexts": []
})
  }
);

const result = await response.json();
console.log(result);
```

**Output Schema:**
```json
{
  "type": "object",
  "contentType": "application/json",
  "oneOf": [
    {
      "title": "Output Query",
      "properties": {
        "response": {
          "type": "array",
          "items": {
            "type": "object",
            "properties": {
              "id": {
                "type": "integer",
                "description": "Index of the context in the request"
              },
              "score": {
                "type": "number",
                "description": "Score of the context under the index."
              }
            }
          }
        }
      }
    },
    {
      "title": "Output Embedding for Contexts",
      "properties": {
        "response": {
          "type": "array",
          "items": {
            "type": "array",
            "items": {
              "type": "number"
            }
          }
        },
        "shape": {
          "type": "array",
          "items": {
            "type": "number"
          }
        },
        "pooling": {
          "type": "string",
          "enum": [
            "mean",
            "cls"
          ],
          "description": "The pooling method used in the embedding process."
        }
      }
    },
    {
      "title": "Output Embedding",
      "properties": {
        "shape": {
          "type": "array",
          "items": {
            "type": "number"
          }
        },
        "data": {
          "type": "array",
          "description": "Embeddings of the requested text values",
          "items": {
            "type": "array",
            "description": "Floating point embedding representation shaped by the embedding model",
            "items": {
              "type": "number"
            }
          }
        },
        "pooling": {
          "type": "string",
          "enum": [
            "mean",
            "cls"
          ],
          "description": "The pooling method used in the embedding process."
        }
      }
    },
    {
      "type": "object",
      "contentType": "application/json",
      "title": "Async response",
      "properties": {
        "request_id": {
          "type": "string",
          "description": "The async request id that can be used to obtain the results."
        }
      }
    }
  ]
}
```

---

### @cf/qwen/qwen3-embedding-0.6b

**Input Schema:**
```json
{
  "type": "object",
  "properties": {
    "queries": {
      "oneOf": [
        {
          "type": "string",
          "description": "A single query string",
          "minLength": 1
        },
        {
          "type": "array",
          "description": "An array of query strings",
          "items": {
            "type": "string",
            "minLength": 1
          },
          "maxItems": 32
        }
      ]
    },
    "instruction": {
      "type": "string",
      "default": "Given a web search query, retrieve relevant passages that answer the query",
      "description": "Optional instruction for the task"
    },
    "documents": {
      "oneOf": [
        {
          "type": "string",
          "description": "A single document string",
          "minLength": 1
        },
        {
          "type": "array",
          "description": "An array of document strings",
          "items": {
            "type": "string",
            "minLength": 1
          },
          "maxItems": 32
        }
      ]
    },
    "text": {
      "oneOf": [
        {
          "type": "string",
          "description": "Alias for documents: a single text string",
          "minLength": 1
        },
        {
          "type": "array",
          "description": "Alias for documents: an array of text strings",
          "items": {
            "type": "string",
            "minLength": 1
          },
          "maxItems": 32
        }
      ]
    }
  }
}
```

**Example Request:**
```javascript
const response = await fetch(
  'https://api.cloudflare.com/client/v4/accounts/{account_id}/ai/run/@cf/qwen/qwen3-embedding-0.6b',
  {
    method: 'POST',
    headers: {
      'Authorization': 'Bearer YOUR_API_TOKEN',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      "queries": null,
      "instruction": "Given a web search query, retrieve relevant passages that answer the query",
      "documents": null,
      "text": null
})
  }
);

const result = await response.json();
console.log(result);
```

**Output Schema:**
```json
{
  "type": "object",
  "properties": {
    "data": {
      "items": {
        "items": {
          "type": "number"
        },
        "type": "array"
      },
      "type": "array"
    },
    "shape": {
      "items": {
        "type": "integer"
      },
      "type": "array"
    }
  }
}
```

---

### @cf/pfnet/plamo-embedding-1b

**Input Schema:**
```json
{
  "type": "object",
  "properties": {
    "text": {
      "oneOf": [
        {
          "type": "string"
        },
        {
          "type": "array",
          "items": {
            "type": "string"
          }
        }
      ],
      "description": "Input text to embed. Can be a single string or a list of strings."
    }
  },
  "required": [
    "text"
  ]
}
```

**Example Request:**
```javascript
const response = await fetch(
  'https://api.cloudflare.com/client/v4/accounts/{account_id}/ai/run/@cf/pfnet/plamo-embedding-1b',
  {
    method: 'POST',
    headers: {
      'Authorization': 'Bearer YOUR_API_TOKEN',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      "text": null
})
  }
);

const result = await response.json();
console.log(result);
```

**Output Schema:**
```json
{
  "type": "object",
  "properties": {
    "data": {
      "type": "array",
      "items": {
        "type": "array",
        "items": {
          "type": "number"
        }
      },
      "description": "Embedding vectors, where each vector is a list of floats."
    },
    "shape": {
      "type": "array",
      "items": {
        "type": "integer"
      },
      "minItems": 2,
      "maxItems": 2,
      "description": "Shape of the embedding data as [number_of_embeddings, embedding_dimension]."
    }
  },
  "required": [
    "data",
    "shape"
  ]
}
```

---

### @cf/baai/bge-small-en-v1.5

**Input Schema:**
```json
{
  "type": "object",
  "oneOf": [
    {
      "properties": {
        "text": {
          "oneOf": [
            {
              "type": "string",
              "description": "The text to embed",
              "minLength": 1
            },
            {
              "type": "array",
              "description": "Batch of text values to embed",
              "items": {
                "type": "string",
                "description": "The text to embed",
                "minLength": 1
              },
              "maxItems": 100
            }
          ]
        },
        "pooling": {
          "type": "string",
          "enum": [
            "mean",
            "cls"
          ],
          "default": "mean",
          "description": "The pooling method used in the embedding process. `cls` pooling will generate more accurate embeddings on larger inputs - however, embeddings created with cls pooling are not compatible with embeddings generated with mean pooling. The default pooling method is `mean` in order for this to not be a breaking change, but we highly suggest using the new `cls` pooling for better accuracy."
        }
      },
      "required": [
        "text"
      ]
    },
    {
      "properties": {
        "requests": {
          "type": "array",
          "description": "Batch of the embeddings requests to run using async-queue",
          "items": {
            "properties": {
              "text": {
                "oneOf": [
                  {
                    "type": "string",
                    "description": "The text to embed",
                    "minLength": 1
                  },
                  {
                    "type": "array",
                    "description": "Batch of text values to embed",
                    "items": {
                      "type": "string",
                      "description": "The text to embed",
                      "minLength": 1
                    },
                    "maxItems": 100
                  }
                ]
              },
              "pooling": {
                "type": "string",
                "enum": [
                  "mean",
                  "cls"
                ],
                "default": "mean",
                "description": "The pooling method used in the embedding process. `cls` pooling will generate more accurate embeddings on larger inputs - however, embeddings created with cls pooling are not compatible with embeddings generated with mean pooling. The default pooling method is `mean` in order for this to not be a breaking change, but we highly suggest using the new `cls` pooling for better accuracy."
              }
            },
            "required": [
              "text"
            ]
          }
        }
      },
      "required": [
        "requests"
      ]
    }
  ]
}
```

**Example Request:**
```javascript
const response = await fetch(
  'https://api.cloudflare.com/client/v4/accounts/{account_id}/ai/run/@cf/baai/bge-small-en-v1.5',
  {
    method: 'POST',
    headers: {
      'Authorization': 'Bearer YOUR_API_TOKEN',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      "text": null
})
  }
);

const result = await response.json();
console.log(result);
```

**Output Schema:**
```json
{
  "oneOf": [
    {
      "type": "object",
      "contentType": "application/json",
      "properties": {
        "shape": {
          "type": "array",
          "items": {
            "type": "number"
          }
        },
        "data": {
          "type": "array",
          "description": "Embeddings of the requested text values",
          "items": {
            "type": "array",
            "description": "Floating point embedding representation shaped by the embedding model",
            "items": {
              "type": "number"
            }
          }
        },
        "pooling": {
          "type": "string",
          "enum": [
            "mean",
            "cls"
          ],
          "description": "The pooling method used in the embedding process."
        }
      }
    },
    {
      "type": "object",
      "contentType": "application/json",
      "title": "Async response",
      "properties": {
        "request_id": {
          "type": "string",
          "description": "The async request id that can be used to obtain the results."
        }
      }
    }
  ]
}
```

---

### @cf/baai/bge-base-en-v1.5

**Input Schema:**
```json
{
  "type": "object",
  "oneOf": [
    {
      "properties": {
        "text": {
          "oneOf": [
            {
              "type": "string",
              "description": "The text to embed",
              "minLength": 1
            },
            {
              "type": "array",
              "description": "Batch of text values to embed",
              "items": {
                "type": "string",
                "description": "The text to embed",
                "minLength": 1
              },
              "maxItems": 100
            }
          ]
        },
        "pooling": {
          "type": "string",
          "enum": [
            "mean",
            "cls"
          ],
          "default": "mean",
          "description": "The pooling method used in the embedding process. `cls` pooling will generate more accurate embeddings on larger inputs - however, embeddings created with cls pooling are not compatible with embeddings generated with mean pooling. The default pooling method is `mean` in order for this to not be a breaking change, but we highly suggest using the new `cls` pooling for better accuracy."
        }
      },
      "required": [
        "text"
      ]
    },
    {
      "properties": {
        "requests": {
          "type": "array",
          "description": "Batch of the embeddings requests to run using async-queue",
          "items": {
            "properties": {
              "text": {
                "oneOf": [
                  {
                    "type": "string",
                    "description": "The text to embed",
                    "minLength": 1
                  },
                  {
                    "type": "array",
                    "description": "Batch of text values to embed",
                    "items": {
                      "type": "string",
                      "description": "The text to embed",
                      "minLength": 1
                    },
                    "maxItems": 100
                  }
                ]
              },
              "pooling": {
                "type": "string",
                "enum": [
                  "mean",
                  "cls"
                ],
                "default": "mean",
                "description": "The pooling method used in the embedding process. `cls` pooling will generate more accurate embeddings on larger inputs - however, embeddings created with cls pooling are not compatible with embeddings generated with mean pooling. The default pooling method is `mean` in order for this to not be a breaking change, but we highly suggest using the new `cls` pooling for better accuracy."
              }
            },
            "required": [
              "text"
            ]
          }
        }
      },
      "required": [
        "requests"
      ]
    }
  ]
}
```

**Example Request:**
```javascript
const response = await fetch(
  'https://api.cloudflare.com/client/v4/accounts/{account_id}/ai/run/@cf/baai/bge-base-en-v1.5',
  {
    method: 'POST',
    headers: {
      'Authorization': 'Bearer YOUR_API_TOKEN',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      "text": null
})
  }
);

const result = await response.json();
console.log(result);
```

**Output Schema:**
```json
{
  "oneOf": [
    {
      "type": "object",
      "contentType": "application/json",
      "properties": {
        "shape": {
          "type": "array",
          "items": {
            "type": "number"
          }
        },
        "data": {
          "type": "array",
          "description": "Embeddings of the requested text values",
          "items": {
            "type": "array",
            "description": "Floating point embedding representation shaped by the embedding model",
            "items": {
              "type": "number"
            }
          }
        },
        "pooling": {
          "type": "string",
          "enum": [
            "mean",
            "cls"
          ],
          "description": "The pooling method used in the embedding process."
        }
      }
    },
    {
      "type": "object",
      "contentType": "application/json",
      "title": "Async response",
      "properties": {
        "request_id": {
          "type": "string",
          "description": "The async request id that can be used to obtain the results."
        }
      }
    }
  ]
}
```

---

### @cf/google/embeddinggemma-300m

**Input Schema:**
```json
{
  "type": "object",
  "properties": {
    "text": {
      "oneOf": [
        {
          "type": "string",
          "description": "The text to embed",
          "minLength": 1
        },
        {
          "type": "array",
          "description": "Batch of text values to embed",
          "items": {
            "type": "string",
            "description": "The text to embed",
            "minLength": 1
          },
          "maxItems": 100
        }
      ]
    }
  },
  "required": [
    "text"
  ]
}
```

**Example Request:**
```javascript
const response = await fetch(
  'https://api.cloudflare.com/client/v4/accounts/{account_id}/ai/run/@cf/google/embeddinggemma-300m',
  {
    method: 'POST',
    headers: {
      'Authorization': 'Bearer YOUR_API_TOKEN',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      "text": null
})
  }
);

const result = await response.json();
console.log(result);
```

**Output Schema:**
```json
{
  "type": "object",
  "contentType": "application/json",
  "properties": {
    "shape": {
      "type": "array",
      "items": {
        "type": "number"
      }
    },
    "data": {
      "type": "array",
      "description": "Embeddings of the requested text values",
      "items": {
        "type": "array",
        "description": "Floating point embedding representation shaped by the embedding model",
        "items": {
          "type": "number"
        }
      }
    }
  }
}
```

---

### @cf/baai/bge-reranker-base

**Input Schema:**
```json
{
  "type": "object",
  "properties": {
    "query": {
      "type": "string",
      "minLength": 1,
      "description": "A query you wish to perform against the provided contexts."
    },
    "top_k": {
      "type": "integer",
      "minimum": 1,
      "description": "Number of returned results starting with the best score."
    },
    "contexts": {
      "type": "array",
      "items": {
        "type": "object",
        "properties": {
          "text": {
            "type": "string",
            "minLength": 1,
            "description": "One of the provided context content"
          }
        }
      },
      "description": "List of provided contexts. Note that the index in this array is important, as the response will refer to it."
    }
  },
  "required": [
    "query",
    "contexts"
  ]
}
```

**Example Request:**
```javascript
const response = await fetch(
  'https://api.cloudflare.com/client/v4/accounts/{account_id}/ai/run/@cf/baai/bge-reranker-base',
  {
    method: 'POST',
    headers: {
      'Authorization': 'Bearer YOUR_API_TOKEN',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      "query": "example",
      "top_k": 256,
      "contexts": []
})
  }
);

const result = await response.json();
console.log(result);
```

**Output Schema:**
```json
{
  "type": "object",
  "contentType": "application/json",
  "properties": {
    "response": {
      "type": "array",
      "items": {
        "type": "object",
        "properties": {
          "id": {
            "type": "integer",
            "description": "Index of the context in the request"
          },
          "score": {
            "type": "number",
            "description": "Score of the context under the index."
          }
        }
      }
    }
  }
}
```

---

### @cf/baai/bge-large-en-v1.5

**Input Schema:**
```json
{
  "type": "object",
  "oneOf": [
    {
      "properties": {
        "text": {
          "oneOf": [
            {
              "type": "string",
              "description": "The text to embed",
              "minLength": 1
            },
            {
              "type": "array",
              "description": "Batch of text values to embed",
              "items": {
                "type": "string",
                "description": "The text to embed",
                "minLength": 1
              },
              "maxItems": 100
            }
          ]
        },
        "pooling": {
          "type": "string",
          "enum": [
            "mean",
            "cls"
          ],
          "default": "mean",
          "description": "The pooling method used in the embedding process. `cls` pooling will generate more accurate embeddings on larger inputs - however, embeddings created with cls pooling are not compatible with embeddings generated with mean pooling. The default pooling method is `mean` in order for this to not be a breaking change, but we highly suggest using the new `cls` pooling for better accuracy."
        }
      },
      "required": [
        "text"
      ]
    },
    {
      "properties": {
        "requests": {
          "type": "array",
          "description": "Batch of the embeddings requests to run using async-queue",
          "items": {
            "properties": {
              "text": {
                "oneOf": [
                  {
                    "type": "string",
                    "description": "The text to embed",
                    "minLength": 1
                  },
                  {
                    "type": "array",
                    "description": "Batch of text values to embed",
                    "items": {
                      "type": "string",
                      "description": "The text to embed",
                      "minLength": 1
                    },
                    "maxItems": 100
                  }
                ]
              },
              "pooling": {
                "type": "string",
                "enum": [
                  "mean",
                  "cls"
                ],
                "default": "mean",
                "description": "The pooling method used in the embedding process. `cls` pooling will generate more accurate embeddings on larger inputs - however, embeddings created with cls pooling are not compatible with embeddings generated with mean pooling. The default pooling method is `mean` in order for this to not be a breaking change, but we highly suggest using the new `cls` pooling for better accuracy."
              }
            },
            "required": [
              "text"
            ]
          }
        }
      },
      "required": [
        "requests"
      ]
    }
  ]
}
```

**Example Request:**
```javascript
const response = await fetch(
  'https://api.cloudflare.com/client/v4/accounts/{account_id}/ai/run/@cf/baai/bge-large-en-v1.5',
  {
    method: 'POST',
    headers: {
      'Authorization': 'Bearer YOUR_API_TOKEN',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      "text": null
})
  }
);

const result = await response.json();
console.log(result);
```

**Output Schema:**
```json
{
  "oneOf": [
    {
      "type": "object",
      "contentType": "application/json",
      "properties": {
        "shape": {
          "type": "array",
          "items": {
            "type": "number"
          }
        },
        "data": {
          "type": "array",
          "description": "Embeddings of the requested text values",
          "items": {
            "type": "array",
            "description": "Floating point embedding representation shaped by the embedding model",
            "items": {
              "type": "number"
            }
          }
        },
        "pooling": {
          "type": "string",
          "enum": [
            "mean",
            "cls"
          ],
          "description": "The pooling method used in the embedding process."
        }
      }
    },
    {
      "type": "object",
      "contentType": "application/json",
      "title": "Async response",
      "properties": {
        "request_id": {
          "type": "string",
          "description": "The async request id that can be used to obtain the results."
        }
      }
    }
  ]
}
```

---

## Text Generation

### @cf/pipecat-ai/smart-turn-v2

**Input Schema:**
```json
{
  "type": "object",
  "oneOf": [
    {
      "properties": {
        "audio": {
          "type": "object",
          "description": "readable stream with audio data and content-type specified for that data",
          "properties": {
            "body": {
              "type": "object"
            },
            "contentType": {
              "type": "string"
            }
          },
          "required": [
            "body",
            "contentType"
          ]
        },
        "dtype": {
          "type": "string",
          "description": "type of data PCM data that's sent to the inference server as raw array",
          "enum": [
            "uint8",
            "float32",
            "float64"
          ]
        }
      },
      "required": [
        "audio"
      ]
    },
    {
      "properties": {
        "audio": {
          "type": "string",
          "description": "base64 encoded audio data"
        },
        "dtype": {
          "type": "string",
          "description": "type of data PCM data that's sent to the inference server as raw array",
          "enum": [
            "uint8",
            "float32",
            "float64"
          ]
        }
      },
      "required": [
        "audio"
      ]
    }
  ]
}
```

**Example Request:**
```javascript
const response = await fetch(
  'https://api.cloudflare.com/client/v4/accounts/{account_id}/ai/run/@cf/pipecat-ai/smart-turn-v2',
  {
    method: 'POST',
    headers: {
      'Authorization': 'Bearer YOUR_API_TOKEN',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      "audio": {}
})
  }
);

const result = await response.json();
console.log(result);
```

**Output Schema:**
```json
{
  "type": "object",
  "contentType": "application/json",
  "properties": {
    "is_complete": {
      "type": "boolean",
      "description": "if true, end-of-turn was detected"
    },
    "probability": {
      "type": "number",
      "description": "probability of the end-of-turn detection"
    }
  }
}
```

---

### @cf/openai/gpt-oss-120b

**Input Schema:**
```json
{
  "oneOf": [
    {
      "type": "object",
      "oneOf": [
        {
          "title": "Prompt",
          "properties": {
            "prompt": {
              "type": "string",
              "minLength": 1,
              "description": "The input text prompt for the model to generate a response."
            },
            "lora": {
              "type": "string",
              "description": "Name of the LoRA (Low-Rank Adaptation) model to fine-tune the base model."
            },
            "response_format": {
              "title": "JSON Mode",
              "type": "object",
              "properties": {
                "type": {
                  "type": "string",
                  "enum": [
                    "json_object",
                    "json_schema"
                  ]
                },
                "json_schema": {}
              }
            },
            "raw": {
              "type": "boolean",
              "default": false,
              "description": "If true, a chat template is not applied and you must adhere to the specific model's expected formatting."
            },
            "stream": {
              "type": "boolean",
              "default": false,
              "description": "If true, the response will be streamed back incrementally using SSE, Server Sent Events."
            },
            "max_tokens": {
              "type": "integer",
              "default": 256,
              "description": "The maximum number of tokens to generate in the response."
            },
            "temperature": {
              "type": "number",
              "default": 0.6,
              "minimum": 0,
              "maximum": 5,
              "description": "Controls the randomness of the output; higher values produce more random results."
            },
            "top_p": {
              "type": "number",
              "minimum": 0.001,
              "maximum": 1,
              "description": "Adjusts the creativity of the AI's responses by controlling how many possible words it considers. Lower values make outputs more predictable; higher values allow for more varied and creative responses."
            },
            "top_k": {
              "type": "integer",
              "minimum": 1,
              "maximum": 50,
              "description": "Limits the AI to choose from the top 'k' most probable words. Lower values make responses more focused; higher values introduce more variety and potential surprises."
            },
            "seed": {
              "type": "integer",
              "minimum": 1,
              "maximum": 9999999999,
              "description": "Random seed for reproducibility of the generation."
            },
            "repetition_penalty": {
              "type": "number",
              "minimum": 0,
              "maximum": 2,
              "description": "Penalty for repeated tokens; higher values discourage repetition."
            },
            "frequency_penalty": {
              "type": "number",
              "minimum": -2,
              "maximum": 2,
              "description": "Decreases the likelihood of the model repeating the same lines verbatim."
            },
            "presence_penalty": {
              "type": "number",
              "minimum": -2,
              "maximum": 2,
              "description": "Increases the likelihood of the model introducing new topics."
            }
          },
          "required": [
            "prompt"
          ]
        },
        {
          "title": "Messages",
          "properties": {
            "messages": {
              "type": "array",
              "description": "An array of message objects representing the conversation history.",
              "items": {
                "type": "object",
                "properties": {
                  "role": {
                    "type": "string",
                    "description": "The role of the message sender (e.g., 'user', 'assistant', 'system', 'tool')."
                  },
                  "content": {
                    "type": "string",
                    "description": "The content of the message as a string."
                  }
                },
                "required": [
                  "role",
                  "content"
                ]
              }
            },
            "functions": {
              "type": "array",
              "items": {
                "type": "object",
                "properties": {
                  "name": {
                    "type": "string"
                  },
                  "code": {
                    "type": "string"
                  }
                },
                "required": [
                  "name",
                  "code"
                ]
              }
            },
            "tools": {
              "type": "array",
              "description": "A list of tools available for the assistant to use.",
              "items": {
                "type": "object",
                "oneOf": [
                  {
                    "properties": {
                      "name": {
                        "type": "string",
                        "description": "The name of the tool. More descriptive the better."
                      },
                      "description": {
                        "type": "string",
                        "description": "A brief description of what the tool does."
                      },
                      "parameters": {
                        "type": "object",
                        "description": "Schema defining the parameters accepted by the tool.",
                        "properties": {
                          "type": {
                            "type": "string",
                            "description": "The type of the parameters object (usually 'object')."
                          },
                          "required": {
                            "type": "array",
                            "description": "List of required parameter names.",
                            "items": {
                              "type": "string"
                            }
                          },
                          "properties": {
                            "type": "object",
                            "description": "Definitions of each parameter.",
                            "additionalProperties": {
                              "type": "object",
                              "properties": {
                                "type": {
                                  "type": "string",
                                  "description": "The data type of the parameter."
                                },
                                "description": {
                                  "type": "string",
                                  "description": "A description of the expected parameter."
                                }
                              },
                              "required": [
                                "type",
                                "description"
                              ]
                            }
                          }
                        },
                        "required": [
                          "type",
                          "properties"
                        ]
                      }
                    },
                    "required": [
                      "name",
                      "description",
                      "parameters"
                    ]
                  },
                  {
                    "properties": {
                      "type": {
                        "type": "string",
                        "description": "Specifies the type of tool (e.g., 'function')."
                      },
                      "function": {
                        "type": "object",
                        "description": "Details of the function tool.",
                        "properties": {
                          "name": {
                            "type": "string",
                            "description": "The name of the function."
                          },
                          "description": {
                            "type": "string",
                            "description": "A brief description of what the function does."
                          },
                          "parameters": {
                            "type": "object",
                            "description": "Schema defining the parameters accepted by the function.",
                            "properties": {
                              "type": {
                                "type": "string",
                                "description": "The type of the parameters object (usually 'object')."
                              },
                              "required": {
                                "type": "array",
                                "description": "List of required parameter names.",
                                "items": {
                                  "type": "string"
                                }
                              },
                              "properties": {
                                "type": "object",
                                "description": "Definitions of each parameter.",
                                "additionalProperties": {
                                  "type": "object",
                                  "properties": {
                                    "type": {
                                      "type": "string",
                                      "description": "The data type of the parameter."
                                    },
                                    "description": {
                                      "type": "string",
                                      "description": "A description of the expected parameter."
                                    }
                                  },
                                  "required": [
                                    "type",
                                    "description"
                                  ]
                                }
                              }
                            },
                            "required": [
                              "type",
                              "properties"
                            ]
                          }
                        },
                        "required": [
                          "name",
                          "description",
                          "parameters"
                        ]
                      }
                    },
                    "required": [
                      "type",
                      "function"
                    ]
                  }
                ]
              }
            },
            "response_format": {
              "title": "JSON Mode",
              "type": "object",
              "properties": {
                "type": {
                  "type": "string",
                  "enum": [
                    "json_object",
                    "json_schema"
                  ]
                },
                "json_schema": {}
              }
            },
            "raw": {
              "type": "boolean",
              "default": false,
              "description": "If true, a chat template is not applied and you must adhere to the specific model's expected formatting."
            },
            "stream": {
              "type": "boolean",
              "default": false,
              "description": "If true, the response will be streamed back incrementally using SSE, Server Sent Events."
            },
            "max_tokens": {
              "type": "integer",
              "default": 256,
              "description": "The maximum number of tokens to generate in the response."
            },
            "temperature": {
              "type": "number",
              "default": 0.6,
              "minimum": 0,
              "maximum": 5,
              "description": "Controls the randomness of the output; higher values produce more random results."
            },
            "top_p": {
              "type": "number",
              "minimum": 0.001,
              "maximum": 1,
              "description": "Adjusts the creativity of the AI's responses by controlling how many possible words it considers. Lower values make outputs more predictable; higher values allow for more varied and creative responses."
            },
            "top_k": {
              "type": "integer",
              "minimum": 1,
              "maximum": 50,
              "description": "Limits the AI to choose from the top 'k' most probable words. Lower values make responses more focused; higher values introduce more variety and potential surprises."
            },
            "seed": {
              "type": "integer",
              "minimum": 1,
              "maximum": 9999999999,
              "description": "Random seed for reproducibility of the generation."
            },
            "repetition_penalty": {
              "type": "number",
              "minimum": 0,
              "maximum": 2,
              "description": "Penalty for repeated tokens; higher values discourage repetition."
            },
            "frequency_penalty": {
              "type": "number",
              "minimum": -2,
              "maximum": 2,
              "description": "Decreases the likelihood of the model repeating the same lines verbatim."
            },
            "presence_penalty": {
              "type": "number",
              "minimum": -2,
              "maximum": 2,
              "description": "Increases the likelihood of the model introducing new topics."
            }
          },
          "required": [
            "messages"
          ]
        }
      ]
    },
    {
      "type": "object",
      "title": "Responses",
      "properties": {
        "input": {
          "anyOf": [
            {
              "type": "string"
            },
            {
              "items": {},
              "type": "array"
            }
          ],
          "description": "Responses API Input messages. Refer to OpenAI Responses API docs to learn more about supported content types"
        },
        "reasoning": {
          "type": "object",
          "properties": {
            "effort": {
              "type": "string",
              "description": "Constrains effort on reasoning for reasoning models. Currently supported values are low, medium, and high. Reducing reasoning effort can result in faster responses and fewer tokens used on reasoning in a response.",
              "enum": [
                "low",
                "medium",
                "high"
              ]
            },
            "summary": {
              "type": "string",
              "description": "A summary of the reasoning performed by the model. This can be useful for debugging and understanding the model's reasoning process. One of auto, concise, or detailed.",
              "enum": [
                "auto",
                "concise",
                "detailed"
              ]
            }
          }
        }
      },
      "required": [
        "input"
      ]
    },
    {
      "type": "object",
      "title": "Responses_Async",
      "properties": {
        "requests": {
          "type": "array",
          "items": {
            "type": "object",
            "properties": {
              "input": {
                "anyOf": [
                  {
                    "type": "string"
                  },
                  {
                    "items": {},
                    "type": "array"
                  }
                ],
                "description": "Responses API Input messages. Refer to OpenAI Responses API docs to learn more about supported content types"
              },
              "reasoning": {
                "type": "object",
                "properties": {
                  "effort": {
                    "type": "string",
                    "description": "Constrains effort on reasoning for reasoning models. Currently supported values are low, medium, and high. Reducing reasoning effort can result in faster responses and fewer tokens used on reasoning in a response.",
                    "enum": [
                      "low",
                      "medium",
                      "high"
                    ]
                  },
                  "summary": {
                    "type": "string",
                    "description": "A summary of the reasoning performed by the model. This can be useful for debugging and understanding the model's reasoning process. One of auto, concise, or detailed.",
                    "enum": [
                      "auto",
                      "concise",
                      "detailed"
                    ]
                  }
                }
              }
            },
            "required": [
              "input"
            ]
          }
        }
      },
      "required": [
        "requests"
      ]
    }
  ]
}
```

**Example Request:**
```javascript
const response = await fetch(
  'https://api.cloudflare.com/client/v4/accounts/{account_id}/ai/run/@cf/openai/gpt-oss-120b',
  {
    method: 'POST',
    headers: {
      'Authorization': 'Bearer YOUR_API_TOKEN',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({})
  }
);

const result = await response.json();
console.log(result);
```

**Output Schema:**
```json
{
  "oneOf": [
    {
      "type": "object",
      "contentType": "application/json"
    },
    {
      "type": "string",
      "contentType": "text/event-stream",
      "format": "binary"
    }
  ]
}
```

---

### @cf/qwen/qwen1.5-0.5b-chat

**Input Schema:**
```json
{
  "type": "object",
  "oneOf": [
    {
      "title": "Prompt",
      "properties": {
        "prompt": {
          "type": "string",
          "minLength": 1,
          "description": "The input text prompt for the model to generate a response."
        },
        "lora": {
          "type": "string",
          "description": "Name of the LoRA (Low-Rank Adaptation) model to fine-tune the base model."
        },
        "response_format": {
          "title": "JSON Mode",
          "type": "object",
          "properties": {
            "type": {
              "type": "string",
              "enum": [
                "json_object",
                "json_schema"
              ]
            },
            "json_schema": {}
          }
        },
        "raw": {
          "type": "boolean",
          "default": false,
          "description": "If true, a chat template is not applied and you must adhere to the specific model's expected formatting."
        },
        "stream": {
          "type": "boolean",
          "default": false,
          "description": "If true, the response will be streamed back incrementally using SSE, Server Sent Events."
        },
        "max_tokens": {
          "type": "integer",
          "default": 256,
          "description": "The maximum number of tokens to generate in the response."
        },
        "temperature": {
          "type": "number",
          "default": 0.6,
          "minimum": 0,
          "maximum": 5,
          "description": "Controls the randomness of the output; higher values produce more random results."
        },
        "top_p": {
          "type": "number",
          "minimum": 0.001,
          "maximum": 1,
          "description": "Adjusts the creativity of the AI's responses by controlling how many possible words it considers. Lower values make outputs more predictable; higher values allow for more varied and creative responses."
        },
        "top_k": {
          "type": "integer",
          "minimum": 1,
          "maximum": 50,
          "description": "Limits the AI to choose from the top 'k' most probable words. Lower values make responses more focused; higher values introduce more variety and potential surprises."
        },
        "seed": {
          "type": "integer",
          "minimum": 1,
          "maximum": 9999999999,
          "description": "Random seed for reproducibility of the generation."
        },
        "repetition_penalty": {
          "type": "number",
          "minimum": 0,
          "maximum": 2,
          "description": "Penalty for repeated tokens; higher values discourage repetition."
        },
        "frequency_penalty": {
          "type": "number",
          "minimum": -2,
          "maximum": 2,
          "description": "Decreases the likelihood of the model repeating the same lines verbatim."
        },
        "presence_penalty": {
          "type": "number",
          "minimum": -2,
          "maximum": 2,
          "description": "Increases the likelihood of the model introducing new topics."
        }
      },
      "required": [
        "prompt"
      ]
    },
    {
      "title": "Messages",
      "properties": {
        "messages": {
          "type": "array",
          "description": "An array of message objects representing the conversation history.",
          "items": {
            "type": "object",
            "properties": {
              "role": {
                "type": "string",
                "description": "The role of the message sender (e.g., 'user', 'assistant', 'system', 'tool')."
              },
              "content": {
                "type": "string",
                "description": "The content of the message as a string."
              }
            },
            "required": [
              "role",
              "content"
            ]
          }
        },
        "functions": {
          "type": "array",
          "items": {
            "type": "object",
            "properties": {
              "name": {
                "type": "string"
              },
              "code": {
                "type": "string"
              }
            },
            "required": [
              "name",
              "code"
            ]
          }
        },
        "tools": {
          "type": "array",
          "description": "A list of tools available for the assistant to use.",
          "items": {
            "type": "object",
            "oneOf": [
              {
                "properties": {
                  "name": {
                    "type": "string",
                    "description": "The name of the tool. More descriptive the better."
                  },
                  "description": {
                    "type": "string",
                    "description": "A brief description of what the tool does."
                  },
                  "parameters": {
                    "type": "object",
                    "description": "Schema defining the parameters accepted by the tool.",
                    "properties": {
                      "type": {
                        "type": "string",
                        "description": "The type of the parameters object (usually 'object')."
                      },
                      "required": {
                        "type": "array",
                        "description": "List of required parameter names.",
                        "items": {
                          "type": "string"
                        }
                      },
                      "properties": {
                        "type": "object",
                        "description": "Definitions of each parameter.",
                        "additionalProperties": {
                          "type": "object",
                          "properties": {
                            "type": {
                              "type": "string",
                              "description": "The data type of the parameter."
                            },
                            "description": {
                              "type": "string",
                              "description": "A description of the expected parameter."
                            }
                          },
                          "required": [
                            "type",
                            "description"
                          ]
                        }
                      }
                    },
                    "required": [
                      "type",
                      "properties"
                    ]
                  }
                },
                "required": [
                  "name",
                  "description",
                  "parameters"
                ]
              },
              {
                "properties": {
                  "type": {
                    "type": "string",
                    "description": "Specifies the type of tool (e.g., 'function')."
                  },
                  "function": {
                    "type": "object",
                    "description": "Details of the function tool.",
                    "properties": {
                      "name": {
                        "type": "string",
                        "description": "The name of the function."
                      },
                      "description": {
                        "type": "string",
                        "description": "A brief description of what the function does."
                      },
                      "parameters": {
                        "type": "object",
                        "description": "Schema defining the parameters accepted by the function.",
                        "properties": {
                          "type": {
                            "type": "string",
                            "description": "The type of the parameters object (usually 'object')."
                          },
                          "required": {
                            "type": "array",
                            "description": "List of required parameter names.",
                            "items": {
                              "type": "string"
                            }
                          },
                          "properties": {
                            "type": "object",
                            "description": "Definitions of each parameter.",
                            "additionalProperties": {
                              "type": "object",
                              "properties": {
                                "type": {
                                  "type": "string",
                                  "description": "The data type of the parameter."
                                },
                                "description": {
                                  "type": "string",
                                  "description": "A description of the expected parameter."
                                }
                              },
                              "required": [
                                "type",
                                "description"
                              ]
                            }
                          }
                        },
                        "required": [
                          "type",
                          "properties"
                        ]
                      }
                    },
                    "required": [
                      "name",
                      "description",
                      "parameters"
                    ]
                  }
                },
                "required": [
                  "type",
                  "function"
                ]
              }
            ]
          }
        },
        "response_format": {
          "title": "JSON Mode",
          "type": "object",
          "properties": {
            "type": {
              "type": "string",
              "enum": [
                "json_object",
                "json_schema"
              ]
            },
            "json_schema": {}
          }
        },
        "raw": {
          "type": "boolean",
          "default": false,
          "description": "If true, a chat template is not applied and you must adhere to the specific model's expected formatting."
        },
        "stream": {
          "type": "boolean",
          "default": false,
          "description": "If true, the response will be streamed back incrementally using SSE, Server Sent Events."
        },
        "max_tokens": {
          "type": "integer",
          "default": 256,
          "description": "The maximum number of tokens to generate in the response."
        },
        "temperature": {
          "type": "number",
          "default": 0.6,
          "minimum": 0,
          "maximum": 5,
          "description": "Controls the randomness of the output; higher values produce more random results."
        },
        "top_p": {
          "type": "number",
          "minimum": 0.001,
          "maximum": 1,
          "description": "Adjusts the creativity of the AI's responses by controlling how many possible words it considers. Lower values make outputs more predictable; higher values allow for more varied and creative responses."
        },
        "top_k": {
          "type": "integer",
          "minimum": 1,
          "maximum": 50,
          "description": "Limits the AI to choose from the top 'k' most probable words. Lower values make responses more focused; higher values introduce more variety and potential surprises."
        },
        "seed": {
          "type": "integer",
          "minimum": 1,
          "maximum": 9999999999,
          "description": "Random seed for reproducibility of the generation."
        },
        "repetition_penalty": {
          "type": "number",
          "minimum": 0,
          "maximum": 2,
          "description": "Penalty for repeated tokens; higher values discourage repetition."
        },
        "frequency_penalty": {
          "type": "number",
          "minimum": -2,
          "maximum": 2,
          "description": "Decreases the likelihood of the model repeating the same lines verbatim."
        },
        "presence_penalty": {
          "type": "number",
          "minimum": -2,
          "maximum": 2,
          "description": "Increases the likelihood of the model introducing new topics."
        }
      },
      "required": [
        "messages"
      ]
    }
  ]
}
```

**Example Request:**
```javascript
const response = await fetch(
  'https://api.cloudflare.com/client/v4/accounts/{account_id}/ai/run/@cf/qwen/qwen1.5-0.5b-chat',
  {
    method: 'POST',
    headers: {
      'Authorization': 'Bearer YOUR_API_TOKEN',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      "prompt": "Hello, how are you?"
})
  }
);

const result = await response.json();
console.log(result);
```

**Output Schema:**
```json
{
  "oneOf": [
    {
      "type": "object",
      "properties": {
        "response": {
          "type": "string",
          "description": "The generated text response from the model"
        },
        "usage": {
          "type": "object",
          "description": "Usage statistics for the inference request",
          "properties": {
            "prompt_tokens": {
              "type": "number",
              "description": "Total number of tokens in input",
              "default": 0
            },
            "completion_tokens": {
              "type": "number",
              "description": "Total number of tokens in output",
              "default": 0
            },
            "total_tokens": {
              "type": "number",
              "description": "Total number of input and output tokens",
              "default": 0
            }
          }
        },
        "tool_calls": {
          "type": "array",
          "description": "An array of tool calls requests made during the response generation",
          "items": {
            "type": "object",
            "properties": {
              "arguments": {
                "type": "object",
                "description": "The arguments passed to be passed to the tool call request"
              },
              "name": {
                "type": "string",
                "description": "The name of the tool to be called"
              }
            }
          }
        }
      },
      "required": [
        "response"
      ]
    },
    {
      "type": "string",
      "format": "binary"
    }
  ]
}
```

---

### @cf/google/gemma-2b-it-lora

**Input Schema:**
```json
{
  "type": "object",
  "oneOf": [
    {
      "title": "Prompt",
      "properties": {
        "prompt": {
          "type": "string",
          "minLength": 1,
          "description": "The input text prompt for the model to generate a response."
        },
        "lora": {
          "type": "string",
          "description": "Name of the LoRA (Low-Rank Adaptation) model to fine-tune the base model."
        },
        "response_format": {
          "title": "JSON Mode",
          "type": "object",
          "properties": {
            "type": {
              "type": "string",
              "enum": [
                "json_object",
                "json_schema"
              ]
            },
            "json_schema": {}
          }
        },
        "raw": {
          "type": "boolean",
          "default": false,
          "description": "If true, a chat template is not applied and you must adhere to the specific model's expected formatting."
        },
        "stream": {
          "type": "boolean",
          "default": false,
          "description": "If true, the response will be streamed back incrementally using SSE, Server Sent Events."
        },
        "max_tokens": {
          "type": "integer",
          "default": 256,
          "description": "The maximum number of tokens to generate in the response."
        },
        "temperature": {
          "type": "number",
          "default": 0.6,
          "minimum": 0,
          "maximum": 5,
          "description": "Controls the randomness of the output; higher values produce more random results."
        },
        "top_p": {
          "type": "number",
          "minimum": 0.001,
          "maximum": 1,
          "description": "Adjusts the creativity of the AI's responses by controlling how many possible words it considers. Lower values make outputs more predictable; higher values allow for more varied and creative responses."
        },
        "top_k": {
          "type": "integer",
          "minimum": 1,
          "maximum": 50,
          "description": "Limits the AI to choose from the top 'k' most probable words. Lower values make responses more focused; higher values introduce more variety and potential surprises."
        },
        "seed": {
          "type": "integer",
          "minimum": 1,
          "maximum": 9999999999,
          "description": "Random seed for reproducibility of the generation."
        },
        "repetition_penalty": {
          "type": "number",
          "minimum": 0,
          "maximum": 2,
          "description": "Penalty for repeated tokens; higher values discourage repetition."
        },
        "frequency_penalty": {
          "type": "number",
          "minimum": -2,
          "maximum": 2,
          "description": "Decreases the likelihood of the model repeating the same lines verbatim."
        },
        "presence_penalty": {
          "type": "number",
          "minimum": -2,
          "maximum": 2,
          "description": "Increases the likelihood of the model introducing new topics."
        }
      },
      "required": [
        "prompt"
      ]
    },
    {
      "title": "Messages",
      "properties": {
        "messages": {
          "type": "array",
          "description": "An array of message objects representing the conversation history.",
          "items": {
            "type": "object",
            "properties": {
              "role": {
                "type": "string",
                "description": "The role of the message sender (e.g., 'user', 'assistant', 'system', 'tool')."
              },
              "content": {
                "type": "string",
                "description": "The content of the message as a string."
              }
            },
            "required": [
              "role",
              "content"
            ]
          }
        },
        "functions": {
          "type": "array",
          "items": {
            "type": "object",
            "properties": {
              "name": {
                "type": "string"
              },
              "code": {
                "type": "string"
              }
            },
            "required": [
              "name",
              "code"
            ]
          }
        },
        "tools": {
          "type": "array",
          "description": "A list of tools available for the assistant to use.",
          "items": {
            "type": "object",
            "oneOf": [
              {
                "properties": {
                  "name": {
                    "type": "string",
                    "description": "The name of the tool. More descriptive the better."
                  },
                  "description": {
                    "type": "string",
                    "description": "A brief description of what the tool does."
                  },
                  "parameters": {
                    "type": "object",
                    "description": "Schema defining the parameters accepted by the tool.",
                    "properties": {
                      "type": {
                        "type": "string",
                        "description": "The type of the parameters object (usually 'object')."
                      },
                      "required": {
                        "type": "array",
                        "description": "List of required parameter names.",
                        "items": {
                          "type": "string"
                        }
                      },
                      "properties": {
                        "type": "object",
                        "description": "Definitions of each parameter.",
                        "additionalProperties": {
                          "type": "object",
                          "properties": {
                            "type": {
                              "type": "string",
                              "description": "The data type of the parameter."
                            },
                            "description": {
                              "type": "string",
                              "description": "A description of the expected parameter."
                            }
                          },
                          "required": [
                            "type",
                            "description"
                          ]
                        }
                      }
                    },
                    "required": [
                      "type",
                      "properties"
                    ]
                  }
                },
                "required": [
                  "name",
                  "description",
                  "parameters"
                ]
              },
              {
                "properties": {
                  "type": {
                    "type": "string",
                    "description": "Specifies the type of tool (e.g., 'function')."
                  },
                  "function": {
                    "type": "object",
                    "description": "Details of the function tool.",
                    "properties": {
                      "name": {
                        "type": "string",
                        "description": "The name of the function."
                      },
                      "description": {
                        "type": "string",
                        "description": "A brief description of what the function does."
                      },
                      "parameters": {
                        "type": "object",
                        "description": "Schema defining the parameters accepted by the function.",
                        "properties": {
                          "type": {
                            "type": "string",
                            "description": "The type of the parameters object (usually 'object')."
                          },
                          "required": {
                            "type": "array",
                            "description": "List of required parameter names.",
                            "items": {
                              "type": "string"
                            }
                          },
                          "properties": {
                            "type": "object",
                            "description": "Definitions of each parameter.",
                            "additionalProperties": {
                              "type": "object",
                              "properties": {
                                "type": {
                                  "type": "string",
                                  "description": "The data type of the parameter."
                                },
                                "description": {
                                  "type": "string",
                                  "description": "A description of the expected parameter."
                                }
                              },
                              "required": [
                                "type",
                                "description"
                              ]
                            }
                          }
                        },
                        "required": [
                          "type",
                          "properties"
                        ]
                      }
                    },
                    "required": [
                      "name",
                      "description",
                      "parameters"
                    ]
                  }
                },
                "required": [
                  "type",
                  "function"
                ]
              }
            ]
          }
        },
        "response_format": {
          "title": "JSON Mode",
          "type": "object",
          "properties": {
            "type": {
              "type": "string",
              "enum": [
                "json_object",
                "json_schema"
              ]
            },
            "json_schema": {}
          }
        },
        "raw": {
          "type": "boolean",
          "default": false,
          "description": "If true, a chat template is not applied and you must adhere to the specific model's expected formatting."
        },
        "stream": {
          "type": "boolean",
          "default": false,
          "description": "If true, the response will be streamed back incrementally using SSE, Server Sent Events."
        },
        "max_tokens": {
          "type": "integer",
          "default": 256,
          "description": "The maximum number of tokens to generate in the response."
        },
        "temperature": {
          "type": "number",
          "default": 0.6,
          "minimum": 0,
          "maximum": 5,
          "description": "Controls the randomness of the output; higher values produce more random results."
        },
        "top_p": {
          "type": "number",
          "minimum": 0.001,
          "maximum": 1,
          "description": "Adjusts the creativity of the AI's responses by controlling how many possible words it considers. Lower values make outputs more predictable; higher values allow for more varied and creative responses."
        },
        "top_k": {
          "type": "integer",
          "minimum": 1,
          "maximum": 50,
          "description": "Limits the AI to choose from the top 'k' most probable words. Lower values make responses more focused; higher values introduce more variety and potential surprises."
        },
        "seed": {
          "type": "integer",
          "minimum": 1,
          "maximum": 9999999999,
          "description": "Random seed for reproducibility of the generation."
        },
        "repetition_penalty": {
          "type": "number",
          "minimum": 0,
          "maximum": 2,
          "description": "Penalty for repeated tokens; higher values discourage repetition."
        },
        "frequency_penalty": {
          "type": "number",
          "minimum": -2,
          "maximum": 2,
          "description": "Decreases the likelihood of the model repeating the same lines verbatim."
        },
        "presence_penalty": {
          "type": "number",
          "minimum": -2,
          "maximum": 2,
          "description": "Increases the likelihood of the model introducing new topics."
        }
      },
      "required": [
        "messages"
      ]
    }
  ]
}
```

**Example Request:**
```javascript
const response = await fetch(
  'https://api.cloudflare.com/client/v4/accounts/{account_id}/ai/run/@cf/google/gemma-2b-it-lora',
  {
    method: 'POST',
    headers: {
      'Authorization': 'Bearer YOUR_API_TOKEN',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      "prompt": "Hello, how are you?"
})
  }
);

const result = await response.json();
console.log(result);
```

**Output Schema:**
```json
{
  "oneOf": [
    {
      "type": "object",
      "properties": {
        "response": {
          "type": "string",
          "description": "The generated text response from the model"
        },
        "usage": {
          "type": "object",
          "description": "Usage statistics for the inference request",
          "properties": {
            "prompt_tokens": {
              "type": "number",
              "description": "Total number of tokens in input",
              "default": 0
            },
            "completion_tokens": {
              "type": "number",
              "description": "Total number of tokens in output",
              "default": 0
            },
            "total_tokens": {
              "type": "number",
              "description": "Total number of input and output tokens",
              "default": 0
            }
          }
        },
        "tool_calls": {
          "type": "array",
          "description": "An array of tool calls requests made during the response generation",
          "items": {
            "type": "object",
            "properties": {
              "arguments": {
                "type": "object",
                "description": "The arguments passed to be passed to the tool call request"
              },
              "name": {
                "type": "string",
                "description": "The name of the tool to be called"
              }
            }
          }
        }
      },
      "required": [
        "response"
      ]
    },
    {
      "type": "string",
      "format": "binary"
    }
  ]
}
```

---

### @cf/meta/llama-3-8b-instruct

**Input Schema:**
```json
{
  "type": "object",
  "oneOf": [
    {
      "title": "Prompt",
      "properties": {
        "prompt": {
          "type": "string",
          "minLength": 1,
          "description": "The input text prompt for the model to generate a response."
        },
        "lora": {
          "type": "string",
          "description": "Name of the LoRA (Low-Rank Adaptation) model to fine-tune the base model."
        },
        "response_format": {
          "title": "JSON Mode",
          "type": "object",
          "properties": {
            "type": {
              "type": "string",
              "enum": [
                "json_object",
                "json_schema"
              ]
            },
            "json_schema": {}
          }
        },
        "raw": {
          "type": "boolean",
          "default": false,
          "description": "If true, a chat template is not applied and you must adhere to the specific model's expected formatting."
        },
        "stream": {
          "type": "boolean",
          "default": false,
          "description": "If true, the response will be streamed back incrementally using SSE, Server Sent Events."
        },
        "max_tokens": {
          "type": "integer",
          "default": 256,
          "description": "The maximum number of tokens to generate in the response."
        },
        "temperature": {
          "type": "number",
          "default": 0.6,
          "minimum": 0,
          "maximum": 5,
          "description": "Controls the randomness of the output; higher values produce more random results."
        },
        "top_p": {
          "type": "number",
          "minimum": 0.001,
          "maximum": 1,
          "description": "Adjusts the creativity of the AI's responses by controlling how many possible words it considers. Lower values make outputs more predictable; higher values allow for more varied and creative responses."
        },
        "top_k": {
          "type": "integer",
          "minimum": 1,
          "maximum": 50,
          "description": "Limits the AI to choose from the top 'k' most probable words. Lower values make responses more focused; higher values introduce more variety and potential surprises."
        },
        "seed": {
          "type": "integer",
          "minimum": 1,
          "maximum": 9999999999,
          "description": "Random seed for reproducibility of the generation."
        },
        "repetition_penalty": {
          "type": "number",
          "minimum": 0,
          "maximum": 2,
          "description": "Penalty for repeated tokens; higher values discourage repetition."
        },
        "frequency_penalty": {
          "type": "number",
          "minimum": -2,
          "maximum": 2,
          "description": "Decreases the likelihood of the model repeating the same lines verbatim."
        },
        "presence_penalty": {
          "type": "number",
          "minimum": -2,
          "maximum": 2,
          "description": "Increases the likelihood of the model introducing new topics."
        }
      },
      "required": [
        "prompt"
      ]
    },
    {
      "title": "Messages",
      "properties": {
        "messages": {
          "type": "array",
          "description": "An array of message objects representing the conversation history.",
          "items": {
            "type": "object",
            "properties": {
              "role": {
                "type": "string",
                "description": "The role of the message sender (e.g., 'user', 'assistant', 'system', 'tool')."
              },
              "content": {
                "type": "string",
                "description": "The content of the message as a string."
              }
            },
            "required": [
              "role",
              "content"
            ]
          }
        },
        "functions": {
          "type": "array",
          "items": {
            "type": "object",
            "properties": {
              "name": {
                "type": "string"
              },
              "code": {
                "type": "string"
              }
            },
            "required": [
              "name",
              "code"
            ]
          }
        },
        "tools": {
          "type": "array",
          "description": "A list of tools available for the assistant to use.",
          "items": {
            "type": "object",
            "oneOf": [
              {
                "properties": {
                  "name": {
                    "type": "string",
                    "description": "The name of the tool. More descriptive the better."
                  },
                  "description": {
                    "type": "string",
                    "description": "A brief description of what the tool does."
                  },
                  "parameters": {
                    "type": "object",
                    "description": "Schema defining the parameters accepted by the tool.",
                    "properties": {
                      "type": {
                        "type": "string",
                        "description": "The type of the parameters object (usually 'object')."
                      },
                      "required": {
                        "type": "array",
                        "description": "List of required parameter names.",
                        "items": {
                          "type": "string"
                        }
                      },
                      "properties": {
                        "type": "object",
                        "description": "Definitions of each parameter.",
                        "additionalProperties": {
                          "type": "object",
                          "properties": {
                            "type": {
                              "type": "string",
                              "description": "The data type of the parameter."
                            },
                            "description": {
                              "type": "string",
                              "description": "A description of the expected parameter."
                            }
                          },
                          "required": [
                            "type",
                            "description"
                          ]
                        }
                      }
                    },
                    "required": [
                      "type",
                      "properties"
                    ]
                  }
                },
                "required": [
                  "name",
                  "description",
                  "parameters"
                ]
              },
              {
                "properties": {
                  "type": {
                    "type": "string",
                    "description": "Specifies the type of tool (e.g., 'function')."
                  },
                  "function": {
                    "type": "object",
                    "description": "Details of the function tool.",
                    "properties": {
                      "name": {
                        "type": "string",
                        "description": "The name of the function."
                      },
                      "description": {
                        "type": "string",
                        "description": "A brief description of what the function does."
                      },
                      "parameters": {
                        "type": "object",
                        "description": "Schema defining the parameters accepted by the function.",
                        "properties": {
                          "type": {
                            "type": "string",
                            "description": "The type of the parameters object (usually 'object')."
                          },
                          "required": {
                            "type": "array",
                            "description": "List of required parameter names.",
                            "items": {
                              "type": "string"
                            }
                          },
                          "properties": {
                            "type": "object",
                            "description": "Definitions of each parameter.",
                            "additionalProperties": {
                              "type": "object",
                              "properties": {
                                "type": {
                                  "type": "string",
                                  "description": "The data type of the parameter."
                                },
                                "description": {
                                  "type": "string",
                                  "description": "A description of the expected parameter."
                                }
                              },
                              "required": [
                                "type",
                                "description"
                              ]
                            }
                          }
                        },
                        "required": [
                          "type",
                          "properties"
                        ]
                      }
                    },
                    "required": [
                      "name",
                      "description",
                      "parameters"
                    ]
                  }
                },
                "required": [
                  "type",
                  "function"
                ]
              }
            ]
          }
        },
        "response_format": {
          "title": "JSON Mode",
          "type": "object",
          "properties": {
            "type": {
              "type": "string",
              "enum": [
                "json_object",
                "json_schema"
              ]
            },
            "json_schema": {}
          }
        },
        "raw": {
          "type": "boolean",
          "default": false,
          "description": "If true, a chat template is not applied and you must adhere to the specific model's expected formatting."
        },
        "stream": {
          "type": "boolean",
          "default": false,
          "description": "If true, the response will be streamed back incrementally using SSE, Server Sent Events."
        },
        "max_tokens": {
          "type": "integer",
          "default": 256,
          "description": "The maximum number of tokens to generate in the response."
        },
        "temperature": {
          "type": "number",
          "default": 0.6,
          "minimum": 0,
          "maximum": 5,
          "description": "Controls the randomness of the output; higher values produce more random results."
        },
        "top_p": {
          "type": "number",
          "minimum": 0.001,
          "maximum": 1,
          "description": "Adjusts the creativity of the AI's responses by controlling how many possible words it considers. Lower values make outputs more predictable; higher values allow for more varied and creative responses."
        },
        "top_k": {
          "type": "integer",
          "minimum": 1,
          "maximum": 50,
          "description": "Limits the AI to choose from the top 'k' most probable words. Lower values make responses more focused; higher values introduce more variety and potential surprises."
        },
        "seed": {
          "type": "integer",
          "minimum": 1,
          "maximum": 9999999999,
          "description": "Random seed for reproducibility of the generation."
        },
        "repetition_penalty": {
          "type": "number",
          "minimum": 0,
          "maximum": 2,
          "description": "Penalty for repeated tokens; higher values discourage repetition."
        },
        "frequency_penalty": {
          "type": "number",
          "minimum": -2,
          "maximum": 2,
          "description": "Decreases the likelihood of the model repeating the same lines verbatim."
        },
        "presence_penalty": {
          "type": "number",
          "minimum": -2,
          "maximum": 2,
          "description": "Increases the likelihood of the model introducing new topics."
        }
      },
      "required": [
        "messages"
      ]
    }
  ]
}
```

**Example Request:**
```javascript
const response = await fetch(
  'https://api.cloudflare.com/client/v4/accounts/{account_id}/ai/run/@cf/meta/llama-3-8b-instruct',
  {
    method: 'POST',
    headers: {
      'Authorization': 'Bearer YOUR_API_TOKEN',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      "prompt": "Hello, how are you?"
})
  }
);

const result = await response.json();
console.log(result);
```

**Output Schema:**
```json
{
  "oneOf": [
    {
      "type": "object",
      "properties": {
        "response": {
          "type": "string",
          "description": "The generated text response from the model"
        },
        "usage": {
          "type": "object",
          "description": "Usage statistics for the inference request",
          "properties": {
            "prompt_tokens": {
              "type": "number",
              "description": "Total number of tokens in input",
              "default": 0
            },
            "completion_tokens": {
              "type": "number",
              "description": "Total number of tokens in output",
              "default": 0
            },
            "total_tokens": {
              "type": "number",
              "description": "Total number of input and output tokens",
              "default": 0
            }
          }
        },
        "tool_calls": {
          "type": "array",
          "description": "An array of tool calls requests made during the response generation",
          "items": {
            "type": "object",
            "properties": {
              "arguments": {
                "type": "object",
                "description": "The arguments passed to be passed to the tool call request"
              },
              "name": {
                "type": "string",
                "description": "The name of the tool to be called"
              }
            }
          }
        }
      },
      "required": [
        "response"
      ]
    },
    {
      "type": "string",
      "format": "binary"
    }
  ]
}
```

---

### @cf/meta/llama-3.2-3b-instruct

**Input Schema:**
```json
{
  "type": "object",
  "oneOf": [
    {
      "title": "Prompt",
      "properties": {
        "prompt": {
          "type": "string",
          "minLength": 1,
          "description": "The input text prompt for the model to generate a response."
        },
        "lora": {
          "type": "string",
          "description": "Name of the LoRA (Low-Rank Adaptation) model to fine-tune the base model."
        },
        "response_format": {
          "title": "JSON Mode",
          "type": "object",
          "properties": {
            "type": {
              "type": "string",
              "enum": [
                "json_object",
                "json_schema"
              ]
            },
            "json_schema": {}
          }
        },
        "raw": {
          "type": "boolean",
          "default": false,
          "description": "If true, a chat template is not applied and you must adhere to the specific model's expected formatting."
        },
        "stream": {
          "type": "boolean",
          "default": false,
          "description": "If true, the response will be streamed back incrementally using SSE, Server Sent Events."
        },
        "max_tokens": {
          "type": "integer",
          "default": 256,
          "description": "The maximum number of tokens to generate in the response."
        },
        "temperature": {
          "type": "number",
          "default": 0.6,
          "minimum": 0,
          "maximum": 5,
          "description": "Controls the randomness of the output; higher values produce more random results."
        },
        "top_p": {
          "type": "number",
          "minimum": 0.001,
          "maximum": 1,
          "description": "Adjusts the creativity of the AI's responses by controlling how many possible words it considers. Lower values make outputs more predictable; higher values allow for more varied and creative responses."
        },
        "top_k": {
          "type": "integer",
          "minimum": 1,
          "maximum": 50,
          "description": "Limits the AI to choose from the top 'k' most probable words. Lower values make responses more focused; higher values introduce more variety and potential surprises."
        },
        "seed": {
          "type": "integer",
          "minimum": 1,
          "maximum": 9999999999,
          "description": "Random seed for reproducibility of the generation."
        },
        "repetition_penalty": {
          "type": "number",
          "minimum": 0,
          "maximum": 2,
          "description": "Penalty for repeated tokens; higher values discourage repetition."
        },
        "frequency_penalty": {
          "type": "number",
          "minimum": -2,
          "maximum": 2,
          "description": "Decreases the likelihood of the model repeating the same lines verbatim."
        },
        "presence_penalty": {
          "type": "number",
          "minimum": -2,
          "maximum": 2,
          "description": "Increases the likelihood of the model introducing new topics."
        }
      },
      "required": [
        "prompt"
      ]
    },
    {
      "title": "Messages",
      "properties": {
        "messages": {
          "type": "array",
          "description": "An array of message objects representing the conversation history.",
          "items": {
            "type": "object",
            "properties": {
              "role": {
                "type": "string",
                "description": "The role of the message sender (e.g., 'user', 'assistant', 'system', 'tool')."
              },
              "content": {
                "type": "string",
                "description": "The content of the message as a string."
              }
            },
            "required": [
              "role",
              "content"
            ]
          }
        },
        "functions": {
          "type": "array",
          "items": {
            "type": "object",
            "properties": {
              "name": {
                "type": "string"
              },
              "code": {
                "type": "string"
              }
            },
            "required": [
              "name",
              "code"
            ]
          }
        },
        "tools": {
          "type": "array",
          "description": "A list of tools available for the assistant to use.",
          "items": {
            "type": "object",
            "oneOf": [
              {
                "properties": {
                  "name": {
                    "type": "string",
                    "description": "The name of the tool. More descriptive the better."
                  },
                  "description": {
                    "type": "string",
                    "description": "A brief description of what the tool does."
                  },
                  "parameters": {
                    "type": "object",
                    "description": "Schema defining the parameters accepted by the tool.",
                    "properties": {
                      "type": {
                        "type": "string",
                        "description": "The type of the parameters object (usually 'object')."
                      },
                      "required": {
                        "type": "array",
                        "description": "List of required parameter names.",
                        "items": {
                          "type": "string"
                        }
                      },
                      "properties": {
                        "type": "object",
                        "description": "Definitions of each parameter.",
                        "additionalProperties": {
                          "type": "object",
                          "properties": {
                            "type": {
                              "type": "string",
                              "description": "The data type of the parameter."
                            },
                            "description": {
                              "type": "string",
                              "description": "A description of the expected parameter."
                            }
                          },
                          "required": [
                            "type",
                            "description"
                          ]
                        }
                      }
                    },
                    "required": [
                      "type",
                      "properties"
                    ]
                  }
                },
                "required": [
                  "name",
                  "description",
                  "parameters"
                ]
              },
              {
                "properties": {
                  "type": {
                    "type": "string",
                    "description": "Specifies the type of tool (e.g., 'function')."
                  },
                  "function": {
                    "type": "object",
                    "description": "Details of the function tool.",
                    "properties": {
                      "name": {
                        "type": "string",
                        "description": "The name of the function."
                      },
                      "description": {
                        "type": "string",
                        "description": "A brief description of what the function does."
                      },
                      "parameters": {
                        "type": "object",
                        "description": "Schema defining the parameters accepted by the function.",
                        "properties": {
                          "type": {
                            "type": "string",
                            "description": "The type of the parameters object (usually 'object')."
                          },
                          "required": {
                            "type": "array",
                            "description": "List of required parameter names.",
                            "items": {
                              "type": "string"
                            }
                          },
                          "properties": {
                            "type": "object",
                            "description": "Definitions of each parameter.",
                            "additionalProperties": {
                              "type": "object",
                              "properties": {
                                "type": {
                                  "type": "string",
                                  "description": "The data type of the parameter."
                                },
                                "description": {
                                  "type": "string",
                                  "description": "A description of the expected parameter."
                                }
                              },
                              "required": [
                                "type",
                                "description"
                              ]
                            }
                          }
                        },
                        "required": [
                          "type",
                          "properties"
                        ]
                      }
                    },
                    "required": [
                      "name",
                      "description",
                      "parameters"
                    ]
                  }
                },
                "required": [
                  "type",
                  "function"
                ]
              }
            ]
          }
        },
        "response_format": {
          "title": "JSON Mode",
          "type": "object",
          "properties": {
            "type": {
              "type": "string",
              "enum": [
                "json_object",
                "json_schema"
              ]
            },
            "json_schema": {}
          }
        },
        "raw": {
          "type": "boolean",
          "default": false,
          "description": "If true, a chat template is not applied and you must adhere to the specific model's expected formatting."
        },
        "stream": {
          "type": "boolean",
          "default": false,
          "description": "If true, the response will be streamed back incrementally using SSE, Server Sent Events."
        },
        "max_tokens": {
          "type": "integer",
          "default": 256,
          "description": "The maximum number of tokens to generate in the response."
        },
        "temperature": {
          "type": "number",
          "default": 0.6,
          "minimum": 0,
          "maximum": 5,
          "description": "Controls the randomness of the output; higher values produce more random results."
        },
        "top_p": {
          "type": "number",
          "minimum": 0.001,
          "maximum": 1,
          "description": "Adjusts the creativity of the AI's responses by controlling how many possible words it considers. Lower values make outputs more predictable; higher values allow for more varied and creative responses."
        },
        "top_k": {
          "type": "integer",
          "minimum": 1,
          "maximum": 50,
          "description": "Limits the AI to choose from the top 'k' most probable words. Lower values make responses more focused; higher values introduce more variety and potential surprises."
        },
        "seed": {
          "type": "integer",
          "minimum": 1,
          "maximum": 9999999999,
          "description": "Random seed for reproducibility of the generation."
        },
        "repetition_penalty": {
          "type": "number",
          "minimum": 0,
          "maximum": 2,
          "description": "Penalty for repeated tokens; higher values discourage repetition."
        },
        "frequency_penalty": {
          "type": "number",
          "minimum": -2,
          "maximum": 2,
          "description": "Decreases the likelihood of the model repeating the same lines verbatim."
        },
        "presence_penalty": {
          "type": "number",
          "minimum": -2,
          "maximum": 2,
          "description": "Increases the likelihood of the model introducing new topics."
        }
      },
      "required": [
        "messages"
      ]
    }
  ]
}
```

**Example Request:**
```javascript
const response = await fetch(
  'https://api.cloudflare.com/client/v4/accounts/{account_id}/ai/run/@cf/meta/llama-3.2-3b-instruct',
  {
    method: 'POST',
    headers: {
      'Authorization': 'Bearer YOUR_API_TOKEN',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      "prompt": "Hello, how are you?"
})
  }
);

const result = await response.json();
console.log(result);
```

**Output Schema:**
```json
{
  "oneOf": [
    {
      "type": "object",
      "properties": {
        "response": {
          "type": "string",
          "description": "The generated text response from the model"
        },
        "usage": {
          "type": "object",
          "description": "Usage statistics for the inference request",
          "properties": {
            "prompt_tokens": {
              "type": "number",
              "description": "Total number of tokens in input",
              "default": 0
            },
            "completion_tokens": {
              "type": "number",
              "description": "Total number of tokens in output",
              "default": 0
            },
            "total_tokens": {
              "type": "number",
              "description": "Total number of input and output tokens",
              "default": 0
            }
          }
        },
        "tool_calls": {
          "type": "array",
          "description": "An array of tool calls requests made during the response generation",
          "items": {
            "type": "object",
            "properties": {
              "arguments": {
                "type": "object",
                "description": "The arguments passed to be passed to the tool call request"
              },
              "name": {
                "type": "string",
                "description": "The name of the tool to be called"
              }
            }
          }
        }
      },
      "required": [
        "response"
      ]
    },
    {
      "type": "string",
      "format": "binary"
    }
  ]
}
```

---

### @cf/meta/llama-guard-3-8b

**Input Schema:**
```json
{
  "type": "object",
  "properties": {
    "messages": {
      "type": "array",
      "description": "An array of message objects representing the conversation history.",
      "items": {
        "type": "object",
        "properties": {
          "role": {
            "enum": [
              "user",
              "assistant"
            ],
            "description": "The role of the message sender must alternate between 'user' and 'assistant'."
          },
          "content": {
            "type": "string",
            "description": "The content of the message as a string."
          }
        },
        "required": [
          "role",
          "content"
        ]
      }
    },
    "max_tokens": {
      "type": "integer",
      "default": 256,
      "description": "The maximum number of tokens to generate in the response."
    },
    "temperature": {
      "type": "number",
      "default": 0.6,
      "minimum": 0,
      "maximum": 5,
      "description": "Controls the randomness of the output; higher values produce more random results."
    },
    "response_format": {
      "type": "object",
      "description": "Dictate the output format of the generated response.",
      "properties": {
        "type": {
          "type": "string",
          "description": "Set to json_object to process and output generated text as JSON."
        }
      }
    }
  },
  "required": [
    "messages"
  ]
}
```

**Example Request:**
```javascript
const response = await fetch(
  'https://api.cloudflare.com/client/v4/accounts/{account_id}/ai/run/@cf/meta/llama-guard-3-8b',
  {
    method: 'POST',
    headers: {
      'Authorization': 'Bearer YOUR_API_TOKEN',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      "messages": [
            {
                  "role": "user",
                  "content": "Hello!"
            }
      ],
      "max_tokens": 256,
      "temperature": 0.6,
      "response_format": {}
})
  }
);

const result = await response.json();
console.log(result);
```

**Output Schema:**
```json
{
  "type": "object",
  "contentType": "application/json",
  "properties": {
    "response": {
      "oneOf": [
        {
          "type": "string",
          "description": "The generated text response from the model."
        },
        {
          "type": "object",
          "description": "The json response parsed from the generated text response from the model.",
          "properties": {
            "safe": {
              "type": "boolean",
              "description": "Whether the conversation is safe or not."
            },
            "categories": {
              "type": "array",
              "description": "A list of what hazard categories predicted for the conversation, if the conversation is deemed unsafe.",
              "items": {
                "type": "string",
                "description": "Hazard category classname, from S1 to S14."
              }
            }
          }
        }
      ]
    },
    "usage": {
      "type": "object",
      "description": "Usage statistics for the inference request",
      "properties": {
        "prompt_tokens": {
          "type": "number",
          "description": "Total number of tokens in input",
          "default": 0
        },
        "completion_tokens": {
          "type": "number",
          "description": "Total number of tokens in output",
          "default": 0
        },
        "total_tokens": {
          "type": "number",
          "description": "Total number of input and output tokens",
          "default": 0
        }
      }
    }
  }
}
```

---

### @cf/meta/llama-2-7b-chat-fp16

**Input Schema:**
```json
{
  "type": "object",
  "oneOf": [
    {
      "title": "Prompt",
      "properties": {
        "prompt": {
          "type": "string",
          "minLength": 1,
          "description": "The input text prompt for the model to generate a response."
        },
        "lora": {
          "type": "string",
          "description": "Name of the LoRA (Low-Rank Adaptation) model to fine-tune the base model."
        },
        "response_format": {
          "title": "JSON Mode",
          "type": "object",
          "properties": {
            "type": {
              "type": "string",
              "enum": [
                "json_object",
                "json_schema"
              ]
            },
            "json_schema": {}
          }
        },
        "raw": {
          "type": "boolean",
          "default": false,
          "description": "If true, a chat template is not applied and you must adhere to the specific model's expected formatting."
        },
        "stream": {
          "type": "boolean",
          "default": false,
          "description": "If true, the response will be streamed back incrementally using SSE, Server Sent Events."
        },
        "max_tokens": {
          "type": "integer",
          "default": 256,
          "description": "The maximum number of tokens to generate in the response."
        },
        "temperature": {
          "type": "number",
          "default": 0.6,
          "minimum": 0,
          "maximum": 5,
          "description": "Controls the randomness of the output; higher values produce more random results."
        },
        "top_p": {
          "type": "number",
          "minimum": 0.001,
          "maximum": 1,
          "description": "Adjusts the creativity of the AI's responses by controlling how many possible words it considers. Lower values make outputs more predictable; higher values allow for more varied and creative responses."
        },
        "top_k": {
          "type": "integer",
          "minimum": 1,
          "maximum": 50,
          "description": "Limits the AI to choose from the top 'k' most probable words. Lower values make responses more focused; higher values introduce more variety and potential surprises."
        },
        "seed": {
          "type": "integer",
          "minimum": 1,
          "maximum": 9999999999,
          "description": "Random seed for reproducibility of the generation."
        },
        "repetition_penalty": {
          "type": "number",
          "minimum": 0,
          "maximum": 2,
          "description": "Penalty for repeated tokens; higher values discourage repetition."
        },
        "frequency_penalty": {
          "type": "number",
          "minimum": -2,
          "maximum": 2,
          "description": "Decreases the likelihood of the model repeating the same lines verbatim."
        },
        "presence_penalty": {
          "type": "number",
          "minimum": -2,
          "maximum": 2,
          "description": "Increases the likelihood of the model introducing new topics."
        }
      },
      "required": [
        "prompt"
      ]
    },
    {
      "title": "Messages",
      "properties": {
        "messages": {
          "type": "array",
          "description": "An array of message objects representing the conversation history.",
          "items": {
            "type": "object",
            "properties": {
              "role": {
                "type": "string",
                "description": "The role of the message sender (e.g., 'user', 'assistant', 'system', 'tool')."
              },
              "content": {
                "type": "string",
                "description": "The content of the message as a string."
              }
            },
            "required": [
              "role",
              "content"
            ]
          }
        },
        "functions": {
          "type": "array",
          "items": {
            "type": "object",
            "properties": {
              "name": {
                "type": "string"
              },
              "code": {
                "type": "string"
              }
            },
            "required": [
              "name",
              "code"
            ]
          }
        },
        "tools": {
          "type": "array",
          "description": "A list of tools available for the assistant to use.",
          "items": {
            "type": "object",
            "oneOf": [
              {
                "properties": {
                  "name": {
                    "type": "string",
                    "description": "The name of the tool. More descriptive the better."
                  },
                  "description": {
                    "type": "string",
                    "description": "A brief description of what the tool does."
                  },
                  "parameters": {
                    "type": "object",
                    "description": "Schema defining the parameters accepted by the tool.",
                    "properties": {
                      "type": {
                        "type": "string",
                        "description": "The type of the parameters object (usually 'object')."
                      },
                      "required": {
                        "type": "array",
                        "description": "List of required parameter names.",
                        "items": {
                          "type": "string"
                        }
                      },
                      "properties": {
                        "type": "object",
                        "description": "Definitions of each parameter.",
                        "additionalProperties": {
                          "type": "object",
                          "properties": {
                            "type": {
                              "type": "string",
                              "description": "The data type of the parameter."
                            },
                            "description": {
                              "type": "string",
                              "description": "A description of the expected parameter."
                            }
                          },
                          "required": [
                            "type",
                            "description"
                          ]
                        }
                      }
                    },
                    "required": [
                      "type",
                      "properties"
                    ]
                  }
                },
                "required": [
                  "name",
                  "description",
                  "parameters"
                ]
              },
              {
                "properties": {
                  "type": {
                    "type": "string",
                    "description": "Specifies the type of tool (e.g., 'function')."
                  },
                  "function": {
                    "type": "object",
                    "description": "Details of the function tool.",
                    "properties": {
                      "name": {
                        "type": "string",
                        "description": "The name of the function."
                      },
                      "description": {
                        "type": "string",
                        "description": "A brief description of what the function does."
                      },
                      "parameters": {
                        "type": "object",
                        "description": "Schema defining the parameters accepted by the function.",
                        "properties": {
                          "type": {
                            "type": "string",
                            "description": "The type of the parameters object (usually 'object')."
                          },
                          "required": {
                            "type": "array",
                            "description": "List of required parameter names.",
                            "items": {
                              "type": "string"
                            }
                          },
                          "properties": {
                            "type": "object",
                            "description": "Definitions of each parameter.",
                            "additionalProperties": {
                              "type": "object",
                              "properties": {
                                "type": {
                                  "type": "string",
                                  "description": "The data type of the parameter."
                                },
                                "description": {
                                  "type": "string",
                                  "description": "A description of the expected parameter."
                                }
                              },
                              "required": [
                                "type",
                                "description"
                              ]
                            }
                          }
                        },
                        "required": [
                          "type",
                          "properties"
                        ]
                      }
                    },
                    "required": [
                      "name",
                      "description",
                      "parameters"
                    ]
                  }
                },
                "required": [
                  "type",
                  "function"
                ]
              }
            ]
          }
        },
        "response_format": {
          "title": "JSON Mode",
          "type": "object",
          "properties": {
            "type": {
              "type": "string",
              "enum": [
                "json_object",
                "json_schema"
              ]
            },
            "json_schema": {}
          }
        },
        "raw": {
          "type": "boolean",
          "default": false,
          "description": "If true, a chat template is not applied and you must adhere to the specific model's expected formatting."
        },
        "stream": {
          "type": "boolean",
          "default": false,
          "description": "If true, the response will be streamed back incrementally using SSE, Server Sent Events."
        },
        "max_tokens": {
          "type": "integer",
          "default": 256,
          "description": "The maximum number of tokens to generate in the response."
        },
        "temperature": {
          "type": "number",
          "default": 0.6,
          "minimum": 0,
          "maximum": 5,
          "description": "Controls the randomness of the output; higher values produce more random results."
        },
        "top_p": {
          "type": "number",
          "minimum": 0.001,
          "maximum": 1,
          "description": "Adjusts the creativity of the AI's responses by controlling how many possible words it considers. Lower values make outputs more predictable; higher values allow for more varied and creative responses."
        },
        "top_k": {
          "type": "integer",
          "minimum": 1,
          "maximum": 50,
          "description": "Limits the AI to choose from the top 'k' most probable words. Lower values make responses more focused; higher values introduce more variety and potential surprises."
        },
        "seed": {
          "type": "integer",
          "minimum": 1,
          "maximum": 9999999999,
          "description": "Random seed for reproducibility of the generation."
        },
        "repetition_penalty": {
          "type": "number",
          "minimum": 0,
          "maximum": 2,
          "description": "Penalty for repeated tokens; higher values discourage repetition."
        },
        "frequency_penalty": {
          "type": "number",
          "minimum": -2,
          "maximum": 2,
          "description": "Decreases the likelihood of the model repeating the same lines verbatim."
        },
        "presence_penalty": {
          "type": "number",
          "minimum": -2,
          "maximum": 2,
          "description": "Increases the likelihood of the model introducing new topics."
        }
      },
      "required": [
        "messages"
      ]
    }
  ]
}
```

**Example Request:**
```javascript
const response = await fetch(
  'https://api.cloudflare.com/client/v4/accounts/{account_id}/ai/run/@cf/meta/llama-2-7b-chat-fp16',
  {
    method: 'POST',
    headers: {
      'Authorization': 'Bearer YOUR_API_TOKEN',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      "prompt": "Hello, how are you?"
})
  }
);

const result = await response.json();
console.log(result);
```

**Output Schema:**
```json
{
  "oneOf": [
    {
      "type": "object",
      "properties": {
        "response": {
          "type": "string",
          "description": "The generated text response from the model"
        },
        "usage": {
          "type": "object",
          "description": "Usage statistics for the inference request",
          "properties": {
            "prompt_tokens": {
              "type": "number",
              "description": "Total number of tokens in input",
              "default": 0
            },
            "completion_tokens": {
              "type": "number",
              "description": "Total number of tokens in output",
              "default": 0
            },
            "total_tokens": {
              "type": "number",
              "description": "Total number of input and output tokens",
              "default": 0
            }
          }
        },
        "tool_calls": {
          "type": "array",
          "description": "An array of tool calls requests made during the response generation",
          "items": {
            "type": "object",
            "properties": {
              "arguments": {
                "type": "object",
                "description": "The arguments passed to be passed to the tool call request"
              },
              "name": {
                "type": "string",
                "description": "The name of the tool to be called"
              }
            }
          }
        }
      },
      "required": [
        "response"
      ]
    },
    {
      "type": "string",
      "format": "binary"
    }
  ]
}
```

---

### @cf/mistral/mistral-7b-instruct-v0.1

**Input Schema:**
```json
{
  "type": "object",
  "oneOf": [
    {
      "title": "Prompt",
      "properties": {
        "prompt": {
          "type": "string",
          "minLength": 1,
          "description": "The input text prompt for the model to generate a response."
        },
        "lora": {
          "type": "string",
          "description": "Name of the LoRA (Low-Rank Adaptation) model to fine-tune the base model."
        },
        "response_format": {
          "title": "JSON Mode",
          "type": "object",
          "properties": {
            "type": {
              "type": "string",
              "enum": [
                "json_object",
                "json_schema"
              ]
            },
            "json_schema": {}
          }
        },
        "raw": {
          "type": "boolean",
          "default": false,
          "description": "If true, a chat template is not applied and you must adhere to the specific model's expected formatting."
        },
        "stream": {
          "type": "boolean",
          "default": false,
          "description": "If true, the response will be streamed back incrementally using SSE, Server Sent Events."
        },
        "max_tokens": {
          "type": "integer",
          "default": 256,
          "description": "The maximum number of tokens to generate in the response."
        },
        "temperature": {
          "type": "number",
          "default": 0.6,
          "minimum": 0,
          "maximum": 5,
          "description": "Controls the randomness of the output; higher values produce more random results."
        },
        "top_p": {
          "type": "number",
          "minimum": 0.001,
          "maximum": 1,
          "description": "Adjusts the creativity of the AI's responses by controlling how many possible words it considers. Lower values make outputs more predictable; higher values allow for more varied and creative responses."
        },
        "top_k": {
          "type": "integer",
          "minimum": 1,
          "maximum": 50,
          "description": "Limits the AI to choose from the top 'k' most probable words. Lower values make responses more focused; higher values introduce more variety and potential surprises."
        },
        "seed": {
          "type": "integer",
          "minimum": 1,
          "maximum": 9999999999,
          "description": "Random seed for reproducibility of the generation."
        },
        "repetition_penalty": {
          "type": "number",
          "minimum": 0,
          "maximum": 2,
          "description": "Penalty for repeated tokens; higher values discourage repetition."
        },
        "frequency_penalty": {
          "type": "number",
          "minimum": -2,
          "maximum": 2,
          "description": "Decreases the likelihood of the model repeating the same lines verbatim."
        },
        "presence_penalty": {
          "type": "number",
          "minimum": -2,
          "maximum": 2,
          "description": "Increases the likelihood of the model introducing new topics."
        }
      },
      "required": [
        "prompt"
      ]
    },
    {
      "title": "Messages",
      "properties": {
        "messages": {
          "type": "array",
          "description": "An array of message objects representing the conversation history.",
          "items": {
            "type": "object",
            "properties": {
              "role": {
                "type": "string",
                "description": "The role of the message sender (e.g., 'user', 'assistant', 'system', 'tool')."
              },
              "content": {
                "type": "string",
                "description": "The content of the message as a string."
              }
            },
            "required": [
              "role",
              "content"
            ]
          }
        },
        "functions": {
          "type": "array",
          "items": {
            "type": "object",
            "properties": {
              "name": {
                "type": "string"
              },
              "code": {
                "type": "string"
              }
            },
            "required": [
              "name",
              "code"
            ]
          }
        },
        "tools": {
          "type": "array",
          "description": "A list of tools available for the assistant to use.",
          "items": {
            "type": "object",
            "oneOf": [
              {
                "properties": {
                  "name": {
                    "type": "string",
                    "description": "The name of the tool. More descriptive the better."
                  },
                  "description": {
                    "type": "string",
                    "description": "A brief description of what the tool does."
                  },
                  "parameters": {
                    "type": "object",
                    "description": "Schema defining the parameters accepted by the tool.",
                    "properties": {
                      "type": {
                        "type": "string",
                        "description": "The type of the parameters object (usually 'object')."
                      },
                      "required": {
                        "type": "array",
                        "description": "List of required parameter names.",
                        "items": {
                          "type": "string"
                        }
                      },
                      "properties": {
                        "type": "object",
                        "description": "Definitions of each parameter.",
                        "additionalProperties": {
                          "type": "object",
                          "properties": {
                            "type": {
                              "type": "string",
                              "description": "The data type of the parameter."
                            },
                            "description": {
                              "type": "string",
                              "description": "A description of the expected parameter."
                            }
                          },
                          "required": [
                            "type",
                            "description"
                          ]
                        }
                      }
                    },
                    "required": [
                      "type",
                      "properties"
                    ]
                  }
                },
                "required": [
                  "name",
                  "description",
                  "parameters"
                ]
              },
              {
                "properties": {
                  "type": {
                    "type": "string",
                    "description": "Specifies the type of tool (e.g., 'function')."
                  },
                  "function": {
                    "type": "object",
                    "description": "Details of the function tool.",
                    "properties": {
                      "name": {
                        "type": "string",
                        "description": "The name of the function."
                      },
                      "description": {
                        "type": "string",
                        "description": "A brief description of what the function does."
                      },
                      "parameters": {
                        "type": "object",
                        "description": "Schema defining the parameters accepted by the function.",
                        "properties": {
                          "type": {
                            "type": "string",
                            "description": "The type of the parameters object (usually 'object')."
                          },
                          "required": {
                            "type": "array",
                            "description": "List of required parameter names.",
                            "items": {
                              "type": "string"
                            }
                          },
                          "properties": {
                            "type": "object",
                            "description": "Definitions of each parameter.",
                            "additionalProperties": {
                              "type": "object",
                              "properties": {
                                "type": {
                                  "type": "string",
                                  "description": "The data type of the parameter."
                                },
                                "description": {
                                  "type": "string",
                                  "description": "A description of the expected parameter."
                                }
                              },
                              "required": [
                                "type",
                                "description"
                              ]
                            }
                          }
                        },
                        "required": [
                          "type",
                          "properties"
                        ]
                      }
                    },
                    "required": [
                      "name",
                      "description",
                      "parameters"
                    ]
                  }
                },
                "required": [
                  "type",
                  "function"
                ]
              }
            ]
          }
        },
        "response_format": {
          "title": "JSON Mode",
          "type": "object",
          "properties": {
            "type": {
              "type": "string",
              "enum": [
                "json_object",
                "json_schema"
              ]
            },
            "json_schema": {}
          }
        },
        "raw": {
          "type": "boolean",
          "default": false,
          "description": "If true, a chat template is not applied and you must adhere to the specific model's expected formatting."
        },
        "stream": {
          "type": "boolean",
          "default": false,
          "description": "If true, the response will be streamed back incrementally using SSE, Server Sent Events."
        },
        "max_tokens": {
          "type": "integer",
          "default": 256,
          "description": "The maximum number of tokens to generate in the response."
        },
        "temperature": {
          "type": "number",
          "default": 0.6,
          "minimum": 0,
          "maximum": 5,
          "description": "Controls the randomness of the output; higher values produce more random results."
        },
        "top_p": {
          "type": "number",
          "minimum": 0.001,
          "maximum": 1,
          "description": "Adjusts the creativity of the AI's responses by controlling how many possible words it considers. Lower values make outputs more predictable; higher values allow for more varied and creative responses."
        },
        "top_k": {
          "type": "integer",
          "minimum": 1,
          "maximum": 50,
          "description": "Limits the AI to choose from the top 'k' most probable words. Lower values make responses more focused; higher values introduce more variety and potential surprises."
        },
        "seed": {
          "type": "integer",
          "minimum": 1,
          "maximum": 9999999999,
          "description": "Random seed for reproducibility of the generation."
        },
        "repetition_penalty": {
          "type": "number",
          "minimum": 0,
          "maximum": 2,
          "description": "Penalty for repeated tokens; higher values discourage repetition."
        },
        "frequency_penalty": {
          "type": "number",
          "minimum": -2,
          "maximum": 2,
          "description": "Decreases the likelihood of the model repeating the same lines verbatim."
        },
        "presence_penalty": {
          "type": "number",
          "minimum": -2,
          "maximum": 2,
          "description": "Increases the likelihood of the model introducing new topics."
        }
      },
      "required": [
        "messages"
      ]
    }
  ]
}
```

**Example Request:**
```javascript
const response = await fetch(
  'https://api.cloudflare.com/client/v4/accounts/{account_id}/ai/run/@cf/mistral/mistral-7b-instruct-v0.1',
  {
    method: 'POST',
    headers: {
      'Authorization': 'Bearer YOUR_API_TOKEN',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      "prompt": "Hello, how are you?"
})
  }
);

const result = await response.json();
console.log(result);
```

**Output Schema:**
```json
{
  "oneOf": [
    {
      "type": "object",
      "properties": {
        "response": {
          "type": "string",
          "description": "The generated text response from the model"
        },
        "usage": {
          "type": "object",
          "description": "Usage statistics for the inference request",
          "properties": {
            "prompt_tokens": {
              "type": "number",
              "description": "Total number of tokens in input",
              "default": 0
            },
            "completion_tokens": {
              "type": "number",
              "description": "Total number of tokens in output",
              "default": 0
            },
            "total_tokens": {
              "type": "number",
              "description": "Total number of input and output tokens",
              "default": 0
            }
          }
        },
        "tool_calls": {
          "type": "array",
          "description": "An array of tool calls requests made during the response generation",
          "items": {
            "type": "object",
            "properties": {
              "arguments": {
                "type": "object",
                "description": "The arguments passed to be passed to the tool call request"
              },
              "name": {
                "type": "string",
                "description": "The name of the tool to be called"
              }
            }
          }
        }
      },
      "required": [
        "response"
      ]
    },
    {
      "type": "string",
      "format": "binary"
    }
  ]
}
```

---

### @cf/mistral/mistral-7b-instruct-v0.2-lora

**Input Schema:**
```json
{
  "type": "object",
  "oneOf": [
    {
      "title": "Prompt",
      "properties": {
        "prompt": {
          "type": "string",
          "minLength": 1,
          "description": "The input text prompt for the model to generate a response."
        },
        "lora": {
          "type": "string",
          "description": "Name of the LoRA (Low-Rank Adaptation) model to fine-tune the base model."
        },
        "response_format": {
          "title": "JSON Mode",
          "type": "object",
          "properties": {
            "type": {
              "type": "string",
              "enum": [
                "json_object",
                "json_schema"
              ]
            },
            "json_schema": {}
          }
        },
        "raw": {
          "type": "boolean",
          "default": false,
          "description": "If true, a chat template is not applied and you must adhere to the specific model's expected formatting."
        },
        "stream": {
          "type": "boolean",
          "default": false,
          "description": "If true, the response will be streamed back incrementally using SSE, Server Sent Events."
        },
        "max_tokens": {
          "type": "integer",
          "default": 256,
          "description": "The maximum number of tokens to generate in the response."
        },
        "temperature": {
          "type": "number",
          "default": 0.6,
          "minimum": 0,
          "maximum": 5,
          "description": "Controls the randomness of the output; higher values produce more random results."
        },
        "top_p": {
          "type": "number",
          "minimum": 0.001,
          "maximum": 1,
          "description": "Adjusts the creativity of the AI's responses by controlling how many possible words it considers. Lower values make outputs more predictable; higher values allow for more varied and creative responses."
        },
        "top_k": {
          "type": "integer",
          "minimum": 1,
          "maximum": 50,
          "description": "Limits the AI to choose from the top 'k' most probable words. Lower values make responses more focused; higher values introduce more variety and potential surprises."
        },
        "seed": {
          "type": "integer",
          "minimum": 1,
          "maximum": 9999999999,
          "description": "Random seed for reproducibility of the generation."
        },
        "repetition_penalty": {
          "type": "number",
          "minimum": 0,
          "maximum": 2,
          "description": "Penalty for repeated tokens; higher values discourage repetition."
        },
        "frequency_penalty": {
          "type": "number",
          "minimum": -2,
          "maximum": 2,
          "description": "Decreases the likelihood of the model repeating the same lines verbatim."
        },
        "presence_penalty": {
          "type": "number",
          "minimum": -2,
          "maximum": 2,
          "description": "Increases the likelihood of the model introducing new topics."
        }
      },
      "required": [
        "prompt"
      ]
    },
    {
      "title": "Messages",
      "properties": {
        "messages": {
          "type": "array",
          "description": "An array of message objects representing the conversation history.",
          "items": {
            "type": "object",
            "properties": {
              "role": {
                "type": "string",
                "description": "The role of the message sender (e.g., 'user', 'assistant', 'system', 'tool')."
              },
              "content": {
                "type": "string",
                "description": "The content of the message as a string."
              }
            },
            "required": [
              "role",
              "content"
            ]
          }
        },
        "functions": {
          "type": "array",
          "items": {
            "type": "object",
            "properties": {
              "name": {
                "type": "string"
              },
              "code": {
                "type": "string"
              }
            },
            "required": [
              "name",
              "code"
            ]
          }
        },
        "tools": {
          "type": "array",
          "description": "A list of tools available for the assistant to use.",
          "items": {
            "type": "object",
            "oneOf": [
              {
                "properties": {
                  "name": {
                    "type": "string",
                    "description": "The name of the tool. More descriptive the better."
                  },
                  "description": {
                    "type": "string",
                    "description": "A brief description of what the tool does."
                  },
                  "parameters": {
                    "type": "object",
                    "description": "Schema defining the parameters accepted by the tool.",
                    "properties": {
                      "type": {
                        "type": "string",
                        "description": "The type of the parameters object (usually 'object')."
                      },
                      "required": {
                        "type": "array",
                        "description": "List of required parameter names.",
                        "items": {
                          "type": "string"
                        }
                      },
                      "properties": {
                        "type": "object",
                        "description": "Definitions of each parameter.",
                        "additionalProperties": {
                          "type": "object",
                          "properties": {
                            "type": {
                              "type": "string",
                              "description": "The data type of the parameter."
                            },
                            "description": {
                              "type": "string",
                              "description": "A description of the expected parameter."
                            }
                          },
                          "required": [
                            "type",
                            "description"
                          ]
                        }
                      }
                    },
                    "required": [
                      "type",
                      "properties"
                    ]
                  }
                },
                "required": [
                  "name",
                  "description",
                  "parameters"
                ]
              },
              {
                "properties": {
                  "type": {
                    "type": "string",
                    "description": "Specifies the type of tool (e.g., 'function')."
                  },
                  "function": {
                    "type": "object",
                    "description": "Details of the function tool.",
                    "properties": {
                      "name": {
                        "type": "string",
                        "description": "The name of the function."
                      },
                      "description": {
                        "type": "string",
                        "description": "A brief description of what the function does."
                      },
                      "parameters": {
                        "type": "object",
                        "description": "Schema defining the parameters accepted by the function.",
                        "properties": {
                          "type": {
                            "type": "string",
                            "description": "The type of the parameters object (usually 'object')."
                          },
                          "required": {
                            "type": "array",
                            "description": "List of required parameter names.",
                            "items": {
                              "type": "string"
                            }
                          },
                          "properties": {
                            "type": "object",
                            "description": "Definitions of each parameter.",
                            "additionalProperties": {
                              "type": "object",
                              "properties": {
                                "type": {
                                  "type": "string",
                                  "description": "The data type of the parameter."
                                },
                                "description": {
                                  "type": "string",
                                  "description": "A description of the expected parameter."
                                }
                              },
                              "required": [
                                "type",
                                "description"
                              ]
                            }
                          }
                        },
                        "required": [
                          "type",
                          "properties"
                        ]
                      }
                    },
                    "required": [
                      "name",
                      "description",
                      "parameters"
                    ]
                  }
                },
                "required": [
                  "type",
                  "function"
                ]
              }
            ]
          }
        },
        "response_format": {
          "title": "JSON Mode",
          "type": "object",
          "properties": {
            "type": {
              "type": "string",
              "enum": [
                "json_object",
                "json_schema"
              ]
            },
            "json_schema": {}
          }
        },
        "raw": {
          "type": "boolean",
          "default": false,
          "description": "If true, a chat template is not applied and you must adhere to the specific model's expected formatting."
        },
        "stream": {
          "type": "boolean",
          "default": false,
          "description": "If true, the response will be streamed back incrementally using SSE, Server Sent Events."
        },
        "max_tokens": {
          "type": "integer",
          "default": 256,
          "description": "The maximum number of tokens to generate in the response."
        },
        "temperature": {
          "type": "number",
          "default": 0.6,
          "minimum": 0,
          "maximum": 5,
          "description": "Controls the randomness of the output; higher values produce more random results."
        },
        "top_p": {
          "type": "number",
          "minimum": 0.001,
          "maximum": 1,
          "description": "Adjusts the creativity of the AI's responses by controlling how many possible words it considers. Lower values make outputs more predictable; higher values allow for more varied and creative responses."
        },
        "top_k": {
          "type": "integer",
          "minimum": 1,
          "maximum": 50,
          "description": "Limits the AI to choose from the top 'k' most probable words. Lower values make responses more focused; higher values introduce more variety and potential surprises."
        },
        "seed": {
          "type": "integer",
          "minimum": 1,
          "maximum": 9999999999,
          "description": "Random seed for reproducibility of the generation."
        },
        "repetition_penalty": {
          "type": "number",
          "minimum": 0,
          "maximum": 2,
          "description": "Penalty for repeated tokens; higher values discourage repetition."
        },
        "frequency_penalty": {
          "type": "number",
          "minimum": -2,
          "maximum": 2,
          "description": "Decreases the likelihood of the model repeating the same lines verbatim."
        },
        "presence_penalty": {
          "type": "number",
          "minimum": -2,
          "maximum": 2,
          "description": "Increases the likelihood of the model introducing new topics."
        }
      },
      "required": [
        "messages"
      ]
    }
  ]
}
```

**Example Request:**
```javascript
const response = await fetch(
  'https://api.cloudflare.com/client/v4/accounts/{account_id}/ai/run/@cf/mistral/mistral-7b-instruct-v0.2-lora',
  {
    method: 'POST',
    headers: {
      'Authorization': 'Bearer YOUR_API_TOKEN',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      "prompt": "Hello, how are you?"
})
  }
);

const result = await response.json();
console.log(result);
```

**Output Schema:**
```json
{
  "oneOf": [
    {
      "type": "object",
      "properties": {
        "response": {
          "type": "string",
          "description": "The generated text response from the model"
        },
        "usage": {
          "type": "object",
          "description": "Usage statistics for the inference request",
          "properties": {
            "prompt_tokens": {
              "type": "number",
              "description": "Total number of tokens in input",
              "default": 0
            },
            "completion_tokens": {
              "type": "number",
              "description": "Total number of tokens in output",
              "default": 0
            },
            "total_tokens": {
              "type": "number",
              "description": "Total number of input and output tokens",
              "default": 0
            }
          }
        },
        "tool_calls": {
          "type": "array",
          "description": "An array of tool calls requests made during the response generation",
          "items": {
            "type": "object",
            "properties": {
              "arguments": {
                "type": "object",
                "description": "The arguments passed to be passed to the tool call request"
              },
              "name": {
                "type": "string",
                "description": "The name of the tool to be called"
              }
            }
          }
        }
      },
      "required": [
        "response"
      ]
    },
    {
      "type": "string",
      "format": "binary"
    }
  ]
}
```

---

### @cf/tinyllama/tinyllama-1.1b-chat-v1.0

**Input Schema:**
```json
{
  "type": "object",
  "oneOf": [
    {
      "title": "Prompt",
      "properties": {
        "prompt": {
          "type": "string",
          "minLength": 1,
          "description": "The input text prompt for the model to generate a response."
        },
        "lora": {
          "type": "string",
          "description": "Name of the LoRA (Low-Rank Adaptation) model to fine-tune the base model."
        },
        "response_format": {
          "title": "JSON Mode",
          "type": "object",
          "properties": {
            "type": {
              "type": "string",
              "enum": [
                "json_object",
                "json_schema"
              ]
            },
            "json_schema": {}
          }
        },
        "raw": {
          "type": "boolean",
          "default": false,
          "description": "If true, a chat template is not applied and you must adhere to the specific model's expected formatting."
        },
        "stream": {
          "type": "boolean",
          "default": false,
          "description": "If true, the response will be streamed back incrementally using SSE, Server Sent Events."
        },
        "max_tokens": {
          "type": "integer",
          "default": 256,
          "description": "The maximum number of tokens to generate in the response."
        },
        "temperature": {
          "type": "number",
          "default": 0.6,
          "minimum": 0,
          "maximum": 5,
          "description": "Controls the randomness of the output; higher values produce more random results."
        },
        "top_p": {
          "type": "number",
          "minimum": 0.001,
          "maximum": 1,
          "description": "Adjusts the creativity of the AI's responses by controlling how many possible words it considers. Lower values make outputs more predictable; higher values allow for more varied and creative responses."
        },
        "top_k": {
          "type": "integer",
          "minimum": 1,
          "maximum": 50,
          "description": "Limits the AI to choose from the top 'k' most probable words. Lower values make responses more focused; higher values introduce more variety and potential surprises."
        },
        "seed": {
          "type": "integer",
          "minimum": 1,
          "maximum": 9999999999,
          "description": "Random seed for reproducibility of the generation."
        },
        "repetition_penalty": {
          "type": "number",
          "minimum": 0,
          "maximum": 2,
          "description": "Penalty for repeated tokens; higher values discourage repetition."
        },
        "frequency_penalty": {
          "type": "number",
          "minimum": -2,
          "maximum": 2,
          "description": "Decreases the likelihood of the model repeating the same lines verbatim."
        },
        "presence_penalty": {
          "type": "number",
          "minimum": -2,
          "maximum": 2,
          "description": "Increases the likelihood of the model introducing new topics."
        }
      },
      "required": [
        "prompt"
      ]
    },
    {
      "title": "Messages",
      "properties": {
        "messages": {
          "type": "array",
          "description": "An array of message objects representing the conversation history.",
          "items": {
            "type": "object",
            "properties": {
              "role": {
                "type": "string",
                "description": "The role of the message sender (e.g., 'user', 'assistant', 'system', 'tool')."
              },
              "content": {
                "type": "string",
                "description": "The content of the message as a string."
              }
            },
            "required": [
              "role",
              "content"
            ]
          }
        },
        "functions": {
          "type": "array",
          "items": {
            "type": "object",
            "properties": {
              "name": {
                "type": "string"
              },
              "code": {
                "type": "string"
              }
            },
            "required": [
              "name",
              "code"
            ]
          }
        },
        "tools": {
          "type": "array",
          "description": "A list of tools available for the assistant to use.",
          "items": {
            "type": "object",
            "oneOf": [
              {
                "properties": {
                  "name": {
                    "type": "string",
                    "description": "The name of the tool. More descriptive the better."
                  },
                  "description": {
                    "type": "string",
                    "description": "A brief description of what the tool does."
                  },
                  "parameters": {
                    "type": "object",
                    "description": "Schema defining the parameters accepted by the tool.",
                    "properties": {
                      "type": {
                        "type": "string",
                        "description": "The type of the parameters object (usually 'object')."
                      },
                      "required": {
                        "type": "array",
                        "description": "List of required parameter names.",
                        "items": {
                          "type": "string"
                        }
                      },
                      "properties": {
                        "type": "object",
                        "description": "Definitions of each parameter.",
                        "additionalProperties": {
                          "type": "object",
                          "properties": {
                            "type": {
                              "type": "string",
                              "description": "The data type of the parameter."
                            },
                            "description": {
                              "type": "string",
                              "description": "A description of the expected parameter."
                            }
                          },
                          "required": [
                            "type",
                            "description"
                          ]
                        }
                      }
                    },
                    "required": [
                      "type",
                      "properties"
                    ]
                  }
                },
                "required": [
                  "name",
                  "description",
                  "parameters"
                ]
              },
              {
                "properties": {
                  "type": {
                    "type": "string",
                    "description": "Specifies the type of tool (e.g., 'function')."
                  },
                  "function": {
                    "type": "object",
                    "description": "Details of the function tool.",
                    "properties": {
                      "name": {
                        "type": "string",
                        "description": "The name of the function."
                      },
                      "description": {
                        "type": "string",
                        "description": "A brief description of what the function does."
                      },
                      "parameters": {
                        "type": "object",
                        "description": "Schema defining the parameters accepted by the function.",
                        "properties": {
                          "type": {
                            "type": "string",
                            "description": "The type of the parameters object (usually 'object')."
                          },
                          "required": {
                            "type": "array",
                            "description": "List of required parameter names.",
                            "items": {
                              "type": "string"
                            }
                          },
                          "properties": {
                            "type": "object",
                            "description": "Definitions of each parameter.",
                            "additionalProperties": {
                              "type": "object",
                              "properties": {
                                "type": {
                                  "type": "string",
                                  "description": "The data type of the parameter."
                                },
                                "description": {
                                  "type": "string",
                                  "description": "A description of the expected parameter."
                                }
                              },
                              "required": [
                                "type",
                                "description"
                              ]
                            }
                          }
                        },
                        "required": [
                          "type",
                          "properties"
                        ]
                      }
                    },
                    "required": [
                      "name",
                      "description",
                      "parameters"
                    ]
                  }
                },
                "required": [
                  "type",
                  "function"
                ]
              }
            ]
          }
        },
        "response_format": {
          "title": "JSON Mode",
          "type": "object",
          "properties": {
            "type": {
              "type": "string",
              "enum": [
                "json_object",
                "json_schema"
              ]
            },
            "json_schema": {}
          }
        },
        "raw": {
          "type": "boolean",
          "default": false,
          "description": "If true, a chat template is not applied and you must adhere to the specific model's expected formatting."
        },
        "stream": {
          "type": "boolean",
          "default": false,
          "description": "If true, the response will be streamed back incrementally using SSE, Server Sent Events."
        },
        "max_tokens": {
          "type": "integer",
          "default": 256,
          "description": "The maximum number of tokens to generate in the response."
        },
        "temperature": {
          "type": "number",
          "default": 0.6,
          "minimum": 0,
          "maximum": 5,
          "description": "Controls the randomness of the output; higher values produce more random results."
        },
        "top_p": {
          "type": "number",
          "minimum": 0.001,
          "maximum": 1,
          "description": "Adjusts the creativity of the AI's responses by controlling how many possible words it considers. Lower values make outputs more predictable; higher values allow for more varied and creative responses."
        },
        "top_k": {
          "type": "integer",
          "minimum": 1,
          "maximum": 50,
          "description": "Limits the AI to choose from the top 'k' most probable words. Lower values make responses more focused; higher values introduce more variety and potential surprises."
        },
        "seed": {
          "type": "integer",
          "minimum": 1,
          "maximum": 9999999999,
          "description": "Random seed for reproducibility of the generation."
        },
        "repetition_penalty": {
          "type": "number",
          "minimum": 0,
          "maximum": 2,
          "description": "Penalty for repeated tokens; higher values discourage repetition."
        },
        "frequency_penalty": {
          "type": "number",
          "minimum": -2,
          "maximum": 2,
          "description": "Decreases the likelihood of the model repeating the same lines verbatim."
        },
        "presence_penalty": {
          "type": "number",
          "minimum": -2,
          "maximum": 2,
          "description": "Increases the likelihood of the model introducing new topics."
        }
      },
      "required": [
        "messages"
      ]
    }
  ]
}
```

**Example Request:**
```javascript
const response = await fetch(
  'https://api.cloudflare.com/client/v4/accounts/{account_id}/ai/run/@cf/tinyllama/tinyllama-1.1b-chat-v1.0',
  {
    method: 'POST',
    headers: {
      'Authorization': 'Bearer YOUR_API_TOKEN',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      "prompt": "Hello, how are you?"
})
  }
);

const result = await response.json();
console.log(result);
```

**Output Schema:**
```json
{
  "oneOf": [
    {
      "type": "object",
      "properties": {
        "response": {
          "type": "string",
          "description": "The generated text response from the model"
        },
        "usage": {
          "type": "object",
          "description": "Usage statistics for the inference request",
          "properties": {
            "prompt_tokens": {
              "type": "number",
              "description": "Total number of tokens in input",
              "default": 0
            },
            "completion_tokens": {
              "type": "number",
              "description": "Total number of tokens in output",
              "default": 0
            },
            "total_tokens": {
              "type": "number",
              "description": "Total number of input and output tokens",
              "default": 0
            }
          }
        },
        "tool_calls": {
          "type": "array",
          "description": "An array of tool calls requests made during the response generation",
          "items": {
            "type": "object",
            "properties": {
              "arguments": {
                "type": "object",
                "description": "The arguments passed to be passed to the tool call request"
              },
              "name": {
                "type": "string",
                "description": "The name of the tool to be called"
              }
            }
          }
        }
      },
      "required": [
        "response"
      ]
    },
    {
      "type": "string",
      "format": "binary"
    }
  ]
}
```

---

### @cf/fblgit/una-cybertron-7b-v2-bf16

**Input Schema:**
```json
{
  "type": "object",
  "oneOf": [
    {
      "title": "Prompt",
      "properties": {
        "prompt": {
          "type": "string",
          "minLength": 1,
          "description": "The input text prompt for the model to generate a response."
        },
        "lora": {
          "type": "string",
          "description": "Name of the LoRA (Low-Rank Adaptation) model to fine-tune the base model."
        },
        "response_format": {
          "title": "JSON Mode",
          "type": "object",
          "properties": {
            "type": {
              "type": "string",
              "enum": [
                "json_object",
                "json_schema"
              ]
            },
            "json_schema": {}
          }
        },
        "raw": {
          "type": "boolean",
          "default": false,
          "description": "If true, a chat template is not applied and you must adhere to the specific model's expected formatting."
        },
        "stream": {
          "type": "boolean",
          "default": false,
          "description": "If true, the response will be streamed back incrementally using SSE, Server Sent Events."
        },
        "max_tokens": {
          "type": "integer",
          "default": 256,
          "description": "The maximum number of tokens to generate in the response."
        },
        "temperature": {
          "type": "number",
          "default": 0.6,
          "minimum": 0,
          "maximum": 5,
          "description": "Controls the randomness of the output; higher values produce more random results."
        },
        "top_p": {
          "type": "number",
          "minimum": 0.001,
          "maximum": 1,
          "description": "Adjusts the creativity of the AI's responses by controlling how many possible words it considers. Lower values make outputs more predictable; higher values allow for more varied and creative responses."
        },
        "top_k": {
          "type": "integer",
          "minimum": 1,
          "maximum": 50,
          "description": "Limits the AI to choose from the top 'k' most probable words. Lower values make responses more focused; higher values introduce more variety and potential surprises."
        },
        "seed": {
          "type": "integer",
          "minimum": 1,
          "maximum": 9999999999,
          "description": "Random seed for reproducibility of the generation."
        },
        "repetition_penalty": {
          "type": "number",
          "minimum": 0,
          "maximum": 2,
          "description": "Penalty for repeated tokens; higher values discourage repetition."
        },
        "frequency_penalty": {
          "type": "number",
          "minimum": -2,
          "maximum": 2,
          "description": "Decreases the likelihood of the model repeating the same lines verbatim."
        },
        "presence_penalty": {
          "type": "number",
          "minimum": -2,
          "maximum": 2,
          "description": "Increases the likelihood of the model introducing new topics."
        }
      },
      "required": [
        "prompt"
      ]
    },
    {
      "title": "Messages",
      "properties": {
        "messages": {
          "type": "array",
          "description": "An array of message objects representing the conversation history.",
          "items": {
            "type": "object",
            "properties": {
              "role": {
                "type": "string",
                "description": "The role of the message sender (e.g., 'user', 'assistant', 'system', 'tool')."
              },
              "content": {
                "type": "string",
                "description": "The content of the message as a string."
              }
            },
            "required": [
              "role",
              "content"
            ]
          }
        },
        "functions": {
          "type": "array",
          "items": {
            "type": "object",
            "properties": {
              "name": {
                "type": "string"
              },
              "code": {
                "type": "string"
              }
            },
            "required": [
              "name",
              "code"
            ]
          }
        },
        "tools": {
          "type": "array",
          "description": "A list of tools available for the assistant to use.",
          "items": {
            "type": "object",
            "oneOf": [
              {
                "properties": {
                  "name": {
                    "type": "string",
                    "description": "The name of the tool. More descriptive the better."
                  },
                  "description": {
                    "type": "string",
                    "description": "A brief description of what the tool does."
                  },
                  "parameters": {
                    "type": "object",
                    "description": "Schema defining the parameters accepted by the tool.",
                    "properties": {
                      "type": {
                        "type": "string",
                        "description": "The type of the parameters object (usually 'object')."
                      },
                      "required": {
                        "type": "array",
                        "description": "List of required parameter names.",
                        "items": {
                          "type": "string"
                        }
                      },
                      "properties": {
                        "type": "object",
                        "description": "Definitions of each parameter.",
                        "additionalProperties": {
                          "type": "object",
                          "properties": {
                            "type": {
                              "type": "string",
                              "description": "The data type of the parameter."
                            },
                            "description": {
                              "type": "string",
                              "description": "A description of the expected parameter."
                            }
                          },
                          "required": [
                            "type",
                            "description"
                          ]
                        }
                      }
                    },
                    "required": [
                      "type",
                      "properties"
                    ]
                  }
                },
                "required": [
                  "name",
                  "description",
                  "parameters"
                ]
              },
              {
                "properties": {
                  "type": {
                    "type": "string",
                    "description": "Specifies the type of tool (e.g., 'function')."
                  },
                  "function": {
                    "type": "object",
                    "description": "Details of the function tool.",
                    "properties": {
                      "name": {
                        "type": "string",
                        "description": "The name of the function."
                      },
                      "description": {
                        "type": "string",
                        "description": "A brief description of what the function does."
                      },
                      "parameters": {
                        "type": "object",
                        "description": "Schema defining the parameters accepted by the function.",
                        "properties": {
                          "type": {
                            "type": "string",
                            "description": "The type of the parameters object (usually 'object')."
                          },
                          "required": {
                            "type": "array",
                            "description": "List of required parameter names.",
                            "items": {
                              "type": "string"
                            }
                          },
                          "properties": {
                            "type": "object",
                            "description": "Definitions of each parameter.",
                            "additionalProperties": {
                              "type": "object",
                              "properties": {
                                "type": {
                                  "type": "string",
                                  "description": "The data type of the parameter."
                                },
                                "description": {
                                  "type": "string",
                                  "description": "A description of the expected parameter."
                                }
                              },
                              "required": [
                                "type",
                                "description"
                              ]
                            }
                          }
                        },
                        "required": [
                          "type",
                          "properties"
                        ]
                      }
                    },
                    "required": [
                      "name",
                      "description",
                      "parameters"
                    ]
                  }
                },
                "required": [
                  "type",
                  "function"
                ]
              }
            ]
          }
        },
        "response_format": {
          "title": "JSON Mode",
          "type": "object",
          "properties": {
            "type": {
              "type": "string",
              "enum": [
                "json_object",
                "json_schema"
              ]
            },
            "json_schema": {}
          }
        },
        "raw": {
          "type": "boolean",
          "default": false,
          "description": "If true, a chat template is not applied and you must adhere to the specific model's expected formatting."
        },
        "stream": {
          "type": "boolean",
          "default": false,
          "description": "If true, the response will be streamed back incrementally using SSE, Server Sent Events."
        },
        "max_tokens": {
          "type": "integer",
          "default": 256,
          "description": "The maximum number of tokens to generate in the response."
        },
        "temperature": {
          "type": "number",
          "default": 0.6,
          "minimum": 0,
          "maximum": 5,
          "description": "Controls the randomness of the output; higher values produce more random results."
        },
        "top_p": {
          "type": "number",
          "minimum": 0.001,
          "maximum": 1,
          "description": "Adjusts the creativity of the AI's responses by controlling how many possible words it considers. Lower values make outputs more predictable; higher values allow for more varied and creative responses."
        },
        "top_k": {
          "type": "integer",
          "minimum": 1,
          "maximum": 50,
          "description": "Limits the AI to choose from the top 'k' most probable words. Lower values make responses more focused; higher values introduce more variety and potential surprises."
        },
        "seed": {
          "type": "integer",
          "minimum": 1,
          "maximum": 9999999999,
          "description": "Random seed for reproducibility of the generation."
        },
        "repetition_penalty": {
          "type": "number",
          "minimum": 0,
          "maximum": 2,
          "description": "Penalty for repeated tokens; higher values discourage repetition."
        },
        "frequency_penalty": {
          "type": "number",
          "minimum": -2,
          "maximum": 2,
          "description": "Decreases the likelihood of the model repeating the same lines verbatim."
        },
        "presence_penalty": {
          "type": "number",
          "minimum": -2,
          "maximum": 2,
          "description": "Increases the likelihood of the model introducing new topics."
        }
      },
      "required": [
        "messages"
      ]
    }
  ]
}
```

**Example Request:**
```javascript
const response = await fetch(
  'https://api.cloudflare.com/client/v4/accounts/{account_id}/ai/run/@cf/fblgit/una-cybertron-7b-v2-bf16',
  {
    method: 'POST',
    headers: {
      'Authorization': 'Bearer YOUR_API_TOKEN',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      "prompt": "Hello, how are you?"
})
  }
);

const result = await response.json();
console.log(result);
```

**Output Schema:**
```json
{
  "oneOf": [
    {
      "type": "object",
      "properties": {
        "response": {
          "type": "string",
          "description": "The generated text response from the model"
        },
        "usage": {
          "type": "object",
          "description": "Usage statistics for the inference request",
          "properties": {
            "prompt_tokens": {
              "type": "number",
              "description": "Total number of tokens in input",
              "default": 0
            },
            "completion_tokens": {
              "type": "number",
              "description": "Total number of tokens in output",
              "default": 0
            },
            "total_tokens": {
              "type": "number",
              "description": "Total number of input and output tokens",
              "default": 0
            }
          }
        },
        "tool_calls": {
          "type": "array",
          "description": "An array of tool calls requests made during the response generation",
          "items": {
            "type": "object",
            "properties": {
              "arguments": {
                "type": "object",
                "description": "The arguments passed to be passed to the tool call request"
              },
              "name": {
                "type": "string",
                "description": "The name of the tool to be called"
              }
            }
          }
        }
      },
      "required": [
        "response"
      ]
    },
    {
      "type": "string",
      "format": "binary"
    }
  ]
}
```

---

### @cf/deepseek-ai/deepseek-r1-distill-qwen-32b

**Input Schema:**
```json
{
  "type": "object",
  "oneOf": [
    {
      "title": "Prompt",
      "properties": {
        "prompt": {
          "type": "string",
          "minLength": 1,
          "description": "The input text prompt for the model to generate a response."
        },
        "lora": {
          "type": "string",
          "description": "Name of the LoRA (Low-Rank Adaptation) model to fine-tune the base model."
        },
        "response_format": {
          "title": "JSON Mode",
          "type": "object",
          "properties": {
            "type": {
              "type": "string",
              "enum": [
                "json_object",
                "json_schema"
              ]
            },
            "json_schema": {}
          }
        },
        "raw": {
          "type": "boolean",
          "default": false,
          "description": "If true, a chat template is not applied and you must adhere to the specific model's expected formatting."
        },
        "stream": {
          "type": "boolean",
          "default": false,
          "description": "If true, the response will be streamed back incrementally using SSE, Server Sent Events."
        },
        "max_tokens": {
          "type": "integer",
          "default": 256,
          "description": "The maximum number of tokens to generate in the response."
        },
        "temperature": {
          "type": "number",
          "default": 0.6,
          "minimum": 0,
          "maximum": 5,
          "description": "Controls the randomness of the output; higher values produce more random results."
        },
        "top_p": {
          "type": "number",
          "minimum": 0.001,
          "maximum": 1,
          "description": "Adjusts the creativity of the AI's responses by controlling how many possible words it considers. Lower values make outputs more predictable; higher values allow for more varied and creative responses."
        },
        "top_k": {
          "type": "integer",
          "minimum": 1,
          "maximum": 50,
          "description": "Limits the AI to choose from the top 'k' most probable words. Lower values make responses more focused; higher values introduce more variety and potential surprises."
        },
        "seed": {
          "type": "integer",
          "minimum": 1,
          "maximum": 9999999999,
          "description": "Random seed for reproducibility of the generation."
        },
        "repetition_penalty": {
          "type": "number",
          "minimum": 0,
          "maximum": 2,
          "description": "Penalty for repeated tokens; higher values discourage repetition."
        },
        "frequency_penalty": {
          "type": "number",
          "minimum": -2,
          "maximum": 2,
          "description": "Decreases the likelihood of the model repeating the same lines verbatim."
        },
        "presence_penalty": {
          "type": "number",
          "minimum": -2,
          "maximum": 2,
          "description": "Increases the likelihood of the model introducing new topics."
        }
      },
      "required": [
        "prompt"
      ]
    },
    {
      "title": "Messages",
      "properties": {
        "messages": {
          "type": "array",
          "description": "An array of message objects representing the conversation history.",
          "items": {
            "type": "object",
            "properties": {
              "role": {
                "type": "string",
                "description": "The role of the message sender (e.g., 'user', 'assistant', 'system', 'tool')."
              },
              "content": {
                "type": "string",
                "description": "The content of the message as a string."
              }
            },
            "required": [
              "role",
              "content"
            ]
          }
        },
        "functions": {
          "type": "array",
          "items": {
            "type": "object",
            "properties": {
              "name": {
                "type": "string"
              },
              "code": {
                "type": "string"
              }
            },
            "required": [
              "name",
              "code"
            ]
          }
        },
        "tools": {
          "type": "array",
          "description": "A list of tools available for the assistant to use.",
          "items": {
            "type": "object",
            "oneOf": [
              {
                "properties": {
                  "name": {
                    "type": "string",
                    "description": "The name of the tool. More descriptive the better."
                  },
                  "description": {
                    "type": "string",
                    "description": "A brief description of what the tool does."
                  },
                  "parameters": {
                    "type": "object",
                    "description": "Schema defining the parameters accepted by the tool.",
                    "properties": {
                      "type": {
                        "type": "string",
                        "description": "The type of the parameters object (usually 'object')."
                      },
                      "required": {
                        "type": "array",
                        "description": "List of required parameter names.",
                        "items": {
                          "type": "string"
                        }
                      },
                      "properties": {
                        "type": "object",
                        "description": "Definitions of each parameter.",
                        "additionalProperties": {
                          "type": "object",
                          "properties": {
                            "type": {
                              "type": "string",
                              "description": "The data type of the parameter."
                            },
                            "description": {
                              "type": "string",
                              "description": "A description of the expected parameter."
                            }
                          },
                          "required": [
                            "type",
                            "description"
                          ]
                        }
                      }
                    },
                    "required": [
                      "type",
                      "properties"
                    ]
                  }
                },
                "required": [
                  "name",
                  "description",
                  "parameters"
                ]
              },
              {
                "properties": {
                  "type": {
                    "type": "string",
                    "description": "Specifies the type of tool (e.g., 'function')."
                  },
                  "function": {
                    "type": "object",
                    "description": "Details of the function tool.",
                    "properties": {
                      "name": {
                        "type": "string",
                        "description": "The name of the function."
                      },
                      "description": {
                        "type": "string",
                        "description": "A brief description of what the function does."
                      },
                      "parameters": {
                        "type": "object",
                        "description": "Schema defining the parameters accepted by the function.",
                        "properties": {
                          "type": {
                            "type": "string",
                            "description": "The type of the parameters object (usually 'object')."
                          },
                          "required": {
                            "type": "array",
                            "description": "List of required parameter names.",
                            "items": {
                              "type": "string"
                            }
                          },
                          "properties": {
                            "type": "object",
                            "description": "Definitions of each parameter.",
                            "additionalProperties": {
                              "type": "object",
                              "properties": {
                                "type": {
                                  "type": "string",
                                  "description": "The data type of the parameter."
                                },
                                "description": {
                                  "type": "string",
                                  "description": "A description of the expected parameter."
                                }
                              },
                              "required": [
                                "type",
                                "description"
                              ]
                            }
                          }
                        },
                        "required": [
                          "type",
                          "properties"
                        ]
                      }
                    },
                    "required": [
                      "name",
                      "description",
                      "parameters"
                    ]
                  }
                },
                "required": [
                  "type",
                  "function"
                ]
              }
            ]
          }
        },
        "response_format": {
          "title": "JSON Mode",
          "type": "object",
          "properties": {
            "type": {
              "type": "string",
              "enum": [
                "json_object",
                "json_schema"
              ]
            },
            "json_schema": {}
          }
        },
        "raw": {
          "type": "boolean",
          "default": false,
          "description": "If true, a chat template is not applied and you must adhere to the specific model's expected formatting."
        },
        "stream": {
          "type": "boolean",
          "default": false,
          "description": "If true, the response will be streamed back incrementally using SSE, Server Sent Events."
        },
        "max_tokens": {
          "type": "integer",
          "default": 256,
          "description": "The maximum number of tokens to generate in the response."
        },
        "temperature": {
          "type": "number",
          "default": 0.6,
          "minimum": 0,
          "maximum": 5,
          "description": "Controls the randomness of the output; higher values produce more random results."
        },
        "top_p": {
          "type": "number",
          "minimum": 0.001,
          "maximum": 1,
          "description": "Adjusts the creativity of the AI's responses by controlling how many possible words it considers. Lower values make outputs more predictable; higher values allow for more varied and creative responses."
        },
        "top_k": {
          "type": "integer",
          "minimum": 1,
          "maximum": 50,
          "description": "Limits the AI to choose from the top 'k' most probable words. Lower values make responses more focused; higher values introduce more variety and potential surprises."
        },
        "seed": {
          "type": "integer",
          "minimum": 1,
          "maximum": 9999999999,
          "description": "Random seed for reproducibility of the generation."
        },
        "repetition_penalty": {
          "type": "number",
          "minimum": 0,
          "maximum": 2,
          "description": "Penalty for repeated tokens; higher values discourage repetition."
        },
        "frequency_penalty": {
          "type": "number",
          "minimum": -2,
          "maximum": 2,
          "description": "Decreases the likelihood of the model repeating the same lines verbatim."
        },
        "presence_penalty": {
          "type": "number",
          "minimum": -2,
          "maximum": 2,
          "description": "Increases the likelihood of the model introducing new topics."
        }
      },
      "required": [
        "messages"
      ]
    }
  ]
}
```

**Example Request:**
```javascript
const response = await fetch(
  'https://api.cloudflare.com/client/v4/accounts/{account_id}/ai/run/@cf/deepseek-ai/deepseek-r1-distill-qwen-32b',
  {
    method: 'POST',
    headers: {
      'Authorization': 'Bearer YOUR_API_TOKEN',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      "prompt": "Hello, how are you?"
})
  }
);

const result = await response.json();
console.log(result);
```

**Output Schema:**
```json
{
  "oneOf": [
    {
      "type": "object",
      "properties": {
        "response": {
          "type": "string",
          "description": "The generated text response from the model"
        },
        "usage": {
          "type": "object",
          "description": "Usage statistics for the inference request",
          "properties": {
            "prompt_tokens": {
              "type": "number",
              "description": "Total number of tokens in input",
              "default": 0
            },
            "completion_tokens": {
              "type": "number",
              "description": "Total number of tokens in output",
              "default": 0
            },
            "total_tokens": {
              "type": "number",
              "description": "Total number of input and output tokens",
              "default": 0
            }
          }
        },
        "tool_calls": {
          "type": "array",
          "description": "An array of tool calls requests made during the response generation",
          "items": {
            "type": "object",
            "properties": {
              "arguments": {
                "type": "object",
                "description": "The arguments passed to be passed to the tool call request"
              },
              "name": {
                "type": "string",
                "description": "The name of the tool to be called"
              }
            }
          }
        }
      },
      "required": [
        "response"
      ]
    },
    {
      "type": "string",
      "format": "binary"
    }
  ]
}
```

---

### @cf/thebloke/discolm-german-7b-v1-awq

**Input Schema:**
```json
{
  "type": "object",
  "oneOf": [
    {
      "title": "Prompt",
      "properties": {
        "prompt": {
          "type": "string",
          "minLength": 1,
          "description": "The input text prompt for the model to generate a response."
        },
        "lora": {
          "type": "string",
          "description": "Name of the LoRA (Low-Rank Adaptation) model to fine-tune the base model."
        },
        "response_format": {
          "title": "JSON Mode",
          "type": "object",
          "properties": {
            "type": {
              "type": "string",
              "enum": [
                "json_object",
                "json_schema"
              ]
            },
            "json_schema": {}
          }
        },
        "raw": {
          "type": "boolean",
          "default": false,
          "description": "If true, a chat template is not applied and you must adhere to the specific model's expected formatting."
        },
        "stream": {
          "type": "boolean",
          "default": false,
          "description": "If true, the response will be streamed back incrementally using SSE, Server Sent Events."
        },
        "max_tokens": {
          "type": "integer",
          "default": 256,
          "description": "The maximum number of tokens to generate in the response."
        },
        "temperature": {
          "type": "number",
          "default": 0.6,
          "minimum": 0,
          "maximum": 5,
          "description": "Controls the randomness of the output; higher values produce more random results."
        },
        "top_p": {
          "type": "number",
          "minimum": 0.001,
          "maximum": 1,
          "description": "Adjusts the creativity of the AI's responses by controlling how many possible words it considers. Lower values make outputs more predictable; higher values allow for more varied and creative responses."
        },
        "top_k": {
          "type": "integer",
          "minimum": 1,
          "maximum": 50,
          "description": "Limits the AI to choose from the top 'k' most probable words. Lower values make responses more focused; higher values introduce more variety and potential surprises."
        },
        "seed": {
          "type": "integer",
          "minimum": 1,
          "maximum": 9999999999,
          "description": "Random seed for reproducibility of the generation."
        },
        "repetition_penalty": {
          "type": "number",
          "minimum": 0,
          "maximum": 2,
          "description": "Penalty for repeated tokens; higher values discourage repetition."
        },
        "frequency_penalty": {
          "type": "number",
          "minimum": -2,
          "maximum": 2,
          "description": "Decreases the likelihood of the model repeating the same lines verbatim."
        },
        "presence_penalty": {
          "type": "number",
          "minimum": -2,
          "maximum": 2,
          "description": "Increases the likelihood of the model introducing new topics."
        }
      },
      "required": [
        "prompt"
      ]
    },
    {
      "title": "Messages",
      "properties": {
        "messages": {
          "type": "array",
          "description": "An array of message objects representing the conversation history.",
          "items": {
            "type": "object",
            "properties": {
              "role": {
                "type": "string",
                "description": "The role of the message sender (e.g., 'user', 'assistant', 'system', 'tool')."
              },
              "content": {
                "type": "string",
                "description": "The content of the message as a string."
              }
            },
            "required": [
              "role",
              "content"
            ]
          }
        },
        "functions": {
          "type": "array",
          "items": {
            "type": "object",
            "properties": {
              "name": {
                "type": "string"
              },
              "code": {
                "type": "string"
              }
            },
            "required": [
              "name",
              "code"
            ]
          }
        },
        "tools": {
          "type": "array",
          "description": "A list of tools available for the assistant to use.",
          "items": {
            "type": "object",
            "oneOf": [
              {
                "properties": {
                  "name": {
                    "type": "string",
                    "description": "The name of the tool. More descriptive the better."
                  },
                  "description": {
                    "type": "string",
                    "description": "A brief description of what the tool does."
                  },
                  "parameters": {
                    "type": "object",
                    "description": "Schema defining the parameters accepted by the tool.",
                    "properties": {
                      "type": {
                        "type": "string",
                        "description": "The type of the parameters object (usually 'object')."
                      },
                      "required": {
                        "type": "array",
                        "description": "List of required parameter names.",
                        "items": {
                          "type": "string"
                        }
                      },
                      "properties": {
                        "type": "object",
                        "description": "Definitions of each parameter.",
                        "additionalProperties": {
                          "type": "object",
                          "properties": {
                            "type": {
                              "type": "string",
                              "description": "The data type of the parameter."
                            },
                            "description": {
                              "type": "string",
                              "description": "A description of the expected parameter."
                            }
                          },
                          "required": [
                            "type",
                            "description"
                          ]
                        }
                      }
                    },
                    "required": [
                      "type",
                      "properties"
                    ]
                  }
                },
                "required": [
                  "name",
                  "description",
                  "parameters"
                ]
              },
              {
                "properties": {
                  "type": {
                    "type": "string",
                    "description": "Specifies the type of tool (e.g., 'function')."
                  },
                  "function": {
                    "type": "object",
                    "description": "Details of the function tool.",
                    "properties": {
                      "name": {
                        "type": "string",
                        "description": "The name of the function."
                      },
                      "description": {
                        "type": "string",
                        "description": "A brief description of what the function does."
                      },
                      "parameters": {
                        "type": "object",
                        "description": "Schema defining the parameters accepted by the function.",
                        "properties": {
                          "type": {
                            "type": "string",
                            "description": "The type of the parameters object (usually 'object')."
                          },
                          "required": {
                            "type": "array",
                            "description": "List of required parameter names.",
                            "items": {
                              "type": "string"
                            }
                          },
                          "properties": {
                            "type": "object",
                            "description": "Definitions of each parameter.",
                            "additionalProperties": {
                              "type": "object",
                              "properties": {
                                "type": {
                                  "type": "string",
                                  "description": "The data type of the parameter."
                                },
                                "description": {
                                  "type": "string",
                                  "description": "A description of the expected parameter."
                                }
                              },
                              "required": [
                                "type",
                                "description"
                              ]
                            }
                          }
                        },
                        "required": [
                          "type",
                          "properties"
                        ]
                      }
                    },
                    "required": [
                      "name",
                      "description",
                      "parameters"
                    ]
                  }
                },
                "required": [
                  "type",
                  "function"
                ]
              }
            ]
          }
        },
        "response_format": {
          "title": "JSON Mode",
          "type": "object",
          "properties": {
            "type": {
              "type": "string",
              "enum": [
                "json_object",
                "json_schema"
              ]
            },
            "json_schema": {}
          }
        },
        "raw": {
          "type": "boolean",
          "default": false,
          "description": "If true, a chat template is not applied and you must adhere to the specific model's expected formatting."
        },
        "stream": {
          "type": "boolean",
          "default": false,
          "description": "If true, the response will be streamed back incrementally using SSE, Server Sent Events."
        },
        "max_tokens": {
          "type": "integer",
          "default": 256,
          "description": "The maximum number of tokens to generate in the response."
        },
        "temperature": {
          "type": "number",
          "default": 0.6,
          "minimum": 0,
          "maximum": 5,
          "description": "Controls the randomness of the output; higher values produce more random results."
        },
        "top_p": {
          "type": "number",
          "minimum": 0.001,
          "maximum": 1,
          "description": "Adjusts the creativity of the AI's responses by controlling how many possible words it considers. Lower values make outputs more predictable; higher values allow for more varied and creative responses."
        },
        "top_k": {
          "type": "integer",
          "minimum": 1,
          "maximum": 50,
          "description": "Limits the AI to choose from the top 'k' most probable words. Lower values make responses more focused; higher values introduce more variety and potential surprises."
        },
        "seed": {
          "type": "integer",
          "minimum": 1,
          "maximum": 9999999999,
          "description": "Random seed for reproducibility of the generation."
        },
        "repetition_penalty": {
          "type": "number",
          "minimum": 0,
          "maximum": 2,
          "description": "Penalty for repeated tokens; higher values discourage repetition."
        },
        "frequency_penalty": {
          "type": "number",
          "minimum": -2,
          "maximum": 2,
          "description": "Decreases the likelihood of the model repeating the same lines verbatim."
        },
        "presence_penalty": {
          "type": "number",
          "minimum": -2,
          "maximum": 2,
          "description": "Increases the likelihood of the model introducing new topics."
        }
      },
      "required": [
        "messages"
      ]
    }
  ]
}
```

**Example Request:**
```javascript
const response = await fetch(
  'https://api.cloudflare.com/client/v4/accounts/{account_id}/ai/run/@cf/thebloke/discolm-german-7b-v1-awq',
  {
    method: 'POST',
    headers: {
      'Authorization': 'Bearer YOUR_API_TOKEN',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      "prompt": "Hello, how are you?"
})
  }
);

const result = await response.json();
console.log(result);
```

**Output Schema:**
```json
{
  "oneOf": [
    {
      "type": "object",
      "properties": {
        "response": {
          "type": "string",
          "description": "The generated text response from the model"
        },
        "usage": {
          "type": "object",
          "description": "Usage statistics for the inference request",
          "properties": {
            "prompt_tokens": {
              "type": "number",
              "description": "Total number of tokens in input",
              "default": 0
            },
            "completion_tokens": {
              "type": "number",
              "description": "Total number of tokens in output",
              "default": 0
            },
            "total_tokens": {
              "type": "number",
              "description": "Total number of input and output tokens",
              "default": 0
            }
          }
        },
        "tool_calls": {
          "type": "array",
          "description": "An array of tool calls requests made during the response generation",
          "items": {
            "type": "object",
            "properties": {
              "arguments": {
                "type": "object",
                "description": "The arguments passed to be passed to the tool call request"
              },
              "name": {
                "type": "string",
                "description": "The name of the tool to be called"
              }
            }
          }
        }
      },
      "required": [
        "response"
      ]
    },
    {
      "type": "string",
      "format": "binary"
    }
  ]
}
```

---

### @cf/meta/llama-2-7b-chat-int8

**Input Schema:**
```json
{
  "type": "object",
  "oneOf": [
    {
      "title": "Prompt",
      "properties": {
        "prompt": {
          "type": "string",
          "minLength": 1,
          "description": "The input text prompt for the model to generate a response."
        },
        "lora": {
          "type": "string",
          "description": "Name of the LoRA (Low-Rank Adaptation) model to fine-tune the base model."
        },
        "response_format": {
          "title": "JSON Mode",
          "type": "object",
          "properties": {
            "type": {
              "type": "string",
              "enum": [
                "json_object",
                "json_schema"
              ]
            },
            "json_schema": {}
          }
        },
        "raw": {
          "type": "boolean",
          "default": false,
          "description": "If true, a chat template is not applied and you must adhere to the specific model's expected formatting."
        },
        "stream": {
          "type": "boolean",
          "default": false,
          "description": "If true, the response will be streamed back incrementally using SSE, Server Sent Events."
        },
        "max_tokens": {
          "type": "integer",
          "default": 256,
          "description": "The maximum number of tokens to generate in the response."
        },
        "temperature": {
          "type": "number",
          "default": 0.6,
          "minimum": 0,
          "maximum": 5,
          "description": "Controls the randomness of the output; higher values produce more random results."
        },
        "top_p": {
          "type": "number",
          "minimum": 0.001,
          "maximum": 1,
          "description": "Adjusts the creativity of the AI's responses by controlling how many possible words it considers. Lower values make outputs more predictable; higher values allow for more varied and creative responses."
        },
        "top_k": {
          "type": "integer",
          "minimum": 1,
          "maximum": 50,
          "description": "Limits the AI to choose from the top 'k' most probable words. Lower values make responses more focused; higher values introduce more variety and potential surprises."
        },
        "seed": {
          "type": "integer",
          "minimum": 1,
          "maximum": 9999999999,
          "description": "Random seed for reproducibility of the generation."
        },
        "repetition_penalty": {
          "type": "number",
          "minimum": 0,
          "maximum": 2,
          "description": "Penalty for repeated tokens; higher values discourage repetition."
        },
        "frequency_penalty": {
          "type": "number",
          "minimum": -2,
          "maximum": 2,
          "description": "Decreases the likelihood of the model repeating the same lines verbatim."
        },
        "presence_penalty": {
          "type": "number",
          "minimum": -2,
          "maximum": 2,
          "description": "Increases the likelihood of the model introducing new topics."
        }
      },
      "required": [
        "prompt"
      ]
    },
    {
      "title": "Messages",
      "properties": {
        "messages": {
          "type": "array",
          "description": "An array of message objects representing the conversation history.",
          "items": {
            "type": "object",
            "properties": {
              "role": {
                "type": "string",
                "description": "The role of the message sender (e.g., 'user', 'assistant', 'system', 'tool')."
              },
              "content": {
                "type": "string",
                "description": "The content of the message as a string."
              }
            },
            "required": [
              "role",
              "content"
            ]
          }
        },
        "functions": {
          "type": "array",
          "items": {
            "type": "object",
            "properties": {
              "name": {
                "type": "string"
              },
              "code": {
                "type": "string"
              }
            },
            "required": [
              "name",
              "code"
            ]
          }
        },
        "tools": {
          "type": "array",
          "description": "A list of tools available for the assistant to use.",
          "items": {
            "type": "object",
            "oneOf": [
              {
                "properties": {
                  "name": {
                    "type": "string",
                    "description": "The name of the tool. More descriptive the better."
                  },
                  "description": {
                    "type": "string",
                    "description": "A brief description of what the tool does."
                  },
                  "parameters": {
                    "type": "object",
                    "description": "Schema defining the parameters accepted by the tool.",
                    "properties": {
                      "type": {
                        "type": "string",
                        "description": "The type of the parameters object (usually 'object')."
                      },
                      "required": {
                        "type": "array",
                        "description": "List of required parameter names.",
                        "items": {
                          "type": "string"
                        }
                      },
                      "properties": {
                        "type": "object",
                        "description": "Definitions of each parameter.",
                        "additionalProperties": {
                          "type": "object",
                          "properties": {
                            "type": {
                              "type": "string",
                              "description": "The data type of the parameter."
                            },
                            "description": {
                              "type": "string",
                              "description": "A description of the expected parameter."
                            }
                          },
                          "required": [
                            "type",
                            "description"
                          ]
                        }
                      }
                    },
                    "required": [
                      "type",
                      "properties"
                    ]
                  }
                },
                "required": [
                  "name",
                  "description",
                  "parameters"
                ]
              },
              {
                "properties": {
                  "type": {
                    "type": "string",
                    "description": "Specifies the type of tool (e.g., 'function')."
                  },
                  "function": {
                    "type": "object",
                    "description": "Details of the function tool.",
                    "properties": {
                      "name": {
                        "type": "string",
                        "description": "The name of the function."
                      },
                      "description": {
                        "type": "string",
                        "description": "A brief description of what the function does."
                      },
                      "parameters": {
                        "type": "object",
                        "description": "Schema defining the parameters accepted by the function.",
                        "properties": {
                          "type": {
                            "type": "string",
                            "description": "The type of the parameters object (usually 'object')."
                          },
                          "required": {
                            "type": "array",
                            "description": "List of required parameter names.",
                            "items": {
                              "type": "string"
                            }
                          },
                          "properties": {
                            "type": "object",
                            "description": "Definitions of each parameter.",
                            "additionalProperties": {
                              "type": "object",
                              "properties": {
                                "type": {
                                  "type": "string",
                                  "description": "The data type of the parameter."
                                },
                                "description": {
                                  "type": "string",
                                  "description": "A description of the expected parameter."
                                }
                              },
                              "required": [
                                "type",
                                "description"
                              ]
                            }
                          }
                        },
                        "required": [
                          "type",
                          "properties"
                        ]
                      }
                    },
                    "required": [
                      "name",
                      "description",
                      "parameters"
                    ]
                  }
                },
                "required": [
                  "type",
                  "function"
                ]
              }
            ]
          }
        },
        "response_format": {
          "title": "JSON Mode",
          "type": "object",
          "properties": {
            "type": {
              "type": "string",
              "enum": [
                "json_object",
                "json_schema"
              ]
            },
            "json_schema": {}
          }
        },
        "raw": {
          "type": "boolean",
          "default": false,
          "description": "If true, a chat template is not applied and you must adhere to the specific model's expected formatting."
        },
        "stream": {
          "type": "boolean",
          "default": false,
          "description": "If true, the response will be streamed back incrementally using SSE, Server Sent Events."
        },
        "max_tokens": {
          "type": "integer",
          "default": 256,
          "description": "The maximum number of tokens to generate in the response."
        },
        "temperature": {
          "type": "number",
          "default": 0.6,
          "minimum": 0,
          "maximum": 5,
          "description": "Controls the randomness of the output; higher values produce more random results."
        },
        "top_p": {
          "type": "number",
          "minimum": 0.001,
          "maximum": 1,
          "description": "Adjusts the creativity of the AI's responses by controlling how many possible words it considers. Lower values make outputs more predictable; higher values allow for more varied and creative responses."
        },
        "top_k": {
          "type": "integer",
          "minimum": 1,
          "maximum": 50,
          "description": "Limits the AI to choose from the top 'k' most probable words. Lower values make responses more focused; higher values introduce more variety and potential surprises."
        },
        "seed": {
          "type": "integer",
          "minimum": 1,
          "maximum": 9999999999,
          "description": "Random seed for reproducibility of the generation."
        },
        "repetition_penalty": {
          "type": "number",
          "minimum": 0,
          "maximum": 2,
          "description": "Penalty for repeated tokens; higher values discourage repetition."
        },
        "frequency_penalty": {
          "type": "number",
          "minimum": -2,
          "maximum": 2,
          "description": "Decreases the likelihood of the model repeating the same lines verbatim."
        },
        "presence_penalty": {
          "type": "number",
          "minimum": -2,
          "maximum": 2,
          "description": "Increases the likelihood of the model introducing new topics."
        }
      },
      "required": [
        "messages"
      ]
    }
  ]
}
```

**Example Request:**
```javascript
const response = await fetch(
  'https://api.cloudflare.com/client/v4/accounts/{account_id}/ai/run/@cf/meta/llama-2-7b-chat-int8',
  {
    method: 'POST',
    headers: {
      'Authorization': 'Bearer YOUR_API_TOKEN',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      "prompt": "Hello, how are you?"
})
  }
);

const result = await response.json();
console.log(result);
```

**Output Schema:**
```json
{
  "oneOf": [
    {
      "type": "object",
      "properties": {
        "response": {
          "type": "string",
          "description": "The generated text response from the model"
        },
        "usage": {
          "type": "object",
          "description": "Usage statistics for the inference request",
          "properties": {
            "prompt_tokens": {
              "type": "number",
              "description": "Total number of tokens in input",
              "default": 0
            },
            "completion_tokens": {
              "type": "number",
              "description": "Total number of tokens in output",
              "default": 0
            },
            "total_tokens": {
              "type": "number",
              "description": "Total number of input and output tokens",
              "default": 0
            }
          }
        },
        "tool_calls": {
          "type": "array",
          "description": "An array of tool calls requests made during the response generation",
          "items": {
            "type": "object",
            "properties": {
              "arguments": {
                "type": "object",
                "description": "The arguments passed to be passed to the tool call request"
              },
              "name": {
                "type": "string",
                "description": "The name of the tool to be called"
              }
            }
          }
        }
      },
      "required": [
        "response"
      ]
    },
    {
      "type": "string",
      "format": "binary"
    }
  ]
}
```

---

### @cf/meta/llama-3.1-8b-instruct-fp8

**Input Schema:**
```json
{
  "type": "object",
  "oneOf": [
    {
      "title": "Prompt",
      "properties": {
        "prompt": {
          "type": "string",
          "minLength": 1,
          "description": "The input text prompt for the model to generate a response."
        },
        "lora": {
          "type": "string",
          "description": "Name of the LoRA (Low-Rank Adaptation) model to fine-tune the base model."
        },
        "response_format": {
          "title": "JSON Mode",
          "type": "object",
          "properties": {
            "type": {
              "type": "string",
              "enum": [
                "json_object",
                "json_schema"
              ]
            },
            "json_schema": {}
          }
        },
        "raw": {
          "type": "boolean",
          "default": false,
          "description": "If true, a chat template is not applied and you must adhere to the specific model's expected formatting."
        },
        "stream": {
          "type": "boolean",
          "default": false,
          "description": "If true, the response will be streamed back incrementally using SSE, Server Sent Events."
        },
        "max_tokens": {
          "type": "integer",
          "default": 256,
          "description": "The maximum number of tokens to generate in the response."
        },
        "temperature": {
          "type": "number",
          "default": 0.6,
          "minimum": 0,
          "maximum": 5,
          "description": "Controls the randomness of the output; higher values produce more random results."
        },
        "top_p": {
          "type": "number",
          "minimum": 0.001,
          "maximum": 1,
          "description": "Adjusts the creativity of the AI's responses by controlling how many possible words it considers. Lower values make outputs more predictable; higher values allow for more varied and creative responses."
        },
        "top_k": {
          "type": "integer",
          "minimum": 1,
          "maximum": 50,
          "description": "Limits the AI to choose from the top 'k' most probable words. Lower values make responses more focused; higher values introduce more variety and potential surprises."
        },
        "seed": {
          "type": "integer",
          "minimum": 1,
          "maximum": 9999999999,
          "description": "Random seed for reproducibility of the generation."
        },
        "repetition_penalty": {
          "type": "number",
          "minimum": 0,
          "maximum": 2,
          "description": "Penalty for repeated tokens; higher values discourage repetition."
        },
        "frequency_penalty": {
          "type": "number",
          "minimum": -2,
          "maximum": 2,
          "description": "Decreases the likelihood of the model repeating the same lines verbatim."
        },
        "presence_penalty": {
          "type": "number",
          "minimum": -2,
          "maximum": 2,
          "description": "Increases the likelihood of the model introducing new topics."
        }
      },
      "required": [
        "prompt"
      ]
    },
    {
      "title": "Messages",
      "properties": {
        "messages": {
          "type": "array",
          "description": "An array of message objects representing the conversation history.",
          "items": {
            "type": "object",
            "properties": {
              "role": {
                "type": "string",
                "description": "The role of the message sender (e.g., 'user', 'assistant', 'system', 'tool')."
              },
              "content": {
                "type": "string",
                "description": "The content of the message as a string."
              }
            },
            "required": [
              "role",
              "content"
            ]
          }
        },
        "functions": {
          "type": "array",
          "items": {
            "type": "object",
            "properties": {
              "name": {
                "type": "string"
              },
              "code": {
                "type": "string"
              }
            },
            "required": [
              "name",
              "code"
            ]
          }
        },
        "tools": {
          "type": "array",
          "description": "A list of tools available for the assistant to use.",
          "items": {
            "type": "object",
            "oneOf": [
              {
                "properties": {
                  "name": {
                    "type": "string",
                    "description": "The name of the tool. More descriptive the better."
                  },
                  "description": {
                    "type": "string",
                    "description": "A brief description of what the tool does."
                  },
                  "parameters": {
                    "type": "object",
                    "description": "Schema defining the parameters accepted by the tool.",
                    "properties": {
                      "type": {
                        "type": "string",
                        "description": "The type of the parameters object (usually 'object')."
                      },
                      "required": {
                        "type": "array",
                        "description": "List of required parameter names.",
                        "items": {
                          "type": "string"
                        }
                      },
                      "properties": {
                        "type": "object",
                        "description": "Definitions of each parameter.",
                        "additionalProperties": {
                          "type": "object",
                          "properties": {
                            "type": {
                              "type": "string",
                              "description": "The data type of the parameter."
                            },
                            "description": {
                              "type": "string",
                              "description": "A description of the expected parameter."
                            }
                          },
                          "required": [
                            "type",
                            "description"
                          ]
                        }
                      }
                    },
                    "required": [
                      "type",
                      "properties"
                    ]
                  }
                },
                "required": [
                  "name",
                  "description",
                  "parameters"
                ]
              },
              {
                "properties": {
                  "type": {
                    "type": "string",
                    "description": "Specifies the type of tool (e.g., 'function')."
                  },
                  "function": {
                    "type": "object",
                    "description": "Details of the function tool.",
                    "properties": {
                      "name": {
                        "type": "string",
                        "description": "The name of the function."
                      },
                      "description": {
                        "type": "string",
                        "description": "A brief description of what the function does."
                      },
                      "parameters": {
                        "type": "object",
                        "description": "Schema defining the parameters accepted by the function.",
                        "properties": {
                          "type": {
                            "type": "string",
                            "description": "The type of the parameters object (usually 'object')."
                          },
                          "required": {
                            "type": "array",
                            "description": "List of required parameter names.",
                            "items": {
                              "type": "string"
                            }
                          },
                          "properties": {
                            "type": "object",
                            "description": "Definitions of each parameter.",
                            "additionalProperties": {
                              "type": "object",
                              "properties": {
                                "type": {
                                  "type": "string",
                                  "description": "The data type of the parameter."
                                },
                                "description": {
                                  "type": "string",
                                  "description": "A description of the expected parameter."
                                }
                              },
                              "required": [
                                "type",
                                "description"
                              ]
                            }
                          }
                        },
                        "required": [
                          "type",
                          "properties"
                        ]
                      }
                    },
                    "required": [
                      "name",
                      "description",
                      "parameters"
                    ]
                  }
                },
                "required": [
                  "type",
                  "function"
                ]
              }
            ]
          }
        },
        "response_format": {
          "title": "JSON Mode",
          "type": "object",
          "properties": {
            "type": {
              "type": "string",
              "enum": [
                "json_object",
                "json_schema"
              ]
            },
            "json_schema": {}
          }
        },
        "raw": {
          "type": "boolean",
          "default": false,
          "description": "If true, a chat template is not applied and you must adhere to the specific model's expected formatting."
        },
        "stream": {
          "type": "boolean",
          "default": false,
          "description": "If true, the response will be streamed back incrementally using SSE, Server Sent Events."
        },
        "max_tokens": {
          "type": "integer",
          "default": 256,
          "description": "The maximum number of tokens to generate in the response."
        },
        "temperature": {
          "type": "number",
          "default": 0.6,
          "minimum": 0,
          "maximum": 5,
          "description": "Controls the randomness of the output; higher values produce more random results."
        },
        "top_p": {
          "type": "number",
          "minimum": 0.001,
          "maximum": 1,
          "description": "Adjusts the creativity of the AI's responses by controlling how many possible words it considers. Lower values make outputs more predictable; higher values allow for more varied and creative responses."
        },
        "top_k": {
          "type": "integer",
          "minimum": 1,
          "maximum": 50,
          "description": "Limits the AI to choose from the top 'k' most probable words. Lower values make responses more focused; higher values introduce more variety and potential surprises."
        },
        "seed": {
          "type": "integer",
          "minimum": 1,
          "maximum": 9999999999,
          "description": "Random seed for reproducibility of the generation."
        },
        "repetition_penalty": {
          "type": "number",
          "minimum": 0,
          "maximum": 2,
          "description": "Penalty for repeated tokens; higher values discourage repetition."
        },
        "frequency_penalty": {
          "type": "number",
          "minimum": -2,
          "maximum": 2,
          "description": "Decreases the likelihood of the model repeating the same lines verbatim."
        },
        "presence_penalty": {
          "type": "number",
          "minimum": -2,
          "maximum": 2,
          "description": "Increases the likelihood of the model introducing new topics."
        }
      },
      "required": [
        "messages"
      ]
    }
  ]
}
```

**Example Request:**
```javascript
const response = await fetch(
  'https://api.cloudflare.com/client/v4/accounts/{account_id}/ai/run/@cf/meta/llama-3.1-8b-instruct-fp8',
  {
    method: 'POST',
    headers: {
      'Authorization': 'Bearer YOUR_API_TOKEN',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      "prompt": "Hello, how are you?"
})
  }
);

const result = await response.json();
console.log(result);
```

**Output Schema:**
```json
{
  "oneOf": [
    {
      "type": "object",
      "properties": {
        "response": {
          "type": "string",
          "description": "The generated text response from the model"
        },
        "usage": {
          "type": "object",
          "description": "Usage statistics for the inference request",
          "properties": {
            "prompt_tokens": {
              "type": "number",
              "description": "Total number of tokens in input",
              "default": 0
            },
            "completion_tokens": {
              "type": "number",
              "description": "Total number of tokens in output",
              "default": 0
            },
            "total_tokens": {
              "type": "number",
              "description": "Total number of input and output tokens",
              "default": 0
            }
          }
        },
        "tool_calls": {
          "type": "array",
          "description": "An array of tool calls requests made during the response generation",
          "items": {
            "type": "object",
            "properties": {
              "arguments": {
                "type": "object",
                "description": "The arguments passed to be passed to the tool call request"
              },
              "name": {
                "type": "string",
                "description": "The name of the tool to be called"
              }
            }
          }
        }
      },
      "required": [
        "response"
      ]
    },
    {
      "type": "string",
      "format": "binary"
    }
  ]
}
```

---

### @cf/qwen/qwen1.5-7b-chat-awq

**Input Schema:**
```json
{
  "type": "object",
  "oneOf": [
    {
      "title": "Prompt",
      "properties": {
        "prompt": {
          "type": "string",
          "minLength": 1,
          "description": "The input text prompt for the model to generate a response."
        },
        "lora": {
          "type": "string",
          "description": "Name of the LoRA (Low-Rank Adaptation) model to fine-tune the base model."
        },
        "response_format": {
          "title": "JSON Mode",
          "type": "object",
          "properties": {
            "type": {
              "type": "string",
              "enum": [
                "json_object",
                "json_schema"
              ]
            },
            "json_schema": {}
          }
        },
        "raw": {
          "type": "boolean",
          "default": false,
          "description": "If true, a chat template is not applied and you must adhere to the specific model's expected formatting."
        },
        "stream": {
          "type": "boolean",
          "default": false,
          "description": "If true, the response will be streamed back incrementally using SSE, Server Sent Events."
        },
        "max_tokens": {
          "type": "integer",
          "default": 256,
          "description": "The maximum number of tokens to generate in the response."
        },
        "temperature": {
          "type": "number",
          "default": 0.6,
          "minimum": 0,
          "maximum": 5,
          "description": "Controls the randomness of the output; higher values produce more random results."
        },
        "top_p": {
          "type": "number",
          "minimum": 0.001,
          "maximum": 1,
          "description": "Adjusts the creativity of the AI's responses by controlling how many possible words it considers. Lower values make outputs more predictable; higher values allow for more varied and creative responses."
        },
        "top_k": {
          "type": "integer",
          "minimum": 1,
          "maximum": 50,
          "description": "Limits the AI to choose from the top 'k' most probable words. Lower values make responses more focused; higher values introduce more variety and potential surprises."
        },
        "seed": {
          "type": "integer",
          "minimum": 1,
          "maximum": 9999999999,
          "description": "Random seed for reproducibility of the generation."
        },
        "repetition_penalty": {
          "type": "number",
          "minimum": 0,
          "maximum": 2,
          "description": "Penalty for repeated tokens; higher values discourage repetition."
        },
        "frequency_penalty": {
          "type": "number",
          "minimum": -2,
          "maximum": 2,
          "description": "Decreases the likelihood of the model repeating the same lines verbatim."
        },
        "presence_penalty": {
          "type": "number",
          "minimum": -2,
          "maximum": 2,
          "description": "Increases the likelihood of the model introducing new topics."
        }
      },
      "required": [
        "prompt"
      ]
    },
    {
      "title": "Messages",
      "properties": {
        "messages": {
          "type": "array",
          "description": "An array of message objects representing the conversation history.",
          "items": {
            "type": "object",
            "properties": {
              "role": {
                "type": "string",
                "description": "The role of the message sender (e.g., 'user', 'assistant', 'system', 'tool')."
              },
              "content": {
                "type": "string",
                "description": "The content of the message as a string."
              }
            },
            "required": [
              "role",
              "content"
            ]
          }
        },
        "functions": {
          "type": "array",
          "items": {
            "type": "object",
            "properties": {
              "name": {
                "type": "string"
              },
              "code": {
                "type": "string"
              }
            },
            "required": [
              "name",
              "code"
            ]
          }
        },
        "tools": {
          "type": "array",
          "description": "A list of tools available for the assistant to use.",
          "items": {
            "type": "object",
            "oneOf": [
              {
                "properties": {
                  "name": {
                    "type": "string",
                    "description": "The name of the tool. More descriptive the better."
                  },
                  "description": {
                    "type": "string",
                    "description": "A brief description of what the tool does."
                  },
                  "parameters": {
                    "type": "object",
                    "description": "Schema defining the parameters accepted by the tool.",
                    "properties": {
                      "type": {
                        "type": "string",
                        "description": "The type of the parameters object (usually 'object')."
                      },
                      "required": {
                        "type": "array",
                        "description": "List of required parameter names.",
                        "items": {
                          "type": "string"
                        }
                      },
                      "properties": {
                        "type": "object",
                        "description": "Definitions of each parameter.",
                        "additionalProperties": {
                          "type": "object",
                          "properties": {
                            "type": {
                              "type": "string",
                              "description": "The data type of the parameter."
                            },
                            "description": {
                              "type": "string",
                              "description": "A description of the expected parameter."
                            }
                          },
                          "required": [
                            "type",
                            "description"
                          ]
                        }
                      }
                    },
                    "required": [
                      "type",
                      "properties"
                    ]
                  }
                },
                "required": [
                  "name",
                  "description",
                  "parameters"
                ]
              },
              {
                "properties": {
                  "type": {
                    "type": "string",
                    "description": "Specifies the type of tool (e.g., 'function')."
                  },
                  "function": {
                    "type": "object",
                    "description": "Details of the function tool.",
                    "properties": {
                      "name": {
                        "type": "string",
                        "description": "The name of the function."
                      },
                      "description": {
                        "type": "string",
                        "description": "A brief description of what the function does."
                      },
                      "parameters": {
                        "type": "object",
                        "description": "Schema defining the parameters accepted by the function.",
                        "properties": {
                          "type": {
                            "type": "string",
                            "description": "The type of the parameters object (usually 'object')."
                          },
                          "required": {
                            "type": "array",
                            "description": "List of required parameter names.",
                            "items": {
                              "type": "string"
                            }
                          },
                          "properties": {
                            "type": "object",
                            "description": "Definitions of each parameter.",
                            "additionalProperties": {
                              "type": "object",
                              "properties": {
                                "type": {
                                  "type": "string",
                                  "description": "The data type of the parameter."
                                },
                                "description": {
                                  "type": "string",
                                  "description": "A description of the expected parameter."
                                }
                              },
                              "required": [
                                "type",
                                "description"
                              ]
                            }
                          }
                        },
                        "required": [
                          "type",
                          "properties"
                        ]
                      }
                    },
                    "required": [
                      "name",
                      "description",
                      "parameters"
                    ]
                  }
                },
                "required": [
                  "type",
                  "function"
                ]
              }
            ]
          }
        },
        "response_format": {
          "title": "JSON Mode",
          "type": "object",
          "properties": {
            "type": {
              "type": "string",
              "enum": [
                "json_object",
                "json_schema"
              ]
            },
            "json_schema": {}
          }
        },
        "raw": {
          "type": "boolean",
          "default": false,
          "description": "If true, a chat template is not applied and you must adhere to the specific model's expected formatting."
        },
        "stream": {
          "type": "boolean",
          "default": false,
          "description": "If true, the response will be streamed back incrementally using SSE, Server Sent Events."
        },
        "max_tokens": {
          "type": "integer",
          "default": 256,
          "description": "The maximum number of tokens to generate in the response."
        },
        "temperature": {
          "type": "number",
          "default": 0.6,
          "minimum": 0,
          "maximum": 5,
          "description": "Controls the randomness of the output; higher values produce more random results."
        },
        "top_p": {
          "type": "number",
          "minimum": 0.001,
          "maximum": 1,
          "description": "Adjusts the creativity of the AI's responses by controlling how many possible words it considers. Lower values make outputs more predictable; higher values allow for more varied and creative responses."
        },
        "top_k": {
          "type": "integer",
          "minimum": 1,
          "maximum": 50,
          "description": "Limits the AI to choose from the top 'k' most probable words. Lower values make responses more focused; higher values introduce more variety and potential surprises."
        },
        "seed": {
          "type": "integer",
          "minimum": 1,
          "maximum": 9999999999,
          "description": "Random seed for reproducibility of the generation."
        },
        "repetition_penalty": {
          "type": "number",
          "minimum": 0,
          "maximum": 2,
          "description": "Penalty for repeated tokens; higher values discourage repetition."
        },
        "frequency_penalty": {
          "type": "number",
          "minimum": -2,
          "maximum": 2,
          "description": "Decreases the likelihood of the model repeating the same lines verbatim."
        },
        "presence_penalty": {
          "type": "number",
          "minimum": -2,
          "maximum": 2,
          "description": "Increases the likelihood of the model introducing new topics."
        }
      },
      "required": [
        "messages"
      ]
    }
  ]
}
```

**Example Request:**
```javascript
const response = await fetch(
  'https://api.cloudflare.com/client/v4/accounts/{account_id}/ai/run/@cf/qwen/qwen1.5-7b-chat-awq',
  {
    method: 'POST',
    headers: {
      'Authorization': 'Bearer YOUR_API_TOKEN',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      "prompt": "Hello, how are you?"
})
  }
);

const result = await response.json();
console.log(result);
```

**Output Schema:**
```json
{
  "oneOf": [
    {
      "type": "object",
      "properties": {
        "response": {
          "type": "string",
          "description": "The generated text response from the model"
        },
        "usage": {
          "type": "object",
          "description": "Usage statistics for the inference request",
          "properties": {
            "prompt_tokens": {
              "type": "number",
              "description": "Total number of tokens in input",
              "default": 0
            },
            "completion_tokens": {
              "type": "number",
              "description": "Total number of tokens in output",
              "default": 0
            },
            "total_tokens": {
              "type": "number",
              "description": "Total number of input and output tokens",
              "default": 0
            }
          }
        },
        "tool_calls": {
          "type": "array",
          "description": "An array of tool calls requests made during the response generation",
          "items": {
            "type": "object",
            "properties": {
              "arguments": {
                "type": "object",
                "description": "The arguments passed to be passed to the tool call request"
              },
              "name": {
                "type": "string",
                "description": "The name of the tool to be called"
              }
            }
          }
        }
      },
      "required": [
        "response"
      ]
    },
    {
      "type": "string",
      "format": "binary"
    }
  ]
}
```

---

### @cf/meta/llama-3.2-1b-instruct

**Input Schema:**
```json
{
  "type": "object",
  "oneOf": [
    {
      "title": "Prompt",
      "properties": {
        "prompt": {
          "type": "string",
          "minLength": 1,
          "description": "The input text prompt for the model to generate a response."
        },
        "lora": {
          "type": "string",
          "description": "Name of the LoRA (Low-Rank Adaptation) model to fine-tune the base model."
        },
        "response_format": {
          "title": "JSON Mode",
          "type": "object",
          "properties": {
            "type": {
              "type": "string",
              "enum": [
                "json_object",
                "json_schema"
              ]
            },
            "json_schema": {}
          }
        },
        "raw": {
          "type": "boolean",
          "default": false,
          "description": "If true, a chat template is not applied and you must adhere to the specific model's expected formatting."
        },
        "stream": {
          "type": "boolean",
          "default": false,
          "description": "If true, the response will be streamed back incrementally using SSE, Server Sent Events."
        },
        "max_tokens": {
          "type": "integer",
          "default": 256,
          "description": "The maximum number of tokens to generate in the response."
        },
        "temperature": {
          "type": "number",
          "default": 0.6,
          "minimum": 0,
          "maximum": 5,
          "description": "Controls the randomness of the output; higher values produce more random results."
        },
        "top_p": {
          "type": "number",
          "minimum": 0.001,
          "maximum": 1,
          "description": "Adjusts the creativity of the AI's responses by controlling how many possible words it considers. Lower values make outputs more predictable; higher values allow for more varied and creative responses."
        },
        "top_k": {
          "type": "integer",
          "minimum": 1,
          "maximum": 50,
          "description": "Limits the AI to choose from the top 'k' most probable words. Lower values make responses more focused; higher values introduce more variety and potential surprises."
        },
        "seed": {
          "type": "integer",
          "minimum": 1,
          "maximum": 9999999999,
          "description": "Random seed for reproducibility of the generation."
        },
        "repetition_penalty": {
          "type": "number",
          "minimum": 0,
          "maximum": 2,
          "description": "Penalty for repeated tokens; higher values discourage repetition."
        },
        "frequency_penalty": {
          "type": "number",
          "minimum": -2,
          "maximum": 2,
          "description": "Decreases the likelihood of the model repeating the same lines verbatim."
        },
        "presence_penalty": {
          "type": "number",
          "minimum": -2,
          "maximum": 2,
          "description": "Increases the likelihood of the model introducing new topics."
        }
      },
      "required": [
        "prompt"
      ]
    },
    {
      "title": "Messages",
      "properties": {
        "messages": {
          "type": "array",
          "description": "An array of message objects representing the conversation history.",
          "items": {
            "type": "object",
            "properties": {
              "role": {
                "type": "string",
                "description": "The role of the message sender (e.g., 'user', 'assistant', 'system', 'tool')."
              },
              "content": {
                "type": "string",
                "description": "The content of the message as a string."
              }
            },
            "required": [
              "role",
              "content"
            ]
          }
        },
        "functions": {
          "type": "array",
          "items": {
            "type": "object",
            "properties": {
              "name": {
                "type": "string"
              },
              "code": {
                "type": "string"
              }
            },
            "required": [
              "name",
              "code"
            ]
          }
        },
        "tools": {
          "type": "array",
          "description": "A list of tools available for the assistant to use.",
          "items": {
            "type": "object",
            "oneOf": [
              {
                "properties": {
                  "name": {
                    "type": "string",
                    "description": "The name of the tool. More descriptive the better."
                  },
                  "description": {
                    "type": "string",
                    "description": "A brief description of what the tool does."
                  },
                  "parameters": {
                    "type": "object",
                    "description": "Schema defining the parameters accepted by the tool.",
                    "properties": {
                      "type": {
                        "type": "string",
                        "description": "The type of the parameters object (usually 'object')."
                      },
                      "required": {
                        "type": "array",
                        "description": "List of required parameter names.",
                        "items": {
                          "type": "string"
                        }
                      },
                      "properties": {
                        "type": "object",
                        "description": "Definitions of each parameter.",
                        "additionalProperties": {
                          "type": "object",
                          "properties": {
                            "type": {
                              "type": "string",
                              "description": "The data type of the parameter."
                            },
                            "description": {
                              "type": "string",
                              "description": "A description of the expected parameter."
                            }
                          },
                          "required": [
                            "type",
                            "description"
                          ]
                        }
                      }
                    },
                    "required": [
                      "type",
                      "properties"
                    ]
                  }
                },
                "required": [
                  "name",
                  "description",
                  "parameters"
                ]
              },
              {
                "properties": {
                  "type": {
                    "type": "string",
                    "description": "Specifies the type of tool (e.g., 'function')."
                  },
                  "function": {
                    "type": "object",
                    "description": "Details of the function tool.",
                    "properties": {
                      "name": {
                        "type": "string",
                        "description": "The name of the function."
                      },
                      "description": {
                        "type": "string",
                        "description": "A brief description of what the function does."
                      },
                      "parameters": {
                        "type": "object",
                        "description": "Schema defining the parameters accepted by the function.",
                        "properties": {
                          "type": {
                            "type": "string",
                            "description": "The type of the parameters object (usually 'object')."
                          },
                          "required": {
                            "type": "array",
                            "description": "List of required parameter names.",
                            "items": {
                              "type": "string"
                            }
                          },
                          "properties": {
                            "type": "object",
                            "description": "Definitions of each parameter.",
                            "additionalProperties": {
                              "type": "object",
                              "properties": {
                                "type": {
                                  "type": "string",
                                  "description": "The data type of the parameter."
                                },
                                "description": {
                                  "type": "string",
                                  "description": "A description of the expected parameter."
                                }
                              },
                              "required": [
                                "type",
                                "description"
                              ]
                            }
                          }
                        },
                        "required": [
                          "type",
                          "properties"
                        ]
                      }
                    },
                    "required": [
                      "name",
                      "description",
                      "parameters"
                    ]
                  }
                },
                "required": [
                  "type",
                  "function"
                ]
              }
            ]
          }
        },
        "response_format": {
          "title": "JSON Mode",
          "type": "object",
          "properties": {
            "type": {
              "type": "string",
              "enum": [
                "json_object",
                "json_schema"
              ]
            },
            "json_schema": {}
          }
        },
        "raw": {
          "type": "boolean",
          "default": false,
          "description": "If true, a chat template is not applied and you must adhere to the specific model's expected formatting."
        },
        "stream": {
          "type": "boolean",
          "default": false,
          "description": "If true, the response will be streamed back incrementally using SSE, Server Sent Events."
        },
        "max_tokens": {
          "type": "integer",
          "default": 256,
          "description": "The maximum number of tokens to generate in the response."
        },
        "temperature": {
          "type": "number",
          "default": 0.6,
          "minimum": 0,
          "maximum": 5,
          "description": "Controls the randomness of the output; higher values produce more random results."
        },
        "top_p": {
          "type": "number",
          "minimum": 0.001,
          "maximum": 1,
          "description": "Adjusts the creativity of the AI's responses by controlling how many possible words it considers. Lower values make outputs more predictable; higher values allow for more varied and creative responses."
        },
        "top_k": {
          "type": "integer",
          "minimum": 1,
          "maximum": 50,
          "description": "Limits the AI to choose from the top 'k' most probable words. Lower values make responses more focused; higher values introduce more variety and potential surprises."
        },
        "seed": {
          "type": "integer",
          "minimum": 1,
          "maximum": 9999999999,
          "description": "Random seed for reproducibility of the generation."
        },
        "repetition_penalty": {
          "type": "number",
          "minimum": 0,
          "maximum": 2,
          "description": "Penalty for repeated tokens; higher values discourage repetition."
        },
        "frequency_penalty": {
          "type": "number",
          "minimum": -2,
          "maximum": 2,
          "description": "Decreases the likelihood of the model repeating the same lines verbatim."
        },
        "presence_penalty": {
          "type": "number",
          "minimum": -2,
          "maximum": 2,
          "description": "Increases the likelihood of the model introducing new topics."
        }
      },
      "required": [
        "messages"
      ]
    }
  ]
}
```

**Example Request:**
```javascript
const response = await fetch(
  'https://api.cloudflare.com/client/v4/accounts/{account_id}/ai/run/@cf/meta/llama-3.2-1b-instruct',
  {
    method: 'POST',
    headers: {
      'Authorization': 'Bearer YOUR_API_TOKEN',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      "prompt": "Hello, how are you?"
})
  }
);

const result = await response.json();
console.log(result);
```

**Output Schema:**
```json
{
  "oneOf": [
    {
      "type": "object",
      "properties": {
        "response": {
          "type": "string",
          "description": "The generated text response from the model"
        },
        "usage": {
          "type": "object",
          "description": "Usage statistics for the inference request",
          "properties": {
            "prompt_tokens": {
              "type": "number",
              "description": "Total number of tokens in input",
              "default": 0
            },
            "completion_tokens": {
              "type": "number",
              "description": "Total number of tokens in output",
              "default": 0
            },
            "total_tokens": {
              "type": "number",
              "description": "Total number of input and output tokens",
              "default": 0
            }
          }
        },
        "tool_calls": {
          "type": "array",
          "description": "An array of tool calls requests made during the response generation",
          "items": {
            "type": "object",
            "properties": {
              "arguments": {
                "type": "object",
                "description": "The arguments passed to be passed to the tool call request"
              },
              "name": {
                "type": "string",
                "description": "The name of the tool to be called"
              }
            }
          }
        }
      },
      "required": [
        "response"
      ]
    },
    {
      "type": "string",
      "format": "binary"
    }
  ]
}
```

---

### @cf/meta-llama/llama-2-7b-chat-hf-lora

**Input Schema:**
```json
{
  "type": "object",
  "oneOf": [
    {
      "title": "Prompt",
      "properties": {
        "prompt": {
          "type": "string",
          "minLength": 1,
          "description": "The input text prompt for the model to generate a response."
        },
        "lora": {
          "type": "string",
          "description": "Name of the LoRA (Low-Rank Adaptation) model to fine-tune the base model."
        },
        "response_format": {
          "title": "JSON Mode",
          "type": "object",
          "properties": {
            "type": {
              "type": "string",
              "enum": [
                "json_object",
                "json_schema"
              ]
            },
            "json_schema": {}
          }
        },
        "raw": {
          "type": "boolean",
          "default": false,
          "description": "If true, a chat template is not applied and you must adhere to the specific model's expected formatting."
        },
        "stream": {
          "type": "boolean",
          "default": false,
          "description": "If true, the response will be streamed back incrementally using SSE, Server Sent Events."
        },
        "max_tokens": {
          "type": "integer",
          "default": 256,
          "description": "The maximum number of tokens to generate in the response."
        },
        "temperature": {
          "type": "number",
          "default": 0.6,
          "minimum": 0,
          "maximum": 5,
          "description": "Controls the randomness of the output; higher values produce more random results."
        },
        "top_p": {
          "type": "number",
          "minimum": 0.001,
          "maximum": 1,
          "description": "Adjusts the creativity of the AI's responses by controlling how many possible words it considers. Lower values make outputs more predictable; higher values allow for more varied and creative responses."
        },
        "top_k": {
          "type": "integer",
          "minimum": 1,
          "maximum": 50,
          "description": "Limits the AI to choose from the top 'k' most probable words. Lower values make responses more focused; higher values introduce more variety and potential surprises."
        },
        "seed": {
          "type": "integer",
          "minimum": 1,
          "maximum": 9999999999,
          "description": "Random seed for reproducibility of the generation."
        },
        "repetition_penalty": {
          "type": "number",
          "minimum": 0,
          "maximum": 2,
          "description": "Penalty for repeated tokens; higher values discourage repetition."
        },
        "frequency_penalty": {
          "type": "number",
          "minimum": -2,
          "maximum": 2,
          "description": "Decreases the likelihood of the model repeating the same lines verbatim."
        },
        "presence_penalty": {
          "type": "number",
          "minimum": -2,
          "maximum": 2,
          "description": "Increases the likelihood of the model introducing new topics."
        }
      },
      "required": [
        "prompt"
      ]
    },
    {
      "title": "Messages",
      "properties": {
        "messages": {
          "type": "array",
          "description": "An array of message objects representing the conversation history.",
          "items": {
            "type": "object",
            "properties": {
              "role": {
                "type": "string",
                "description": "The role of the message sender (e.g., 'user', 'assistant', 'system', 'tool')."
              },
              "content": {
                "type": "string",
                "description": "The content of the message as a string."
              }
            },
            "required": [
              "role",
              "content"
            ]
          }
        },
        "functions": {
          "type": "array",
          "items": {
            "type": "object",
            "properties": {
              "name": {
                "type": "string"
              },
              "code": {
                "type": "string"
              }
            },
            "required": [
              "name",
              "code"
            ]
          }
        },
        "tools": {
          "type": "array",
          "description": "A list of tools available for the assistant to use.",
          "items": {
            "type": "object",
            "oneOf": [
              {
                "properties": {
                  "name": {
                    "type": "string",
                    "description": "The name of the tool. More descriptive the better."
                  },
                  "description": {
                    "type": "string",
                    "description": "A brief description of what the tool does."
                  },
                  "parameters": {
                    "type": "object",
                    "description": "Schema defining the parameters accepted by the tool.",
                    "properties": {
                      "type": {
                        "type": "string",
                        "description": "The type of the parameters object (usually 'object')."
                      },
                      "required": {
                        "type": "array",
                        "description": "List of required parameter names.",
                        "items": {
                          "type": "string"
                        }
                      },
                      "properties": {
                        "type": "object",
                        "description": "Definitions of each parameter.",
                        "additionalProperties": {
                          "type": "object",
                          "properties": {
                            "type": {
                              "type": "string",
                              "description": "The data type of the parameter."
                            },
                            "description": {
                              "type": "string",
                              "description": "A description of the expected parameter."
                            }
                          },
                          "required": [
                            "type",
                            "description"
                          ]
                        }
                      }
                    },
                    "required": [
                      "type",
                      "properties"
                    ]
                  }
                },
                "required": [
                  "name",
                  "description",
                  "parameters"
                ]
              },
              {
                "properties": {
                  "type": {
                    "type": "string",
                    "description": "Specifies the type of tool (e.g., 'function')."
                  },
                  "function": {
                    "type": "object",
                    "description": "Details of the function tool.",
                    "properties": {
                      "name": {
                        "type": "string",
                        "description": "The name of the function."
                      },
                      "description": {
                        "type": "string",
                        "description": "A brief description of what the function does."
                      },
                      "parameters": {
                        "type": "object",
                        "description": "Schema defining the parameters accepted by the function.",
                        "properties": {
                          "type": {
                            "type": "string",
                            "description": "The type of the parameters object (usually 'object')."
                          },
                          "required": {
                            "type": "array",
                            "description": "List of required parameter names.",
                            "items": {
                              "type": "string"
                            }
                          },
                          "properties": {
                            "type": "object",
                            "description": "Definitions of each parameter.",
                            "additionalProperties": {
                              "type": "object",
                              "properties": {
                                "type": {
                                  "type": "string",
                                  "description": "The data type of the parameter."
                                },
                                "description": {
                                  "type": "string",
                                  "description": "A description of the expected parameter."
                                }
                              },
                              "required": [
                                "type",
                                "description"
                              ]
                            }
                          }
                        },
                        "required": [
                          "type",
                          "properties"
                        ]
                      }
                    },
                    "required": [
                      "name",
                      "description",
                      "parameters"
                    ]
                  }
                },
                "required": [
                  "type",
                  "function"
                ]
              }
            ]
          }
        },
        "response_format": {
          "title": "JSON Mode",
          "type": "object",
          "properties": {
            "type": {
              "type": "string",
              "enum": [
                "json_object",
                "json_schema"
              ]
            },
            "json_schema": {}
          }
        },
        "raw": {
          "type": "boolean",
          "default": false,
          "description": "If true, a chat template is not applied and you must adhere to the specific model's expected formatting."
        },
        "stream": {
          "type": "boolean",
          "default": false,
          "description": "If true, the response will be streamed back incrementally using SSE, Server Sent Events."
        },
        "max_tokens": {
          "type": "integer",
          "default": 256,
          "description": "The maximum number of tokens to generate in the response."
        },
        "temperature": {
          "type": "number",
          "default": 0.6,
          "minimum": 0,
          "maximum": 5,
          "description": "Controls the randomness of the output; higher values produce more random results."
        },
        "top_p": {
          "type": "number",
          "minimum": 0.001,
          "maximum": 1,
          "description": "Adjusts the creativity of the AI's responses by controlling how many possible words it considers. Lower values make outputs more predictable; higher values allow for more varied and creative responses."
        },
        "top_k": {
          "type": "integer",
          "minimum": 1,
          "maximum": 50,
          "description": "Limits the AI to choose from the top 'k' most probable words. Lower values make responses more focused; higher values introduce more variety and potential surprises."
        },
        "seed": {
          "type": "integer",
          "minimum": 1,
          "maximum": 9999999999,
          "description": "Random seed for reproducibility of the generation."
        },
        "repetition_penalty": {
          "type": "number",
          "minimum": 0,
          "maximum": 2,
          "description": "Penalty for repeated tokens; higher values discourage repetition."
        },
        "frequency_penalty": {
          "type": "number",
          "minimum": -2,
          "maximum": 2,
          "description": "Decreases the likelihood of the model repeating the same lines verbatim."
        },
        "presence_penalty": {
          "type": "number",
          "minimum": -2,
          "maximum": 2,
          "description": "Increases the likelihood of the model introducing new topics."
        }
      },
      "required": [
        "messages"
      ]
    }
  ]
}
```

**Example Request:**
```javascript
const response = await fetch(
  'https://api.cloudflare.com/client/v4/accounts/{account_id}/ai/run/@cf/meta-llama/llama-2-7b-chat-hf-lora',
  {
    method: 'POST',
    headers: {
      'Authorization': 'Bearer YOUR_API_TOKEN',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      "prompt": "Hello, how are you?"
})
  }
);

const result = await response.json();
console.log(result);
```

**Output Schema:**
```json
{
  "oneOf": [
    {
      "type": "object",
      "properties": {
        "response": {
          "type": "string",
          "description": "The generated text response from the model"
        },
        "usage": {
          "type": "object",
          "description": "Usage statistics for the inference request",
          "properties": {
            "prompt_tokens": {
              "type": "number",
              "description": "Total number of tokens in input",
              "default": 0
            },
            "completion_tokens": {
              "type": "number",
              "description": "Total number of tokens in output",
              "default": 0
            },
            "total_tokens": {
              "type": "number",
              "description": "Total number of input and output tokens",
              "default": 0
            }
          }
        },
        "tool_calls": {
          "type": "array",
          "description": "An array of tool calls requests made during the response generation",
          "items": {
            "type": "object",
            "properties": {
              "arguments": {
                "type": "object",
                "description": "The arguments passed to be passed to the tool call request"
              },
              "name": {
                "type": "string",
                "description": "The name of the tool to be called"
              }
            }
          }
        }
      },
      "required": [
        "response"
      ]
    },
    {
      "type": "string",
      "format": "binary"
    }
  ]
}
```

---

### @cf/meta/llama-3.3-70b-instruct-fp8-fast

**Input Schema:**
```json
{
  "type": "object",
  "oneOf": [
    {
      "title": "Prompt",
      "properties": {
        "prompt": {
          "type": "string",
          "minLength": 1,
          "description": "The input text prompt for the model to generate a response."
        },
        "lora": {
          "type": "string",
          "description": "Name of the LoRA (Low-Rank Adaptation) model to fine-tune the base model."
        },
        "response_format": {
          "title": "JSON Mode",
          "type": "object",
          "properties": {
            "type": {
              "type": "string",
              "enum": [
                "json_object",
                "json_schema"
              ]
            },
            "json_schema": {}
          }
        },
        "raw": {
          "type": "boolean",
          "default": false,
          "description": "If true, a chat template is not applied and you must adhere to the specific model's expected formatting."
        },
        "stream": {
          "type": "boolean",
          "default": false,
          "description": "If true, the response will be streamed back incrementally using SSE, Server Sent Events."
        },
        "max_tokens": {
          "type": "integer",
          "default": 256,
          "description": "The maximum number of tokens to generate in the response."
        },
        "temperature": {
          "type": "number",
          "default": 0.6,
          "minimum": 0,
          "maximum": 5,
          "description": "Controls the randomness of the output; higher values produce more random results."
        },
        "top_p": {
          "type": "number",
          "minimum": 0.001,
          "maximum": 1,
          "description": "Adjusts the creativity of the AI's responses by controlling how many possible words it considers. Lower values make outputs more predictable; higher values allow for more varied and creative responses."
        },
        "top_k": {
          "type": "integer",
          "minimum": 1,
          "maximum": 50,
          "description": "Limits the AI to choose from the top 'k' most probable words. Lower values make responses more focused; higher values introduce more variety and potential surprises."
        },
        "seed": {
          "type": "integer",
          "minimum": 1,
          "maximum": 9999999999,
          "description": "Random seed for reproducibility of the generation."
        },
        "repetition_penalty": {
          "type": "number",
          "minimum": 0,
          "maximum": 2,
          "description": "Penalty for repeated tokens; higher values discourage repetition."
        },
        "frequency_penalty": {
          "type": "number",
          "minimum": -2,
          "maximum": 2,
          "description": "Decreases the likelihood of the model repeating the same lines verbatim."
        },
        "presence_penalty": {
          "type": "number",
          "minimum": -2,
          "maximum": 2,
          "description": "Increases the likelihood of the model introducing new topics."
        }
      },
      "required": [
        "prompt"
      ]
    },
    {
      "title": "Messages",
      "properties": {
        "messages": {
          "type": "array",
          "description": "An array of message objects representing the conversation history.",
          "items": {
            "type": "object",
            "properties": {
              "role": {
                "type": "string",
                "description": "The role of the message sender (e.g., 'user', 'assistant', 'system', 'tool')."
              },
              "content": {
                "type": "string",
                "description": "The content of the message as a string."
              }
            },
            "required": [
              "role",
              "content"
            ]
          }
        },
        "functions": {
          "type": "array",
          "items": {
            "type": "object",
            "properties": {
              "name": {
                "type": "string"
              },
              "code": {
                "type": "string"
              }
            },
            "required": [
              "name",
              "code"
            ]
          }
        },
        "tools": {
          "type": "array",
          "description": "A list of tools available for the assistant to use.",
          "items": {
            "type": "object",
            "oneOf": [
              {
                "properties": {
                  "name": {
                    "type": "string",
                    "description": "The name of the tool. More descriptive the better."
                  },
                  "description": {
                    "type": "string",
                    "description": "A brief description of what the tool does."
                  },
                  "parameters": {
                    "type": "object",
                    "description": "Schema defining the parameters accepted by the tool.",
                    "properties": {
                      "type": {
                        "type": "string",
                        "description": "The type of the parameters object (usually 'object')."
                      },
                      "required": {
                        "type": "array",
                        "description": "List of required parameter names.",
                        "items": {
                          "type": "string"
                        }
                      },
                      "properties": {
                        "type": "object",
                        "description": "Definitions of each parameter.",
                        "additionalProperties": {
                          "type": "object",
                          "properties": {
                            "type": {
                              "type": "string",
                              "description": "The data type of the parameter."
                            },
                            "description": {
                              "type": "string",
                              "description": "A description of the expected parameter."
                            }
                          },
                          "required": [
                            "type",
                            "description"
                          ]
                        }
                      }
                    },
                    "required": [
                      "type",
                      "properties"
                    ]
                  }
                },
                "required": [
                  "name",
                  "description",
                  "parameters"
                ]
              },
              {
                "properties": {
                  "type": {
                    "type": "string",
                    "description": "Specifies the type of tool (e.g., 'function')."
                  },
                  "function": {
                    "type": "object",
                    "description": "Details of the function tool.",
                    "properties": {
                      "name": {
                        "type": "string",
                        "description": "The name of the function."
                      },
                      "description": {
                        "type": "string",
                        "description": "A brief description of what the function does."
                      },
                      "parameters": {
                        "type": "object",
                        "description": "Schema defining the parameters accepted by the function.",
                        "properties": {
                          "type": {
                            "type": "string",
                            "description": "The type of the parameters object (usually 'object')."
                          },
                          "required": {
                            "type": "array",
                            "description": "List of required parameter names.",
                            "items": {
                              "type": "string"
                            }
                          },
                          "properties": {
                            "type": "object",
                            "description": "Definitions of each parameter.",
                            "additionalProperties": {
                              "type": "object",
                              "properties": {
                                "type": {
                                  "type": "string",
                                  "description": "The data type of the parameter."
                                },
                                "description": {
                                  "type": "string",
                                  "description": "A description of the expected parameter."
                                }
                              },
                              "required": [
                                "type",
                                "description"
                              ]
                            }
                          }
                        },
                        "required": [
                          "type",
                          "properties"
                        ]
                      }
                    },
                    "required": [
                      "name",
                      "description",
                      "parameters"
                    ]
                  }
                },
                "required": [
                  "type",
                  "function"
                ]
              }
            ]
          }
        },
        "response_format": {
          "title": "JSON Mode",
          "type": "object",
          "properties": {
            "type": {
              "type": "string",
              "enum": [
                "json_object",
                "json_schema"
              ]
            },
            "json_schema": {}
          }
        },
        "raw": {
          "type": "boolean",
          "default": false,
          "description": "If true, a chat template is not applied and you must adhere to the specific model's expected formatting."
        },
        "stream": {
          "type": "boolean",
          "default": false,
          "description": "If true, the response will be streamed back incrementally using SSE, Server Sent Events."
        },
        "max_tokens": {
          "type": "integer",
          "default": 256,
          "description": "The maximum number of tokens to generate in the response."
        },
        "temperature": {
          "type": "number",
          "default": 0.6,
          "minimum": 0,
          "maximum": 5,
          "description": "Controls the randomness of the output; higher values produce more random results."
        },
        "top_p": {
          "type": "number",
          "minimum": 0.001,
          "maximum": 1,
          "description": "Adjusts the creativity of the AI's responses by controlling how many possible words it considers. Lower values make outputs more predictable; higher values allow for more varied and creative responses."
        },
        "top_k": {
          "type": "integer",
          "minimum": 1,
          "maximum": 50,
          "description": "Limits the AI to choose from the top 'k' most probable words. Lower values make responses more focused; higher values introduce more variety and potential surprises."
        },
        "seed": {
          "type": "integer",
          "minimum": 1,
          "maximum": 9999999999,
          "description": "Random seed for reproducibility of the generation."
        },
        "repetition_penalty": {
          "type": "number",
          "minimum": 0,
          "maximum": 2,
          "description": "Penalty for repeated tokens; higher values discourage repetition."
        },
        "frequency_penalty": {
          "type": "number",
          "minimum": -2,
          "maximum": 2,
          "description": "Decreases the likelihood of the model repeating the same lines verbatim."
        },
        "presence_penalty": {
          "type": "number",
          "minimum": -2,
          "maximum": 2,
          "description": "Increases the likelihood of the model introducing new topics."
        }
      },
      "required": [
        "messages"
      ]
    },
    {
      "title": "Async Batch",
      "type": "object",
      "properties": {
        "requests": {
          "type": "array",
          "items": {
            "type": "object",
            "properties": {
              "external_reference": {
                "type": "string",
                "description": "User-supplied reference. This field will be present in the response as well it can be used to reference the request and response. It's NOT validated to be unique."
              },
              "prompt": {
                "type": "string",
                "minLength": 1,
                "description": "Prompt for the text generation model"
              },
              "stream": {
                "type": "boolean",
                "default": false,
                "description": "If true, the response will be streamed back incrementally using SSE, Server Sent Events."
              },
              "max_tokens": {
                "type": "integer",
                "default": 256,
                "description": "The maximum number of tokens to generate in the response."
              },
              "temperature": {
                "type": "number",
                "default": 0.6,
                "minimum": 0,
                "maximum": 5,
                "description": "Controls the randomness of the output; higher values produce more random results."
              },
              "top_p": {
                "type": "number",
                "minimum": 0,
                "maximum": 2,
                "description": "Adjusts the creativity of the AI's responses by controlling how many possible words it considers. Lower values make outputs more predictable; higher values allow for more varied and creative responses."
              },
              "seed": {
                "type": "integer",
                "minimum": 1,
                "maximum": 9999999999,
                "description": "Random seed for reproducibility of the generation."
              },
              "repetition_penalty": {
                "type": "number",
                "minimum": 0,
                "maximum": 2,
                "description": "Penalty for repeated tokens; higher values discourage repetition."
              },
              "frequency_penalty": {
                "type": "number",
                "minimum": 0,
                "maximum": 2,
                "description": "Decreases the likelihood of the model repeating the same lines verbatim."
              },
              "presence_penalty": {
                "type": "number",
                "minimum": 0,
                "maximum": 2,
                "description": "Increases the likelihood of the model introducing new topics."
              },
              "response_format": {
                "title": "JSON Mode",
                "type": "object",
                "properties": {
                  "type": {
                    "type": "string",
                    "enum": [
                      "json_object",
                      "json_schema"
                    ]
                  },
                  "json_schema": {}
                }
              }
            }
          }
        }
      }
    }
  ]
}
```

**Example Request:**
```javascript
const response = await fetch(
  'https://api.cloudflare.com/client/v4/accounts/{account_id}/ai/run/@cf/meta/llama-3.3-70b-instruct-fp8-fast',
  {
    method: 'POST',
    headers: {
      'Authorization': 'Bearer YOUR_API_TOKEN',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      "prompt": "Hello, how are you?"
})
  }
);

const result = await response.json();
console.log(result);
```

**Output Schema:**
```json
{
  "oneOf": [
    {
      "type": "object",
      "contentType": "application/json",
      "properties": {
        "response": {
          "type": "string",
          "description": "The generated text response from the model"
        },
        "usage": {
          "type": "object",
          "description": "Usage statistics for the inference request",
          "properties": {
            "prompt_tokens": {
              "type": "number",
              "description": "Total number of tokens in input",
              "default": 0
            },
            "completion_tokens": {
              "type": "number",
              "description": "Total number of tokens in output",
              "default": 0
            },
            "total_tokens": {
              "type": "number",
              "description": "Total number of input and output tokens",
              "default": 0
            }
          }
        },
        "tool_calls": {
          "type": "array",
          "description": "An array of tool calls requests made during the response generation",
          "items": {
            "type": "object",
            "properties": {
              "arguments": {
                "type": "object",
                "description": "The arguments passed to be passed to the tool call request"
              },
              "name": {
                "type": "string",
                "description": "The name of the tool to be called"
              }
            }
          }
        }
      },
      "required": [
        "response"
      ]
    },
    {
      "type": "string",
      "contentType": "text/event-stream",
      "format": "binary"
    },
    {
      "type": "object",
      "contentType": "application/json",
      "title": "Async response",
      "properties": {
        "request_id": {
          "type": "string",
          "description": "The async request id that can be used to obtain the results."
        }
      }
    }
  ]
}
```

---

### @cf/ibm-granite/granite-4.0-h-micro

**Input Schema:**
```json
{
  "type": "object",
  "oneOf": [
    {
      "title": "Prompt",
      "properties": {
        "prompt": {
          "type": "string",
          "minLength": 1,
          "description": "The input text prompt for the model to generate a response."
        },
        "lora": {
          "type": "string",
          "description": "Name of the LoRA (Low-Rank Adaptation) model to fine-tune the base model."
        },
        "response_format": {
          "title": "JSON Mode",
          "type": "object",
          "properties": {
            "type": {
              "type": "string",
              "enum": [
                "json_object",
                "json_schema"
              ]
            },
            "json_schema": {}
          }
        },
        "raw": {
          "type": "boolean",
          "default": false,
          "description": "If true, a chat template is not applied and you must adhere to the specific model's expected formatting."
        },
        "stream": {
          "type": "boolean",
          "default": false,
          "description": "If true, the response will be streamed back incrementally using SSE, Server Sent Events."
        },
        "max_tokens": {
          "type": "integer",
          "default": 256,
          "description": "The maximum number of tokens to generate in the response."
        },
        "temperature": {
          "type": "number",
          "default": 0.6,
          "minimum": 0,
          "maximum": 5,
          "description": "Controls the randomness of the output; higher values produce more random results."
        },
        "top_p": {
          "type": "number",
          "minimum": 0.001,
          "maximum": 1,
          "description": "Adjusts the creativity of the AI's responses by controlling how many possible words it considers. Lower values make outputs more predictable; higher values allow for more varied and creative responses."
        },
        "top_k": {
          "type": "integer",
          "minimum": 1,
          "maximum": 50,
          "description": "Limits the AI to choose from the top 'k' most probable words. Lower values make responses more focused; higher values introduce more variety and potential surprises."
        },
        "seed": {
          "type": "integer",
          "minimum": 1,
          "maximum": 9999999999,
          "description": "Random seed for reproducibility of the generation."
        },
        "repetition_penalty": {
          "type": "number",
          "minimum": 0,
          "maximum": 2,
          "description": "Penalty for repeated tokens; higher values discourage repetition."
        },
        "frequency_penalty": {
          "type": "number",
          "minimum": -2,
          "maximum": 2,
          "description": "Decreases the likelihood of the model repeating the same lines verbatim."
        },
        "presence_penalty": {
          "type": "number",
          "minimum": -2,
          "maximum": 2,
          "description": "Increases the likelihood of the model introducing new topics."
        }
      },
      "required": [
        "prompt"
      ]
    },
    {
      "title": "Messages",
      "properties": {
        "messages": {
          "type": "array",
          "description": "An array of message objects representing the conversation history.",
          "items": {
            "type": "object",
            "properties": {
              "role": {
                "type": "string",
                "description": "The role of the message sender (e.g., 'user', 'assistant', 'system', 'tool')."
              },
              "content": {
                "type": "string",
                "description": "The content of the message as a string."
              }
            },
            "required": [
              "role",
              "content"
            ]
          }
        },
        "functions": {
          "type": "array",
          "items": {
            "type": "object",
            "properties": {
              "name": {
                "type": "string"
              },
              "code": {
                "type": "string"
              }
            },
            "required": [
              "name",
              "code"
            ]
          }
        },
        "tools": {
          "type": "array",
          "description": "A list of tools available for the assistant to use.",
          "items": {
            "type": "object",
            "oneOf": [
              {
                "properties": {
                  "name": {
                    "type": "string",
                    "description": "The name of the tool. More descriptive the better."
                  },
                  "description": {
                    "type": "string",
                    "description": "A brief description of what the tool does."
                  },
                  "parameters": {
                    "type": "object",
                    "description": "Schema defining the parameters accepted by the tool.",
                    "properties": {
                      "type": {
                        "type": "string",
                        "description": "The type of the parameters object (usually 'object')."
                      },
                      "required": {
                        "type": "array",
                        "description": "List of required parameter names.",
                        "items": {
                          "type": "string"
                        }
                      },
                      "properties": {
                        "type": "object",
                        "description": "Definitions of each parameter.",
                        "additionalProperties": {
                          "type": "object",
                          "properties": {
                            "type": {
                              "type": "string",
                              "description": "The data type of the parameter."
                            },
                            "description": {
                              "type": "string",
                              "description": "A description of the expected parameter."
                            }
                          },
                          "required": [
                            "type",
                            "description"
                          ]
                        }
                      }
                    },
                    "required": [
                      "type",
                      "properties"
                    ]
                  }
                },
                "required": [
                  "name",
                  "description",
                  "parameters"
                ]
              },
              {
                "properties": {
                  "type": {
                    "type": "string",
                    "description": "Specifies the type of tool (e.g., 'function')."
                  },
                  "function": {
                    "type": "object",
                    "description": "Details of the function tool.",
                    "properties": {
                      "name": {
                        "type": "string",
                        "description": "The name of the function."
                      },
                      "description": {
                        "type": "string",
                        "description": "A brief description of what the function does."
                      },
                      "parameters": {
                        "type": "object",
                        "description": "Schema defining the parameters accepted by the function.",
                        "properties": {
                          "type": {
                            "type": "string",
                            "description": "The type of the parameters object (usually 'object')."
                          },
                          "required": {
                            "type": "array",
                            "description": "List of required parameter names.",
                            "items": {
                              "type": "string"
                            }
                          },
                          "properties": {
                            "type": "object",
                            "description": "Definitions of each parameter.",
                            "additionalProperties": {
                              "type": "object",
                              "properties": {
                                "type": {
                                  "type": "string",
                                  "description": "The data type of the parameter."
                                },
                                "description": {
                                  "type": "string",
                                  "description": "A description of the expected parameter."
                                }
                              },
                              "required": [
                                "type",
                                "description"
                              ]
                            }
                          }
                        },
                        "required": [
                          "type",
                          "properties"
                        ]
                      }
                    },
                    "required": [
                      "name",
                      "description",
                      "parameters"
                    ]
                  }
                },
                "required": [
                  "type",
                  "function"
                ]
              }
            ]
          }
        },
        "response_format": {
          "title": "JSON Mode",
          "type": "object",
          "properties": {
            "type": {
              "type": "string",
              "enum": [
                "json_object",
                "json_schema"
              ]
            },
            "json_schema": {}
          }
        },
        "raw": {
          "type": "boolean",
          "default": false,
          "description": "If true, a chat template is not applied and you must adhere to the specific model's expected formatting."
        },
        "stream": {
          "type": "boolean",
          "default": false,
          "description": "If true, the response will be streamed back incrementally using SSE, Server Sent Events."
        },
        "max_tokens": {
          "type": "integer",
          "default": 256,
          "description": "The maximum number of tokens to generate in the response."
        },
        "temperature": {
          "type": "number",
          "default": 0.6,
          "minimum": 0,
          "maximum": 5,
          "description": "Controls the randomness of the output; higher values produce more random results."
        },
        "top_p": {
          "type": "number",
          "minimum": 0.001,
          "maximum": 1,
          "description": "Adjusts the creativity of the AI's responses by controlling how many possible words it considers. Lower values make outputs more predictable; higher values allow for more varied and creative responses."
        },
        "top_k": {
          "type": "integer",
          "minimum": 1,
          "maximum": 50,
          "description": "Limits the AI to choose from the top 'k' most probable words. Lower values make responses more focused; higher values introduce more variety and potential surprises."
        },
        "seed": {
          "type": "integer",
          "minimum": 1,
          "maximum": 9999999999,
          "description": "Random seed for reproducibility of the generation."
        },
        "repetition_penalty": {
          "type": "number",
          "minimum": 0,
          "maximum": 2,
          "description": "Penalty for repeated tokens; higher values discourage repetition."
        },
        "frequency_penalty": {
          "type": "number",
          "minimum": -2,
          "maximum": 2,
          "description": "Decreases the likelihood of the model repeating the same lines verbatim."
        },
        "presence_penalty": {
          "type": "number",
          "minimum": -2,
          "maximum": 2,
          "description": "Increases the likelihood of the model introducing new topics."
        }
      },
      "required": [
        "messages"
      ]
    }
  ]
}
```

**Example Request:**
```javascript
const response = await fetch(
  'https://api.cloudflare.com/client/v4/accounts/{account_id}/ai/run/@cf/ibm-granite/granite-4.0-h-micro',
  {
    method: 'POST',
    headers: {
      'Authorization': 'Bearer YOUR_API_TOKEN',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      "prompt": "Hello, how are you?"
})
  }
);

const result = await response.json();
console.log(result);
```

**Output Schema:**
```json
{
  "oneOf": [
    {
      "type": "object",
      "properties": {
        "response": {
          "type": "string",
          "description": "The generated text response from the model"
        },
        "usage": {
          "type": "object",
          "description": "Usage statistics for the inference request",
          "properties": {
            "prompt_tokens": {
              "type": "number",
              "description": "Total number of tokens in input",
              "default": 0
            },
            "completion_tokens": {
              "type": "number",
              "description": "Total number of tokens in output",
              "default": 0
            },
            "total_tokens": {
              "type": "number",
              "description": "Total number of input and output tokens",
              "default": 0
            }
          }
        },
        "tool_calls": {
          "type": "array",
          "description": "An array of tool calls requests made during the response generation",
          "items": {
            "type": "object",
            "properties": {
              "arguments": {
                "type": "object",
                "description": "The arguments passed to be passed to the tool call request"
              },
              "name": {
                "type": "string",
                "description": "The name of the tool to be called"
              }
            }
          }
        }
      },
      "required": [
        "response"
      ]
    },
    {
      "type": "string",
      "format": "binary"
    }
  ]
}
```

---

### @cf/lykon/dreamshaper-8-lcm

**Input Schema:**
```json
{
  "type": "object",
  "properties": {
    "prompt": {
      "type": "string",
      "minLength": 1,
      "description": "A text description of the image you want to generate"
    },
    "negative_prompt": {
      "type": "string",
      "description": "Text describing elements to avoid in the generated image"
    },
    "height": {
      "type": "integer",
      "minimum": 256,
      "maximum": 2048,
      "description": "The height of the generated image in pixels"
    },
    "width": {
      "type": "integer",
      "minimum": 256,
      "maximum": 2048,
      "description": "The width of the generated image in pixels"
    },
    "image": {
      "type": "array",
      "description": "For use with img2img tasks. An array of integers that represent the image data constrained to 8-bit unsigned integer values",
      "items": {
        "type": "number",
        "description": "A value between 0 and 255"
      }
    },
    "image_b64": {
      "type": "string",
      "description": "For use with img2img tasks. A base64-encoded string of the input image"
    },
    "mask": {
      "type": "array",
      "description": "An array representing An array of integers that represent mask image data for inpainting constrained to 8-bit unsigned integer values",
      "items": {
        "type": "number",
        "description": "A value between 0 and 255"
      }
    },
    "num_steps": {
      "type": "integer",
      "default": 20,
      "maximum": 20,
      "description": "The number of diffusion steps; higher values can improve quality but take longer"
    },
    "strength": {
      "type": "number",
      "default": 1,
      "description": "A value between 0 and 1 indicating how strongly to apply the transformation during img2img tasks; lower values make the output closer to the input image"
    },
    "guidance": {
      "type": "number",
      "default": 7.5,
      "description": "Controls how closely the generated image should adhere to the prompt; higher values make the image more aligned with the prompt"
    },
    "seed": {
      "type": "integer",
      "description": "Random seed for reproducibility of the image generation"
    }
  },
  "required": [
    "prompt"
  ]
}
```

**Example Request:**
```javascript
const response = await fetch(
  'https://api.cloudflare.com/client/v4/accounts/{account_id}/ai/run/@cf/lykon/dreamshaper-8-lcm',
  {
    method: 'POST',
    headers: {
      'Authorization': 'Bearer YOUR_API_TOKEN',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      "prompt": "Hello, how are you?",
      "negative_prompt": "example",
      "height": 256,
      "width": 256,
      "image": [],
      "image_b64": "example",
      "mask": [],
      "num_steps": 20,
      "strength": 1,
      "guidance": 7.5,
      "seed": 256
})
  }
);

const result = await response.json();
console.log(result);
```

**Output Schema:**
```json
{
  "type": "string",
  "contentType": "image/png",
  "format": "binary",
  "description": "The generated image in PNG format"
}
```

---

### @cf/qwen/qwen2.5-coder-32b-instruct

**Input Schema:**
```json
{
  "type": "object",
  "oneOf": [
    {
      "title": "Prompt",
      "properties": {
        "prompt": {
          "type": "string",
          "minLength": 1,
          "description": "The input text prompt for the model to generate a response."
        },
        "lora": {
          "type": "string",
          "description": "Name of the LoRA (Low-Rank Adaptation) model to fine-tune the base model."
        },
        "response_format": {
          "title": "JSON Mode",
          "type": "object",
          "properties": {
            "type": {
              "type": "string",
              "enum": [
                "json_object",
                "json_schema"
              ]
            },
            "json_schema": {}
          }
        },
        "raw": {
          "type": "boolean",
          "default": false,
          "description": "If true, a chat template is not applied and you must adhere to the specific model's expected formatting."
        },
        "stream": {
          "type": "boolean",
          "default": false,
          "description": "If true, the response will be streamed back incrementally using SSE, Server Sent Events."
        },
        "max_tokens": {
          "type": "integer",
          "default": 256,
          "description": "The maximum number of tokens to generate in the response."
        },
        "temperature": {
          "type": "number",
          "default": 0.6,
          "minimum": 0,
          "maximum": 5,
          "description": "Controls the randomness of the output; higher values produce more random results."
        },
        "top_p": {
          "type": "number",
          "minimum": 0,
          "maximum": 2,
          "description": "Adjusts the creativity of the AI's responses by controlling how many possible words it considers. Lower values make outputs more predictable; higher values allow for more varied and creative responses."
        },
        "top_k": {
          "type": "integer",
          "minimum": 1,
          "maximum": 50,
          "description": "Limits the AI to choose from the top 'k' most probable words. Lower values make responses more focused; higher values introduce more variety and potential surprises."
        },
        "seed": {
          "type": "integer",
          "minimum": 1,
          "maximum": 9999999999,
          "description": "Random seed for reproducibility of the generation."
        },
        "repetition_penalty": {
          "type": "number",
          "minimum": 0,
          "maximum": 2,
          "description": "Penalty for repeated tokens; higher values discourage repetition."
        },
        "frequency_penalty": {
          "type": "number",
          "minimum": 0,
          "maximum": 2,
          "description": "Decreases the likelihood of the model repeating the same lines verbatim."
        },
        "presence_penalty": {
          "type": "number",
          "minimum": 0,
          "maximum": 2,
          "description": "Increases the likelihood of the model introducing new topics."
        }
      },
      "required": [
        "prompt"
      ]
    },
    {
      "title": "Messages",
      "properties": {
        "messages": {
          "type": "array",
          "description": "An array of message objects representing the conversation history.",
          "items": {
            "type": "object",
            "properties": {
              "role": {
                "type": "string",
                "description": "The role of the message sender (e.g., 'user', 'assistant', 'system', 'tool')."
              },
              "content": {
                "type": "string",
                "description": "The content of the message as a string."
              }
            },
            "required": [
              "role",
              "content"
            ]
          }
        },
        "functions": {
          "type": "array",
          "items": {
            "type": "object",
            "properties": {
              "name": {
                "type": "string"
              },
              "code": {
                "type": "string"
              }
            },
            "required": [
              "name",
              "code"
            ]
          }
        },
        "tools": {
          "type": "array",
          "description": "A list of tools available for the assistant to use.",
          "items": {
            "type": "object",
            "oneOf": [
              {
                "properties": {
                  "name": {
                    "type": "string",
                    "description": "The name of the tool. More descriptive the better."
                  },
                  "description": {
                    "type": "string",
                    "description": "A brief description of what the tool does."
                  },
                  "parameters": {
                    "type": "object",
                    "description": "Schema defining the parameters accepted by the tool.",
                    "properties": {
                      "type": {
                        "type": "string",
                        "description": "The type of the parameters object (usually 'object')."
                      },
                      "required": {
                        "type": "array",
                        "description": "List of required parameter names.",
                        "items": {
                          "type": "string"
                        }
                      },
                      "properties": {
                        "type": "object",
                        "description": "Definitions of each parameter.",
                        "additionalProperties": {
                          "type": "object",
                          "properties": {
                            "type": {
                              "type": "string",
                              "description": "The data type of the parameter."
                            },
                            "description": {
                              "type": "string",
                              "description": "A description of the expected parameter."
                            }
                          },
                          "required": [
                            "type",
                            "description"
                          ]
                        }
                      }
                    },
                    "required": [
                      "type",
                      "properties"
                    ]
                  }
                },
                "required": [
                  "name",
                  "description",
                  "parameters"
                ]
              },
              {
                "properties": {
                  "type": {
                    "type": "string",
                    "description": "Specifies the type of tool (e.g., 'function')."
                  },
                  "function": {
                    "type": "object",
                    "description": "Details of the function tool.",
                    "properties": {
                      "name": {
                        "type": "string",
                        "description": "The name of the function."
                      },
                      "description": {
                        "type": "string",
                        "description": "A brief description of what the function does."
                      },
                      "parameters": {
                        "type": "object",
                        "description": "Schema defining the parameters accepted by the function.",
                        "properties": {
                          "type": {
                            "type": "string",
                            "description": "The type of the parameters object (usually 'object')."
                          },
                          "required": {
                            "type": "array",
                            "description": "List of required parameter names.",
                            "items": {
                              "type": "string"
                            }
                          },
                          "properties": {
                            "type": "object",
                            "description": "Definitions of each parameter.",
                            "additionalProperties": {
                              "type": "object",
                              "properties": {
                                "type": {
                                  "type": "string",
                                  "description": "The data type of the parameter."
                                },
                                "description": {
                                  "type": "string",
                                  "description": "A description of the expected parameter."
                                }
                              },
                              "required": [
                                "type",
                                "description"
                              ]
                            }
                          }
                        },
                        "required": [
                          "type",
                          "properties"
                        ]
                      }
                    },
                    "required": [
                      "name",
                      "description",
                      "parameters"
                    ]
                  }
                },
                "required": [
                  "type",
                  "function"
                ]
              }
            ]
          }
        },
        "response_format": {
          "title": "JSON Mode",
          "type": "object",
          "properties": {
            "type": {
              "type": "string",
              "enum": [
                "json_object",
                "json_schema"
              ]
            },
            "json_schema": {}
          }
        },
        "raw": {
          "type": "boolean",
          "default": false,
          "description": "If true, a chat template is not applied and you must adhere to the specific model's expected formatting."
        },
        "stream": {
          "type": "boolean",
          "default": false,
          "description": "If true, the response will be streamed back incrementally using SSE, Server Sent Events."
        },
        "max_tokens": {
          "type": "integer",
          "default": 256,
          "description": "The maximum number of tokens to generate in the response."
        },
        "temperature": {
          "type": "number",
          "default": 0.6,
          "minimum": 0,
          "maximum": 5,
          "description": "Controls the randomness of the output; higher values produce more random results."
        },
        "top_p": {
          "type": "number",
          "minimum": 0,
          "maximum": 2,
          "description": "Adjusts the creativity of the AI's responses by controlling how many possible words it considers. Lower values make outputs more predictable; higher values allow for more varied and creative responses."
        },
        "top_k": {
          "type": "integer",
          "minimum": 1,
          "maximum": 50,
          "description": "Limits the AI to choose from the top 'k' most probable words. Lower values make responses more focused; higher values introduce more variety and potential surprises."
        },
        "seed": {
          "type": "integer",
          "minimum": 1,
          "maximum": 9999999999,
          "description": "Random seed for reproducibility of the generation."
        },
        "repetition_penalty": {
          "type": "number",
          "minimum": 0,
          "maximum": 2,
          "description": "Penalty for repeated tokens; higher values discourage repetition."
        },
        "frequency_penalty": {
          "type": "number",
          "minimum": 0,
          "maximum": 2,
          "description": "Decreases the likelihood of the model repeating the same lines verbatim."
        },
        "presence_penalty": {
          "type": "number",
          "minimum": 0,
          "maximum": 2,
          "description": "Increases the likelihood of the model introducing new topics."
        }
      },
      "required": [
        "messages"
      ]
    }
  ]
}
```

**Example Request:**
```javascript
const response = await fetch(
  'https://api.cloudflare.com/client/v4/accounts/{account_id}/ai/run/@cf/qwen/qwen2.5-coder-32b-instruct',
  {
    method: 'POST',
    headers: {
      'Authorization': 'Bearer YOUR_API_TOKEN',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      "prompt": "Hello, how are you?"
})
  }
);

const result = await response.json();
console.log(result);
```

**Output Schema:**
```json
{
  "oneOf": [
    {
      "type": "object",
      "properties": {
        "response": {
          "type": "string",
          "description": "The generated text response from the model"
        },
        "usage": {
          "type": "object",
          "description": "Usage statistics for the inference request",
          "properties": {
            "prompt_tokens": {
              "type": "number",
              "description": "Total number of tokens in input",
              "default": 0
            },
            "completion_tokens": {
              "type": "number",
              "description": "Total number of tokens in output",
              "default": 0
            },
            "total_tokens": {
              "type": "number",
              "description": "Total number of input and output tokens",
              "default": 0
            }
          }
        },
        "tool_calls": {
          "type": "array",
          "description": "An array of tool calls requests made during the response generation",
          "items": {
            "type": "object",
            "properties": {
              "arguments": {
                "type": "object",
                "description": "The arguments passed to be passed to the tool call request"
              },
              "name": {
                "type": "string",
                "description": "The name of the tool to be called"
              }
            }
          }
        }
      },
      "required": [
        "response"
      ]
    },
    {
      "type": "string",
      "format": "binary"
    }
  ]
}
```

---

### @cf/deepseek-ai/deepseek-math-7b-instruct

**Input Schema:**
```json
{
  "type": "object",
  "oneOf": [
    {
      "title": "Prompt",
      "properties": {
        "prompt": {
          "type": "string",
          "minLength": 1,
          "description": "The input text prompt for the model to generate a response."
        },
        "lora": {
          "type": "string",
          "description": "Name of the LoRA (Low-Rank Adaptation) model to fine-tune the base model."
        },
        "response_format": {
          "title": "JSON Mode",
          "type": "object",
          "properties": {
            "type": {
              "type": "string",
              "enum": [
                "json_object",
                "json_schema"
              ]
            },
            "json_schema": {}
          }
        },
        "raw": {
          "type": "boolean",
          "default": false,
          "description": "If true, a chat template is not applied and you must adhere to the specific model's expected formatting."
        },
        "stream": {
          "type": "boolean",
          "default": false,
          "description": "If true, the response will be streamed back incrementally using SSE, Server Sent Events."
        },
        "max_tokens": {
          "type": "integer",
          "default": 256,
          "description": "The maximum number of tokens to generate in the response."
        },
        "temperature": {
          "type": "number",
          "default": 0.6,
          "minimum": 0,
          "maximum": 5,
          "description": "Controls the randomness of the output; higher values produce more random results."
        },
        "top_p": {
          "type": "number",
          "minimum": 0.001,
          "maximum": 1,
          "description": "Adjusts the creativity of the AI's responses by controlling how many possible words it considers. Lower values make outputs more predictable; higher values allow for more varied and creative responses."
        },
        "top_k": {
          "type": "integer",
          "minimum": 1,
          "maximum": 50,
          "description": "Limits the AI to choose from the top 'k' most probable words. Lower values make responses more focused; higher values introduce more variety and potential surprises."
        },
        "seed": {
          "type": "integer",
          "minimum": 1,
          "maximum": 9999999999,
          "description": "Random seed for reproducibility of the generation."
        },
        "repetition_penalty": {
          "type": "number",
          "minimum": 0,
          "maximum": 2,
          "description": "Penalty for repeated tokens; higher values discourage repetition."
        },
        "frequency_penalty": {
          "type": "number",
          "minimum": -2,
          "maximum": 2,
          "description": "Decreases the likelihood of the model repeating the same lines verbatim."
        },
        "presence_penalty": {
          "type": "number",
          "minimum": -2,
          "maximum": 2,
          "description": "Increases the likelihood of the model introducing new topics."
        }
      },
      "required": [
        "prompt"
      ]
    },
    {
      "title": "Messages",
      "properties": {
        "messages": {
          "type": "array",
          "description": "An array of message objects representing the conversation history.",
          "items": {
            "type": "object",
            "properties": {
              "role": {
                "type": "string",
                "description": "The role of the message sender (e.g., 'user', 'assistant', 'system', 'tool')."
              },
              "content": {
                "type": "string",
                "description": "The content of the message as a string."
              }
            },
            "required": [
              "role",
              "content"
            ]
          }
        },
        "functions": {
          "type": "array",
          "items": {
            "type": "object",
            "properties": {
              "name": {
                "type": "string"
              },
              "code": {
                "type": "string"
              }
            },
            "required": [
              "name",
              "code"
            ]
          }
        },
        "tools": {
          "type": "array",
          "description": "A list of tools available for the assistant to use.",
          "items": {
            "type": "object",
            "oneOf": [
              {
                "properties": {
                  "name": {
                    "type": "string",
                    "description": "The name of the tool. More descriptive the better."
                  },
                  "description": {
                    "type": "string",
                    "description": "A brief description of what the tool does."
                  },
                  "parameters": {
                    "type": "object",
                    "description": "Schema defining the parameters accepted by the tool.",
                    "properties": {
                      "type": {
                        "type": "string",
                        "description": "The type of the parameters object (usually 'object')."
                      },
                      "required": {
                        "type": "array",
                        "description": "List of required parameter names.",
                        "items": {
                          "type": "string"
                        }
                      },
                      "properties": {
                        "type": "object",
                        "description": "Definitions of each parameter.",
                        "additionalProperties": {
                          "type": "object",
                          "properties": {
                            "type": {
                              "type": "string",
                              "description": "The data type of the parameter."
                            },
                            "description": {
                              "type": "string",
                              "description": "A description of the expected parameter."
                            }
                          },
                          "required": [
                            "type",
                            "description"
                          ]
                        }
                      }
                    },
                    "required": [
                      "type",
                      "properties"
                    ]
                  }
                },
                "required": [
                  "name",
                  "description",
                  "parameters"
                ]
              },
              {
                "properties": {
                  "type": {
                    "type": "string",
                    "description": "Specifies the type of tool (e.g., 'function')."
                  },
                  "function": {
                    "type": "object",
                    "description": "Details of the function tool.",
                    "properties": {
                      "name": {
                        "type": "string",
                        "description": "The name of the function."
                      },
                      "description": {
                        "type": "string",
                        "description": "A brief description of what the function does."
                      },
                      "parameters": {
                        "type": "object",
                        "description": "Schema defining the parameters accepted by the function.",
                        "properties": {
                          "type": {
                            "type": "string",
                            "description": "The type of the parameters object (usually 'object')."
                          },
                          "required": {
                            "type": "array",
                            "description": "List of required parameter names.",
                            "items": {
                              "type": "string"
                            }
                          },
                          "properties": {
                            "type": "object",
                            "description": "Definitions of each parameter.",
                            "additionalProperties": {
                              "type": "object",
                              "properties": {
                                "type": {
                                  "type": "string",
                                  "description": "The data type of the parameter."
                                },
                                "description": {
                                  "type": "string",
                                  "description": "A description of the expected parameter."
                                }
                              },
                              "required": [
                                "type",
                                "description"
                              ]
                            }
                          }
                        },
                        "required": [
                          "type",
                          "properties"
                        ]
                      }
                    },
                    "required": [
                      "name",
                      "description",
                      "parameters"
                    ]
                  }
                },
                "required": [
                  "type",
                  "function"
                ]
              }
            ]
          }
        },
        "response_format": {
          "title": "JSON Mode",
          "type": "object",
          "properties": {
            "type": {
              "type": "string",
              "enum": [
                "json_object",
                "json_schema"
              ]
            },
            "json_schema": {}
          }
        },
        "raw": {
          "type": "boolean",
          "default": false,
          "description": "If true, a chat template is not applied and you must adhere to the specific model's expected formatting."
        },
        "stream": {
          "type": "boolean",
          "default": false,
          "description": "If true, the response will be streamed back incrementally using SSE, Server Sent Events."
        },
        "max_tokens": {
          "type": "integer",
          "default": 256,
          "description": "The maximum number of tokens to generate in the response."
        },
        "temperature": {
          "type": "number",
          "default": 0.6,
          "minimum": 0,
          "maximum": 5,
          "description": "Controls the randomness of the output; higher values produce more random results."
        },
        "top_p": {
          "type": "number",
          "minimum": 0.001,
          "maximum": 1,
          "description": "Adjusts the creativity of the AI's responses by controlling how many possible words it considers. Lower values make outputs more predictable; higher values allow for more varied and creative responses."
        },
        "top_k": {
          "type": "integer",
          "minimum": 1,
          "maximum": 50,
          "description": "Limits the AI to choose from the top 'k' most probable words. Lower values make responses more focused; higher values introduce more variety and potential surprises."
        },
        "seed": {
          "type": "integer",
          "minimum": 1,
          "maximum": 9999999999,
          "description": "Random seed for reproducibility of the generation."
        },
        "repetition_penalty": {
          "type": "number",
          "minimum": 0,
          "maximum": 2,
          "description": "Penalty for repeated tokens; higher values discourage repetition."
        },
        "frequency_penalty": {
          "type": "number",
          "minimum": -2,
          "maximum": 2,
          "description": "Decreases the likelihood of the model repeating the same lines verbatim."
        },
        "presence_penalty": {
          "type": "number",
          "minimum": -2,
          "maximum": 2,
          "description": "Increases the likelihood of the model introducing new topics."
        }
      },
      "required": [
        "messages"
      ]
    }
  ]
}
```

**Example Request:**
```javascript
const response = await fetch(
  'https://api.cloudflare.com/client/v4/accounts/{account_id}/ai/run/@cf/deepseek-ai/deepseek-math-7b-instruct',
  {
    method: 'POST',
    headers: {
      'Authorization': 'Bearer YOUR_API_TOKEN',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      "prompt": "Hello, how are you?"
})
  }
);

const result = await response.json();
console.log(result);
```

**Output Schema:**
```json
{
  "oneOf": [
    {
      "type": "object",
      "properties": {
        "response": {
          "type": "string",
          "description": "The generated text response from the model"
        },
        "usage": {
          "type": "object",
          "description": "Usage statistics for the inference request",
          "properties": {
            "prompt_tokens": {
              "type": "number",
              "description": "Total number of tokens in input",
              "default": 0
            },
            "completion_tokens": {
              "type": "number",
              "description": "Total number of tokens in output",
              "default": 0
            },
            "total_tokens": {
              "type": "number",
              "description": "Total number of input and output tokens",
              "default": 0
            }
          }
        },
        "tool_calls": {
          "type": "array",
          "description": "An array of tool calls requests made during the response generation",
          "items": {
            "type": "object",
            "properties": {
              "arguments": {
                "type": "object",
                "description": "The arguments passed to be passed to the tool call request"
              },
              "name": {
                "type": "string",
                "description": "The name of the tool to be called"
              }
            }
          }
        }
      },
      "required": [
        "response"
      ]
    },
    {
      "type": "string",
      "format": "binary"
    }
  ]
}
```

---

### @cf/tiiuae/falcon-7b-instruct

**Input Schema:**
```json
{
  "type": "object",
  "oneOf": [
    {
      "title": "Prompt",
      "properties": {
        "prompt": {
          "type": "string",
          "minLength": 1,
          "description": "The input text prompt for the model to generate a response."
        },
        "lora": {
          "type": "string",
          "description": "Name of the LoRA (Low-Rank Adaptation) model to fine-tune the base model."
        },
        "response_format": {
          "title": "JSON Mode",
          "type": "object",
          "properties": {
            "type": {
              "type": "string",
              "enum": [
                "json_object",
                "json_schema"
              ]
            },
            "json_schema": {}
          }
        },
        "raw": {
          "type": "boolean",
          "default": false,
          "description": "If true, a chat template is not applied and you must adhere to the specific model's expected formatting."
        },
        "stream": {
          "type": "boolean",
          "default": false,
          "description": "If true, the response will be streamed back incrementally using SSE, Server Sent Events."
        },
        "max_tokens": {
          "type": "integer",
          "default": 256,
          "description": "The maximum number of tokens to generate in the response."
        },
        "temperature": {
          "type": "number",
          "default": 0.6,
          "minimum": 0,
          "maximum": 5,
          "description": "Controls the randomness of the output; higher values produce more random results."
        },
        "top_p": {
          "type": "number",
          "minimum": 0.001,
          "maximum": 1,
          "description": "Adjusts the creativity of the AI's responses by controlling how many possible words it considers. Lower values make outputs more predictable; higher values allow for more varied and creative responses."
        },
        "top_k": {
          "type": "integer",
          "minimum": 1,
          "maximum": 50,
          "description": "Limits the AI to choose from the top 'k' most probable words. Lower values make responses more focused; higher values introduce more variety and potential surprises."
        },
        "seed": {
          "type": "integer",
          "minimum": 1,
          "maximum": 9999999999,
          "description": "Random seed for reproducibility of the generation."
        },
        "repetition_penalty": {
          "type": "number",
          "minimum": 0,
          "maximum": 2,
          "description": "Penalty for repeated tokens; higher values discourage repetition."
        },
        "frequency_penalty": {
          "type": "number",
          "minimum": -2,
          "maximum": 2,
          "description": "Decreases the likelihood of the model repeating the same lines verbatim."
        },
        "presence_penalty": {
          "type": "number",
          "minimum": -2,
          "maximum": 2,
          "description": "Increases the likelihood of the model introducing new topics."
        }
      },
      "required": [
        "prompt"
      ]
    },
    {
      "title": "Messages",
      "properties": {
        "messages": {
          "type": "array",
          "description": "An array of message objects representing the conversation history.",
          "items": {
            "type": "object",
            "properties": {
              "role": {
                "type": "string",
                "description": "The role of the message sender (e.g., 'user', 'assistant', 'system', 'tool')."
              },
              "content": {
                "type": "string",
                "description": "The content of the message as a string."
              }
            },
            "required": [
              "role",
              "content"
            ]
          }
        },
        "functions": {
          "type": "array",
          "items": {
            "type": "object",
            "properties": {
              "name": {
                "type": "string"
              },
              "code": {
                "type": "string"
              }
            },
            "required": [
              "name",
              "code"
            ]
          }
        },
        "tools": {
          "type": "array",
          "description": "A list of tools available for the assistant to use.",
          "items": {
            "type": "object",
            "oneOf": [
              {
                "properties": {
                  "name": {
                    "type": "string",
                    "description": "The name of the tool. More descriptive the better."
                  },
                  "description": {
                    "type": "string",
                    "description": "A brief description of what the tool does."
                  },
                  "parameters": {
                    "type": "object",
                    "description": "Schema defining the parameters accepted by the tool.",
                    "properties": {
                      "type": {
                        "type": "string",
                        "description": "The type of the parameters object (usually 'object')."
                      },
                      "required": {
                        "type": "array",
                        "description": "List of required parameter names.",
                        "items": {
                          "type": "string"
                        }
                      },
                      "properties": {
                        "type": "object",
                        "description": "Definitions of each parameter.",
                        "additionalProperties": {
                          "type": "object",
                          "properties": {
                            "type": {
                              "type": "string",
                              "description": "The data type of the parameter."
                            },
                            "description": {
                              "type": "string",
                              "description": "A description of the expected parameter."
                            }
                          },
                          "required": [
                            "type",
                            "description"
                          ]
                        }
                      }
                    },
                    "required": [
                      "type",
                      "properties"
                    ]
                  }
                },
                "required": [
                  "name",
                  "description",
                  "parameters"
                ]
              },
              {
                "properties": {
                  "type": {
                    "type": "string",
                    "description": "Specifies the type of tool (e.g., 'function')."
                  },
                  "function": {
                    "type": "object",
                    "description": "Details of the function tool.",
                    "properties": {
                      "name": {
                        "type": "string",
                        "description": "The name of the function."
                      },
                      "description": {
                        "type": "string",
                        "description": "A brief description of what the function does."
                      },
                      "parameters": {
                        "type": "object",
                        "description": "Schema defining the parameters accepted by the function.",
                        "properties": {
                          "type": {
                            "type": "string",
                            "description": "The type of the parameters object (usually 'object')."
                          },
                          "required": {
                            "type": "array",
                            "description": "List of required parameter names.",
                            "items": {
                              "type": "string"
                            }
                          },
                          "properties": {
                            "type": "object",
                            "description": "Definitions of each parameter.",
                            "additionalProperties": {
                              "type": "object",
                              "properties": {
                                "type": {
                                  "type": "string",
                                  "description": "The data type of the parameter."
                                },
                                "description": {
                                  "type": "string",
                                  "description": "A description of the expected parameter."
                                }
                              },
                              "required": [
                                "type",
                                "description"
                              ]
                            }
                          }
                        },
                        "required": [
                          "type",
                          "properties"
                        ]
                      }
                    },
                    "required": [
                      "name",
                      "description",
                      "parameters"
                    ]
                  }
                },
                "required": [
                  "type",
                  "function"
                ]
              }
            ]
          }
        },
        "response_format": {
          "title": "JSON Mode",
          "type": "object",
          "properties": {
            "type": {
              "type": "string",
              "enum": [
                "json_object",
                "json_schema"
              ]
            },
            "json_schema": {}
          }
        },
        "raw": {
          "type": "boolean",
          "default": false,
          "description": "If true, a chat template is not applied and you must adhere to the specific model's expected formatting."
        },
        "stream": {
          "type": "boolean",
          "default": false,
          "description": "If true, the response will be streamed back incrementally using SSE, Server Sent Events."
        },
        "max_tokens": {
          "type": "integer",
          "default": 256,
          "description": "The maximum number of tokens to generate in the response."
        },
        "temperature": {
          "type": "number",
          "default": 0.6,
          "minimum": 0,
          "maximum": 5,
          "description": "Controls the randomness of the output; higher values produce more random results."
        },
        "top_p": {
          "type": "number",
          "minimum": 0.001,
          "maximum": 1,
          "description": "Adjusts the creativity of the AI's responses by controlling how many possible words it considers. Lower values make outputs more predictable; higher values allow for more varied and creative responses."
        },
        "top_k": {
          "type": "integer",
          "minimum": 1,
          "maximum": 50,
          "description": "Limits the AI to choose from the top 'k' most probable words. Lower values make responses more focused; higher values introduce more variety and potential surprises."
        },
        "seed": {
          "type": "integer",
          "minimum": 1,
          "maximum": 9999999999,
          "description": "Random seed for reproducibility of the generation."
        },
        "repetition_penalty": {
          "type": "number",
          "minimum": 0,
          "maximum": 2,
          "description": "Penalty for repeated tokens; higher values discourage repetition."
        },
        "frequency_penalty": {
          "type": "number",
          "minimum": -2,
          "maximum": 2,
          "description": "Decreases the likelihood of the model repeating the same lines verbatim."
        },
        "presence_penalty": {
          "type": "number",
          "minimum": -2,
          "maximum": 2,
          "description": "Increases the likelihood of the model introducing new topics."
        }
      },
      "required": [
        "messages"
      ]
    }
  ]
}
```

**Example Request:**
```javascript
const response = await fetch(
  'https://api.cloudflare.com/client/v4/accounts/{account_id}/ai/run/@cf/tiiuae/falcon-7b-instruct',
  {
    method: 'POST',
    headers: {
      'Authorization': 'Bearer YOUR_API_TOKEN',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      "prompt": "Hello, how are you?"
})
  }
);

const result = await response.json();
console.log(result);
```

**Output Schema:**
```json
{
  "oneOf": [
    {
      "type": "object",
      "properties": {
        "response": {
          "type": "string",
          "description": "The generated text response from the model"
        },
        "usage": {
          "type": "object",
          "description": "Usage statistics for the inference request",
          "properties": {
            "prompt_tokens": {
              "type": "number",
              "description": "Total number of tokens in input",
              "default": 0
            },
            "completion_tokens": {
              "type": "number",
              "description": "Total number of tokens in output",
              "default": 0
            },
            "total_tokens": {
              "type": "number",
              "description": "Total number of input and output tokens",
              "default": 0
            }
          }
        },
        "tool_calls": {
          "type": "array",
          "description": "An array of tool calls requests made during the response generation",
          "items": {
            "type": "object",
            "properties": {
              "arguments": {
                "type": "object",
                "description": "The arguments passed to be passed to the tool call request"
              },
              "name": {
                "type": "string",
                "description": "The name of the tool to be called"
              }
            }
          }
        }
      },
      "required": [
        "response"
      ]
    },
    {
      "type": "string",
      "format": "binary"
    }
  ]
}
```

---

### @cf/aisingapore/gemma-sea-lion-v4-27b-it

**Input Schema:**
```json
{
  "type": "object",
  "oneOf": [
    {
      "title": "Prompt",
      "properties": {
        "prompt": {
          "type": "string",
          "minLength": 1,
          "description": "The input text prompt for the model to generate a response."
        },
        "lora": {
          "type": "string",
          "description": "Name of the LoRA (Low-Rank Adaptation) model to fine-tune the base model."
        },
        "response_format": {
          "title": "JSON Mode",
          "type": "object",
          "properties": {
            "type": {
              "type": "string",
              "enum": [
                "json_object",
                "json_schema"
              ]
            },
            "json_schema": {}
          }
        },
        "raw": {
          "type": "boolean",
          "default": false,
          "description": "If true, a chat template is not applied and you must adhere to the specific model's expected formatting."
        },
        "stream": {
          "type": "boolean",
          "default": false,
          "description": "If true, the response will be streamed back incrementally using SSE, Server Sent Events."
        },
        "max_tokens": {
          "type": "integer",
          "default": 2000,
          "description": "The maximum number of tokens to generate in the response."
        },
        "temperature": {
          "type": "number",
          "default": 0.6,
          "minimum": 0,
          "maximum": 5,
          "description": "Controls the randomness of the output; higher values produce more random results."
        },
        "top_p": {
          "type": "number",
          "minimum": 0.001,
          "maximum": 1,
          "description": "Adjusts the creativity of the AI's responses by controlling how many possible words it considers. Lower values make outputs more predictable; higher values allow for more varied and creative responses."
        },
        "top_k": {
          "type": "integer",
          "minimum": 1,
          "maximum": 50,
          "description": "Limits the AI to choose from the top 'k' most probable words. Lower values make responses more focused; higher values introduce more variety and potential surprises."
        },
        "seed": {
          "type": "integer",
          "minimum": 1,
          "maximum": 9999999999,
          "description": "Random seed for reproducibility of the generation."
        },
        "repetition_penalty": {
          "type": "number",
          "minimum": 0,
          "maximum": 2,
          "description": "Penalty for repeated tokens; higher values discourage repetition."
        },
        "frequency_penalty": {
          "type": "number",
          "minimum": -2,
          "maximum": 2,
          "description": "Decreases the likelihood of the model repeating the same lines verbatim."
        },
        "presence_penalty": {
          "type": "number",
          "minimum": -2,
          "maximum": 2,
          "description": "Increases the likelihood of the model introducing new topics."
        }
      },
      "required": [
        "prompt"
      ]
    },
    {
      "title": "Messages",
      "properties": {
        "messages": {
          "type": "array",
          "description": "An array of message objects representing the conversation history.",
          "items": {
            "type": "object",
            "properties": {
              "role": {
                "type": "string",
                "description": "The role of the message sender (e.g., 'user', 'assistant', 'system', 'tool')."
              },
              "content": {
                "type": "string",
                "description": "The content of the message as a string."
              }
            },
            "required": [
              "role",
              "content"
            ]
          }
        },
        "functions": {
          "type": "array",
          "items": {
            "type": "object",
            "properties": {
              "name": {
                "type": "string"
              },
              "code": {
                "type": "string"
              }
            },
            "required": [
              "name",
              "code"
            ]
          }
        },
        "tools": {
          "type": "array",
          "description": "A list of tools available for the assistant to use.",
          "items": {
            "type": "object",
            "oneOf": [
              {
                "properties": {
                  "name": {
                    "type": "string",
                    "description": "The name of the tool. More descriptive the better."
                  },
                  "description": {
                    "type": "string",
                    "description": "A brief description of what the tool does."
                  },
                  "parameters": {
                    "type": "object",
                    "description": "Schema defining the parameters accepted by the tool.",
                    "properties": {
                      "type": {
                        "type": "string",
                        "description": "The type of the parameters object (usually 'object')."
                      },
                      "required": {
                        "type": "array",
                        "description": "List of required parameter names.",
                        "items": {
                          "type": "string"
                        }
                      },
                      "properties": {
                        "type": "object",
                        "description": "Definitions of each parameter.",
                        "additionalProperties": {
                          "type": "object",
                          "properties": {
                            "type": {
                              "type": "string",
                              "description": "The data type of the parameter."
                            },
                            "description": {
                              "type": "string",
                              "description": "A description of the expected parameter."
                            }
                          },
                          "required": [
                            "type",
                            "description"
                          ]
                        }
                      }
                    },
                    "required": [
                      "type",
                      "properties"
                    ]
                  }
                },
                "required": [
                  "name",
                  "description",
                  "parameters"
                ]
              },
              {
                "properties": {
                  "type": {
                    "type": "string",
                    "description": "Specifies the type of tool (e.g., 'function')."
                  },
                  "function": {
                    "type": "object",
                    "description": "Details of the function tool.",
                    "properties": {
                      "name": {
                        "type": "string",
                        "description": "The name of the function."
                      },
                      "description": {
                        "type": "string",
                        "description": "A brief description of what the function does."
                      },
                      "parameters": {
                        "type": "object",
                        "description": "Schema defining the parameters accepted by the function.",
                        "properties": {
                          "type": {
                            "type": "string",
                            "description": "The type of the parameters object (usually 'object')."
                          },
                          "required": {
                            "type": "array",
                            "description": "List of required parameter names.",
                            "items": {
                              "type": "string"
                            }
                          },
                          "properties": {
                            "type": "object",
                            "description": "Definitions of each parameter.",
                            "additionalProperties": {
                              "type": "object",
                              "properties": {
                                "type": {
                                  "type": "string",
                                  "description": "The data type of the parameter."
                                },
                                "description": {
                                  "type": "string",
                                  "description": "A description of the expected parameter."
                                }
                              },
                              "required": [
                                "type",
                                "description"
                              ]
                            }
                          }
                        },
                        "required": [
                          "type",
                          "properties"
                        ]
                      }
                    },
                    "required": [
                      "name",
                      "description",
                      "parameters"
                    ]
                  }
                },
                "required": [
                  "type",
                  "function"
                ]
              }
            ]
          }
        },
        "response_format": {
          "title": "JSON Mode",
          "type": "object",
          "properties": {
            "type": {
              "type": "string",
              "enum": [
                "json_object",
                "json_schema"
              ]
            },
            "json_schema": {}
          }
        },
        "raw": {
          "type": "boolean",
          "default": false,
          "description": "If true, a chat template is not applied and you must adhere to the specific model's expected formatting."
        },
        "stream": {
          "type": "boolean",
          "default": false,
          "description": "If true, the response will be streamed back incrementally using SSE, Server Sent Events."
        },
        "max_tokens": {
          "type": "integer",
          "default": 2000,
          "description": "The maximum number of tokens to generate in the response."
        },
        "temperature": {
          "type": "number",
          "default": 0.6,
          "minimum": 0,
          "maximum": 5,
          "description": "Controls the randomness of the output; higher values produce more random results."
        },
        "top_p": {
          "type": "number",
          "minimum": 0.001,
          "maximum": 1,
          "description": "Adjusts the creativity of the AI's responses by controlling how many possible words it considers. Lower values make outputs more predictable; higher values allow for more varied and creative responses."
        },
        "top_k": {
          "type": "integer",
          "minimum": 1,
          "maximum": 50,
          "description": "Limits the AI to choose from the top 'k' most probable words. Lower values make responses more focused; higher values introduce more variety and potential surprises."
        },
        "seed": {
          "type": "integer",
          "minimum": 1,
          "maximum": 9999999999,
          "description": "Random seed for reproducibility of the generation."
        },
        "repetition_penalty": {
          "type": "number",
          "minimum": 0,
          "maximum": 2,
          "description": "Penalty for repeated tokens; higher values discourage repetition."
        },
        "frequency_penalty": {
          "type": "number",
          "minimum": -2,
          "maximum": 2,
          "description": "Decreases the likelihood of the model repeating the same lines verbatim."
        },
        "presence_penalty": {
          "type": "number",
          "minimum": -2,
          "maximum": 2,
          "description": "Increases the likelihood of the model introducing new topics."
        }
      },
      "required": [
        "messages"
      ]
    },
    {
      "title": "Async Batch",
      "type": "object",
      "properties": {
        "requests": {
          "type": "array",
          "items": {
            "type": "object",
            "oneOf": [
              {
                "title": "Prompt",
                "properties": {
                  "prompt": {
                    "type": "string",
                    "minLength": 1,
                    "description": "The input text prompt for the model to generate a response."
                  },
                  "lora": {
                    "type": "string",
                    "description": "Name of the LoRA (Low-Rank Adaptation) model to fine-tune the base model."
                  },
                  "response_format": {
                    "title": "JSON Mode",
                    "type": "object",
                    "properties": {
                      "type": {
                        "type": "string",
                        "enum": [
                          "json_object",
                          "json_schema"
                        ]
                      },
                      "json_schema": {}
                    }
                  },
                  "raw": {
                    "type": "boolean",
                    "default": false,
                    "description": "If true, a chat template is not applied and you must adhere to the specific model's expected formatting."
                  },
                  "stream": {
                    "type": "boolean",
                    "default": false,
                    "description": "If true, the response will be streamed back incrementally using SSE, Server Sent Events."
                  },
                  "max_tokens": {
                    "type": "integer",
                    "default": 256,
                    "description": "The maximum number of tokens to generate in the response."
                  },
                  "temperature": {
                    "type": "number",
                    "default": 0.6,
                    "minimum": 0,
                    "maximum": 5,
                    "description": "Controls the randomness of the output; higher values produce more random results."
                  },
                  "top_p": {
                    "type": "number",
                    "minimum": 0.001,
                    "maximum": 1,
                    "description": "Adjusts the creativity of the AI's responses by controlling how many possible words it considers. Lower values make outputs more predictable; higher values allow for more varied and creative responses."
                  },
                  "top_k": {
                    "type": "integer",
                    "minimum": 1,
                    "maximum": 50,
                    "description": "Limits the AI to choose from the top 'k' most probable words. Lower values make responses more focused; higher values introduce more variety and potential surprises."
                  },
                  "seed": {
                    "type": "integer",
                    "minimum": 1,
                    "maximum": 9999999999,
                    "description": "Random seed for reproducibility of the generation."
                  },
                  "repetition_penalty": {
                    "type": "number",
                    "minimum": 0,
                    "maximum": 2,
                    "description": "Penalty for repeated tokens; higher values discourage repetition."
                  },
                  "frequency_penalty": {
                    "type": "number",
                    "minimum": -2,
                    "maximum": 2,
                    "description": "Decreases the likelihood of the model repeating the same lines verbatim."
                  },
                  "presence_penalty": {
                    "type": "number",
                    "minimum": -2,
                    "maximum": 2,
                    "description": "Increases the likelihood of the model introducing new topics."
                  }
                },
                "required": [
                  "prompt"
                ]
              },
              {
                "title": "Messages",
                "properties": {
                  "messages": {
                    "type": "array",
                    "description": "An array of message objects representing the conversation history.",
                    "items": {
                      "type": "object",
                      "properties": {
                        "role": {
                          "type": "string",
                          "description": "The role of the message sender (e.g., 'user', 'assistant', 'system', 'tool')."
                        },
                        "content": {
                          "type": "string",
                          "description": "The content of the message as a string."
                        }
                      },
                      "required": [
                        "role",
                        "content"
                      ]
                    }
                  },
                  "functions": {
                    "type": "array",
                    "items": {
                      "type": "object",
                      "properties": {
                        "name": {
                          "type": "string"
                        },
                        "code": {
                          "type": "string"
                        }
                      },
                      "required": [
                        "name",
                        "code"
                      ]
                    }
                  },
                  "tools": {
                    "type": "array",
                    "description": "A list of tools available for the assistant to use.",
                    "items": {
                      "type": "object",
                      "oneOf": [
                        {
                          "properties": {
                            "name": {
                              "type": "string",
                              "description": "The name of the tool. More descriptive the better."
                            },
                            "description": {
                              "type": "string",
                              "description": "A brief description of what the tool does."
                            },
                            "parameters": {
                              "type": "object",
                              "description": "Schema defining the parameters accepted by the tool.",
                              "properties": {
                                "type": {
                                  "type": "string",
                                  "description": "The type of the parameters object (usually 'object')."
                                },
                                "required": {
                                  "type": "array",
                                  "description": "List of required parameter names.",
                                  "items": {
                                    "type": "string"
                                  }
                                },
                                "properties": {
                                  "type": "object",
                                  "description": "Definitions of each parameter.",
                                  "additionalProperties": {
                                    "type": "object",
                                    "properties": {
                                      "type": {
                                        "type": "string",
                                        "description": "The data type of the parameter."
                                      },
                                      "description": {
                                        "type": "string",
                                        "description": "A description of the expected parameter."
                                      }
                                    },
                                    "required": [
                                      "type",
                                      "description"
                                    ]
                                  }
                                }
                              },
                              "required": [
                                "type",
                                "properties"
                              ]
                            }
                          },
                          "required": [
                            "name",
                            "description",
                            "parameters"
                          ]
                        },
                        {
                          "properties": {
                            "type": {
                              "type": "string",
                              "description": "Specifies the type of tool (e.g., 'function')."
                            },
                            "function": {
                              "type": "object",
                              "description": "Details of the function tool.",
                              "properties": {
                                "name": {
                                  "type": "string",
                                  "description": "The name of the function."
                                },
                                "description": {
                                  "type": "string",
                                  "description": "A brief description of what the function does."
                                },
                                "parameters": {
                                  "type": "object",
                                  "description": "Schema defining the parameters accepted by the function.",
                                  "properties": {
                                    "type": {
                                      "type": "string",
                                      "description": "The type of the parameters object (usually 'object')."
                                    },
                                    "required": {
                                      "type": "array",
                                      "description": "List of required parameter names.",
                                      "items": {
                                        "type": "string"
                                      }
                                    },
                                    "properties": {
                                      "type": "object",
                                      "description": "Definitions of each parameter.",
                                      "additionalProperties": {
                                        "type": "object",
                                        "properties": {
                                          "type": {
                                            "type": "string",
                                            "description": "The data type of the parameter."
                                          },
                                          "description": {
                                            "type": "string",
                                            "description": "A description of the expected parameter."
                                          }
                                        },
                                        "required": [
                                          "type",
                                          "description"
                                        ]
                                      }
                                    }
                                  },
                                  "required": [
                                    "type",
                                    "properties"
                                  ]
                                }
                              },
                              "required": [
                                "name",
                                "description",
                                "parameters"
                              ]
                            }
                          },
                          "required": [
                            "type",
                            "function"
                          ]
                        }
                      ]
                    }
                  },
                  "response_format": {
                    "title": "JSON Mode",
                    "type": "object",
                    "properties": {
                      "type": {
                        "type": "string",
                        "enum": [
                          "json_object",
                          "json_schema"
                        ]
                      },
                      "json_schema": {}
                    }
                  },
                  "raw": {
                    "type": "boolean",
                    "default": false,
                    "description": "If true, a chat template is not applied and you must adhere to the specific model's expected formatting."
                  },
                  "stream": {
                    "type": "boolean",
                    "default": false,
                    "description": "If true, the response will be streamed back incrementally using SSE, Server Sent Events."
                  },
                  "max_tokens": {
                    "type": "integer",
                    "default": 256,
                    "description": "The maximum number of tokens to generate in the response."
                  },
                  "temperature": {
                    "type": "number",
                    "default": 0.6,
                    "minimum": 0,
                    "maximum": 5,
                    "description": "Controls the randomness of the output; higher values produce more random results."
                  },
                  "top_p": {
                    "type": "number",
                    "minimum": 0.001,
                    "maximum": 1,
                    "description": "Adjusts the creativity of the AI's responses by controlling how many possible words it considers. Lower values make outputs more predictable; higher values allow for more varied and creative responses."
                  },
                  "top_k": {
                    "type": "integer",
                    "minimum": 1,
                    "maximum": 50,
                    "description": "Limits the AI to choose from the top 'k' most probable words. Lower values make responses more focused; higher values introduce more variety and potential surprises."
                  },
                  "seed": {
                    "type": "integer",
                    "minimum": 1,
                    "maximum": 9999999999,
                    "description": "Random seed for reproducibility of the generation."
                  },
                  "repetition_penalty": {
                    "type": "number",
                    "minimum": 0,
                    "maximum": 2,
                    "description": "Penalty for repeated tokens; higher values discourage repetition."
                  },
                  "frequency_penalty": {
                    "type": "number",
                    "minimum": -2,
                    "maximum": 2,
                    "description": "Decreases the likelihood of the model repeating the same lines verbatim."
                  },
                  "presence_penalty": {
                    "type": "number",
                    "minimum": -2,
                    "maximum": 2,
                    "description": "Increases the likelihood of the model introducing new topics."
                  }
                },
                "required": [
                  "messages"
                ]
              }
            ]
          }
        }
      },
      "required": [
        "requests"
      ]
    }
  ]
}
```

**Example Request:**
```javascript
const response = await fetch(
  'https://api.cloudflare.com/client/v4/accounts/{account_id}/ai/run/@cf/aisingapore/gemma-sea-lion-v4-27b-it',
  {
    method: 'POST',
    headers: {
      'Authorization': 'Bearer YOUR_API_TOKEN',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      "prompt": "Hello, how are you?"
})
  }
);

const result = await response.json();
console.log(result);
```

**Output Schema:**
```json
{
  "oneOf": [
    {
      "type": "object",
      "contentType": "application/json",
      "title": "Chat Completion Response",
      "properties": {
        "id": {
          "type": "string",
          "description": "Unique identifier for the completion"
        },
        "object": {
          "type": "string",
          "enum": [
            "chat.completion"
          ],
          "description": "Object type identifier"
        },
        "created": {
          "type": "number",
          "description": "Unix timestamp of when the completion was created"
        },
        "model": {
          "type": "string",
          "description": "Model used for the completion"
        },
        "choices": {
          "type": "array",
          "description": "List of completion choices",
          "items": {
            "type": "object",
            "properties": {
              "index": {
                "type": "number",
                "description": "Index of the choice in the list"
              },
              "message": {
                "type": "object",
                "description": "The message generated by the model",
                "properties": {
                  "role": {
                    "type": "string",
                    "description": "Role of the message author"
                  },
                  "content": {
                    "type": "string",
                    "description": "The content of the message"
                  },
                  "reasoning_content": {
                    "type": "string",
                    "description": "Internal reasoning content (if available)"
                  },
                  "tool_calls": {
                    "type": "array",
                    "description": "Tool calls made by the assistant",
                    "items": {
                      "type": "object",
                      "properties": {
                        "id": {
                          "type": "string",
                          "description": "Unique identifier for the tool call"
                        },
                        "type": {
                          "type": "string",
                          "enum": [
                            "function"
                          ],
                          "description": "Type of tool call"
                        },
                        "function": {
                          "type": "object",
                          "properties": {
                            "name": {
                              "type": "string",
                              "description": "Name of the function to call"
                            },
                            "arguments": {
                              "type": "string",
                              "description": "JSON string of arguments for the function"
                            }
                          },
                          "required": [
                            "name",
                            "arguments"
                          ]
                        }
                      },
                      "required": [
                        "id",
                        "type",
                        "function"
                      ]
                    }
                  }
                },
                "required": [
                  "role",
                  "content"
                ]
              },
              "finish_reason": {
                "type": "string",
                "description": "Reason why the model stopped generating"
              },
              "stop_reason": {
                "type": [
                  "string",
                  "null"
                ],
                "description": "Stop reason (may be null)"
              },
              "logprobs": {
                "type": [
                  "object",
                  "null"
                ],
                "description": "Log probabilities (if requested)"
              }
            }
          }
        },
        "usage": {
          "type": "object",
          "description": "Usage statistics for the inference request",
          "properties": {
            "prompt_tokens": {
              "type": "number",
              "description": "Total number of tokens in input",
              "default": 0
            },
            "completion_tokens": {
              "type": "number",
              "description": "Total number of tokens in output",
              "default": 0
            },
            "total_tokens": {
              "type": "number",
              "description": "Total number of input and output tokens",
              "default": 0
            }
          }
        },
        "prompt_logprobs": {
          "type": [
            "object",
            "null"
          ],
          "description": "Log probabilities for the prompt (if requested)"
        }
      }
    },
    {
      "type": "object",
      "contentType": "application/json",
      "title": "Text Completion Response",
      "properties": {
        "id": {
          "type": "string",
          "description": "Unique identifier for the completion"
        },
        "object": {
          "type": "string",
          "enum": [
            "text_completion"
          ],
          "description": "Object type identifier"
        },
        "created": {
          "type": "number",
          "description": "Unix timestamp of when the completion was created"
        },
        "model": {
          "type": "string",
          "description": "Model used for the completion"
        },
        "choices": {
          "type": "array",
          "description": "List of completion choices",
          "items": {
            "type": "object",
            "properties": {
              "index": {
                "type": "number",
                "description": "Index of the choice in the list"
              },
              "text": {
                "type": "string",
                "description": "The generated text completion"
              },
              "finish_reason": {
                "type": "string",
                "description": "Reason why the model stopped generating"
              },
              "stop_reason": {
                "type": [
                  "string",
                  "null"
                ],
                "description": "Stop reason (may be null)"
              },
              "logprobs": {
                "type": [
                  "object",
                  "null"
                ],
                "description": "Log probabilities (if requested)"
              },
              "prompt_logprobs": {
                "type": [
                  "object",
                  "null"
                ],
                "description": "Log probabilities for the prompt (if requested)"
              }
            },
            "required": [
              "index",
              "text",
              "finish_reason"
            ]
          }
        },
        "usage": {
          "type": "object",
          "description": "Usage statistics for the inference request",
          "properties": {
            "prompt_tokens": {
              "type": "number",
              "description": "Total number of tokens in input",
              "default": 0
            },
            "completion_tokens": {
              "type": "number",
              "description": "Total number of tokens in output",
              "default": 0
            },
            "total_tokens": {
              "type": "number",
              "description": "Total number of input and output tokens",
              "default": 0
            }
          }
        }
      }
    },
    {
      "type": "string",
      "contentType": "text/event-stream",
      "format": "binary"
    },
    {
      "type": "object",
      "contentType": "application/json",
      "title": "Async response",
      "properties": {
        "request_id": {
          "type": "string",
          "description": "The async request id that can be used to obtain the results."
        }
      }
    }
  ]
}
```

---

### @cf/qwen/qwen3-30b-a3b-fp8

**Input Schema:**
```json
{
  "type": "object",
  "oneOf": [
    {
      "title": "Prompt",
      "properties": {
        "prompt": {
          "type": "string",
          "minLength": 1,
          "description": "The input text prompt for the model to generate a response."
        },
        "lora": {
          "type": "string",
          "description": "Name of the LoRA (Low-Rank Adaptation) model to fine-tune the base model."
        },
        "response_format": {
          "title": "JSON Mode",
          "type": "object",
          "properties": {
            "type": {
              "type": "string",
              "enum": [
                "json_object",
                "json_schema"
              ]
            },
            "json_schema": {}
          }
        },
        "raw": {
          "type": "boolean",
          "default": false,
          "description": "If true, a chat template is not applied and you must adhere to the specific model's expected formatting."
        },
        "stream": {
          "type": "boolean",
          "default": false,
          "description": "If true, the response will be streamed back incrementally using SSE, Server Sent Events."
        },
        "max_tokens": {
          "type": "integer",
          "default": 2000,
          "description": "The maximum number of tokens to generate in the response."
        },
        "temperature": {
          "type": "number",
          "default": 0.6,
          "minimum": 0,
          "maximum": 5,
          "description": "Controls the randomness of the output; higher values produce more random results."
        },
        "top_p": {
          "type": "number",
          "minimum": 0.001,
          "maximum": 1,
          "description": "Adjusts the creativity of the AI's responses by controlling how many possible words it considers. Lower values make outputs more predictable; higher values allow for more varied and creative responses."
        },
        "top_k": {
          "type": "integer",
          "minimum": 1,
          "maximum": 50,
          "description": "Limits the AI to choose from the top 'k' most probable words. Lower values make responses more focused; higher values introduce more variety and potential surprises."
        },
        "seed": {
          "type": "integer",
          "minimum": 1,
          "maximum": 9999999999,
          "description": "Random seed for reproducibility of the generation."
        },
        "repetition_penalty": {
          "type": "number",
          "minimum": 0,
          "maximum": 2,
          "description": "Penalty for repeated tokens; higher values discourage repetition."
        },
        "frequency_penalty": {
          "type": "number",
          "minimum": -2,
          "maximum": 2,
          "description": "Decreases the likelihood of the model repeating the same lines verbatim."
        },
        "presence_penalty": {
          "type": "number",
          "minimum": -2,
          "maximum": 2,
          "description": "Increases the likelihood of the model introducing new topics."
        }
      },
      "required": [
        "prompt"
      ]
    },
    {
      "title": "Messages",
      "properties": {
        "messages": {
          "type": "array",
          "description": "An array of message objects representing the conversation history.",
          "items": {
            "type": "object",
            "properties": {
              "role": {
                "type": "string",
                "description": "The role of the message sender (e.g., 'user', 'assistant', 'system', 'tool')."
              },
              "content": {
                "type": "string",
                "description": "The content of the message as a string."
              }
            },
            "required": [
              "role",
              "content"
            ]
          }
        },
        "functions": {
          "type": "array",
          "items": {
            "type": "object",
            "properties": {
              "name": {
                "type": "string"
              },
              "code": {
                "type": "string"
              }
            },
            "required": [
              "name",
              "code"
            ]
          }
        },
        "tools": {
          "type": "array",
          "description": "A list of tools available for the assistant to use.",
          "items": {
            "type": "object",
            "oneOf": [
              {
                "properties": {
                  "name": {
                    "type": "string",
                    "description": "The name of the tool. More descriptive the better."
                  },
                  "description": {
                    "type": "string",
                    "description": "A brief description of what the tool does."
                  },
                  "parameters": {
                    "type": "object",
                    "description": "Schema defining the parameters accepted by the tool.",
                    "properties": {
                      "type": {
                        "type": "string",
                        "description": "The type of the parameters object (usually 'object')."
                      },
                      "required": {
                        "type": "array",
                        "description": "List of required parameter names.",
                        "items": {
                          "type": "string"
                        }
                      },
                      "properties": {
                        "type": "object",
                        "description": "Definitions of each parameter.",
                        "additionalProperties": {
                          "type": "object",
                          "properties": {
                            "type": {
                              "type": "string",
                              "description": "The data type of the parameter."
                            },
                            "description": {
                              "type": "string",
                              "description": "A description of the expected parameter."
                            }
                          },
                          "required": [
                            "type",
                            "description"
                          ]
                        }
                      }
                    },
                    "required": [
                      "type",
                      "properties"
                    ]
                  }
                },
                "required": [
                  "name",
                  "description",
                  "parameters"
                ]
              },
              {
                "properties": {
                  "type": {
                    "type": "string",
                    "description": "Specifies the type of tool (e.g., 'function')."
                  },
                  "function": {
                    "type": "object",
                    "description": "Details of the function tool.",
                    "properties": {
                      "name": {
                        "type": "string",
                        "description": "The name of the function."
                      },
                      "description": {
                        "type": "string",
                        "description": "A brief description of what the function does."
                      },
                      "parameters": {
                        "type": "object",
                        "description": "Schema defining the parameters accepted by the function.",
                        "properties": {
                          "type": {
                            "type": "string",
                            "description": "The type of the parameters object (usually 'object')."
                          },
                          "required": {
                            "type": "array",
                            "description": "List of required parameter names.",
                            "items": {
                              "type": "string"
                            }
                          },
                          "properties": {
                            "type": "object",
                            "description": "Definitions of each parameter.",
                            "additionalProperties": {
                              "type": "object",
                              "properties": {
                                "type": {
                                  "type": "string",
                                  "description": "The data type of the parameter."
                                },
                                "description": {
                                  "type": "string",
                                  "description": "A description of the expected parameter."
                                }
                              },
                              "required": [
                                "type",
                                "description"
                              ]
                            }
                          }
                        },
                        "required": [
                          "type",
                          "properties"
                        ]
                      }
                    },
                    "required": [
                      "name",
                      "description",
                      "parameters"
                    ]
                  }
                },
                "required": [
                  "type",
                  "function"
                ]
              }
            ]
          }
        },
        "response_format": {
          "title": "JSON Mode",
          "type": "object",
          "properties": {
            "type": {
              "type": "string",
              "enum": [
                "json_object",
                "json_schema"
              ]
            },
            "json_schema": {}
          }
        },
        "raw": {
          "type": "boolean",
          "default": false,
          "description": "If true, a chat template is not applied and you must adhere to the specific model's expected formatting."
        },
        "stream": {
          "type": "boolean",
          "default": false,
          "description": "If true, the response will be streamed back incrementally using SSE, Server Sent Events."
        },
        "max_tokens": {
          "type": "integer",
          "default": 2000,
          "description": "The maximum number of tokens to generate in the response."
        },
        "temperature": {
          "type": "number",
          "default": 0.6,
          "minimum": 0,
          "maximum": 5,
          "description": "Controls the randomness of the output; higher values produce more random results."
        },
        "top_p": {
          "type": "number",
          "minimum": 0.001,
          "maximum": 1,
          "description": "Adjusts the creativity of the AI's responses by controlling how many possible words it considers. Lower values make outputs more predictable; higher values allow for more varied and creative responses."
        },
        "top_k": {
          "type": "integer",
          "minimum": 1,
          "maximum": 50,
          "description": "Limits the AI to choose from the top 'k' most probable words. Lower values make responses more focused; higher values introduce more variety and potential surprises."
        },
        "seed": {
          "type": "integer",
          "minimum": 1,
          "maximum": 9999999999,
          "description": "Random seed for reproducibility of the generation."
        },
        "repetition_penalty": {
          "type": "number",
          "minimum": 0,
          "maximum": 2,
          "description": "Penalty for repeated tokens; higher values discourage repetition."
        },
        "frequency_penalty": {
          "type": "number",
          "minimum": -2,
          "maximum": 2,
          "description": "Decreases the likelihood of the model repeating the same lines verbatim."
        },
        "presence_penalty": {
          "type": "number",
          "minimum": -2,
          "maximum": 2,
          "description": "Increases the likelihood of the model introducing new topics."
        }
      },
      "required": [
        "messages"
      ]
    },
    {
      "title": "Async Batch",
      "type": "object",
      "properties": {
        "requests": {
          "type": "array",
          "items": {
            "type": "object",
            "oneOf": [
              {
                "title": "Prompt",
                "properties": {
                  "prompt": {
                    "type": "string",
                    "minLength": 1,
                    "description": "The input text prompt for the model to generate a response."
                  },
                  "lora": {
                    "type": "string",
                    "description": "Name of the LoRA (Low-Rank Adaptation) model to fine-tune the base model."
                  },
                  "response_format": {
                    "title": "JSON Mode",
                    "type": "object",
                    "properties": {
                      "type": {
                        "type": "string",
                        "enum": [
                          "json_object",
                          "json_schema"
                        ]
                      },
                      "json_schema": {}
                    }
                  },
                  "raw": {
                    "type": "boolean",
                    "default": false,
                    "description": "If true, a chat template is not applied and you must adhere to the specific model's expected formatting."
                  },
                  "stream": {
                    "type": "boolean",
                    "default": false,
                    "description": "If true, the response will be streamed back incrementally using SSE, Server Sent Events."
                  },
                  "max_tokens": {
                    "type": "integer",
                    "default": 256,
                    "description": "The maximum number of tokens to generate in the response."
                  },
                  "temperature": {
                    "type": "number",
                    "default": 0.6,
                    "minimum": 0,
                    "maximum": 5,
                    "description": "Controls the randomness of the output; higher values produce more random results."
                  },
                  "top_p": {
                    "type": "number",
                    "minimum": 0.001,
                    "maximum": 1,
                    "description": "Adjusts the creativity of the AI's responses by controlling how many possible words it considers. Lower values make outputs more predictable; higher values allow for more varied and creative responses."
                  },
                  "top_k": {
                    "type": "integer",
                    "minimum": 1,
                    "maximum": 50,
                    "description": "Limits the AI to choose from the top 'k' most probable words. Lower values make responses more focused; higher values introduce more variety and potential surprises."
                  },
                  "seed": {
                    "type": "integer",
                    "minimum": 1,
                    "maximum": 9999999999,
                    "description": "Random seed for reproducibility of the generation."
                  },
                  "repetition_penalty": {
                    "type": "number",
                    "minimum": 0,
                    "maximum": 2,
                    "description": "Penalty for repeated tokens; higher values discourage repetition."
                  },
                  "frequency_penalty": {
                    "type": "number",
                    "minimum": -2,
                    "maximum": 2,
                    "description": "Decreases the likelihood of the model repeating the same lines verbatim."
                  },
                  "presence_penalty": {
                    "type": "number",
                    "minimum": -2,
                    "maximum": 2,
                    "description": "Increases the likelihood of the model introducing new topics."
                  }
                },
                "required": [
                  "prompt"
                ]
              },
              {
                "title": "Messages",
                "properties": {
                  "messages": {
                    "type": "array",
                    "description": "An array of message objects representing the conversation history.",
                    "items": {
                      "type": "object",
                      "properties": {
                        "role": {
                          "type": "string",
                          "description": "The role of the message sender (e.g., 'user', 'assistant', 'system', 'tool')."
                        },
                        "content": {
                          "type": "string",
                          "description": "The content of the message as a string."
                        }
                      },
                      "required": [
                        "role",
                        "content"
                      ]
                    }
                  },
                  "functions": {
                    "type": "array",
                    "items": {
                      "type": "object",
                      "properties": {
                        "name": {
                          "type": "string"
                        },
                        "code": {
                          "type": "string"
                        }
                      },
                      "required": [
                        "name",
                        "code"
                      ]
                    }
                  },
                  "tools": {
                    "type": "array",
                    "description": "A list of tools available for the assistant to use.",
                    "items": {
                      "type": "object",
                      "oneOf": [
                        {
                          "properties": {
                            "name": {
                              "type": "string",
                              "description": "The name of the tool. More descriptive the better."
                            },
                            "description": {
                              "type": "string",
                              "description": "A brief description of what the tool does."
                            },
                            "parameters": {
                              "type": "object",
                              "description": "Schema defining the parameters accepted by the tool.",
                              "properties": {
                                "type": {
                                  "type": "string",
                                  "description": "The type of the parameters object (usually 'object')."
                                },
                                "required": {
                                  "type": "array",
                                  "description": "List of required parameter names.",
                                  "items": {
                                    "type": "string"
                                  }
                                },
                                "properties": {
                                  "type": "object",
                                  "description": "Definitions of each parameter.",
                                  "additionalProperties": {
                                    "type": "object",
                                    "properties": {
                                      "type": {
                                        "type": "string",
                                        "description": "The data type of the parameter."
                                      },
                                      "description": {
                                        "type": "string",
                                        "description": "A description of the expected parameter."
                                      }
                                    },
                                    "required": [
                                      "type",
                                      "description"
                                    ]
                                  }
                                }
                              },
                              "required": [
                                "type",
                                "properties"
                              ]
                            }
                          },
                          "required": [
                            "name",
                            "description",
                            "parameters"
                          ]
                        },
                        {
                          "properties": {
                            "type": {
                              "type": "string",
                              "description": "Specifies the type of tool (e.g., 'function')."
                            },
                            "function": {
                              "type": "object",
                              "description": "Details of the function tool.",
                              "properties": {
                                "name": {
                                  "type": "string",
                                  "description": "The name of the function."
                                },
                                "description": {
                                  "type": "string",
                                  "description": "A brief description of what the function does."
                                },
                                "parameters": {
                                  "type": "object",
                                  "description": "Schema defining the parameters accepted by the function.",
                                  "properties": {
                                    "type": {
                                      "type": "string",
                                      "description": "The type of the parameters object (usually 'object')."
                                    },
                                    "required": {
                                      "type": "array",
                                      "description": "List of required parameter names.",
                                      "items": {
                                        "type": "string"
                                      }
                                    },
                                    "properties": {
                                      "type": "object",
                                      "description": "Definitions of each parameter.",
                                      "additionalProperties": {
                                        "type": "object",
                                        "properties": {
                                          "type": {
                                            "type": "string",
                                            "description": "The data type of the parameter."
                                          },
                                          "description": {
                                            "type": "string",
                                            "description": "A description of the expected parameter."
                                          }
                                        },
                                        "required": [
                                          "type",
                                          "description"
                                        ]
                                      }
                                    }
                                  },
                                  "required": [
                                    "type",
                                    "properties"
                                  ]
                                }
                              },
                              "required": [
                                "name",
                                "description",
                                "parameters"
                              ]
                            }
                          },
                          "required": [
                            "type",
                            "function"
                          ]
                        }
                      ]
                    }
                  },
                  "response_format": {
                    "title": "JSON Mode",
                    "type": "object",
                    "properties": {
                      "type": {
                        "type": "string",
                        "enum": [
                          "json_object",
                          "json_schema"
                        ]
                      },
                      "json_schema": {}
                    }
                  },
                  "raw": {
                    "type": "boolean",
                    "default": false,
                    "description": "If true, a chat template is not applied and you must adhere to the specific model's expected formatting."
                  },
                  "stream": {
                    "type": "boolean",
                    "default": false,
                    "description": "If true, the response will be streamed back incrementally using SSE, Server Sent Events."
                  },
                  "max_tokens": {
                    "type": "integer",
                    "default": 256,
                    "description": "The maximum number of tokens to generate in the response."
                  },
                  "temperature": {
                    "type": "number",
                    "default": 0.6,
                    "minimum": 0,
                    "maximum": 5,
                    "description": "Controls the randomness of the output; higher values produce more random results."
                  },
                  "top_p": {
                    "type": "number",
                    "minimum": 0.001,
                    "maximum": 1,
                    "description": "Adjusts the creativity of the AI's responses by controlling how many possible words it considers. Lower values make outputs more predictable; higher values allow for more varied and creative responses."
                  },
                  "top_k": {
                    "type": "integer",
                    "minimum": 1,
                    "maximum": 50,
                    "description": "Limits the AI to choose from the top 'k' most probable words. Lower values make responses more focused; higher values introduce more variety and potential surprises."
                  },
                  "seed": {
                    "type": "integer",
                    "minimum": 1,
                    "maximum": 9999999999,
                    "description": "Random seed for reproducibility of the generation."
                  },
                  "repetition_penalty": {
                    "type": "number",
                    "minimum": 0,
                    "maximum": 2,
                    "description": "Penalty for repeated tokens; higher values discourage repetition."
                  },
                  "frequency_penalty": {
                    "type": "number",
                    "minimum": -2,
                    "maximum": 2,
                    "description": "Decreases the likelihood of the model repeating the same lines verbatim."
                  },
                  "presence_penalty": {
                    "type": "number",
                    "minimum": -2,
                    "maximum": 2,
                    "description": "Increases the likelihood of the model introducing new topics."
                  }
                },
                "required": [
                  "messages"
                ]
              }
            ]
          }
        }
      },
      "required": [
        "requests"
      ]
    }
  ]
}
```

**Example Request:**
```javascript
const response = await fetch(
  'https://api.cloudflare.com/client/v4/accounts/{account_id}/ai/run/@cf/qwen/qwen3-30b-a3b-fp8',
  {
    method: 'POST',
    headers: {
      'Authorization': 'Bearer YOUR_API_TOKEN',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      "prompt": "Hello, how are you?"
})
  }
);

const result = await response.json();
console.log(result);
```

**Output Schema:**
```json
{
  "oneOf": [
    {
      "type": "object",
      "contentType": "application/json",
      "title": "Chat Completion Response",
      "properties": {
        "id": {
          "type": "string",
          "description": "Unique identifier for the completion"
        },
        "object": {
          "type": "string",
          "enum": [
            "chat.completion"
          ],
          "description": "Object type identifier"
        },
        "created": {
          "type": "number",
          "description": "Unix timestamp of when the completion was created"
        },
        "model": {
          "type": "string",
          "description": "Model used for the completion"
        },
        "choices": {
          "type": "array",
          "description": "List of completion choices",
          "items": {
            "type": "object",
            "properties": {
              "index": {
                "type": "number",
                "description": "Index of the choice in the list"
              },
              "message": {
                "type": "object",
                "description": "The message generated by the model",
                "properties": {
                  "role": {
                    "type": "string",
                    "description": "Role of the message author"
                  },
                  "content": {
                    "type": "string",
                    "description": "The content of the message"
                  },
                  "reasoning_content": {
                    "type": "string",
                    "description": "Internal reasoning content (if available)"
                  },
                  "tool_calls": {
                    "type": "array",
                    "description": "Tool calls made by the assistant",
                    "items": {
                      "type": "object",
                      "properties": {
                        "id": {
                          "type": "string",
                          "description": "Unique identifier for the tool call"
                        },
                        "type": {
                          "type": "string",
                          "enum": [
                            "function"
                          ],
                          "description": "Type of tool call"
                        },
                        "function": {
                          "type": "object",
                          "properties": {
                            "name": {
                              "type": "string",
                              "description": "Name of the function to call"
                            },
                            "arguments": {
                              "type": "string",
                              "description": "JSON string of arguments for the function"
                            }
                          },
                          "required": [
                            "name",
                            "arguments"
                          ]
                        }
                      },
                      "required": [
                        "id",
                        "type",
                        "function"
                      ]
                    }
                  }
                },
                "required": [
                  "role",
                  "content"
                ]
              },
              "finish_reason": {
                "type": "string",
                "description": "Reason why the model stopped generating"
              },
              "stop_reason": {
                "type": [
                  "string",
                  "null"
                ],
                "description": "Stop reason (may be null)"
              },
              "logprobs": {
                "type": [
                  "object",
                  "null"
                ],
                "description": "Log probabilities (if requested)"
              }
            }
          }
        },
        "usage": {
          "type": "object",
          "description": "Usage statistics for the inference request",
          "properties": {
            "prompt_tokens": {
              "type": "number",
              "description": "Total number of tokens in input",
              "default": 0
            },
            "completion_tokens": {
              "type": "number",
              "description": "Total number of tokens in output",
              "default": 0
            },
            "total_tokens": {
              "type": "number",
              "description": "Total number of input and output tokens",
              "default": 0
            }
          }
        },
        "prompt_logprobs": {
          "type": [
            "object",
            "null"
          ],
          "description": "Log probabilities for the prompt (if requested)"
        }
      }
    },
    {
      "type": "object",
      "contentType": "application/json",
      "title": "Text Completion Response",
      "properties": {
        "id": {
          "type": "string",
          "description": "Unique identifier for the completion"
        },
        "object": {
          "type": "string",
          "enum": [
            "text_completion"
          ],
          "description": "Object type identifier"
        },
        "created": {
          "type": "number",
          "description": "Unix timestamp of when the completion was created"
        },
        "model": {
          "type": "string",
          "description": "Model used for the completion"
        },
        "choices": {
          "type": "array",
          "description": "List of completion choices",
          "items": {
            "type": "object",
            "properties": {
              "index": {
                "type": "number",
                "description": "Index of the choice in the list"
              },
              "text": {
                "type": "string",
                "description": "The generated text completion"
              },
              "finish_reason": {
                "type": "string",
                "description": "Reason why the model stopped generating"
              },
              "stop_reason": {
                "type": [
                  "string",
                  "null"
                ],
                "description": "Stop reason (may be null)"
              },
              "logprobs": {
                "type": [
                  "object",
                  "null"
                ],
                "description": "Log probabilities (if requested)"
              },
              "prompt_logprobs": {
                "type": [
                  "object",
                  "null"
                ],
                "description": "Log probabilities for the prompt (if requested)"
              }
            },
            "required": [
              "index",
              "text",
              "finish_reason"
            ]
          }
        },
        "usage": {
          "type": "object",
          "description": "Usage statistics for the inference request",
          "properties": {
            "prompt_tokens": {
              "type": "number",
              "description": "Total number of tokens in input",
              "default": 0
            },
            "completion_tokens": {
              "type": "number",
              "description": "Total number of tokens in output",
              "default": 0
            },
            "total_tokens": {
              "type": "number",
              "description": "Total number of input and output tokens",
              "default": 0
            }
          }
        }
      }
    },
    {
      "type": "string",
      "contentType": "text/event-stream",
      "format": "binary"
    },
    {
      "type": "object",
      "contentType": "application/json",
      "title": "Async response",
      "properties": {
        "request_id": {
          "type": "string",
          "description": "The async request id that can be used to obtain the results."
        }
      }
    }
  ]
}
```

---

### @cf/meta/llama-3.1-8b-instruct-awq

**Input Schema:**
```json
{
  "type": "object",
  "oneOf": [
    {
      "title": "Prompt",
      "properties": {
        "prompt": {
          "type": "string",
          "minLength": 1,
          "description": "The input text prompt for the model to generate a response."
        },
        "lora": {
          "type": "string",
          "description": "Name of the LoRA (Low-Rank Adaptation) model to fine-tune the base model."
        },
        "response_format": {
          "title": "JSON Mode",
          "type": "object",
          "properties": {
            "type": {
              "type": "string",
              "enum": [
                "json_object",
                "json_schema"
              ]
            },
            "json_schema": {}
          }
        },
        "raw": {
          "type": "boolean",
          "default": false,
          "description": "If true, a chat template is not applied and you must adhere to the specific model's expected formatting."
        },
        "stream": {
          "type": "boolean",
          "default": false,
          "description": "If true, the response will be streamed back incrementally using SSE, Server Sent Events."
        },
        "max_tokens": {
          "type": "integer",
          "default": 256,
          "description": "The maximum number of tokens to generate in the response."
        },
        "temperature": {
          "type": "number",
          "default": 0.6,
          "minimum": 0,
          "maximum": 5,
          "description": "Controls the randomness of the output; higher values produce more random results."
        },
        "top_p": {
          "type": "number",
          "minimum": 0.001,
          "maximum": 1,
          "description": "Adjusts the creativity of the AI's responses by controlling how many possible words it considers. Lower values make outputs more predictable; higher values allow for more varied and creative responses."
        },
        "top_k": {
          "type": "integer",
          "minimum": 1,
          "maximum": 50,
          "description": "Limits the AI to choose from the top 'k' most probable words. Lower values make responses more focused; higher values introduce more variety and potential surprises."
        },
        "seed": {
          "type": "integer",
          "minimum": 1,
          "maximum": 9999999999,
          "description": "Random seed for reproducibility of the generation."
        },
        "repetition_penalty": {
          "type": "number",
          "minimum": 0,
          "maximum": 2,
          "description": "Penalty for repeated tokens; higher values discourage repetition."
        },
        "frequency_penalty": {
          "type": "number",
          "minimum": -2,
          "maximum": 2,
          "description": "Decreases the likelihood of the model repeating the same lines verbatim."
        },
        "presence_penalty": {
          "type": "number",
          "minimum": -2,
          "maximum": 2,
          "description": "Increases the likelihood of the model introducing new topics."
        }
      },
      "required": [
        "prompt"
      ]
    },
    {
      "title": "Messages",
      "properties": {
        "messages": {
          "type": "array",
          "description": "An array of message objects representing the conversation history.",
          "items": {
            "type": "object",
            "properties": {
              "role": {
                "type": "string",
                "description": "The role of the message sender (e.g., 'user', 'assistant', 'system', 'tool')."
              },
              "content": {
                "type": "string",
                "description": "The content of the message as a string."
              }
            },
            "required": [
              "role",
              "content"
            ]
          }
        },
        "functions": {
          "type": "array",
          "items": {
            "type": "object",
            "properties": {
              "name": {
                "type": "string"
              },
              "code": {
                "type": "string"
              }
            },
            "required": [
              "name",
              "code"
            ]
          }
        },
        "tools": {
          "type": "array",
          "description": "A list of tools available for the assistant to use.",
          "items": {
            "type": "object",
            "oneOf": [
              {
                "properties": {
                  "name": {
                    "type": "string",
                    "description": "The name of the tool. More descriptive the better."
                  },
                  "description": {
                    "type": "string",
                    "description": "A brief description of what the tool does."
                  },
                  "parameters": {
                    "type": "object",
                    "description": "Schema defining the parameters accepted by the tool.",
                    "properties": {
                      "type": {
                        "type": "string",
                        "description": "The type of the parameters object (usually 'object')."
                      },
                      "required": {
                        "type": "array",
                        "description": "List of required parameter names.",
                        "items": {
                          "type": "string"
                        }
                      },
                      "properties": {
                        "type": "object",
                        "description": "Definitions of each parameter.",
                        "additionalProperties": {
                          "type": "object",
                          "properties": {
                            "type": {
                              "type": "string",
                              "description": "The data type of the parameter."
                            },
                            "description": {
                              "type": "string",
                              "description": "A description of the expected parameter."
                            }
                          },
                          "required": [
                            "type",
                            "description"
                          ]
                        }
                      }
                    },
                    "required": [
                      "type",
                      "properties"
                    ]
                  }
                },
                "required": [
                  "name",
                  "description",
                  "parameters"
                ]
              },
              {
                "properties": {
                  "type": {
                    "type": "string",
                    "description": "Specifies the type of tool (e.g., 'function')."
                  },
                  "function": {
                    "type": "object",
                    "description": "Details of the function tool.",
                    "properties": {
                      "name": {
                        "type": "string",
                        "description": "The name of the function."
                      },
                      "description": {
                        "type": "string",
                        "description": "A brief description of what the function does."
                      },
                      "parameters": {
                        "type": "object",
                        "description": "Schema defining the parameters accepted by the function.",
                        "properties": {
                          "type": {
                            "type": "string",
                            "description": "The type of the parameters object (usually 'object')."
                          },
                          "required": {
                            "type": "array",
                            "description": "List of required parameter names.",
                            "items": {
                              "type": "string"
                            }
                          },
                          "properties": {
                            "type": "object",
                            "description": "Definitions of each parameter.",
                            "additionalProperties": {
                              "type": "object",
                              "properties": {
                                "type": {
                                  "type": "string",
                                  "description": "The data type of the parameter."
                                },
                                "description": {
                                  "type": "string",
                                  "description": "A description of the expected parameter."
                                }
                              },
                              "required": [
                                "type",
                                "description"
                              ]
                            }
                          }
                        },
                        "required": [
                          "type",
                          "properties"
                        ]
                      }
                    },
                    "required": [
                      "name",
                      "description",
                      "parameters"
                    ]
                  }
                },
                "required": [
                  "type",
                  "function"
                ]
              }
            ]
          }
        },
        "response_format": {
          "title": "JSON Mode",
          "type": "object",
          "properties": {
            "type": {
              "type": "string",
              "enum": [
                "json_object",
                "json_schema"
              ]
            },
            "json_schema": {}
          }
        },
        "raw": {
          "type": "boolean",
          "default": false,
          "description": "If true, a chat template is not applied and you must adhere to the specific model's expected formatting."
        },
        "stream": {
          "type": "boolean",
          "default": false,
          "description": "If true, the response will be streamed back incrementally using SSE, Server Sent Events."
        },
        "max_tokens": {
          "type": "integer",
          "default": 256,
          "description": "The maximum number of tokens to generate in the response."
        },
        "temperature": {
          "type": "number",
          "default": 0.6,
          "minimum": 0,
          "maximum": 5,
          "description": "Controls the randomness of the output; higher values produce more random results."
        },
        "top_p": {
          "type": "number",
          "minimum": 0.001,
          "maximum": 1,
          "description": "Adjusts the creativity of the AI's responses by controlling how many possible words it considers. Lower values make outputs more predictable; higher values allow for more varied and creative responses."
        },
        "top_k": {
          "type": "integer",
          "minimum": 1,
          "maximum": 50,
          "description": "Limits the AI to choose from the top 'k' most probable words. Lower values make responses more focused; higher values introduce more variety and potential surprises."
        },
        "seed": {
          "type": "integer",
          "minimum": 1,
          "maximum": 9999999999,
          "description": "Random seed for reproducibility of the generation."
        },
        "repetition_penalty": {
          "type": "number",
          "minimum": 0,
          "maximum": 2,
          "description": "Penalty for repeated tokens; higher values discourage repetition."
        },
        "frequency_penalty": {
          "type": "number",
          "minimum": -2,
          "maximum": 2,
          "description": "Decreases the likelihood of the model repeating the same lines verbatim."
        },
        "presence_penalty": {
          "type": "number",
          "minimum": -2,
          "maximum": 2,
          "description": "Increases the likelihood of the model introducing new topics."
        }
      },
      "required": [
        "messages"
      ]
    }
  ]
}
```

**Example Request:**
```javascript
const response = await fetch(
  'https://api.cloudflare.com/client/v4/accounts/{account_id}/ai/run/@cf/meta/llama-3.1-8b-instruct-awq',
  {
    method: 'POST',
    headers: {
      'Authorization': 'Bearer YOUR_API_TOKEN',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      "prompt": "Hello, how are you?"
})
  }
);

const result = await response.json();
console.log(result);
```

**Output Schema:**
```json
{
  "oneOf": [
    {
      "type": "object",
      "properties": {
        "response": {
          "type": "string",
          "description": "The generated text response from the model"
        },
        "usage": {
          "type": "object",
          "description": "Usage statistics for the inference request",
          "properties": {
            "prompt_tokens": {
              "type": "number",
              "description": "Total number of tokens in input",
              "default": 0
            },
            "completion_tokens": {
              "type": "number",
              "description": "Total number of tokens in output",
              "default": 0
            },
            "total_tokens": {
              "type": "number",
              "description": "Total number of input and output tokens",
              "default": 0
            }
          }
        },
        "tool_calls": {
          "type": "array",
          "description": "An array of tool calls requests made during the response generation",
          "items": {
            "type": "object",
            "properties": {
              "arguments": {
                "type": "object",
                "description": "The arguments passed to be passed to the tool call request"
              },
              "name": {
                "type": "string",
                "description": "The name of the tool to be called"
              }
            }
          }
        }
      },
      "required": [
        "response"
      ]
    },
    {
      "type": "string",
      "format": "binary"
    }
  ]
}
```

---

### @cf/google/gemma-7b-it-lora

**Input Schema:**
```json
{
  "type": "object",
  "oneOf": [
    {
      "title": "Prompt",
      "properties": {
        "prompt": {
          "type": "string",
          "minLength": 1,
          "description": "The input text prompt for the model to generate a response."
        },
        "lora": {
          "type": "string",
          "description": "Name of the LoRA (Low-Rank Adaptation) model to fine-tune the base model."
        },
        "response_format": {
          "title": "JSON Mode",
          "type": "object",
          "properties": {
            "type": {
              "type": "string",
              "enum": [
                "json_object",
                "json_schema"
              ]
            },
            "json_schema": {}
          }
        },
        "raw": {
          "type": "boolean",
          "default": false,
          "description": "If true, a chat template is not applied and you must adhere to the specific model's expected formatting."
        },
        "stream": {
          "type": "boolean",
          "default": false,
          "description": "If true, the response will be streamed back incrementally using SSE, Server Sent Events."
        },
        "max_tokens": {
          "type": "integer",
          "default": 256,
          "description": "The maximum number of tokens to generate in the response."
        },
        "temperature": {
          "type": "number",
          "default": 0.6,
          "minimum": 0,
          "maximum": 5,
          "description": "Controls the randomness of the output; higher values produce more random results."
        },
        "top_p": {
          "type": "number",
          "minimum": 0.001,
          "maximum": 1,
          "description": "Adjusts the creativity of the AI's responses by controlling how many possible words it considers. Lower values make outputs more predictable; higher values allow for more varied and creative responses."
        },
        "top_k": {
          "type": "integer",
          "minimum": 1,
          "maximum": 50,
          "description": "Limits the AI to choose from the top 'k' most probable words. Lower values make responses more focused; higher values introduce more variety and potential surprises."
        },
        "seed": {
          "type": "integer",
          "minimum": 1,
          "maximum": 9999999999,
          "description": "Random seed for reproducibility of the generation."
        },
        "repetition_penalty": {
          "type": "number",
          "minimum": 0,
          "maximum": 2,
          "description": "Penalty for repeated tokens; higher values discourage repetition."
        },
        "frequency_penalty": {
          "type": "number",
          "minimum": -2,
          "maximum": 2,
          "description": "Decreases the likelihood of the model repeating the same lines verbatim."
        },
        "presence_penalty": {
          "type": "number",
          "minimum": -2,
          "maximum": 2,
          "description": "Increases the likelihood of the model introducing new topics."
        }
      },
      "required": [
        "prompt"
      ]
    },
    {
      "title": "Messages",
      "properties": {
        "messages": {
          "type": "array",
          "description": "An array of message objects representing the conversation history.",
          "items": {
            "type": "object",
            "properties": {
              "role": {
                "type": "string",
                "description": "The role of the message sender (e.g., 'user', 'assistant', 'system', 'tool')."
              },
              "content": {
                "type": "string",
                "description": "The content of the message as a string."
              }
            },
            "required": [
              "role",
              "content"
            ]
          }
        },
        "functions": {
          "type": "array",
          "items": {
            "type": "object",
            "properties": {
              "name": {
                "type": "string"
              },
              "code": {
                "type": "string"
              }
            },
            "required": [
              "name",
              "code"
            ]
          }
        },
        "tools": {
          "type": "array",
          "description": "A list of tools available for the assistant to use.",
          "items": {
            "type": "object",
            "oneOf": [
              {
                "properties": {
                  "name": {
                    "type": "string",
                    "description": "The name of the tool. More descriptive the better."
                  },
                  "description": {
                    "type": "string",
                    "description": "A brief description of what the tool does."
                  },
                  "parameters": {
                    "type": "object",
                    "description": "Schema defining the parameters accepted by the tool.",
                    "properties": {
                      "type": {
                        "type": "string",
                        "description": "The type of the parameters object (usually 'object')."
                      },
                      "required": {
                        "type": "array",
                        "description": "List of required parameter names.",
                        "items": {
                          "type": "string"
                        }
                      },
                      "properties": {
                        "type": "object",
                        "description": "Definitions of each parameter.",
                        "additionalProperties": {
                          "type": "object",
                          "properties": {
                            "type": {
                              "type": "string",
                              "description": "The data type of the parameter."
                            },
                            "description": {
                              "type": "string",
                              "description": "A description of the expected parameter."
                            }
                          },
                          "required": [
                            "type",
                            "description"
                          ]
                        }
                      }
                    },
                    "required": [
                      "type",
                      "properties"
                    ]
                  }
                },
                "required": [
                  "name",
                  "description",
                  "parameters"
                ]
              },
              {
                "properties": {
                  "type": {
                    "type": "string",
                    "description": "Specifies the type of tool (e.g., 'function')."
                  },
                  "function": {
                    "type": "object",
                    "description": "Details of the function tool.",
                    "properties": {
                      "name": {
                        "type": "string",
                        "description": "The name of the function."
                      },
                      "description": {
                        "type": "string",
                        "description": "A brief description of what the function does."
                      },
                      "parameters": {
                        "type": "object",
                        "description": "Schema defining the parameters accepted by the function.",
                        "properties": {
                          "type": {
                            "type": "string",
                            "description": "The type of the parameters object (usually 'object')."
                          },
                          "required": {
                            "type": "array",
                            "description": "List of required parameter names.",
                            "items": {
                              "type": "string"
                            }
                          },
                          "properties": {
                            "type": "object",
                            "description": "Definitions of each parameter.",
                            "additionalProperties": {
                              "type": "object",
                              "properties": {
                                "type": {
                                  "type": "string",
                                  "description": "The data type of the parameter."
                                },
                                "description": {
                                  "type": "string",
                                  "description": "A description of the expected parameter."
                                }
                              },
                              "required": [
                                "type",
                                "description"
                              ]
                            }
                          }
                        },
                        "required": [
                          "type",
                          "properties"
                        ]
                      }
                    },
                    "required": [
                      "name",
                      "description",
                      "parameters"
                    ]
                  }
                },
                "required": [
                  "type",
                  "function"
                ]
              }
            ]
          }
        },
        "response_format": {
          "title": "JSON Mode",
          "type": "object",
          "properties": {
            "type": {
              "type": "string",
              "enum": [
                "json_object",
                "json_schema"
              ]
            },
            "json_schema": {}
          }
        },
        "raw": {
          "type": "boolean",
          "default": false,
          "description": "If true, a chat template is not applied and you must adhere to the specific model's expected formatting."
        },
        "stream": {
          "type": "boolean",
          "default": false,
          "description": "If true, the response will be streamed back incrementally using SSE, Server Sent Events."
        },
        "max_tokens": {
          "type": "integer",
          "default": 256,
          "description": "The maximum number of tokens to generate in the response."
        },
        "temperature": {
          "type": "number",
          "default": 0.6,
          "minimum": 0,
          "maximum": 5,
          "description": "Controls the randomness of the output; higher values produce more random results."
        },
        "top_p": {
          "type": "number",
          "minimum": 0.001,
          "maximum": 1,
          "description": "Adjusts the creativity of the AI's responses by controlling how many possible words it considers. Lower values make outputs more predictable; higher values allow for more varied and creative responses."
        },
        "top_k": {
          "type": "integer",
          "minimum": 1,
          "maximum": 50,
          "description": "Limits the AI to choose from the top 'k' most probable words. Lower values make responses more focused; higher values introduce more variety and potential surprises."
        },
        "seed": {
          "type": "integer",
          "minimum": 1,
          "maximum": 9999999999,
          "description": "Random seed for reproducibility of the generation."
        },
        "repetition_penalty": {
          "type": "number",
          "minimum": 0,
          "maximum": 2,
          "description": "Penalty for repeated tokens; higher values discourage repetition."
        },
        "frequency_penalty": {
          "type": "number",
          "minimum": -2,
          "maximum": 2,
          "description": "Decreases the likelihood of the model repeating the same lines verbatim."
        },
        "presence_penalty": {
          "type": "number",
          "minimum": -2,
          "maximum": 2,
          "description": "Increases the likelihood of the model introducing new topics."
        }
      },
      "required": [
        "messages"
      ]
    }
  ]
}
```

**Example Request:**
```javascript
const response = await fetch(
  'https://api.cloudflare.com/client/v4/accounts/{account_id}/ai/run/@cf/google/gemma-7b-it-lora',
  {
    method: 'POST',
    headers: {
      'Authorization': 'Bearer YOUR_API_TOKEN',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      "prompt": "Hello, how are you?"
})
  }
);

const result = await response.json();
console.log(result);
```

**Output Schema:**
```json
{
  "oneOf": [
    {
      "type": "object",
      "properties": {
        "response": {
          "type": "string",
          "description": "The generated text response from the model"
        },
        "usage": {
          "type": "object",
          "description": "Usage statistics for the inference request",
          "properties": {
            "prompt_tokens": {
              "type": "number",
              "description": "Total number of tokens in input",
              "default": 0
            },
            "completion_tokens": {
              "type": "number",
              "description": "Total number of tokens in output",
              "default": 0
            },
            "total_tokens": {
              "type": "number",
              "description": "Total number of input and output tokens",
              "default": 0
            }
          }
        },
        "tool_calls": {
          "type": "array",
          "description": "An array of tool calls requests made during the response generation",
          "items": {
            "type": "object",
            "properties": {
              "arguments": {
                "type": "object",
                "description": "The arguments passed to be passed to the tool call request"
              },
              "name": {
                "type": "string",
                "description": "The name of the tool to be called"
              }
            }
          }
        }
      },
      "required": [
        "response"
      ]
    },
    {
      "type": "string",
      "format": "binary"
    }
  ]
}
```

---

### @cf/qwen/qwen1.5-1.8b-chat

**Input Schema:**
```json
{
  "type": "object",
  "oneOf": [
    {
      "title": "Prompt",
      "properties": {
        "prompt": {
          "type": "string",
          "minLength": 1,
          "description": "The input text prompt for the model to generate a response."
        },
        "lora": {
          "type": "string",
          "description": "Name of the LoRA (Low-Rank Adaptation) model to fine-tune the base model."
        },
        "response_format": {
          "title": "JSON Mode",
          "type": "object",
          "properties": {
            "type": {
              "type": "string",
              "enum": [
                "json_object",
                "json_schema"
              ]
            },
            "json_schema": {}
          }
        },
        "raw": {
          "type": "boolean",
          "default": false,
          "description": "If true, a chat template is not applied and you must adhere to the specific model's expected formatting."
        },
        "stream": {
          "type": "boolean",
          "default": false,
          "description": "If true, the response will be streamed back incrementally using SSE, Server Sent Events."
        },
        "max_tokens": {
          "type": "integer",
          "default": 256,
          "description": "The maximum number of tokens to generate in the response."
        },
        "temperature": {
          "type": "number",
          "default": 0.6,
          "minimum": 0,
          "maximum": 5,
          "description": "Controls the randomness of the output; higher values produce more random results."
        },
        "top_p": {
          "type": "number",
          "minimum": 0.001,
          "maximum": 1,
          "description": "Adjusts the creativity of the AI's responses by controlling how many possible words it considers. Lower values make outputs more predictable; higher values allow for more varied and creative responses."
        },
        "top_k": {
          "type": "integer",
          "minimum": 1,
          "maximum": 50,
          "description": "Limits the AI to choose from the top 'k' most probable words. Lower values make responses more focused; higher values introduce more variety and potential surprises."
        },
        "seed": {
          "type": "integer",
          "minimum": 1,
          "maximum": 9999999999,
          "description": "Random seed for reproducibility of the generation."
        },
        "repetition_penalty": {
          "type": "number",
          "minimum": 0,
          "maximum": 2,
          "description": "Penalty for repeated tokens; higher values discourage repetition."
        },
        "frequency_penalty": {
          "type": "number",
          "minimum": -2,
          "maximum": 2,
          "description": "Decreases the likelihood of the model repeating the same lines verbatim."
        },
        "presence_penalty": {
          "type": "number",
          "minimum": -2,
          "maximum": 2,
          "description": "Increases the likelihood of the model introducing new topics."
        }
      },
      "required": [
        "prompt"
      ]
    },
    {
      "title": "Messages",
      "properties": {
        "messages": {
          "type": "array",
          "description": "An array of message objects representing the conversation history.",
          "items": {
            "type": "object",
            "properties": {
              "role": {
                "type": "string",
                "description": "The role of the message sender (e.g., 'user', 'assistant', 'system', 'tool')."
              },
              "content": {
                "type": "string",
                "description": "The content of the message as a string."
              }
            },
            "required": [
              "role",
              "content"
            ]
          }
        },
        "functions": {
          "type": "array",
          "items": {
            "type": "object",
            "properties": {
              "name": {
                "type": "string"
              },
              "code": {
                "type": "string"
              }
            },
            "required": [
              "name",
              "code"
            ]
          }
        },
        "tools": {
          "type": "array",
          "description": "A list of tools available for the assistant to use.",
          "items": {
            "type": "object",
            "oneOf": [
              {
                "properties": {
                  "name": {
                    "type": "string",
                    "description": "The name of the tool. More descriptive the better."
                  },
                  "description": {
                    "type": "string",
                    "description": "A brief description of what the tool does."
                  },
                  "parameters": {
                    "type": "object",
                    "description": "Schema defining the parameters accepted by the tool.",
                    "properties": {
                      "type": {
                        "type": "string",
                        "description": "The type of the parameters object (usually 'object')."
                      },
                      "required": {
                        "type": "array",
                        "description": "List of required parameter names.",
                        "items": {
                          "type": "string"
                        }
                      },
                      "properties": {
                        "type": "object",
                        "description": "Definitions of each parameter.",
                        "additionalProperties": {
                          "type": "object",
                          "properties": {
                            "type": {
                              "type": "string",
                              "description": "The data type of the parameter."
                            },
                            "description": {
                              "type": "string",
                              "description": "A description of the expected parameter."
                            }
                          },
                          "required": [
                            "type",
                            "description"
                          ]
                        }
                      }
                    },
                    "required": [
                      "type",
                      "properties"
                    ]
                  }
                },
                "required": [
                  "name",
                  "description",
                  "parameters"
                ]
              },
              {
                "properties": {
                  "type": {
                    "type": "string",
                    "description": "Specifies the type of tool (e.g., 'function')."
                  },
                  "function": {
                    "type": "object",
                    "description": "Details of the function tool.",
                    "properties": {
                      "name": {
                        "type": "string",
                        "description": "The name of the function."
                      },
                      "description": {
                        "type": "string",
                        "description": "A brief description of what the function does."
                      },
                      "parameters": {
                        "type": "object",
                        "description": "Schema defining the parameters accepted by the function.",
                        "properties": {
                          "type": {
                            "type": "string",
                            "description": "The type of the parameters object (usually 'object')."
                          },
                          "required": {
                            "type": "array",
                            "description": "List of required parameter names.",
                            "items": {
                              "type": "string"
                            }
                          },
                          "properties": {
                            "type": "object",
                            "description": "Definitions of each parameter.",
                            "additionalProperties": {
                              "type": "object",
                              "properties": {
                                "type": {
                                  "type": "string",
                                  "description": "The data type of the parameter."
                                },
                                "description": {
                                  "type": "string",
                                  "description": "A description of the expected parameter."
                                }
                              },
                              "required": [
                                "type",
                                "description"
                              ]
                            }
                          }
                        },
                        "required": [
                          "type",
                          "properties"
                        ]
                      }
                    },
                    "required": [
                      "name",
                      "description",
                      "parameters"
                    ]
                  }
                },
                "required": [
                  "type",
                  "function"
                ]
              }
            ]
          }
        },
        "response_format": {
          "title": "JSON Mode",
          "type": "object",
          "properties": {
            "type": {
              "type": "string",
              "enum": [
                "json_object",
                "json_schema"
              ]
            },
            "json_schema": {}
          }
        },
        "raw": {
          "type": "boolean",
          "default": false,
          "description": "If true, a chat template is not applied and you must adhere to the specific model's expected formatting."
        },
        "stream": {
          "type": "boolean",
          "default": false,
          "description": "If true, the response will be streamed back incrementally using SSE, Server Sent Events."
        },
        "max_tokens": {
          "type": "integer",
          "default": 256,
          "description": "The maximum number of tokens to generate in the response."
        },
        "temperature": {
          "type": "number",
          "default": 0.6,
          "minimum": 0,
          "maximum": 5,
          "description": "Controls the randomness of the output; higher values produce more random results."
        },
        "top_p": {
          "type": "number",
          "minimum": 0.001,
          "maximum": 1,
          "description": "Adjusts the creativity of the AI's responses by controlling how many possible words it considers. Lower values make outputs more predictable; higher values allow for more varied and creative responses."
        },
        "top_k": {
          "type": "integer",
          "minimum": 1,
          "maximum": 50,
          "description": "Limits the AI to choose from the top 'k' most probable words. Lower values make responses more focused; higher values introduce more variety and potential surprises."
        },
        "seed": {
          "type": "integer",
          "minimum": 1,
          "maximum": 9999999999,
          "description": "Random seed for reproducibility of the generation."
        },
        "repetition_penalty": {
          "type": "number",
          "minimum": 0,
          "maximum": 2,
          "description": "Penalty for repeated tokens; higher values discourage repetition."
        },
        "frequency_penalty": {
          "type": "number",
          "minimum": -2,
          "maximum": 2,
          "description": "Decreases the likelihood of the model repeating the same lines verbatim."
        },
        "presence_penalty": {
          "type": "number",
          "minimum": -2,
          "maximum": 2,
          "description": "Increases the likelihood of the model introducing new topics."
        }
      },
      "required": [
        "messages"
      ]
    }
  ]
}
```

**Example Request:**
```javascript
const response = await fetch(
  'https://api.cloudflare.com/client/v4/accounts/{account_id}/ai/run/@cf/qwen/qwen1.5-1.8b-chat',
  {
    method: 'POST',
    headers: {
      'Authorization': 'Bearer YOUR_API_TOKEN',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      "prompt": "Hello, how are you?"
})
  }
);

const result = await response.json();
console.log(result);
```

**Output Schema:**
```json
{
  "oneOf": [
    {
      "type": "object",
      "properties": {
        "response": {
          "type": "string",
          "description": "The generated text response from the model"
        },
        "usage": {
          "type": "object",
          "description": "Usage statistics for the inference request",
          "properties": {
            "prompt_tokens": {
              "type": "number",
              "description": "Total number of tokens in input",
              "default": 0
            },
            "completion_tokens": {
              "type": "number",
              "description": "Total number of tokens in output",
              "default": 0
            },
            "total_tokens": {
              "type": "number",
              "description": "Total number of input and output tokens",
              "default": 0
            }
          }
        },
        "tool_calls": {
          "type": "array",
          "description": "An array of tool calls requests made during the response generation",
          "items": {
            "type": "object",
            "properties": {
              "arguments": {
                "type": "object",
                "description": "The arguments passed to be passed to the tool call request"
              },
              "name": {
                "type": "string",
                "description": "The name of the tool to be called"
              }
            }
          }
        }
      },
      "required": [
        "response"
      ]
    },
    {
      "type": "string",
      "format": "binary"
    }
  ]
}
```

---

### @cf/mistralai/mistral-small-3.1-24b-instruct

**Input Schema:**
```json
{
  "type": "object",
  "oneOf": [
    {
      "title": "Prompt",
      "properties": {
        "prompt": {
          "type": "string",
          "minLength": 1,
          "description": "The input text prompt for the model to generate a response."
        },
        "guided_json": {
          "type": "object",
          "description": "JSON schema that should be fulfilled for the response."
        },
        "raw": {
          "type": "boolean",
          "default": false,
          "description": "If true, a chat template is not applied and you must adhere to the specific model's expected formatting."
        },
        "stream": {
          "type": "boolean",
          "default": false,
          "description": "If true, the response will be streamed back incrementally using SSE, Server Sent Events."
        },
        "max_tokens": {
          "type": "integer",
          "default": 256,
          "description": "The maximum number of tokens to generate in the response."
        },
        "temperature": {
          "type": "number",
          "default": 0.15,
          "minimum": 0,
          "maximum": 5,
          "description": "Controls the randomness of the output; higher values produce more random results."
        },
        "top_p": {
          "type": "number",
          "minimum": 0,
          "maximum": 2,
          "description": "Adjusts the creativity of the AI's responses by controlling how many possible words it considers. Lower values make outputs more predictable; higher values allow for more varied and creative responses."
        },
        "top_k": {
          "type": "integer",
          "minimum": 1,
          "maximum": 50,
          "description": "Limits the AI to choose from the top 'k' most probable words. Lower values make responses more focused; higher values introduce more variety and potential surprises."
        },
        "seed": {
          "type": "integer",
          "minimum": 1,
          "maximum": 9999999999,
          "description": "Random seed for reproducibility of the generation."
        },
        "repetition_penalty": {
          "type": "number",
          "minimum": 0,
          "maximum": 2,
          "description": "Penalty for repeated tokens; higher values discourage repetition."
        },
        "frequency_penalty": {
          "type": "number",
          "minimum": 0,
          "maximum": 2,
          "description": "Decreases the likelihood of the model repeating the same lines verbatim."
        },
        "presence_penalty": {
          "type": "number",
          "minimum": 0,
          "maximum": 2,
          "description": "Increases the likelihood of the model introducing new topics."
        }
      },
      "required": [
        "prompt"
      ]
    },
    {
      "title": "Messages",
      "properties": {
        "messages": {
          "type": "array",
          "description": "An array of message objects representing the conversation history.",
          "items": {
            "type": "object",
            "properties": {
              "role": {
                "type": "string",
                "description": "The role of the message sender (e.g., 'user', 'assistant', 'system', 'tool')."
              },
              "tool_call_id": {
                "type": "string",
                "description": "The tool call id. Must be supplied for tool calls for Mistral-3. If you don't know what to put here you can fall back to 000000001",
                "pattern": "[a-zA-Z0-9]{9}"
              },
              "content": {
                "oneOf": [
                  {
                    "type": "string",
                    "description": "The content of the message as a string."
                  },
                  {
                    "type": "array",
                    "items": {
                      "type": "object",
                      "properties": {
                        "type": {
                          "type": "string",
                          "description": "Type of the content provided"
                        },
                        "text": {
                          "type": "string"
                        },
                        "image_url": {
                          "type": "object",
                          "properties": {
                            "url": {
                              "type": "string",
                              "pattern": "^data:*",
                              "description": "image uri with data (e.g. data:image/jpeg;base64,/9j/...). HTTP URL will not be accepted"
                            }
                          }
                        }
                      }
                    }
                  },
                  {
                    "type": "object",
                    "properties": {
                      "type": {
                        "type": "string",
                        "description": "Type of the content provided"
                      },
                      "text": {
                        "type": "string"
                      },
                      "image_url": {
                        "type": "object",
                        "properties": {
                          "url": {
                            "type": "string",
                            "pattern": "^data:*",
                            "description": "image uri with data (e.g. data:image/jpeg;base64,/9j/...). HTTP URL will not be accepted"
                          }
                        }
                      }
                    }
                  }
                ]
              }
            }
          }
        },
        "functions": {
          "type": "array",
          "items": {
            "type": "object",
            "properties": {
              "name": {
                "type": "string"
              },
              "code": {
                "type": "string"
              }
            },
            "required": [
              "name",
              "code"
            ]
          }
        },
        "tools": {
          "type": "array",
          "description": "A list of tools available for the assistant to use.",
          "items": {
            "type": "object",
            "oneOf": [
              {
                "properties": {
                  "name": {
                    "type": "string",
                    "description": "The name of the tool. More descriptive the better."
                  },
                  "description": {
                    "type": "string",
                    "description": "A brief description of what the tool does."
                  },
                  "parameters": {
                    "type": "object",
                    "description": "Schema defining the parameters accepted by the tool.",
                    "properties": {
                      "type": {
                        "type": "string",
                        "description": "The type of the parameters object (usually 'object')."
                      },
                      "required": {
                        "type": "array",
                        "description": "List of required parameter names.",
                        "items": {
                          "type": "string"
                        }
                      },
                      "properties": {
                        "type": "object",
                        "description": "Definitions of each parameter.",
                        "additionalProperties": {
                          "type": "object",
                          "properties": {
                            "type": {
                              "type": "string",
                              "description": "The data type of the parameter."
                            },
                            "description": {
                              "type": "string",
                              "description": "A description of the expected parameter."
                            }
                          },
                          "required": [
                            "type",
                            "description"
                          ]
                        }
                      }
                    },
                    "required": [
                      "type",
                      "properties"
                    ]
                  }
                },
                "required": [
                  "name",
                  "description",
                  "parameters"
                ]
              },
              {
                "properties": {
                  "type": {
                    "type": "string",
                    "description": "Specifies the type of tool (e.g., 'function')."
                  },
                  "function": {
                    "type": "object",
                    "description": "Details of the function tool.",
                    "properties": {
                      "name": {
                        "type": "string",
                        "description": "The name of the function."
                      },
                      "description": {
                        "type": "string",
                        "description": "A brief description of what the function does."
                      },
                      "parameters": {
                        "type": "object",
                        "description": "Schema defining the parameters accepted by the function.",
                        "properties": {
                          "type": {
                            "type": "string",
                            "description": "The type of the parameters object (usually 'object')."
                          },
                          "required": {
                            "type": "array",
                            "description": "List of required parameter names.",
                            "items": {
                              "type": "string"
                            }
                          },
                          "properties": {
                            "type": "object",
                            "description": "Definitions of each parameter.",
                            "additionalProperties": {
                              "type": "object",
                              "properties": {
                                "type": {
                                  "type": "string",
                                  "description": "The data type of the parameter."
                                },
                                "description": {
                                  "type": "string",
                                  "description": "A description of the expected parameter."
                                }
                              },
                              "required": [
                                "type",
                                "description"
                              ]
                            }
                          }
                        },
                        "required": [
                          "type",
                          "properties"
                        ]
                      }
                    },
                    "required": [
                      "name",
                      "description",
                      "parameters"
                    ]
                  }
                },
                "required": [
                  "type",
                  "function"
                ]
              }
            ]
          }
        },
        "guided_json": {
          "type": "object",
          "description": "JSON schema that should be fufilled for the response."
        },
        "raw": {
          "type": "boolean",
          "default": false,
          "description": "If true, a chat template is not applied and you must adhere to the specific model's expected formatting."
        },
        "stream": {
          "type": "boolean",
          "default": false,
          "description": "If true, the response will be streamed back incrementally using SSE, Server Sent Events."
        },
        "max_tokens": {
          "type": "integer",
          "default": 256,
          "description": "The maximum number of tokens to generate in the response."
        },
        "temperature": {
          "type": "number",
          "default": 0.15,
          "minimum": 0,
          "maximum": 5,
          "description": "Controls the randomness of the output; higher values produce more random results."
        },
        "top_p": {
          "type": "number",
          "minimum": 0,
          "maximum": 2,
          "description": "Adjusts the creativity of the AI's responses by controlling how many possible words it considers. Lower values make outputs more predictable; higher values allow for more varied and creative responses."
        },
        "top_k": {
          "type": "integer",
          "minimum": 1,
          "maximum": 50,
          "description": "Limits the AI to choose from the top 'k' most probable words. Lower values make responses more focused; higher values introduce more variety and potential surprises."
        },
        "seed": {
          "type": "integer",
          "minimum": 1,
          "maximum": 9999999999,
          "description": "Random seed for reproducibility of the generation."
        },
        "repetition_penalty": {
          "type": "number",
          "minimum": 0,
          "maximum": 2,
          "description": "Penalty for repeated tokens; higher values discourage repetition."
        },
        "frequency_penalty": {
          "type": "number",
          "minimum": 0,
          "maximum": 2,
          "description": "Decreases the likelihood of the model repeating the same lines verbatim."
        },
        "presence_penalty": {
          "type": "number",
          "minimum": 0,
          "maximum": 2,
          "description": "Increases the likelihood of the model introducing new topics."
        }
      },
      "required": [
        "messages"
      ]
    }
  ]
}
```

**Example Request:**
```javascript
const response = await fetch(
  'https://api.cloudflare.com/client/v4/accounts/{account_id}/ai/run/@cf/mistralai/mistral-small-3.1-24b-instruct',
  {
    method: 'POST',
    headers: {
      'Authorization': 'Bearer YOUR_API_TOKEN',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      "prompt": "Hello, how are you?"
})
  }
);

const result = await response.json();
console.log(result);
```

**Output Schema:**
```json
{
  "oneOf": [
    {
      "type": "object",
      "contentType": "application/json",
      "properties": {
        "response": {
          "type": "string",
          "description": "The generated text response from the model"
        },
        "usage": {
          "type": "object",
          "description": "Usage statistics for the inference request",
          "properties": {
            "prompt_tokens": {
              "type": "number",
              "description": "Total number of tokens in input",
              "default": 0
            },
            "completion_tokens": {
              "type": "number",
              "description": "Total number of tokens in output",
              "default": 0
            },
            "total_tokens": {
              "type": "number",
              "description": "Total number of input and output tokens",
              "default": 0
            }
          }
        },
        "tool_calls": {
          "type": "array",
          "description": "An array of tool calls requests made during the response generation",
          "items": {
            "type": "object",
            "properties": {
              "arguments": {
                "type": "object",
                "description": "The arguments passed to be passed to the tool call request"
              },
              "name": {
                "type": "string",
                "description": "The name of the tool to be called"
              }
            }
          }
        }
      },
      "required": [
        "response"
      ]
    },
    {
      "type": "string",
      "contentType": "text/event-stream",
      "format": "binary"
    }
  ]
}
```

---

### @cf/meta/llama-3-8b-instruct-awq

**Input Schema:**
```json
{
  "type": "object",
  "oneOf": [
    {
      "title": "Prompt",
      "properties": {
        "prompt": {
          "type": "string",
          "minLength": 1,
          "description": "The input text prompt for the model to generate a response."
        },
        "lora": {
          "type": "string",
          "description": "Name of the LoRA (Low-Rank Adaptation) model to fine-tune the base model."
        },
        "response_format": {
          "title": "JSON Mode",
          "type": "object",
          "properties": {
            "type": {
              "type": "string",
              "enum": [
                "json_object",
                "json_schema"
              ]
            },
            "json_schema": {}
          }
        },
        "raw": {
          "type": "boolean",
          "default": false,
          "description": "If true, a chat template is not applied and you must adhere to the specific model's expected formatting."
        },
        "stream": {
          "type": "boolean",
          "default": false,
          "description": "If true, the response will be streamed back incrementally using SSE, Server Sent Events."
        },
        "max_tokens": {
          "type": "integer",
          "default": 256,
          "description": "The maximum number of tokens to generate in the response."
        },
        "temperature": {
          "type": "number",
          "default": 0.6,
          "minimum": 0,
          "maximum": 5,
          "description": "Controls the randomness of the output; higher values produce more random results."
        },
        "top_p": {
          "type": "number",
          "minimum": 0.001,
          "maximum": 1,
          "description": "Adjusts the creativity of the AI's responses by controlling how many possible words it considers. Lower values make outputs more predictable; higher values allow for more varied and creative responses."
        },
        "top_k": {
          "type": "integer",
          "minimum": 1,
          "maximum": 50,
          "description": "Limits the AI to choose from the top 'k' most probable words. Lower values make responses more focused; higher values introduce more variety and potential surprises."
        },
        "seed": {
          "type": "integer",
          "minimum": 1,
          "maximum": 9999999999,
          "description": "Random seed for reproducibility of the generation."
        },
        "repetition_penalty": {
          "type": "number",
          "minimum": 0,
          "maximum": 2,
          "description": "Penalty for repeated tokens; higher values discourage repetition."
        },
        "frequency_penalty": {
          "type": "number",
          "minimum": -2,
          "maximum": 2,
          "description": "Decreases the likelihood of the model repeating the same lines verbatim."
        },
        "presence_penalty": {
          "type": "number",
          "minimum": -2,
          "maximum": 2,
          "description": "Increases the likelihood of the model introducing new topics."
        }
      },
      "required": [
        "prompt"
      ]
    },
    {
      "title": "Messages",
      "properties": {
        "messages": {
          "type": "array",
          "description": "An array of message objects representing the conversation history.",
          "items": {
            "type": "object",
            "properties": {
              "role": {
                "type": "string",
                "description": "The role of the message sender (e.g., 'user', 'assistant', 'system', 'tool')."
              },
              "content": {
                "type": "string",
                "description": "The content of the message as a string."
              }
            },
            "required": [
              "role",
              "content"
            ]
          }
        },
        "functions": {
          "type": "array",
          "items": {
            "type": "object",
            "properties": {
              "name": {
                "type": "string"
              },
              "code": {
                "type": "string"
              }
            },
            "required": [
              "name",
              "code"
            ]
          }
        },
        "tools": {
          "type": "array",
          "description": "A list of tools available for the assistant to use.",
          "items": {
            "type": "object",
            "oneOf": [
              {
                "properties": {
                  "name": {
                    "type": "string",
                    "description": "The name of the tool. More descriptive the better."
                  },
                  "description": {
                    "type": "string",
                    "description": "A brief description of what the tool does."
                  },
                  "parameters": {
                    "type": "object",
                    "description": "Schema defining the parameters accepted by the tool.",
                    "properties": {
                      "type": {
                        "type": "string",
                        "description": "The type of the parameters object (usually 'object')."
                      },
                      "required": {
                        "type": "array",
                        "description": "List of required parameter names.",
                        "items": {
                          "type": "string"
                        }
                      },
                      "properties": {
                        "type": "object",
                        "description": "Definitions of each parameter.",
                        "additionalProperties": {
                          "type": "object",
                          "properties": {
                            "type": {
                              "type": "string",
                              "description": "The data type of the parameter."
                            },
                            "description": {
                              "type": "string",
                              "description": "A description of the expected parameter."
                            }
                          },
                          "required": [
                            "type",
                            "description"
                          ]
                        }
                      }
                    },
                    "required": [
                      "type",
                      "properties"
                    ]
                  }
                },
                "required": [
                  "name",
                  "description",
                  "parameters"
                ]
              },
              {
                "properties": {
                  "type": {
                    "type": "string",
                    "description": "Specifies the type of tool (e.g., 'function')."
                  },
                  "function": {
                    "type": "object",
                    "description": "Details of the function tool.",
                    "properties": {
                      "name": {
                        "type": "string",
                        "description": "The name of the function."
                      },
                      "description": {
                        "type": "string",
                        "description": "A brief description of what the function does."
                      },
                      "parameters": {
                        "type": "object",
                        "description": "Schema defining the parameters accepted by the function.",
                        "properties": {
                          "type": {
                            "type": "string",
                            "description": "The type of the parameters object (usually 'object')."
                          },
                          "required": {
                            "type": "array",
                            "description": "List of required parameter names.",
                            "items": {
                              "type": "string"
                            }
                          },
                          "properties": {
                            "type": "object",
                            "description": "Definitions of each parameter.",
                            "additionalProperties": {
                              "type": "object",
                              "properties": {
                                "type": {
                                  "type": "string",
                                  "description": "The data type of the parameter."
                                },
                                "description": {
                                  "type": "string",
                                  "description": "A description of the expected parameter."
                                }
                              },
                              "required": [
                                "type",
                                "description"
                              ]
                            }
                          }
                        },
                        "required": [
                          "type",
                          "properties"
                        ]
                      }
                    },
                    "required": [
                      "name",
                      "description",
                      "parameters"
                    ]
                  }
                },
                "required": [
                  "type",
                  "function"
                ]
              }
            ]
          }
        },
        "response_format": {
          "title": "JSON Mode",
          "type": "object",
          "properties": {
            "type": {
              "type": "string",
              "enum": [
                "json_object",
                "json_schema"
              ]
            },
            "json_schema": {}
          }
        },
        "raw": {
          "type": "boolean",
          "default": false,
          "description": "If true, a chat template is not applied and you must adhere to the specific model's expected formatting."
        },
        "stream": {
          "type": "boolean",
          "default": false,
          "description": "If true, the response will be streamed back incrementally using SSE, Server Sent Events."
        },
        "max_tokens": {
          "type": "integer",
          "default": 256,
          "description": "The maximum number of tokens to generate in the response."
        },
        "temperature": {
          "type": "number",
          "default": 0.6,
          "minimum": 0,
          "maximum": 5,
          "description": "Controls the randomness of the output; higher values produce more random results."
        },
        "top_p": {
          "type": "number",
          "minimum": 0.001,
          "maximum": 1,
          "description": "Adjusts the creativity of the AI's responses by controlling how many possible words it considers. Lower values make outputs more predictable; higher values allow for more varied and creative responses."
        },
        "top_k": {
          "type": "integer",
          "minimum": 1,
          "maximum": 50,
          "description": "Limits the AI to choose from the top 'k' most probable words. Lower values make responses more focused; higher values introduce more variety and potential surprises."
        },
        "seed": {
          "type": "integer",
          "minimum": 1,
          "maximum": 9999999999,
          "description": "Random seed for reproducibility of the generation."
        },
        "repetition_penalty": {
          "type": "number",
          "minimum": 0,
          "maximum": 2,
          "description": "Penalty for repeated tokens; higher values discourage repetition."
        },
        "frequency_penalty": {
          "type": "number",
          "minimum": -2,
          "maximum": 2,
          "description": "Decreases the likelihood of the model repeating the same lines verbatim."
        },
        "presence_penalty": {
          "type": "number",
          "minimum": -2,
          "maximum": 2,
          "description": "Increases the likelihood of the model introducing new topics."
        }
      },
      "required": [
        "messages"
      ]
    }
  ]
}
```

**Example Request:**
```javascript
const response = await fetch(
  'https://api.cloudflare.com/client/v4/accounts/{account_id}/ai/run/@cf/meta/llama-3-8b-instruct-awq',
  {
    method: 'POST',
    headers: {
      'Authorization': 'Bearer YOUR_API_TOKEN',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      "prompt": "Hello, how are you?"
})
  }
);

const result = await response.json();
console.log(result);
```

**Output Schema:**
```json
{
  "oneOf": [
    {
      "type": "object",
      "properties": {
        "response": {
          "type": "string",
          "description": "The generated text response from the model"
        },
        "usage": {
          "type": "object",
          "description": "Usage statistics for the inference request",
          "properties": {
            "prompt_tokens": {
              "type": "number",
              "description": "Total number of tokens in input",
              "default": 0
            },
            "completion_tokens": {
              "type": "number",
              "description": "Total number of tokens in output",
              "default": 0
            },
            "total_tokens": {
              "type": "number",
              "description": "Total number of input and output tokens",
              "default": 0
            }
          }
        },
        "tool_calls": {
          "type": "array",
          "description": "An array of tool calls requests made during the response generation",
          "items": {
            "type": "object",
            "properties": {
              "arguments": {
                "type": "object",
                "description": "The arguments passed to be passed to the tool call request"
              },
              "name": {
                "type": "string",
                "description": "The name of the tool to be called"
              }
            }
          }
        }
      },
      "required": [
        "response"
      ]
    },
    {
      "type": "string",
      "format": "binary"
    }
  ]
}
```

---

### @cf/meta/llama-3.2-11b-vision-instruct

**Input Schema:**
```json
{
  "type": "object",
  "oneOf": [
    {
      "title": "Prompt",
      "properties": {
        "prompt": {
          "type": "string",
          "minLength": 1,
          "maxLength": 131072,
          "description": "The input text prompt for the model to generate a response."
        },
        "image": {
          "oneOf": [
            {
              "type": "array",
              "description": "An array of integers that represent the image data constrained to 8-bit unsigned integer values.  Deprecated, use image as a part of messages now.",
              "items": {
                "type": "number",
                "description": "A value between 0 and 255"
              }
            },
            {
              "type": "string",
              "format": "binary",
              "description": "Binary string representing the image contents.  Deprecated, use image as a part of messages now."
            }
          ]
        },
        "raw": {
          "type": "boolean",
          "default": false,
          "description": "If true, a chat template is not applied and you must adhere to the specific model's expected formatting."
        },
        "stream": {
          "type": "boolean",
          "default": false,
          "description": "If true, the response will be streamed back incrementally using SSE, Server Sent Events."
        },
        "max_tokens": {
          "type": "integer",
          "default": 256,
          "description": "The maximum number of tokens to generate in the response."
        },
        "temperature": {
          "type": "number",
          "default": 0.6,
          "minimum": 0,
          "maximum": 5,
          "description": "Controls the randomness of the output; higher values produce more random results."
        },
        "top_p": {
          "type": "number",
          "minimum": 0,
          "maximum": 2,
          "description": "Adjusts the creativity of the AI's responses by controlling how many possible words it considers. Lower values make outputs more predictable; higher values allow for more varied and creative responses."
        },
        "top_k": {
          "type": "integer",
          "minimum": 1,
          "maximum": 50,
          "description": "Limits the AI to choose from the top 'k' most probable words. Lower values make responses more focused; higher values introduce more variety and potential surprises."
        },
        "seed": {
          "type": "integer",
          "minimum": 1,
          "maximum": 9999999999,
          "description": "Random seed for reproducibility of the generation."
        },
        "repetition_penalty": {
          "type": "number",
          "minimum": 0,
          "maximum": 2,
          "description": "Penalty for repeated tokens; higher values discourage repetition."
        },
        "frequency_penalty": {
          "type": "number",
          "minimum": 0,
          "maximum": 2,
          "description": "Decreases the likelihood of the model repeating the same lines verbatim."
        },
        "presence_penalty": {
          "type": "number",
          "minimum": 0,
          "maximum": 2,
          "description": "Increases the likelihood of the model introducing new topics."
        },
        "lora": {
          "type": "string",
          "description": "Name of the LoRA (Low-Rank Adaptation) model to fine-tune the base model."
        }
      },
      "required": [
        "prompt"
      ]
    },
    {
      "title": "Messages",
      "properties": {
        "messages": {
          "type": "array",
          "description": "An array of message objects representing the conversation history.",
          "items": {
            "type": "object",
            "properties": {
              "role": {
                "type": "string",
                "description": "The role of the message sender (e.g., 'user', 'assistant', 'system', 'tool')."
              },
              "tool_call_id": {
                "type": "string",
                "description": "The tool call id. Must be supplied for tool calls for Mistral-3. If you don't know what to put here you can fall back to 000000001",
                "pattern": "[a-zA-Z0-9]{9}"
              },
              "content": {
                "oneOf": [
                  {
                    "type": "string",
                    "description": "The content of the message as a string."
                  },
                  {
                    "type": "array",
                    "items": {
                      "type": "object",
                      "properties": {
                        "type": {
                          "type": "string",
                          "description": "Type of the content provided"
                        },
                        "text": {
                          "type": "string"
                        },
                        "image_url": {
                          "type": "object",
                          "properties": {
                            "url": {
                              "type": "string",
                              "pattern": "^data:*",
                              "description": "image uri with data (e.g. data:image/jpeg;base64,/9j/...). HTTP URL will not be accepted"
                            }
                          }
                        }
                      }
                    }
                  },
                  {
                    "type": "object",
                    "properties": {
                      "type": {
                        "type": "string",
                        "description": "Type of the content provided"
                      },
                      "text": {
                        "type": "string"
                      },
                      "image_url": {
                        "type": "object",
                        "properties": {
                          "url": {
                            "type": "string",
                            "pattern": "^data:*",
                            "description": "image uri with data (e.g. data:image/jpeg;base64,/9j/...). HTTP URL will not be accepted"
                          }
                        }
                      }
                    }
                  }
                ]
              }
            }
          }
        },
        "image": {
          "oneOf": [
            {
              "type": "array",
              "description": "An array of integers that represent the image data constrained to 8-bit unsigned integer values. Deprecated, use image as a part of messages now.",
              "items": {
                "type": "number",
                "description": "A value between 0 and 255"
              }
            },
            {
              "type": "string",
              "format": "binary",
              "description": "Binary string representing the image contents. Deprecated, use image as a part of messages now."
            }
          ]
        },
        "functions": {
          "type": "array",
          "items": {
            "type": "object",
            "properties": {
              "name": {
                "type": "string"
              },
              "code": {
                "type": "string"
              }
            },
            "required": [
              "name",
              "code"
            ]
          }
        },
        "tools": {
          "type": "array",
          "description": "A list of tools available for the assistant to use.",
          "items": {
            "type": "object",
            "oneOf": [
              {
                "properties": {
                  "name": {
                    "type": "string",
                    "description": "The name of the tool. More descriptive the better."
                  },
                  "description": {
                    "type": "string",
                    "description": "A brief description of what the tool does."
                  },
                  "parameters": {
                    "type": "object",
                    "description": "Schema defining the parameters accepted by the tool.",
                    "properties": {
                      "type": {
                        "type": "string",
                        "description": "The type of the parameters object (usually 'object')."
                      },
                      "required": {
                        "type": "array",
                        "description": "List of required parameter names.",
                        "items": {
                          "type": "string"
                        }
                      },
                      "properties": {
                        "type": "object",
                        "description": "Definitions of each parameter.",
                        "additionalProperties": {
                          "type": "object",
                          "properties": {
                            "type": {
                              "type": "string",
                              "description": "The data type of the parameter."
                            },
                            "description": {
                              "type": "string",
                              "description": "A description of the expected parameter."
                            }
                          },
                          "required": [
                            "type",
                            "description"
                          ]
                        }
                      }
                    },
                    "required": [
                      "type",
                      "properties"
                    ]
                  }
                },
                "required": [
                  "name",
                  "description",
                  "parameters"
                ]
              },
              {
                "properties": {
                  "type": {
                    "type": "string",
                    "description": "Specifies the type of tool (e.g., 'function')."
                  },
                  "function": {
                    "type": "object",
                    "description": "Details of the function tool.",
                    "properties": {
                      "name": {
                        "type": "string",
                        "description": "The name of the function."
                      },
                      "description": {
                        "type": "string",
                        "description": "A brief description of what the function does."
                      },
                      "parameters": {
                        "type": "object",
                        "description": "Schema defining the parameters accepted by the function.",
                        "properties": {
                          "type": {
                            "type": "string",
                            "description": "The type of the parameters object (usually 'object')."
                          },
                          "required": {
                            "type": "array",
                            "description": "List of required parameter names.",
                            "items": {
                              "type": "string"
                            }
                          },
                          "properties": {
                            "type": "object",
                            "description": "Definitions of each parameter.",
                            "additionalProperties": {
                              "type": "object",
                              "properties": {
                                "type": {
                                  "type": "string",
                                  "description": "The data type of the parameter."
                                },
                                "description": {
                                  "type": "string",
                                  "description": "A description of the expected parameter."
                                }
                              },
                              "required": [
                                "type",
                                "description"
                              ]
                            }
                          }
                        },
                        "required": [
                          "type",
                          "properties"
                        ]
                      }
                    },
                    "required": [
                      "name",
                      "description",
                      "parameters"
                    ]
                  }
                },
                "required": [
                  "type",
                  "function"
                ]
              }
            ]
          }
        },
        "stream": {
          "type": "boolean",
          "default": false,
          "description": "If true, the response will be streamed back incrementally."
        },
        "max_tokens": {
          "type": "integer",
          "default": 256,
          "description": "The maximum number of tokens to generate in the response."
        },
        "temperature": {
          "type": "number",
          "default": 0.6,
          "minimum": 0,
          "maximum": 5,
          "description": "Controls the randomness of the output; higher values produce more random results."
        },
        "top_p": {
          "type": "number",
          "minimum": 0,
          "maximum": 2,
          "description": "Controls the creativity of the AI's responses by adjusting how many possible words it considers. Lower values make outputs more predictable; higher values allow for more varied and creative responses."
        },
        "top_k": {
          "type": "integer",
          "minimum": 1,
          "maximum": 50,
          "description": "Limits the AI to choose from the top 'k' most probable words. Lower values make responses more focused; higher values introduce more variety and potential surprises."
        },
        "seed": {
          "type": "integer",
          "minimum": 1,
          "maximum": 9999999999,
          "description": "Random seed for reproducibility of the generation."
        },
        "repetition_penalty": {
          "type": "number",
          "minimum": 0,
          "maximum": 2,
          "description": "Penalty for repeated tokens; higher values discourage repetition."
        },
        "frequency_penalty": {
          "type": "number",
          "minimum": 0,
          "maximum": 2,
          "description": "Decreases the likelihood of the model repeating the same lines verbatim."
        },
        "presence_penalty": {
          "type": "number",
          "minimum": 0,
          "maximum": 2,
          "description": "Increases the likelihood of the model introducing new topics."
        }
      },
      "required": [
        "messages"
      ]
    }
  ]
}
```

**Example Request:**
```javascript
const response = await fetch(
  'https://api.cloudflare.com/client/v4/accounts/{account_id}/ai/run/@cf/meta/llama-3.2-11b-vision-instruct',
  {
    method: 'POST',
    headers: {
      'Authorization': 'Bearer YOUR_API_TOKEN',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      "prompt": "Hello, how are you?"
})
  }
);

const result = await response.json();
console.log(result);
```

**Output Schema:**
```json
{
  "oneOf": [
    {
      "type": "object",
      "contentType": "application/json",
      "properties": {
        "response": {
          "type": "string",
          "description": "The generated text response from the model"
        },
        "tool_calls": {
          "type": "array",
          "description": "An array of tool calls requests made during the response generation",
          "items": {
            "type": "object",
            "properties": {
              "arguments": {
                "type": "object",
                "description": "The arguments passed to be passed to the tool call request"
              },
              "name": {
                "type": "string",
                "description": "The name of the tool to be called"
              }
            }
          }
        }
      }
    },
    {
      "type": "string",
      "contentType": "text/event-stream",
      "format": "binary"
    }
  ]
}
```

---

### @cf/defog/sqlcoder-7b-2

**Input Schema:**
```json
{
  "type": "object",
  "oneOf": [
    {
      "title": "Prompt",
      "properties": {
        "prompt": {
          "type": "string",
          "minLength": 1,
          "description": "The input text prompt for the model to generate a response."
        },
        "lora": {
          "type": "string",
          "description": "Name of the LoRA (Low-Rank Adaptation) model to fine-tune the base model."
        },
        "response_format": {
          "title": "JSON Mode",
          "type": "object",
          "properties": {
            "type": {
              "type": "string",
              "enum": [
                "json_object",
                "json_schema"
              ]
            },
            "json_schema": {}
          }
        },
        "raw": {
          "type": "boolean",
          "default": false,
          "description": "If true, a chat template is not applied and you must adhere to the specific model's expected formatting."
        },
        "stream": {
          "type": "boolean",
          "default": false,
          "description": "If true, the response will be streamed back incrementally using SSE, Server Sent Events."
        },
        "max_tokens": {
          "type": "integer",
          "default": 256,
          "description": "The maximum number of tokens to generate in the response."
        },
        "temperature": {
          "type": "number",
          "default": 0.6,
          "minimum": 0,
          "maximum": 5,
          "description": "Controls the randomness of the output; higher values produce more random results."
        },
        "top_p": {
          "type": "number",
          "minimum": 0.001,
          "maximum": 1,
          "description": "Adjusts the creativity of the AI's responses by controlling how many possible words it considers. Lower values make outputs more predictable; higher values allow for more varied and creative responses."
        },
        "top_k": {
          "type": "integer",
          "minimum": 1,
          "maximum": 50,
          "description": "Limits the AI to choose from the top 'k' most probable words. Lower values make responses more focused; higher values introduce more variety and potential surprises."
        },
        "seed": {
          "type": "integer",
          "minimum": 1,
          "maximum": 9999999999,
          "description": "Random seed for reproducibility of the generation."
        },
        "repetition_penalty": {
          "type": "number",
          "minimum": 0,
          "maximum": 2,
          "description": "Penalty for repeated tokens; higher values discourage repetition."
        },
        "frequency_penalty": {
          "type": "number",
          "minimum": -2,
          "maximum": 2,
          "description": "Decreases the likelihood of the model repeating the same lines verbatim."
        },
        "presence_penalty": {
          "type": "number",
          "minimum": -2,
          "maximum": 2,
          "description": "Increases the likelihood of the model introducing new topics."
        }
      },
      "required": [
        "prompt"
      ]
    },
    {
      "title": "Messages",
      "properties": {
        "messages": {
          "type": "array",
          "description": "An array of message objects representing the conversation history.",
          "items": {
            "type": "object",
            "properties": {
              "role": {
                "type": "string",
                "description": "The role of the message sender (e.g., 'user', 'assistant', 'system', 'tool')."
              },
              "content": {
                "type": "string",
                "description": "The content of the message as a string."
              }
            },
            "required": [
              "role",
              "content"
            ]
          }
        },
        "functions": {
          "type": "array",
          "items": {
            "type": "object",
            "properties": {
              "name": {
                "type": "string"
              },
              "code": {
                "type": "string"
              }
            },
            "required": [
              "name",
              "code"
            ]
          }
        },
        "tools": {
          "type": "array",
          "description": "A list of tools available for the assistant to use.",
          "items": {
            "type": "object",
            "oneOf": [
              {
                "properties": {
                  "name": {
                    "type": "string",
                    "description": "The name of the tool. More descriptive the better."
                  },
                  "description": {
                    "type": "string",
                    "description": "A brief description of what the tool does."
                  },
                  "parameters": {
                    "type": "object",
                    "description": "Schema defining the parameters accepted by the tool.",
                    "properties": {
                      "type": {
                        "type": "string",
                        "description": "The type of the parameters object (usually 'object')."
                      },
                      "required": {
                        "type": "array",
                        "description": "List of required parameter names.",
                        "items": {
                          "type": "string"
                        }
                      },
                      "properties": {
                        "type": "object",
                        "description": "Definitions of each parameter.",
                        "additionalProperties": {
                          "type": "object",
                          "properties": {
                            "type": {
                              "type": "string",
                              "description": "The data type of the parameter."
                            },
                            "description": {
                              "type": "string",
                              "description": "A description of the expected parameter."
                            }
                          },
                          "required": [
                            "type",
                            "description"
                          ]
                        }
                      }
                    },
                    "required": [
                      "type",
                      "properties"
                    ]
                  }
                },
                "required": [
                  "name",
                  "description",
                  "parameters"
                ]
              },
              {
                "properties": {
                  "type": {
                    "type": "string",
                    "description": "Specifies the type of tool (e.g., 'function')."
                  },
                  "function": {
                    "type": "object",
                    "description": "Details of the function tool.",
                    "properties": {
                      "name": {
                        "type": "string",
                        "description": "The name of the function."
                      },
                      "description": {
                        "type": "string",
                        "description": "A brief description of what the function does."
                      },
                      "parameters": {
                        "type": "object",
                        "description": "Schema defining the parameters accepted by the function.",
                        "properties": {
                          "type": {
                            "type": "string",
                            "description": "The type of the parameters object (usually 'object')."
                          },
                          "required": {
                            "type": "array",
                            "description": "List of required parameter names.",
                            "items": {
                              "type": "string"
                            }
                          },
                          "properties": {
                            "type": "object",
                            "description": "Definitions of each parameter.",
                            "additionalProperties": {
                              "type": "object",
                              "properties": {
                                "type": {
                                  "type": "string",
                                  "description": "The data type of the parameter."
                                },
                                "description": {
                                  "type": "string",
                                  "description": "A description of the expected parameter."
                                }
                              },
                              "required": [
                                "type",
                                "description"
                              ]
                            }
                          }
                        },
                        "required": [
                          "type",
                          "properties"
                        ]
                      }
                    },
                    "required": [
                      "name",
                      "description",
                      "parameters"
                    ]
                  }
                },
                "required": [
                  "type",
                  "function"
                ]
              }
            ]
          }
        },
        "response_format": {
          "title": "JSON Mode",
          "type": "object",
          "properties": {
            "type": {
              "type": "string",
              "enum": [
                "json_object",
                "json_schema"
              ]
            },
            "json_schema": {}
          }
        },
        "raw": {
          "type": "boolean",
          "default": false,
          "description": "If true, a chat template is not applied and you must adhere to the specific model's expected formatting."
        },
        "stream": {
          "type": "boolean",
          "default": false,
          "description": "If true, the response will be streamed back incrementally using SSE, Server Sent Events."
        },
        "max_tokens": {
          "type": "integer",
          "default": 256,
          "description": "The maximum number of tokens to generate in the response."
        },
        "temperature": {
          "type": "number",
          "default": 0.6,
          "minimum": 0,
          "maximum": 5,
          "description": "Controls the randomness of the output; higher values produce more random results."
        },
        "top_p": {
          "type": "number",
          "minimum": 0.001,
          "maximum": 1,
          "description": "Adjusts the creativity of the AI's responses by controlling how many possible words it considers. Lower values make outputs more predictable; higher values allow for more varied and creative responses."
        },
        "top_k": {
          "type": "integer",
          "minimum": 1,
          "maximum": 50,
          "description": "Limits the AI to choose from the top 'k' most probable words. Lower values make responses more focused; higher values introduce more variety and potential surprises."
        },
        "seed": {
          "type": "integer",
          "minimum": 1,
          "maximum": 9999999999,
          "description": "Random seed for reproducibility of the generation."
        },
        "repetition_penalty": {
          "type": "number",
          "minimum": 0,
          "maximum": 2,
          "description": "Penalty for repeated tokens; higher values discourage repetition."
        },
        "frequency_penalty": {
          "type": "number",
          "minimum": -2,
          "maximum": 2,
          "description": "Decreases the likelihood of the model repeating the same lines verbatim."
        },
        "presence_penalty": {
          "type": "number",
          "minimum": -2,
          "maximum": 2,
          "description": "Increases the likelihood of the model introducing new topics."
        }
      },
      "required": [
        "messages"
      ]
    }
  ]
}
```

**Example Request:**
```javascript
const response = await fetch(
  'https://api.cloudflare.com/client/v4/accounts/{account_id}/ai/run/@cf/defog/sqlcoder-7b-2',
  {
    method: 'POST',
    headers: {
      'Authorization': 'Bearer YOUR_API_TOKEN',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      "prompt": "Hello, how are you?"
})
  }
);

const result = await response.json();
console.log(result);
```

**Output Schema:**
```json
{
  "oneOf": [
    {
      "type": "object",
      "properties": {
        "response": {
          "type": "string",
          "description": "The generated text response from the model"
        },
        "usage": {
          "type": "object",
          "description": "Usage statistics for the inference request",
          "properties": {
            "prompt_tokens": {
              "type": "number",
              "description": "Total number of tokens in input",
              "default": 0
            },
            "completion_tokens": {
              "type": "number",
              "description": "Total number of tokens in output",
              "default": 0
            },
            "total_tokens": {
              "type": "number",
              "description": "Total number of input and output tokens",
              "default": 0
            }
          }
        },
        "tool_calls": {
          "type": "array",
          "description": "An array of tool calls requests made during the response generation",
          "items": {
            "type": "object",
            "properties": {
              "arguments": {
                "type": "object",
                "description": "The arguments passed to be passed to the tool call request"
              },
              "name": {
                "type": "string",
                "description": "The name of the tool to be called"
              }
            }
          }
        }
      },
      "required": [
        "response"
      ]
    },
    {
      "type": "string",
      "format": "binary"
    }
  ]
}
```

---

### @cf/microsoft/phi-2

**Input Schema:**
```json
{
  "type": "object",
  "oneOf": [
    {
      "title": "Prompt",
      "properties": {
        "prompt": {
          "type": "string",
          "minLength": 1,
          "description": "The input text prompt for the model to generate a response."
        },
        "lora": {
          "type": "string",
          "description": "Name of the LoRA (Low-Rank Adaptation) model to fine-tune the base model."
        },
        "response_format": {
          "title": "JSON Mode",
          "type": "object",
          "properties": {
            "type": {
              "type": "string",
              "enum": [
                "json_object",
                "json_schema"
              ]
            },
            "json_schema": {}
          }
        },
        "raw": {
          "type": "boolean",
          "default": false,
          "description": "If true, a chat template is not applied and you must adhere to the specific model's expected formatting."
        },
        "stream": {
          "type": "boolean",
          "default": false,
          "description": "If true, the response will be streamed back incrementally using SSE, Server Sent Events."
        },
        "max_tokens": {
          "type": "integer",
          "default": 256,
          "description": "The maximum number of tokens to generate in the response."
        },
        "temperature": {
          "type": "number",
          "default": 0.6,
          "minimum": 0,
          "maximum": 5,
          "description": "Controls the randomness of the output; higher values produce more random results."
        },
        "top_p": {
          "type": "number",
          "minimum": 0.001,
          "maximum": 1,
          "description": "Adjusts the creativity of the AI's responses by controlling how many possible words it considers. Lower values make outputs more predictable; higher values allow for more varied and creative responses."
        },
        "top_k": {
          "type": "integer",
          "minimum": 1,
          "maximum": 50,
          "description": "Limits the AI to choose from the top 'k' most probable words. Lower values make responses more focused; higher values introduce more variety and potential surprises."
        },
        "seed": {
          "type": "integer",
          "minimum": 1,
          "maximum": 9999999999,
          "description": "Random seed for reproducibility of the generation."
        },
        "repetition_penalty": {
          "type": "number",
          "minimum": 0,
          "maximum": 2,
          "description": "Penalty for repeated tokens; higher values discourage repetition."
        },
        "frequency_penalty": {
          "type": "number",
          "minimum": -2,
          "maximum": 2,
          "description": "Decreases the likelihood of the model repeating the same lines verbatim."
        },
        "presence_penalty": {
          "type": "number",
          "minimum": -2,
          "maximum": 2,
          "description": "Increases the likelihood of the model introducing new topics."
        }
      },
      "required": [
        "prompt"
      ]
    },
    {
      "title": "Messages",
      "properties": {
        "messages": {
          "type": "array",
          "description": "An array of message objects representing the conversation history.",
          "items": {
            "type": "object",
            "properties": {
              "role": {
                "type": "string",
                "description": "The role of the message sender (e.g., 'user', 'assistant', 'system', 'tool')."
              },
              "content": {
                "type": "string",
                "description": "The content of the message as a string."
              }
            },
            "required": [
              "role",
              "content"
            ]
          }
        },
        "functions": {
          "type": "array",
          "items": {
            "type": "object",
            "properties": {
              "name": {
                "type": "string"
              },
              "code": {
                "type": "string"
              }
            },
            "required": [
              "name",
              "code"
            ]
          }
        },
        "tools": {
          "type": "array",
          "description": "A list of tools available for the assistant to use.",
          "items": {
            "type": "object",
            "oneOf": [
              {
                "properties": {
                  "name": {
                    "type": "string",
                    "description": "The name of the tool. More descriptive the better."
                  },
                  "description": {
                    "type": "string",
                    "description": "A brief description of what the tool does."
                  },
                  "parameters": {
                    "type": "object",
                    "description": "Schema defining the parameters accepted by the tool.",
                    "properties": {
                      "type": {
                        "type": "string",
                        "description": "The type of the parameters object (usually 'object')."
                      },
                      "required": {
                        "type": "array",
                        "description": "List of required parameter names.",
                        "items": {
                          "type": "string"
                        }
                      },
                      "properties": {
                        "type": "object",
                        "description": "Definitions of each parameter.",
                        "additionalProperties": {
                          "type": "object",
                          "properties": {
                            "type": {
                              "type": "string",
                              "description": "The data type of the parameter."
                            },
                            "description": {
                              "type": "string",
                              "description": "A description of the expected parameter."
                            }
                          },
                          "required": [
                            "type",
                            "description"
                          ]
                        }
                      }
                    },
                    "required": [
                      "type",
                      "properties"
                    ]
                  }
                },
                "required": [
                  "name",
                  "description",
                  "parameters"
                ]
              },
              {
                "properties": {
                  "type": {
                    "type": "string",
                    "description": "Specifies the type of tool (e.g., 'function')."
                  },
                  "function": {
                    "type": "object",
                    "description": "Details of the function tool.",
                    "properties": {
                      "name": {
                        "type": "string",
                        "description": "The name of the function."
                      },
                      "description": {
                        "type": "string",
                        "description": "A brief description of what the function does."
                      },
                      "parameters": {
                        "type": "object",
                        "description": "Schema defining the parameters accepted by the function.",
                        "properties": {
                          "type": {
                            "type": "string",
                            "description": "The type of the parameters object (usually 'object')."
                          },
                          "required": {
                            "type": "array",
                            "description": "List of required parameter names.",
                            "items": {
                              "type": "string"
                            }
                          },
                          "properties": {
                            "type": "object",
                            "description": "Definitions of each parameter.",
                            "additionalProperties": {
                              "type": "object",
                              "properties": {
                                "type": {
                                  "type": "string",
                                  "description": "The data type of the parameter."
                                },
                                "description": {
                                  "type": "string",
                                  "description": "A description of the expected parameter."
                                }
                              },
                              "required": [
                                "type",
                                "description"
                              ]
                            }
                          }
                        },
                        "required": [
                          "type",
                          "properties"
                        ]
                      }
                    },
                    "required": [
                      "name",
                      "description",
                      "parameters"
                    ]
                  }
                },
                "required": [
                  "type",
                  "function"
                ]
              }
            ]
          }
        },
        "response_format": {
          "title": "JSON Mode",
          "type": "object",
          "properties": {
            "type": {
              "type": "string",
              "enum": [
                "json_object",
                "json_schema"
              ]
            },
            "json_schema": {}
          }
        },
        "raw": {
          "type": "boolean",
          "default": false,
          "description": "If true, a chat template is not applied and you must adhere to the specific model's expected formatting."
        },
        "stream": {
          "type": "boolean",
          "default": false,
          "description": "If true, the response will be streamed back incrementally using SSE, Server Sent Events."
        },
        "max_tokens": {
          "type": "integer",
          "default": 256,
          "description": "The maximum number of tokens to generate in the response."
        },
        "temperature": {
          "type": "number",
          "default": 0.6,
          "minimum": 0,
          "maximum": 5,
          "description": "Controls the randomness of the output; higher values produce more random results."
        },
        "top_p": {
          "type": "number",
          "minimum": 0.001,
          "maximum": 1,
          "description": "Adjusts the creativity of the AI's responses by controlling how many possible words it considers. Lower values make outputs more predictable; higher values allow for more varied and creative responses."
        },
        "top_k": {
          "type": "integer",
          "minimum": 1,
          "maximum": 50,
          "description": "Limits the AI to choose from the top 'k' most probable words. Lower values make responses more focused; higher values introduce more variety and potential surprises."
        },
        "seed": {
          "type": "integer",
          "minimum": 1,
          "maximum": 9999999999,
          "description": "Random seed for reproducibility of the generation."
        },
        "repetition_penalty": {
          "type": "number",
          "minimum": 0,
          "maximum": 2,
          "description": "Penalty for repeated tokens; higher values discourage repetition."
        },
        "frequency_penalty": {
          "type": "number",
          "minimum": -2,
          "maximum": 2,
          "description": "Decreases the likelihood of the model repeating the same lines verbatim."
        },
        "presence_penalty": {
          "type": "number",
          "minimum": -2,
          "maximum": 2,
          "description": "Increases the likelihood of the model introducing new topics."
        }
      },
      "required": [
        "messages"
      ]
    }
  ]
}
```

**Example Request:**
```javascript
const response = await fetch(
  'https://api.cloudflare.com/client/v4/accounts/{account_id}/ai/run/@cf/microsoft/phi-2',
  {
    method: 'POST',
    headers: {
      'Authorization': 'Bearer YOUR_API_TOKEN',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      "prompt": "Hello, how are you?"
})
  }
);

const result = await response.json();
console.log(result);
```

**Output Schema:**
```json
{
  "oneOf": [
    {
      "type": "object",
      "properties": {
        "response": {
          "type": "string",
          "description": "The generated text response from the model"
        },
        "usage": {
          "type": "object",
          "description": "Usage statistics for the inference request",
          "properties": {
            "prompt_tokens": {
              "type": "number",
              "description": "Total number of tokens in input",
              "default": 0
            },
            "completion_tokens": {
              "type": "number",
              "description": "Total number of tokens in output",
              "default": 0
            },
            "total_tokens": {
              "type": "number",
              "description": "Total number of input and output tokens",
              "default": 0
            }
          }
        },
        "tool_calls": {
          "type": "array",
          "description": "An array of tool calls requests made during the response generation",
          "items": {
            "type": "object",
            "properties": {
              "arguments": {
                "type": "object",
                "description": "The arguments passed to be passed to the tool call request"
              },
              "name": {
                "type": "string",
                "description": "The name of the tool to be called"
              }
            }
          }
        }
      },
      "required": [
        "response"
      ]
    },
    {
      "type": "string",
      "format": "binary"
    }
  ]
}
```

---

### @cf/openai/gpt-oss-20b

**Input Schema:**
```json
{
  "oneOf": [
    {
      "type": "object",
      "oneOf": [
        {
          "title": "Prompt",
          "properties": {
            "prompt": {
              "type": "string",
              "minLength": 1,
              "description": "The input text prompt for the model to generate a response."
            },
            "lora": {
              "type": "string",
              "description": "Name of the LoRA (Low-Rank Adaptation) model to fine-tune the base model."
            },
            "response_format": {
              "title": "JSON Mode",
              "type": "object",
              "properties": {
                "type": {
                  "type": "string",
                  "enum": [
                    "json_object",
                    "json_schema"
                  ]
                },
                "json_schema": {}
              }
            },
            "raw": {
              "type": "boolean",
              "default": false,
              "description": "If true, a chat template is not applied and you must adhere to the specific model's expected formatting."
            },
            "stream": {
              "type": "boolean",
              "default": false,
              "description": "If true, the response will be streamed back incrementally using SSE, Server Sent Events."
            },
            "max_tokens": {
              "type": "integer",
              "default": 256,
              "description": "The maximum number of tokens to generate in the response."
            },
            "temperature": {
              "type": "number",
              "default": 0.6,
              "minimum": 0,
              "maximum": 5,
              "description": "Controls the randomness of the output; higher values produce more random results."
            },
            "top_p": {
              "type": "number",
              "minimum": 0.001,
              "maximum": 1,
              "description": "Adjusts the creativity of the AI's responses by controlling how many possible words it considers. Lower values make outputs more predictable; higher values allow for more varied and creative responses."
            },
            "top_k": {
              "type": "integer",
              "minimum": 1,
              "maximum": 50,
              "description": "Limits the AI to choose from the top 'k' most probable words. Lower values make responses more focused; higher values introduce more variety and potential surprises."
            },
            "seed": {
              "type": "integer",
              "minimum": 1,
              "maximum": 9999999999,
              "description": "Random seed for reproducibility of the generation."
            },
            "repetition_penalty": {
              "type": "number",
              "minimum": 0,
              "maximum": 2,
              "description": "Penalty for repeated tokens; higher values discourage repetition."
            },
            "frequency_penalty": {
              "type": "number",
              "minimum": -2,
              "maximum": 2,
              "description": "Decreases the likelihood of the model repeating the same lines verbatim."
            },
            "presence_penalty": {
              "type": "number",
              "minimum": -2,
              "maximum": 2,
              "description": "Increases the likelihood of the model introducing new topics."
            }
          },
          "required": [
            "prompt"
          ]
        },
        {
          "title": "Messages",
          "properties": {
            "messages": {
              "type": "array",
              "description": "An array of message objects representing the conversation history.",
              "items": {
                "type": "object",
                "properties": {
                  "role": {
                    "type": "string",
                    "description": "The role of the message sender (e.g., 'user', 'assistant', 'system', 'tool')."
                  },
                  "content": {
                    "type": "string",
                    "description": "The content of the message as a string."
                  }
                },
                "required": [
                  "role",
                  "content"
                ]
              }
            },
            "functions": {
              "type": "array",
              "items": {
                "type": "object",
                "properties": {
                  "name": {
                    "type": "string"
                  },
                  "code": {
                    "type": "string"
                  }
                },
                "required": [
                  "name",
                  "code"
                ]
              }
            },
            "tools": {
              "type": "array",
              "description": "A list of tools available for the assistant to use.",
              "items": {
                "type": "object",
                "oneOf": [
                  {
                    "properties": {
                      "name": {
                        "type": "string",
                        "description": "The name of the tool. More descriptive the better."
                      },
                      "description": {
                        "type": "string",
                        "description": "A brief description of what the tool does."
                      },
                      "parameters": {
                        "type": "object",
                        "description": "Schema defining the parameters accepted by the tool.",
                        "properties": {
                          "type": {
                            "type": "string",
                            "description": "The type of the parameters object (usually 'object')."
                          },
                          "required": {
                            "type": "array",
                            "description": "List of required parameter names.",
                            "items": {
                              "type": "string"
                            }
                          },
                          "properties": {
                            "type": "object",
                            "description": "Definitions of each parameter.",
                            "additionalProperties": {
                              "type": "object",
                              "properties": {
                                "type": {
                                  "type": "string",
                                  "description": "The data type of the parameter."
                                },
                                "description": {
                                  "type": "string",
                                  "description": "A description of the expected parameter."
                                }
                              },
                              "required": [
                                "type",
                                "description"
                              ]
                            }
                          }
                        },
                        "required": [
                          "type",
                          "properties"
                        ]
                      }
                    },
                    "required": [
                      "name",
                      "description",
                      "parameters"
                    ]
                  },
                  {
                    "properties": {
                      "type": {
                        "type": "string",
                        "description": "Specifies the type of tool (e.g., 'function')."
                      },
                      "function": {
                        "type": "object",
                        "description": "Details of the function tool.",
                        "properties": {
                          "name": {
                            "type": "string",
                            "description": "The name of the function."
                          },
                          "description": {
                            "type": "string",
                            "description": "A brief description of what the function does."
                          },
                          "parameters": {
                            "type": "object",
                            "description": "Schema defining the parameters accepted by the function.",
                            "properties": {
                              "type": {
                                "type": "string",
                                "description": "The type of the parameters object (usually 'object')."
                              },
                              "required": {
                                "type": "array",
                                "description": "List of required parameter names.",
                                "items": {
                                  "type": "string"
                                }
                              },
                              "properties": {
                                "type": "object",
                                "description": "Definitions of each parameter.",
                                "additionalProperties": {
                                  "type": "object",
                                  "properties": {
                                    "type": {
                                      "type": "string",
                                      "description": "The data type of the parameter."
                                    },
                                    "description": {
                                      "type": "string",
                                      "description": "A description of the expected parameter."
                                    }
                                  },
                                  "required": [
                                    "type",
                                    "description"
                                  ]
                                }
                              }
                            },
                            "required": [
                              "type",
                              "properties"
                            ]
                          }
                        },
                        "required": [
                          "name",
                          "description",
                          "parameters"
                        ]
                      }
                    },
                    "required": [
                      "type",
                      "function"
                    ]
                  }
                ]
              }
            },
            "response_format": {
              "title": "JSON Mode",
              "type": "object",
              "properties": {
                "type": {
                  "type": "string",
                  "enum": [
                    "json_object",
                    "json_schema"
                  ]
                },
                "json_schema": {}
              }
            },
            "raw": {
              "type": "boolean",
              "default": false,
              "description": "If true, a chat template is not applied and you must adhere to the specific model's expected formatting."
            },
            "stream": {
              "type": "boolean",
              "default": false,
              "description": "If true, the response will be streamed back incrementally using SSE, Server Sent Events."
            },
            "max_tokens": {
              "type": "integer",
              "default": 256,
              "description": "The maximum number of tokens to generate in the response."
            },
            "temperature": {
              "type": "number",
              "default": 0.6,
              "minimum": 0,
              "maximum": 5,
              "description": "Controls the randomness of the output; higher values produce more random results."
            },
            "top_p": {
              "type": "number",
              "minimum": 0.001,
              "maximum": 1,
              "description": "Adjusts the creativity of the AI's responses by controlling how many possible words it considers. Lower values make outputs more predictable; higher values allow for more varied and creative responses."
            },
            "top_k": {
              "type": "integer",
              "minimum": 1,
              "maximum": 50,
              "description": "Limits the AI to choose from the top 'k' most probable words. Lower values make responses more focused; higher values introduce more variety and potential surprises."
            },
            "seed": {
              "type": "integer",
              "minimum": 1,
              "maximum": 9999999999,
              "description": "Random seed for reproducibility of the generation."
            },
            "repetition_penalty": {
              "type": "number",
              "minimum": 0,
              "maximum": 2,
              "description": "Penalty for repeated tokens; higher values discourage repetition."
            },
            "frequency_penalty": {
              "type": "number",
              "minimum": -2,
              "maximum": 2,
              "description": "Decreases the likelihood of the model repeating the same lines verbatim."
            },
            "presence_penalty": {
              "type": "number",
              "minimum": -2,
              "maximum": 2,
              "description": "Increases the likelihood of the model introducing new topics."
            }
          },
          "required": [
            "messages"
          ]
        }
      ]
    },
    {
      "type": "object",
      "title": "Responses",
      "properties": {
        "input": {
          "anyOf": [
            {
              "type": "string"
            },
            {
              "items": {},
              "type": "array"
            }
          ],
          "description": "Responses API Input messages. Refer to OpenAI Responses API docs to learn more about supported content types"
        },
        "reasoning": {
          "type": "object",
          "properties": {
            "effort": {
              "type": "string",
              "description": "Constrains effort on reasoning for reasoning models. Currently supported values are low, medium, and high. Reducing reasoning effort can result in faster responses and fewer tokens used on reasoning in a response.",
              "enum": [
                "low",
                "medium",
                "high"
              ]
            },
            "summary": {
              "type": "string",
              "description": "A summary of the reasoning performed by the model. This can be useful for debugging and understanding the model's reasoning process. One of auto, concise, or detailed.",
              "enum": [
                "auto",
                "concise",
                "detailed"
              ]
            }
          }
        }
      },
      "required": [
        "input"
      ]
    },
    {
      "type": "object",
      "title": "Responses_Async",
      "properties": {
        "requests": {
          "type": "array",
          "items": {
            "type": "object",
            "properties": {
              "input": {
                "anyOf": [
                  {
                    "type": "string"
                  },
                  {
                    "items": {},
                    "type": "array"
                  }
                ],
                "description": "Responses API Input messages. Refer to OpenAI Responses API docs to learn more about supported content types"
              },
              "reasoning": {
                "type": "object",
                "properties": {
                  "effort": {
                    "type": "string",
                    "description": "Constrains effort on reasoning for reasoning models. Currently supported values are low, medium, and high. Reducing reasoning effort can result in faster responses and fewer tokens used on reasoning in a response.",
                    "enum": [
                      "low",
                      "medium",
                      "high"
                    ]
                  },
                  "summary": {
                    "type": "string",
                    "description": "A summary of the reasoning performed by the model. This can be useful for debugging and understanding the model's reasoning process. One of auto, concise, or detailed.",
                    "enum": [
                      "auto",
                      "concise",
                      "detailed"
                    ]
                  }
                }
              }
            },
            "required": [
              "input"
            ]
          }
        }
      },
      "required": [
        "requests"
      ]
    }
  ]
}
```

**Example Request:**
```javascript
const response = await fetch(
  'https://api.cloudflare.com/client/v4/accounts/{account_id}/ai/run/@cf/openai/gpt-oss-20b',
  {
    method: 'POST',
    headers: {
      'Authorization': 'Bearer YOUR_API_TOKEN',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({})
  }
);

const result = await response.json();
console.log(result);
```

**Output Schema:**
```json
{
  "oneOf": [
    {
      "type": "object",
      "contentType": "application/json"
    },
    {
      "type": "string",
      "contentType": "text/event-stream",
      "format": "binary"
    }
  ]
}
```

---

### @cf/qwen/qwen1.5-14b-chat-awq

**Input Schema:**
```json
{
  "type": "object",
  "oneOf": [
    {
      "title": "Prompt",
      "properties": {
        "prompt": {
          "type": "string",
          "minLength": 1,
          "description": "The input text prompt for the model to generate a response."
        },
        "lora": {
          "type": "string",
          "description": "Name of the LoRA (Low-Rank Adaptation) model to fine-tune the base model."
        },
        "response_format": {
          "title": "JSON Mode",
          "type": "object",
          "properties": {
            "type": {
              "type": "string",
              "enum": [
                "json_object",
                "json_schema"
              ]
            },
            "json_schema": {}
          }
        },
        "raw": {
          "type": "boolean",
          "default": false,
          "description": "If true, a chat template is not applied and you must adhere to the specific model's expected formatting."
        },
        "stream": {
          "type": "boolean",
          "default": false,
          "description": "If true, the response will be streamed back incrementally using SSE, Server Sent Events."
        },
        "max_tokens": {
          "type": "integer",
          "default": 256,
          "description": "The maximum number of tokens to generate in the response."
        },
        "temperature": {
          "type": "number",
          "default": 0.6,
          "minimum": 0,
          "maximum": 5,
          "description": "Controls the randomness of the output; higher values produce more random results."
        },
        "top_p": {
          "type": "number",
          "minimum": 0.001,
          "maximum": 1,
          "description": "Adjusts the creativity of the AI's responses by controlling how many possible words it considers. Lower values make outputs more predictable; higher values allow for more varied and creative responses."
        },
        "top_k": {
          "type": "integer",
          "minimum": 1,
          "maximum": 50,
          "description": "Limits the AI to choose from the top 'k' most probable words. Lower values make responses more focused; higher values introduce more variety and potential surprises."
        },
        "seed": {
          "type": "integer",
          "minimum": 1,
          "maximum": 9999999999,
          "description": "Random seed for reproducibility of the generation."
        },
        "repetition_penalty": {
          "type": "number",
          "minimum": 0,
          "maximum": 2,
          "description": "Penalty for repeated tokens; higher values discourage repetition."
        },
        "frequency_penalty": {
          "type": "number",
          "minimum": -2,
          "maximum": 2,
          "description": "Decreases the likelihood of the model repeating the same lines verbatim."
        },
        "presence_penalty": {
          "type": "number",
          "minimum": -2,
          "maximum": 2,
          "description": "Increases the likelihood of the model introducing new topics."
        }
      },
      "required": [
        "prompt"
      ]
    },
    {
      "title": "Messages",
      "properties": {
        "messages": {
          "type": "array",
          "description": "An array of message objects representing the conversation history.",
          "items": {
            "type": "object",
            "properties": {
              "role": {
                "type": "string",
                "description": "The role of the message sender (e.g., 'user', 'assistant', 'system', 'tool')."
              },
              "content": {
                "type": "string",
                "description": "The content of the message as a string."
              }
            },
            "required": [
              "role",
              "content"
            ]
          }
        },
        "functions": {
          "type": "array",
          "items": {
            "type": "object",
            "properties": {
              "name": {
                "type": "string"
              },
              "code": {
                "type": "string"
              }
            },
            "required": [
              "name",
              "code"
            ]
          }
        },
        "tools": {
          "type": "array",
          "description": "A list of tools available for the assistant to use.",
          "items": {
            "type": "object",
            "oneOf": [
              {
                "properties": {
                  "name": {
                    "type": "string",
                    "description": "The name of the tool. More descriptive the better."
                  },
                  "description": {
                    "type": "string",
                    "description": "A brief description of what the tool does."
                  },
                  "parameters": {
                    "type": "object",
                    "description": "Schema defining the parameters accepted by the tool.",
                    "properties": {
                      "type": {
                        "type": "string",
                        "description": "The type of the parameters object (usually 'object')."
                      },
                      "required": {
                        "type": "array",
                        "description": "List of required parameter names.",
                        "items": {
                          "type": "string"
                        }
                      },
                      "properties": {
                        "type": "object",
                        "description": "Definitions of each parameter.",
                        "additionalProperties": {
                          "type": "object",
                          "properties": {
                            "type": {
                              "type": "string",
                              "description": "The data type of the parameter."
                            },
                            "description": {
                              "type": "string",
                              "description": "A description of the expected parameter."
                            }
                          },
                          "required": [
                            "type",
                            "description"
                          ]
                        }
                      }
                    },
                    "required": [
                      "type",
                      "properties"
                    ]
                  }
                },
                "required": [
                  "name",
                  "description",
                  "parameters"
                ]
              },
              {
                "properties": {
                  "type": {
                    "type": "string",
                    "description": "Specifies the type of tool (e.g., 'function')."
                  },
                  "function": {
                    "type": "object",
                    "description": "Details of the function tool.",
                    "properties": {
                      "name": {
                        "type": "string",
                        "description": "The name of the function."
                      },
                      "description": {
                        "type": "string",
                        "description": "A brief description of what the function does."
                      },
                      "parameters": {
                        "type": "object",
                        "description": "Schema defining the parameters accepted by the function.",
                        "properties": {
                          "type": {
                            "type": "string",
                            "description": "The type of the parameters object (usually 'object')."
                          },
                          "required": {
                            "type": "array",
                            "description": "List of required parameter names.",
                            "items": {
                              "type": "string"
                            }
                          },
                          "properties": {
                            "type": "object",
                            "description": "Definitions of each parameter.",
                            "additionalProperties": {
                              "type": "object",
                              "properties": {
                                "type": {
                                  "type": "string",
                                  "description": "The data type of the parameter."
                                },
                                "description": {
                                  "type": "string",
                                  "description": "A description of the expected parameter."
                                }
                              },
                              "required": [
                                "type",
                                "description"
                              ]
                            }
                          }
                        },
                        "required": [
                          "type",
                          "properties"
                        ]
                      }
                    },
                    "required": [
                      "name",
                      "description",
                      "parameters"
                    ]
                  }
                },
                "required": [
                  "type",
                  "function"
                ]
              }
            ]
          }
        },
        "response_format": {
          "title": "JSON Mode",
          "type": "object",
          "properties": {
            "type": {
              "type": "string",
              "enum": [
                "json_object",
                "json_schema"
              ]
            },
            "json_schema": {}
          }
        },
        "raw": {
          "type": "boolean",
          "default": false,
          "description": "If true, a chat template is not applied and you must adhere to the specific model's expected formatting."
        },
        "stream": {
          "type": "boolean",
          "default": false,
          "description": "If true, the response will be streamed back incrementally using SSE, Server Sent Events."
        },
        "max_tokens": {
          "type": "integer",
          "default": 256,
          "description": "The maximum number of tokens to generate in the response."
        },
        "temperature": {
          "type": "number",
          "default": 0.6,
          "minimum": 0,
          "maximum": 5,
          "description": "Controls the randomness of the output; higher values produce more random results."
        },
        "top_p": {
          "type": "number",
          "minimum": 0.001,
          "maximum": 1,
          "description": "Adjusts the creativity of the AI's responses by controlling how many possible words it considers. Lower values make outputs more predictable; higher values allow for more varied and creative responses."
        },
        "top_k": {
          "type": "integer",
          "minimum": 1,
          "maximum": 50,
          "description": "Limits the AI to choose from the top 'k' most probable words. Lower values make responses more focused; higher values introduce more variety and potential surprises."
        },
        "seed": {
          "type": "integer",
          "minimum": 1,
          "maximum": 9999999999,
          "description": "Random seed for reproducibility of the generation."
        },
        "repetition_penalty": {
          "type": "number",
          "minimum": 0,
          "maximum": 2,
          "description": "Penalty for repeated tokens; higher values discourage repetition."
        },
        "frequency_penalty": {
          "type": "number",
          "minimum": -2,
          "maximum": 2,
          "description": "Decreases the likelihood of the model repeating the same lines verbatim."
        },
        "presence_penalty": {
          "type": "number",
          "minimum": -2,
          "maximum": 2,
          "description": "Increases the likelihood of the model introducing new topics."
        }
      },
      "required": [
        "messages"
      ]
    }
  ]
}
```

**Example Request:**
```javascript
const response = await fetch(
  'https://api.cloudflare.com/client/v4/accounts/{account_id}/ai/run/@cf/qwen/qwen1.5-14b-chat-awq',
  {
    method: 'POST',
    headers: {
      'Authorization': 'Bearer YOUR_API_TOKEN',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      "prompt": "Hello, how are you?"
})
  }
);

const result = await response.json();
console.log(result);
```

**Output Schema:**
```json
{
  "oneOf": [
    {
      "type": "object",
      "properties": {
        "response": {
          "type": "string",
          "description": "The generated text response from the model"
        },
        "usage": {
          "type": "object",
          "description": "Usage statistics for the inference request",
          "properties": {
            "prompt_tokens": {
              "type": "number",
              "description": "Total number of tokens in input",
              "default": 0
            },
            "completion_tokens": {
              "type": "number",
              "description": "Total number of tokens in output",
              "default": 0
            },
            "total_tokens": {
              "type": "number",
              "description": "Total number of input and output tokens",
              "default": 0
            }
          }
        },
        "tool_calls": {
          "type": "array",
          "description": "An array of tool calls requests made during the response generation",
          "items": {
            "type": "object",
            "properties": {
              "arguments": {
                "type": "object",
                "description": "The arguments passed to be passed to the tool call request"
              },
              "name": {
                "type": "string",
                "description": "The name of the tool to be called"
              }
            }
          }
        }
      },
      "required": [
        "response"
      ]
    },
    {
      "type": "string",
      "format": "binary"
    }
  ]
}
```

---

### @cf/openchat/openchat-3.5-0106

**Input Schema:**
```json
{
  "type": "object",
  "oneOf": [
    {
      "title": "Prompt",
      "properties": {
        "prompt": {
          "type": "string",
          "minLength": 1,
          "description": "The input text prompt for the model to generate a response."
        },
        "lora": {
          "type": "string",
          "description": "Name of the LoRA (Low-Rank Adaptation) model to fine-tune the base model."
        },
        "response_format": {
          "title": "JSON Mode",
          "type": "object",
          "properties": {
            "type": {
              "type": "string",
              "enum": [
                "json_object",
                "json_schema"
              ]
            },
            "json_schema": {}
          }
        },
        "raw": {
          "type": "boolean",
          "default": false,
          "description": "If true, a chat template is not applied and you must adhere to the specific model's expected formatting."
        },
        "stream": {
          "type": "boolean",
          "default": false,
          "description": "If true, the response will be streamed back incrementally using SSE, Server Sent Events."
        },
        "max_tokens": {
          "type": "integer",
          "default": 256,
          "description": "The maximum number of tokens to generate in the response."
        },
        "temperature": {
          "type": "number",
          "default": 0.6,
          "minimum": 0,
          "maximum": 5,
          "description": "Controls the randomness of the output; higher values produce more random results."
        },
        "top_p": {
          "type": "number",
          "minimum": 0.001,
          "maximum": 1,
          "description": "Adjusts the creativity of the AI's responses by controlling how many possible words it considers. Lower values make outputs more predictable; higher values allow for more varied and creative responses."
        },
        "top_k": {
          "type": "integer",
          "minimum": 1,
          "maximum": 50,
          "description": "Limits the AI to choose from the top 'k' most probable words. Lower values make responses more focused; higher values introduce more variety and potential surprises."
        },
        "seed": {
          "type": "integer",
          "minimum": 1,
          "maximum": 9999999999,
          "description": "Random seed for reproducibility of the generation."
        },
        "repetition_penalty": {
          "type": "number",
          "minimum": 0,
          "maximum": 2,
          "description": "Penalty for repeated tokens; higher values discourage repetition."
        },
        "frequency_penalty": {
          "type": "number",
          "minimum": -2,
          "maximum": 2,
          "description": "Decreases the likelihood of the model repeating the same lines verbatim."
        },
        "presence_penalty": {
          "type": "number",
          "minimum": -2,
          "maximum": 2,
          "description": "Increases the likelihood of the model introducing new topics."
        }
      },
      "required": [
        "prompt"
      ]
    },
    {
      "title": "Messages",
      "properties": {
        "messages": {
          "type": "array",
          "description": "An array of message objects representing the conversation history.",
          "items": {
            "type": "object",
            "properties": {
              "role": {
                "type": "string",
                "description": "The role of the message sender (e.g., 'user', 'assistant', 'system', 'tool')."
              },
              "content": {
                "type": "string",
                "description": "The content of the message as a string."
              }
            },
            "required": [
              "role",
              "content"
            ]
          }
        },
        "functions": {
          "type": "array",
          "items": {
            "type": "object",
            "properties": {
              "name": {
                "type": "string"
              },
              "code": {
                "type": "string"
              }
            },
            "required": [
              "name",
              "code"
            ]
          }
        },
        "tools": {
          "type": "array",
          "description": "A list of tools available for the assistant to use.",
          "items": {
            "type": "object",
            "oneOf": [
              {
                "properties": {
                  "name": {
                    "type": "string",
                    "description": "The name of the tool. More descriptive the better."
                  },
                  "description": {
                    "type": "string",
                    "description": "A brief description of what the tool does."
                  },
                  "parameters": {
                    "type": "object",
                    "description": "Schema defining the parameters accepted by the tool.",
                    "properties": {
                      "type": {
                        "type": "string",
                        "description": "The type of the parameters object (usually 'object')."
                      },
                      "required": {
                        "type": "array",
                        "description": "List of required parameter names.",
                        "items": {
                          "type": "string"
                        }
                      },
                      "properties": {
                        "type": "object",
                        "description": "Definitions of each parameter.",
                        "additionalProperties": {
                          "type": "object",
                          "properties": {
                            "type": {
                              "type": "string",
                              "description": "The data type of the parameter."
                            },
                            "description": {
                              "type": "string",
                              "description": "A description of the expected parameter."
                            }
                          },
                          "required": [
                            "type",
                            "description"
                          ]
                        }
                      }
                    },
                    "required": [
                      "type",
                      "properties"
                    ]
                  }
                },
                "required": [
                  "name",
                  "description",
                  "parameters"
                ]
              },
              {
                "properties": {
                  "type": {
                    "type": "string",
                    "description": "Specifies the type of tool (e.g., 'function')."
                  },
                  "function": {
                    "type": "object",
                    "description": "Details of the function tool.",
                    "properties": {
                      "name": {
                        "type": "string",
                        "description": "The name of the function."
                      },
                      "description": {
                        "type": "string",
                        "description": "A brief description of what the function does."
                      },
                      "parameters": {
                        "type": "object",
                        "description": "Schema defining the parameters accepted by the function.",
                        "properties": {
                          "type": {
                            "type": "string",
                            "description": "The type of the parameters object (usually 'object')."
                          },
                          "required": {
                            "type": "array",
                            "description": "List of required parameter names.",
                            "items": {
                              "type": "string"
                            }
                          },
                          "properties": {
                            "type": "object",
                            "description": "Definitions of each parameter.",
                            "additionalProperties": {
                              "type": "object",
                              "properties": {
                                "type": {
                                  "type": "string",
                                  "description": "The data type of the parameter."
                                },
                                "description": {
                                  "type": "string",
                                  "description": "A description of the expected parameter."
                                }
                              },
                              "required": [
                                "type",
                                "description"
                              ]
                            }
                          }
                        },
                        "required": [
                          "type",
                          "properties"
                        ]
                      }
                    },
                    "required": [
                      "name",
                      "description",
                      "parameters"
                    ]
                  }
                },
                "required": [
                  "type",
                  "function"
                ]
              }
            ]
          }
        },
        "response_format": {
          "title": "JSON Mode",
          "type": "object",
          "properties": {
            "type": {
              "type": "string",
              "enum": [
                "json_object",
                "json_schema"
              ]
            },
            "json_schema": {}
          }
        },
        "raw": {
          "type": "boolean",
          "default": false,
          "description": "If true, a chat template is not applied and you must adhere to the specific model's expected formatting."
        },
        "stream": {
          "type": "boolean",
          "default": false,
          "description": "If true, the response will be streamed back incrementally using SSE, Server Sent Events."
        },
        "max_tokens": {
          "type": "integer",
          "default": 256,
          "description": "The maximum number of tokens to generate in the response."
        },
        "temperature": {
          "type": "number",
          "default": 0.6,
          "minimum": 0,
          "maximum": 5,
          "description": "Controls the randomness of the output; higher values produce more random results."
        },
        "top_p": {
          "type": "number",
          "minimum": 0.001,
          "maximum": 1,
          "description": "Adjusts the creativity of the AI's responses by controlling how many possible words it considers. Lower values make outputs more predictable; higher values allow for more varied and creative responses."
        },
        "top_k": {
          "type": "integer",
          "minimum": 1,
          "maximum": 50,
          "description": "Limits the AI to choose from the top 'k' most probable words. Lower values make responses more focused; higher values introduce more variety and potential surprises."
        },
        "seed": {
          "type": "integer",
          "minimum": 1,
          "maximum": 9999999999,
          "description": "Random seed for reproducibility of the generation."
        },
        "repetition_penalty": {
          "type": "number",
          "minimum": 0,
          "maximum": 2,
          "description": "Penalty for repeated tokens; higher values discourage repetition."
        },
        "frequency_penalty": {
          "type": "number",
          "minimum": -2,
          "maximum": 2,
          "description": "Decreases the likelihood of the model repeating the same lines verbatim."
        },
        "presence_penalty": {
          "type": "number",
          "minimum": -2,
          "maximum": 2,
          "description": "Increases the likelihood of the model introducing new topics."
        }
      },
      "required": [
        "messages"
      ]
    }
  ]
}
```

**Example Request:**
```javascript
const response = await fetch(
  'https://api.cloudflare.com/client/v4/accounts/{account_id}/ai/run/@cf/openchat/openchat-3.5-0106',
  {
    method: 'POST',
    headers: {
      'Authorization': 'Bearer YOUR_API_TOKEN',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      "prompt": "Hello, how are you?"
})
  }
);

const result = await response.json();
console.log(result);
```

**Output Schema:**
```json
{
  "oneOf": [
    {
      "type": "object",
      "properties": {
        "response": {
          "type": "string",
          "description": "The generated text response from the model"
        },
        "usage": {
          "type": "object",
          "description": "Usage statistics for the inference request",
          "properties": {
            "prompt_tokens": {
              "type": "number",
              "description": "Total number of tokens in input",
              "default": 0
            },
            "completion_tokens": {
              "type": "number",
              "description": "Total number of tokens in output",
              "default": 0
            },
            "total_tokens": {
              "type": "number",
              "description": "Total number of input and output tokens",
              "default": 0
            }
          }
        },
        "tool_calls": {
          "type": "array",
          "description": "An array of tool calls requests made during the response generation",
          "items": {
            "type": "object",
            "properties": {
              "arguments": {
                "type": "object",
                "description": "The arguments passed to be passed to the tool call request"
              },
              "name": {
                "type": "string",
                "description": "The name of the tool to be called"
              }
            }
          }
        }
      },
      "required": [
        "response"
      ]
    },
    {
      "type": "string",
      "format": "binary"
    }
  ]
}
```

---

### @cf/meta/llama-4-scout-17b-16e-instruct

**Input Schema:**
```json
{
  "type": "object",
  "oneOf": [
    {
      "title": "Prompt",
      "properties": {
        "prompt": {
          "type": "string",
          "minLength": 1,
          "description": "The input text prompt for the model to generate a response."
        },
        "guided_json": {
          "type": "object",
          "description": "JSON schema that should be fulfilled for the response."
        },
        "response_format": {
          "title": "JSON Mode",
          "type": "object",
          "properties": {
            "type": {
              "type": "string",
              "enum": [
                "json_object",
                "json_schema"
              ]
            },
            "json_schema": {}
          }
        },
        "raw": {
          "type": "boolean",
          "default": false,
          "description": "If true, a chat template is not applied and you must adhere to the specific model's expected formatting."
        },
        "stream": {
          "type": "boolean",
          "default": false,
          "description": "If true, the response will be streamed back incrementally using SSE, Server Sent Events."
        },
        "max_tokens": {
          "type": "integer",
          "default": 256,
          "description": "The maximum number of tokens to generate in the response."
        },
        "temperature": {
          "type": "number",
          "default": 0.15,
          "minimum": 0,
          "maximum": 5,
          "description": "Controls the randomness of the output; higher values produce more random results."
        },
        "top_p": {
          "type": "number",
          "minimum": 0,
          "maximum": 2,
          "description": "Adjusts the creativity of the AI's responses by controlling how many possible words it considers. Lower values make outputs more predictable; higher values allow for more varied and creative responses."
        },
        "top_k": {
          "type": "integer",
          "minimum": 1,
          "maximum": 50,
          "description": "Limits the AI to choose from the top 'k' most probable words. Lower values make responses more focused; higher values introduce more variety and potential surprises."
        },
        "seed": {
          "type": "integer",
          "minimum": 1,
          "maximum": 9999999999,
          "description": "Random seed for reproducibility of the generation."
        },
        "repetition_penalty": {
          "type": "number",
          "minimum": 0,
          "maximum": 2,
          "description": "Penalty for repeated tokens; higher values discourage repetition."
        },
        "frequency_penalty": {
          "type": "number",
          "minimum": 0,
          "maximum": 2,
          "description": "Decreases the likelihood of the model repeating the same lines verbatim."
        },
        "presence_penalty": {
          "type": "number",
          "minimum": 0,
          "maximum": 2,
          "description": "Increases the likelihood of the model introducing new topics."
        }
      },
      "required": [
        "prompt"
      ]
    },
    {
      "title": "Messages",
      "properties": {
        "messages": {
          "type": "array",
          "description": "An array of message objects representing the conversation history.",
          "items": {
            "type": "object",
            "properties": {
              "role": {
                "type": "string",
                "description": "The role of the message sender (e.g., 'user', 'assistant', 'system', 'tool')."
              },
              "tool_call_id": {
                "type": "string",
                "description": "The tool call id. If you don't know what to put here you can fall back to 000000001",
                "pattern": "[a-zA-Z0-9]{9}"
              },
              "content": {
                "oneOf": [
                  {
                    "type": "string",
                    "description": "The content of the message as a string."
                  },
                  {
                    "type": "array",
                    "items": {
                      "type": "object",
                      "properties": {
                        "type": {
                          "type": "string",
                          "description": "Type of the content provided"
                        },
                        "text": {
                          "type": "string"
                        },
                        "image_url": {
                          "type": "object",
                          "properties": {
                            "url": {
                              "type": "string",
                              "pattern": "^data:*",
                              "description": "image uri with data (e.g. data:image/jpeg;base64,/9j/...). HTTP URL will not be accepted"
                            }
                          }
                        }
                      }
                    }
                  },
                  {
                    "type": "object",
                    "properties": {
                      "type": {
                        "type": "string",
                        "description": "Type of the content provided"
                      },
                      "text": {
                        "type": "string"
                      },
                      "image_url": {
                        "type": "object",
                        "properties": {
                          "url": {
                            "type": "string",
                            "pattern": "^data:*",
                            "description": "image uri with data (e.g. data:image/jpeg;base64,/9j/...). HTTP URL will not be accepted"
                          }
                        }
                      }
                    }
                  }
                ]
              }
            }
          }
        },
        "functions": {
          "type": "array",
          "items": {
            "type": "object",
            "properties": {
              "name": {
                "type": "string"
              },
              "code": {
                "type": "string"
              }
            },
            "required": [
              "name",
              "code"
            ]
          }
        },
        "tools": {
          "type": "array",
          "description": "A list of tools available for the assistant to use.",
          "items": {
            "type": "object",
            "oneOf": [
              {
                "properties": {
                  "name": {
                    "type": "string",
                    "description": "The name of the tool. More descriptive the better."
                  },
                  "description": {
                    "type": "string",
                    "description": "A brief description of what the tool does."
                  },
                  "parameters": {
                    "type": "object",
                    "description": "Schema defining the parameters accepted by the tool.",
                    "properties": {
                      "type": {
                        "type": "string",
                        "description": "The type of the parameters object (usually 'object')."
                      },
                      "required": {
                        "type": "array",
                        "description": "List of required parameter names.",
                        "items": {
                          "type": "string"
                        }
                      },
                      "properties": {
                        "type": "object",
                        "description": "Definitions of each parameter.",
                        "additionalProperties": {
                          "type": "object",
                          "properties": {
                            "type": {
                              "type": "string",
                              "description": "The data type of the parameter."
                            },
                            "description": {
                              "type": "string",
                              "description": "A description of the expected parameter."
                            }
                          },
                          "required": [
                            "type",
                            "description"
                          ]
                        }
                      }
                    },
                    "required": [
                      "type",
                      "properties"
                    ]
                  }
                },
                "required": [
                  "name",
                  "description",
                  "parameters"
                ]
              },
              {
                "properties": {
                  "type": {
                    "type": "string",
                    "description": "Specifies the type of tool (e.g., 'function')."
                  },
                  "function": {
                    "type": "object",
                    "description": "Details of the function tool.",
                    "properties": {
                      "name": {
                        "type": "string",
                        "description": "The name of the function."
                      },
                      "description": {
                        "type": "string",
                        "description": "A brief description of what the function does."
                      },
                      "parameters": {
                        "type": "object",
                        "description": "Schema defining the parameters accepted by the function.",
                        "properties": {
                          "type": {
                            "type": "string",
                            "description": "The type of the parameters object (usually 'object')."
                          },
                          "required": {
                            "type": "array",
                            "description": "List of required parameter names.",
                            "items": {
                              "type": "string"
                            }
                          },
                          "properties": {
                            "type": "object",
                            "description": "Definitions of each parameter.",
                            "additionalProperties": {
                              "type": "object",
                              "properties": {
                                "type": {
                                  "type": "string",
                                  "description": "The data type of the parameter."
                                },
                                "description": {
                                  "type": "string",
                                  "description": "A description of the expected parameter."
                                }
                              },
                              "required": [
                                "type",
                                "description"
                              ]
                            }
                          }
                        },
                        "required": [
                          "type",
                          "properties"
                        ]
                      }
                    },
                    "required": [
                      "name",
                      "description",
                      "parameters"
                    ]
                  }
                },
                "required": [
                  "type",
                  "function"
                ]
              }
            ]
          }
        },
        "response_format": {
          "title": "JSON Mode",
          "type": "object",
          "properties": {
            "type": {
              "type": "string",
              "enum": [
                "json_object",
                "json_schema"
              ]
            },
            "json_schema": {}
          }
        },
        "guided_json": {
          "type": "object",
          "description": "JSON schema that should be fufilled for the response."
        },
        "raw": {
          "type": "boolean",
          "default": false,
          "description": "If true, a chat template is not applied and you must adhere to the specific model's expected formatting."
        },
        "stream": {
          "type": "boolean",
          "default": false,
          "description": "If true, the response will be streamed back incrementally using SSE, Server Sent Events."
        },
        "max_tokens": {
          "type": "integer",
          "default": 256,
          "description": "The maximum number of tokens to generate in the response."
        },
        "temperature": {
          "type": "number",
          "default": 0.15,
          "minimum": 0,
          "maximum": 5,
          "description": "Controls the randomness of the output; higher values produce more random results."
        },
        "top_p": {
          "type": "number",
          "minimum": 0,
          "maximum": 2,
          "description": "Adjusts the creativity of the AI's responses by controlling how many possible words it considers. Lower values make outputs more predictable; higher values allow for more varied and creative responses."
        },
        "top_k": {
          "type": "integer",
          "minimum": 1,
          "maximum": 50,
          "description": "Limits the AI to choose from the top 'k' most probable words. Lower values make responses more focused; higher values introduce more variety and potential surprises."
        },
        "seed": {
          "type": "integer",
          "minimum": 1,
          "maximum": 9999999999,
          "description": "Random seed for reproducibility of the generation."
        },
        "repetition_penalty": {
          "type": "number",
          "minimum": 0,
          "maximum": 2,
          "description": "Penalty for repeated tokens; higher values discourage repetition."
        },
        "frequency_penalty": {
          "type": "number",
          "minimum": 0,
          "maximum": 2,
          "description": "Decreases the likelihood of the model repeating the same lines verbatim."
        },
        "presence_penalty": {
          "type": "number",
          "minimum": 0,
          "maximum": 2,
          "description": "Increases the likelihood of the model introducing new topics."
        }
      },
      "required": [
        "messages"
      ]
    },
    {
      "title": "Async_Batch",
      "type": "object",
      "properties": {
        "requests": {
          "type": "array",
          "items": {
            "type": "object",
            "oneOf": [
              {
                "title": "Prompt_Inner",
                "properties": {
                  "prompt": {
                    "type": "string",
                    "minLength": 1,
                    "description": "The input text prompt for the model to generate a response."
                  },
                  "guided_json": {
                    "type": "object",
                    "description": "JSON schema that should be fulfilled for the response."
                  },
                  "response_format": {
                    "title": "JSON Mode",
                    "type": "object",
                    "properties": {
                      "type": {
                        "type": "string",
                        "enum": [
                          "json_object",
                          "json_schema"
                        ]
                      },
                      "json_schema": {}
                    }
                  },
                  "raw": {
                    "type": "boolean",
                    "default": false,
                    "description": "If true, a chat template is not applied and you must adhere to the specific model's expected formatting."
                  },
                  "stream": {
                    "type": "boolean",
                    "default": false,
                    "description": "If true, the response will be streamed back incrementally using SSE, Server Sent Events."
                  },
                  "max_tokens": {
                    "type": "integer",
                    "default": 256,
                    "description": "The maximum number of tokens to generate in the response."
                  },
                  "temperature": {
                    "type": "number",
                    "default": 0.15,
                    "minimum": 0,
                    "maximum": 5,
                    "description": "Controls the randomness of the output; higher values produce more random results."
                  },
                  "top_p": {
                    "type": "number",
                    "minimum": 0,
                    "maximum": 2,
                    "description": "Adjusts the creativity of the AI's responses by controlling how many possible words it considers. Lower values make outputs more predictable; higher values allow for more varied and creative responses."
                  },
                  "top_k": {
                    "type": "integer",
                    "minimum": 1,
                    "maximum": 50,
                    "description": "Limits the AI to choose from the top 'k' most probable words. Lower values make responses more focused; higher values introduce more variety and potential surprises."
                  },
                  "seed": {
                    "type": "integer",
                    "minimum": 1,
                    "maximum": 9999999999,
                    "description": "Random seed for reproducibility of the generation."
                  },
                  "repetition_penalty": {
                    "type": "number",
                    "minimum": 0,
                    "maximum": 2,
                    "description": "Penalty for repeated tokens; higher values discourage repetition."
                  },
                  "frequency_penalty": {
                    "type": "number",
                    "minimum": 0,
                    "maximum": 2,
                    "description": "Decreases the likelihood of the model repeating the same lines verbatim."
                  },
                  "presence_penalty": {
                    "type": "number",
                    "minimum": 0,
                    "maximum": 2,
                    "description": "Increases the likelihood of the model introducing new topics."
                  }
                },
                "required": [
                  "prompt"
                ]
              },
              {
                "title": "Messages_Inner",
                "properties": {
                  "messages": {
                    "type": "array",
                    "description": "An array of message objects representing the conversation history.",
                    "items": {
                      "type": "object",
                      "properties": {
                        "role": {
                          "type": "string",
                          "description": "The role of the message sender (e.g., 'user', 'assistant', 'system', 'tool')."
                        },
                        "tool_call_id": {
                          "type": "string",
                          "description": "The tool call id. If you don't know what to put here you can fall back to 000000001",
                          "pattern": "[a-zA-Z0-9]{9}"
                        },
                        "content": {
                          "oneOf": [
                            {
                              "type": "string",
                              "description": "The content of the message as a string."
                            },
                            {
                              "type": "array",
                              "items": {
                                "type": "object",
                                "properties": {
                                  "type": {
                                    "type": "string",
                                    "description": "Type of the content provided"
                                  },
                                  "text": {
                                    "type": "string"
                                  },
                                  "image_url": {
                                    "type": "object",
                                    "properties": {
                                      "url": {
                                        "type": "string",
                                        "pattern": "^data:*",
                                        "description": "image uri with data (e.g. data:image/jpeg;base64,/9j/...). HTTP URL will not be accepted"
                                      }
                                    }
                                  }
                                }
                              }
                            },
                            {
                              "type": "object",
                              "properties": {
                                "type": {
                                  "type": "string",
                                  "description": "Type of the content provided"
                                },
                                "text": {
                                  "type": "string"
                                },
                                "image_url": {
                                  "type": "object",
                                  "properties": {
                                    "url": {
                                      "type": "string",
                                      "pattern": "^data:*",
                                      "description": "image uri with data (e.g. data:image/jpeg;base64,/9j/...). HTTP URL will not be accepted"
                                    }
                                  }
                                }
                              }
                            }
                          ]
                        }
                      }
                    }
                  },
                  "functions": {
                    "type": "array",
                    "items": {
                      "type": "object",
                      "properties": {
                        "name": {
                          "type": "string"
                        },
                        "code": {
                          "type": "string"
                        }
                      },
                      "required": [
                        "name",
                        "code"
                      ]
                    }
                  },
                  "tools": {
                    "type": "array",
                    "description": "A list of tools available for the assistant to use.",
                    "items": {
                      "type": "object",
                      "oneOf": [
                        {
                          "properties": {
                            "name": {
                              "type": "string",
                              "description": "The name of the tool. More descriptive the better."
                            },
                            "description": {
                              "type": "string",
                              "description": "A brief description of what the tool does."
                            },
                            "parameters": {
                              "type": "object",
                              "description": "Schema defining the parameters accepted by the tool.",
                              "properties": {
                                "type": {
                                  "type": "string",
                                  "description": "The type of the parameters object (usually 'object')."
                                },
                                "required": {
                                  "type": "array",
                                  "description": "List of required parameter names.",
                                  "items": {
                                    "type": "string"
                                  }
                                },
                                "properties": {
                                  "type": "object",
                                  "description": "Definitions of each parameter.",
                                  "additionalProperties": {
                                    "type": "object",
                                    "properties": {
                                      "type": {
                                        "type": "string",
                                        "description": "The data type of the parameter."
                                      },
                                      "description": {
                                        "type": "string",
                                        "description": "A description of the expected parameter."
                                      }
                                    },
                                    "required": [
                                      "type",
                                      "description"
                                    ]
                                  }
                                }
                              },
                              "required": [
                                "type",
                                "properties"
                              ]
                            }
                          },
                          "required": [
                            "name",
                            "description",
                            "parameters"
                          ]
                        },
                        {
                          "properties": {
                            "type": {
                              "type": "string",
                              "description": "Specifies the type of tool (e.g., 'function')."
                            },
                            "function": {
                              "type": "object",
                              "description": "Details of the function tool.",
                              "properties": {
                                "name": {
                                  "type": "string",
                                  "description": "The name of the function."
                                },
                                "description": {
                                  "type": "string",
                                  "description": "A brief description of what the function does."
                                },
                                "parameters": {
                                  "type": "object",
                                  "description": "Schema defining the parameters accepted by the function.",
                                  "properties": {
                                    "type": {
                                      "type": "string",
                                      "description": "The type of the parameters object (usually 'object')."
                                    },
                                    "required": {
                                      "type": "array",
                                      "description": "List of required parameter names.",
                                      "items": {
                                        "type": "string"
                                      }
                                    },
                                    "properties": {
                                      "type": "object",
                                      "description": "Definitions of each parameter.",
                                      "additionalProperties": {
                                        "type": "object",
                                        "properties": {
                                          "type": {
                                            "type": "string",
                                            "description": "The data type of the parameter."
                                          },
                                          "description": {
                                            "type": "string",
                                            "description": "A description of the expected parameter."
                                          }
                                        },
                                        "required": [
                                          "type",
                                          "description"
                                        ]
                                      }
                                    }
                                  },
                                  "required": [
                                    "type",
                                    "properties"
                                  ]
                                }
                              },
                              "required": [
                                "name",
                                "description",
                                "parameters"
                              ]
                            }
                          },
                          "required": [
                            "type",
                            "function"
                          ]
                        }
                      ]
                    }
                  },
                  "response_format": {
                    "title": "JSON Mode",
                    "type": "object",
                    "properties": {
                      "type": {
                        "type": "string",
                        "enum": [
                          "json_object",
                          "json_schema"
                        ]
                      },
                      "json_schema": {}
                    }
                  },
                  "guided_json": {
                    "type": "object",
                    "description": "JSON schema that should be fufilled for the response."
                  },
                  "raw": {
                    "type": "boolean",
                    "default": false,
                    "description": "If true, a chat template is not applied and you must adhere to the specific model's expected formatting."
                  },
                  "stream": {
                    "type": "boolean",
                    "default": false,
                    "description": "If true, the response will be streamed back incrementally using SSE, Server Sent Events."
                  },
                  "max_tokens": {
                    "type": "integer",
                    "default": 256,
                    "description": "The maximum number of tokens to generate in the response."
                  },
                  "temperature": {
                    "type": "number",
                    "default": 0.15,
                    "minimum": 0,
                    "maximum": 5,
                    "description": "Controls the randomness of the output; higher values produce more random results."
                  },
                  "top_p": {
                    "type": "number",
                    "minimum": 0,
                    "maximum": 2,
                    "description": "Adjusts the creativity of the AI's responses by controlling how many possible words it considers. Lower values make outputs more predictable; higher values allow for more varied and creative responses."
                  },
                  "top_k": {
                    "type": "integer",
                    "minimum": 1,
                    "maximum": 50,
                    "description": "Limits the AI to choose from the top 'k' most probable words. Lower values make responses more focused; higher values introduce more variety and potential surprises."
                  },
                  "seed": {
                    "type": "integer",
                    "minimum": 1,
                    "maximum": 9999999999,
                    "description": "Random seed for reproducibility of the generation."
                  },
                  "repetition_penalty": {
                    "type": "number",
                    "minimum": 0,
                    "maximum": 2,
                    "description": "Penalty for repeated tokens; higher values discourage repetition."
                  },
                  "frequency_penalty": {
                    "type": "number",
                    "minimum": 0,
                    "maximum": 2,
                    "description": "Decreases the likelihood of the model repeating the same lines verbatim."
                  },
                  "presence_penalty": {
                    "type": "number",
                    "minimum": 0,
                    "maximum": 2,
                    "description": "Increases the likelihood of the model introducing new topics."
                  }
                },
                "required": [
                  "messages"
                ]
              }
            ]
          }
        }
      },
      "required": [
        "requests"
      ]
    }
  ]
}
```

**Example Request:**
```javascript
const response = await fetch(
  'https://api.cloudflare.com/client/v4/accounts/{account_id}/ai/run/@cf/meta/llama-4-scout-17b-16e-instruct',
  {
    method: 'POST',
    headers: {
      'Authorization': 'Bearer YOUR_API_TOKEN',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      "prompt": "Hello, how are you?"
})
  }
);

const result = await response.json();
console.log(result);
```

**Output Schema:**
```json
{
  "oneOf": [
    {
      "type": "object",
      "contentType": "application/json",
      "properties": {
        "response": {
          "type": "string",
          "description": "The generated text response from the model"
        },
        "usage": {
          "type": "object",
          "description": "Usage statistics for the inference request",
          "properties": {
            "prompt_tokens": {
              "type": "number",
              "description": "Total number of tokens in input",
              "default": 0
            },
            "completion_tokens": {
              "type": "number",
              "description": "Total number of tokens in output",
              "default": 0
            },
            "total_tokens": {
              "type": "number",
              "description": "Total number of input and output tokens",
              "default": 0
            }
          }
        },
        "tool_calls": {
          "type": "array",
          "description": "An array of tool calls requests made during the response generation",
          "items": {
            "type": "object",
            "properties": {
              "id": {
                "type": "string",
                "description": "The tool call id."
              },
              "type": {
                "type": "string",
                "description": "Specifies the type of tool (e.g., 'function')."
              },
              "function": {
                "type": "object",
                "description": "Details of the function tool.",
                "properties": {
                  "name": {
                    "type": "string",
                    "description": "The name of the tool to be called"
                  },
                  "arguments": {
                    "type": "object",
                    "description": "The arguments passed to be passed to the tool call request"
                  }
                }
              }
            }
          }
        }
      },
      "required": [
        "response"
      ]
    },
    {
      "type": "string",
      "contentType": "text/event-stream",
      "format": "binary"
    }
  ]
}
```

---

### @cf/google/gemma-3-12b-it

**Input Schema:**
```json
{
  "type": "object",
  "oneOf": [
    {
      "title": "Prompt",
      "properties": {
        "prompt": {
          "type": "string",
          "minLength": 1,
          "description": "The input text prompt for the model to generate a response."
        },
        "guided_json": {
          "type": "object",
          "description": "JSON schema that should be fufilled for the response."
        },
        "raw": {
          "type": "boolean",
          "default": false,
          "description": "If true, a chat template is not applied and you must adhere to the specific model's expected formatting."
        },
        "stream": {
          "type": "boolean",
          "default": false,
          "description": "If true, the response will be streamed back incrementally using SSE, Server Sent Events."
        },
        "max_tokens": {
          "type": "integer",
          "default": 256,
          "description": "The maximum number of tokens to generate in the response."
        },
        "temperature": {
          "type": "number",
          "default": 0.6,
          "minimum": 0,
          "maximum": 5,
          "description": "Controls the randomness of the output; higher values produce more random results."
        },
        "top_p": {
          "type": "number",
          "minimum": 0,
          "maximum": 2,
          "description": "Adjusts the creativity of the AI's responses by controlling how many possible words it considers. Lower values make outputs more predictable; higher values allow for more varied and creative responses."
        },
        "top_k": {
          "type": "integer",
          "minimum": 1,
          "maximum": 50,
          "description": "Limits the AI to choose from the top 'k' most probable words. Lower values make responses more focused; higher values introduce more variety and potential surprises."
        },
        "seed": {
          "type": "integer",
          "minimum": 1,
          "maximum": 9999999999,
          "description": "Random seed for reproducibility of the generation."
        },
        "repetition_penalty": {
          "type": "number",
          "minimum": 0,
          "maximum": 2,
          "description": "Penalty for repeated tokens; higher values discourage repetition."
        },
        "frequency_penalty": {
          "type": "number",
          "minimum": 0,
          "maximum": 2,
          "description": "Decreases the likelihood of the model repeating the same lines verbatim."
        },
        "presence_penalty": {
          "type": "number",
          "minimum": 0,
          "maximum": 2,
          "description": "Increases the likelihood of the model introducing new topics."
        }
      },
      "required": [
        "prompt"
      ]
    },
    {
      "title": "Messages",
      "properties": {
        "messages": {
          "type": "array",
          "description": "An array of message objects representing the conversation history.",
          "items": {
            "type": "object",
            "properties": {
              "role": {
                "type": "string",
                "description": "The role of the message sender (e.g., 'user', 'assistant', 'system', 'tool')."
              },
              "content": {
                "oneOf": [
                  {
                    "type": "string",
                    "description": "The content of the message as a string."
                  },
                  {
                    "type": "array",
                    "items": {
                      "type": "object",
                      "properties": {
                        "type": {
                          "type": "string",
                          "description": "Type of the content provided"
                        },
                        "text": {
                          "type": "string"
                        },
                        "image_url": {
                          "type": "object",
                          "properties": {
                            "url": {
                              "type": "string",
                              "pattern": "^data:*",
                              "description": "image uri with data (e.g. data:image/jpeg;base64,/9j/...). HTTP URL will not be accepted"
                            }
                          }
                        }
                      }
                    }
                  }
                ]
              }
            }
          }
        },
        "functions": {
          "type": "array",
          "items": {
            "type": "object",
            "properties": {
              "name": {
                "type": "string"
              },
              "code": {
                "type": "string"
              }
            },
            "required": [
              "name",
              "code"
            ]
          }
        },
        "tools": {
          "type": "array",
          "description": "A list of tools available for the assistant to use.",
          "items": {
            "type": "object",
            "oneOf": [
              {
                "properties": {
                  "name": {
                    "type": "string",
                    "description": "The name of the tool. More descriptive the better."
                  },
                  "description": {
                    "type": "string",
                    "description": "A brief description of what the tool does."
                  },
                  "parameters": {
                    "type": "object",
                    "description": "Schema defining the parameters accepted by the tool.",
                    "properties": {
                      "type": {
                        "type": "string",
                        "description": "The type of the parameters object (usually 'object')."
                      },
                      "required": {
                        "type": "array",
                        "description": "List of required parameter names.",
                        "items": {
                          "type": "string"
                        }
                      },
                      "properties": {
                        "type": "object",
                        "description": "Definitions of each parameter.",
                        "additionalProperties": {
                          "type": "object",
                          "properties": {
                            "type": {
                              "type": "string",
                              "description": "The data type of the parameter."
                            },
                            "description": {
                              "type": "string",
                              "description": "A description of the expected parameter."
                            }
                          },
                          "required": [
                            "type",
                            "description"
                          ]
                        }
                      }
                    },
                    "required": [
                      "type",
                      "properties"
                    ]
                  }
                },
                "required": [
                  "name",
                  "description",
                  "parameters"
                ]
              },
              {
                "properties": {
                  "type": {
                    "type": "string",
                    "description": "Specifies the type of tool (e.g., 'function')."
                  },
                  "function": {
                    "type": "object",
                    "description": "Details of the function tool.",
                    "properties": {
                      "name": {
                        "type": "string",
                        "description": "The name of the function."
                      },
                      "description": {
                        "type": "string",
                        "description": "A brief description of what the function does."
                      },
                      "parameters": {
                        "type": "object",
                        "description": "Schema defining the parameters accepted by the function.",
                        "properties": {
                          "type": {
                            "type": "string",
                            "description": "The type of the parameters object (usually 'object')."
                          },
                          "required": {
                            "type": "array",
                            "description": "List of required parameter names.",
                            "items": {
                              "type": "string"
                            }
                          },
                          "properties": {
                            "type": "object",
                            "description": "Definitions of each parameter.",
                            "additionalProperties": {
                              "type": "object",
                              "properties": {
                                "type": {
                                  "type": "string",
                                  "description": "The data type of the parameter."
                                },
                                "description": {
                                  "type": "string",
                                  "description": "A description of the expected parameter."
                                }
                              },
                              "required": [
                                "type",
                                "description"
                              ]
                            }
                          }
                        },
                        "required": [
                          "type",
                          "properties"
                        ]
                      }
                    },
                    "required": [
                      "name",
                      "description",
                      "parameters"
                    ]
                  }
                },
                "required": [
                  "type",
                  "function"
                ]
              }
            ]
          }
        },
        "guided_json": {
          "type": "object",
          "description": "JSON schema that should be fufilled for the response."
        },
        "raw": {
          "type": "boolean",
          "default": false,
          "description": "If true, a chat template is not applied and you must adhere to the specific model's expected formatting."
        },
        "stream": {
          "type": "boolean",
          "default": false,
          "description": "If true, the response will be streamed back incrementally using SSE, Server Sent Events."
        },
        "max_tokens": {
          "type": "integer",
          "default": 256,
          "description": "The maximum number of tokens to generate in the response."
        },
        "temperature": {
          "type": "number",
          "default": 0.6,
          "minimum": 0,
          "maximum": 5,
          "description": "Controls the randomness of the output; higher values produce more random results."
        },
        "top_p": {
          "type": "number",
          "minimum": 0,
          "maximum": 2,
          "description": "Adjusts the creativity of the AI's responses by controlling how many possible words it considers. Lower values make outputs more predictable; higher values allow for more varied and creative responses."
        },
        "top_k": {
          "type": "integer",
          "minimum": 1,
          "maximum": 50,
          "description": "Limits the AI to choose from the top 'k' most probable words. Lower values make responses more focused; higher values introduce more variety and potential surprises."
        },
        "seed": {
          "type": "integer",
          "minimum": 1,
          "maximum": 9999999999,
          "description": "Random seed for reproducibility of the generation."
        },
        "repetition_penalty": {
          "type": "number",
          "minimum": 0,
          "maximum": 2,
          "description": "Penalty for repeated tokens; higher values discourage repetition."
        },
        "frequency_penalty": {
          "type": "number",
          "minimum": 0,
          "maximum": 2,
          "description": "Decreases the likelihood of the model repeating the same lines verbatim."
        },
        "presence_penalty": {
          "type": "number",
          "minimum": 0,
          "maximum": 2,
          "description": "Increases the likelihood of the model introducing new topics."
        }
      },
      "required": [
        "messages"
      ]
    }
  ]
}
```

**Example Request:**
```javascript
const response = await fetch(
  'https://api.cloudflare.com/client/v4/accounts/{account_id}/ai/run/@cf/google/gemma-3-12b-it',
  {
    method: 'POST',
    headers: {
      'Authorization': 'Bearer YOUR_API_TOKEN',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      "prompt": "Hello, how are you?"
})
  }
);

const result = await response.json();
console.log(result);
```

**Output Schema:**
```json
{
  "oneOf": [
    {
      "type": "object",
      "contentType": "application/json",
      "properties": {
        "response": {
          "type": "string",
          "description": "The generated text response from the model"
        },
        "usage": {
          "type": "object",
          "description": "Usage statistics for the inference request",
          "properties": {
            "prompt_tokens": {
              "type": "number",
              "description": "Total number of tokens in input",
              "default": 0
            },
            "completion_tokens": {
              "type": "number",
              "description": "Total number of tokens in output",
              "default": 0
            },
            "total_tokens": {
              "type": "number",
              "description": "Total number of input and output tokens",
              "default": 0
            }
          }
        },
        "tool_calls": {
          "type": "array",
          "description": "An array of tool calls requests made during the response generation",
          "items": {
            "type": "object",
            "properties": {
              "arguments": {
                "type": "object",
                "description": "The arguments passed to be passed to the tool call request"
              },
              "name": {
                "type": "string",
                "description": "The name of the tool to be called"
              }
            }
          }
        }
      },
      "required": [
        "response"
      ]
    },
    {
      "type": "string",
      "contentType": "text/event-stream",
      "format": "binary"
    }
  ]
}
```

---

### @cf/qwen/qwq-32b

**Input Schema:**
```json
{
  "type": "object",
  "oneOf": [
    {
      "title": "Prompt",
      "properties": {
        "prompt": {
          "type": "string",
          "minLength": 1,
          "description": "The input text prompt for the model to generate a response."
        },
        "guided_json": {
          "type": "object",
          "description": "JSON schema that should be fulfilled for the response."
        },
        "raw": {
          "type": "boolean",
          "default": false,
          "description": "If true, a chat template is not applied and you must adhere to the specific model's expected formatting."
        },
        "stream": {
          "type": "boolean",
          "default": false,
          "description": "If true, the response will be streamed back incrementally using SSE, Server Sent Events."
        },
        "max_tokens": {
          "type": "integer",
          "default": 256,
          "description": "The maximum number of tokens to generate in the response."
        },
        "temperature": {
          "type": "number",
          "default": 0.15,
          "minimum": 0,
          "maximum": 5,
          "description": "Controls the randomness of the output; higher values produce more random results."
        },
        "top_p": {
          "type": "number",
          "minimum": 0,
          "maximum": 2,
          "description": "Adjusts the creativity of the AI's responses by controlling how many possible words it considers. Lower values make outputs more predictable; higher values allow for more varied and creative responses."
        },
        "top_k": {
          "type": "integer",
          "minimum": 1,
          "maximum": 50,
          "description": "Limits the AI to choose from the top 'k' most probable words. Lower values make responses more focused; higher values introduce more variety and potential surprises."
        },
        "seed": {
          "type": "integer",
          "minimum": 1,
          "maximum": 9999999999,
          "description": "Random seed for reproducibility of the generation."
        },
        "repetition_penalty": {
          "type": "number",
          "minimum": 0,
          "maximum": 2,
          "description": "Penalty for repeated tokens; higher values discourage repetition."
        },
        "frequency_penalty": {
          "type": "number",
          "minimum": 0,
          "maximum": 2,
          "description": "Decreases the likelihood of the model repeating the same lines verbatim."
        },
        "presence_penalty": {
          "type": "number",
          "minimum": 0,
          "maximum": 2,
          "description": "Increases the likelihood of the model introducing new topics."
        }
      },
      "required": [
        "prompt"
      ]
    },
    {
      "title": "Messages",
      "properties": {
        "messages": {
          "type": "array",
          "description": "An array of message objects representing the conversation history.",
          "items": {
            "type": "object",
            "properties": {
              "role": {
                "type": "string",
                "description": "The role of the message sender (e.g., 'user', 'assistant', 'system', 'tool')."
              },
              "tool_call_id": {
                "type": "string",
                "description": "The tool call id. Must be supplied for tool calls for Mistral-3. If you don't know what to put here you can fall back to 000000001",
                "pattern": "[a-zA-Z0-9]{9}"
              },
              "content": {
                "oneOf": [
                  {
                    "type": "string",
                    "description": "The content of the message as a string."
                  },
                  {
                    "type": "array",
                    "items": {
                      "type": "object",
                      "properties": {
                        "type": {
                          "type": "string",
                          "description": "Type of the content provided"
                        },
                        "text": {
                          "type": "string"
                        },
                        "image_url": {
                          "type": "object",
                          "properties": {
                            "url": {
                              "type": "string",
                              "pattern": "^data:*",
                              "description": "image uri with data (e.g. data:image/jpeg;base64,/9j/...). HTTP URL will not be accepted"
                            }
                          }
                        }
                      }
                    }
                  },
                  {
                    "type": "object",
                    "properties": {
                      "type": {
                        "type": "string",
                        "description": "Type of the content provided"
                      },
                      "text": {
                        "type": "string"
                      },
                      "image_url": {
                        "type": "object",
                        "properties": {
                          "url": {
                            "type": "string",
                            "pattern": "^data:*",
                            "description": "image uri with data (e.g. data:image/jpeg;base64,/9j/...). HTTP URL will not be accepted"
                          }
                        }
                      }
                    }
                  }
                ]
              }
            }
          }
        },
        "functions": {
          "type": "array",
          "items": {
            "type": "object",
            "properties": {
              "name": {
                "type": "string"
              },
              "code": {
                "type": "string"
              }
            },
            "required": [
              "name",
              "code"
            ]
          }
        },
        "tools": {
          "type": "array",
          "description": "A list of tools available for the assistant to use.",
          "items": {
            "type": "object",
            "oneOf": [
              {
                "properties": {
                  "name": {
                    "type": "string",
                    "description": "The name of the tool. More descriptive the better."
                  },
                  "description": {
                    "type": "string",
                    "description": "A brief description of what the tool does."
                  },
                  "parameters": {
                    "type": "object",
                    "description": "Schema defining the parameters accepted by the tool.",
                    "properties": {
                      "type": {
                        "type": "string",
                        "description": "The type of the parameters object (usually 'object')."
                      },
                      "required": {
                        "type": "array",
                        "description": "List of required parameter names.",
                        "items": {
                          "type": "string"
                        }
                      },
                      "properties": {
                        "type": "object",
                        "description": "Definitions of each parameter.",
                        "additionalProperties": {
                          "type": "object",
                          "properties": {
                            "type": {
                              "type": "string",
                              "description": "The data type of the parameter."
                            },
                            "description": {
                              "type": "string",
                              "description": "A description of the expected parameter."
                            }
                          },
                          "required": [
                            "type",
                            "description"
                          ]
                        }
                      }
                    },
                    "required": [
                      "type",
                      "properties"
                    ]
                  }
                },
                "required": [
                  "name",
                  "description",
                  "parameters"
                ]
              },
              {
                "properties": {
                  "type": {
                    "type": "string",
                    "description": "Specifies the type of tool (e.g., 'function')."
                  },
                  "function": {
                    "type": "object",
                    "description": "Details of the function tool.",
                    "properties": {
                      "name": {
                        "type": "string",
                        "description": "The name of the function."
                      },
                      "description": {
                        "type": "string",
                        "description": "A brief description of what the function does."
                      },
                      "parameters": {
                        "type": "object",
                        "description": "Schema defining the parameters accepted by the function.",
                        "properties": {
                          "type": {
                            "type": "string",
                            "description": "The type of the parameters object (usually 'object')."
                          },
                          "required": {
                            "type": "array",
                            "description": "List of required parameter names.",
                            "items": {
                              "type": "string"
                            }
                          },
                          "properties": {
                            "type": "object",
                            "description": "Definitions of each parameter.",
                            "additionalProperties": {
                              "type": "object",
                              "properties": {
                                "type": {
                                  "type": "string",
                                  "description": "The data type of the parameter."
                                },
                                "description": {
                                  "type": "string",
                                  "description": "A description of the expected parameter."
                                }
                              },
                              "required": [
                                "type",
                                "description"
                              ]
                            }
                          }
                        },
                        "required": [
                          "type",
                          "properties"
                        ]
                      }
                    },
                    "required": [
                      "name",
                      "description",
                      "parameters"
                    ]
                  }
                },
                "required": [
                  "type",
                  "function"
                ]
              }
            ]
          }
        },
        "guided_json": {
          "type": "object",
          "description": "JSON schema that should be fufilled for the response."
        },
        "raw": {
          "type": "boolean",
          "default": false,
          "description": "If true, a chat template is not applied and you must adhere to the specific model's expected formatting."
        },
        "stream": {
          "type": "boolean",
          "default": false,
          "description": "If true, the response will be streamed back incrementally using SSE, Server Sent Events."
        },
        "max_tokens": {
          "type": "integer",
          "default": 256,
          "description": "The maximum number of tokens to generate in the response."
        },
        "temperature": {
          "type": "number",
          "default": 0.15,
          "minimum": 0,
          "maximum": 5,
          "description": "Controls the randomness of the output; higher values produce more random results."
        },
        "top_p": {
          "type": "number",
          "minimum": 0,
          "maximum": 2,
          "description": "Adjusts the creativity of the AI's responses by controlling how many possible words it considers. Lower values make outputs more predictable; higher values allow for more varied and creative responses."
        },
        "top_k": {
          "type": "integer",
          "minimum": 1,
          "maximum": 50,
          "description": "Limits the AI to choose from the top 'k' most probable words. Lower values make responses more focused; higher values introduce more variety and potential surprises."
        },
        "seed": {
          "type": "integer",
          "minimum": 1,
          "maximum": 9999999999,
          "description": "Random seed for reproducibility of the generation."
        },
        "repetition_penalty": {
          "type": "number",
          "minimum": 0,
          "maximum": 2,
          "description": "Penalty for repeated tokens; higher values discourage repetition."
        },
        "frequency_penalty": {
          "type": "number",
          "minimum": 0,
          "maximum": 2,
          "description": "Decreases the likelihood of the model repeating the same lines verbatim."
        },
        "presence_penalty": {
          "type": "number",
          "minimum": 0,
          "maximum": 2,
          "description": "Increases the likelihood of the model introducing new topics."
        }
      },
      "required": [
        "messages"
      ]
    }
  ]
}
```

**Example Request:**
```javascript
const response = await fetch(
  'https://api.cloudflare.com/client/v4/accounts/{account_id}/ai/run/@cf/qwen/qwq-32b',
  {
    method: 'POST',
    headers: {
      'Authorization': 'Bearer YOUR_API_TOKEN',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      "prompt": "Hello, how are you?"
})
  }
);

const result = await response.json();
console.log(result);
```

**Output Schema:**
```json
{
  "oneOf": [
    {
      "type": "object",
      "contentType": "application/json",
      "properties": {
        "response": {
          "type": "string",
          "description": "The generated text response from the model"
        },
        "usage": {
          "type": "object",
          "description": "Usage statistics for the inference request",
          "properties": {
            "prompt_tokens": {
              "type": "number",
              "description": "Total number of tokens in input",
              "default": 0
            },
            "completion_tokens": {
              "type": "number",
              "description": "Total number of tokens in output",
              "default": 0
            },
            "total_tokens": {
              "type": "number",
              "description": "Total number of input and output tokens",
              "default": 0
            }
          }
        },
        "tool_calls": {
          "type": "array",
          "description": "An array of tool calls requests made during the response generation",
          "items": {
            "type": "object",
            "properties": {
              "arguments": {
                "type": "object",
                "description": "The arguments passed to be passed to the tool call request"
              },
              "name": {
                "type": "string",
                "description": "The name of the tool to be called"
              }
            }
          }
        }
      },
      "required": [
        "response"
      ]
    },
    {
      "type": "string",
      "contentType": "text/event-stream",
      "format": "binary"
    }
  ]
}
```

---

## Text-to-Image

### @cf/black-forest-labs/flux-2-klein-9b

**Input Schema:**
```json
{
  "type": "object",
  "properties": {
    "multipart": {
      "type": "object",
      "properties": {
        "body": {
          "type": "object"
        },
        "contentType": {
          "type": "string"
        }
      }
    }
  },
  "required": [
    "multipart"
  ]
}
```

**Example Request:**
```javascript
const response = await fetch(
  'https://api.cloudflare.com/client/v4/accounts/{account_id}/ai/run/@cf/black-forest-labs/flux-2-klein-9b',
  {
    method: 'POST',
    headers: {
      'Authorization': 'Bearer YOUR_API_TOKEN',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      "multipart": {}
})
  }
);

const result = await response.json();
console.log(result);
```

**Output Schema:**
```json
{
  "type": "object",
  "properties": {
    "image": {
      "type": "string",
      "description": "Generated image as Base64 string."
    }
  }
}
```

---

### @cf/runwayml/stable-diffusion-v1-5-inpainting

**Input Schema:**
```json
{
  "type": "object",
  "properties": {
    "prompt": {
      "type": "string",
      "minLength": 1,
      "description": "A text description of the image you want to generate"
    },
    "negative_prompt": {
      "type": "string",
      "description": "Text describing elements to avoid in the generated image"
    },
    "height": {
      "type": "integer",
      "minimum": 256,
      "maximum": 2048,
      "description": "The height of the generated image in pixels"
    },
    "width": {
      "type": "integer",
      "minimum": 256,
      "maximum": 2048,
      "description": "The width of the generated image in pixels"
    },
    "image": {
      "type": "array",
      "description": "For use with img2img tasks. An array of integers that represent the image data constrained to 8-bit unsigned integer values",
      "items": {
        "type": "number",
        "description": "A value between 0 and 255"
      }
    },
    "image_b64": {
      "type": "string",
      "description": "For use with img2img tasks. A base64-encoded string of the input image"
    },
    "mask": {
      "type": "array",
      "description": "An array representing An array of integers that represent mask image data for inpainting constrained to 8-bit unsigned integer values",
      "items": {
        "type": "number",
        "description": "A value between 0 and 255"
      }
    },
    "num_steps": {
      "type": "integer",
      "default": 20,
      "maximum": 20,
      "description": "The number of diffusion steps; higher values can improve quality but take longer"
    },
    "strength": {
      "type": "number",
      "default": 1,
      "description": "A value between 0 and 1 indicating how strongly to apply the transformation during img2img tasks; lower values make the output closer to the input image"
    },
    "guidance": {
      "type": "number",
      "default": 7.5,
      "description": "Controls how closely the generated image should adhere to the prompt; higher values make the image more aligned with the prompt"
    },
    "seed": {
      "type": "integer",
      "description": "Random seed for reproducibility of the image generation"
    }
  },
  "required": [
    "prompt"
  ]
}
```

**Example Request:**
```javascript
const response = await fetch(
  'https://api.cloudflare.com/client/v4/accounts/{account_id}/ai/run/@cf/runwayml/stable-diffusion-v1-5-inpainting',
  {
    method: 'POST',
    headers: {
      'Authorization': 'Bearer YOUR_API_TOKEN',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      "prompt": "Hello, how are you?",
      "negative_prompt": "example",
      "height": 256,
      "width": 256,
      "image": [],
      "image_b64": "example",
      "mask": [],
      "num_steps": 20,
      "strength": 1,
      "guidance": 7.5,
      "seed": 256
})
  }
);

const result = await response.json();
console.log(result);
```

**Output Schema:**
```json
{
  "type": "string",
  "contentType": "image/png",
  "format": "binary",
  "description": "The generated image in PNG format"
}
```

---

### @cf/black-forest-labs/flux-1-schnell

**Input Schema:**
```json
{
  "type": "object",
  "properties": {
    "prompt": {
      "type": "string",
      "minLength": 1,
      "maxLength": 2048,
      "description": "A text description of the image you want to generate."
    },
    "steps": {
      "type": "integer",
      "default": 4,
      "maximum": 8,
      "description": "The number of diffusion steps; higher values can improve quality but take longer."
    }
  },
  "required": [
    "prompt"
  ]
}
```

**Example Request:**
```javascript
const response = await fetch(
  'https://api.cloudflare.com/client/v4/accounts/{account_id}/ai/run/@cf/black-forest-labs/flux-1-schnell',
  {
    method: 'POST',
    headers: {
      'Authorization': 'Bearer YOUR_API_TOKEN',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      "prompt": "Hello, how are you?",
      "steps": 4
})
  }
);

const result = await response.json();
console.log(result);
```

**Output Schema:**
```json
{
  "type": "object",
  "contentType": "application/json",
  "properties": {
    "image": {
      "type": "string",
      "description": "The generated image in Base64 format."
    }
  }
}
```

---

### @cf/bytedance/stable-diffusion-xl-lightning

**Input Schema:**
```json
{
  "type": "object",
  "properties": {
    "prompt": {
      "type": "string",
      "minLength": 1,
      "description": "A text description of the image you want to generate"
    },
    "negative_prompt": {
      "type": "string",
      "description": "Text describing elements to avoid in the generated image"
    },
    "height": {
      "type": "integer",
      "minimum": 256,
      "maximum": 2048,
      "description": "The height of the generated image in pixels"
    },
    "width": {
      "type": "integer",
      "minimum": 256,
      "maximum": 2048,
      "description": "The width of the generated image in pixels"
    },
    "image": {
      "type": "array",
      "description": "For use with img2img tasks. An array of integers that represent the image data constrained to 8-bit unsigned integer values",
      "items": {
        "type": "number",
        "description": "A value between 0 and 255"
      }
    },
    "image_b64": {
      "type": "string",
      "description": "For use with img2img tasks. A base64-encoded string of the input image"
    },
    "mask": {
      "type": "array",
      "description": "An array representing An array of integers that represent mask image data for inpainting constrained to 8-bit unsigned integer values",
      "items": {
        "type": "number",
        "description": "A value between 0 and 255"
      }
    },
    "num_steps": {
      "type": "integer",
      "default": 20,
      "maximum": 20,
      "description": "The number of diffusion steps; higher values can improve quality but take longer"
    },
    "strength": {
      "type": "number",
      "default": 1,
      "description": "A value between 0 and 1 indicating how strongly to apply the transformation during img2img tasks; lower values make the output closer to the input image"
    },
    "guidance": {
      "type": "number",
      "default": 7.5,
      "description": "Controls how closely the generated image should adhere to the prompt; higher values make the image more aligned with the prompt"
    },
    "seed": {
      "type": "integer",
      "description": "Random seed for reproducibility of the image generation"
    }
  },
  "required": [
    "prompt"
  ]
}
```

**Example Request:**
```javascript
const response = await fetch(
  'https://api.cloudflare.com/client/v4/accounts/{account_id}/ai/run/@cf/bytedance/stable-diffusion-xl-lightning',
  {
    method: 'POST',
    headers: {
      'Authorization': 'Bearer YOUR_API_TOKEN',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      "prompt": "Hello, how are you?",
      "negative_prompt": "example",
      "height": 256,
      "width": 256,
      "image": [],
      "image_b64": "example",
      "mask": [],
      "num_steps": 20,
      "strength": 1,
      "guidance": 7.5,
      "seed": 256
})
  }
);

const result = await response.json();
console.log(result);
```

**Output Schema:**
```json
{
  "type": "string",
  "contentType": "image/png",
  "format": "binary",
  "description": "The generated image in PNG format"
}
```

---

### @cf/leonardo/phoenix-1.0

**Input Schema:**
```json
{
  "type": "object",
  "properties": {
    "prompt": {
      "type": "string",
      "minLength": 1,
      "description": "A text description of the image you want to generate."
    },
    "guidance": {
      "type": "number",
      "default": 2,
      "minimum": 2,
      "maximum": 10,
      "description": "Controls how closely the generated image should adhere to the prompt; higher values make the image more aligned with the prompt"
    },
    "seed": {
      "type": "integer",
      "minimum": 0,
      "description": "Random seed for reproducibility of the image generation"
    },
    "height": {
      "type": "integer",
      "minimum": 0,
      "maximum": 2048,
      "default": 1024,
      "description": "The height of the generated image in pixels"
    },
    "width": {
      "type": "integer",
      "minimum": 0,
      "maximum": 2048,
      "default": 1024,
      "description": "The width of the generated image in pixels"
    },
    "num_steps": {
      "type": "integer",
      "default": 25,
      "minimum": 1,
      "maximum": 50,
      "description": "The number of diffusion steps; higher values can improve quality but take longer"
    },
    "negative_prompt": {
      "type": "string",
      "minLength": 1,
      "description": "Specify what to exclude from the generated images"
    }
  },
  "required": [
    "prompt"
  ]
}
```

**Example Request:**
```javascript
const response = await fetch(
  'https://api.cloudflare.com/client/v4/accounts/{account_id}/ai/run/@cf/leonardo/phoenix-1.0',
  {
    method: 'POST',
    headers: {
      'Authorization': 'Bearer YOUR_API_TOKEN',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      "prompt": "Hello, how are you?",
      "guidance": 2,
      "seed": 256,
      "height": 1024,
      "width": 1024,
      "num_steps": 25,
      "negative_prompt": "example"
})
  }
);

const result = await response.json();
console.log(result);
```

**Output Schema:**
```json
{
  "type": "string",
  "contentType": "image/jpeg",
  "format": "binary",
  "description": "The generated image in JPEG format"
}
```

---

### @cf/stabilityai/stable-diffusion-xl-base-1.0

**Input Schema:**
```json
{
  "type": "object",
  "properties": {
    "prompt": {
      "type": "string",
      "minLength": 1,
      "description": "A text description of the image you want to generate"
    },
    "negative_prompt": {
      "type": "string",
      "description": "Text describing elements to avoid in the generated image"
    },
    "height": {
      "type": "integer",
      "minimum": 256,
      "maximum": 2048,
      "description": "The height of the generated image in pixels"
    },
    "width": {
      "type": "integer",
      "minimum": 256,
      "maximum": 2048,
      "description": "The width of the generated image in pixels"
    },
    "image": {
      "type": "array",
      "description": "For use with img2img tasks. An array of integers that represent the image data constrained to 8-bit unsigned integer values",
      "items": {
        "type": "number",
        "description": "A value between 0 and 255"
      }
    },
    "image_b64": {
      "type": "string",
      "description": "For use with img2img tasks. A base64-encoded string of the input image"
    },
    "mask": {
      "type": "array",
      "description": "An array representing An array of integers that represent mask image data for inpainting constrained to 8-bit unsigned integer values",
      "items": {
        "type": "number",
        "description": "A value between 0 and 255"
      }
    },
    "num_steps": {
      "type": "integer",
      "default": 20,
      "maximum": 20,
      "description": "The number of diffusion steps; higher values can improve quality but take longer"
    },
    "strength": {
      "type": "number",
      "default": 1,
      "description": "A value between 0 and 1 indicating how strongly to apply the transformation during img2img tasks; lower values make the output closer to the input image"
    },
    "guidance": {
      "type": "number",
      "default": 7.5,
      "description": "Controls how closely the generated image should adhere to the prompt; higher values make the image more aligned with the prompt"
    },
    "seed": {
      "type": "integer",
      "description": "Random seed for reproducibility of the image generation"
    }
  },
  "required": [
    "prompt"
  ]
}
```

**Example Request:**
```javascript
const response = await fetch(
  'https://api.cloudflare.com/client/v4/accounts/{account_id}/ai/run/@cf/stabilityai/stable-diffusion-xl-base-1.0',
  {
    method: 'POST',
    headers: {
      'Authorization': 'Bearer YOUR_API_TOKEN',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      "prompt": "Hello, how are you?",
      "negative_prompt": "example",
      "height": 256,
      "width": 256,
      "image": [],
      "image_b64": "example",
      "mask": [],
      "num_steps": 20,
      "strength": 1,
      "guidance": 7.5,
      "seed": 256
})
  }
);

const result = await response.json();
console.log(result);
```

**Output Schema:**
```json
{
  "type": "string",
  "contentType": "image/png",
  "format": "binary",
  "description": "The generated image in PNG format"
}
```

---

### @cf/black-forest-labs/flux-2-klein-4b

**Input Schema:**
```json
{
  "type": "object",
  "properties": {
    "multipart": {
      "type": "object",
      "properties": {
        "body": {
          "type": "object"
        },
        "contentType": {
          "type": "string"
        }
      }
    }
  },
  "required": [
    "multipart"
  ]
}
```

**Example Request:**
```javascript
const response = await fetch(
  'https://api.cloudflare.com/client/v4/accounts/{account_id}/ai/run/@cf/black-forest-labs/flux-2-klein-4b',
  {
    method: 'POST',
    headers: {
      'Authorization': 'Bearer YOUR_API_TOKEN',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      "multipart": {}
})
  }
);

const result = await response.json();
console.log(result);
```

**Output Schema:**
```json
{
  "type": "object",
  "properties": {
    "image": {
      "type": "string",
      "description": "Generated image as Base64 string."
    }
  }
}
```

---

### @cf/black-forest-labs/flux-2-dev

**Input Schema:**
```json
{
  "type": "object",
  "properties": {
    "multipart": {
      "type": "object",
      "properties": {
        "body": {
          "type": "object"
        },
        "contentType": {
          "type": "string"
        }
      }
    }
  },
  "required": [
    "multipart"
  ]
}
```

**Example Request:**
```javascript
const response = await fetch(
  'https://api.cloudflare.com/client/v4/accounts/{account_id}/ai/run/@cf/black-forest-labs/flux-2-dev',
  {
    method: 'POST',
    headers: {
      'Authorization': 'Bearer YOUR_API_TOKEN',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      "multipart": {}
})
  }
);

const result = await response.json();
console.log(result);
```

**Output Schema:**
```json
{
  "type": "object",
  "properties": {
    "image": {
      "type": "string",
      "description": "Generated image as Base64 string."
    }
  }
}
```

---

### @cf/runwayml/stable-diffusion-v1-5-img2img

**Input Schema:**
```json
{
  "type": "object",
  "properties": {
    "prompt": {
      "type": "string",
      "minLength": 1,
      "description": "A text description of the image you want to generate"
    },
    "negative_prompt": {
      "type": "string",
      "description": "Text describing elements to avoid in the generated image"
    },
    "height": {
      "type": "integer",
      "minimum": 256,
      "maximum": 2048,
      "description": "The height of the generated image in pixels"
    },
    "width": {
      "type": "integer",
      "minimum": 256,
      "maximum": 2048,
      "description": "The width of the generated image in pixels"
    },
    "image": {
      "type": "array",
      "description": "For use with img2img tasks. An array of integers that represent the image data constrained to 8-bit unsigned integer values",
      "items": {
        "type": "number",
        "description": "A value between 0 and 255"
      }
    },
    "image_b64": {
      "type": "string",
      "description": "For use with img2img tasks. A base64-encoded string of the input image"
    },
    "mask": {
      "type": "array",
      "description": "An array representing An array of integers that represent mask image data for inpainting constrained to 8-bit unsigned integer values",
      "items": {
        "type": "number",
        "description": "A value between 0 and 255"
      }
    },
    "num_steps": {
      "type": "integer",
      "default": 20,
      "maximum": 20,
      "description": "The number of diffusion steps; higher values can improve quality but take longer"
    },
    "strength": {
      "type": "number",
      "default": 1,
      "description": "A value between 0 and 1 indicating how strongly to apply the transformation during img2img tasks; lower values make the output closer to the input image"
    },
    "guidance": {
      "type": "number",
      "default": 7.5,
      "description": "Controls how closely the generated image should adhere to the prompt; higher values make the image more aligned with the prompt"
    },
    "seed": {
      "type": "integer",
      "description": "Random seed for reproducibility of the image generation"
    }
  },
  "required": [
    "prompt"
  ]
}
```

**Example Request:**
```javascript
const response = await fetch(
  'https://api.cloudflare.com/client/v4/accounts/{account_id}/ai/run/@cf/runwayml/stable-diffusion-v1-5-img2img',
  {
    method: 'POST',
    headers: {
      'Authorization': 'Bearer YOUR_API_TOKEN',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      "prompt": "Hello, how are you?",
      "negative_prompt": "example",
      "height": 256,
      "width": 256,
      "image": [],
      "image_b64": "example",
      "mask": [],
      "num_steps": 20,
      "strength": 1,
      "guidance": 7.5,
      "seed": 256
})
  }
);

const result = await response.json();
console.log(result);
```

**Output Schema:**
```json
{
  "type": "string",
  "contentType": "image/png",
  "format": "binary",
  "description": "The generated image in PNG format"
}
```

---

### @cf/leonardo/lucid-origin

**Input Schema:**
```json
{
  "type": "object",
  "properties": {
    "prompt": {
      "type": "string",
      "minLength": 1,
      "description": "A text description of the image you want to generate."
    },
    "guidance": {
      "type": "number",
      "default": 4.5,
      "minimum": 0,
      "maximum": 10,
      "description": "Controls how closely the generated image should adhere to the prompt; higher values make the image more aligned with the prompt"
    },
    "seed": {
      "type": "integer",
      "minimum": 0,
      "description": "Random seed for reproducibility of the image generation"
    },
    "height": {
      "type": "integer",
      "minimum": 0,
      "maximum": 2500,
      "default": 1120,
      "description": "The height of the generated image in pixels"
    },
    "width": {
      "type": "integer",
      "minimum": 0,
      "maximum": 2500,
      "default": 1120,
      "description": "The width of the generated image in pixels"
    },
    "num_steps": {
      "type": "integer",
      "minimum": 1,
      "maximum": 40,
      "description": "The number of diffusion steps; higher values can improve quality but take longer"
    },
    "steps": {
      "type": "integer",
      "minimum": 1,
      "maximum": 40,
      "description": "The number of diffusion steps; higher values can improve quality but take longer"
    }
  },
  "required": [
    "prompt"
  ]
}
```

**Example Request:**
```javascript
const response = await fetch(
  'https://api.cloudflare.com/client/v4/accounts/{account_id}/ai/run/@cf/leonardo/lucid-origin',
  {
    method: 'POST',
    headers: {
      'Authorization': 'Bearer YOUR_API_TOKEN',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      "prompt": "Hello, how are you?",
      "guidance": 4.5,
      "seed": 256,
      "height": 1120,
      "width": 1120,
      "num_steps": 256,
      "steps": 256
})
  }
);

const result = await response.json();
console.log(result);
```

**Output Schema:**
```json
{
  "type": "object",
  "contentType": "application/json",
  "properties": {
    "image": {
      "type": "string",
      "description": "The generated image in Base64 format."
    }
  }
}
```

---

## Text-to-Speech

### @cf/myshell-ai/melotts

**Input Schema:**
```json
{
  "type": "object",
  "properties": {
    "prompt": {
      "type": "string",
      "minLength": 1,
      "description": "A text description of the audio you want to generate"
    },
    "lang": {
      "type": "string",
      "default": "en",
      "description": "The speech language (e.g., 'en' for English, 'fr' for French). Defaults to 'en' if not specified"
    }
  },
  "required": [
    "prompt"
  ]
}
```

**Example Request:**
```javascript
const response = await fetch(
  'https://api.cloudflare.com/client/v4/accounts/{account_id}/ai/run/@cf/myshell-ai/melotts',
  {
    method: 'POST',
    headers: {
      'Authorization': 'Bearer YOUR_API_TOKEN',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      "prompt": "Hello, how are you?",
      "lang": "en"
})
  }
);

const result = await response.json();
console.log(result);
```

**Output Schema:**
```json
{
  "oneOf": [
    {
      "type": "object",
      "contentType": "application/json",
      "properties": {
        "audio": {
          "type": "string",
          "description": "The generated audio in MP3 format, base64-encoded"
        }
      }
    },
    {
      "type": "string",
      "contentType": "audio/mpeg",
      "format": "binary",
      "description": "The generated audio in MP3 format"
    }
  ]
}
```

---

### @cf/deepgram/aura-2-es

**Input Schema:**
```json
{
  "type": "object",
  "properties": {
    "speaker": {
      "type": "string",
      "enum": [
        "sirio",
        "nestor",
        "carina",
        "celeste",
        "alvaro",
        "diana",
        "aquila",
        "selena",
        "estrella",
        "javier"
      ],
      "default": "aquila",
      "description": "Speaker used to produce the audio."
    },
    "encoding": {
      "type": "string",
      "enum": [
        "linear16",
        "flac",
        "mulaw",
        "alaw",
        "mp3",
        "opus",
        "aac"
      ],
      "description": "Encoding of the output audio."
    },
    "container": {
      "type": "string",
      "enum": [
        "none",
        "wav",
        "ogg"
      ],
      "description": "Container specifies the file format wrapper for the output audio. The available options depend on the encoding type.."
    },
    "text": {
      "type": "string",
      "description": "The text content to be converted to speech"
    },
    "sample_rate": {
      "type": "number",
      "description": "Sample Rate specifies the sample rate for the output audio. Based on the encoding, different sample rates are supported. For some encodings, the sample rate is not configurable"
    },
    "bit_rate": {
      "type": "number",
      "description": "The bitrate of the audio in bits per second. Choose from predefined ranges or specific values based on the encoding type."
    }
  },
  "required": [
    "text"
  ]
}
```

**Example Request:**
```javascript
const response = await fetch(
  'https://api.cloudflare.com/client/v4/accounts/{account_id}/ai/run/@cf/deepgram/aura-2-es',
  {
    method: 'POST',
    headers: {
      'Authorization': 'Bearer YOUR_API_TOKEN',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      "speaker": "aquila",
      "encoding": "example",
      "container": "example",
      "text": "Sample text to process",
      "sample_rate": 0.7,
      "bit_rate": 0.7
})
  }
);

const result = await response.json();
console.log(result);
```

**Output Schema:**
```json
{
  "type": "string",
  "contentType": "audio/mpeg",
  "format": "binary",
  "description": "The generated audio in MP3 format"
}
```

---

### @cf/deepgram/aura-1

**Input Schema:**
```json
{
  "type": "object",
  "properties": {
    "speaker": {
      "type": "string",
      "enum": [
        "angus",
        "asteria",
        "arcas",
        "orion",
        "orpheus",
        "athena",
        "luna",
        "zeus",
        "perseus",
        "helios",
        "hera",
        "stella"
      ],
      "default": "angus",
      "description": "Speaker used to produce the audio."
    },
    "encoding": {
      "type": "string",
      "enum": [
        "linear16",
        "flac",
        "mulaw",
        "alaw",
        "mp3",
        "opus",
        "aac"
      ],
      "description": "Encoding of the output audio."
    },
    "container": {
      "type": "string",
      "enum": [
        "none",
        "wav",
        "ogg"
      ],
      "description": "Container specifies the file format wrapper for the output audio. The available options depend on the encoding type.."
    },
    "text": {
      "type": "string",
      "description": "The text content to be converted to speech"
    },
    "sample_rate": {
      "type": "number",
      "description": "Sample Rate specifies the sample rate for the output audio. Based on the encoding, different sample rates are supported. For some encodings, the sample rate is not configurable"
    },
    "bit_rate": {
      "type": "number",
      "description": "The bitrate of the audio in bits per second. Choose from predefined ranges or specific values based on the encoding type."
    }
  },
  "required": [
    "text"
  ]
}
```

**Example Request:**
```javascript
const response = await fetch(
  'https://api.cloudflare.com/client/v4/accounts/{account_id}/ai/run/@cf/deepgram/aura-1',
  {
    method: 'POST',
    headers: {
      'Authorization': 'Bearer YOUR_API_TOKEN',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      "speaker": "angus",
      "encoding": "example",
      "container": "example",
      "text": "Sample text to process",
      "sample_rate": 0.7,
      "bit_rate": 0.7
})
  }
);

const result = await response.json();
console.log(result);
```

**Output Schema:**
```json
{
  "type": "string",
  "contentType": "audio/mpeg",
  "format": "binary",
  "description": "The generated audio in MP3 format"
}
```

---

### @cf/deepgram/aura-2-en

**Input Schema:**
```json
{
  "type": "object",
  "properties": {
    "speaker": {
      "type": "string",
      "enum": [
        "amalthea",
        "andromeda",
        "apollo",
        "arcas",
        "aries",
        "asteria",
        "athena",
        "atlas",
        "aurora",
        "callista",
        "cora",
        "cordelia",
        "delia",
        "draco",
        "electra",
        "harmonia",
        "helena",
        "hera",
        "hermes",
        "hyperion",
        "iris",
        "janus",
        "juno",
        "jupiter",
        "luna",
        "mars",
        "minerva",
        "neptune",
        "odysseus",
        "ophelia",
        "orion",
        "orpheus",
        "pandora",
        "phoebe",
        "pluto",
        "saturn",
        "thalia",
        "theia",
        "vesta",
        "zeus"
      ],
      "default": "luna",
      "description": "Speaker used to produce the audio."
    },
    "encoding": {
      "type": "string",
      "enum": [
        "linear16",
        "flac",
        "mulaw",
        "alaw",
        "mp3",
        "opus",
        "aac"
      ],
      "description": "Encoding of the output audio."
    },
    "container": {
      "type": "string",
      "enum": [
        "none",
        "wav",
        "ogg"
      ],
      "description": "Container specifies the file format wrapper for the output audio. The available options depend on the encoding type.."
    },
    "text": {
      "type": "string",
      "description": "The text content to be converted to speech"
    },
    "sample_rate": {
      "type": "number",
      "description": "Sample Rate specifies the sample rate for the output audio. Based on the encoding, different sample rates are supported. For some encodings, the sample rate is not configurable"
    },
    "bit_rate": {
      "type": "number",
      "description": "The bitrate of the audio in bits per second. Choose from predefined ranges or specific values based on the encoding type."
    }
  },
  "required": [
    "text"
  ]
}
```

**Example Request:**
```javascript
const response = await fetch(
  'https://api.cloudflare.com/client/v4/accounts/{account_id}/ai/run/@cf/deepgram/aura-2-en',
  {
    method: 'POST',
    headers: {
      'Authorization': 'Bearer YOUR_API_TOKEN',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      "speaker": "luna",
      "encoding": "example",
      "container": "example",
      "text": "Sample text to process",
      "sample_rate": 0.7,
      "bit_rate": 0.7
})
  }
);

const result = await response.json();
console.log(result);
```

**Output Schema:**
```json
{
  "type": "string",
  "contentType": "audio/mpeg",
  "format": "binary",
  "description": "The generated audio in MP3 format"
}
```

---

## Translation

### @cf/meta/m2m100-1.2b

**Input Schema:**
```json
{
  "type": "object",
  "oneOf": [
    {
      "properties": {
        "text": {
          "type": "string",
          "minLength": 1,
          "description": "The text to be translated"
        },
        "source_lang": {
          "type": "string",
          "default": "en",
          "description": "The language code of the source text (e.g., 'en' for English). Defaults to 'en' if not specified"
        },
        "target_lang": {
          "type": "string",
          "description": "The language code to translate the text into (e.g., 'es' for Spanish)"
        }
      },
      "required": [
        "text",
        "target_lang"
      ]
    },
    {
      "properties": {
        "requests": {
          "type": "array",
          "description": "Batch of the embeddings requests to run using async-queue",
          "items": {
            "type": "object",
            "properties": {
              "text": {
                "type": "string",
                "minLength": 1,
                "description": "The text to be translated"
              },
              "source_lang": {
                "type": "string",
                "default": "en",
                "description": "The language code of the source text (e.g., 'en' for English). Defaults to 'en' if not specified"
              },
              "target_lang": {
                "type": "string",
                "description": "The language code to translate the text into (e.g., 'es' for Spanish)"
              }
            },
            "required": [
              "text",
              "target_lang"
            ]
          }
        }
      },
      "required": [
        "requests"
      ]
    }
  ]
}
```

**Example Request:**
```javascript
const response = await fetch(
  'https://api.cloudflare.com/client/v4/accounts/{account_id}/ai/run/@cf/meta/m2m100-1.2b',
  {
    method: 'POST',
    headers: {
      'Authorization': 'Bearer YOUR_API_TOKEN',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      "text": "Sample text to process",
      "target_lang": "example"
})
  }
);

const result = await response.json();
console.log(result);
```

**Output Schema:**
```json
{
  "type": "object",
  "contentType": "application/json",
  "oneOf": [
    {
      "properties": {
        "translated_text": {
          "type": "string",
          "description": "The translated text in the target language"
        }
      }
    },
    {
      "type": "object",
      "contentType": "application/json",
      "title": "Async response",
      "properties": {
        "request_id": {
          "type": "string",
          "description": "The async request id that can be used to obtain the results."
        }
      }
    }
  ]
}
```

---

### @cf/ai4bharat/indictrans2-en-indic-1B

**Input Schema:**
```json
{
  "type": "object",
  "properties": {
    "text": {
      "oneOf": [
        {
          "type": "string"
        },
        {
          "type": "array",
          "items": {
            "type": "string"
          }
        }
      ],
      "description": "Input text to translate. Can be a single string or a list of strings."
    },
    "target_language": {
      "type": "string",
      "enum": [
        "asm_Beng",
        "awa_Deva",
        "ben_Beng",
        "bho_Deva",
        "brx_Deva",
        "doi_Deva",
        "eng_Latn",
        "gom_Deva",
        "gon_Deva",
        "guj_Gujr",
        "hin_Deva",
        "hne_Deva",
        "kan_Knda",
        "kas_Arab",
        "kas_Deva",
        "kha_Latn",
        "lus_Latn",
        "mag_Deva",
        "mai_Deva",
        "mal_Mlym",
        "mar_Deva",
        "mni_Beng",
        "mni_Mtei",
        "npi_Deva",
        "ory_Orya",
        "pan_Guru",
        "san_Deva",
        "sat_Olck",
        "snd_Arab",
        "snd_Deva",
        "tam_Taml",
        "tel_Telu",
        "urd_Arab",
        "unr_Deva"
      ],
      "default": "hin_Deva",
      "description": "Target langauge to translate to"
    }
  },
  "required": [
    "text",
    "target_language"
  ]
}
```

**Example Request:**
```javascript
const response = await fetch(
  'https://api.cloudflare.com/client/v4/accounts/{account_id}/ai/run/@cf/ai4bharat/indictrans2-en-indic-1B',
  {
    method: 'POST',
    headers: {
      'Authorization': 'Bearer YOUR_API_TOKEN',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      "text": null,
      "target_language": "hin_Deva"
})
  }
);

const result = await response.json();
console.log(result);
```

**Output Schema:**
```json
{
  "type": "object",
  "properties": {
    "translations": {
      "type": "array",
      "items": {
        "type": "string"
      },
      "description": "Translated texts"
    }
  },
  "required": [
    "translations"
  ]
}
```

---

