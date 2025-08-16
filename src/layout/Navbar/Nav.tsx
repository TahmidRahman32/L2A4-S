import { ModeToggle } from "@/components/ui/mode-toggle";

import Links from "./Links";
import SVG from "./svg/SVG";

const Nav = () => {
   return (
      <div className="flex items-center justify-between my-10 bg-neutral-500  px-8 rounded-full">
         <div>
            <h2 className="text-xl font-bold">
               <SVG></SVG>{" "}
            </h2>
         </div>
         <div className="space-x-4 flex items-center gap-2">
            <Links path="/" name="AllBook"></Links>
            <Links path="/addBook" name="AddBook"></Links>
            <Links path="/borrow" name="Book Summary"></Links>
         </div>
         <div>
            <ModeToggle />
         </div>
      </div>
   );
};

export default Nav;
