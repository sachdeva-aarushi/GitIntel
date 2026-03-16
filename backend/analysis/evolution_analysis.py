def analyze_repo_structure(tree_data):
    files = 0
    folders = 0
    for item in tree_data.get("tree", []):
        if item["type"] == "blob":
            files += 1
        elif item["type"] == "tree":
            folders += 1
    return {
        "total_files": files,
        "total_folders": folders
    }

def extract_tech_stack(languages_data):
    if not languages_data:
        return []
    return list(languages_data.keys())

def summarize_repository(metadata, languages, structure, pull_requests, issues):

    return {
        "repository": metadata.get("full_name"),
        "stars": metadata.get("stargazers_count", 0),
        "forks": metadata.get("forks_count", 0),

        "tech_stack": extract_tech_stack(languages),

        "languages": languages,

        "total_files": structure["total_files"],
        "total_folders": structure["total_folders"],

        "total_pull_requests": len(pull_requests),
        "total_issues": len(issues)
    }