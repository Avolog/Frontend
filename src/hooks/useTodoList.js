import { useState, useEffect } from 'react';
import { INITIAL_TODOS } from '../constants/todo';

const STORAGE_KEY = 'avolog_todos_by_date';

const getInitialTodos = (date) => {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (saved) {
    const allTodos = JSON.parse(saved);
    return allTodos[date] || INITIAL_TODOS;
  }
  return INITIAL_TODOS;
};

const saveAllTodos = (date, todos) => {
  const saved = localStorage.getItem(STORAGE_KEY);
  const allTodos = saved ? JSON.parse(saved) : {};
  allTodos[date] = todos;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(allTodos));
};

export const useTodoList = (selectedDate) => {
  const [todos, setTodos] = useState(() => getInitialTodos(selectedDate));

  useEffect(() => {
    setTodos(getInitialTodos(selectedDate));
  }, [selectedDate]);

  useEffect(() => {
    if (selectedDate) {
      saveAllTodos(selectedDate, todos);
    }
  }, [todos, selectedDate]);

  const toggleTodo = (categoryId, itemId) => {
    setTodos((prev) =>
      prev.map((category) =>
        category.id === categoryId
          ? {
              ...category,
              items: category.items.map((item) =>
                item.id === itemId
                  ? { ...item, completed: !item.completed }
                  : item
              ),
            }
          : category
      )
    );
  };

  const addTodo = (categoryId, itemData) => {
    setTodos((prev) =>
      prev.map((category) =>
        category.id === categoryId
          ? {
              ...category,
              items: [
                ...category.items,
                {
                  id: Date.now(),
                  text: typeof itemData === 'string' ? itemData : itemData.text,
                  completed: false,
                  frequency: typeof itemData === 'object' ? itemData.frequency : 'default',
                  frequencyCount: typeof itemData === 'object' ? itemData.frequencyCount : 1,
                },
              ],
            }
          : category
      )
    );
  };

  const updateTodo = (categoryId, itemId, itemData) => {
    setTodos((prev) =>
      prev.map((category) =>
        category.id === categoryId
          ? {
              ...category,
              items: category.items.map((item) =>
                item.id === itemId
                  ? {
                      ...item,
                      text: itemData.text,
                      frequency: itemData.frequency,
                      frequencyCount: itemData.frequencyCount,
                    }
                  : item
              ),
            }
          : category
      )
    );
  };

  const removeTodo = (categoryId, itemId) => {
    setTodos((prev) =>
      prev.map((category) =>
        category.id === categoryId
          ? {
              ...category,
              items: category.items.filter((item) => item.id !== itemId),
            }
          : category
      )
    );
  };

  const addCategory = (categoryName) => {
    setTodos((prev) => [
      ...prev,
      {
        id: Date.now(),
        category: categoryName,
        items: [],
      },
    ]);
  };

  const removeCategory = (categoryId) => {
    setTodos((prev) => prev.filter((category) => category.id !== categoryId));
  };

  return {
    todos,
    toggleTodo,
    addTodo,
    updateTodo,
    removeTodo,
    addCategory,
    removeCategory,
  };
};
