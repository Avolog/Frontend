import { useState } from 'react';
import Modal from './Modal';
import './TeamSpaceModal.css';

function TeamSpaceModal({ isOpen, onClose, onCreateTeam }) {
  const [groupName, setGroupName] = useState('');
  const [groupDescription, setGroupDescription] = useState('');
  const [selectedFriends, setSelectedFriends] = useState([]);
  const [availableFriends] = useState([
    { id: 1, name: '친구1' },
    { id: 2, name: '친구2' },
    { id: 3, name: '친구3' },
    { id: 4, name: '친구4' },
  ]);

  const handleToggleFriend = (friendId) => {
    setSelectedFriends((prev) =>
      prev.includes(friendId)
        ? prev.filter((id) => id !== friendId)
        : [...prev, friendId]
    );
  };

  const handleCreate = () => {
    if (groupName.trim()) {
      onCreateTeam({
        name: groupName.trim(),
        description: groupDescription.trim(),
        friends: selectedFriends,
      });
      handleClose();
    }
  };

  const handleClose = () => {
    setGroupName('');
    setGroupDescription('');
    setSelectedFriends([]);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose}>
      <div className="team-space-modal">
        <h2 className="team-modal-title">새 팀 스페이스 만들기</h2>

        <div className="team-section">
          <h3 className="team-section-title">그룹명</h3>
          <input
            type="text"
            className="team-input"
            value={groupName}
            onChange={(e) => setGroupName(e.target.value)}
            placeholder="그룹 이름을 입력하세요"
          />
        </div>

        <div className="team-section">
          <h3 className="team-section-title">그룹 소개</h3>
          <textarea
            className="team-textarea"
            value={groupDescription}
            onChange={(e) => setGroupDescription(e.target.value)}
            placeholder="그룹에 대한 간단한 소개를 입력하세요"
            rows="3"
          />
        </div>

        <div className="team-section">
          <h3 className="team-section-title">초대할 친구</h3>
          <div className="friends-invite-list">
            {availableFriends.map((friend) => (
              <label key={friend.id} className="friend-invite-item">
                <input
                  type="checkbox"
                  checked={selectedFriends.includes(friend.id)}
                  onChange={() => handleToggleFriend(friend.id)}
                />
                <span className="friend-icon">👤</span>
                <span className="friend-name">{friend.name}</span>
              </label>
            ))}
          </div>
        </div>

        <div className="team-modal-actions">
          <button className="team-modal-btn cancel" onClick={handleClose}>
            취소
          </button>
          <button
            className="team-modal-btn create"
            onClick={handleCreate}
            disabled={!groupName.trim()}
          >
            생성
          </button>
        </div>
      </div>
    </Modal>
  );
}

export default TeamSpaceModal;
