import ErrorPage from "@/error/ErrorPage";
import { useGetBookBorrowQuery } from "@/redux/Api/BookApi";
import Spinner from "../loader/Spinner";

export default function BorrowSummary() {
   const { data: apiResponse, isLoading, isError } = useGetBookBorrowQuery(undefined);
   const books = apiResponse?.data ?? [];

   if (isLoading)
      return (
         <div className="text-center py-4">
            <Spinner></Spinner>
         </div>
      );
   if (isError)
      return (
         <div className="text-center py-4 text-red-500">
            <ErrorPage error={new Error("Something went wrong")} reset={() => console.log("Retry logic here")} />
         </div>
      );

   return (
      <div className="container mx-auto p-4">
         <h1 className="text-2xl font-bold mb-6">Borrowed Books Summary</h1>

         <div className="overflow-x-auto">
            <table className="mx-auto divide-y divide-gray-200 border rounded-lg shadow-sm">
               <thead className="bg-gray-50">
                  <tr>
                     <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
                     <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Author</th>

                     <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Quantity</th>
                     <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Due Date</th>
                     <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  </tr>
               </thead>
               <tbody className=" divide-y divide-gray-200">
                  {books.length > 0 ? (
                     books.map((borrow: any) => (
                        <tr key={borrow._id}>
                           <td className="px-6 py-4 text-gray-500 whitespace-nowrap">{borrow.book?.title}</td>
                           <td className="px-6 py-4 text-gray-500 whitespace-nowrap">{borrow.book?.author}</td>
                           <td className="px-6 py-4 text-gray-500 whitespace-nowrap">{borrow.quantity}</td>
                           <td className="px-6 py-4 text-gray-500 whitespace-nowrap">{new Date(borrow.dueDate).toLocaleDateString()}</td>
                           <td className="px-6 py-4 whitespace-nowrap">
                              <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${borrow.status === "borrowed" ? "bg-yellow-100 text-yellow-800" : "bg-green-100 text-green-800"}`}>{borrow.status}</span>
                           </td>
                        </tr>
                     ))
                  ) : (
                     <tr>
                        <td colSpan={6} className="px-6 py-4 text-center text-gray-500">
                           No borrowed books found
                        </td>
                     </tr>
                  )}
               </tbody>
            </table>
         </div>
      </div>
   );
}
