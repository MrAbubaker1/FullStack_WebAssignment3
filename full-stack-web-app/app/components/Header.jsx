"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Header = () => {
    const pathname = usePathname();
    console.log(pathname);
  const navItems = [
    { label: "Home", href: "/" },
    { label: "Movie List", href: "/moviepage" },
  ];
  return (
    <div>
      <ul className="flex gap-5 p-10">
        {navItems.map((link, index) => (
            
          <li key={index}>
            <Link
              href={link.href}
              className={
                pathname === `${link.href}` ? "text-gray-200 font-bold" : ""
              }
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Header;
