"""
Groq LLM provider.

Wraps the OpenAI-compatible Groq API client.
This module contains ONLY provider-level concerns:
- client initialization
- API call execution
- provider-specific error handling

No business logic, no analysis, no prompting strategy lives here.
"""

import os
import logging
from typing import Optional

import openai

logger = logging.getLogger(__name__)

# Lazy-initialized client — avoids building the client at import time
# before load_dotenv() has been called in main.py.
_client: Optional[openai.OpenAI] = None


def _get_client() -> openai.OpenAI:
    """
    Return the Groq OpenAI-compatible client, initializing it on first use.

    Raises:
        EnvironmentError: If GROQ_API_KEY is not set.
    """
    global _client
    if _client is None:
        api_key = os.getenv("GROQ_API_KEY")
        if not api_key:
            raise EnvironmentError(
                "GROQ_API_KEY is not set. "
                "Add it to your .env file: GROQ_API_KEY=your_key_here"
            )
        _client = openai.OpenAI(
            api_key=api_key,
            base_url="https://api.groq.com/openai/v1",
        )
    return _client


def generate_response(
    user_prompt: str,
    system_prompt: str = "You are a senior software architect analyzing GitHub repositories.",
    max_tokens: int = 1024,
    temperature: float = 0.3,
) -> str:
    """
    Generate a response from the Groq LLM.

    Uses a separate system message for the persona/guardrails and a
    user message for the repository data, reducing prompt injection risk.

    Args:
        user_prompt: The data/context prompt (repository metrics, etc.).
        system_prompt: Role and guardrails for the model.
        max_tokens: Maximum tokens in the model response.
        temperature: Sampling temperature (lower = more deterministic).

    Returns:
        Generated response content as a string.

    Raises:
        RuntimeError: On any provider-level failure with a descriptive message.
    """
    model = os.getenv("MODEL_NAME", "llama3-8b-8192")

    try:
        client = _get_client()
        response = client.chat.completions.create(
            model=model,
            messages=[
                {"role": "system", "content": system_prompt},
                {"role": "user", "content": user_prompt},
            ],
            max_tokens=max_tokens,
            temperature=temperature,
        )
        return response.choices[0].message.content

    except openai.AuthenticationError:
        logger.error("Groq authentication failed — check GROQ_API_KEY.")
        raise RuntimeError("LLM authentication failed. Check your GROQ_API_KEY.")

    except openai.RateLimitError:
        logger.warning("Groq rate limit exceeded.")
        raise RuntimeError("LLM rate limit exceeded. Please try again shortly.")

    except openai.APIConnectionError:
        logger.error("Could not connect to Groq API.")
        raise RuntimeError("Could not connect to the LLM provider. Check your network.")

    except openai.APIError as e:
        logger.error("Groq API error: %s", e)
        raise RuntimeError(f"LLM provider error: {e}")
