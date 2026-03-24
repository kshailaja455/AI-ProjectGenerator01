# Splay Tree Algorithm - Detailed Step-by-Step Guide

## Overview
A Splay Tree is a self-balancing Binary Search Tree (BST) where every accessed element is automatically moved to the root of the tree. This optimization makes frequently accessed files retrievable in O(log n) amortized time.

---

## 1. SPLAY TREE BASICS

### Structure
- Each node contains: `FileID` (integer value) and pointers to `left` and `right` child nodes
- Tree property: Left child < Parent < Right child (BST property)
- Accessed nodes are moved to the root via splaying operation

### Key Operations
1. **Insert** - Add a new file ID
2. **Search** - Find a file ID and move it to the root
3. **Delete** - Remove a file ID
4. **Splay** - Move a node to the root using rotations

---

## 2. ROTATION OPERATIONS

### Right Rotation (ℤ)
```
Before:          After:
    X              Y
   /              /  \
  Y        =>     B    X
   \                  /
    B                B
```

**Step-by-step:**
1. Y (left child of X) becomes the new subtree root
2. X becomes the right child of Y
3. Y's right subtree becomes X's left subtree
4. Return Y as new root

**Code Implementation:**
```
1. Store Y = X.left
2. X.left = Y.right
3. Y.right = X
4. Return Y
```

### Left Rotation (ℤ)
```
Before:          After:
  X               Y
   \             / \
    Y    =>     X   B
   /            \
  B              B
```

**Step-by-step:**
1. Y (right child of X) becomes the new subtree root
2. X becomes the left child of Y
3. Y's left subtree becomes X's right subtree
4. Return Y as new root

**Code Implementation:**
```
1. Store Y = X.right
2. X.right = Y.left
3. Y.left = X
4. Return Y
```

---

## 3. SPLAY OPERATION (CORE ALGORITHM)

The splay operation moves a target node to the root using three cases:

### Case 1: ZIG (Last Step to Root)
Target is a direct child of the root.

**Left ZIG:**
```
    Root              Target
    /      =>         /   \
  Target            A     Root
   / \                    / \
  A   B                  B   C
   \
    C
```
- Perform right rotation on root

**Right ZIG:**
```
      Root            Target
        \    =>       /   \
      Target       Root    B
      / \         / \
     A   B       C   A
    /
   C
```
- Perform left rotation on root

### Case 2: ZIG-ZIG (Target in Deeper Left Subtree)
Target is in left-left position.

```
      Root              Target
      /      =>         /    \
    P                  A      P
   /                        / \
  T                        B   Root
 / \                           / \
A   B                         C   D
   / \
  C   D
```

**Steps:**
1. Right rotate parent P (move T up)
2. Right rotate root (move T further up)

### Case 3: ZIG-ZIG (Target in Deeper Right Subtree)
Target is in right-right position.

```
    Root                Target
      \      =>         /    \
       P               Root   D
        \             / \      
         T           A   C     
        / \                    
       B   D                   
      / \                      
     E   F                     
```

**Steps:**
1. Left rotate parent P (move T up)
2. Left rotate root (move T further up)

### Case 4: ZIG-ZAG (Target in Left-Right Position)
Target is nested as left-right.

```
      Root              Target
      /      =>         /    \
    P                  P      Root
     \                /       /  \
      T             A        C   D
     / \
    B   C
   /
  A
```

**Steps:**
1. Left rotate P (move T to left-left position)
2. Right rotate root (move T to root)

### Case 5: ZIG-ZAG (Target in Right-Left Position)
Target is nested as right-left.

```
    Root              Target
      \      =>       /    \
       P            Root    D
      /            / \       \
     T            A   B       P
    / \                \
   B   D               C
      / \
     C   E
```

**Steps:**
1. Right rotate P (move T to right-right position)
2. Left rotate root (move T to root)

---

## 4. INSERT OPERATION

### Algorithm
```
INSERT(fileID):
1. If tree is empty:
   - Create new node with fileID
   - Set as root
   - Return

2. Navigate BST to find insertion point:
   - If fileID < current.fileID: Go left
   - If fileID > current.fileID: Go right
   - If fileID == current.fileID: Ignore (duplicate)

3. Create new node at insertion point

4. Splay the newly inserted node to root

5. Return new root
```

### Step-by-Step Example (Insert 40 into [50, 30, 70])

**Initial Tree:**
```
    50
   /  \
  30   70
```

**Step 1:** Navigate to find insertion point
- 40 < 50, go left
- 40 > 30, go right
- 40 > 30.right (null), insert here

**Tree after insertion (before splay):**
```
    50
   /  \
  30   70
   \
    40
```

**Step 2:** Splay 40 to root (ZIG-ZAG case)
- Right rotate on 30 (move 40 to left-left)
- Left rotate on 50 (move 40 to root)

**Final Tree:**
```
    40
   /  \
  30   50
       /
      70
```

---

## 5. SEARCH OPERATION

