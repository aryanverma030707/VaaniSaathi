// Bhashini (MeitY / ULCA) Integration Adapter for Santali Speech & Translation
// Pre-configured for plug-and-play when official Government API keys are added to .env

const BHASHINI_USER_ID = import.meta.env.VITE_BHASHINI_USER_ID || '';
const BHASHINI_API_KEY = import.meta.env.VITE_BHASHINI_API_KEY || '';
const BHASHINI_INFERENCE_KEY = import.meta.env.VITE_BHASHINI_INFERENCE_KEY || '';

export const bhashiniConfig = {
  isConfigured: Boolean(BHASHINI_USER_ID && BHASHINI_API_KEY && BHASHINI_INFERENCE_KEY),
  userId: BHASHINI_USER_ID ? `${BHASHINI_USER_ID.substring(0, 4)}****` : 'Not configured',
  status: Boolean(BHASHINI_USER_ID && BHASHINI_API_KEY) ? 'Active' : 'Using Gemini + Local PALASH Engine'
};

/**
 * Call Bhashini ULCA Compute API for ASR / Translation / TTS
 * Implements standard payload schema as defined in Bhashini developer documentation
 */
export async function callBhashiniService(taskType, inputPayload) {
  if (!bhashiniConfig.isConfigured) {
    console.info('Bhashini keys not set; using local/Gemini adapter.');
    return null;
  }

  const endpoint = 'https://dhruva-api.bhashini.gov.in/services/inference/pipeline';
  
  try {
    const res = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': BHASHINI_INFERENCE_KEY,
        'User-Id': BHASHINI_USER_ID,
        'ulcaApiKey': BHASHINI_API_KEY
      },
      body: JSON.stringify({
        pipelineTasks: [
          {
            taskType: taskType, // 'translation' | 'asr' | 'tts'
            config: {
              language: {
                sourceLanguage: inputPayload.sourceLang || 'hi',
                targetLanguage: inputPayload.targetLang || 'sat' // ISO 639-3 for Santali
              }
            }
          }
        ],
        inputData: {
          input: inputPayload.input
        }
      })
    });

    if (res.ok) {
      return await res.json();
    }
  } catch (err) {
    console.warn('Bhashini pipeline call error:', err);
  }

  return null;
}
