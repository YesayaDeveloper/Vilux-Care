
import React from 'react';
import { Page } from '../types';

interface HeaderProps {
  currentPage: Page;
  setCurrentPage: (page: Page) => void;
}

const NavLink: React.FC<{
  pageName: Page;
  currentPage: Page;
  onClick: (page: Page) => void;
}> = ({ pageName, currentPage, onClick }) => {
  const isActive = currentPage === pageName;
  return (
    <button
      onClick={() => onClick(pageName)}
      className={`px-3 py-2 text-sm font-medium rounded-md transition-colors duration-200 ${
        isActive
          ? 'text-white bg-blue-600'
          : 'text-slate-500 hover:text-blue-600 hover:bg-blue-100'
      }`}
    >
      {pageName}
    </button>
  );
};

const Header: React.FC<HeaderProps> = ({ currentPage, setCurrentPage }) => {
  return (
    <header className="bg-white/80 backdrop-blur-md shadow-sm sticky top-0 z-10">
      <nav className="max-w-4xl mx-auto px-4 sm:px-6 md:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-2 cursor-pointer" onClick={() => setCurrentPage(Page.Dashboard)}>
            <svg
              className="w-8 h-8 text-blue-600"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
              />
            </svg>
            <h1 className="text-xl font-bold text-slate-800">Vilux Care</h1>
          </div>
          <div className="hidden sm:flex items-center space-x-1">
            <NavLink pageName={Page.Dashboard} currentPage={currentPage} onClick={setCurrentPage} />
            <NavLink pageName={Page.BMICalculator} currentPage={currentPage} onClick={setCurrentPage} />
            <NavLink pageName={Page.CalorieTracker} currentPage={currentPage} onClick={setCurrentPage} />
            <NavLink pageName={Page.AIHealthAssistant} currentPage={currentPage} onClick={setCurrentPage} />
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
