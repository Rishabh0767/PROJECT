import { createContext, useState, useContext, useEffect } from 'react';
import { workspaceService } from '../services/workspaceService';
import { toast } from 'react-toastify';

const WorkspaceContext = createContext(null);

export const WorkspaceProvider = ({ children }) => {
  const [workspaces, setWorkspaces] = useState([]);
  const [activeWorkspace, setActiveWorkspace] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadWorkspaces();
  }, []);

  const loadWorkspaces = async () => {
    try {
      const data = await workspaceService.getAll();
      console.log('📦 Loaded workspaces:', data);
      setWorkspaces(data);
      
      
      if (data.length > 0 && !activeWorkspace) {
        setActiveWorkspace(data[0]);
      }
    } catch (error) {
      console.error('❌ Failed to load workspaces:', error);
      toast.error('Failed to load workspaces');
    } finally {
      setLoading(false);
    }
  };

  const createWorkspace = async (name) => {
    try {
      const newWorkspace = await workspaceService.create(name);
      console.log('✅ Created workspace:', newWorkspace);
      setWorkspaces([...workspaces, newWorkspace]);
      setActiveWorkspace(newWorkspace);
      toast.success('Workspace created successfully');
      return newWorkspace;
    } catch (error) {
      console.error('❌ Failed to create workspace:', error);
      toast.error('Failed to create workspace');
      throw error;
    }
  };

  const updateWorkspace = async (id, name) => {
    try {
      const updated = await workspaceService.update(id, name);
      setWorkspaces(workspaces.map(w => w.id === id ? updated : w));
      if (activeWorkspace?.id === id) {
        setActiveWorkspace(updated);
      }
      toast.success('Workspace updated');
    } catch (error) {
      toast.error('Failed to update workspace');
      throw error;
    }
  };

  const deleteWorkspace = async (id) => {
    try {
      await workspaceService.delete(id);
      const filtered = workspaces.filter(w => w.id !== id);
      setWorkspaces(filtered);
      
      if (activeWorkspace?.id === id && filtered.length > 0) {
        setActiveWorkspace(filtered[0]);
      }
      toast.success('Workspace deleted');
    } catch (error) {
      toast.error('Failed to delete workspace');
      throw error;
    }
  };

  const switchWorkspace = (workspace) => {
    console.log('🔄 Switching to workspace:', workspace);
    setActiveWorkspace(workspace);
  };

  return (
    <WorkspaceContext.Provider value={{
      workspaces,
      activeWorkspace,
      loading,
      createWorkspace,
      updateWorkspace,
      deleteWorkspace,
      switchWorkspace,
      refreshWorkspaces: loadWorkspaces
    }}>
      {children}
    </WorkspaceContext.Provider>
  );
};

export const useWorkspace = () => {
  const context = useContext(WorkspaceContext);
  if (!context) {
    throw new Error('useWorkspace must be used within WorkspaceProvider');
  }
  return context;
};
