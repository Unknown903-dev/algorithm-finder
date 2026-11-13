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
  walkthroughInputForm: "#walkthrough-input-form",
  walkthroughInputHelp: "#walkthrough-input-help",
  walkthroughInputStatus: "#walkthrough-input-status",
  walkthroughInputFields: "#walkthrough-input-fields",
  resetWalkthroughInputButton: "#reset-walkthrough-input",
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

function cloneInput(input) {
  return JSON.parse(JSON.stringify(input));
}

const state = {
  currentPracticeIndex: -1,
  currentRecommendationKey: null,
  activeWalkthroughKey: null,
  walkthroughStep: 0,
  walkthroughTrace: [],
  visualizerOpener: null,
  walkthroughInputs: {
    graph: cloneInput(walkthroughs.bfs.preset),
    binarySearch: cloneInput(walkthroughs.binarySearch.preset),
    slidingWindow: cloneInput(walkthroughs.slidingWindow.preset),
    sortingComparison: cloneInput(walkthroughs.sortingComparison.preset)
  },
  lastValidInputs: Object.fromEntries(
    Object.entries(walkthroughs).map(([key, walkthrough]) => [key, cloneInput(walkthrough.preset)])
  )
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

  if (["mergeSort", "quickSort"].includes(key)) {
    const compareButton = createElement("button", "visualize-button compare-sorting-button", "Compare Sorting Algorithms");
    compareButton.type = "button";
    compareButton.addEventListener("click", () => openWalkthrough("sortingComparison", compareButton));
    actions.append(compareButton);
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

function formatVisualNumber(value) {
  const number = Number(value);

  if (!Number.isFinite(number)) return String(value);
  const absolute = Math.abs(number);
  if (absolute !== 0 && (absolute >= 1000000 || absolute < 0.001)) {
    return number.toExponential(2);
  }

  return Number(number.toFixed(4)).toLocaleString("en-US", { maximumFractionDigits: 4 });
}

function createGraphComparison(step) {
  const weights = Object.fromEntries(
    step.graph.edges.map((edge) => [getEdgeKey(edge.from, edge.to).replace("-", ""), edge.weight])
  );
  const graphInput = {
    ...weights,
    start: step.finalPath[0],
    destination: step.finalPath.at(-1)
  };
  const comparison = createElement("section", "state-block route-comparison");
  const bfsResult = walkthroughs.bfs.generateTrace(graphInput).at(-1).result;
  let dijkstraResult;

  try {
    dijkstraResult = walkthroughs.dijkstra.generateTrace(graphInput).at(-1).result;
  } catch (error) {
    dijkstraResult = "Unavailable: Dijkstra requires nonnegative weights.";
  }

  comparison.append(
    createElement("h3", "", "Route comparison"),
    createElement("p", "", `BFS — ${bfsResult}`),
    createElement("p", "", `Dijkstra — ${dijkstraResult}`)
  );
  return comparison;
}

function createInputField({ name, label, value, type = "text", hint = "", attributes = {} }) {
  const wrapper = createElement("div", "walkthrough-field");
  const labelElement = createElement("label", "", label);
  const input = createElement("input", "walkthrough-input");
  const error = createElement("p", "field-error");
  const errorId = `${name}-input-error`;

  labelElement.htmlFor = name;
  input.id = name;
  input.name = name;
  input.type = type;
  input.value = value;
  input.setAttribute("aria-describedby", errorId);
  Object.entries(attributes).forEach(([attribute, attributeValue]) => {
    input.setAttribute(attribute, attributeValue);
  });
  error.id = errorId;
  error.dataset.errorFor = name;

  wrapper.append(labelElement, input);
  if (hint) wrapper.append(createElement("span", "field-hint", hint));
  wrapper.append(error);
  return wrapper;
}

function createSelectField({ name, label, value, options }) {
  const wrapper = createElement("div", "walkthrough-field");
  const labelElement = createElement("label", "", label);
  const select = createElement("select", "walkthrough-input");
  const error = createElement("p", "field-error");
  const errorId = `${name}-input-error`;

  labelElement.htmlFor = name;
  select.id = name;
  select.name = name;
  select.setAttribute("aria-describedby", errorId);
  options.forEach((optionValue) => {
    const option = createElement("option", "", optionValue);
    option.value = optionValue;
    option.selected = optionValue === value;
    select.append(option);
  });
  error.id = errorId;
  error.dataset.errorFor = name;
  wrapper.append(labelElement, select, error);
  return wrapper;
}

function getRandomSortingValues() {
  return Array.from({ length: 8 }, () => Math.floor(Math.random() * 30) - 9);
}

function fillSortingPreset(presetKey, label) {
  const walkthrough = walkthroughs.sortingComparison;
  const values = presetKey === "random"
    ? getRandomSortingValues()
    : walkthrough.inputPresets[presetKey];

  dom.walkthroughInputForm.elements.values.value = values.join(", ");
  renderInputErrors({});
  dom.walkthroughInputStatus.textContent = `${label} preset loaded. Select Apply Input to compare it.`;
}

function createSortingPresetControls() {
  const wrapper = createElement("div", "sorting-preset-field");
  const label = createElement("span", "preset-label", "Presets");
  const buttons = createElement("div", "sorting-preset-buttons");
  const presets = [
    ["random", "Random"],
    ["alreadySorted", "Already Sorted"],
    ["reverseSorted", "Reverse Sorted"],
    ["manyDuplicates", "Many Duplicates"]
  ];

  presets.forEach(([key, buttonLabel]) => {
    const button = createElement("button", "sorting-preset-button", buttonLabel);
    button.type = "button";
    button.addEventListener("click", () => fillSortingPreset(key, buttonLabel));
    buttons.append(button);
  });
  wrapper.append(label, buttons);
  return wrapper;
}

function renderWalkthroughInputForm(errors = {}) {
  const walkthrough = walkthroughs[state.activeWalkthroughKey];
  const input = state.walkthroughInputs[walkthrough.inputGroup];
  const fields = [];

  if (walkthrough.type === "graph") {
    dom.walkthroughInputHelp.textContent = "Edit the three undirected edge weights, then compare algorithms with the same start and destination.";
    fields.push(
      createInputField({ name: "AB", label: "A–B weight", value: input.AB, type: "number", attributes: { step: "any" } }),
      createInputField({ name: "BC", label: "B–C weight", value: input.BC, type: "number", attributes: { step: "any" } }),
      createInputField({ name: "AC", label: "A–C weight", value: input.AC, type: "number", attributes: { step: "any" } }),
      createSelectField({ name: "start", label: "Start node", value: input.start, options: ["A", "B", "C"] }),
      createSelectField({ name: "destination", label: "Destination", value: input.destination, options: ["A", "B", "C"] })
    );
  } else if (walkthrough.type === "sortingComparison") {
    dom.walkthroughInputHelp.textContent = "Choose a preset or enter 1–16 numbers. The same array is applied to both algorithms.";
    fields.push(
      createSortingPresetControls(),
      createInputField({
        name: "values",
        label: "Shared starting array",
        value: input.values.join(", "),
        hint: "Numbers may be negative or repeated"
      })
    );
  } else if (walkthrough.type === "array") {
    dom.walkthroughInputHelp.textContent = "Enter numbers in nondecreasing order, separated by commas or spaces.";
    fields.push(
      createInputField({
        name: "values",
        label: "Sorted number list",
        value: input.values.join(", "),
        hint: "Example: 2, 4, 7, 11"
      }),
      createInputField({ name: "target", label: "Target", value: input.target, type: "number", attributes: { step: "any" } })
    );
  } else {
    dom.walkthroughInputHelp.textContent = "Enter any numbers, then choose a whole-number window size.";
    fields.push(
      createInputField({
        name: "values",
        label: "Number list",
        value: input.values.join(", "),
        hint: "Negative values are supported"
      }),
      createInputField({
        name: "windowSize",
        label: "Window size",
        value: input.windowSize,
        type: "number",
        attributes: { min: "1", max: String(input.values.length), step: "1" }
      })
    );
  }

  dom.walkthroughInputFields.replaceChildren(...fields);
  renderInputErrors(errors);
}

function parseNumberList(value) {
  if (Array.isArray(value)) return { values: [...value], error: null };

  const trimmed = String(value).trim();
  if (!trimmed) return { values: [], error: "Enter at least one number." };

  const values = trimmed.split(/[\s,]+/).map(Number);
  if (values.some((number) => !Number.isFinite(number))) {
    return { values: [], error: "Use only numbers separated by commas or spaces." };
  }

  return { values, error: null };
}

function normalizeWalkthroughInput(key, source) {
  const walkthrough = walkthroughs[key];
  const errors = {};

  if (walkthrough.type === "graph") {
    const input = {
      AB: Number(source.AB),
      BC: Number(source.BC),
      AC: Number(source.AC),
      start: source.start,
      destination: source.destination
    };

    ["AB", "BC", "AC"].forEach((edge) => {
      if (source[edge] === "" || !Number.isFinite(input[edge])) {
        errors[edge] = "Enter a valid edge weight.";
      } else if (key === "dijkstra" && input[edge] < 0) {
        errors[edge] = "Dijkstra requires a nonnegative weight.";
      }
    });

    return { input, errors };
  }

  const parsedValues = parseNumberList(source.values);
  if (parsedValues.error) errors.values = parsedValues.error;

  if (walkthrough.type === "array") {
    const target = Number(source.target);
    if (source.target === "" || !Number.isFinite(target)) errors.target = "Enter a valid target number.";
    if (!parsedValues.error && parsedValues.values.some((value, index) => index > 0 && value < parsedValues.values[index - 1])) {
      errors.values = "Binary search requires the list to be sorted from smallest to largest.";
    }
    return { input: { values: parsedValues.values, target }, errors };
  }

  if (walkthrough.type === "sortingComparison") {
    if (!parsedValues.error && parsedValues.values.length > 16) {
      errors.values = "Use at most 16 values so both bar charts remain readable.";
    }
    return { input: { values: parsedValues.values }, errors };
  }

  const windowSize = Number(source.windowSize);
  if (source.windowSize === "" || !Number.isInteger(windowSize)) {
    errors.windowSize = "Window size must be a whole number.";
  } else if (!parsedValues.error && (windowSize < 1 || windowSize > parsedValues.values.length)) {
    errors.windowSize = `Choose a window size from 1 to ${parsedValues.values.length}.`;
  }
  return { input: { values: parsedValues.values, windowSize }, errors };
}

function getWalkthroughInputDraft() {
  const fields = dom.walkthroughInputForm.elements;
  const walkthrough = walkthroughs[state.activeWalkthroughKey];

  if (walkthrough.type === "graph") {
    return {
      AB: fields.AB.value,
      BC: fields.BC.value,
      AC: fields.AC.value,
      start: fields.start.value,
      destination: fields.destination.value
    };
  }

  if (walkthrough.type === "array") {
    return { values: fields.values.value, target: fields.target.value };
  }


  if (walkthrough.type === "sortingComparison") {
    return { values: fields.values.value };
  }

  return { values: fields.values.value, windowSize: fields.windowSize.value };
}

function renderInputErrors(errors) {
  dom.walkthroughInputFields.querySelectorAll(".field-error").forEach((errorElement) => {
    const fieldName = errorElement.dataset.errorFor;
    const message = errors[fieldName] || "";
    const input = dom.walkthroughInputForm.elements[fieldName];
    errorElement.textContent = message;
    if (input) input.setAttribute("aria-invalid", String(Boolean(message)));
  });

  const errorCount = Object.keys(errors).length;
  dom.walkthroughInputStatus.textContent = errorCount
    ? "Fix the highlighted input. The last valid walkthrough is still shown."
    : "";
  dom.walkthroughInputStatus.classList.toggle("error", errorCount > 0);
}

function applyWalkthroughInput(event) {
  event.preventDefault();
  const key = state.activeWalkthroughKey;
  const walkthrough = walkthroughs[key];
  const { input, errors } = normalizeWalkthroughInput(key, getWalkthroughInputDraft());

  if (Object.keys(errors).length) {
    renderInputErrors(errors);
    return;
  }

  state.walkthroughInputs[walkthrough.inputGroup] = cloneInput(input);
  state.lastValidInputs[key] = cloneInput(input);
  state.walkthroughTrace = walkthrough.generateTrace(input);
  state.walkthroughStep = 0;
  renderWalkthroughStep();
  renderWalkthroughInputForm();
  dom.walkthroughInputStatus.textContent = "Input applied. Walkthrough restarted at step one.";
}

function resetWalkthroughInput() {
  const key = state.activeWalkthroughKey;
  const walkthrough = walkthroughs[key];
  const preset = cloneInput(walkthrough.preset);

  state.walkthroughInputs[walkthrough.inputGroup] = preset;
  if (walkthrough.inputGroup === "graph") {
    state.lastValidInputs.bfs = cloneInput(walkthroughs.bfs.preset);
    state.lastValidInputs.dijkstra = cloneInput(walkthroughs.dijkstra.preset);
  } else {
    state.lastValidInputs[key] = cloneInput(preset);
  }
  state.walkthroughTrace = walkthrough.generateTrace(preset);
  state.walkthroughStep = 0;
  renderWalkthroughInputForm();
  dom.walkthroughInputStatus.textContent = "Original example restored.";
  renderWalkthroughStep();
}

function renderGraphStep(walkthrough, step) {
  const layout = {
    A: { x: 54, y: 132 },
    B: { x: 190, y: 46 },
    C: { x: 326, y: 132 }
  };
  const wrapper = createElement("div", "graph-walkthrough");
  const graphPanel = createElement("div", "graph-panel");
  const graph = step.graph;
  const edgeDescription = graph.edges
    .map((edge) => `${edge.from} to ${edge.to} weight ${edge.weight}`)
    .join(", ");
  const svg = createSvgElement("svg", {
    viewBox: "0 0 380 190",
    role: "img",
    "aria-label": `Undirected graph with ${edgeDescription}`
  });
  const highlightedEdges = new Set(
    (step.highlightedEdges || []).map((edge) => getEdgeKey(...edge.split("-")))
  );
  const finalEdges = new Set();

  if (step.finalPath) {
    for (let index = 0; index < step.finalPath.length - 1; index += 1) {
      finalEdges.add(getEdgeKey(step.finalPath[index], step.finalPath[index + 1]));
    }
  }

  graph.edges.forEach((edge) => {
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
    weight.textContent = formatVisualNumber(edge.weight);
    svg.append(line, weight);
  });

  graph.nodes.forEach((node) => {
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
    details.append(createGraphComparison(step));
  }

  wrapper.append(graphPanel, details);
  return wrapper;
}

function renderArrayCells(step, getClassName, getLabel) {
  const cells = createElement("div", "array-cells");
  cells.style.setProperty("--cell-count", Math.min(step.values.length, 8));

  step.values.forEach((value, index) => {
    const cell = createElement("div", `array-cell ${getClassName(index)}`.trim());
    const indexLabel = createElement("span", "array-index", `index ${index}`);
    const valueLabel = createElement("strong", "array-value", formatVisualNumber(value));
    const statusLabel = createElement("span", "array-status", getLabel(index));
    cell.append(indexLabel, valueLabel, statusLabel);
    cells.append(cell);
  });

  return cells;
}

function renderBinarySearchStep(step) {
  const wrapper = createElement("div", "array-walkthrough");
  const rangeText = step.notFound
    ? "Search range exhausted"
    : step.foundIndex === undefined
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
  if (step.result) {
    wrapper.append(createElement("p", step.notFound ? "walkthrough-result not-found" : "walkthrough-result", step.result));
  }
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
    createElement("span", "best-sum", `Best: ${step.best} at indices ${step.bestStart}–${step.bestStart + step.windowSize - 1}`)
  );
  wrapper.append(summary);
  wrapper.append(renderArrayCells(
    step,
    (index) => {
      const inWindow = index >= step.start && index <= end;
      const inBestWindow = index >= step.bestStart && index < step.bestStart + step.windowSize;
      if (inWindow && inBestWindow) return "in-window best-window";
      if (inWindow) return "in-window";
      if (inBestWindow) return "best-window";
      return "outside-window";
    },
    (index) => {
      const isBest = index >= step.bestStart && index < step.bestStart + step.windowSize;
      if (index === step.start) return isBest ? "WINDOW START · BEST" : "WINDOW START";
      if (index === end) return isBest ? "WINDOW END · BEST" : "WINDOW END";
      if (index > step.start && index < end) return isBest ? "IN WINDOW · BEST" : "IN WINDOW";
      if (isBest) return "BEST WINDOW";
      return "OUTSIDE";
    }
  ));
  if (step.result) wrapper.append(createElement("p", "walkthrough-result", step.result));
  return wrapper;
}

function getSortingBarHeight(values, value) {
  const minimum = Math.min(...values);
  const maximum = Math.max(...values);
  if (minimum === maximum) return 88;
  return 38 + ((value - minimum) / (maximum - minimum)) * 92;
}

function getSortingBarState(event, index, algorithm) {
  const states = [];
  const inActiveRange = event.activeRange && index >= event.activeRange[0] && index <= event.activeRange[1];

  if (inActiveRange) states.push(algorithm === "merge" ? "merge-active" : "partition-active");
  if (event.comparedIndices.includes(index)) states.push("sorting-compared");
  if (event.swappedIndices?.includes(index)) states.push("sorting-swapped");
  if (event.pivotIndex === index) states.push("sorting-pivot");
  if (event.writeTarget?.storage === "array" && event.writeTarget.index === index) states.push("sorting-written");
  return states;
}

function getSortingBarLabel(event, index, algorithm) {
  const labels = [];
  if (event.pivotIndex === index) labels.push("PIVOT");
  if (event.comparedIndices.includes(index)) labels.push("COMPARE");
  if (event.swappedIndices?.includes(index)) labels.push("SWAP");
  if (event.writeTarget?.storage === "array" && event.writeTarget.index === index) labels.push("WRITE");
  if (!labels.length && event.activeRange && index >= event.activeRange[0] && index <= event.activeRange[1]) {
    labels.push(algorithm === "merge" ? "MERGE" : "PARTITION");
  }
  return labels.join(" · ");
}

function renderSortingBars(event, algorithm) {
  const bars = createElement("div", "sorting-bars");
  bars.style.setProperty("--sorting-count", event.values.length);

  event.values.forEach((value, index) => {
    const states = getSortingBarState(event, index, algorithm);
    const wrapper = createElement("div", `sorting-bar-item ${states.join(" ")}`.trim());
    const bar = createElement("div", "sorting-bar");
    const valueLabel = createElement("strong", "sorting-bar-value", formatVisualNumber(value));
    const indexLabel = createElement("span", "sorting-bar-index", String(index));
    const stateLabel = createElement("span", "sorting-bar-state", getSortingBarLabel(event, index, algorithm));
    bar.style.height = `${getSortingBarHeight(event.values, value)}px`;
    wrapper.setAttribute("aria-label", `Index ${index}, value ${value}${stateLabel.textContent ? `, ${stateLabel.textContent.toLowerCase()}` : ""}`);
    bar.append(valueLabel);
    wrapper.append(bar, indexLabel, stateLabel);
    bars.append(wrapper);
  });
  return bars;
}

function renderMergeTemporaryStorage(event) {
  const section = createElement("div", "temporary-storage");
  const label = createElement("span", "temporary-label", "Temporary storage");
  const cells = createElement("div", "temporary-cells");
  cells.style.setProperty("--sorting-count", event.temporary.length);

  event.temporary.forEach((value, index) => {
    const isWrite = event.writeTarget?.storage === "temporary" && event.writeTarget.index === index;
    const cell = createElement("span", isWrite ? "temporary-cell sorting-written" : "temporary-cell", value === null ? "—" : formatVisualNumber(value));
    cell.setAttribute("aria-label", `Temporary index ${index}: ${value === null ? "empty" : value}${isWrite ? ", current write" : ""}`);
    cells.append(cell);
  });
  section.append(label, cells);
  return section;
}

function renderSortingPanel({ title, algorithm, event, eventNumber, eventCount }) {
  const panel = createElement("section", `sorting-panel ${algorithm}-panel`);
  const header = createElement("header", "sorting-panel-header");
  const heading = createElement("h3", "", title);
  const progress = createElement("span", event.finished ? "sorting-finished" : "sorting-event-progress", event.finished ? "Finished" : `Event ${eventNumber} of ${eventCount}`);
  const counters = createElement("div", "sorting-counters");
  counters.append(
    createElement("span", "", `Comparisons: ${event.comparisons}`),
    createElement("span", "", `Writes: ${event.writes}`)
  );
  header.append(heading, progress);
  panel.append(header, counters);
  if (algorithm === "quick") {
    panel.append(createElement("p", "pivot-rule", "Pivot rule: last value in each active partition (Lomuto partitioning)."));
  } else {
    panel.append(createElement("p", "pivot-rule merge-rule", "Merge rule: compare the front values and take the left value first on ties."));
  }
  panel.append(renderSortingBars(event, algorithm));
  if (algorithm === "merge") panel.append(renderMergeTemporaryStorage(event));
  panel.append(createElement("p", "sorting-event-explanation", event.explanation));
  if (event.finished) {
    panel.append(createElement("p", "sorting-result", `Sorted result: [${event.values.join(", ")}]`));
  }
  return panel;
}

function renderSortingComparisonStep(step) {
  const wrapper = createElement("div", "sorting-comparison");
  const definitions = createElement("div", "sorting-counter-definitions");
  definitions.append(
    createElement("strong", "", "What the counters include"),
    createElement("p", "", "A comparison is one value-to-value check. Merge Sort writes count assignments to temporary storage and copies back to the array. Quick Sort writes count assignments to the main array; each two-value swap counts as 2 writes.")
  );
  const panels = createElement("div", "sorting-panels");
  panels.append(
    renderSortingPanel({
      title: "Merge Sort",
      algorithm: "merge",
      event: step.merge,
      eventNumber: step.mergeEvent,
      eventCount: step.mergeEventCount
    }),
    renderSortingPanel({
      title: "Quick Sort",
      algorithm: "quick",
      event: step.quick,
      eventNumber: step.quickEvent,
      eventCount: step.quickEventCount
    })
  );
  wrapper.append(definitions, panels);
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
  } else if (walkthrough.type === "sortingComparison") {
    visualization = renderSortingComparisonStep(step);
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
  const walkthrough = walkthroughs[key];
  const sharedInput = state.walkthroughInputs[walkthrough.inputGroup];
  const { input, errors } = normalizeWalkthroughInput(key, sharedInput);

  state.activeWalkthroughKey = key;
  if (Object.keys(errors).length) {
    state.walkthroughTrace = walkthrough.generateTrace(state.lastValidInputs[key]);
  } else {
    state.lastValidInputs[key] = cloneInput(input);
    state.walkthroughTrace = walkthrough.generateTrace(input);
  }
  state.walkthroughStep = 0;
  renderWalkthroughStep();
  renderWalkthroughInputForm(errors);
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
  const key = state.activeWalkthroughKey;
  state.walkthroughTrace = walkthroughs[key].generateTrace(state.lastValidInputs[key]);
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
  const isEditingInput = ["INPUT", "SELECT", "TEXTAREA"].includes(event.target?.tagName);

  if (visualizerIsOpen && event.key === "Escape") {
    event.preventDefault();
    closeWalkthrough();
    return;
  }

  if (visualizerIsOpen && !isEditingInput && event.key === "ArrowLeft") {
    event.preventDefault();
    changeWalkthroughStep(-1);
    return;
  }

  if (visualizerIsOpen && !isEditingInput && event.key === "ArrowRight") {
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
  dom.walkthroughInputForm.addEventListener("submit", applyWalkthroughInput);
  dom.resetWalkthroughInputButton.addEventListener("click", resetWalkthroughInput);
  document.addEventListener("keydown", handleKeydown);
}

function initApp() {
  bindEvents();
  renderAlgorithmLibrary();
  loadPracticeProblem();
}

initApp();
