const { algorithms, cppExamples, practiceProblems, walkthroughs } = window.AlgorithmFinderData;

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
  resultVisualizeButton: "#result-visualize-button",
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
  nextQuestionButton: "#next-question-button",
  visualizerModal: "#visualizer-modal",
  visualizerOverlay: "#visualizer-overlay",
  visualizerDialog: ".visualizer-dialog",
  closeVisualizerButton: "#close-visualizer",
  walkthroughSwitcher: "#walkthrough-switcher",
  visualizerTitle: "#visualizer-title",
  visualizerSubtitle: "#visualizer-subtitle",
  visualizerStage: "#visualizer-stage",
  visualizerStepCounter: "#visualizer-step-counter",
  visualizerExplanation: "#visualizer-explanation",
  previousStepButton: "#previous-step",
  nextStepButton: "#next-step",
  restartWalkthroughButton: "#restart-walkthrough"
};

const dom = Object.fromEntries(
  Object.entries(selectors).map(([key, selector]) => [
    key,
    document.querySelector(selector)
  ])
);

const state = {
  currentPracticeIndex: -1,
  currentRecommendationKey: null,
  activeWalkthroughKey: null,
  walkthroughStep: 0,
  walkthroughTrace: [],
  visualizerOpener: null
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

function displayRecommendation(algorithmKey, inputSize) {
  const algorithm = algorithms[algorithmKey];

  dom.resultTitle.textContent = algorithm.name;
  dom.resultSummary.textContent = algorithm.summary;
  dom.resultTime.textContent = algorithm.time;
  dom.resultSpace.textContent = algorithm.space;
  dom.resultWhy.textContent = algorithm.why;
  dom.resultSizeAnalysis.textContent = getInputSizeAnalysis(inputSize, algorithm);
  dom.resultWhyNot.textContent = algorithm.whyNot;

  renderList(dom.resultExamples, algorithm.examples);

  state.currentRecommendationKey = algorithmKey;
  dom.resultVisualizeButton.classList.toggle("hidden", !walkthroughs[algorithmKey]);

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
  const actions = createElement("div", "algorithm-card-actions");
  const button = createElement("button", "code-toggle-button", "View C++ Example");

  tagRow.replaceChildren(
    ...algorithm.tags.map((tag) => createElement("span", "tag", tag))
  );

  button.addEventListener("click", () => {
    openCodeModal(algorithm.name, cppExamples[key] || "// C++ example coming soon.");
  });

  actions.append(button);

  if (walkthroughs[key]) {
    const visualizeButton = createElement("button", "visualize-button", "Visualize");
    visualizeButton.type = "button";
    visualizeButton.addEventListener("click", () => openWalkthrough(key, visualizeButton));
    actions.append(visualizeButton);
  }

  card.append(title, summary, tagRow, actions);
  return card;
}

function renderAlgorithmLibrary() {
  const cards = Object.entries(algorithms).map(([key, algorithm]) => {
    return buildAlgorithmCard(key, algorithm);
  });

  dom.algorithmLibrary.replaceChildren(...cards);
}

function getAlgorithmKey(algorithm) {
  const match = Object.entries(algorithms).find(([, candidate]) => candidate === algorithm);
  return match ? match[0] : null;
}

function createSvgElement(tagName, attributes = {}) {
  const element = document.createElementNS("http://www.w3.org/2000/svg", tagName);

  Object.entries(attributes).forEach(([name, value]) => {
    element.setAttribute(name, value);
  });

  return element;
}

function getEdgeKey(from, to) {
  return [from, to].sort().join("-");
}

function renderGraphStep(walkthrough, step) {
  const layout = {
    A: { x: 54, y: 132 },
    B: { x: 190, y: 46 },
    C: { x: 326, y: 132 }
  };
  const wrapper = createElement("div", "graph-walkthrough");
  const graphPanel = createElement("div", "graph-panel");
  const svg = createSvgElement("svg", {
    viewBox: "0 0 380 190",
    role: "img",
    "aria-label": "Undirected graph with A to B weight 1, B to C weight 1, and A to C weight 10"
  });
  const highlightedEdges = new Set(step.highlightedEdges || []);
  const finalEdges = new Set();

  if (step.finalPath) {
    for (let index = 0; index < step.finalPath.length - 1; index += 1) {
      finalEdges.add(getEdgeKey(step.finalPath[index], step.finalPath[index + 1]));
    }
  }

  walkthrough.graph.edges.forEach((edge) => {
    const start = layout[edge.from];
    const end = layout[edge.to];
    const edgeKey = getEdgeKey(edge.from, edge.to);
    const edgeClass = finalEdges.has(edgeKey)
      ? "graph-edge graph-edge-final"
      : highlightedEdges.has(edgeKey)
        ? "graph-edge graph-edge-active"
        : "graph-edge";
    const line = createSvgElement("line", {
      x1: start.x,
      y1: start.y,
      x2: end.x,
      y2: end.y,
      class: edgeClass
    });
    const weight = createSvgElement("text", {
      x: (start.x + end.x) / 2,
      y: (start.y + end.y) / 2 - (edgeKey === "A-C" ? 9 : 5),
      class: "edge-weight"
    });
    weight.textContent = String(edge.weight);
    svg.append(line, weight);
  });

  walkthrough.graph.nodes.forEach((node) => {
    const point = layout[node];
    const isActive = step.activeNode === node;
    const isFinal = step.finalPath && step.finalPath.includes(node);
    const isVisited = step.visited && step.visited.includes(node);
    const group = createSvgElement("g", {
      class: `graph-node${isFinal ? " graph-node-final" : isActive ? " graph-node-active" : isVisited ? " graph-node-visited" : ""}`
    });
    const circle = createSvgElement("circle", { cx: point.x, cy: point.y, r: 28 });
    const label = createSvgElement("text", { x: point.x, y: point.y + 6, class: "node-label" });
    const status = createSvgElement("text", { x: point.x, y: point.y + 48, class: "node-status" });
    label.textContent = node;
    status.textContent = isFinal ? "PATH" : isActive ? "ACTIVE" : isVisited ? "VISITED" : "";
    group.append(circle, label, status);
    svg.append(group);
  });

  graphPanel.append(svg);
  const details = createElement("div", "graph-state-panel");

  if (step.distances) {
    const distanceBlock = createElement("section", "state-block");
    distanceBlock.append(createElement("h3", "", "Tentative distances"));
    const distanceRow = createElement("div", "distance-row");
    Object.entries(step.distances).forEach(([node, distance]) => {
      const item = createElement("span", step.distanceUpdate && step.distanceUpdate.node === node ? "distance-chip updated" : "distance-chip");
      item.textContent = `${node}: ${distance}`;
      distanceRow.append(item);
    });
    distanceBlock.append(distanceRow);
    if (step.distanceUpdate) {
      distanceBlock.append(createElement("p", "update-callout", `${step.distanceUpdate.node} lowered: ${step.distanceUpdate.from} → ${step.distanceUpdate.to}`));
    }
    details.append(distanceBlock);
  }

  const queueBlock = createElement("section", "state-block");
  queueBlock.append(createElement("h3", "", walkthrough === walkthroughs.dijkstra ? "Priority queue" : "Queue (front → back)"));
  queueBlock.append(createElement("p", "state-value", step.queue.length ? step.queue.join("  ·  ") : "Empty"));
  details.append(queueBlock);

  const visitedBlock = createElement("section", "state-block");
  visitedBlock.append(createElement("h3", "", "Visited nodes"));
  visitedBlock.append(createElement("p", "state-value", step.visited.length ? step.visited.join(" → ") : "None yet"));
  details.append(visitedBlock);

  if (step.result) {
    details.append(createElement("p", "walkthrough-result", step.result));
  }

  wrapper.append(graphPanel, details);
  return wrapper;
}

function renderArrayCells(step, getClassName, getLabel) {
  const cells = createElement("div", "array-cells");

  step.values.forEach((value, index) => {
    const cell = createElement("div", `array-cell ${getClassName(index)}`.trim());
    const indexLabel = createElement("span", "array-index", `index ${index}`);
    const valueLabel = createElement("strong", "array-value", String(value));
    const statusLabel = createElement("span", "array-status", getLabel(index));
    cell.append(indexLabel, valueLabel, statusLabel);
    cells.append(cell);
  });

  return cells;
}

function renderBinarySearchStep(step) {
  const wrapper = createElement("div", "array-walkthrough");
  const rangeText = step.foundIndex === undefined
    ? `Current range: ${step.left}–${step.right}`
    : `Result: zero-based index ${step.foundIndex}`;
  wrapper.append(createElement("p", "array-summary", `Target: ${step.target} · ${rangeText}`));
  wrapper.append(renderArrayCells(
    step,
    (index) => {
      if (index === step.foundIndex) return "found";
      if (index === step.midpoint) return "midpoint";
      if (step.discarded.includes(index)) return "discarded";
      if (index >= step.left && index <= step.right) return "in-range";
      return "";
    },
    (index) => {
      if (index === step.foundIndex) return "FOUND";
      if (index === step.midpoint) return "MIDPOINT";
      if (step.discarded.includes(index)) return "DISCARDED";
      if (index >= step.left && index <= step.right) return "IN RANGE";
      return "";
    }
  ));
  if (step.result) wrapper.append(createElement("p", "walkthrough-result", step.result));
  return wrapper;
}

function renderSlidingWindowStep(step) {
  const wrapper = createElement("div", "array-walkthrough");
  const end = step.start + step.windowSize - 1;
  const summary = createElement("div", "window-summary");
  const changes = step.outgoing === null
    ? "Initial window"
    : `Outgoing: ${step.outgoing} · Incoming: ${step.incoming}`;
  summary.append(
    createElement("span", "", `Window: indices ${step.start}–${end}`),
    createElement("span", "", changes),
    createElement("span", "", `Current sum: ${step.sum}`),
    createElement("span", "best-sum", `Best sum: ${step.best}`)
  );
  wrapper.append(summary);
  wrapper.append(renderArrayCells(
    step,
    (index) => index >= step.start && index <= end ? "in-window" : "outside-window",
    (index) => {
      if (index === step.start) return "WINDOW START";
      if (index === end) return "WINDOW END";
      if (index > step.start && index < end) return "IN WINDOW";
      return "OUTSIDE";
    }
  ));
  if (step.result) wrapper.append(createElement("p", "walkthrough-result", step.result));
  return wrapper;
}

function renderWalkthroughSwitcher() {
  const buttons = Object.entries(walkthroughs).map(([key, walkthrough]) => {
    const button = createElement("button", "walkthrough-tab", walkthrough.title.replace(" Algorithm", ""));
    const isActive = key === state.activeWalkthroughKey;
    button.type = "button";
    button.setAttribute("aria-pressed", String(isActive));
    if (isActive) button.classList.add("active");
    button.addEventListener("click", () => activateWalkthrough(key));
    return button;
  });
  dom.walkthroughSwitcher.replaceChildren(...buttons);
}

function renderWalkthroughStep() {
  const walkthrough = walkthroughs[state.activeWalkthroughKey];
  const step = state.walkthroughTrace[state.walkthroughStep];
  let visualization;

  if (walkthrough.type === "graph") {
    visualization = renderGraphStep(walkthrough, step);
  } else if (walkthrough.type === "array") {
    visualization = renderBinarySearchStep(step);
  } else {
    visualization = renderSlidingWindowStep(step);
  }

  dom.visualizerTitle.textContent = walkthrough.title;
  dom.visualizerSubtitle.textContent = walkthrough.subtitle;
  dom.visualizerStage.replaceChildren(visualization);
  dom.visualizerStepCounter.textContent = `Step ${state.walkthroughStep + 1} of ${state.walkthroughTrace.length}`;
  dom.visualizerExplanation.textContent = step.explanation;
  dom.previousStepButton.disabled = state.walkthroughStep === 0;
  dom.nextStepButton.disabled = state.walkthroughStep === state.walkthroughTrace.length - 1;
  renderWalkthroughSwitcher();
}

function activateWalkthrough(key) {
  state.activeWalkthroughKey = key;
  state.walkthroughTrace = walkthroughs[key].generateTrace();
  state.walkthroughStep = 0;
  renderWalkthroughStep();
}

function openWalkthrough(key, opener) {
  if (!walkthroughs[key]) return;

  if (!dom.codeModal.classList.contains("hidden")) closeCodeModal();
  state.visualizerOpener = opener || document.activeElement;
  activateWalkthrough(key);
  dom.visualizerModal.classList.remove("hidden");
  dom.visualizerModal.setAttribute("aria-hidden", "false");
  document.body.classList.add("modal-open");
  dom.closeVisualizerButton.focus();
}

function closeWalkthrough() {
  dom.visualizerModal.classList.add("hidden");
  dom.visualizerModal.setAttribute("aria-hidden", "true");
  document.body.classList.remove("modal-open");

  if (state.visualizerOpener && document.contains(state.visualizerOpener)) {
    state.visualizerOpener.focus();
  }
}

function changeWalkthroughStep(amount) {
  const nextStep = Math.min(
    Math.max(state.walkthroughStep + amount, 0),
    state.walkthroughTrace.length - 1
  );

  if (nextStep !== state.walkthroughStep) {
    state.walkthroughStep = nextStep;
    renderWalkthroughStep();
  }
}

function restartWalkthrough() {
  state.walkthroughTrace = walkthroughs[state.activeWalkthroughKey].generateTrace();
  state.walkthroughStep = 0;
  renderWalkthroughStep();
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

  const algorithmKey = getAlgorithmKey(recommendAlgorithm(answers));
  displayRecommendation(algorithmKey, answers.inputSize);
}

function togglePracticeAnswer() {
  const isHidden = dom.practiceAnswer.classList.toggle("hidden");
  dom.showAnswerButton.textContent = isHidden ? "Show Answer" : "Hide Answer";
}

function handleKeydown(event) {
  const visualizerIsOpen = !dom.visualizerModal.classList.contains("hidden");

  if (visualizerIsOpen && event.key === "Escape") {
    event.preventDefault();
    closeWalkthrough();
    return;
  }

  if (visualizerIsOpen && event.key === "ArrowLeft") {
    event.preventDefault();
    changeWalkthroughStep(-1);
    return;
  }

  if (visualizerIsOpen && event.key === "ArrowRight") {
    event.preventDefault();
    changeWalkthroughStep(1);
    return;
  }

  if (visualizerIsOpen && event.key === "Tab") {
    const focusable = Array.from(dom.visualizerDialog.querySelectorAll(
      'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])'
    ));
    const first = focusable[0];
    const last = focusable[focusable.length - 1];

    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
    return;
  }

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
  dom.resultVisualizeButton.addEventListener("click", () => {
    openWalkthrough(state.currentRecommendationKey, dom.resultVisualizeButton);
  });
  dom.closeVisualizerButton.addEventListener("click", closeWalkthrough);
  dom.visualizerOverlay.addEventListener("click", closeWalkthrough);
  dom.previousStepButton.addEventListener("click", () => changeWalkthroughStep(-1));
  dom.nextStepButton.addEventListener("click", () => changeWalkthroughStep(1));
  dom.restartWalkthroughButton.addEventListener("click", restartWalkthrough);
  document.addEventListener("keydown", handleKeydown);
}

function initApp() {
  bindEvents();
  renderAlgorithmLibrary();
  loadPracticeProblem();
}

initApp();
