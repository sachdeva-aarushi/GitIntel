from fastapi import APIRouter
from services.github_service import get_repo_tree
from utils.helpers import build_tree_structure
from analysis.evolution_analysis import summarize_structure

router = APIRouter(
    prefix="/repo",
    tags=["Repository Structure"]
)

@router.get("/structure/{owner}/{repo}")
def get_structure(owner: str, repo: str):

    tree_data = get_repo_tree(owner, repo)

    structure = summarize_structure(tree_data)
    tree = build_tree_structure(tree_data)

    return {
        "repository": f"{owner}/{repo}",
        "total_files": structure["total_files"],
        "total_folders": structure["total_folders"],
        "tree": tree
    }