import json
import logging
import requests
import re
from django.conf import settings

logger = logging.getLogger(__name__)

class LLMService:
    def generate_response(self, prompt: str, force_json: bool = True) -> dict | str:
        ollama_url = f"{settings.OLLAMA_BASE_URL}/api/generate"
        ollama_model = getattr(settings, 'OLLAMA_MODEL', 'qwen3:4b')
        
        # Override with specifically requested model
        if ollama_model != 'qwen3:4b':
            ollama_model = 'qwen3:4b'
            
        payload = {
            "model": ollama_model,
            "prompt": prompt,
            "stream": False,
            "options": {
                "temperature": 0.2
            }
        }
        
        if force_json:
            payload["format"] = "json"
        
        try:
            logger.info(f"Sending prompt to Ollama ({ollama_model})...")
            res = requests.post(ollama_url, json=payload, timeout=60)
            
            if res.status_code != 200:
                logger.error("Ollama API error: %s", res.text)
                return {"error": "Failed to get response from Ollama API."}
                
            text_resp = res.json().get("response", "").strip()
            
            if not force_json:
                return text_resp
            
            # Clean up potential markdown formatting wrapping the JSON (just in case)
            cleaned_content = re.sub(r'^```(?:json)?\n', '', text_resp.strip(), flags=re.IGNORECASE)
            cleaned_content = re.sub(r'\n```$', '', cleaned_content.strip())
            
            return json.loads(cleaned_content)
        except json.JSONDecodeError as e:
            logger.error(f"Failed to decode JSON from Ollama response: {str(e)}")
            return {
                "error": "Failed to parse AI response.",
                "raw_response": text_resp
            }
        except Exception as e:
            logger.error(f"LLM Service Error: {str(e)}")
            return {"error": str(e)}

llm_service = LLMService()
