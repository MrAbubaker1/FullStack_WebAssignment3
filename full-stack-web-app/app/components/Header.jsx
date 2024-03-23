import Link from "next/link";
import { useRouter } from "next/router";

const Header = () => {
  const router = useRouter();

  const navItems = [
    { label: "Home", href: "/" },
    { label: "Movies List", href: "/movies" }, 
  ];

  return (
    <div>
      <ul className="flex gap-5 p-10">
        {navItems.map((link, index) => (
          <li key={index}>
            <Link href={link.href}>
              <a className={router.pathname === link.href ? "text-blue-500 font-bold" : ""}>
                {link.label}
              </a>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Header;
