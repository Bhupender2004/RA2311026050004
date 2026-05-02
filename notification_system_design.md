# Notification System Design

## Architecture Overview
The solution is split into a Next.js App Router frontend (`notification_app_fe`) and a lightweight Node.js/TypeScript backend helper module (`notification_app_be`). This ensures a clean separation of concerns while keeping the architecture realistic for a frontend engineering assessment without over-engineering. The external evaluation service API is accessed via Axios.

## API Flow
1. **Fetching:** The `useNotifications` custom React hook acts as our data layer, fetching raw JSON data from `http://20.207.122.201/evaluation-service/notifications`.
2. **Parameters:** It supports dynamic URL query parameters for `limit`, `page`, and `notification_type`.
3. **Data Handling:** The response is safely parsed, validating array structures before injecting them into the React state.

## Priority Algorithm
In the Priority Inbox, notifications are strictly ordered by their business value rather than purely chronological order.
1. **Weighting:** 
   - `Placement` = 3 (Highest)
   - `Result` = 2
   - `Event` = 1 (Lowest)
2. **Sorting Logic:** A `useMemo` hook first compares the priority scores. If two notifications share the same priority (e.g., both are `Placement`), it falls back to a secondary sort using the most recent `timestamp`.

## Frontend Decisions
* **Material UI (MUI):** Chosen over raw CSS/Tailwind for rapid, robust component development. It provides accessible, responsive elements out of the box.
* **Custom Hooks:** 
  - `useNotifications` decouples API logic from presentation components.
  - `useReadTracking` manages local read/unread state using `localStorage` and `Set` operations for O(1) lookups.
* **Presentational Components:** `NotificationCard`, `FilterBar`, and `NotificationList` are pure components. They simply receive props and render UI, making them highly reusable and easy to test.

## Scalability Considerations
* **Pagination:** The All Notifications page supports server-side pagination through the API's `page` and `limit` parameters, preventing the browser from freezing under massive payloads.
* **Component Modularity:** By using standard React patterns (custom hooks and presentational components), we can easily drop in a global state manager (like Redux or Zustand) later if the application grows.
* **TypeScript:** Strict interfaces (`NotificationType`, `Notification`, `FetchOptions`) prevent runtime type errors and enforce data integrity system-wide.

## Responsive Strategy
* Built heavily using MUI's native flexbox utilities (`Box sx={{ display: 'flex', flexWrap: 'wrap' }}`).
* The Priority Inbox header and "Mark all as read" button wrap smoothly on mobile screens to prevent overflow.
* The main application layout is constrained to a readable maximum width (`800px`) so typography never stretches awkwardly on ultra-wide monitors.
