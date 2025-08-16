
import type { IBook } from "@/type";
import { SkeletonCard } from "../loader/Loader";
import UpdateBookForm from "../updateBook/BookUpdate";
import DeleteBook from "../deleteBook/DelelteBook";
import { useGetBookQuery } from "@/redux/Api/BookApi";
import BorrowBookForm from "../Borrow/Borrow";

const Book = () => {
   const { data, isLoading } = useGetBookQuery(undefined, {
      refetchOnFocus: true,
      refetchOnMountOrArgChange: true,
      refetchOnReconnect: true,
   });

   // Dummy handlers for actions

   const onBorrow = () => {};
  

   if (isLoading) {
      return <SkeletonCard></SkeletonCard>;
   }


   return (
      <div>
         <table className="md:table-auto md:w-full border">
            <thead>
               <tr className=" bg-green-600 ">
                  <th>Title</th>
                  <th>Author</th>
                  <th>Genre</th>
                  <th>ISBN</th>
                  <th>Copies</th>
                  <th>Availability</th>
                  <th>Actions</th>
               </tr>
            </thead>
            <tbody>
               {!isLoading &&
                  data.data.map((book: IBook) => {
                     const formattedBook = {
                        ...book,
                        _id: book._id || book.id,
                        copies: String(book.copies),
                     };
                     return (
                        <tr key={formattedBook._id} className="md:space-y-3">
                           <td>{book.title}</td>
                           <td>{book.author}</td>
                           <td>{book.genre}</td>
                           <td>{book.isbn}</td>
                           <td>{book.copies}</td>
                           <td>{book.available ? "✅" : "❌"}</td>
                           <td className="md:flex justify-around items-center py-3 ">
                              <button title="Edit">
                                 <UpdateBookForm book={formattedBook} />
                              </button>
                              <button onClick={() => onBorrow()} title="Borrow">
                                 <BorrowBookForm book={book} />
                              </button>
                              <button title="Delete">
                                 <DeleteBook bookId={formattedBook._id} />
                              </button>
                           </td>
                        </tr>
                     );
                  })}
            </tbody>
         </table>
      </div>
   );
};

export default Book;
