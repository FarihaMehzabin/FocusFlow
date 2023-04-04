# Inbox Section 

This app is built using Next.js, React, and CSS Modules. The app allows users to add, edit, and delete tasks. Each task can be associated with categories.

## Features

- Add tasks with optional categories
- Edit existing tasks
- Delete tasks
- Reminder date and time setting
- Filter tasks by category
- Persist data with an API

## Project Structure

- `/pages`: Contains the main pages of the app
  - `index.js`: The home page of the app
- `/components`: Contains the React components used in the app
  - `AddToInbox.js`: Component for adding new tasks
  - `Task.js`: Component for displaying a single task
  - `Inbox.js`: Component for displaying the list of tasks
- `/hooks`: Contains custom hooks for state management and fetching data
  - `useFetchTodos.js`: Hook for fetching todos from the API
  - `useInboxState.js`: Hook for managing the state of the todos
- `/services`: Contains API services for the app
  - `todoService.js`: Functions for making API calls to manage todos
- `/styles`: Contains CSS Modules for styling the components

## Getting Started

1. Install dependencies:

npm install

2. Run the development server:

npm run dev

3. Open your browser and go to `http://localhost:3000` to see the app.

## Building for Production

To create a production build, run:

npm run build

To serve the production build, run:

npm start

## License

This project is licensed under the MIT License.
