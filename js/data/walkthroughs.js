window.AlgorithmFinderData = window.AlgorithmFinderData || {};

(function registerWalkthroughs(data) {
  const graph = {
    nodes: ["A", "B", "C"],
    edges: [
      { from: "A", to: "B", weight: 1 },
      { from: "B", to: "C", weight: 1 },
      { from: "A", to: "C", weight: 10 }
    ]
  };

  function createDijkstraTrace() {
    return [
      {
        explanation: "Start at A. Its distance is 0; every other distance is unknown (∞).",
        activeNode: "A",
        distances: { A: 0, B: "∞", C: "∞" },
        queue: ["A (0)"],
        visited: [],
        highlightedEdges: []
      },
      {
        explanation: "Visit A. The direct edges set B to 1 and C to 10.",
        activeNode: "A",
        distances: { A: 0, B: 1, C: 10 },
        queue: ["B (1)", "C (10)"],
        visited: ["A"],
        highlightedEdges: ["A-B", "A-C"]
      },
      {
        explanation: "B has the smallest tentative distance, so remove B (1) from the priority queue.",
        activeNode: "B",
        distances: { A: 0, B: 1, C: 10 },
        queue: ["C (10)"],
        visited: ["A", "B"],
        highlightedEdges: ["A-B"]
      },
      {
        explanation: "Going through B costs 1 + 1 = 2, lowering C’s tentative distance from 10 to 2.",
        activeNode: "B",
        distances: { A: 0, B: 1, C: 2 },
        queue: ["C (2)", "C (10, stale)"],
        visited: ["A", "B"],
        highlightedEdges: ["A-B", "B-C"],
        distanceUpdate: { node: "C", from: 10, to: 2 }
      },
      {
        explanation: "C (2) is now the cheapest queue entry. Reaching the target finalizes the best route.",
        activeNode: "C",
        distances: { A: 0, B: 1, C: 2 },
        queue: ["C (10, stale)"],
        visited: ["A", "B", "C"],
        highlightedEdges: ["A-B", "B-C"]
      },
      {
        explanation: "Final path: A → B → C. Dijkstra minimizes total weight, so the cost is 2 instead of 10.",
        activeNode: null,
        distances: { A: 0, B: 1, C: 2 },
        queue: [],
        visited: ["A", "B", "C"],
        highlightedEdges: ["A-B", "B-C"],
        finalPath: ["A", "B", "C"],
        result: "Cheapest path: A → B → C (total weight 2)"
      }
    ];
  }

  function createBfsTrace() {
    return [
      {
        explanation: "Start at A. Mark it visited and place it in the FIFO queue.",
        activeNode: "A",
        queue: ["A"],
        visited: ["A"],
        highlightedEdges: []
      },
      {
        explanation: "Remove A from the queue and inspect all neighbors one edge away.",
        activeNode: "A",
        queue: [],
        visited: ["A"],
        highlightedEdges: ["A-B", "A-C"]
      },
      {
        explanation: "Discover B and C from A. They are visited once and added to the queue in level order.",
        activeNode: "A",
        queue: ["B", "C"],
        visited: ["A", "B", "C"],
        highlightedEdges: ["A-B", "A-C"]
      },
      {
        explanation: "C was reached directly from A in one edge, so BFS can reconstruct A → C.",
        activeNode: "C",
        queue: ["B"],
        visited: ["A", "B", "C"],
        highlightedEdges: ["A-C"],
        finalPath: ["A", "C"],
        result: "Fewest-edge route: A → C (1 edge)"
      },
      {
        explanation: "BFS minimizes the number of edges, not total weight. It chooses A → C (1 edge), while Dijkstra chooses A → B → C (weight 2).",
        activeNode: null,
        queue: [],
        visited: ["A", "B", "C"],
        highlightedEdges: ["A-C"],
        finalPath: ["A", "C"],
        result: "Fewest-edge route: A → C (1 edge)"
      }
    ];
  }

  function createBinarySearchTrace() {
    const values = [2, 4, 7, 11, 15, 19, 23, 28];

    return [
      {
        explanation: "Search for 19 across indices 0 through 7.",
        values,
        target: 19,
        left: 0,
        right: 7,
        midpoint: null,
        discarded: []
      },
      {
        explanation: "The midpoint is index 3 (value 11). Because 11 < 19, discard indices 0–3.",
        values,
        target: 19,
        left: 4,
        right: 7,
        midpoint: 3,
        discarded: [0, 1, 2, 3]
      },
      {
        explanation: "The new midpoint is index 5. Its value is 19, so the target is found.",
        values,
        target: 19,
        left: 4,
        right: 7,
        midpoint: 5,
        discarded: [0, 1, 2, 3],
        foundIndex: 5,
        result: "Found 19 at zero-based index 5"
      }
    ];
  }

  function createSlidingWindowTrace() {
    const values = [2, 1, 5, 1, 3, 2, 4, 1];
    const windows = [
      { start: 0, sum: 8, best: 8, outgoing: null, incoming: null },
      { start: 1, sum: 7, best: 8, outgoing: 2, incoming: 1 },
      { start: 2, sum: 9, best: 9, outgoing: 1, incoming: 3 },
      { start: 3, sum: 6, best: 9, outgoing: 5, incoming: 2 },
      { start: 4, sum: 9, best: 9, outgoing: 1, incoming: 4 },
      { start: 5, sum: 7, best: 9, outgoing: 3, incoming: 1 }
    ];

    return windows.map((windowState, index) => ({
      explanation: index === 0
        ? "Build the first window [2, 1, 5]. Its sum is 8, so the best starts at 8."
        : `Slide one place: remove ${windowState.outgoing}, add ${windowState.incoming}, and update the running sum to ${windowState.sum}.${windowState.best === windowState.sum ? " This matches or sets the best sum." : " The best remains 9."}`,
      values,
      windowSize: 3,
      ...windowState,
      result: index === windows.length - 1 ? "Largest sum of 3 consecutive values: 9" : null
    }));
  }

  data.walkthroughs = {
    dijkstra: {
      title: "Dijkstra’s Algorithm",
      subtitle: "Cheapest weighted path from A to C",
      type: "graph",
      graph,
      generateTrace: createDijkstraTrace
    },
    bfs: {
      title: "Breadth-First Search",
      subtitle: "Fewest-edge route from A to C",
      type: "graph",
      graph,
      generateTrace: createBfsTrace
    },
    binarySearch: {
      title: "Binary Search",
      subtitle: "Find 19 in a sorted array",
      type: "array",
      generateTrace: createBinarySearchTrace
    },
    slidingWindow: {
      title: "Fixed-Size Sliding Window",
      subtitle: "Largest sum of three consecutive values",
      type: "window",
      generateTrace: createSlidingWindowTrace
    }
  };
})(window.AlgorithmFinderData);
