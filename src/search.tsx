import React from 'react';

interface SearchProps {
  value?: string;
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  onChange?: (value: string) => void;
}

export default function SearchBasicExample({ searchTerm, setSearchTerm }: SearchProps): JSX.Element {
   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div className="flex justify-center">
      <div className="relative mb-4 flex items-center w-80 sm:w-96 p-8">
        <input
          type="search"
          className="w-full relative m-6 -mr-0.5 block w-[1px] flex-auto rounded-l border border-solid border-neutral-300 bg-transparent bg-clip-padding px-3 py-[0.25rem] text-base font-normal leading-[1.6] text-neutral-700 outline-none transition duration-200 ease-in-out focus:z-[3] focus:border-primary focus:text-neutral-700 focus:shadow-[inset_0_0_0_1px_rgb(59,113,202)] focus:outline-none dark:border-neutral-600 dark:text-neutral-200 dark:placeholder:text-neutral-200 dark:focus:border-primary"
          placeholder="Search"
          aria-label="Search"
          aria-describedby="button-addon1"
          value={searchTerm}
          onChange={handleInputChange}
        />
        {/*SMALL SCREEN   w-80 */}

        <button
          className="mt-6 mb-6 relative z-[2] flex items-center rounded-r bg-primary px-6 py-2 text-xs font-medium uppercase leading-tight bg-neutral-400"
          type="button"
          id="button-addon1"
          >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            className="h-5 w-5"
          >
            <path
            fillRule="evenodd"
            d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z"
            clipRule="evenodd"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}
