"""
NVIDIA NIM LLM provider (placeholder).

This module will wrap the NVIDIA NIM API when the integration is needed.
It follows the same interface contract as groq_provider so llm_service.py
can swap providers transparently.

Usage:
    Set PROVIDER=nvidia in .env to activate this provider.
    Then implement generate_response() matching the groq_provider signature.
"""


def generate_response(
    user_prompt: str,
    system_prompt: str = "You are a senior software architect analyzing GitHub repositories.",
    max_tokens: int = 1024,
    temperature: float = 0.3,
) -> str:
    """
    Generate a response using the NVIDIA NIM API.

    Not yet implemented. Set PROVIDER=groq in .env to use Groq instead.

    Raises:
        NotImplementedError: Always, until this provider is implemented.
    """
    raise NotImplementedError(
        "NVIDIA NIM provider is not yet implemented. "
        "Set PROVIDER=groq in your .env file to use the Groq provider."
    )
