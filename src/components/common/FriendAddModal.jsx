import { useState } from 'react';
import Modal from './Modal';
import './FriendAddModal.css';

function FriendAddModal({ isOpen, onClose }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [users, setUsers] = useState([
    { id: 1, name: '닉네임0' },
    { id: 2, name: '닉네임1' },
    { id: 3, name: '닉네임2' },
    { id: 4, name: '닉네임3' },
  ]);

  const handleAddFriend = (userId) => {
    // TODO: 친구 추가 로직
    alert(`친구 추가: ${users.find((u) => u.id === userId)?.name}`);
  };

  const handleSearch = () => {
    // TODO: 검색 로직
    console.log('검색:', searchQuery);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="friend-add-modal">
        <div className="search-section">
          <input
            type="text"
            className="search-input"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="친구 검색"
          />
          <button className="search-btn" onClick={handleSearch}>
            🔍
          </button>
        </div>

        <div className="users-list">
          {users.map((user) => (
            <div key={user.id} className="user-item">
              <span className="user-icon">👤</span>
              <span className="user-name-text">{user.name}</span>
              <button
                className="add-friend-btn"
                onClick={() => handleAddFriend(user.id)}
              >
                친구 추가
              </button>
            </div>
          ))}
        </div>

        <div className="modal-footer">
          <button className="close-btn" onClick={onClose}>
            닫기
          </button>
        </div>
      </div>
    </Modal>
  );
}

export default FriendAddModal;
