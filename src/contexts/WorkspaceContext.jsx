import { createContext, useContext, useState, useEffect } from 'react';

const WorkspaceContext = createContext();

const STORAGE_KEY = 'avolog_workspaces';

const getInitialWorkspaces = () => {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (saved) {
    return JSON.parse(saved);
  }
  return {
    team: [
      { id: 'team-1', title: '미요 팀', subtitle: '' },
      { id: 'team-2', title: '배주아 팀', subtitle: '' },
    ],
    personal: [
      { id: 'workspace-1', title: '노놈놈의 아자아자', subtitle: '올해도 가보자구~~' },
    ],
  };
};

export function WorkspaceProvider({ children }) {
  const [workspaces, setWorkspaces] = useState(getInitialWorkspaces);
  const [currentWorkspace, setCurrentWorkspace] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEY + '_current');
    if (saved) {
      return JSON.parse(saved);
    }
    return {
      id: 'workspace-1',
      title: '노놈놈의 아자아자',
      subtitle: '올해도 가보자구~~',
      type: 'personal',
    };
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(workspaces));
  }, [workspaces]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY + '_current', JSON.stringify(currentWorkspace));
  }, [currentWorkspace]);

  const selectWorkspace = (workspaceId, type) => {
    const workspace = workspaces[type]?.find((w) => w.id === workspaceId);
    if (workspace) {
      setCurrentWorkspace({ ...workspace, type });
    }
  };

  const updateWorkspaceTitle = (title) => {
    setCurrentWorkspace((prev) => {
      const updated = { ...prev, title };

      // workspaces 목록도 업데이트
      setWorkspaces((prevWorkspaces) => ({
        ...prevWorkspaces,
        [prev.type]: prevWorkspaces[prev.type].map((w) =>
          w.id === prev.id ? { ...w, title } : w
        ),
      }));

      return updated;
    });
  };

  const updateWorkspaceSubtitle = (subtitle) => {
    setCurrentWorkspace((prev) => {
      const updated = { ...prev, subtitle };

      // workspaces 목록도 업데이트
      setWorkspaces((prevWorkspaces) => ({
        ...prevWorkspaces,
        [prev.type]: prevWorkspaces[prev.type].map((w) =>
          w.id === prev.id ? { ...w, subtitle } : w
        ),
      }));

      return updated;
    });
  };

  const addTeamWorkspace = (teamData) => {
    const newTeam = {
      id: `team-${Date.now()}`,
      title: teamData.name,
      subtitle: teamData.description,
      members: teamData.friends,
    };

    setWorkspaces((prev) => ({
      ...prev,
      team: [...prev.team, newTeam],
    }));

    // 새로 생성한 팀 스페이스로 이동
    setCurrentWorkspace({ ...newTeam, type: 'team' });
  };

  return (
    <WorkspaceContext.Provider
      value={{
        currentWorkspace,
        workspaces,
        selectWorkspace,
        updateWorkspaceTitle,
        updateWorkspaceSubtitle,
        addTeamWorkspace,
      }}
    >
      {children}
    </WorkspaceContext.Provider>
  );
}

export function useWorkspace() {
  const context = useContext(WorkspaceContext);
  if (!context) {
    throw new Error('useWorkspace must be used within WorkspaceProvider');
  }
  return context;
}
