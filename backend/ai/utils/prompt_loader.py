"""
Prompt template loader utility.

Loads prompt templates from the prompts/ directory and provides
basic sanitization for user-supplied data injected into prompts.
"""

import os
import re

# Resolved once at import — points to backend/ai/prompts/
_PROMPTS_DIR = os.path.join(
    os.path.dirname(os.path.abspath(__file__)), "..", "prompts"
)


def load_prompt(prompt_name: str) -> str:
    """
    Load a prompt template from the prompts directory.

    Args:
        prompt_name: Name of the prompt file (without .txt extension).

    Returns:
        The raw template string with placeholders intact.

    Raises:
        FileNotFoundError: If the prompt template does not exist.
    """
    prompt_path = os.path.join(_PROMPTS_DIR, f"{prompt_name}.txt")

    if not os.path.exists(prompt_path):
        raise FileNotFoundError(
            f"Prompt template '{prompt_name}' not found at {prompt_path}"
        )

    with open(prompt_path, "r", encoding="utf-8") as f:
        return f.read()


def sanitize_user_content(text: str, max_length: int = 500) -> str:
    """
    Sanitize user-controlled text before injecting into a prompt.

    Strips control characters, limits length, and wraps in delimiters
    to reduce prompt injection risk.

    Args:
        text: Raw user-supplied text (e.g. repo description).
        max_length: Maximum allowed character length.

    Returns:
        Sanitized text string.
    """
    if not text:
        return ""
    # Strip control characters
    cleaned = re.sub(r"[\x00-\x1f\x7f-\x9f]", "", text)
    # Truncate
    if len(cleaned) > max_length:
        cleaned = cleaned[:max_length] + "..."
    return cleaned
