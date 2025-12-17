import { useState, useEffect } from 'react';
import Modal from '../../../components/common/Modal';
import './AddItemModal.css';

function AddItemModal({ isOpen, onClose, onAdd, categoryName, editItem }) {
  const [itemName, setItemName] = useState('');
  const [frequency, setFrequency] = useState('default');
  const [frequencyCount, setFrequencyCount] = useState(1);

  useEffect(() => {
    if (isOpen && editItem) {
      setItemName(editItem.text || '');
      setFrequency(editItem.frequency || 'default');
      setFrequencyCount(editItem.frequencyCount || 1);
    } else if (isOpen && !editItem) {
      setItemName('');
      setFrequency('default');
      setFrequencyCount(1);
    }
  }, [isOpen, editItem]);

  const handleSubmit = () => {
    if (itemName.trim()) {
      onAdd({
        text: itemName.trim(),
        frequency,
        frequencyCount: parseInt(frequencyCount) || 1,
      });
      handleClose();
    }
  };

  const handleClose = () => {
    setItemName('');
    setFrequency('default');
    setFrequencyCount(1);
    onClose();
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSubmit();
    } else if (e.key === 'Escape') {
      handleClose();
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose}>
      <div className="add-item-modal">
        <h3 className="modal-section-title">카테고리 명</h3>
        <p className="category-name-display">{categoryName}</p>

        <h3 className="modal-section-title">소아기 개발 끝내기</h3>
        <input
          type="text"
          className="item-name-input"
          value={itemName}
          onChange={(e) => setItemName(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="항목 이름 입력"
          autoFocus
        />

        <h3 className="modal-section-title">반복 설정</h3>
        <div className="frequency-options">
          <label className="frequency-option">
            <input
              type="radio"
              name="frequency"
              value="default"
              checked={frequency === 'default'}
              onChange={(e) => setFrequency(e.target.value)}
            />
            <span>반복 안 함</span>
          </label>
          <label className="frequency-option">
            <input
              type="radio"
              name="frequency"
              value="daily"
              checked={frequency === 'daily'}
              onChange={(e) => setFrequency(e.target.value)}
            />
            <span className="frequency-label-with-input">
              <input
                type="number"
                min="1"
                className="frequency-count-input"
                value={frequency === 'daily' ? frequencyCount : 1}
                onChange={(e) => setFrequencyCount(e.target.value)}
                disabled={frequency !== 'daily'}
              />
              일마다
            </span>
          </label>
          <label className="frequency-option">
            <input
              type="radio"
              name="frequency"
              value="weekly"
              checked={frequency === 'weekly'}
              onChange={(e) => setFrequency(e.target.value)}
            />
            <span className="frequency-label-with-input">
              <input
                type="number"
                min="1"
                className="frequency-count-input"
                value={frequency === 'weekly' ? frequencyCount : 1}
                onChange={(e) => setFrequencyCount(e.target.value)}
                disabled={frequency !== 'weekly'}
              />
              주마다
            </span>
          </label>
          <label className="frequency-option">
            <input
              type="radio"
              name="frequency"
              value="monthly"
              checked={frequency === 'monthly'}
              onChange={(e) => setFrequency(e.target.value)}
            />
            <span className="frequency-label-with-input">
              <input
                type="number"
                min="1"
                className="frequency-count-input"
                value={frequency === 'monthly' ? frequencyCount : 1}
                onChange={(e) => setFrequencyCount(e.target.value)}
                disabled={frequency !== 'monthly'}
              />
              개월마다
            </span>
          </label>
          <label className="frequency-option">
            <input
              type="radio"
              name="frequency"
              value="yearly"
              checked={frequency === 'yearly'}
              onChange={(e) => setFrequency(e.target.value)}
            />
            <span className="frequency-label-with-input">
              <input
                type="number"
                min="1"
                className="frequency-count-input"
                value={frequency === 'yearly' ? frequencyCount : 1}
                onChange={(e) => setFrequencyCount(e.target.value)}
                disabled={frequency !== 'yearly'}
              />
              년마다
            </span>
          </label>
        </div>

        <div className="modal-actions">
          <button className="modal-btn cancel-btn" onClick={handleClose}>
            취소
          </button>
          <button className="modal-btn confirm-btn" onClick={handleSubmit}>
            확인
          </button>
        </div>
      </div>
    </Modal>
  );
}

export default AddItemModal;
