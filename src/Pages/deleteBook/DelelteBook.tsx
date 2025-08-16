import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useState } from "react";
import { useDeleteBookMutation } from "@/redux/Api/BookApi";

type DeleteBookProps = {
   bookId: string;
};

export default function DeleteBook({ bookId }: DeleteBookProps) {
   const [open, setOpen] = useState(false);
   const [deleteBook, { isLoading }] = useDeleteBookMutation();

   const handleDelete = async () => {
      try {
         const result = await deleteBook(bookId).unwrap();
         console.log(result);
         if (result.success) {
            toast.success("Book deleted successfully");
            setOpen(false);
         }
      } catch (error) {
         toast.error("Failed to delete book");
         console.error("Delete error:", error);
      }
   };

   return (
      <Dialog open={open} onOpenChange={setOpen}>
         <DialogTrigger asChild>
            <Button variant={"outline"}>🗑️</Button>
         </DialogTrigger>
         <DialogContent>
            <DialogHeader>
               <DialogTitle>Confirm Deletion</DialogTitle>
            </DialogHeader>
            <p>Are you sure you want to delete this book? This action cannot be undone.</p>
            <DialogFooter>
               <Button variant="outline" onClick={() => setOpen(false)}>
                  Cancel
               </Button>
               <Button variant="destructive" onClick={handleDelete} disabled={isLoading}>
                  {isLoading ? "Deleting..." : "Delete"}
               </Button>
            </DialogFooter>
         </DialogContent>
      </Dialog>
   );
}
