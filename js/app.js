const algorithms = {
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

const cppExamples = {
  binarySearch: `#include <bits/stdc++.h>
using namespace std;

int binarySearch(vector<int>& nums, int target) {
    int left = 0;
    int right = nums.size() - 1;

    while (left <= right) {
        int mid = left + (right - left) / 2;

        if (nums[mid] == target) return mid;
        if (nums[mid] < target) left = mid + 1;
        else right = mid - 1;
    }

    return -1;
}`,

  hashMap: `#include <bits/stdc++.h>
using namespace std;

vector<int> twoSum(vector<int>& nums, int target) {
    unordered_map<int, int> seen;

    for (int i = 0; i < nums.size(); i++) {
        int needed = target - nums[i];

        if (seen.count(needed)) {
            return {seen[needed], i};
        }

        seen[nums[i]] = i;
    }

    return {};
}`,

  bfs: `#include <bits/stdc++.h>
using namespace std;

void bfs(int start, vector<vector<int>>& graph) {
    queue<int> q;
    vector<bool> visited(graph.size(), false);

    q.push(start);
    visited[start] = true;

    while (!q.empty()) {
        int node = q.front();
        q.pop();

        cout << node << " ";

        for (int neighbor : graph[node]) {
            if (!visited[neighbor]) {
                visited[neighbor] = true;
                q.push(neighbor);
            }
        }
    }
}`,

  dfs: `#include <bits/stdc++.h>
using namespace std;

void dfs(int node, vector<vector<int>>& graph, vector<bool>& visited) {
    visited[node] = true;
    cout << node << " ";

    for (int neighbor : graph[node]) {
        if (!visited[neighbor]) {
            dfs(neighbor, graph, visited);
        }
    }
}`,

  dijkstra: `#include <bits/stdc++.h>
using namespace std;

vector<int> dijkstra(int start, vector<vector<pair<int, int>>>& graph) {
    int n = graph.size();
    vector<int> dist(n, INT_MAX);

    priority_queue<pair<int, int>, vector<pair<int, int>>, greater<pair<int, int>>> pq;

    dist[start] = 0;
    pq.push({0, start});

    while (!pq.empty()) {
        auto [currentDist, node] = pq.top();
        pq.pop();

        if (currentDist > dist[node]) continue;

        for (auto [neighbor, weight] : graph[node]) {
            int newDist = currentDist + weight;

            if (newDist < dist[neighbor]) {
                dist[neighbor] = newDist;
                pq.push({newDist, neighbor});
            }
        }
    }

    return dist;
}`,

  bellmanFord: `#include <bits/stdc++.h>
using namespace std;

struct Edge {
    int from;
    int to;
    int weight;
};

vector<int> bellmanFord(int n, int start, vector<Edge>& edges) {
    vector<int> dist(n, INT_MAX);
    dist[start] = 0;

    for (int i = 0; i < n - 1; i++) {
        for (Edge edge : edges) {
            if (dist[edge.from] != INT_MAX &&
                dist[edge.from] + edge.weight < dist[edge.to]) {
                dist[edge.to] = dist[edge.from] + edge.weight;
            }
        }
    }

    return dist;
}`,

  floydWarshall: `#include <bits/stdc++.h>
using namespace std;

void floydWarshall(vector<vector<int>>& dist) {
    int n = dist.size();

    for (int k = 0; k < n; k++) {
        for (int i = 0; i < n; i++) {
            for (int j = 0; j < n; j++) {
                if (dist[i][k] != INT_MAX && dist[k][j] != INT_MAX) {
                    dist[i][j] = min(dist[i][j], dist[i][k] + dist[k][j]);
                }
            }
        }
    }
}`,

  aStar: `// A* depends on the problem's heuristic.
// This is a simplified structure.

#include <bits/stdc++.h>
using namespace std;

struct Node {
    int id;
    int gCost;
    int hCost;

    int fCost() const {
        return gCost + hCost;
    }
};

// Use a priority queue ordered by lowest fCost.
// A good heuristic makes A* faster than Dijkstra.`,

  slidingWindow: `#include <bits/stdc++.h>
using namespace std;

int longestUniqueSubstring(string s) {
    unordered_set<char> window;
    int left = 0;
    int best = 0;

    for (int right = 0; right < s.size(); right++) {
        while (window.count(s[right])) {
            window.erase(s[left]);
            left++;
        }

        window.insert(s[right]);
        best = max(best, right - left + 1);
    }

    return best;
}`,

  prefixSum: `#include <bits/stdc++.h>
using namespace std;

vector<int> buildPrefixSum(vector<int>& nums) {
    vector<int> prefix(nums.size() + 1, 0);

    for (int i = 0; i < nums.size(); i++) {
        prefix[i + 1] = prefix[i] + nums[i];
    }

    return prefix;
}

int rangeSum(vector<int>& prefix, int left, int right) {
    return prefix[right + 1] - prefix[left];
}`,

  twoPointers: `#include <bits/stdc++.h>
using namespace std;

bool twoSumSorted(vector<int>& nums, int target) {
    int left = 0;
    int right = nums.size() - 1;

    while (left < right) {
        int sum = nums[left] + nums[right];

        if (sum == target) return true;
        if (sum < target) left++;
        else right--;
    }

    return false;
}`,

  backtracking: `#include <bits/stdc++.h>
using namespace std;

void backtrack(vector<int>& nums, vector<int>& path, vector<vector<int>>& result, vector<bool>& used) {
    if (path.size() == nums.size()) {
        result.push_back(path);
        return;
    }

    for (int i = 0; i < nums.size(); i++) {
        if (used[i]) continue;

        used[i] = true;
        path.push_back(nums[i]);

        backtrack(nums, path, result, used);

        path.pop_back();
        used[i] = false;
    }
}`,

  dynamicProgramming: `#include <bits/stdc++.h>
using namespace std;

int climbStairs(int n) {
    if (n <= 2) return n;

    vector<int> dp(n + 1);
    dp[1] = 1;
    dp[2] = 2;

    for (int i = 3; i <= n; i++) {
        dp[i] = dp[i - 1] + dp[i - 2];
    }

    return dp[n];
}`,

  greedy: `#include <bits/stdc++.h>
using namespace std;

int maxNonOverlappingIntervals(vector<pair<int, int>>& intervals) {
    sort(intervals.begin(), intervals.end(), [](auto& a, auto& b) {
        return a.second < b.second;
    });

    int count = 0;
    int lastEnd = INT_MIN;

    for (auto [start, end] : intervals) {
        if (start >= lastEnd) {
            count++;
            lastEnd = end;
        }
    }

    return count;
}`,

  heap: `#include <bits/stdc++.h>
using namespace std;

vector<int> topKLargest(vector<int>& nums, int k) {
    priority_queue<int, vector<int>, greater<int>> minHeap;

    for (int num : nums) {
        minHeap.push(num);

        if (minHeap.size() > k) {
            minHeap.pop();
        }
    }

    vector<int> result;

    while (!minHeap.empty()) {
        result.push_back(minHeap.top());
        minHeap.pop();
    }

    return result;
}`,

  topologicalSort: `#include <bits/stdc++.h>
using namespace std;

vector<int> topologicalSort(int n, vector<vector<int>>& graph) {
    vector<int> indegree(n, 0);

    for (int node = 0; node < n; node++) {
        for (int neighbor : graph[node]) {
            indegree[neighbor]++;
        }
    }

    queue<int> q;

    for (int i = 0; i < n; i++) {
        if (indegree[i] == 0) q.push(i);
    }

    vector<int> order;

    while (!q.empty()) {
        int node = q.front();
        q.pop();

        order.push_back(node);

        for (int neighbor : graph[node]) {
            indegree[neighbor]--;

            if (indegree[neighbor] == 0) {
                q.push(neighbor);
            }
        }
    }

    return order;
}`,

  unionFind: `#include <bits/stdc++.h>
using namespace std;

class UnionFind {
private:
    vector<int> parent;
    vector<int> rank;

public:
    UnionFind(int n) {
        parent.resize(n);
        rank.resize(n, 0);

        for (int i = 0; i < n; i++) {
            parent[i] = i;
        }
    }

    int find(int node) {
        if (parent[node] != node) {
            parent[node] = find(parent[node]);
        }

        return parent[node];
    }

    void unite(int a, int b) {
        int rootA = find(a);
        int rootB = find(b);

        if (rootA == rootB) return;

        if (rank[rootA] < rank[rootB]) {
            parent[rootA] = rootB;
        } else if (rank[rootA] > rank[rootB]) {
            parent[rootB] = rootA;
        } else {
            parent[rootB] = rootA;
            rank[rootA]++;
        }
    }
};`,

  sorting: `#include <bits/stdc++.h>
using namespace std;

void sortNumbers(vector<int>& nums) {
    sort(nums.begin(), nums.end());
}`,

  mergeSort: `#include <bits/stdc++.h>
using namespace std;

void mergeSort(vector<int>& nums) {
    if (nums.size() <= 1) return;

    int mid = nums.size() / 2;

    vector<int> left(nums.begin(), nums.begin() + mid);
    vector<int> right(nums.begin() + mid, nums.end());

    mergeSort(left);
    mergeSort(right);

    merge(left.begin(), left.end(), right.begin(), right.end(), nums.begin());
}`,

  quickSort: `#include <bits/stdc++.h>
using namespace std;

int partition(vector<int>& nums, int low, int high) {
    int pivot = nums[high];
    int index = low;

    for (int i = low; i < high; i++) {
        if (nums[i] <= pivot) {
            swap(nums[i], nums[index]);
            index++;
        }
    }

    swap(nums[index], nums[high]);
    return index;
}

void quickSort(vector<int>& nums, int low, int high) {
    if (low >= high) return;

    int pivotIndex = partition(nums, low, high);

    quickSort(nums, low, pivotIndex - 1);
    quickSort(nums, pivotIndex + 1, high);
}`,

  countingSort: `#include <bits/stdc++.h>
using namespace std;

vector<int> countingSort(vector<int>& nums, int maxValue) {
    vector<int> count(maxValue + 1, 0);

    for (int num : nums) {
        count[num]++;
    }

    vector<int> result;

    for (int value = 0; value <= maxValue; value++) {
        while (count[value] > 0) {
            result.push_back(value);
            count[value]--;
        }
    }

    return result;
}`,

  divideAndConquer: `// Divide and conquer pattern:
//
// 1. Divide the problem into smaller parts.
// 2. Solve each part recursively.
// 3. Combine the results.
//
// Examples:
// - Merge Sort
// - Quick Sort
// - Binary Search`,

  monotonicStack: `#include <bits/stdc++.h>
using namespace std;

vector<int> nextGreaterElement(vector<int>& nums) {
    vector<int> result(nums.size(), -1);
    stack<int> st;

    for (int i = 0; i < nums.size(); i++) {
        while (!st.empty() && nums[i] > nums[st.top()]) {
            result[st.top()] = nums[i];
            st.pop();
        }

        st.push(i);
    }

    return result;
}`,

  trie: `#include <bits/stdc++.h>
using namespace std;

class TrieNode {
public:
    unordered_map<char, TrieNode*> children;
    bool isWord = false;
};

class Trie {
private:
    TrieNode* root;

public:
    Trie() {
        root = new TrieNode();
    }

    void insert(string word) {
        TrieNode* current = root;

        for (char c : word) {
            if (!current->children.count(c)) {
                current->children[c] = new TrieNode();
            }

            current = current->children[c];
        }

        current->isWord = true;
    }

    bool search(string word) {
        TrieNode* current = root;

        for (char c : word) {
            if (!current->children.count(c)) return false;
            current = current->children[c];
        }

        return current->isWord;
    }
};`,

  segmentTree: `#include <bits/stdc++.h>
using namespace std;

class SegmentTree {
private:
    vector<int> tree;
    int n;

public:
    SegmentTree(vector<int>& nums) {
        n = nums.size();
        tree.resize(4 * n);
        build(nums, 0, 0, n - 1);
    }

    void build(vector<int>& nums, int node, int left, int right) {
        if (left == right) {
            tree[node] = nums[left];
            return;
        }

        int mid = (left + right) / 2;

        build(nums, 2 * node + 1, left, mid);
        build(nums, 2 * node + 2, mid + 1, right);

        tree[node] = tree[2 * node + 1] + tree[2 * node + 2];
    }

    int query(int node, int left, int right, int qLeft, int qRight) {
        if (qRight < left || right < qLeft) return 0;

        if (qLeft <= left && right <= qRight) {
            return tree[node];
        }

        int mid = (left + right) / 2;

        return query(2 * node + 1, left, mid, qLeft, qRight) +
               query(2 * node + 2, mid + 1, right, qLeft, qRight);
    }
};`,

  fenwickTree: `#include <bits/stdc++.h>
using namespace std;

class FenwickTree {
private:
    vector<int> tree;

public:
    FenwickTree(int n) {
        tree.resize(n + 1, 0);
    }

    void update(int index, int delta) {
        index++;

        while (index < tree.size()) {
            tree[index] += delta;
            index += index & -index;
        }
    }

    int prefixSum(int index) {
        index++;
        int sum = 0;

        while (index > 0) {
            sum += tree[index];
            index -= index & -index;
        }

        return sum;
    }
};`,

  kruskal: `#include <bits/stdc++.h>
using namespace std;

struct Edge {
    int u;
    int v;
    int weight;
};

bool compareEdges(Edge a, Edge b) {
    return a.weight < b.weight;
}

// Use this with Union-Find.
int kruskal(vector<Edge>& edges) {
    sort(edges.begin(), edges.end(), compareEdges);

    int totalCost = 0;

    for (Edge edge : edges) {
        // If edge.u and edge.v are not already connected:
        // unite them and add edge.weight to totalCost.
    }

    return totalCost;
}`,

  prim: `#include <bits/stdc++.h>
using namespace std;

int prim(int n, vector<vector<pair<int, int>>>& graph) {
    vector<bool> visited(n, false);
    priority_queue<pair<int, int>, vector<pair<int, int>>, greater<pair<int, int>>> pq;

    pq.push({0, 0});
    int totalCost = 0;

    while (!pq.empty()) {
        auto [weight, node] = pq.top();
        pq.pop();

        if (visited[node]) continue;

        visited[node] = true;
        totalCost += weight;

        for (auto [neighbor, edgeWeight] : graph[node]) {
            if (!visited[neighbor]) {
                pq.push({edgeWeight, neighbor});
            }
        }
    }

    return totalCost;
}`,

  kmp: `#include <bits/stdc++.h>
using namespace std;

vector<int> buildLPS(string pattern) {
    vector<int> lps(pattern.size(), 0);
    int length = 0;
    int i = 1;

    while (i < pattern.size()) {
        if (pattern[i] == pattern[length]) {
            length++;
            lps[i] = length;
            i++;
        } else if (length > 0) {
            length = lps[length - 1];
        } else {
            lps[i] = 0;
            i++;
        }
    }

    return lps;
}`,

  rabinKarp: `#include <bits/stdc++.h>
using namespace std;

// Simplified rolling hash idea.
// In production, use modulus carefully to reduce collisions.
bool rabinKarp(string text, string pattern) {
    return text.find(pattern) != string::npos;
}`,

  bitManipulation: `#include <bits/stdc++.h>
using namespace std;

bool isPowerOfTwo(int n) {
    return n > 0 && (n & (n - 1)) == 0;
}

int singleNumber(vector<int>& nums) {
    int result = 0;

    for (int num : nums) {
        result ^= num;
    }

    return result;
}`,

  bruteForce: `#include <bits/stdc++.h>
using namespace std;

bool hasPairWithTarget(vector<int>& nums, int target) {
    for (int i = 0; i < nums.size(); i++) {
        for (int j = i + 1; j < nums.size(); j++) {
            if (nums[i] + nums[j] == target) {
                return true;
            }
        }
    }

    return false;
}`
};

const practiceProblems = [
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
    answer: "Use Kruskal’s or Prim’s algorithm because this is a minimum spanning tree problem."
  }
];

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
