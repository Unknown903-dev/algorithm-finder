window.AlgorithmFinderData = window.AlgorithmFinderData || {};

window.AlgorithmFinderData.cppExamples = {
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
