import App from "@/App";
import ErrorPage from "@/error/ErrorPage";
import AddBook from "@/Pages/AddBook/AddBook";
import Book from "@/Pages/Books/Book";
import BorrowSummary from "@/Pages/Borrow/BorrowSummary";
import { createBrowserRouter } from "react-router";

const router = createBrowserRouter([
   {
      path: "/",
      element: <App />,
      errorElement: <ErrorPage error={new Error("Something went wrong")} reset={() => console.log("Retry logic here")} />,
      children: [
         {
            // path: "/books",
            index: true,
            element: <Book />,
         },
         {
            path: "/addBook",
            element: <AddBook></AddBook>,
         },
         {
            path: "/borrow",
            element: <BorrowSummary />,
         },
      ],
   },
]);

export default router;
