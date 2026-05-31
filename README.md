# Algorithm Finder

Algorithm Finder is an interactive website that helps users identify which algorithm to use based on the type of problem they are trying to solve. The goal of this project is to make algorithm selection easier by connecting common problem patterns with the correct algorithmic approach.

Live Site: https://algorithms.z3rø.com

## Purpose

The purpose of Algorithm Finder is to help students and developers better understand when and why to use certain algorithms. Instead of only memorizing algorithms, users can explore problem scenarios, compare approaches, view explanations, and practice identifying the best algorithm for a given situation.

## Features

* Algorithm finder tool that recommends possible algorithms based on user choices
* Algorithm library with explanations, time complexity, and space complexity
* C++ code examples for each algorithm
* Practice section with algorithm-identification questions
* Modal popup for viewing and copying code examples
* Clean multi-file JavaScript structure for better maintainability
* Custom sparkle cursor effect for a personalized UI style
* Responsive layout for desktop and mobile screens

## Tech Stack

* HTML
* CSS
* JavaScript
* GitHub
* Cloudflare Pages / custom domain hosting

## Project Structure

```text
algorithm-finder/
├── index.html
├── css/
│   └── styles.css
├── js/
│   ├── app.js
│   ├── data/
│   │   ├── algorithms.js
│   │   ├── cpp-examples.js
│   │   └── practice-problems.js
│   └── effects/
│       └── sparkle-cursor.js
└── README.md
```

## What I Learned

While building this project, I practiced organizing JavaScript into separate files, improving UI structure, working with DOM manipulation, and designing a tool that connects computer science concepts to practical problem-solving. I also improved the user experience by adding a code popup, copy functionality, responsive styling, and a custom sparkle effect.

## Future Improvements

* Add more algorithms and problem categories
* Add Python and Java code examples
* Add difficulty levels for practice questions
* Track user score in the practice section
* Add search and filtering inside the algorithm library
* Improve recommendation logic using problem size and constraints

## How to Run Locally

1. Clone the repository:

```bash
git clone <your-repository-link>
```

2. Open the project folder.

3. Open `index.html` in your browser.

No backend or package installation is required.

## Author

Created by Alex

Portfolio: https://z3rø.com

Live Project: https://algorithms.z3rø.com
