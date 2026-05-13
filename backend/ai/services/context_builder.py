"""
Context builder for AI narration.

Collects and structures repository analysis outputs into a clean, compressed
context string for AI interpretation.

RULES:
- Only consumes outputs from existing deterministic analyzers.
- Does NOT call GitHub API or run any analysis logic itself.
- Sanitizes all user-controlled strings (repo name, description) before injection.
- Respects the token budget defined in token_utils.
"""

from typing import Dict, Any, Optional
from ai.utils.token_utils import truncate_to_token_budget
from ai.utils.prompt_loader import sanitize_user_content


def build_context(
    health_data: Optional[Dict[str, Any]] = None,
    contributor_data: Optional[Dict[str, Any]] = None,
    risk_data: Optional[Dict[str, Any]] = None,
    evolution_data: Optional[Dict[str, Any]] = None,
    repo_metadata: Optional[Dict[str, Any]] = None,
) -> str:
    """
    Build a structured, token-efficient context string from analyzer outputs.

    Args:
        health_data: Output from health_analysis.analyze_health()
        contributor_data: Output from contributor_analysis.analyze_contributors()
        risk_data: Output from risk_analysis.compute_risk()
        evolution_data: Output from evolution_analysis.summarize_repository()
        repo_metadata: Lightweight repo metadata from github_service.get_repo_metadata()

    Returns:
        Structured context string, truncated to the token budget.
    """
    parts = []

    _build_metadata_section(parts, repo_metadata)
    _build_health_section(parts, health_data)
    _build_contributor_section(parts, contributor_data)
    _build_risk_section(parts, risk_data)
    _build_evolution_section(parts, evolution_data)

    context = "\n".join(parts)
    return truncate_to_token_budget(context)


# ---------------------------------------------------------------------------
# Private section builders — each handles one analysis domain
# ---------------------------------------------------------------------------

def _build_metadata_section(parts: list, metadata: Optional[Dict[str, Any]]) -> None:
    """Append repository metadata section."""
    if not metadata:
        return

    parts.append("=== REPOSITORY OVERVIEW ===")
    # Sanitize user-controlled strings to prevent prompt injection
    name = sanitize_user_content(str(metadata.get("full_name", "Unknown")))
    description = sanitize_user_content(str(metadata.get("description") or "No description provided."))
    language = sanitize_user_content(str(metadata.get("language") or "Unknown"))

    parts.append(f"Repository: {name}")
    parts.append(f"Description: {description}")
    parts.append(f"Primary Language: {language}")
    parts.append(f"Stars: {metadata.get('stargazers_count', 0)}")
    parts.append(f"Forks: {metadata.get('forks_count', 0)}")
    parts.append(f"Open Issues: {metadata.get('open_issues_count', 0)}")
    parts.append(f"Default Branch: {metadata.get('default_branch', 'main')}")
    parts.append("")


def _build_health_section(parts: list, health_data: Optional[Dict[str, Any]]) -> None:
    """Append health analysis section."""
    if not health_data:
        return

    parts.append("=== HEALTH ANALYSIS ===")
    parts.append(f"Overall Health Score: {health_data.get('score', 0)}/100")
    parts.append(f"Status: {health_data.get('status', 'Unknown')}")
    parts.append(f"Project Phase: {health_data.get('phase', 'Unknown')}")

    summary = health_data.get("summary", {})
    if summary:
        parts.append(f"Last Commit: {summary.get('last_commit_days', 'N/A')} days ago")
        parts.append(f"Contributors: {summary.get('contributors', 0)}")
        parts.append(f"Issue Close Rate: {summary.get('issue_close_rate', 0)}%")
        parts.append(f"Avg PR Merge Time: {summary.get('avg_pr_merge_time', 0)} hours")

    dimension_scores = health_data.get("dimension_scores", {})
    if dimension_scores:
        parts.append("Dimension Scores (out of 100):")
        parts.append(f"  - Commit Frequency: {dimension_scores.get('commit_frequency', 0)}")
        parts.append(f"  - Recency: {dimension_scores.get('recency', 0)}")
        parts.append(f"  - Contributor Diversity: {dimension_scores.get('contributors', 0)}")
        parts.append(f"  - PR Speed: {dimension_scores.get('pr_speed', 0)}")
        parts.append(f"  - Issue Resolution: {dimension_scores.get('issues', 0)}")

    risk_signals = health_data.get("risk_signals", [])
    if risk_signals:
        parts.append("Active Risk Signals:")
        for signal in risk_signals[:5]:  # Cap at 5 to control token usage
            parts.append(f"  - {signal.get('name', 'Unknown')} ({signal.get('status', '?')} risk)")

    parts.append("")


