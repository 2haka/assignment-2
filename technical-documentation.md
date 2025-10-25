# Technical Documentation

This document describes the architecture, implementation details and design decisions of the personal portfolio web application for Assignment 2.

## File Structure

```
assignment-2/
├── index.html       # Main HTML file
├── css/
│   └── styles.css   # Site styling and responsive layout
├── js/
│   └── script.js    # JavaScript logic for interactivity
├── assets/
│   └── images/      # Placeholder images for projects and profile
├── docs/
│   ├── ai-usage-report.md
│   └── technical-documentation.md
└── README.md
```

## HTML Overview (`index.html`)

The document uses semantic HTML5 elements to improve accessibility and search engine optimisation:

- `<header>` contains the site title, greeting and a theme toggle button.
- `<nav>` holds buttons for navigating to different sections.  Each button has an `aria-label` for screen readers and is wired to scroll to the corresponding section.
- `<main>` wraps the primary content.  It includes the following `<section>` elements:
  - **About** – A summary of the portfolio owner’s background and a profile image.
  - **Projects** – A filterable and searchable list of projects.  Each project is marked up with an `<article>` element and a `data-category` attribute used for filtering.  A search input filters projects in real time.
  - **Skills** – A collapsible list of skills.  A button toggles the expanded/collapsed state and updates `aria-expanded` accordingly.
  - **Contact** – A simple form with name, email and message fields.  The form uses HTML5 validation (`required` attributes) and a custom submit handler for displaying a confirmation message.
  - **Quote** – A section that displays a random quote retrieved from the Quotable API.  A button triggers the fetch operation.
- `<footer>` displays a copyright notice.

Anchor links have been avoided because the navigation is handled programmatically via JavaScript.  Each section has an `id` attribute to facilitate smooth scrolling.

## Styling (`css/styles.css`)

The site uses CSS custom properties (`--bg`, `--ink`, etc.) to define colour schemes for light and dark modes.  A `dark` class on the `<body>` triggers the dark theme.  Media queries respect the user’s preferred colour scheme via `prefers-color-scheme`.  Layout is implemented using CSS grid for the project cards and flexbox for forms and navigation.  Transitions and animations include:

- Smooth fading and sliding effects on section headers when they become visible (via the IntersectionObserver in JavaScript).
- Colour transitions on hover for buttons and links.
- Animated expansion of the skills list.

Responsive breakpoints ensure that content stacks vertically on narrow screens while maintaining a multi‑column layout on larger devices.

## JavaScript (`js/script.js`)

All interactive behaviour is encapsulated in immediately invoked functions to avoid global namespace pollution.  The script performs the following tasks:

### Theme Toggle

1. It checks the saved theme in `localStorage` under the key `theme`.  If set to `dark` or `light`, the corresponding class is applied to `<body>`.
2. If no preference is saved, the script lets CSS honour the system preference (`prefers-color-scheme`).
3. The theme toggle button listens for `click` events.  Each click toggles between light and dark, updates the `<body>` class and persists the choice in `localStorage`.

### Personalized Greeting

1. On load, the script attempts to retrieve a `username` from `localStorage`.  If it does not exist, it prompts the user via `prompt()` (and trims whitespace) until a non‑empty name is entered.
2. The current hour determines the greeting (“Good morning”, “Good afternoon”, “Good evening”).
3. The greeting text updates the `<span id="greeting">` element in the header.

### Navigation

1. Navigation buttons in the `<nav>` element have `data-target` attributes corresponding to section IDs.
2. Event listeners call `scrollIntoView()` with smooth behaviour on the target section when clicked.

### Projects Filtering and Searching

1. Filter buttons carry `data-filter` attributes (e.g., “all”, “space”, “web”).  Clicking a button updates the `active` class and shows/hides project cards whose `data-category` matches the selected filter.
2. The search input listens for the `input` event.  As the user types, the script compares the text against each project’s title and description, showing or hiding cards accordingly.
3. When no projects match, a “No projects found” message appears.

### Skills Section

1. The skills list is hidden by default via CSS (using the `collapsed` class).
2. Clicking the toggle button toggles the `collapsed` class on the list and updates the `aria-expanded` attribute.  A CSS transition animates the height change.

### Quote Fetching

1. The quote section contains a “Get a Quote” button.  Clicking triggers an asynchronous function that calls `fetch('https://api.quotable.io/random')`.
2. A loading indicator displays while the request is pending.
3. On success, the quote text and author appear in a `<blockquote>` element.  On failure, a user‑friendly error message is shown and the button is re‑enabled.

### Contact Form Validation

1. The form uses the Constraint Validation API.  On submission, `event.preventDefault()` stops the default behaviour.
2. Each field’s validity is checked.  If invalid, the script adds an `error` class and inserts a small message below the field.
3. Once all fields are valid, the form resets, hides the form and displays a thank‑you message.  In a real deployment, the form could be wired to send data to a server.

### Intersection Observer for Animations

An `IntersectionObserver` monitors each section.  When a section enters the viewport, a `visible` class is added, triggering CSS transitions (e.g., fade‑in or slide‑in).  This approach is efficient because it runs outside the scroll handler and reduces the need for heavy computations on every scroll event.

## Dependencies

The project intentionally avoids external build tools and frameworks to keep the code portable and easy to audit.  All features are implemented using vanilla JavaScript and modern browser APIs.  If extended in future assignments, the modular structure will make it straightforward to introduce frameworks like React or Vue.

## Considerations for Future Enhancements

- **API Keys** – If you choose to fetch data from services that require authentication (e.g. Spotify or Twitter), ensure that keys are stored securely and not exposed in client‑side code.
- **Progressive Enhancement** – Users with JavaScript disabled should still see a functional site.  The current implementation uses JS only for enhancements; core content remains accessible.
- **Accessibility Auditing** – Tools like Lighthouse and the Web AIM contrast checker can identify remaining accessibility issues.  Iterate to improve keyboard navigation and screen reader support.
