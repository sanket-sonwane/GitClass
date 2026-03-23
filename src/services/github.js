const BASE_URL = 'https://api.github.com';

const headers = {
  Accept: 'application/vnd.github+json',
};

async function apiFetch(url) {
  const response = await fetch(url, { headers });
  if (response.status === 403) {
    const resetTime = response.headers.get('X-RateLimit-Reset');
    const resetDate = resetTime ? new Date(resetTime * 1000).toLocaleTimeString() : 'a few minutes';
    throw new Error(`GitHub API rate limit exceeded. Try again after ${resetDate}.`);
  }
  if (response.status === 404) {
    throw new Error('Repository not found. Please check the repo name.');
  }
  if (!response.ok) {
    throw new Error(`GitHub API error: ${response.status} ${response.statusText}`);
  }
  return response.json();
}

export async function getRepoMetadata(repo) {
  return apiFetch(`${BASE_URL}/repos/${repo}`);
}

export async function getRepoContents(repo, path = '') {
  return apiFetch(`${BASE_URL}/repos/${repo}/contents/${path}`);
}

export async function getReadme(repo) {
  try {
    const data = await apiFetch(`${BASE_URL}/repos/${repo}/readme`);
    const content = atob(data.content.replace(/\n/g, ''));
    return content;
  } catch (err) {
    if (err.message.includes('not found') || err.message.includes('404')) {
      return null;
    }
    throw err;
  }
}

export async function getFileContent(url) {
  const data = await apiFetch(url);
  if (data.encoding === 'base64') {
    return atob(data.content.replace(/\n/g, ''));
  }
  return data.content;
}
