window.AlgorithmFinderData = window.AlgorithmFinderData || {};

(function registerWalkthroughs(data) {
  const graphNodes = ["A", "B", "C"];
  const graphEdgeDefinitions = [
    { key: "AB", from: "A", to: "B" },
    { key: "BC", from: "B", to: "C" },
    { key: "AC", from: "A", to: "C" }
  ];
  const presets = {
    graph: { AB: 1, BC: 1, AC: 10, start: "A", destination: "C" },
    binarySearch: { values: [2, 4, 7, 11, 15, 19, 23, 28], target: 19 },
    slidingWindow: { values: [2, 1, 5, 1, 3, 2, 4, 1], windowSize: 3 }
  };

  function clone(value) {
    return JSON.parse(JSON.stringify(value));
  }

  function createGraph(input) {
    return {
      nodes: [...graphNodes],
      edges: graphEdgeDefinitions.map((edge) => ({
        from: edge.from,
        to: edge.to,
        weight: input[edge.key]
      }))
    };
  }

  function createAdjacencyList(graph) {
    const adjacency = Object.fromEntries(graph.nodes.map((node) => [node, []]));

    graph.edges.forEach((edge) => {
      adjacency[edge.from].push({ node: edge.to, weight: edge.weight });
      adjacency[edge.to].push({ node: edge.from, weight: edge.weight });
    });

    return adjacency;
  }

  function getEdgeWeight(graph, from, to) {
    return graph.edges.find((edge) => (
      (edge.from === from && edge.to === to) ||
      (edge.from === to && edge.to === from)
    )).weight;
  }

  function getPathMetrics(graph, path) {
    let totalWeight = 0;

    for (let index = 0; index < path.length - 1; index += 1) {
      totalWeight += getEdgeWeight(graph, path[index], path[index + 1]);
    }

    return { edgeCount: Math.max(path.length - 1, 0), totalWeight };
  }

  function reconstructPath(parents, start, destination) {
    const path = [];
    let current = destination;

    while (current !== undefined) {
      path.unshift(current);
      if (current === start) return path;
      current = parents[current];
    }

    return [];
  }

  function formatPriorityQueue(queue) {
    return [...queue]
      .sort((a, b) => a.distance - b.distance)
      .map((item) => `${item.node} (${item.distance})`);
  }

  function createBfsTrace(input = presets.graph) {
    const graph = createGraph(input);
    const adjacency = createAdjacencyList(graph);
    const queue = [input.start];
    const visited = new Set([input.start]);
    const parents = {};
    const trace = [{
      graph,
      explanation: `Start at ${input.start}. Mark it visited and place it in the FIFO queue.`,
      activeNode: input.start,
      queue: [...queue],
      visited: [...visited],
      highlightedEdges: []
    }];

    if (input.start === input.destination) {
      const metrics = getPathMetrics(graph, [input.start]);
      trace.push({
        graph,
        explanation: `${input.start} is already the destination, so the route uses no edges.`,
        activeNode: null,
        queue: [],
        visited: [...visited],
        highlightedEdges: [],
        finalPath: [input.start],
        routeMetrics: metrics,
        result: `Route: ${input.start} · ${metrics.edgeCount} edges · total weight ${metrics.totalWeight}`
      });
      return trace;
    }

    let found = false;

    while (queue.length && !found) {
      const node = queue.shift();
      trace.push({
        graph,
        explanation: `Remove ${node} from the queue and inspect its neighbors.`,
        activeNode: node,
        queue: [...queue],
        visited: [...visited],
        highlightedEdges: []
      });

      for (const neighbor of adjacency[node]) {
        if (visited.has(neighbor.node)) continue;

        visited.add(neighbor.node);
        parents[neighbor.node] = node;
        queue.push(neighbor.node);
        trace.push({
          graph,
          explanation: `Discover ${neighbor.node} from ${node}. Mark it visited and add it to the back of the queue.`,
          activeNode: node,
          queue: [...queue],
          visited: [...visited],
          highlightedEdges: [`${node}-${neighbor.node}`]
        });

        if (neighbor.node === input.destination) {
          found = true;
          break;
        }
      }
    }

    const path = reconstructPath(parents, input.start, input.destination);
    const metrics = getPathMetrics(graph, path);
    trace.push({
      graph,
      explanation: `BFS found ${path.join(" → ")} with the fewest edges. Edge weights do not affect its choice.`,
      activeNode: null,
      queue: [...queue],
      visited: [...visited],
      highlightedEdges: [],
      finalPath: path,
      routeMetrics: metrics,
      result: `Route: ${path.join(" → ")} · ${metrics.edgeCount} ${metrics.edgeCount === 1 ? "edge" : "edges"} · total weight ${metrics.totalWeight}`
    });

    return trace;
  }

  function createDijkstraTrace(input = presets.graph) {
    const graph = createGraph(input);

    if (graph.edges.some((edge) => edge.weight < 0)) {
      throw new RangeError("Dijkstra’s algorithm requires every edge weight to be zero or greater.");
    }

    const adjacency = createAdjacencyList(graph);
    const distances = Object.fromEntries(graph.nodes.map((node) => [node, node === input.start ? 0 : Infinity]));
    const parents = {};
    const visited = new Set();
    const queue = [{ node: input.start, distance: 0 }];
    const displayDistances = () => Object.fromEntries(
      graph.nodes.map((node) => [node, Number.isFinite(distances[node]) ? distances[node] : "∞"])
    );
    const trace = [{
      graph,
      explanation: `Start at ${input.start}. Its distance is 0; every other distance is unknown (∞).`,
      activeNode: input.start,
      distances: displayDistances(),
      queue: formatPriorityQueue(queue),
      visited: [],
      highlightedEdges: []
    }];

    while (queue.length) {
      queue.sort((a, b) => a.distance - b.distance);
      const current = queue.shift();

      if (current.distance !== distances[current.node] || visited.has(current.node)) continue;

      visited.add(current.node);
      trace.push({
        graph,
        explanation: `${current.node} has the smallest tentative distance (${current.distance}), so remove it from the priority queue.`,
        activeNode: current.node,
        distances: displayDistances(),
        queue: formatPriorityQueue(queue),
        visited: [...visited],
        highlightedEdges: []
      });

      if (current.node === input.destination) break;

      for (const neighbor of adjacency[current.node]) {
        if (visited.has(neighbor.node)) continue;

        const candidate = current.distance + neighbor.weight;
        const previous = distances[neighbor.node];

        if (candidate < previous) {
          distances[neighbor.node] = candidate;
          parents[neighbor.node] = current.node;
          queue.push({ node: neighbor.node, distance: candidate });
          const previousLabel = Number.isFinite(previous) ? previous : "∞";
          trace.push({
            graph,
            explanation: `Going from ${current.node} to ${neighbor.node} costs ${current.distance} + ${neighbor.weight} = ${candidate}, lowering ${neighbor.node} from ${previousLabel} to ${candidate}.`,
            activeNode: current.node,
            distances: displayDistances(),
            queue: formatPriorityQueue(queue),
            visited: [...visited],
            highlightedEdges: [`${current.node}-${neighbor.node}`],
            distanceUpdate: { node: neighbor.node, from: previousLabel, to: candidate }
          });
        }
      }
    }

    const path = reconstructPath(parents, input.start, input.destination);
    const metrics = getPathMetrics(graph, path);
    trace.push({
      graph,
      explanation: `Final cheapest path: ${path.join(" → ")}. Dijkstra minimizes total edge weight.`,
      activeNode: null,
      distances: displayDistances(),
      queue: [],
      visited: [...visited],
      highlightedEdges: [],
      finalPath: path,
      routeMetrics: metrics,
      result: `Route: ${path.join(" → ")} · ${metrics.edgeCount} ${metrics.edgeCount === 1 ? "edge" : "edges"} · total weight ${metrics.totalWeight}`
    });

    return trace;
  }

  function createBinarySearchTrace(input = presets.binarySearch) {
    const values = [...input.values];
    const target = input.target;
    const trace = [];
    const discarded = new Set();
    let left = 0;
    let right = values.length - 1;

    trace.push({
      explanation: `Search for ${target} across indices ${left} through ${right}.`,
      values,
      target,
      left,
      right,
      midpoint: null,
      discarded: []
    });

    while (left <= right) {
      const midpoint = Math.floor((left + right) / 2);
      const midpointValue = values[midpoint];

      if (midpointValue === target) {
        trace.push({
          explanation: `The midpoint is index ${midpoint} (value ${midpointValue}), which matches the target.`,
          values,
          target,
          left,
          right,
          midpoint,
          discarded: [...discarded],
          foundIndex: midpoint,
          result: `Found ${target} at zero-based index ${midpoint}`
        });
        return trace;
      }

      if (midpointValue < target) {
        const oldLeft = left;
        for (let index = oldLeft; index <= midpoint; index += 1) discarded.add(index);
        left = midpoint + 1;
        trace.push({
          explanation: `Midpoint ${midpointValue} is less than ${target}, so discard indices ${oldLeft}–${midpoint} and search the right half.`,
          values,
          target,
          left,
          right,
          midpoint,
          discarded: [...discarded]
        });
      } else {
        const oldRight = right;
        for (let index = midpoint; index <= oldRight; index += 1) discarded.add(index);
        right = midpoint - 1;
        trace.push({
          explanation: `Midpoint ${midpointValue} is greater than ${target}, so discard indices ${midpoint}–${oldRight} and search the left half.`,
          values,
          target,
          left,
          right,
          midpoint,
          discarded: [...discarded]
        });
      }
    }

    trace.push({
      explanation: `The search range is empty (${left} > ${right}), so ${target} is not in the list.`,
      values,
      target,
      left,
      right,
      midpoint: null,
      discarded: values.map((_, index) => index),
      notFound: true,
      result: "Target not found"
    });

    return trace;
  }

  function createSlidingWindowTrace(input = presets.slidingWindow) {
    const values = [...input.values];
    const windowSize = input.windowSize;
    let currentSum = values.slice(0, windowSize).reduce((sum, value) => sum + value, 0);
    let bestSum = currentSum;
    let bestStart = 0;
    const trace = [{
      explanation: `Build the first window. Its sum is ${currentSum}, so the best starts at ${currentSum}.`,
      values,
      windowSize,
      start: 0,
      sum: currentSum,
      best: bestSum,
      bestStart,
      outgoing: null,
      incoming: null
    }];

    for (let start = 1; start <= values.length - windowSize; start += 1) {
      const outgoing = values[start - 1];
      const incoming = values[start + windowSize - 1];
      currentSum = currentSum - outgoing + incoming;
      let bestChanged = false;

      if (currentSum > bestSum) {
        bestSum = currentSum;
        bestStart = start;
        bestChanged = true;
      }

      trace.push({
        explanation: `Slide one place: remove ${outgoing}, add ${incoming}, and update the running sum to ${currentSum}. ${bestChanged ? "This is the new best sum." : `The best remains ${bestSum}.`}`,
        values,
        windowSize,
        start,
        sum: currentSum,
        best: bestSum,
        bestStart,
        outgoing,
        incoming
      });
    }

    const finalStep = trace[trace.length - 1];
    finalStep.result = `Largest sum of ${windowSize} consecutive values: ${bestSum}`;
    finalStep.explanation += ` Final best window: indices ${bestStart}–${bestStart + windowSize - 1}.`;
    return trace;
  }

  data.walkthroughs = {
    dijkstra: {
      title: "Dijkstra’s Algorithm",
      subtitle: "Cheapest weighted route on the A–B–C graph",
      type: "graph",
      inputGroup: "graph",
      preset: clone(presets.graph),
      generateTrace: createDijkstraTrace
    },
    bfs: {
      title: "Breadth-First Search",
      subtitle: "Fewest-edge route on the A–B–C graph",
      type: "graph",
      inputGroup: "graph",
      preset: clone(presets.graph),
      generateTrace: createBfsTrace
    },
    binarySearch: {
      title: "Binary Search",
      subtitle: "Find a target in a sorted list",
      type: "array",
      inputGroup: "binarySearch",
      preset: clone(presets.binarySearch),
      generateTrace: createBinarySearchTrace
    },
    slidingWindow: {
      title: "Fixed-Size Sliding Window",
      subtitle: "Find the largest fixed-window sum",
      type: "window",
      inputGroup: "slidingWindow",
      preset: clone(presets.slidingWindow),
      generateTrace: createSlidingWindowTrace
    }
  };
})(window.AlgorithmFinderData);
