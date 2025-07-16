document.addEventListener('DOMContentLoaded', function() {
    // Обработчик формы регистрации
    const registerForm = document.querySelector('.register-form');
    if (registerForm) {
        registerForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            const form = e.target;
            const messageDiv = document.getElementById('registerMessage');
            
            // Валидация формы на клиенте
            const password = form.querySelector('#reg-password').value;
            const confirmPassword = form.querySelector('#reg-confirm').value;
            
            if (password !== confirmPassword) {
                messageDiv.textContent = 'Пароли не совпадают';
                messageDiv.className = 'feedback-message error';
                messageDiv.style.display = 'block';
                return;
            }
            
            // Показываем сообщение о загрузке
            messageDiv.textContent = 'Отправка данных...';
            messageDiv.className = 'feedback-message';
            messageDiv.style.display = 'block';
            
            try {
                const formData = new FormData(form);
                const response = await fetch(form.action, {
                    method: 'POST',
                    body: formData
                });
                
                if (!response.ok) {
                    throw new Error(`Ошибка HTTP: ${response.status}`);
                }
                
                const result = await response.json();
                
                messageDiv.textContent = result.message;
                messageDiv.className = result.success ? 
                    'feedback-message success' : 'feedback-message error';
                
                if (result.success) {
                    form.reset();
                }
            } catch (error) {
                console.error('Ошибка:', error);
                messageDiv.textContent = 'Ошибка при отправке формы: ' + error.message;
                messageDiv.className = 'feedback-message error';
            }
        });
    }

    // Остальной код (ToDo List и т.д.)
    document.getElementById('addTodo')?.addEventListener('click', function() {
        const input = document.getElementById('todoInput');
        const taskText = input.value.trim();

        if (taskText) {
            const li = document.createElement('li');
            li.className = 'todo-item';
            li.innerHTML = `
                <span class="todo-text">${taskText}</span>
                <div class="todo-actions">
                    <button class="complete-btn"><i class="fas fa-check"></i></button>
                    <button class="delete-btn"><i class="fas fa-trash"></i></button>
                </div>
            `;
            document.getElementById('todoList').appendChild(li);
            input.value = '';
            updateStats();
            
            li.querySelector('.complete-btn').addEventListener('click', function() {
                li.classList.toggle('completed');
                updateStats();
            });
            
            li.querySelector('.delete-btn').addEventListener('click', function() {
                li.remove();
                updateStats();
            });
        }
    });

    function updateStats() {
        const total = document.querySelectorAll('.todo-item').length;
        const completed = document.querySelectorAll('.todo-item.completed').length;
        document.getElementById('totalTasks').textContent = `Всего задач: ${total}`;
        document.getElementById('completedTasks').textContent = `Выполнено: ${completed}`;
    }
});

