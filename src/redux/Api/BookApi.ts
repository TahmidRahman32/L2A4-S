import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const bookAip = createApi({
   reducerPath: "bookApi",
   baseQuery: fetchBaseQuery({ baseUrl: "https://server-a4s.vercel.app/api" }),
   tagTypes: ["book", "borrow"],
   endpoints: (builder) => ({
      getBook: builder.query({
         query: () => "/books",
         providesTags: ["book"],
      }),
      addBook: builder.mutation({
         query: (body) => ({
            url: "/books",
            method: "POST",
            body,
         }),
         invalidatesTags: ["book"],
      }),

      updateBook: builder.mutation({
         query: ({ id, body }) => ({
            url: `/books/${id}`,
            method: "PATCH",
            body,
         }),
         invalidatesTags: ["book"],
      }),
      deleteBook: builder.mutation({
         query: (id: string) => ({
            url: `/books/${id}`,
            method: "DELETE",
         }),
         invalidatesTags: ["book"],
      }),
      borrowBook: builder.mutation<{ success: boolean; message: string }, { bookId: string; quantity: number; dueDate: string }>({
         query: ({ bookId, quantity, dueDate }) => ({
            url: `/books/${bookId}/borrow`,
            method: "POST",
            body: { quantity, dueDate, bookId },
         }),
         invalidatesTags: ["book"],
      }),
      getBookBorrow: builder.query({
         query: () => `/books/borrow`,
         providesTags: ["book", "borrow"],
      }),
   }),
});

export const { useAddBookMutation, useGetBookQuery, useUpdateBookMutation, useDeleteBookMutation, useBorrowBookMutation, useGetBookBorrowQuery } = bookAip;
