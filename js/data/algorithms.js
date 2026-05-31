window.AlgorithmFinderData = window.AlgorithmFinderData || {};

window.AlgorithmFinderData.algorithms = {
  binarySearch: {
    name: "Binary Search",
    summary: "Best when searching inside sorted data.",
    time: "O(log n)",
    space: "O(1)",
    why: "Binary search works because the input is sorted. Each step removes half of the remaining search space.",
    whyNot: "Linear search also works, but it is slower at O(n). A hash map may work too, but it uses extra memory and is unnecessary if the data is already sorted.",
    examples: [
      "Find a target in a sorted array",
      "Find the first or last occurrence",
      "Search answer space for the smallest valid value"
    ],
    tags: ["sorted", "search", "divide"]
  },

  hashMap: {
    name: "Hash Map / Set",
    summary: "Best when you need fast lookup, counting, or duplicate detection.",
    time: "O(n)",
    space: "O(n)",
    why: "A hash map stores values so you can check, count, or group items quickly in average O(1) time per operation.",
    whyNot: "Brute force may use less memory, but it is usually slower. For large inputs, the speed improvement is usually worth the extra space.",
    examples: ["Two Sum", "Count duplicates", "Group anagrams", "Track frequencies"],
    tags: ["lookup", "counting", "duplicates"]
  },

  bfs: {
    name: "Breadth-First Search",
    summary: "Best for shortest path when each move has the same cost.",
    time: "O(V + E)",
    space: "O(V)",
    why: "BFS explores level by level. In an unweighted graph, grid, or maze, the first time you reach a node is through the shortest path.",
    whyNot: "DFS can find a path, but it does not guarantee the shortest path. Dijkstra is unnecessary unless edges have different weights.",
    examples: [
      "Shortest path in a maze",
      "Minimum number of moves",
      "Level-order traversal",
      "Shortest path in an unweighted graph"
    ],
    tags: ["graph", "grid", "shortest path"]
  },

  dfs: {
    name: "Depth-First Search",
    summary: "Best for exploring paths, connected components, trees, and graph structure.",
    time: "O(V + E)",
    space: "O(V)",
    why: "DFS explores as far as possible down one path before backtracking. It is useful when you need to visit everything or explore structure deeply.",
    whyNot: "DFS does not guarantee shortest path in an unweighted graph. If the problem asks for minimum steps, BFS is usually better.",
    examples: ["Count connected components", "Detect cycles", "Explore islands in a grid", "Tree traversal"],
    tags: ["graph", "tree", "explore"]
  },

  dijkstra: {
    name: "Dijkstra's Algorithm",
    summary: "Best for shortest path when paths have different non-negative costs.",
    time: "O((V + E) log V)",
    space: "O(V)",
    why: "Dijkstra uses a priority queue to always expand the currently cheapest known path first.",
    whyNot: "BFS only works for shortest path when every edge has equal cost. Bellman-Ford is better if negative edge weights exist.",
    examples: ["Shortest driving route", "Network routing", "Weighted graph pathfinding"],
    tags: ["weighted graph", "priority queue", "shortest path"]
  },

  bellmanFord: {
    name: "Bellman-Ford Algorithm",
    summary: "Best for shortest path when negative edge weights may exist.",
    time: "O(VE)",
    space: "O(V)",
    why: "Bellman-Ford relaxes every edge repeatedly, allowing it to handle negative weights and detect negative cycles.",
    whyNot: "Dijkstra is faster, but Dijkstra can fail with negative weights. Use Bellman-Ford when negative edges are possible.",
    examples: ["Shortest path with negative edges", "Currency arbitrage detection", "Negative cycle detection"],
    tags: ["negative weights", "graph", "shortest path"]
  },

  floydWarshall: {
    name: "Floyd-Warshall Algorithm",
    summary: "Best for finding shortest paths between every pair of nodes.",
    time: "O(V³)",
    space: "O(V²)",
    why: "Floyd-Warshall compares every possible intermediate node to compute all-pairs shortest paths.",
    whyNot: "It is expensive for large graphs. If you only need one source shortest path, Dijkstra or Bellman-Ford is usually better.",
    examples: ["All-pairs shortest path", "Small dense graphs", "Transitive closure"],
    tags: ["all pairs", "graph", "dynamic programming"]
  },

  aStar: {
    name: "A* Search",
    summary: "Best for pathfinding when you have a useful heuristic.",
    time: "Depends on heuristic",
    space: "O(V)",
    why: "A* combines actual cost so far with an estimated cost to the goal, helping it search toward the target more directly.",
    whyNot: "If you do not have a good heuristic, A* may not be better than Dijkstra. For equal-cost grids, BFS may be simpler.",
    examples: ["Game pathfinding", "Map navigation", "Grid-based shortest path with heuristic"],
    tags: ["heuristic", "pathfinding", "graph"]
  },

  slidingWindow: {
    name: "Sliding Window",
    summary: "Best for continuous subarrays or substrings.",
    time: "O(n)",
    space: "O(1) or O(k)",
    why: "Sliding window keeps track of a moving range instead of recalculating every possible subarray or substring.",
    whyNot: "Brute force checks every range and is usually O(n²). Sliding window avoids repeated work when the problem involves contiguous sections.",
    examples: ["Longest substring without repeating characters", "Maximum sum subarray of size k", "Minimum window substring"],
    tags: ["subarray", "substring", "window"]
  },

  prefixSum: {
    name: "Prefix Sum",
    summary: "Best when you need repeated range sums or subarray calculations.",
    time: "O(n) build, O(1) query",
    space: "O(n)",
    why: "Prefix sum stores cumulative totals so range sums can be calculated quickly without repeatedly looping through the same values.",
    whyNot: "Sliding window is better when the window moves with a condition. Prefix sum is better when you need many range sum queries.",
    examples: ["Range sum queries", "Subarray sum equals k", "2D matrix region sums"],
    tags: ["range sum", "subarray", "precompute"]
  },

  twoPointers: {
    name: "Two Pointers",
    summary: "Best when scanning from both ends or comparing pairs.",
    time: "O(n)",
    space: "O(1)",
    why: "Two pointers reduce unnecessary comparisons by moving through the data from two positions, often left and right.",
    whyNot: "Nested loops may work but are usually O(n²). Two pointers can often reduce pair-checking problems to O(n), especially when data is sorted.",
    examples: ["Two Sum in a sorted array", "Check if a string is a palindrome", "Remove duplicates from sorted array"],
    tags: ["sorted", "pairs", "left-right"]
  },

  backtracking: {
    name: "Backtracking",
    summary: "Best when generating all valid possibilities.",
    time: "Usually exponential",
    space: "O(depth)",
    why: "Backtracking explores choices one at a time and undoes choices when they no longer lead to a valid solution.",
    whyNot: "Greedy is faster, but it only works when a local best choice always leads to a global best result. For all combinations, backtracking is usually needed.",
    examples: ["Generate permutations", "Generate subsets", "N-Queens", "Combination Sum"],
    tags: ["combinations", "recursion", "choices"]
  },

  dynamicProgramming: {
    name: "Dynamic Programming",
    summary: "Best when the same subproblems repeat and choices affect future results.",
    time: "Depends on states",
    space: "Depends on states",
    why: "Dynamic programming saves answers to repeated subproblems so they do not need to be recomputed.",
    whyNot: "Plain recursion may solve the problem but can be extremely slow because it repeats the same work. Greedy may fail if local choices do not guarantee the best final answer.",
    examples: ["Climbing stairs", "Coin change", "Longest common subsequence", "Knapsack"],
    tags: ["optimization", "overlap", "memoization"]
  },

  greedy: {
    name: "Greedy Algorithm",
    summary: "Best when the best local choice always leads to the best final result.",
    time: "Usually O(n) or O(n log n)",
    space: "Usually O(1)",
    why: "Greedy algorithms make the best available choice at each step without revisiting earlier decisions.",
    whyNot: "Greedy fails when a local best choice blocks a better future solution. If choices depend heavily on previous states, dynamic programming may be safer.",
    examples: ["Activity selection", "Interval scheduling", "Jump Game", "Minimum number of coins for certain coin systems"],
    tags: ["local choice", "optimization", "simple"]
  },

  heap: {
    name: "Heap / Priority Queue",
    summary: "Best when you repeatedly need the smallest or largest item.",
    time: "O(n log k) or O(n log n)",
    space: "O(k) or O(n)",
    why: "A heap keeps the highest-priority item available without sorting everything every time.",
    whyNot: "Sorting can work, but if you only need repeated min/max operations, a heap is often more efficient.",
    examples: ["Top K frequent elements", "Merge K sorted lists", "Find running median"],
    tags: ["min", "max", "priority"]
  },

  topologicalSort: {
    name: "Topological Sort",
    summary: "Best for tasks with prerequisites or dependencies.",
    time: "O(V + E)",
    space: "O(V)",
    why: "Topological sort orders nodes so that prerequisites come before the items that depend on them.",
    whyNot: "Normal sorting does not understand dependency relationships. BFS/DFS traversal alone may not produce a valid dependency order unless adapted for topological sorting.",
    examples: ["Course Schedule", "Build order", "Task prerequisites"],
    tags: ["dependencies", "DAG", "ordering"]
  },

  unionFind: {
    name: "Union-Find / Disjoint Set",
    summary: "Best for tracking connected groups efficiently.",
    time: "Almost O(1) per operation",
    space: "O(n)",
    why: "Union-Find quickly merges groups and checks whether two items belong to the same group.",
    whyNot: "DFS or BFS can also check connectivity, but Union-Find is better when there are many repeated union and find operations.",
    examples: ["Number of connected components", "Detect cycle in undirected graph", "Accounts merge", "Kruskal’s algorithm"],
    tags: ["connectivity", "groups", "merge"]
  },

  sorting: {
    name: "Sorting",
    summary: "Best when order helps simplify the problem.",
    time: "Usually O(n log n)",
    space: "Depends on algorithm",
    why: "Sorting can reveal structure, group similar values, and make binary search or two pointers possible.",
    whyNot: "Sorting is not always necessary. If you only need lookup or counting, a hash map may be faster at O(n).",
    examples: ["Sort numbers", "Group intervals", "Prepare data for two pointers"],
    tags: ["order", "preprocessing", "compare"]
  },

  mergeSort: {
    name: "Merge Sort",
    summary: "Best when you need stable O(n log n) sorting.",
    time: "O(n log n)",
    space: "O(n)",
    why: "Merge sort splits the array into halves, sorts each half, and merges them back together in sorted order.",
    whyNot: "Quick sort is often faster in practice, but merge sort gives reliable O(n log n) time and is stable.",
    examples: ["Stable sorting", "Sorting linked lists", "Counting inversions"],
    tags: ["divide", "stable", "sort"]
  },

  quickSort: {
    name: "Quick Sort",
    summary: "Best for fast average-case sorting.",
    time: "Average O(n log n), worst O(n²)",
    space: "O(log n)",
    why: "Quick sort partitions data around a pivot, recursively sorting smaller sections.",
    whyNot: "Quick sort can degrade to O(n²) with bad pivots. Merge sort is safer when worst-case guarantees matter.",
    examples: ["General-purpose sorting", "Partition-based selection", "In-place sorting"],
    tags: ["partition", "sort", "average fast"]
  },

  countingSort: {
    name: "Counting Sort",
    summary: "Best when values are integers in a small known range.",
    time: "O(n + k)",
    space: "O(k)",
    why: "Counting sort counts how many times each value appears, then reconstructs the sorted result.",
    whyNot: "It is not good when the value range is huge. Comparison sorts like merge sort or quick sort are better for general data.",
    examples: ["Sort exam scores", "Sort small-range integers", "Frequency-based sorting"],
    tags: ["integer", "range", "linear sort"]
  },

  divideAndConquer: {
    name: "Divide and Conquer",
    summary: "Best when a problem can be split into smaller independent parts.",
    time: "Depends on split/merge",
    space: "Depends on recursion",
    why: "Divide and conquer solves smaller versions of the same problem and combines the results.",
    whyNot: "Dynamic programming is better when the smaller problems overlap. Divide and conquer works best when subproblems are mostly independent.",
    examples: ["Merge sort", "Quick sort", "Binary search", "Closest pair of points"],
    tags: ["split", "recursion", "combine"]
  },

  monotonicStack: {
    name: "Monotonic Stack",
    summary: "Best when you need the next greater or next smaller element.",
    time: "O(n)",
    space: "O(n)",
    why: "A monotonic stack keeps elements in increasing or decreasing order so you can quickly resolve next greater/smaller relationships.",
    whyNot: "Brute force checks each item against many others and is usually O(n²). Monotonic stack solves many of these problems in O(n).",
    examples: ["Next greater element", "Daily temperatures", "Largest rectangle in histogram"],
    tags: ["stack", "next greater", "next smaller"]
  },

  trie: {
    name: "Trie",
    summary: "Best for prefix-based string search.",
    time: "O(length of word)",
    space: "O(total characters)",
    why: "A trie stores characters as paths, making prefix lookup efficient.",
    whyNot: "A hash map is simpler for exact word lookup. Use a trie when prefixes, autocomplete, or word search matter.",
    examples: ["Autocomplete", "Dictionary search", "Word Search II", "Prefix matching"],
    tags: ["prefix", "strings", "dictionary"]
  },

  segmentTree: {
    name: "Segment Tree",
    summary: "Best for range queries with updates.",
    time: "O(log n) query/update",
    space: "O(n)",
    why: "A segment tree stores information about intervals, allowing efficient range queries and point updates.",
    whyNot: "Prefix sum is simpler if the array does not change. Segment tree is better when values update over time.",
    examples: ["Range minimum query", "Range sum with updates", "Range maximum query"],
    tags: ["range query", "updates", "tree"]
  },

  fenwickTree: {
    name: "Fenwick Tree / Binary Indexed Tree",
    summary: "Best for efficient prefix sums with updates.",
    time: "O(log n) query/update",
    space: "O(n)",
    why: "A Fenwick tree stores partial sums in a compact structure, making prefix sum queries and updates efficient.",
    whyNot: "A segment tree is more flexible for different range operations. Fenwick tree is simpler for prefix/range sums.",
    examples: ["Dynamic prefix sums", "Count inversions", "Range sum with updates"],
    tags: ["prefix sum", "updates", "BIT"]
  },

  kruskal: {
    name: "Kruskal’s Algorithm",
    summary: "Best for minimum spanning tree using sorted edges.",
    time: "O(E log E)",
    space: "O(V)",
    why: "Kruskal sorts edges by weight and uses Union-Find to avoid cycles while building the minimum spanning tree.",
    whyNot: "Prim’s algorithm may be better for dense graphs. Kruskal is often clean when edges are already listed.",
    examples: ["Minimum cost to connect cities", "Network design", "Minimum spanning tree"],
    tags: ["MST", "union-find", "edges"]
  },

  prim: {
    name: "Prim’s Algorithm",
    summary: "Best for minimum spanning tree by growing from one node.",
    time: "O(E log V)",
    space: "O(V)",
    why: "Prim starts from a node and repeatedly adds the cheapest edge that expands the growing tree.",
    whyNot: "Kruskal may be simpler when you have a clean edge list. Prim is often better for dense graphs or adjacency-list graph representations.",
    examples: ["Minimum spanning tree", "Network cabling", "Connecting points with minimum cost"],
    tags: ["MST", "priority queue", "graph"]
  },

  kmp: {
    name: "KMP String Matching",
    summary: "Best for finding a pattern inside a string efficiently.",
    time: "O(n + m)",
    space: "O(m)",
    why: "KMP preprocesses the pattern so it can skip unnecessary comparisons when a mismatch happens.",
    whyNot: "Naive string search can be O(nm). KMP is better when you need guaranteed efficient pattern matching.",
    examples: ["Find substring", "Pattern matching", "Repeated string search"],
    tags: ["string", "pattern", "search"]
  },

  rabinKarp: {
    name: "Rabin-Karp",
    summary: "Best for string matching using rolling hashes.",
    time: "Average O(n + m), worst O(nm)",
    space: "O(1)",
    why: "Rabin-Karp hashes substrings and compares hashes instead of comparing every character each time.",
    whyNot: "Hash collisions can cause extra comparisons. KMP gives stronger worst-case guarantees.",
    examples: ["Multiple pattern search", "Plagiarism detection idea", "Substring search"],
    tags: ["hashing", "string", "rolling hash"]
  },

  bitManipulation: {
    name: "Bit Manipulation",
    summary: "Best when problems involve binary representation, masks, or toggling states.",
    time: "Usually O(n) or O(1)",
    space: "Usually O(1)",
    why: "Bit manipulation uses binary operations like AND, OR, XOR, and shifts to represent and process information efficiently.",
    whyNot: "It can be harder to read. Use it when the problem clearly involves bits, subsets, parity, masks, or memory-efficient state.",
    examples: ["Single Number using XOR", "Check if power of two", "Generate subsets with bitmasks", "Track visited states compactly"],
    tags: ["bits", "xor", "mask"]
  },

  bruteForce: {
    name: "Brute Force",
    summary: "Best as a starting point or when input is small.",
    time: "Often O(n²) or worse",
    space: "Usually O(1)",
    why: "Brute force tries the direct approach. It is useful for understanding the problem before optimizing.",
    whyNot: "For large inputs, brute force is usually too slow. Once you see repeated work, optimize with a better pattern.",
    examples: ["Check every pair", "Try every option", "Baseline solution"],
    tags: ["simple", "small input", "baseline"]
  }
};
