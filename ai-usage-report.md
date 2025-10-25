# AI Usage Report

This report documents how AI tools were used during the development of Assignment 2 for the Web Development course.  It includes the prompts, outputs, modifications made to AI‑generated content, and reflections on the process.

## Tools Used

| Tool | Purpose |
| --- | --- |
| ChatGPT (OpenAI) | Generating ideas for interactive features, drafting user‑facing text such as error messages, and reviewing code for accessibility. |
| GitHub Copilot | Suggesting code snippets and function skeletons for JavaScript logic, particularly for event listeners and handling local storage. |
| Quotable API | Serving as an AI‑powered source of random quotes to display on the portfolio site.  This simple REST API returns inspirational quotes in JSON format, which are fetched asynchronously in the site’s code. |

## Prompts and Outputs

Below are examples of prompts used and the resulting outputs.  Only excerpts are shown; full transcripts are available upon request.

### Prompt 1: Improve Accessibility

> *Prompt:* “Review this HTML snippet of a portfolio site.  Suggest improvements for accessibility and semantic structure.  Provide brief code examples.”

*Output:* ChatGPT recommended using `<main>` and `<nav>` landmarks, adding `aria-label` attributes to buttons, and ensuring sufficient colour contrast.  It also advised adding `required` attributes to form fields and using appropriate heading levels.

*Modification:* The suggestions were incorporated into the final HTML structure.  Custom classes were added for visually hidden labels, and WAI‑ARIA attributes were used on toggle buttons.

### Prompt 2: Dynamic Greeting

> *Prompt:* “Provide JavaScript code to display a personalized greeting based on the time of day and store the user’s name in local storage.”

*Output:* Copilot generated a code snippet showing how to retrieve and set a username in local storage, determine the current hour, and construct a greeting.  It included event listeners for name input and storage access.

*Modification:* The code was simplified to reduce unnecessary complexity.  Validation was added to ensure that empty or whitespace‑only names are not saved.  The greeting was localized for English and Arabic readers.

### Prompt 3: Fetch Random Quote

> *Prompt:* “How can I fetch a random quote from a public API in JavaScript and display it on a web page, with error handling?”

*Output:* ChatGPT suggested using the `fetch` API with `async/await`, checking the response status, parsing the JSON, and updating the DOM.  It provided example code and described how to implement a fallback message.

*Modification:* The example was adapted to use the [Quotable API](https://api.quotable.io/random).  A loading indicator was implemented, and error handling was improved to display a user‑friendly message if the network request fails.

## Benefits of AI Assistance

AI tools accelerated development by suggesting boilerplate code and reminding the developer of best practices.  They provided inspiration for interactive features (such as filtering and searching) and helped refine user‑facing text.  In particular, ChatGPT’s emphasis on accessibility led to a more inclusive design, and Copilot’s code suggestions reduced the amount of time spent writing event handlers from scratch.

## Challenges Encountered

While AI tools were helpful, they occasionally produced verbose or inefficient code.  Some suggestions lacked proper error handling or did not consider edge cases (for example, checking for null values).  It was necessary to review and refactor AI‑generated snippets to ensure they met the assignment’s quality standards.  Additionally, integrating external APIs required manual research to find reliable data sources and understand their response formats.

## Learning Outcomes

This assignment reinforced the importance of understanding and controlling AI‑generated content.  Rather than accepting suggestions blindly, I learned to critically evaluate and adapt them to the project’s requirements.  I gained experience working with local storage, the Fetch API, and event‑driven interfaces, and I deepened my awareness of web accessibility guidelines.  The experience highlighted the potential of AI as a learning aid when combined with careful oversight.
