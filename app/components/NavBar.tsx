import Link from "next/link";
import style from "./NavBar.module.css";

//Function to create the navigation bar. Loops through four links and creates them. Use a regex to remove the whitespace.
function NavBar() {
  const buttons = ["Home", "Projects", "New Project", "About"];
  return (
    <nav className="w-full flex items-center justify-around h-20 bg-black border-[color:var(--border-color)] border-b-2 px-48">
      <div className="flex w-auto">
        {buttons.map((buttonText, index) => (
          <Link
            key={index}
            href={`/${buttonText.replace(/\s/g, "").toLowerCase()}`}
            className="min-w-40 flex items-center justify-center border-[color:var(--border-color)] border-2 h-12 mx-5"
          >
            {buttonText}
          </Link>
        ))}
      </div>
    </nav>
  );
}

export default NavBar;
