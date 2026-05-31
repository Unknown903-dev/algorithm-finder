const { algorithms, cppExamples, practiceProblems } = window.AlgorithmFinderData;

const selectors = {
  form: "#algorithm-form",
  resultCard: "#result-card",
  resultTitle: "#result-title",
  resultSummary: "#result-summary",
  resultTime: "#result-time",
  resultSpace: "#result-space",
  resultWhy: "#result-why",
  resultSizeAnalysis: "#result-size-analysis",
  resultExamples: "#result-examples",
  resultWhyNot: "#result-why-not",
  algorithmLibrary: "#algorithm-library",
  codeModal: "#code-modal",
  codeModalOverlay: "#code-modal-overlay",
  closeCodeModalButton: "#close-code-modal",
  copyCodeButton: "#copy-code-button",
  copyStatus: "#copy-status",
  codeModalTitle: "#code-modal-title",
  codeModalCode: "#code-modal-code",
  practiceProblem: "#practice-problem",
  practiceAnswer: "#practice-answer",
  showAnswerButton: "#show-answer-button",
  nextQuestionButton: "#next-question-button"
};

const dom = Object.fromEntries(
  Object.entries(selectors).map(([key, selector]) => [
    key,
    document.querySelector(selector)
  ])
);

const state = {
  currentPracticeIndex: -1
};

function getSelectedConditions() {
  return Array.from(document.querySelectorAll("input[name='condition']:checked"), (box) => box.value);
}

function hasCondition(conditions, condition) {
  return conditions.includes(condition);
}

function recommendAlgorithm({ goal, inputType, conditions, inputSize }) {
  if (goal === "dependencies" || inputType === "tasks") {
    return algorithms.topologicalSort;
  }

  if (goal === "shortestPath" && hasCondition(conditions, "weighted")) {
    return algorithms.dijkstra;
  }

  if (
    goal === "shortestPath" &&
    (hasCondition(conditions, "equalCost") || inputType === "grid" || inputType === "graph")
  ) {
    return algorithms.bfs;
  }

  if (goal === "allCombinations") {
    return algorithms.backtracking;
  }

  if (hasCondition(conditions, "overlap") || goal === "optimize") {
    return algorithms.dynamicProgramming;
  }

  if (hasCondition(conditions, "continuous")) {
    return algorithms.slidingWindow;
  }

  if (hasCondition(conditions, "minMaxRepeated")) {
    return algorithms.heap;
  }

  if (
    goal === "count" ||
    hasCondition(conditions, "fastLookup") ||
    hasCondition(conditions, "duplicates")
  ) {
    return algorithms.hashMap;
  }

  if (goal === "find" && hasCondition(conditions, "sorted")) {
    return algorithms.binarySearch;
  }

  if (hasCondition(conditions, "sorted") && ["array", "string"].includes(inputType)) {
    return algorithms.twoPointers;
  }

  if (goal === "sort") {
    return algorithms.sorting;
  }

  if (["graph", "tree"].includes(inputType)) {
    return algorithms.dfs;
  }

  if (inputSize === "small") {
    return algorithms.bruteForce;
  }

  return algorithms.hashMap;
}

function getInputSizeAnalysis(inputSize, algorithm) {
  const riskyForLargeInput = new Set([
    "Brute Force",
    "Backtracking",
    "Floyd-Warshall Algorithm"
  ]);

  const expensiveButUseful = new Set([
    "Dynamic Programming",
    "Bellman-Ford Algorithm",
    "Segment Tree",
    "Fenwick Tree / Binary Indexed Tree"
  ]);

  const analyses = {
    small:
      "Because the input is small, a simpler solution may be acceptable. Brute force can be useful here because it is easier to write and debug, even if it is not the most efficient option.",
    medium:
      algorithm.name === "Brute Force"
        ? "For medium input sizes, brute force may start becoming risky. If the solution has nested loops, check whether it is O(n²) or worse and consider optimizing."
        : `For medium input sizes, ${algorithm.name} is likely acceptable if the implementation matches the expected complexity. Still compare it against simpler approaches before overcomplicating the solution.`,
    large: getLargeInputAnalysis(algorithm, riskyForLargeInput, expensiveButUseful),
    huge: getHugeInputAnalysis(algorithm, riskyForLargeInput)
  };

  return analyses[inputSize] ||
    "Input size helps determine whether the recommended algorithm is practical. Larger inputs require lower time complexity.";
}

function getLargeInputAnalysis(algorithm, riskyForLargeInput, expensiveButUseful) {
  if (riskyForLargeInput.has(algorithm.name)) {
    return `${algorithm.name} may be too slow for large input sizes. For n around 100,000 or more, avoid O(n²), O(2ⁿ), and O(n!) solutions unless the constraints are smaller than they look.`;
  }

  if (expensiveButUseful.has(algorithm.name)) {
    return `${algorithm.name} can work for large inputs, but only if the number of states, edges, or queries is manageable. Always check the exact constraints.`;
  }

  return `Because the input is large, ${algorithm.name} is a better choice than brute force if it keeps the solution around O(n), O(log n), or O(n log n).`;
}

