#  Christoffel's Chef's Menu Manager & Time Suite

An advanced, responsive mobile application built with **React Native** and **Expo** designed for professional chefs and kitchen managers to organize, calculate, filter, and curate dynamic menus across different service time slots.

---

##  Application Catalogue

### 1. Overview
**Christoffel's Chef's Menu Manager** is a robust culinary management solution that empowers kitchen staff to maintain complete control over their menus. Built with a clean aesthetic and responsive touch navigation, the app provides real-time mathematical overviews, item editing, category filtering, search-as-you-type suggestions, and a time-based recipe bank.

### 2. Core Features & Architecture
* **Menu Management (CRUD)**: Create, read, update, and delete custom menu items dynamically with instant state updates.
* **Input Validation & Feedback**: Robust validation checks prevent empty fields or invalid pricing, supported by clear success and error notification banners.
* **Search & Course Filtering**: Filter dishes instantly by course categories (`Starters`, `Mains`, `Dessert`) or search by name.
* **Live Statistics Dashboard**: Automatically calculates and displays total dishes, average menu pricing, and individual course item counts in real time.
* **Service Time Suite & Ideas Tab**: Tailor menus across different operating hours (**Breakfast**, **Lunch**, **Dinner**, **Late Night**). 
* **Extensive Recipe & Suggestion Bank**: Features over 60+ curated professional dish suggestions (20+ per course per time slot).
* **Detailed Dish Info & Quick-Add**: Every suggestion includes a collapsible **"Dish Info"** dropdown detailing exact ingredients and step-by-step preparation methods, alongside a **"+ Add to Form"** quick-action button.

---

## 📋 Changelog: Changes Implemented Since Part 2

Below is the formal log of functional and architectural upgrades added from Part 2 to the Final PoE version:

* **Full Item Management (Edit & Delete Functionality)**:
  * Added active state mapping to support editing existing menu items. Selecting "Edit" repopulates the input form and changes the submission action to "Save Changes".
  * Added instant item removal logic via the "Delete" button on each custom dish card.
* **Advanced Search & Course Filtering**:
  * Implemented real-time string-matching search functionality by dish name.
  * Added course-specific filter chips (`All`, `Starters`, `Mains`, `Dessert`) to narrow down the custom menu view instantly.
* **Live Menu Statistics Dashboard**:
  * Integrated automated calculations tracking total dish volume, live average menu pricing in ZAR, and individual course item counts dynamically as items are added or removed.
* **Time-Based Menu Suite & Ideas Tab**:
  * Created a dedicated **Ideas Tab** and a **Service Time Slot** selector (`Breakfast`, `Lunch`, `Dinner`, `Late Night`).
  * Integrated a 60+ item professional suggestion database that adjusts dynamically based on the selected operating hour.
* **Interactive Dish Info & Quick-Add Feature**:
  * Added a collapsible **"Dish Info"** toggle displaying precise ingredient lists and step-by-step preparation methods for suggestions.
  * Implemented a one-tap **"+ Add to Form"** shortcut button to pre-fill the creation form automatically.

---

##  Refactoring Changelog: What Was Changed During Code Refactoring

During the final code review and optimization phase, several structural and performance refactoring steps were performed:

* **State Centralization & Streamlining**:
  * Consolidated disparate input handlers into unified state hooks and created clean reset routines (`handleCancelEdit`, `handleSaveDish`) to prevent stale form states.
* **Modular Component Styling**:
  * Reorganized and cleaned up the `StyleSheet` block, standardizing margin gaps, color themes (`#FAF8F5`, `#C59B27`, `#2C2A29`), and flexbox properties across all cards to improve rendering performance and UI consistency.
* **Conditional UI Rendering Optimization**:
  * Refactored search and filter arrays using clean functional array methods (`.filter()`, `.reduce()`) to ensure lightning-fast list updates without lagging the UI thread.
* **Defensive Error Handling**:
  * Upgraded validation logic to handle whitespace trimming (`.trim()`) and numeric parsing (`isNaN`, `parseFloat`), preventing application crashes or corrupted state entries from invalid pricing formats.

* **UI Components**: Native Styled Views, ScrollViews, KeyboardAvoidingView, SafeAreaView
* **Form Inputs**: `@react-native-picker/picker` for native course dropdown selections
* **Platform**: Cross-platform compatible (Android, iOS, and Web via Expo Web)
