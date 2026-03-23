# GitClass

A production-ready web application that aggregates subject-wise GitHub repositories for lab materials — built for students, powered by the GitHub REST API.

## 🚀 Features

- **Subject Dashboard** — Browse all lab subjects (DBMS, CN, OS, DSA, SE, CG) from a single clean interface
- **Repository Explorer** — View repo metadata, file tree, and rendered README for each subject
- **Quick README Preview** — Inline README preview on the home page without navigating away
- **Bookmarks** — Bookmark favorite subjects; persisted to `localStorage`
- **Live Search** — Filter subjects by name or description in real-time
- **Skeleton Loading** — Smooth loading states for all async data
- **Dark Mode** — Dark theme applied by default via Tailwind CSS `dark` class
- **Responsive Design** — Mobile-first grid layout using Tailwind CSS
- **Lazy Loading** — Route-level code splitting with React `lazy` + `Suspense`
- **DevContainer** — One-click GitHub Codespaces / VS Code Dev Container support

## 🛠 Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | [React 19](https://react.dev/) via [Vite](https://vitejs.dev/) |
| Routing | [React Router DOM v7](https://reactrouter.com/) |
| Styling | [Tailwind CSS v3](https://tailwindcss.com/) + [@tailwindcss/typography](https://tailwindcss.com/docs/typography-plugin) |
| Markdown | [react-markdown](https://github.com/remarkjs/react-markdown) + [remark-gfm](https://github.com/remarkjs/remark-gfm) |
| API | [GitHub REST API v3](https://docs.github.com/en/rest) |

## 📦 Setup & Installation

### Prerequisites

- Node.js 18+
- npm 9+

### Local Development

```bash
# Clone the repository
git clone https://github.com/sanket-sonwane/GitClass.git
cd GitClass

# Install dependencies
npm install

# Start the development server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Build for Production

```bash
npm run build
npm run preview
```

### DevContainer (GitHub Codespaces / VS Code)

This repo includes a `.devcontainer/devcontainer.json` configuration. Open in GitHub Codespaces or click **Reopen in Container** in VS Code — the dev server starts automatically on port `5173`.

## ➕ How to Add New Subjects

Edit `src/data/subjects.json` and add a new entry:

```json
{
  "name": "AI",
  "repo": "your-username/ai-lab",
  "description": "Artificial Intelligence practicals including search algorithms and neural networks."
}
```

The card appears on the home page immediately. No other changes required.

## 🌐 GitHub API

GitClass uses the **unauthenticated** GitHub REST API. Key endpoints:

| Endpoint | Purpose |
|----------|---------|
| `GET /repos/{owner}/{repo}` | Fetch repo metadata (stars, forks, language) |
| `GET /repos/{owner}/{repo}/contents/` | List root directory files |
| `GET /repos/{owner}/{repo}/readme` | Fetch the repository README (Base64 encoded) |

> **Rate Limiting:** Unauthenticated requests are limited to **60 requests/hour** per IP. The app handles `403` responses gracefully and displays the reset time to the user.

## 🗂 Project Structure

```
GitClass/
├── .devcontainer/
│   └── devcontainer.json       # Dev container config
├── public/
│   └── vite.svg
├── src/
│   ├── components/
│   │   ├── FileTree.jsx        # Repo file browser
│   │   ├── ReadmeViewer.jsx    # Rendered Markdown viewer
│   │   ├── SearchBar.jsx       # Search input
│   │   ├── SkeletonCard.jsx    # Loading skeleton for cards
│   │   ├── SkeletonDetail.jsx  # Loading skeleton for detail page
│   │   └── SubjectCard.jsx     # Subject card with preview
│   ├── data/
│   │   └── subjects.json       # Subject definitions
│   ├── hooks/
│   │   ├── useBookmarks.js     # localStorage bookmark state
│   │   ├── useGitHub.js        # Generic GitHub fetch hook
│   │   └── useSearch.js        # Filtered search state
│   ├── pages/
│   │   ├── HomePage.jsx        # Main dashboard
│   │   └── SubjectPage.jsx     # Repo detail view
│   ├── services/
│   │   └── github.js           # GitHub API service layer
│   ├── index.css               # Tailwind directives
│   └── main.jsx                # App entry point with routing
├── index.html
├── tailwind.config.js
├── postcss.config.js
├── vite.config.js
└── package.json
```

## 📄 License

MIT