### Algorithm
```
SEARCH(fileID):
1. If tree is empty:
   - Return FALSE

2. Splay the fileID (move to root if exists)

3. If root.fileID == fileID:
   - Return TRUE
   - File is now at root (most accessible)
   Else:
   - Return FALSE
   - Last compared node is now at root
```

### Behavior
- Found files are moved to root for faster future access
- Not found files: Last compared node becomes root (helps locality)

### Example: Search(40) in tree [50, 30, 70, 20, 40, 60, 80]

**Before Search:**
```
        50
       /  \
      30   70
     / \   / \
    20 40 60 80
```

**During Splay:**
- Traverse right to 70 (40 < 50... no, 40 > 50? No)
- Actually: 40 < 50, go left
- 40 > 30, this is ZIG-ZAG (Right-Left)
- Left rotate on 30, then right rotate on 50

**After Search (40 at root):**
```
        40
       /  \
      30   50
     /    / \
    20   60  70
             \
              80
```

---

## 6. DELETE OPERATION

### Algorithm
```
DELETE(fileID):
1. If tree is empty:
   - Return

2. Splay the fileID to root:
   - If not found, return

3. If fileID != root.fileID:
   - File not in tree, return

4. Handle three cases:
   
   Case A: No left subtree
   - Right subtree becomes new tree
   
   Case B: No right subtree
   - Left subtree becomes new tree
   
   Case C: Both subtrees exist
   - Splay max element from left subtree to become new root
   - Attach right subtree to new root's right

5. Return new root
```

### Step-by-Step Example (Delete 30)

**Before Delete:**
```
        40
       /  \
      30   50
     /    / \
    20   60  70
             \
              80
```

**Step 1:** Splay 30 to root
- 30 < 40, go left
- This is ZIG case
- Left rotate on 40

**After Splay (30 at root):**
```
        30
       /  \
      20   40
          / \
         60  50
          \   \
          70   80
```

**Step 2:** Delete root node 30
- Has both left and right subtrees
- Find max in left subtree: max(20) = 20
- Splay 20 in left subtree

**Step 3:** Splay 20 to root of left subtree
```
      20
      /
     30  (detached - original left root was 20)
```

**Step 4:** Attach original right subtree
- New structure becomes:
```
        20
          \
           40
          / \
         60  50
          \   \
          70   80
```

**Final Tree after Delete(30):**
```
        20
          \
           40
          / \
         60  50
          \   \
          70   80
```

---

## 7. TIME COMPLEXITY ANALYSIS

| Operation | Worst Case | Amortized |
|-----------|-----------|-----------|
| Insert    | O(n)      | O(log n)  |
| Search    | O(n)      | O(log n)  |
| Delete    | O(n)      | O(log n)  |
| Splay     | O(n)      | O(log n)  |

### Why Amortized O(log n)?
- Splay operations balance the tree over time
- Each splay operation moves a node closer to root
- Frequently accessed nodes stay near root
- This is optimal for access patterns with locality

---

## 8. SPACE COMPLEXITY

**Space:** O(n) where n is the number of file IDs
- Each node stores: fileID, left pointer, right pointer
- n nodes in the tree

---

## 9. COMPLETE OPERATION SEQUENCE

### Example: File IDs [50, 30, 70, 20, 40, 60, 80]

#### Step 1: Insert Operations
```
Insert(50) → 50 becomes root
             Root: 50

Insert(30) → Splay 30 to root
             Root: 30
               \
                50

Insert(70) → Splay 70 to root
             Root: 70
             /  \
            30   50

Insert(20) → Splay 20 to root
             Root: 20
               \
                30
               /  \
              70   40
                 \
                  50

... (continue for 40, 60, 80)

Final tree after all inserts:
        80
       /  \
      50   (continue structure)
     ...
```

#### Step 2: Search(40)
- Navigate to 40
- Apply appropriate spaly operations
- 40 moves to root
- Output: FOUND

#### Step 3: Search(60)
- Navigate to 60
- Apply splay operations
- 60 moves to root
- Output: FOUND

#### Step 4: Delete(30)
- Splay 30 to root
- Remove it
- Restructure tree
- 30 is removed from tree

---

## 10. ADVANTAGES OF SPLAY TREES

1. **Optimal for Locality** - Recently accessed files stay near root
2. **No Balance Metadata** - No need to store balance factors
3. **Simple Implementation** - Uses only rotations
4. **Adaptive** - Fast for frequently accessed items
5. **Good Cache Performance** - Root node accessed most

---

## 11. KEY TAKEAWAYS

- **Splaying** is the core operation that moves nodes to root
- **Five Cases** of splaying: Zig, Zig-Zig Left, Zig-Zig Right, Zig-Zag Left, Zig-Zag Right
- **Insert** = BST insert + Splay
- **Search** = BST search + Splay (if found)
- **Delete** = Splay + Split tree + Splay (merge)
- **Amortized O(log n)** for all operations over time
- **Perfect for access patterns** with temporal locality
