# Lucidity - Inventory Management Web App

Lucidity is a simple inventory management application built with React and TypeScript. It provides two distinct views: **Admin** and **User**, allowing for efficient inventory management and enhanced user experience. This project was developed as part of a coding challenge.

---

## Features

### Admin View

- **Edit Product**: Update product details such as price and quantity via a modal popup.
- **Disable Product**: Temporarily disable a product, disabling the "Edit" button and greying out the product row.
- **Delete Product**: Permanently delete a product from the inventory list.
- **Top Widgets**: Display key statistics including:
  - Total Products
  - Total Store Value
  - Out of Stock Products
  - Number of Categories

### User View

- **Read-Only**: View the list of products with all action buttons disabled.

---

## Screens

1. **Admin View**
   - Manage inventory with edit, delete, and disable options.
2. **Edit Product**
   - Popup to update product details locally.
3. **Disable Product**
   - Mark a product as disabled, visually reflected in the UI.
4. **User View**
   - View-only access for inventory items.

---

## Technology Stack

- **Frontend**: React, TypeScript, Vite
- **State Management**: Redux Toolkit
- **Styling**: Tailwind CSS
- **Testing**: Jest, React Testing Library
- **Icons**: FontAwesome

---

## API Integration

- **Endpoint**: [Inventory API](https://dev-0tf0hinghgjl39z.api.raw-labs.com/inventory)
- **Method**: `GET`
- **Usage**: Fetch inventory data to populate the product table.

---

## Scripts

- `dev`: Start development server using Vite.
- `build`: Build the project for production.
- `lint`: Run ESLint for code linting.
- `preview`: Preview the production build locally.
- `test`: Run unit tests in watch mode.
- `test:ci`: Run tests with coverage report.
- `test:debug`: Debug tests with Node.js inspector.
- `test:clear`: Clear Jest cache.

---

## Implementation Highlights

1. **State Management**: Leveraged Redux Toolkit for efficient state handling.
2. **Dynamic Widgets**: Automatically update widget statistics (e.g., total products, store value) based on local state changes.
3. **Responsive Design**: Tailwind CSS ensures a clean and adaptable UI.
4. **Action Icons**: FontAwesome icons for intuitive action buttons.
5. **Popup Modal**: Smooth modal implementation for editing products.

---

## How to Run

### Prerequisites

- Node.js (v16+)
- npm or yarn

### Steps

1. Clone the repository:
   ```bash
   git clone https://github.com/your-repo/lucidity.git
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```
4. Visit `http://localhost:5173` in your browser.

---

## Deployment

The project is deployed on **[Vercel](https://vercel.com/)** and can be accessed [here](https://lucidity-6lfjq6nih-manishgandotracoders-projects.vercel.app/).

---

## Testing

- Run all tests:
  ```bash
  npm test
  ```
- Run tests with coverage:
  ```bash
  npm run test:ci
  ```

---

## Bonus Features

- Integrated **Redux Toolkit** for managing application state.
- Modern UI design with **Tailwind CSS** for styling.

---

## Deliverables

1. **Video Walkthrough**: A brief overview of the approach and insights.
   1. https://www.loom.com/share/60c86d41103544dfb3926d65057b162c?sid=26aadc2d-9303-4676-96b6-8a40e598f50f
   2. https://www.loom.com/share/60c86d41103544dfb3926d65057b162c?sid=9d0e6a85-c0d4-4923-9b17-c1ab4e1ee6fd
2. **GitHub Repository**: [Lucidity GitHub Repository](https://github.com/your-repo/lucidity)
3. **Deployed Application**: [Live Demo on Vercel](https://your-deployed-site-link.vercel.app/)

---

# Project Architecture

This document explains the folder structure and architecture of the **Lucidity** React project.

---

## Root Level

- **`node_modules/`**: Contains all the installed dependencies for the project. Managed by `npm` or `yarn`.
- **`public/`**: Stores static files such as images, icons, and any files that don’t get processed by the bundler.
  - **`vite.svg`**: A static asset, likely an SVG file related to the Vite build tool.
- **`src/`**: The main source directory containing the application’s code.

---

## `src/` Directory

This is the heart of the application, containing the components, pages, and logic.

### **`assets/`**

- Stores static assets such as images, icons, or other resources used within the application.
  - **`react.svg`**: An SVG asset, possibly the React logo.

---

### **`components/`**

Contains reusable UI components that can be shared across different parts of the application. Subfolders group components by functionality or type.

#### Subfolders:

1. **`card/`**: Likely contains components for rendering card-based layouts or widgets.
2. **`header/`**: Houses components for the application’s header or navigation bar.
3. **`input/`**: Contains reusable input components such as text fields, dropdowns, etc.
4. **`modal/`**: Specific to modal-related components (popups or dialogs).

   - **`confirmationPrompt/`**: A subfolder, likely containing a specific confirmation modal component.
     - **`delete.modal.text.tsx`**: Component for displaying text in a delete confirmation modal.
     - **`delete.modal.tsx`**: The main component for handling delete modals.
   - **`form/`**: Components related to forms within modals.
     - **`form.modal.tsx`**: A form modal component, likely used for editing or adding products.
   - **`interface.tsx`**: Defines TypeScript interfaces or types for modal components.

5. **`table/`**: Handles components for rendering tables or lists.

   - **`index.tsx`**: The main table component.
   - **`index.test.tsx`**: Test file for the table component.
   - **`interface.tsx`**: Contains TypeScript interfaces for the table component.

6. **`toggle/`**: Likely contains components for toggle switches or buttons.
   - **`index.tsx`**: The main toggle component.
   - **`index.test.tsx`**: Test file for the toggle component.

---

### **`pages/dashboard/`**

Dedicated folder for the Dashboard page, following a "feature-based" folder structure.

- **`index.container.tsx`**: The container component, possibly used for connecting state management (e.g., Redux) with the dashboard UI.
- **`index.helper.tsx`**: Contains utility functions or helpers specific to the dashboard.
- **`index.test.tsx`**: Test file for the dashboard page.
- **`interface.tsx`**: Defines TypeScript interfaces for the dashboard page.

---

### **`redux/`**

Manages the application's state using Redux.

- **`authInterfaces.ts`**: TypeScript interfaces for authentication-related state.
- **`authSelectors.ts`**: Contains selectors for accessing specific slices of the Redux state.
- **`authSlice.ts`**: Defines the authentication slice, including state, reducers, and actions.
- **`authThunks.ts`**: Handles asynchronous logic (e.g., API calls) using Redux Thunks.
- **`store.ts`**: Configures the Redux store for the application.

---

### **`routes/`**

Handles application routing, likely using `react-router-dom`. Could include route definitions, protected route components, or dynamic route logic.

---

## Project Overview

- **Modular Architecture**: Components are grouped into logical folders (e.g., `card`, `header`, `modal`) to ensure maintainability and scalability.
- **TypeScript**: The project leverages TypeScript for type safety, with dedicated `interface.ts` files in most folders.
- **Testing**: Test files (e.g., `index.test.tsx`) are present alongside components, following a co-location strategy for better organization.
- **Redux**: The `redux/` folder manages application state, showcasing a clean separation of concerns between state, actions, and async logic.
- **Vite**: The build tool (`vite.svg` in `public/`) ensures fast builds and modern bundling capabilities.

---

## Key Advantages

1. **Scalability**: The modular design ensures that new features can be added with minimal refactoring.
2. **Readability**: Clear separation between components, pages, and logic improves code readability and collaboration.
3. **Reusability**: Common components (e.g., `input`, `modal`) are reusable, reducing duplication.
4. **Maintainability**: TypeScript interfaces and co-located test files improve code quality and maintainability.

---

This folder structure adheres to modern React and TypeScript best practices, making it ideal for medium to large-scale applications.

## Author

Developed by Manish Gandotra Feel free to reach out for feedback or questions.
