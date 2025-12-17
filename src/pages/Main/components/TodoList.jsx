import { useState, useEffect, useRef } from 'react';
import { useTodoList } from '../../../hooks';
import { ConfirmModal } from '../../../components/common';
import AddItemModal from './AddItemModal';
import './TodoList.css';

function TodoList({ selectedDate }) {
  const { todos, toggleTodo, addTodo, updateTodo, removeTodo, addCategory, removeCategory } = useTodoList(selectedDate);
  const [addingCategory, setAddingCategory] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);
  const [selectedCategoryName, setSelectedCategoryName] = useState('');
  const [editingItem, setEditingItem] = useState(null);
  const [menuOpenItemId, setMenuOpenItemId] = useState(null);
  const [confirmModalOpen, setConfirmModalOpen] = useState(false);
  const [categoryToDelete, setCategoryToDelete] = useState(null);

  const handleAddCategoryClick = () => {
    setAddingCategory(true);
  };

  const handleCategorySubmit = () => {
    if (newCategoryName.trim()) {
      addCategory(newCategoryName.trim());
      setNewCategoryName('');
    }
    setAddingCategory(false);
  };

  const handleCategoryKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleCategorySubmit();
    } else if (e.key === 'Escape') {
      setNewCategoryName('');
      setAddingCategory(false);
    }
  };

  const handleAddItemClick = (categoryId, categoryName) => {
    setSelectedCategoryId(categoryId);
    setSelectedCategoryName(categoryName);
    setModalOpen(true);
  };

  const handleModalClose = () => {
    setModalOpen(false);
    setSelectedCategoryId(null);
    setSelectedCategoryName('');
    setEditingItem(null);
  };

  const handleAddOrUpdateItem = (itemData) => {
    if (selectedCategoryId) {
      if (editingItem) {
        updateTodo(selectedCategoryId, editingItem.id, itemData);
      } else {
        addTodo(selectedCategoryId, itemData);
      }
    }
  };

  const handleMenuToggle = (itemId) => {
    setMenuOpenItemId(menuOpenItemId === itemId ? null : itemId);
  };

  const handleEditItemClick = (categoryId, item, categoryName) => {
    setSelectedCategoryId(categoryId);
    setSelectedCategoryName(categoryName);
    setEditingItem(item);
    setModalOpen(true);
    setMenuOpenItemId(null);
  };

  const handleDeleteItemClick = (categoryId, itemId) => {
    removeTodo(categoryId, itemId);
    setMenuOpenItemId(null);
  };

  const handleDeleteCategoryClick = (category) => {
    if (category.items.length === 0) {
      removeCategory(category.id);
    } else {
      setCategoryToDelete(category);
      setConfirmModalOpen(true);
    }
  };

  const handleConfirmDelete = () => {
    if (categoryToDelete) {
      removeCategory(categoryToDelete.id);
      setCategoryToDelete(null);
      setConfirmModalOpen(false);
    }
  };

  const handleCancelDelete = () => {
    setCategoryToDelete(null);
    setConfirmModalOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuOpenItemId && !event.target.closest('.item-menu-container')) {
        setMenuOpenItemId(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [menuOpenItemId]);

  return (
    <div className="todo-list">
      <div className="todo-header">
        <h2 className="todo-title">To do List
          <button className="add-category-btn" onClick={handleAddCategoryClick}>
            +
          </button>
        </h2>

      </div>

      {todos.map((category) => (
        <div key={category.id} className="todo-category">
          <div className="category-header">
            <h3 className="category-title">
              <button
                className="delete-category-btn"
                onClick={() => handleDeleteCategoryClick(category)}
              >
                🥑
              </button>
              {category.category}
              <button
                className="add-item-btn"
                onClick={() => handleAddItemClick(category.id, category.category)}
              >
                +
              </button>
            </h3>
          </div>
          <ul className="todo-items">
            {category.items.map((item) => (
              <li key={item.id} className="todo-item">
                <button
                  className={`todo-checkbox ${item.completed ? 'completed' : ''}`}
                  onClick={() => toggleTodo(category.id, item.id)}
                >
                  {item.completed && '●'}
                </button>
                <span className={item.completed ? 'completed-text' : ''}>
                  {item.text}
                </span>
                <div className="item-menu-container">
                  <button
                    className="edit-item-btn"
                    onClick={() => handleMenuToggle(item.id)}
                  >
                    ⋯
                  </button>
                  {menuOpenItemId === item.id && (
                    <div className="item-menu">
                      <button
                        className="menu-option edit-option"
                        onClick={() => handleEditItemClick(category.id, item, category.category)}
                      >
                        <span className="menu-icon">✏️</span>
                        edit
                      </button>
                      <button
                        className="menu-option delete-option"
                        onClick={() => handleDeleteItemClick(category.id, item.id)}
                      >
                        <span className="menu-icon">🗑️</span>
                        delete
                      </button>
                    </div>
                  )}
                </div>
              </li>
            ))}
          </ul>
        </div>
      ))}

      {addingCategory && (
        <div className="todo-category">
          <div className="category-header">
            <input
              type="text"
              className="category-input"
              value={newCategoryName}
              onChange={(e) => setNewCategoryName(e.target.value)}
              onBlur={handleCategorySubmit}
              onKeyDown={handleCategoryKeyDown}
              placeholder="새 카테고리 이름"
              autoFocus
            />
          </div>
        </div>
      )}

      <AddItemModal
        isOpen={modalOpen}
        onClose={handleModalClose}
        onAdd={handleAddOrUpdateItem}
        categoryName={selectedCategoryName}
        editItem={editingItem}
      />

      <ConfirmModal
        isOpen={confirmModalOpen}
        onClose={handleCancelDelete}
        onConfirm={handleConfirmDelete}
        title="카테고리 삭제"
        message={
          categoryToDelete
            ? `${categoryToDelete.items.length}개의 할 일이 존재하는데 카테고리를 삭제하시겠어요?`
            : ''
        }
      />
    </div>
  );
}

export default TodoList;
