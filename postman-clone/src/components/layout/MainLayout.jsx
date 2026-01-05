import { useState, useEffect, useCallback } from 'react';
import { useWorkspace } from '../../context/WorkspaceContext';
import { useTab } from '../../context/TabContext';
import Header from './Header';
import Sidebar from "../sidebar/Sidebar";
import RequestBuilder from '../request/RequestBuilder';
import ResponseViewer from '../response/ResponseViewer';
import CreateCollectionModal from '../collections/CreateCollectionModal';
import { FiFolder, FiClock, FiGlobe, FiUsers } from 'react-icons/fi';

export default function MainLayout() {
  const [sidebarWidth, setSidebarWidth] = useState(256);
  const [responseHeight, setResponseHeight] = useState(50);
  const [isDraggingSidebar, setIsDraggingSidebar] = useState(false);
  const [isDraggingResponse, setIsDraggingResponse] = useState(false);
  const [activeNav, setActiveNav] = useState('collections');
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [showNewMenu, setShowNewMenu] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);

  const { activeWorkspace } = useWorkspace();
  const { addTab } = useTab();

  const handleNavClick = (nav) => {
    if (activeNav === nav && !isSidebarCollapsed) {
      setIsSidebarCollapsed(true);
    } else {
      setIsSidebarCollapsed(false);
      setActiveNav(nav);
    }
  };

  // ✅ FIXED: Mouse move handler with inverted response height
  const handleMouseMove = useCallback((e) => {
    if (isDraggingSidebar) {
      e.preventDefault();
      const newWidth = Math.max(150, Math.min(600, e.clientX - 56));
      setSidebarWidth(newWidth);
    }
    
    if (isDraggingResponse) {
      e.preventDefault();
      const mainContent = document.querySelector('main');
      if (mainContent) {
        const mainRect = mainContent.getBoundingClientRect();
        const newHeight = ((e.clientY - mainRect.top) / mainRect.height) * 100;
        // ✅ INVERT THE CALCULATION - This fixes the reversed dragging
        const invertedHeight = 100 - newHeight;
        setResponseHeight(Math.max(20, Math.min(80, invertedHeight)));
      }
    }
  }, [isDraggingSidebar, isDraggingResponse]);

  const handleMouseUp = useCallback(() => {
    setIsDraggingSidebar(false);
    setIsDraggingResponse(false);
    document.body.style.userSelect = '';
    document.body.style.cursor = '';
  }, []);

  useEffect(() => {
    if (isDraggingSidebar || isDraggingResponse) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
      
      return () => {
        window.removeEventListener('mousemove', handleMouseMove);
        window.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [isDraggingSidebar, isDraggingResponse, handleMouseMove, handleMouseUp]);

  const handleSidebarDragStart = () => {
    setIsDraggingSidebar(true);
    document.body.style.userSelect = 'none';
    document.body.style.cursor = 'col-resize';
  };

  const handleResponseDragStart = () => {
    setIsDraggingResponse(true);
    document.body.style.userSelect = 'none';
    document.body.style.cursor = 'row-resize';
  };

  return (
    <div 
      className="h-screen flex flex-col overflow-hidden"
      style={{ backgroundColor: '#1e1e1e' }}
    >
      <Header />
      
      <div className="flex flex-1 overflow-hidden">
        {/* Left Side: Mini Navbar + Sidebar */}
        <div className="flex flex-col" style={{ width: isSidebarCollapsed ? '56px' : `${sidebarWidth + 56}px` }}>
          {/* Workspace Bar - Above Everything */}
          <div 
            className="h-10 flex items-center justify-between px-3 border-b flex-shrink-0"
            style={{ 
              backgroundColor: '#262626',
              borderColor: '#34373c',
              borderRight: '1px solid #3e3e42'
            }}
          >
            <div className="flex items-center gap-2 flex-1 min-w-0">
              {/* People Icon on LEFT */}
              <button 
                className="p-1.5 hover:bg-dark-hover rounded transition text-dark-text-secondary hover:text-dark-text flex-shrink-0"
                title="Invite team"
              >
                <FiUsers size={16} />
              </button>
              
              <span className="text-sm font-medium text-dark-text truncate">
                {activeWorkspace?.name || 'My Workspace'}
              </span>
              
              {!isSidebarCollapsed && (
                <>
                  {/* New Button with Dropdown */}
                  <div className="relative">
                    <button 
                      onClick={() => setShowNewMenu(!showNewMenu)}
                      className="px-2 py-1 rounded text-xs hover:bg-dark-hover transition text-dark-text border border-dark-border"
                    >
                      New
                    </button>
                    
                    {showNewMenu && (
                      <>
                        <div className="fixed inset-0 z-10" onClick={() => setShowNewMenu(false)} />
                        <div className="absolute left-0 mt-2 w-48 bg-dark-surface rounded-lg shadow-2xl border border-dark-border z-20">
                          <button
                            onClick={() => {
                              setShowCreateModal(true);
                              setShowNewMenu(false);
                            }}
                            className="w-full px-4 py-2 text-left hover:bg-dark-hover text-sm text-dark-text transition"
                          >
                            New Collection
                          </button>
                          <button
                            onClick={() => {
                              addTab();
                              setShowNewMenu(false);
                            }}
                            className="w-full px-4 py-2 text-left hover:bg-dark-hover text-sm text-dark-text transition"
                          >
                            New Request
                          </button>
                        </div>
                      </>
                    )}
                  </div>
                  
                  <button className="px-2 py-1 rounded text-xs hover:bg-dark-hover transition text-dark-text border border-dark-border">
                    Import
                  </button>
                </>
              )}
            </div>
          </div>

          {/* Bottom: Mini Navbar + Sidebar */}
          <div className="flex flex-1 overflow-hidden">
            {/* Left Mini Navbar */}
            <div 
              className="w-14 flex flex-col items-center py-3 gap-3 flex-shrink-0" 
              style={{ backgroundColor: '#262626', borderRight: '1px solid #3e3e42' }}
            >
              <button
                onClick={() => handleNavClick('collections')}
                className={`p-3 rounded transition ${
                  activeNav === 'collections' && !isSidebarCollapsed
                    ? 'text-white'
                    : 'text-[#858585] hover:text-[#d4d4d4]'
                }`}
                style={{
                  backgroundColor: activeNav === 'collections' && !isSidebarCollapsed ? 'rgb(200, 200, 200)' : 'transparent'
                }}
                title="Collections"
              >
                <FiFolder size={18} />
              </button>
              
              <button
                onClick={() => handleNavClick('history')}
                className={`p-3 rounded transition ${
                  activeNav === 'history' && !isSidebarCollapsed
                    ? 'text-white'
                    : 'text-[#858585] hover:text-[#262626]'
                }`}
                style={{
                  backgroundColor: activeNav === 'history' && !isSidebarCollapsed ? 'rgb(200, 200, 200)' : 'transparent'
                }}
                title="History"
              >
                <FiClock size={18} />
              </button>

              <button
                onClick={() => handleNavClick('environment')}
                className={`p-3 rounded transition ${
                  activeNav === 'environment' && !isSidebarCollapsed
                    ? 'text-white'
                    : 'text-[#858585] hover:text-[#d4d4d4]'
                }`}
                style={{
                  backgroundColor: activeNav === 'environment' && !isSidebarCollapsed ? 'rgb(200, 200, 200)' : 'transparent'
                }}
                title="Environment"
              >
                <FiGlobe size={18} />
              </button>
            </div>

            {/* Main Sidebar */}
            {!isSidebarCollapsed && (
              <div 
                style={{ 
                  width: `${sidebarWidth}px`, 
                  backgroundColor: '#262626', 
                  borderRight: '1px solid #3e3e42' 
                }} 
                className="flex-shrink-0 overflow-hidden"
              >
                <Sidebar activeNav={activeNav} />
              </div>
            )}
          </div>
        </div>

        {/* Sidebar Resize Handle */}
        {!isSidebarCollapsed && (
          <div
            onMouseDown={handleSidebarDragStart}
            className="w-0.5 ver:bg-blue-500 cursor-col-resize transition"
            style={{ 
              backgroundColor: isDraggingSidebar ? '#3b82f6' : '#3e3e42',
              userSelect: 'none'
            }}
          />
        )}
        
        {/* Main Content */}
        <main 
          className="flex-1 flex flex-col overflow-hidden" 
          style={{ backgroundColor: '#1e1e1e' }}
        >
          {/* Request Builder */}
          <div 
            style={{ 
              height: `${100 - responseHeight}%`, 
              backgroundColor: '#1e1e1e',
              borderColor: '#3e3e42'
            }} 
            className="border-b overflow-hidden flex-shrink-0"
          >
            <RequestBuilder />
          </div>
          
          {/* Response Resize Handle - ENHANCED & VISIBLE */}
          <div
            onMouseDown={handleResponseDragStart}
            className="hover:bg-blue-500 cursor-row-resize transition flex items-center justify-center group"
            style={{ 
              backgroundColor: isDraggingResponse ? '#3b82f6' : '#444',
              userSelect: 'none'
            }}
          >
            {/* Triple grip lines like Postman */}
            <div className="flex flex-col gap-1 items-center">
              <div className=" h-0.5 bg-gray-500 rounded group-hover:bg-blue-400 transition-colors" />
             
            </div>
          </div>
          
          {/* Response */}
          <div 
            style={{ 
              height: `${responseHeight}%`, 
              backgroundColor: '#1e1e1e'
            }} 
            className="overflow-hidden flex-shrink-0"
          >
            <ResponseViewer />
          </div>
        </main>
      </div>

      {/* Create Collection Modal */}
      {showCreateModal && (
        <CreateCollectionModal 
          onClose={() => setShowCreateModal(false)} 
          onSuccess={() => setShowCreateModal(false)} 
        />
      )}
    </div>
  );
}
