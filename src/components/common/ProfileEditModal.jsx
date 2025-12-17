import { useState } from 'react';
import Modal from './Modal';
import './ProfileEditModal.css';

function ProfileEditModal({ isOpen, onClose }) {
  const [nickname, setNickname] = useState('서다솜');
  const [profileImage, setProfileImage] = useState(null);
  const [friends, setFriends] = useState([
    { id: 1, name: '친구1' },
    { id: 2, name: '친구2' },
    { id: 3, name: '친구3' },
  ]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveFriend = (friendId) => {
    setFriends(friends.filter((friend) => friend.id !== friendId));
  };

  const handleSave = () => {
    // TODO: 프로필 저장 로직
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="profile-edit-modal">
        <h2 className="profile-edit-title">프로필 편집</h2>

        <div className="profile-section">
          <h3 className="section-title">프로필 사진</h3>
          <div className="profile-image-section">
            <div className="profile-image-preview">
              {profileImage ? (
                <img src={profileImage} alt="Profile" />
              ) : (
                <span className="profile-icon-large">👤</span>
              )}
            </div>
            <label className="upload-btn">
              사진 업로드
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                style={{ display: 'none' }}
              />
            </label>
          </div>
        </div>

        <div className="profile-section">
          <h3 className="section-title">닉네임</h3>
          <input
            type="text"
            className="nickname-input"
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
            placeholder="닉네임 입력"
          />
        </div>

        <div className="profile-section">
          <h3 className="section-title">친구 목록</h3>
          <div className="friends-list">
            {friends.map((friend) => (
              <div key={friend.id} className="friend-item">
                <span className="friend-icon">👤</span>
                <span className="friend-name">{friend.name}</span>
                <button
                  className="remove-friend-btn"
                  onClick={() => handleRemoveFriend(friend.id)}
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="modal-actions">
          <button className="modal-btn cancel" onClick={onClose}>
            취소
          </button>
          <button className="modal-btn save" onClick={handleSave}>
            저장
          </button>
        </div>
      </div>
    </Modal>
  );
}

export default ProfileEditModal;