def _build_contributor_section(parts: list, contributor_data: Optional[Dict[str, Any]]) -> None:
    """Append contributor analysis section."""
    if not contributor_data:
        return

    parts.append("=== CONTRIBUTOR ANALYSIS ===")
    parts.append(f"Bus Factor: {contributor_data.get('bus_factor', 'N/A')}")
    parts.append(f"Top Contributor Share: {contributor_data.get('top_contributor_percentage', 0)}%")

    contributors = contributor_data.get("contributors", [])
    if contributors:
        parts.append(f"Total Contributors: {len(contributors)}")
        parts.append("Top 5 Contributors (by commits):")
        for c in contributors[:5]:
            login = sanitize_user_content(str(c.get("login", "unknown")), max_length=50)
            pct = round(c.get("percentage", 0), 1)
            commits = c.get("contributions", 0)
            parts.append(f"  - {login}: {commits} commits ({pct}%)")

    parts.append("")


def _build_risk_section(parts: list, risk_data: Optional[Dict[str, Any]]) -> None:
    """Append risk analysis section."""
    if not risk_data:
        return

    parts.append("=== RISK ANALYSIS ===")

    summary = risk_data.get("summary", {})
    if summary:
        for key, value in summary.items():
            label = key.replace("_", " ").title()
            level = value.get("level", "?")
            val = value.get("value", "N/A")
            parts.append(f"{label}: {level} — {val}")

    # PR Risk detail
    pr_risk = risk_data.get("pr_risk", {})
    if pr_risk:
        parts.append(f"PR Risk Level: {pr_risk.get('level', 'N/A')}")
        parts.append(f"Open PRs: {pr_risk.get('open_prs', 0)}")
        parts.append(f"PR Merge Ratio: {pr_risk.get('merge_ratio', 0)}")
        for insight in pr_risk.get("insights", [])[:3]:
            parts.append(f"  - {insight}")

    # Issue Risk detail
    issue_risk = risk_data.get("issue_risk", {})
    if issue_risk:
        parts.append(f"Issue Risk Level: {issue_risk.get('level', 'N/A')}")
        parts.append(f"Open Issues: {issue_risk.get('open_issues', 0)}")
        parts.append(f"Issue Close Ratio: {issue_risk.get('close_ratio', 0)}")
        for insight in issue_risk.get("insights", [])[:3]:
            parts.append(f"  - {insight}")

    parts.append("")


def _build_evolution_section(parts: list, evolution_data: Optional[Dict[str, Any]]) -> None:
    """Append repository evolution/structure section."""
    if not evolution_data:
        return

    parts.append("=== STRUCTURE & EVOLUTION ===")
    parts.append(f"Total Files: {evolution_data.get('total_files', 'N/A')}")
    parts.append(f"Total Folders: {evolution_data.get('total_folders', 'N/A')}")
    parts.append(f"Total Pull Requests: {evolution_data.get('total_pull_requests', 'N/A')}")
    parts.append(f"Total Issues: {evolution_data.get('total_issues', 'N/A')}")

    tech_stack = evolution_data.get("tech_stack", [])
    if tech_stack:
        parts.append(f"Tech Stack: {', '.join(tech_stack[:10])}")  # Cap at 10 languages

    languages = evolution_data.get("languages", {})
    if languages:
        # Show top 5 languages by byte count
        sorted_langs = sorted(languages.items(), key=lambda x: x[1], reverse=True)[:5]
        parts.append("Language Distribution (top 5 by bytes):")
        total_bytes = sum(languages.values())
        for lang, bytes_count in sorted_langs:
            pct = round(bytes_count / total_bytes * 100, 1) if total_bytes else 0
            parts.append(f"  - {lang}: {pct}%")

    parts.append("")
