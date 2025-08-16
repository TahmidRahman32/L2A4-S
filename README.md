📚 Minimal Library Management System

A minimal client-side Library Management System built with React, Redux Toolkit RTK Query, and TypeScript.
Users can manage books, borrow books, and view a borrow summary—without authentication or extra complexity.

🚀 Features

Public Access – No login required, all routes are open.

Book Management

View all books in a table.

Add, edit, delete books.

Availability auto-updates when copies = 0.

Borrow Books

Borrow form with quantity & due date.

Quantity restricted by available copies.

Redirects to borrow summary after borrowing.

Borrow Summary

Aggregated view of borrowed books.

Columns: Title, ISBN, Total Borrowed.

📄 Pages

/books – All books list + actions.

/create-book – Add new book.

/books/:id – Book details.

/edit-book/:id – Edit book.

/borrow/:bookId – Borrow a book.

/borrow-summary – Borrowed books summary.

🎨 UI/UX

Clean, minimal, and responsive.

Built with Tailwind CSS.

Simple navigation: Navbar + Footer.