import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { z } from "zod";

import { toast } from "sonner";
import { useState } from "react";
import { useUpdateBookMutation } from "@/redux/Api/BookApi";

const formSchema = z.object({
   title: z.string().min(1, { message: "Title is required." }),
   author: z.string().min(1, { message: "Author is required." }),
   genre: z.string().min(1, { message: "Genre is required." }),
   copies: z.string().min(1, { message: "Copies is required." }),
   isbn: z.string().min(1, { message: "ISBN is required." }),
   description: z.string().optional(),
});

type UpdateBookProps = {
   book: {
      _id: string;
      title: string;
      author: string;
      genre: string;
      isbn: string;
      copies: string;
      description?: string;
   };
};

export default function UpdateBookForm({ book }: UpdateBookProps) {
   const [open, setOpen] = useState(false);
   const [updateBook, { isLoading }] = useUpdateBookMutation();

   const form = useForm<z.infer<typeof formSchema>>({
      resolver: zodResolver(formSchema),
      defaultValues: {
         title: book.title,
         author: book.author,
         genre: book.genre,
         isbn: book.isbn,
         copies: book.copies,
         description: book.description || "",
      },
   });

   const onSubmit = async (data: z.infer<typeof formSchema>) => {
      try {
         const result = await updateBook({ id: book._id, body: data }).unwrap();
         console.log(result);

         if (result.success) {
            toast.success("Book updated successfully");
            setOpen(false);
         }
         
      } catch (error) {
         toast.error("Failed to update book");
         console.error("Error:", error);
      }
   };

   return (
      <Dialog open={open} onOpenChange={setOpen}>
         <DialogTrigger asChild>
            <Button variant="outline">✏️</Button>
         </DialogTrigger>
         <DialogContent>
            <DialogHeader>
               <DialogTitle>Update Book</DialogTitle>
            </DialogHeader>
            <Form {...form}>
               <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                  <FormField
                     control={form.control}
                     name="title"
                     render={({ field }) => (
                        <FormItem>
                           <FormLabel>Title</FormLabel>
                           <FormControl>
                              <Input placeholder="Title" {...field} />
                           </FormControl>
                           <FormMessage />
                        </FormItem>
                     )}
                  />

                  <div className="grid grid-cols-2 gap-3">
                     <FormField
                        control={form.control}
                        name="author"
                        render={({ field }) => (
                           <FormItem>
                              <FormLabel>Author</FormLabel>
                              <FormControl>
                                 <Input placeholder="Author" {...field} />
                              </FormControl>
                              <FormMessage />
                           </FormItem>
                        )}
                     />
                     <FormField
                        control={form.control}
                        name="genre"
                        render={({ field }) => (
                           <FormItem>
                              <FormLabel>Genre</FormLabel>
                              <FormControl>
                                 <Input placeholder="Genre" {...field} />
                              </FormControl>
                              <FormMessage />
                           </FormItem>
                        )}
                     />
                     <FormField
                        control={form.control}
                        name="copies"
                        render={({ field }) => (
                           <FormItem>
                              <FormLabel>Copies</FormLabel>
                              <FormControl>
                                 <Input placeholder="Copies" {...field} />
                              </FormControl>
                              <FormMessage />
                           </FormItem>
                        )}
                     />
                     <FormField
                        control={form.control}
                        name="isbn"
                        render={({ field }) => (
                           <FormItem>
                              <FormLabel>ISBN</FormLabel>
                              <FormControl>
                                 <Input placeholder="ISBN" {...field} />
                              </FormControl>
                              <FormMessage />
                           </FormItem>
                        )}
                     />
                  </div>

                  <FormField
                     control={form.control}
                     name="description"
                     render={({ field }) => (
                        <FormItem>
                           <FormLabel>Description</FormLabel>
                           <FormControl>
                              <Textarea placeholder="Description" {...field} />
                           </FormControl>
                           <FormMessage />
                        </FormItem>
                     )}
                  />

                  <DialogFooter>
                     <Button type="submit" disabled={isLoading}>
                        {isLoading ? "Updating..." : "Update Book"}
                     </Button>
                  </DialogFooter>
               </form>
            </Form>
         </DialogContent>
      </Dialog>
   );
}
