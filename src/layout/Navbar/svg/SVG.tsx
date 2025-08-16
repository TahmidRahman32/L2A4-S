import logo from "../svg/libraryLogo.png";
export default function SVG() {
   return (
      <div>
         <div className="w-16 ">
            <img className="rounded-full" src={logo} alt="" />
         </div>
         {/* <svg xmlns="sss" viewBox="0 0 512 512" className="h-8 w-8 text-primary">
            <defs>
               <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#3B82F6" />
                  <stop offset="100%" stopColor="#8B5CF6" />
               </linearGradient>
            </defs>

            <path fill="url(#gradient)" d="M256 0C114.6 0 0 114.6 0 256s114.6 256 256 256 256-114.6 256-256S397.4 0 256 0zm0 480C132.5 480 32 379.5 32 256S132.5 32 256 32s224 100.5 224 224-100.5 224-224 224z" />

            <path fill="#fff" d="M192 128h-32c-17.67 0-32 14.33-32 32v224c0 17.67 14.33 32 32 32h32c17.67 0 32-14.33 32-32V160c0-17.67-14.33-32-32-32z" />

            <path fill="#fff" d="M352 128h-32c-17.67 0-32 14.33-32 32v224c0 17.67 14.33 32 32 32h32c17.67 0 32-14.33 32-32V160c0-17.67-14.33-32-32-32z" />

            <path fill="#fff" d="M272 128h-32c-17.67 0-32 14.33-32 32v192c0 17.67 14.33 32 32 32h32c17.67 0 32-14.33 32-32V160c0-17.67-14.33-32-32-32z" />

            <path fill="#fff" d="M128 128H96c-17.67 0-32 14.33-32 32v192c0 17.67 14.33 32 32 32h32c17.67 0 32-14.33 32-32V160c0-17.67-14.33-32-32-32z" />

            <path fill="#fff" d="M416 128h-32c-17.67 0-32 14.33-32 32v192c0 17.67 14.33 32 32 32h32c17.67 0 32-14.33 32-32V160c0-17.67-14.33-32-32-32z" />
         </svg> */}
      </div>
   );
}
