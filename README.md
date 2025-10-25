# Personal Portfolio – Interactive Features (Assignment 2)

This repository contains the second assignment for the Web Development course at KFUPM.  It builds upon the personal portfolio created in Assignment 1 by adding interactive features, dynamic content, animations and AI‑assisted enhancements.  The objective is to demonstrate proficiency with modern web technologies while keeping the site accessible, performant and user‑friendly.

## Features

- **Dynamic greeting** – When the page loads, the site greets the visitor by name and time of day.  The name is stored in the browser’s local storage so that returning visitors see a personalized message.
- **Theme toggle** – A dark/light theme switcher respects the user’s system preference and remembers the chosen mode across sessions.
- **Project filter & search** – Projects can be filtered by category or searched in real time as the user types.  This makes it easier to navigate a growing list of portfolio entries.
- **Collapsible skills section** – A list of skills is hidden by default and can be expanded or collapsed to reduce visual clutter.
- **Live quote (AI integration)** – A button fetches a random inspirational quote from the [Quotable API](https://api.quotable.io/random) to highlight the user’s interests.  A fallback message appears if the network request fails.
- **Contact form with validation** – The form checks for valid input and displays inline error messages when necessary.  On successful submission, a friendly confirmation message is shown.
- **Smooth animations** – CSS transitions and JavaScript are used to fade in sections on scroll, animate button hovers and slide elements in/out for a polished user experience.
- **Accessible & semantic HTML** – Landmarks like `<header>`, `<nav>`, `<main>` and `<footer>` are used, and all interactive controls include `aria` attributes.  Colour contrast meets WCAG 2.2 guidelines.【30429725074629†L0-L4】

## Running Locally

1. Clone this repository or download the source code.
2. Open `index.html` in your favourite browser.  No build step is required – everything is plain HTML, CSS and JavaScript.
3. To see the dark/light theme respect your system preference, ensure that your operating system has a preferred colour scheme set.
4. If you wish to deploy the site, you can host the contents of the `assignment-2` directory on GitHub Pages, Netlify or any static file server.

## AI Usage Summary

AI tools were used sparingly to assist with coding and documentation.  A detailed log of prompts, outputs, modifications and lessons learned is provided in `docs/ai-usage-report.md`.  In summary:

- ChatGPT suggested improvements to the site’s accessibility and helped generate error messages and instructional copy.
- An AI code assistant proposed the initial structure for the JavaScript modules, which was refined for clarity and performance.
- The Quotable API integration was inspired by reading about AI‑assisted data sources that provide meaningful content without requiring complex authentication.

## License

This project is released under the MIT License.  Feel free to use it as a starting point for your own portfolio or coursework.
