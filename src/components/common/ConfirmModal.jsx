import Modal from './Modal';
import './ConfirmModal.css';

function ConfirmModal({ isOpen, onClose, onConfirm, title, message }) {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="confirm-modal">
        <h3 className="confirm-title">{title}</h3>
        <p className="confirm-message">{message}</p>
        <div className="confirm-actions">
          <button className="confirm-btn cancel" onClick={onClose}>
            취소
          </button>
          <button className="confirm-btn confirm" onClick={onConfirm}>
            확인
          </button>
        </div>
      </div>
    </Modal>
  );
}

export default ConfirmModal;
