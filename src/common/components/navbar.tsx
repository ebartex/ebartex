import Link from "next/link";
import Image from "next/image";
import SearchBar from "./SearchBar";
const Navbar: React.FC = () => {
    return (
            <nav className="bg-white flex items-center justify-between p-4">
              {/* Logo */}
              <div className="flex items-center">
                <Link href="/">
                <Image src="/bartex.png" alt="Logo" width={80} height={20} className="w-full h-auto" />

                </Link>
              </div>
        
              {/* Wyszukiwarka */}
              <SearchBar/>
        
              {/* Przycisk Kontakt */}

            </nav>
          );
}

export default Navbar;