def build_tree_structure(tree_data):
    root = {}

    for item in tree_data.get("tree", []):
        path_parts = item["path"].split("/")
        current = root

        for part in path_parts[:-1]:
            current = current.setdefault(part, {})

        if item["type"] == "blob":
            current[path_parts[-1]] = "file"
        else:
            current.setdefault(path_parts[-1], {})

    return root