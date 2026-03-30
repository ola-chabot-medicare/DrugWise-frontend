import axios from 'axios';

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8000',
  timeout: 60000, // Increased to 60s because RAG + LLM can be slow
});

export async function sendMessage(message) {
  try {
    const response = await apiClient.post('/api/chat', {
      message,
      model: 'gpt-4o-mini',
      model_provider: 'openai',
    });
    return response.data;
  } catch (error) {
    throw new Error(
      "Sorry, I'm having trouble connecting right now. Please make sure the backend is running on port 8000."
    );
  }
}

export async function checkHealth() {
  const response = await apiClient.get('/health');
  return response.data;
}

export default apiClient;
