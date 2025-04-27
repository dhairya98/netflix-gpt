import OpenAI from "openai"
const openaiKey = import.meta.env.VITE_OPENAI_API_KEY;

export const openai = new OpenAI({
    apiKey: openaiKey,
    dangerouslyAllowBrowser: true
})