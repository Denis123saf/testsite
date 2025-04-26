// Основной JavaScript файл

document.addEventListener('DOMContentLoaded', function() {
  console.log('Сайт ресторана "Съели Сумели" загружен');
  
  // Анимация появления элементов на главной странице
  setTimeout(function() {
    document.querySelector('.main-title').style.opacity = '1';
  }, 500);
  
  setTimeout(function() {
    document.querySelector('.subtitle').style.opacity = '1';
  }, 1000);
  
  setTimeout(function() {
    document.querySelector('.buttons-container').style.opacity = '1';
  }, 1500);
  
  // Элементы интерфейса
  const header = document.querySelector('.syelisumely-header');
  const logo = document.querySelector('.site-logo-container');
  const mobileMenuIcon = document.querySelector('.mobile-menu-icon');
  const mobileMenu = document.querySelector('.mobile-menu');
  const mobileMenuClose = document.querySelector('.mobile-menu-close');
  const mobileMenuOverlay = document.querySelector('.mobile-menu-overlay');
  const mobileMenuLinks = document.querySelectorAll('.mobile-nav a');
  
  // Фиксация шапки и логотипа при скролле
  function handleScroll() {
    // Добавляем класс для улучшения отображения на мобильных устройствах
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
      if (logo) logo.classList.add('scrolled');
      if (mobileMenuIcon) mobileMenuIcon.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
      if (logo) logo.classList.remove('scrolled');
      if (mobileMenuIcon) mobileMenuIcon.classList.remove('scrolled');
    }
  }
  
  window.addEventListener('scroll', handleScroll);
  handleScroll(); // Проверяем при загрузке страницы
  
  // Мобильное меню
  
  // Открытие мобильного меню
  if (mobileMenuIcon) {
    mobileMenuIcon.addEventListener('click', function() {
      mobileMenu.classList.add('active');
      mobileMenuOverlay.classList.add('active');
      document.body.style.overflow = 'hidden'; // Запрещаем прокрутку страницы
    });
  }
  
  // Закрытие мобильного меню по клику на крестик
  if (mobileMenuClose) {
    mobileMenuClose.addEventListener('click', function() {
      closeMobileMenu();
    });
  }
  
  // Закрытие мобильного меню по клику на оверлей
  if (mobileMenuOverlay) {
    mobileMenuOverlay.addEventListener('click', function() {
      closeMobileMenu();
    });
  }
  
  // Закрытие мобильного меню по клику на ссылку
  if (mobileMenuLinks.length > 0) {
    mobileMenuLinks.forEach(function(link) {
      link.addEventListener('click', function() {
        closeMobileMenu();
      });
    });
  }
  
  // Функция закрытия мобильного меню
  function closeMobileMenu() {
    mobileMenu.classList.remove('active');
    mobileMenuOverlay.classList.remove('active');
    document.body.style.overflow = ''; // Разрешаем прокрутку страницы
  }
  
  // Плавный скролл для якорных ссылок
  const anchorLinks = document.querySelectorAll('a[href^="#"]');
  
  anchorLinks.forEach(function(link) {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      
      // Получаем id секции из атрибута href
      const targetId = this.getAttribute('href');
      
      // Если это просто "#", то скроллим в начало страницы
      if (targetId === '#') {
        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        });
        return;
      }
      
      // Находим элемент по id
      const targetElement = document.querySelector(targetId);
      
      if (targetElement) {
        // Получаем позицию элемента с учетом высоты хедера
        const headerHeight = document.querySelector('.syelisumely-header').offsetHeight;
        const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
        
        // Скроллим к элементу с учетом высоты хедера
        window.scrollTo({
          top: targetPosition - headerHeight - 20, // Дополнительный отступ
          behavior: 'smooth'
        });
      }
    });
  });
  
  // Функция для подсветки активного пункта меню при скролле
  function highlightMenuOnScroll() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.main-nav a[href^="#"]');
    
    // Получаем текущую позицию скролла
    const scrollPosition = window.scrollY;
    
    // Проверяем, находимся ли мы в какой-либо секции
    sections.forEach(function(section) {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute('id');
      
      if (scrollPosition >= sectionTop - 200 && scrollPosition < sectionTop + sectionHeight - 200) {
        // Удаляем активный класс со всех ссылок
        navLinks.forEach(function(link) {
          link.classList.remove('active');
        });
        
        // Добавляем активный класс к соответствующей ссылке
        const activeLink = document.querySelector(`.main-nav a[href="#${sectionId}"]`);
        if (activeLink) {
          activeLink.classList.add('active');
        }
      }
    });
  }
  
  // Вызываем функцию подсветки при скролле
  window.addEventListener('scroll', highlightMenuOnScroll);
  highlightMenuOnScroll(); // Вызываем сразу при загрузке
  
  // Анимация появления элементов при скролле
  const animatedElements = ['.about-image', '.about-content', '.map-frame', '.contact-info', '.reviews-frame'];
  
  function checkScroll() {
    animatedElements.forEach(function(elementClass) {
      const elements = document.querySelectorAll(elementClass);
      elements.forEach(function(element) {
        if (isElementInViewport(element)) {
          element.classList.add('visible');
        }
      });
    });
  }
  
  function isElementInViewport(el) {
    const rect = el.getBoundingClientRect();
    return (
      rect.top <= (window.innerHeight || document.documentElement.clientHeight) * 0.8
    );
  }
  
  // Добавляем эффект паузы при наведении на слайдер хитов
  const hitsSlider = document.querySelector('.hits-track');
  if (hitsSlider) {
    hitsSlider.addEventListener('mouseenter', function() {
      this.style.animationPlayState = 'paused';
    });
    
    hitsSlider.addEventListener('mouseleave', function() {
      this.style.animationPlayState = 'running';
    });
    
    // Для мобильных: останавливаем слайдер при касании
    hitsSlider.addEventListener('touchstart', function() {
      this.style.animationPlayState = 'paused';
    });
    
    hitsSlider.addEventListener('touchend', function() {
      this.style.animationPlayState = 'running';
    });
  }
  
  // Проверка видимости элементов при прокрутке
  window.addEventListener('scroll', checkScroll);
  checkScroll(); // Проверяем при загрузке страницы
  
  // Принудительно показываем отзывы через 2 секунды после загрузки страницы
  setTimeout(function() {
    const reviewsFrame = document.querySelector('.reviews-frame');
    if (reviewsFrame) {
      reviewsFrame.classList.add('visible');
    }
  }, 2000);
}); 