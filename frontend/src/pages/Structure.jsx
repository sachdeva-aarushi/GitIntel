import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { fetchRepoStructure, fetchFileContent } from '../api';
import RepoTree from '../components/repotree';
import Navbar from '../components/Navbar';

function Structure() {
    const [searchParams] = useSearchParams();
    const owner = searchParams.get('owner') || '';
    const repo = searchParams.get('repo') || '';

    const [structure, setStructure] = useState(null);
    const [selectedFile, setSelectedFile] = useState(null);
    const [fileContent, setFileContent] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!owner || !repo) return;

        const loadStructure = async () => {
            setLoading(true);
            setError(null);
            setStructure(null);

            try {
                const result = await fetchRepoStructure(owner, repo);
                setStructure(result);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        loadStructure();
    }, [owner, repo]);

    const handleFileClick = async (path) => {
        try {
            setSelectedFile(path);
            setFileContent(null);

            const file = await fetchFileContent(owner, repo, path);

            // Decode base64 safely resolving UTF-8 characters (like emojis and non-English text)
            const binaryStr = atob(file.content.replace(/\n/g, ''));
            const bytes = new Uint8Array([...binaryStr].map((char) => char.charCodeAt(0)));
            const decoded = new TextDecoder().decode(bytes);

            setFileContent(decoded);
        } catch (err) {
            console.error(err);
            setFileContent('Error loading file (might be a binary or unsupported format)');
        }
    };

    return (
        <div className="app-container">
            <Navbar owner={owner} repo={repo} />

            <h1 className="app-title">
                Structure — <span>{owner}/{repo}</span>
            </h1>

            {loading && (
                <div className="loading-container">
                    <div className="spinner" />
                    <span className="loading-text">Loading repository structure...</span>
                </div>
            )}

            {error && (
                <div className="error-box">Error: {error}</div>
            )}

            {structure && (
                <div className="chart-card">
                    <RepoTree data={structure} onFileClick={handleFileClick} />
                </div>
            )}

            {fileContent && (
                <div className="chart-card">
                    <h3 style={{ marginBottom: '12px', color: '#4ecdc4' }}>{selectedFile}</h3>
                    <pre className="file-content-box">{fileContent}</pre>
                </div>
            )}
        </div>
    );
}

export default Structure;
