import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { authService } from '../../services/authService';
import { useWorkspace } from '../../contexts/WorkspaceContext';
import ProfileEditModal from '../common/ProfileEditModal';
import FriendAddModal from '../common/FriendAddModal';
import TeamSpaceModal from '../common/TeamSpaceModal';
import './Sidebar.css';

function Sidebar() {
  const navigate = useNavigate();
  const { currentWorkspace, workspaces, selectWorkspace, addTeamWorkspace } = useWorkspace();
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [friendModalOpen, setFriendModalOpen] = useState(false);
  const [teamSpaceModalOpen, setTeamSpaceModalOpen] = useState(false);
  const userMenuRef = useRef(null);

  const handleLogout = () => {
    authService.logout();
    navigate('/');
  };

  const handleAddTeamSpace = () => {
    setTeamSpaceModalOpen(true);
  };

  const handleCreateTeam = (teamData) => {
    addTeamWorkspace(teamData);
  };

  const handleWorkspaceClick = (workspaceId, type) => {
    selectWorkspace(workspaceId, type);
  };

  const handleUserNameClick = () => {
    setUserMenuOpen(!userMenuOpen);
  };

  const handleEditClick = () => {
    setUserMenuOpen(false);
    setEditModalOpen(true);
  };

  const handleFriendClick = () => {
    setUserMenuOpen(false);
    setFriendModalOpen(true);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
        setUserMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <div className="user-profile" ref={userMenuRef}>
          <span className="user-icon">👤</span>
          <span className="user-name" onClick={handleUserNameClick}>서다솜</span>
          {userMenuOpen && (
            <div className="user-menu">
              <button className="user-menu-option" onClick={handleEditClick}>
                <span className="menu-icon">✏️</span>
                edit
              </button>
              <button className="user-menu-option" onClick={handleFriendClick}>
                <span className="menu-icon">👤</span>
                friend
              </button>
            </div>
          )}
        </div>
        <button className="collapse-btn">«</button>
      </div>

      <nav className="sidebar-nav">
        <div className="nav-section">
          <div className="nav-title-wrapper">
            <h3 className="nav-title">함께하는 공간</h3>
            <button className="add-team-btn" onClick={handleAddTeamSpace}>+</button>
          </div>
          <ul className="nav-list">
            {workspaces.team.map((workspace) => (
              <li
                key={workspace.id}
                className={`nav-item ${
                  currentWorkspace.id === workspace.id ? 'active' : ''
                }`}
                onClick={() => handleWorkspaceClick(workspace.id, 'team')}
              >
                {workspace.title}
              </li>
            ))}
          </ul>
        </div>

        <div className="nav-section">
          <h3 className="nav-title">내 공간</h3>
          <ul className="nav-list">
            {workspaces.personal.map((workspace) => (
              <li
                key={workspace.id}
                className={`nav-item ${
                  currentWorkspace.id === workspace.id ? 'active' : ''
                }`}
                onClick={() => handleWorkspaceClick(workspace.id, 'personal')}
              >
                {workspace.title}
              </li>
            ))}
          </ul>
        </div>
      </nav>

      <button className="logout-btn" onClick={handleLogout}>
        로그아웃
      </button>

      <ProfileEditModal
        isOpen={editModalOpen}
        onClose={() => setEditModalOpen(false)}
      />

      <FriendAddModal
        isOpen={friendModalOpen}
        onClose={() => setFriendModalOpen(false)}
      />

      <TeamSpaceModal
        isOpen={teamSpaceModalOpen}
        onClose={() => setTeamSpaceModalOpen(false)}
        onCreateTeam={handleCreateTeam}
      />
    </aside>
  );
}

export default Sidebar;
