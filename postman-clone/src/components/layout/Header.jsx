import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useWorkspace } from '../../context/WorkspaceContext';
import { FiUser, FiLogOut, FiChevronDown, FiSearch, FiPlus, FiSettings, FiHome, FiX, FiTrash2, FiUsers } from 'react-icons/fi';


export default function Header({ isCollapsed, onToggleSidebar }) {
  const { user, logout } = useAuth();
  const { workspaces, activeWorkspace, switchWorkspace, createWorkspace, deleteWorkspace } = useWorkspace();
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showWorkspaceMenu, setShowWorkspaceMenu] = useState(false);
  const [newWorkspaceName, setNewWorkspaceName] = useState('');




  const handleCreateWorkspace = async () => {
    if (newWorkspaceName.trim()) {
      try {
        await createWorkspace(newWorkspaceName);
        setNewWorkspaceName('');
        setShowWorkspaceMenu(false);
      } catch (error) {
        console.error('Failed to create workspace');
      }
    }
  };

  const handleDeleteWorkspace = async (workspaceId) => {
    if (window.confirm('Delete this workspace?')) {
      try {
        await deleteWorkspace(workspaceId);
      } catch (error) {
        console.error('Failed to delete workspace');
      }
    }
  };

  return (
    <div className="bg-dark-surface ">
      {/* Top Bar */}
      <div className="h-11 flex items-center justify-between px-4 border-b border-dark-border">
        {/* Left */}
        <div className="flex items-center gap-4">
          

          <button 
            onClick={() => window.location.href = '/'}
            className="px-3 py-1.5 hover:bg-dark-hover rounded text-dark-text text-xs flex items-center gap-2 "
          >
            <FiHome size={13} />
            Home
          </button>

          <div className="relative">
            <button
              onClick={() => setShowWorkspaceMenu(!showWorkspaceMenu)}
              className="px-3 py-1.5 hover:bg-dark-hover rounded text-dark-text text-xs flex items-center gap-2 "
            >
              <span>{activeWorkspace?.name || 'Workspace'}</span>
              <FiChevronDown size={11} />
            </button>

            {showWorkspaceMenu && (
              <>
                <div className="fixed inset-0 z-10" onClick={() => setShowWorkspaceMenu(false)} />
                <div className="absolute left-0 mt-2 w-80 bg-dark-surface rounded-lg shadow-2xl border border-dark-border z-20">
                  <div className="p-2 max-h-48 overflow-y-auto">
                    {workspaces.map(workspace => (
                      <div key={workspace.id} className="flex items-center justify-between hover:bg-dark-hover rounded px-2 py-1.5 group">
                        <button
                          onClick={() => {
                            switchWorkspace(workspace);
                            setShowWorkspaceMenu(false);
                          }}
                          className={`flex-1 text-left text-sm ${
                            activeWorkspace?.id === workspace.id
                              ? 'text-primary font-medium'
                              : 'text-dark-text'
                          }`}
                        >
                          {workspace.name}
                        </button>
                        <button
                          onClick={() => handleDeleteWorkspace(workspace.id)}
                          className="opacity-0 group-hover:opacity-100 p-1 hover:bg-red-900 hover:bg-opacity-30 rounded transition text-red-400"
                        >
                          <FiTrash2 size={12} />
                        </button>
                      </div>
                    ))}
                  </div>
                  <div className="p-2 border-t border-dark-border">
                    <input
                      type="text"
                      value={newWorkspaceName}
                      onChange={(e) => setNewWorkspaceName(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && handleCreateWorkspace()}
                      placeholder="New workspace"
                      className="w-full px-2 py-1.5 bg-dark-bg border border-dark-border rounded text-dark-text text-xs mb-2 focus:outline-none focus:ring-1 focus:ring-primary"
                    />
                    <button
                      onClick={handleCreateWorkspace}
                      className="w-full bg-primary text-white py-1.5 rounded hover:bg-primary-dark text-xs font-medium transition"
                    >
                      Create
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Center - Search */}
        <div className="flex-1 max-w-xl mx-8">
          <div className="relative">
            <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-dark-text-secondary" size={13} />
            <input
              type="text"
              placeholder="Search Postman"
              className="w-full pl-9 pr-16 py-1.5 bg-dark-bg border border-dark-border rounded text-dark-text text-xs focus:outline-none focus:ring-1 focus:ring-primary transition"
            />
            <kbd className="absolute right-3 top-1/2 -translate-y-1/2 px-2 py-0.5 bg-dark-surface border border-dark-border rounded text-xs text-dark-text-secondary">
              Ctrl K
            </kbd>
          </div>
        </div>

        {/* Right - User */}
        <div className="flex items-center gap-3">
          <button className="p-1.5 hover:bg-dark-hover rounded text-dark-text transition">
            <FiSettings size={15} />
          </button>

          <div className="relative">
            <button
              onClick={() => setShowUserMenu(!showUserMenu)}
              className="flex items-center gap-2 hover:bg-dark-hover px-2 py-1 rounded transition"
            >
              <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center">
                <span className="text-white text-xs font-bold">{user?.name?.charAt(0).toUpperCase()}</span>
              </div>
              <span className="text-xs text-dark-text">{user?.name}</span>
              <FiChevronDown size={11} className="text-dark-text-secondary" />
            </button>

            {showUserMenu && (
              <>
                <div className="fixed inset-0 z-10" onClick={() => setShowUserMenu(false)} />
                <div className="absolute right-0 mt-2 w-48 bg-dark-surface rounded-lg shadow-2xl border border-dark-border z-20">
                  <div className="px-4 py-3 border-b border-dark-border">
                    <p className="text-sm text-dark-text">{user?.name}</p>
                    <p className="text-xs text-dark-text-secondary">{user?.email}</p>
                  </div>
                  <button
                    onClick={() => { logout(); setShowUserMenu(false); }}
                    className="w-full px-4 py-2 text-left hover:bg-dark-hover flex items-center gap-2 text-red-400 text-sm transition"
                  >
                    <FiLogOut size={13} />
                    Sign Out
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      
    </div>
  );
}
