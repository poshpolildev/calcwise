// src/components/layout/Sidebar.jsx
import React, { useState, useMemo } from 'react';
import { popularTools } from '../../data/popularTools';
import { allTools } from '../../data/allTools';
import { FiSearch, FiChevronDown, FiChevronUp, FiMenu, FiX } from 'react-icons/fi';

const Sidebar = ({ onSelectTool, isOpen, setIsOpen }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isAllToolsExpanded, setIsAllToolsExpanded] = useState(false);

  const lowerSearchTerm = searchTerm.toLowerCase();

  const filteredPopularTools = useMemo(() =>
    popularTools.filter(tool =>
      tool.name.toLowerCase().includes(lowerSearchTerm)
    ), [lowerSearchTerm]
  );

  const searchFilteredAllTools = useMemo(() =>
    allTools.filter(tool =>
      tool.name.toLowerCase().includes(lowerSearchTerm) &&
      !popularTools.some(ptool => ptool.id === tool.id)
    ), [lowerSearchTerm]
  );

  // onSelectTool (passed as prop) will now be handleSelectTool from App.jsx, which uses navigate()
  const handleToolClick = (toolId) => {
    onSelectTool(toolId); // This will call handleSelectTool in App.jsx which navigates
    if (isOpen && window.innerWidth < 768) {
      setIsOpen(false);
    }
  };

  const ToolButton = ({ tool }) => (
    <button
      type="button" // Explicitly set type to button
      key={tool.id}
      onClick={() => handleToolClick(tool.id)} // Calls the function that will navigate
      className="w-full text-left px-4 py-2.5 text-sm text-theme-text-secondary hover:bg-theme-border hover:text-theme-accent rounded-md transition-all duration-200 ease-in-out focus:outline-none focus:bg-theme-border focus:ring-1 focus:ring-theme-accent"
    >
      {tool.name}
    </button>
  );

  const isActiveSearch = lowerSearchTerm.length > 0;

  return (
    <>
      <button
        type="button"
        className="md:hidden fixed top-2 left-5 z-50 p-2 bg-theme-panel-dark rounded-md text-theme-text-primary hover:bg-theme-border"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
      </button>

      <aside
        className={`fixed top-0 left-0 h-full bg-theme-panel-dark shadow-lg text-theme-text-secondary pt-20 md:pt-24 transition-transform duration-300 ease-in-out z-30 ${isOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 w-72 md:w-64 lg:w-72 flex flex-col`}
      >
        <div className="px-4 mb-4">
          <h2 className="text-xl font-semibold mb-1">Tools Inventory</h2>
          <div className="relative">
            <input
              type="text"
              placeholder="Search tools..."
              className="w-full pl-10 pr-3 py-2 bg-theme-input-bg border border-theme-border rounded-md focus:ring-theme-accent focus:border-theme-accent transition-colors duration-200 text-theme-text-primary placeholder-theme-text-secondary"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-theme-text-secondary" size={18}/>
          </div>
        </div>

        <div className="overflow-y-auto flex-grow px-4 pb-4 space-y-6 scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-700">
          {(filteredPopularTools.length > 0 || !isActiveSearch) && (
            <div>
              <h3 className="text-sm font-semibold text-theme-text-secondary uppercase tracking-wider mb-2 px-1">Most Popular</h3>
              <div className="space-y-1">
                {filteredPopularTools.map(tool => <ToolButton key={`pop-${tool.id}`} tool={tool} />)}
                {isActiveSearch && filteredPopularTools.length === 0 && (
                    <p className="px-4 py-2 text-sm text-theme-text-secondary">No popular tools match.</p>
                )}
              </div>
            </div>
          )}

          <div>
            {isActiveSearch ? (
              searchFilteredAllTools.length > 0 && (
                <>
                  <h3 className="text-sm font-semibold text-theme-text-secondary uppercase tracking-wider mb-2 px-1 mt-4">
                    More Results
                  </h3>
                  <div className="space-y-1 animate-fade-in">
                    {searchFilteredAllTools.map(tool => <ToolButton key={`all-search-${tool.id}`} tool={tool} />)}
                  </div>
                </>
              )
            ) : (
              <>
                <button
                  type="button"
                  onClick={() => setIsAllToolsExpanded(!isAllToolsExpanded)}
                  className="w-full flex items-center justify-between px-1 py-2 text-sm font-semibold text-theme-text-secondary uppercase tracking-wider hover:text-theme-accent transition-colors duration-200 focus:outline-none"
                >
                  All Tools
                  {isAllToolsExpanded ? <FiChevronUp size={20} /> : <FiChevronDown size={20} />}
                </button>
                {isAllToolsExpanded && (
                  <div className="mt-1 space-y-1 animate-fade-in">
                    {allTools
                        .filter(tool => !popularTools.some(ptool => ptool.id === tool.id))
                        .map(tool => <ToolButton key={`all-manual-${tool.id}`} tool={tool} />)
                    }
                  </div>
                )}
              </>
            )}
            {isActiveSearch && filteredPopularTools.length === 0 && searchFilteredAllTools.length === 0 && (
                 <p className="px-4 py-6 text-sm text-theme-text-secondary text-center">No tools match your search.</p>
            )}
          </div>
        </div>
        <div className="p-4 text-xs text-theme-text-secondary border-t border-theme-border">
            Calc Wise v1.0
        </div>
      </aside>
      {isOpen && <div className="fixed inset-0 bg-black opacity-50 z-20 md:hidden" onClick={() => setIsOpen(false)}></div>}
    </>
  );
};

export default Sidebar;
