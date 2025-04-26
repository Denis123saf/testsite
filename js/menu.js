document.addEventListener('DOMContentLoaded', function() {
  const tabs = document.querySelectorAll('.menu-tab');
  const tabContents = document.querySelectorAll('.menu-tab-content');

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      // Удаляем активный класс у всех табов
      tabs.forEach(t => t.classList.remove('active'));
      // Добавляем активный класс нажатому табу
      tab.classList.add('active');

      // Скрываем все содержимое табов
      tabContents.forEach(content => content.classList.remove('active'));
      // Показываем содержимое выбранного таба
      const tabId = tab.getAttribute('data-tab');
      document.getElementById(tabId).classList.add('active');
    });
  });
}); 