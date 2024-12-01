import React from 'react';

const Hero: React.FC = () => {
  return (
    <div className="bg-slate-300 relative flex justify-center min-h-screen flex-col">
      <div className="flex items-center justify-center">
        {/* Pierwszy select */}
        <div className="relative w-96">
          <label
            htmlFor="name1"
            className="absolute top-1 left-6 text-gray-500 text-md mt-2 pointer-events-none"
          >
            Rodzaj styropianu
          </label>
          <select
            id="name1"
            className="block w-full h-24 px-6 py-4 text-xl border bg-white border-gray-300 rounded-l-lg focus:outline-none pt-10"
          >
            <option value="" disabled selected>
              Wybierz...
            </option>
            <option value="option1">Podłogowy</option>
            <option value="option2">Fasadowy</option>
            <option value="option3">Fundamentowy</option>
          </select>
        </div>

        {/* Drugi select */}
        <div className="relative w-96">
          <label
            htmlFor="name2"
            className="absolute top-2 left-6 text-gray-500 text-md mt-2 pointer-events-none"
          >
            Wybierz opcję 2as
          </label>
          <select
            id="name2"
            className="block w-full h-24 px-6 py-4 text-xl border bg-white border-gray-300 focus:outline-none pt-10"
          >
            <option value="" disabled selected>
              Wybierz...
            </option>
            <option value="option1">Opcja 1</option>
            <option value="option2">Opcja 2</option>
            <option value="option3">Opcja 3</option>
          </select>
        </div>

        {/* Input z klasycznym przyciskiem */}
        <div className="relative w-96">
          <label
            htmlFor="input1"
            className="absolute top-1 left-6 text-gray-500 text-md mt-2 pointer-events-none"
          >
            Wprowadź tekst
          </label>
          <input
            id="input1"
            type="text"
            placeholder="Wpisz nazwę"
            className="block w-full h-24 px-6 py-4 rounded-r-xl text-xl border border-gray-300 focus:outline-none pt-10 pr-12"
          />
          {/* Klasyczny przycisk */}
          <button
            className="absolute right-3 top-1/2 transform -translate-y-1/2 bg-blue-500 text-white px-6 py-3 rounded focus:outline-none hover:bg-blue-600"
          >
            Szukaj
          </button>
        </div>
      </div>
    </div>
  );
};

export default Hero;
