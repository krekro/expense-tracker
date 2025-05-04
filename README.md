# Expense Tracker

A modern web application to track your expenses, manage transactions, and visualize your spending. Built with React (Remix), TypeScript, and a custom backend.

## Features

- **User Authentication:** Secure login system with session management.
- **Expense Dashboard:** Overview of your spending and recent transactions.
- **Add Transactions:** Easily add new expenses or income.
- **Transaction List:** View, filter, and manage your transaction history.
- **Responsive UI:** Clean, mobile-friendly design using Tailwind CSS and custom components.
- **Persistent Sessions:** User sessions managed via cookies.

## Tech Stack

- **Frontend:** React (Remix), TypeScript, Tailwind CSS
- **Backend:** Node.js/Express (API server, not included in this repo)
- **State Management:** React hooks
- **Authentication:** Custom session and cookie management

## Getting Started

### Prerequisites

- Node.js (v16+ recommended)
- npm or yarn

### Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/yourusername/expense-tracker.git
   cd expense-tracker
   ```

2. **Install dependencies:**

   ```bash
   npm install
   # or
   yarn install
   ```

3. **Configure environment variables:**

   - Edit `/app/services/keys.ts` to set your API URLs.
   - Ensure your backend API is running and accessible.

4. **Start the development server:**

   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. **Open in your browser:**
   ```
   http://localhost:3000
   ```

### Folder Structure

```
app/
  components/         # Reusable UI components
  routes/             # Remix route modules (login, dashboard, etc.)
  services/           # API utilities, user/session helpers
  ...
```

## Usage

1. **Register/Login:** Use your credentials to log in.
2. **Dashboard:** View your expense summary and recent transactions.
3. **Add Transaction:** Click the "Add Transaction" button to record a new expense or income.
4. **View Transactions:** Browse, filter, or delete transactions as needed.

## Customization

- **API URL:** Change the API endpoint in `/app/services/keys.ts`.
- **Styling:** Modify Tailwind classes or add your own styles in `app.css`.
- **Components:** Extend or replace components in `/app/components/`.

## Contributing

Pull requests are welcome! For major changes, please open an issue first to discuss what you would like to change.

## License

[MIT](LICENSE)

---

**Note:**  
If you have any questions or run into issues, please open an issue or contact the maintainer.
