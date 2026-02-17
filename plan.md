Nice idea — a mind-map app is a *perfect* project for a coding agent. If you give the agent a **clear, opinionated, end-to-end prompt**, you’ll get way better results than vague “build X” instructions.

Below is a **production-grade master prompt** you can copy-paste directly into your coding agent (Cursor, Claude Code, GPT-Engineer, etc.). I’ve structured it so the agent thinks like a **senior Next.js engineer + product designer**, not a tutorial bot.

---

# ✅ MASTER PROMPT FOR CODING AGENT

*(Next.js + Firebase Mind Map App)*

---

## 🎯 ROLE & GOAL

You are a **senior full-stack engineer** and **product architect**.

Your task is to **design and implement a scalable, clean, production-ready Mind Map web application** using:

* **Next.js (App Router)**
* **Firebase (Authentication + Firestore) – free tier only**
* **TypeScript**
* **Modern React best practices**
* **Clean architecture & reusable components**

The app must be **fast, intuitive, keyboard-friendly**, and **mobile-responsive**.

---

## 🧠 PRODUCT OVERVIEW

The application allows users to visually create, edit, and explore **mind maps** consisting of connected nodes.

Each user has private mind maps stored securely in Firebase.

---

## 🧱 TECH STACK (MANDATORY)

* **Framework:** Next.js (latest stable, App Router)
* **Language:** TypeScript
* **Auth:** Firebase Authentication
* **Database:** Firestore (NoSQL)
* **State Management:** React state + hooks (no Redux unless necessary)
* **Canvas / Graph Rendering:** SVG or Canvas (agent chooses best)
* **Styling:** Tailwind CSS
* **Deployment-ready structure**

---

## 🔐 AUTHENTICATION FEATURES

Implement **Firebase Authentication** with the following:

1. **User Registration**

   * Email + password
   * Email verification (OTP or verification link)

2. **Login**

   * Email + password

3. **Forgot Password**

   * Email-based password reset

4. **Protected Routes**

   * Only authenticated users can access mind maps

5. **Session Persistence**

   * User stays logged in after refresh

---

## 🧩 CORE MIND MAP FEATURES

### 1️⃣ Mind Map CRUD

* Create a new mind map
* Rename mind map
* Delete mind map
* Each mind map belongs to one user

Firestore data structure must be **well-designed and scalable**.

---

### 2️⃣ Node Operations

Each mind map contains **nodes** with:

* `id`
* `text`
* `position (x, y)`
* `parentId` (null for root)
* `createdAt`
* `updatedAt`

Features:

* Add node (child or sibling)
* Edit node text
* Delete node (with optional cascade delete)
* Drag node to reposition
* Connect parent ↔ child visually

---

### 3️⃣ Canvas Interactions

Implement smooth interactions:

* **Pan** (click + drag background)
* **Zoom in / Zoom out**

  * Mouse wheel
  * Touch pinch (optional)
* Maintain correct node positioning during zoom
* Grid or snap-to-grid (optional but recommended)

---

### 4️⃣ Search Functionality

* Search nodes by text
* Highlight matched nodes
* Auto-focus / center camera on searched node

---

## 🗂️ FIRESTORE DATA MODEL (REQUIRED)

Design and explain a clean schema similar to:

```ts
users/{userId}
mindMaps/{mindMapId}
mindMaps/{mindMapId}/nodes/{nodeId}
```

Include:

* Indexing strategy
* Read/write cost awareness (free tier optimized)

---

## 🎨 UI / UX REQUIREMENTS

* Minimal, distraction-free UI
* Keyboard shortcuts:

  * `Enter` → add child node
  * `Tab` → add sibling
  * `Delete` → delete node
* Right-click context menu for nodes
* Smooth animations (but lightweight)
* Responsive layout (desktop first, tablet usable)

---

## ⭐ RECOMMENDED FEATURES (YOU SHOULD IMPLEMENT OR PLAN)

Add **at least 5** of the following:

1. **Auto-save**

   * Persist changes instantly to Firestore

2. **Undo / Redo**

   * Keyboard support (`Ctrl+Z`, `Ctrl+Shift+Z`)

3. **Export**

   * Export mind map as:

     * PNG
     * JSON

4. **Dark / Light Mode**

5. **Node Color & Icons**

   * Color-code ideas
   * Emoji or icon support

6. **Multiple Roots**

   * Allow more than one root node per map

7. **Mini-Map / Overview Panel**

8. **Recent Maps Dashboard**

---

## 🧪 QUALITY REQUIREMENTS

* Modular, readable code
* No hard-coded values
* Strong typing everywhere
* Clear separation:

  * UI
  * Logic
  * Firebase services
* Reusable hooks (`useAuth`, `useMindMap`, etc.)

---

## 🧭 DELIVERABLES

You must:

1. Design folder structure
2. Explain core architectural decisions
3. Implement key components step-by-step
4. Include Firebase setup instructions
5. Add comments where logic is complex
6. Ensure app runs with:

   ```bash
   npm run dev
   ```

---

## 🚫 DO NOT

* Use deprecated Next.js APIs
* Use Firebase paid features
* Over-engineer with unnecessary libraries
* Skip error handling

---

## 🧠 THINK LIKE A PRODUCT ENGINEER

Before coding:

* Break problem into modules
* Think about performance
* Think about UX friction
* Think about Firebase read/write cost