function getHugeInputAnalysis(algorithm, riskyForLargeInput) {
  if (riskyForLargeInput.has(algorithm.name)) {
    return `${algorithm.name} is probably not acceptable for huge input sizes. For n near 1,000,000 or more, you usually need O(n), O(log n), or a very efficient O(n log n) approach.`;
  }

  if (["Sorting", "Merge Sort", "Quick Sort"].includes(algorithm.name)) {
    return "For huge input sizes, O(n log n) sorting may still be acceptable, but O(n) or O(log n) solutions are preferred when possible.";
  }

  return `For huge input sizes, ${algorithm.name} is reasonable only if it avoids nested loops over the full input. The safest target is usually O(n), O(log n), or carefully optimized O(n log n).`;
}

function createElement(tagName, className, textContent) {
  const element = document.createElement(tagName);

  if (className) {
    element.className = className;
  }

  if (textContent) {
    element.textContent = textContent;
  }

  return element;
}

function renderList(parent, items) {
  parent.replaceChildren(
    ...items.map((item) => createElement("li", "", item))
  );
}

function displayRecommendation(algorithm, inputSize) {
  dom.resultTitle.textContent = algorithm.name;
  dom.resultSummary.textContent = algorithm.summary;
  dom.resultTime.textContent = algorithm.time;
  dom.resultSpace.textContent = algorithm.space;
  dom.resultWhy.textContent = algorithm.why;
  dom.resultSizeAnalysis.textContent = getInputSizeAnalysis(inputSize, algorithm);
  dom.resultWhyNot.textContent = algorithm.whyNot;

  renderList(dom.resultExamples, algorithm.examples);

  dom.resultCard.classList.remove("hidden");
  dom.resultCard.scrollIntoView({ behavior: "smooth", block: "start" });
}

function openCodeModal(algorithmName, codeText) {
  dom.codeModalTitle.textContent = algorithmName;
  dom.codeModalCode.textContent = codeText;
  dom.copyStatus.textContent = "";

  dom.codeModal.classList.remove("hidden");
  document.body.classList.add("modal-open");
}

function closeCodeModal() {
  dom.codeModal.classList.add("hidden");
  document.body.classList.remove("modal-open");
}

async function copyCodeToClipboard() {
  try {
    await navigator.clipboard.writeText(dom.codeModalCode.textContent);
    dom.copyStatus.textContent = "Copied!";
  } catch (error) {
    dom.copyStatus.textContent = "Copy failed. Select the code and copy manually.";
  }
}

function buildAlgorithmCard(key, algorithm) {
  const card = createElement("article", "algorithm-card");
  const title = createElement("h3", "", algorithm.name);
  const summary = createElement("p", "", algorithm.summary);
  const tagRow = createElement("div", "tag-row");
  const button = createElement("button", "code-toggle-button", "View C++ Example");

  tagRow.replaceChildren(
    ...algorithm.tags.map((tag) => createElement("span", "tag", tag))
  );

  button.addEventListener("click", () => {
    openCodeModal(algorithm.name, cppExamples[key] || "// C++ example coming soon.");
  });

  card.append(title, summary, tagRow, button);
  return card;
}

function renderAlgorithmLibrary() {
  const cards = Object.entries(algorithms).map(([key, algorithm]) => {
    return buildAlgorithmCard(key, algorithm);
  });

  dom.algorithmLibrary.replaceChildren(...cards);
}

function getNextPracticeIndex() {
  if (practiceProblems.length <= 1) {
    return 0;
  }

  let nextIndex = Math.floor(Math.random() * practiceProblems.length);

  while (nextIndex === state.currentPracticeIndex) {
    nextIndex = Math.floor(Math.random() * practiceProblems.length);
  }

  return nextIndex;
}

function loadPracticeProblem() {
  state.currentPracticeIndex = getNextPracticeIndex();

  const selectedProblem = practiceProblems[state.currentPracticeIndex];

  dom.practiceProblem.textContent = selectedProblem.problem;
  dom.practiceAnswer.textContent = selectedProblem.answer;
  dom.practiceAnswer.classList.add("hidden");
  dom.showAnswerButton.textContent = "Show Answer";
}

function handleFormSubmit(event) {
  event.preventDefault();

  const formData = new FormData(dom.form);
  const answers = {
    goal: formData.get("goal"),
    inputType: formData.get("inputType"),
    inputSize: formData.get("inputSize"),
    conditions: getSelectedConditions()
  };

  displayRecommendation(recommendAlgorithm(answers), answers.inputSize);
}

function togglePracticeAnswer() {
  const isHidden = dom.practiceAnswer.classList.toggle("hidden");
  dom.showAnswerButton.textContent = isHidden ? "Show Answer" : "Hide Answer";
}

function handleKeydown(event) {
  if (event.key === "Escape" && !dom.codeModal.classList.contains("hidden")) {
    closeCodeModal();
  }
}

function bindEvents() {
  dom.form.addEventListener("submit", handleFormSubmit);
  dom.showAnswerButton.addEventListener("click", togglePracticeAnswer);
  dom.nextQuestionButton.addEventListener("click", loadPracticeProblem);
  dom.closeCodeModalButton.addEventListener("click", closeCodeModal);
  dom.codeModalOverlay.addEventListener("click", closeCodeModal);
  dom.copyCodeButton.addEventListener("click", copyCodeToClipboard);
  document.addEventListener("keydown", handleKeydown);
}

function initApp() {
  bindEvents();
  renderAlgorithmLibrary();
  loadPracticeProblem();
}

initApp();
