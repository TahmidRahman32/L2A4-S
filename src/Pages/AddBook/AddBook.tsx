import { useForm, type FieldValues, type SubmitHandler } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useAddBookMutation } from "@/redux/Api/BookApi";

export default function AddBook() {
   // const formSchema = z.object({
   //    username: z.string().min(2, {
   //       message: "Username must be at least 2 characters.",
   //    }),
   // });
   const [fetchBook, { isLoading }] = useAddBookMutation();
   // const form = useForm<IBook>();
   const formSchema = z.object({
      title: z.string().min(1, { message: "Title is required." }),
      author: z.string().min(1, { message: "Author is required." }),
      genre: z.string().min(1, { message: "Genre is required." }),
      copies: z.string().min(1, { message: "Copies is required." }),
      isbn: z.string().min(1, { message: "ISBN is required." }),
      description: z.string().optional(),
   });
   const form = useForm<z.infer<typeof formSchema>>({
      resolver: zodResolver(formSchema),
      defaultValues: {
         title: "",
         author: "",
         genre: "",
         copies: "",
         isbn: "",
         description: "",
      },
   });

   const onSubmit: SubmitHandler<FieldValues> = async (data) => {
      try {
         const result = await fetchBook(data).unwrap();
         console.log("Book data:", result);
         if (result.success) {
            toast("post has been created.");
         }
      } catch (err) {
         console.error("Failed to fetch book:", err);
      }
   };
   return (
      <div>
         <h2 className="font-bold text-3xl ">Add Books</h2>
         <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
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
                  <div>
                     <FormField
                        control={form.control}
                        name="author"
                        render={({ field }) => (
                           <FormItem>
                              <FormLabel>Author</FormLabel>
                              <FormControl>
                                 <Input placeholder="author" {...field} />
                              </FormControl>
                           </FormItem>
                        )}
                     />
                  </div>
                  <div>
                     <FormField
                        control={form.control}
                        name="genre"
                        render={({ field }) => (
                           <FormItem>
                              <FormLabel>Genre</FormLabel>
                              <FormControl>
                                 <Input placeholder="genre" {...field} />
                              </FormControl>
                           </FormItem>
                        )}
                     />
                  </div>
                  <div>
                     <FormField
                        control={form.control}
                        name="copies"
                        render={({ field }) => (
                           <FormItem>
                              <FormLabel>Copies</FormLabel>
                              <FormControl>
                                 <Input placeholder="copies" {...field} />
                              </FormControl>
                           </FormItem>
                        )}
                     />
                  </div>
                  <div>
                     <FormField
                        control={form.control}
                        name="isbn"
                        render={({ field }) => (
                           <FormItem>
                              <FormLabel>ISBN</FormLabel>
                              <FormControl>
                                 <Input placeholder="isbn" {...field} />
                              </FormControl>
                           </FormItem>
                        )}
                     />
                  </div>
               </div>
               <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                     <FormItem>
                        <FormLabel>Description</FormLabel>
                        <FormControl>
                           <Textarea placeholder="description" {...field} />
                        </FormControl>
                     </FormItem>
                  )}
               />
               <Button type="submit">{isLoading ? "Loading..." : "SUBMIT"}</Button>
            </form>
         </Form>
      </div>
   );
}
