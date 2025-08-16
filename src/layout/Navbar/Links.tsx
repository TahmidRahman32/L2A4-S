import { NavLink } from "react-router";

interface LinksProps {
   path: string;
   name: string;
}

export default function Links({ path, name }: LinksProps) {
   return (
      <div>
         <NavLink
            to={path}
            className={({ isActive }: { isActive: boolean }) =>
               isActive ? "inline-flex items-center justify-center transition-all duration-200 font-medium focus:outline-none focus:ring-offset-1 rounded-lg px-4 py-1 bg-emerald-500" : " font-bold font-pansy "
            }
         >
            {name}
         </NavLink>
      </div>
   );
}
