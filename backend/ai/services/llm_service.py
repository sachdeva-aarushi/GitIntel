"""
LLM service — provider abstraction layer.

This is the single entry point for all LLM calls in the application.
It selects the correct provider based on the PROVIDER environment variable
and delegates the call. Adding a new provider requires only:
  1. Creating a new file in ai/providers/
  2. Adding a case here.

Business logic, prompting strategy, and context building all live in
ai/services/repo_ai_analysis.py — not here.
"""

import os
import logging

logger = logging.getLogger(__name__)

# Supported provider identifiers
_PROVIDER_GROQ = "groq"
_PROVIDER_NVIDIA = "nvidia"

_DEFAULT_PROVIDER = _PROVIDER_GROQ


def generate_llm_response(
    user_prompt: str,
    system_prompt: str = "You are a senior software architect analyzing GitHub repositories.",
    max_tokens: int = 1024,
    temperature: float = 0.3,
) -> str:
    """
    Route an LLM request to the configured provider.

    Provider is selected via the PROVIDER environment variable.
    Defaults to 'groq' if not set.

    Args:
        user_prompt: The data/context prompt for the model.
        system_prompt: Role/persona instructions for the model.
        max_tokens: Maximum tokens in the response.
        temperature: Sampling temperature.

    Returns:
        Generated text response from the LLM.

    Raises:
        ValueError: If an unknown provider is configured.
        RuntimeError: If the provider call fails.
    """
    provider = os.getenv("PROVIDER", _DEFAULT_PROVIDER).lower().strip()
    logger.info("LLM request routed to provider: %s", provider)

    if provider == _PROVIDER_GROQ:
        from ai.providers.groq_provider import generate_response
        return generate_response(user_prompt, system_prompt, max_tokens, temperature)

    elif provider == _PROVIDER_NVIDIA:
        from ai.providers.nvidia_provider import generate_response
        return generate_response(user_prompt, system_prompt, max_tokens, temperature)

    else:
        raise ValueError(
            f"Unknown LLM provider: '{provider}'. "
            f"Set PROVIDER to one of: {_PROVIDER_GROQ}, {_PROVIDER_NVIDIA}"
        )
