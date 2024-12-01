import Link from "next/link";

const Navbar: React.FC = () => {
    return (
            <nav className="bg-white flex items-center justify-between p-4">
              {/* Logo */}
              <div className="flex items-center">
                <Link href="/">
                    <img src="/bartex.png" alt="Logo" className="h-8" />
                </Link>
              </div>
        
              {/* Wyszukiwarka */}
              <div className="flex-1 mx-4">
                
                <input
                  type="text"
                  placeholder="Szukaj..."
                  className="w-full p-2 border border-slate-300 rounded-lg focus:outline-none focus:outilne-4 focus:outline-slate-400"
                />
              </div>
        
              {/* Przycisk Kontakt */}
              <div>
                <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition duration-200">
                  Kontakt
                </button>
              </div>
            </nav>
          );
}

export default Navbar;