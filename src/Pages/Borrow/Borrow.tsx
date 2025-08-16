import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { z } from "zod";
import { toast } from "sonner";
import { useState } from "react";

import { useBorrowBookMutation } from "@/redux/Api/BookApi";

const formSchema = z.object({
   quantity: z.number({ message: "Quantity is required." }).min(1, "Quantity must be at least 1"),
   dueDate: z.string().min(1, "Due date is required."),
});

type BorrowBookProps = {
   book: {
      _id: string;
      title: string;
      copies: number;
      available: boolean;
   };
};

export default function BorrowBookForm({ book }: BorrowBookProps) {
   const [open, setOpen] = useState(false);
   const [borrowBook, { isLoading }] = useBorrowBookMutation();

   const form = useForm<z.infer<typeof formSchema>>({
      resolver: zodResolver(formSchema),
      defaultValues: {
         quantity: 1,
         dueDate: "",
      },
   });

   const onSubmit = async (data: z.infer<typeof formSchema>) => {

      if (data.quantity > book.copies) {
         toast.error(`Only ${book.copies} copies are available.`);
         return;
      }

      try {
         const result = await borrowBook({
            bookId: book._id,
            quantity: data.quantity,
            dueDate: data.dueDate,
         }).unwrap();
         console.log(result);

         if (result.success) {
            toast.success("Book borrowed successfully");

            // If no copies left, update status (optional - could be in API)
            if (book.copies - data.quantity <= 0) {
               // mark as unavailable - can call update API if needed
            }

            setOpen(false);
         }
      } catch (error) {
         toast.error("Failed to borrow book");
         console.error(error);
      }
   };

   return (
      <Dialog open={open} onOpenChange={setOpen}>
         <DialogTrigger asChild>
            <Button variant="outline" disabled={book.copies <= 0}>
               📚
            </Button>
         </DialogTrigger>
         <DialogContent>
            <DialogHeader>
               <DialogTitle>Borrow "{book.title}"</DialogTitle>
            </DialogHeader>

            <Form {...form}>
               <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                  <FormField
                     control={form.control}
                     name="quantity"
                     render={({ field }) => (
                        <FormItem>
                           <FormLabel>Quantity</FormLabel>
                           <FormControl>
                              <Input type="number" min={1} max={book.copies} {...field} onChange={(e) => field.onChange(Number(e.target.value))} />
                           </FormControl>
                           <FormMessage />
                        </FormItem>
                     )}
                  />

                  <FormField
                     control={form.control}
                     name="dueDate"
                     render={({ field }) => (
                        <FormItem>
                           <FormLabel>Due Date</FormLabel>
                           <FormControl>
                              <Input type="date" {...field} />
                           </FormControl>
                           <FormMessage />
                        </FormItem>
                     )}
                  />

                  <DialogFooter>
                     <Button type="submit" disabled={isLoading}>
                        {isLoading ? "Borrowing..." : "Confirm Borrow"}
                     </Button>
                  </DialogFooter>
               </form>
            </Form>
         </DialogContent>
      </Dialog>
   );
}
