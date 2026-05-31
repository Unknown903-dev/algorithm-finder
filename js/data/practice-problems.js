window.AlgorithmFinderData = window.AlgorithmFinderData || {};

window.AlgorithmFinderData.practiceProblems = [
  {
    problem: "Given a maze, find the minimum number of moves from the start cell to the exit.",
    answer: "Use BFS because the maze can be treated as a grid graph, and each move has equal cost."
  },
  {
    problem: "Given a sorted array, determine whether a target number exists.",
    answer: "Use Binary Search because the input is sorted and you can eliminate half the search space each step."
  },
  {
    problem: "Given a string, find the longest substring without repeating characters.",
    answer: "Use Sliding Window because the answer is a continuous substring and you can move a window through the string."
  },
  {
    problem: "Given a list of numbers, find two numbers that add up to a target.",
    answer: "Use a Hash Map because you need fast lookup for the complement of each number."
  },
  {
    problem: "Given course prerequisites, determine a valid order to take all courses.",
    answer: "Use Topological Sort because prerequisites form a dependency graph."
  },
  {
    problem: "Given an undirected graph, determine how many connected components it has.",
    answer: "Use DFS, BFS, or Union-Find. Union-Find is especially useful if many connections are added over time."
  },
  {
    problem: "Given a list of temperatures, find how many days you must wait until a warmer temperature.",
    answer: "Use a Monotonic Stack because you need the next greater element for each position."
  },
  {
    problem: "Given a changing array, answer many range sum queries after updates.",
    answer: "Use a Segment Tree or Fenwick Tree because both support efficient range queries and updates."
  },
  {
    problem: "Given a dictionary of words, build an autocomplete feature.",
    answer: "Use a Trie because autocomplete depends on prefix search."
  },
  {
    problem: "Given weighted roads between cities, find the cheapest way to connect every city.",
    answer: "Use Kruskal's or Prim's algorithm because this is a minimum spanning tree problem."
  }
];
