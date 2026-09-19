const STORAGE_KEY = "offline-todo-items";

const todoForm = document.querySelector("#todo-form");
const todoInput = document.querySelector("#todo-input");
const todoList = document.querySelector("#todo-list");
const emptyMessage = document.querySelector("#empty-message");
const remainingCount = document.querySelector("#remaining-count");
const clearCompletedButton = document.querySelector("#clear-completed");
const filterButtons = document.querySelectorAll(".filter-button");
const themeToggle = document.querySelector("#theme-toggle");
const themeIcon = document.querySelector("#theme-icon");
const themeLabel = document.querySelector("#theme-label");
const systemThemeQuery = window.matchMedia("(prefers-color-scheme: dark)");

let todos = loadTodos();
let currentFilter = "all";
let currentTheme = loadTheme();

// 取得使用者手動選擇的主題，沒有選擇時交由系統偏好決定。
function loadTheme() {
  const savedTheme = localStorage.getItem("offline-todo-theme");
  return savedTheme || (systemThemeQuery.matches ? "dark" : "light");
}

// 套用主題並更新切換按鈕的圖示、文字與無障礙狀態。
function applyTheme() {
  const isDark = currentTheme === "dark";
  document.documentElement.dataset.theme = currentTheme;
  themeIcon.textContent = isDark ? "☀️" : "🌙";
  themeLabel.textContent = isDark ? "淺色模式" : "深色模式";
  themeToggle.setAttribute("aria-pressed", String(isDark));
}

// 從 localStorage 讀取資料，若資料損壞則回到空清單。
function loadTodos() {
  try {
    const savedTodos = JSON.parse(localStorage.getItem(STORAGE_KEY));
    return Array.isArray(savedTodos) ? savedTodos : [];
  } catch (error) {
    return [];
  }
}

// 將最新清單保存到瀏覽器，讓重新整理後資料仍然存在。
function saveTodos() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
}

// 依照目前資料重新繪製清單與統計數字。
function renderTodos() {
  todoList.replaceChildren();
  const visibleTodos = todos.filter((todo) => {
    if (currentFilter === "active") return !todo.completed;
    if (currentFilter === "completed") return todo.completed;
    return true;
  });

  emptyMessage.hidden = visibleTodos.length > 0;
  emptyMessage.textContent = todos.length === 0
    ? "還沒有任何待辦事項，新增一個吧!"
    : currentFilter === "active"
      ? "目前沒有未完成事項，項目仍在清單中，只是被目前篩選條件隱藏。"
      : currentFilter === "completed"
        ? "目前沒有已完成事項，項目仍在清單中，只是被目前篩選條件隱藏。"
        : "此分類沒有待辦事項。";

  visibleTodos.forEach((todo) => {
    const item = document.createElement("li");
    item.className = "todo-item";
    item.classList.toggle("completed", todo.completed);

    const checkbox = document.createElement("input");
    checkbox.className = "todo-checkbox";
    checkbox.type = "checkbox";
    checkbox.checked = todo.completed;
    checkbox.setAttribute("aria-label", `標記「${todo.text}」為${todo.completed ? "未完成" : "已完成"}`);
    checkbox.addEventListener("change", () => {
      todo.completed = checkbox.checked;
      saveTodos();
      renderTodos();
    });

    const text = document.createElement("span");
    text.className = "todo-text";
    text.textContent = todo.text;

    const deleteButton = document.createElement("button");
    deleteButton.className = "delete-button";
    deleteButton.type = "button";
    deleteButton.textContent = "刪除";
    deleteButton.setAttribute("aria-label", `刪除「${todo.text}」`);
    deleteButton.addEventListener("click", () => {
      todos = todos.filter((itemToKeep) => itemToKeep.id !== todo.id);
      saveTodos();
      renderTodos();
    });

    item.append(checkbox, text, deleteButton);
    todoList.append(item);
  });

  const unfinishedCount = todos.filter((todo) => !todo.completed).length;
  remainingCount.textContent = `未完成：${unfinishedCount} 項`;
  clearCompletedButton.disabled = !todos.some((todo) => todo.completed);
}

todoForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const text = todoInput.value.trim();

  if (!text) {
    todoInput.focus();
    return;
  }

  todos.push({
    id: `${Date.now()}-${Math.random().toString(16).slice(2)}`,
    text,
    completed: false
  });
  saveTodos();
  renderTodos();
  todoForm.reset();
  todoInput.focus();
});

clearCompletedButton.addEventListener("click", () => {
  if (!confirm("確定要刪除所有已完成的待辦事項嗎？此操作無法復原。")) {
    return;
  }

  todos = todos.filter((todo) => !todo.completed);
  saveTodos();
  renderTodos();
});

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    currentFilter = button.dataset.filter;
    filterButtons.forEach((filterButton) => {
      const isActive = filterButton === button;
      filterButton.classList.toggle("active", isActive);
      filterButton.setAttribute("aria-pressed", String(isActive));
    });
    renderTodos();
  });
});

themeToggle.addEventListener("click", () => {
  currentTheme = currentTheme === "dark" ? "light" : "dark";
  localStorage.setItem("offline-todo-theme", currentTheme);
  applyTheme();
});

systemThemeQuery.addEventListener("change", (event) => {
  if (!localStorage.getItem("offline-todo-theme")) {
    currentTheme = event.matches ? "dark" : "light";
    applyTheme();
  }
});

applyTheme();
renderTodos();
