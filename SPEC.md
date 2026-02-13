# Valentine's Day Website

A retro Windows 95-themed website for Valentine's Day, built as an OS desktop where application icons serve as navigation to different pages displayed in centered windows.

---

## Tech Stack

- **Framework:** Vite + React + TypeScript
- **UI Library:** [react95](https://react95.io/) for Windows 95 components
- **Backend/Database:** Firebase (Firestore) for shared persistent state
- **Photo Hosting:** Cloudinary free tier (25GB storage)
- **Hosting:** Vercel (default `.vercel.app` URL, free tier)
- **Routing:** react-router (client-side SPA)

---

## Architecture Overview

```
Browser
  -> Password Gate (sessionStorage check)
  -> Desktop (icons on illustrated background)
     -> Window: Home (static)
     -> Window: Photo Gallery (Cloudinary images)
     -> Window: To-Do List (Firebase read/write)
     -> Window: Poems & Letters (Firebase read/write)
```

All shared state (to-do items, poems/letters) persists via Firebase Firestore. The photo gallery fetches from Cloudinary. The front page is static/hardcoded.

---

## Password Protection

- **Type:** Single shared plaintext password known to both users
- **Storage:** Hardcoded in the application code (repo is private)
- **Session:** Password entry stored in `sessionStorage` — persists until the browser tab/window is closed; re-entering the password is required on each new session
- **UI:** A classic Windows 95-style login dialog box centered on the desktop background
  - The desktop background (illustrated scene) is visible behind the dialog
  - Dialog contains: a title bar (e.g. "Welcome"), a brief message, a password input field, and an "OK" button
  - On incorrect password: show an error message in a Win95-style alert dialog
  - On correct password: dismiss the dialog and reveal the desktop with icons

---

## Desktop (Main Screen)

### Background
- An illustrated Valentine's/love-themed scene as the desktop wallpaper
- **Placeholder:** Use a solid warm gradient (pink-to-cream) until the illustration asset is provided by the user
- The illustration will be sourced separately and dropped into the project

### Taskbar
- **None.** The desktop has no taskbar. Navigation is purely through desktop icons.

### Icons
- Displayed in a grid on the desktop (similar to PostHog's website)
- Mix of classic Win95-style icons and custom Valentine-themed icons:
  - **Home** — Custom heart icon, label: "Our Valentine"
  - **Photo Gallery** — Win95 "My Pictures" folder icon, label: "Our Photos"
  - **To-Do List** — Win95 notepad/checklist icon, label: "Our Bucket List"
  - **Poems & Letters** — Custom envelope/love letter icon, label: "Love Letters"
- Double-click (desktop) or single-tap (mobile) opens the corresponding window

### Windows
- **Position:** Fixed, centered on the screen (not draggable, not resizable)
- **Controls:** Working close button (X) in the title bar. Clicking close returns to the desktop view.
- **Transitions:** Instant appear/disappear (authentic Win95 behavior, no animations)
- Only one window open at a time. Opening a new icon closes the current window.

### react95 Theme
- **Subtle warmth:** Override the default gray Win95 theme to shift slightly toward cream/rose tones
- Keep the authentic retro feel but warm up the grays so they don't clash with the Valentine's aesthetic
- Accent colors: soft pink/red for selected states, title bar highlights, etc.

---

## Pages / Windows

### 1. Home — "Our Valentine"

- **Content:** A static, hardcoded poem or love letter with a "Happy Valentine's Day" message
- **Layout:** Centered text within the react95 window, styled with a warm serif or handwriting-style font for the letter content
- **Not editable** — content is written in the source code

### 2. Photo Gallery — "Our Photos"

- **Source:** Images hosted on Cloudinary free tier
- **Management:** Photos uploaded via the Cloudinary dashboard (not through the site UI). Adding photos doesn't require a code redeploy — just upload to Cloudinary.
- **Display:** Grid/masonry layout of thumbnails within the react95 window. Clicking a photo opens a larger view (lightbox-style overlay or a new Win95 dialog window).
- **Implementation:**
  - Fetch image list from Cloudinary API (using a public read-only API key / unsigned fetch)
  - Use Cloudinary's transformation URLs for thumbnails and responsive sizing
  - Images organized in a single Cloudinary folder (e.g., `valentines/`)

### 3. To-Do List — "Our Bucket List"

- **Storage:** Firebase Firestore collection
- **Features:**
  - Add new items (text input + add button at the top)
  - Check off items (checkbox toggle — item gets a strikethrough style but stays visible in the list)
  - Uncheck items (toggle the checkbox back)
  - Delete items permanently (small delete/X button on each item, with a confirm prompt)
  - Both users can add, check, and delete items
- **Item schema:** `{ id, text, completed: boolean, createdAt: timestamp }`
- **Sort order:** Unchecked items first, then checked items. Within each group, sorted by creation date (newest first).
- **Real-time:** Use Firestore's `onSnapshot` for live updates — if one person checks an item, the other sees it update in real time.

### 4. Poems & Letters — "Love Letters"

- **Storage:** Firebase Firestore collection
- **Type:** Shared wall — all posted letters are immediately visible to both users
- **Features:**
  - Write a new letter (opens a compose form within the window)
  - View all letters in a scrollable list, newest first
  - Each letter displays: author name, date posted, and formatted content
  - **Permanent once posted** — no editing or deleting after submission
- **Compose form:**
  - Author selection: dropdown with "Jous" and "Geem" (prompted at compose time, not tied to session identity)
  - Content: textarea with **basic Markdown support** — bold (`**text**`), italic (`*text*`), and line breaks/paragraphs
  - A "Send" button to post the letter
- **Display:**
  - Letters rendered with Markdown formatting (use a lightweight Markdown renderer like `react-markdown`)
  - Each letter styled like a card or note, showing:
    - "From [Jous/Geem]"
    - Date (e.g., "February 14, 2026")
    - The letter content
- **Letter schema:** `{ id, author: "Jous" | "Geem", content: string, createdAt: timestamp }`

---

## Responsive Design / Mobile

### Strategy: Desktop-first, basic mobile adaptation

### Desktop (>768px)
- Full OS desktop experience: illustrated background, icon grid, centered fixed windows
- Icons displayed in a grid pattern on the desktop

### Mobile (<=768px)
- **No windows.** The OS desktop metaphor is simplified.
- Desktop background still visible
- Icons displayed in a 2-column grid (similar to PostHog mobile — see reference)
- Tapping an icon navigates to a **full-screen page** (not a window) with full responsiveness
- Each page has a back button/navigation to return to the desktop/icon grid
- react95 components still used for styling consistency but adapted for mobile-friendly sizing (larger tap targets, readable text)

---

## Firebase Schema

### Firestore Collections

```
todos/
  {autoId}
    text: string
    completed: boolean
    createdAt: Timestamp

letters/
  {autoId}
    author: "Jous" | "Geem"
    content: string       // Markdown-formatted text
    createdAt: Timestamp
```

### Security Rules
- Read/write open (no Firebase Auth) — the site's password gate is the only access control
- Optionally restrict to the Vercel domain via Firestore security rules or Firebase App Check for defense in depth

---

## Firebase Configuration

- Firebase project created manually (free Spark plan)
- Firebase config values stored as Vite environment variables (`VITE_FIREBASE_*`)
- Firestore initialized in a shared `firebase.ts` module

---

## Cloudinary Configuration

- Cloudinary account on free tier
- Cloud name and folder path stored as Vite environment variables (`VITE_CLOUDINARY_*`)
- Unsigned fetch using the Cloudinary Admin/Search API or a pre-configured list endpoint
- Transformation URLs used for thumbnails (e.g., `c_fill,w_300,h_300`)

---

## Project Structure

```
src/
  main.tsx                    # Entry point
  App.tsx                     # Router + password gate wrapper
  firebase.ts                 # Firebase initialization
  cloudinary.ts               # Cloudinary helpers
  theme.ts                    # Custom react95 theme (warm Valentine's variant)
  components/
    Desktop.tsx               # Desktop background + icon grid
    DesktopIcon.tsx            # Individual icon component
    Window.tsx                 # Reusable react95 window wrapper (title bar, close button)
    PasswordDialog.tsx         # Win95 login dialog
  pages/
    Home.tsx                   # Static poem/letter
    PhotoGallery.tsx           # Cloudinary gallery
    TodoList.tsx               # Interactive to-do list
    Letters.tsx                # Poems & letters shared wall
  hooks/
    useTodos.ts                # Firestore hook for to-do items
    useLetters.ts              # Firestore hook for letters
  assets/
    desktop-bg.png             # Placeholder / final illustrated background
    icons/                     # Custom Valentine's icons (SVG)
```

---

## Key Dependencies

```json
{
  "react": "^18",
  "react-dom": "^18",
  "react-router-dom": "^6",
  "react95": "^4",
  "styled-components": "^5",   // Required peer dep for react95
  "firebase": "^10",
  "react-markdown": "^9",
  "typescript": "^5"
}
```

---

## Deployment

- Vercel auto-deploys from the GitHub repo's `main` branch
- Environment variables set in Vercel dashboard:
  - `VITE_FIREBASE_API_KEY`
  - `VITE_FIREBASE_AUTH_DOMAIN`
  - `VITE_FIREBASE_PROJECT_ID`
  - `VITE_FIREBASE_STORAGE_BUCKET`
  - `VITE_FIREBASE_MESSAGING_SENDER_ID`
  - `VITE_FIREBASE_APP_ID`
  - `VITE_CLOUDINARY_CLOUD_NAME`
  - `VITE_CLOUDINARY_FOLDER`
- Build command: `npm run build`
- Output directory: `dist`

---

## Open Items / Placeholders

- [ ] Desktop background illustration asset (user will source)
- [ ] Custom Valentine's SVG icons for Home and Letters (user will source or we'll create simple ones)
- [ ] Actual poem/letter content for the Home page
- [ ] Firebase project creation and config values
- [ ] Cloudinary account setup and initial photo uploads
- [ ] The shared password value
