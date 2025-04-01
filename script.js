function updateHeaderLayout() {
    const headerRight = document.querySelector('.header-right');
    if (!headerRight) return;

    const headerMiddle = document.querySelector('.header-middle');
    const headerSearch = document.querySelector('.header-search');

    if (headerMiddle) {
        headerMiddle.style.display = window.innerWidth <= 865 ? 'none' : 'flex';
    }

    if (window.innerWidth <= 865) {
        if (!document.querySelector('.header-menu-button')) {
            const button = document.createElement('button');
            button.classList.add('header-menu-button');
            button.style.background = 'none';
            button.style.border = 'none';
            button.style.cursor = 'pointer';

            const img = document.createElement('img');
            img.src = 'photo/menu.svg';
            img.alt = 'Menu Icon';
            img.classList.add('header-menu-icon');
            img.style.width = '32px';
            img.style.height = '30px';
            img.style.marginRight = '30px';

            button.appendChild(img);
            headerRight.appendChild(button);

            button.addEventListener('click', () => {
                toggleMobileMenu(); 
            });
        }
    } else {
        const menuButton = document.querySelector('.header-menu-button');
        if (menuButton) {
            menuButton.remove();
        }
    }

    if (headerSearch) {
        headerSearch.style.marginLeft = (window.innerWidth <= 700) ? '15px' : '20px';
    }
}

// Функция для создания мобильного меню
function createMobileMenu() {
    const mobileMenu = document.createElement('div');
    mobileMenu.classList.add('mobile-menu');
    mobileMenu.style.display = 'none'; // Скрываем меню изначально
    mobileMenu.style.position = 'fixed'; // Фиксированное позиционирование
    mobileMenu.style.top = '0'; // Прижимаем к верху страницы
    mobileMenu.style.right = '0'; // Прижимаем к правому краю
    mobileMenu.style.width = '50%'; // Изменяем ширину на полстраницы
    mobileMenu.style.backgroundColor = 'white'; // Белый фон
    mobileMenu.style.padding = '20px';
    mobileMenu.style.zIndex = '1000'; // Поверх других элементов
    mobileMenu.style.boxSizing = 'border-box';
    mobileMenu.style.textAlign = 'right'; // Выравниваем контент по правому краю
    mobileMenu.style.borderBottomLeftRadius = '20px'; // Закругляем левый нижний угол
    mobileMenu.style.borderTopLeftRadius = '20px'; // Закругляем левый верхний угол
    // mobileMenu.style.height = '100vh'; // Убираем высоту на весь экран
    // mobileMenu.style.overflowY = 'auto'; // Убираем прокрутку, больше не нужно

    // Создаем кнопку закрытия
    const closeButton = document.createElement('button');
    closeButton.classList.add('mobile-menu-close-button');
    closeButton.textContent = 'X'; // Текст кнопки - крестик
    closeButton.style.position = 'absolute';
    closeButton.style.top = '10px';
    closeButton.style.left = '10px';
    closeButton.style.background = 'none';
    closeButton.style.border = 'none';
    closeButton.style.fontSize = '24px';
    closeButton.style.cursor = 'pointer';
    closeButton.style.color = '#333';

    closeButton.addEventListener('click', () => {
        toggleMobileMenu(); 
    });

    mobileMenu.appendChild(closeButton); 

    const headerMiddle = document.querySelector('.header-middle');
    if (headerMiddle) {
        const navClone = headerMiddle.querySelector('.header-nav').cloneNode(true); 
        navClone.style.flexDirection = 'column'; 
        navClone.style.marginRight = '20px'; 

        // Убираем margin у ссылок
        const links = navClone.querySelectorAll('a');
        links.forEach(link => {
            link.style.margin = '10px 0';
            link.style.display = 'block'; // Занимают всю ширину
            link.style.textAlign = 'right'; // Выравниваем контент по правому краю
            link.style.color = '#333';
            link.style.fontSize = '20px';
        });

        mobileMenu.appendChild(navClone); // Добавляем навигацию в меню
    }

    document.body.appendChild(mobileMenu); // Добавляем меню в body
}

// Функция для открытия/закрытия мобильного меню
function toggleMobileMenu() {
    const mobileMenu = document.querySelector('.mobile-menu');
    if (mobileMenu) {
        mobileMenu.style.display = mobileMenu.style.display === 'none' ? 'block' : 'none';

        // Обновляем высоту после открытия/закрытия
        if (mobileMenu.style.display === 'block') {
            mobileMenu.style.height = 'auto'; // Автоматическая высота
        }
    }
}


function addFilterButtons() {
    const actionsSection = document.querySelector('.actions-section');
    const newProductsSection = document.querySelector('.new-products-section');

    if (actionsSection) addFilterButton(actionsSection);
    if (newProductsSection) addFilterButton(newProductsSection);
}

function addFilterButton(section) {
    const sectionTitle = section.querySelector('.section-title');

    if (!sectionTitle) return;

    if (sectionTitle.parentNode.classList.contains('section-title-container')) return;

    const titleContainer = document.createElement('div');
    titleContainer.classList.add('section-title-container');

    sectionTitle.parentNode.insertBefore(titleContainer, sectionTitle);
    titleContainer.appendChild(sectionTitle);

    const filterButton = document.createElement('button');
    filterButton.classList.add('filter-button');
    titleContainer.appendChild(filterButton);
}

function updateLayout() {
    updateHeaderLayout();

    if (window.innerWidth <= 900) {
        addFilterButtons();
    } else {
        removeFilterButtons();
    }
}

function removeFilterButtons() {
    const sectionTitles = document.querySelectorAll('.section-title');

    sectionTitles.forEach(sectionTitle => {
        const titleContainer = sectionTitle.parentNode;
        if (titleContainer.classList.contains('section-title-container')) {
            const filterButton = titleContainer.querySelector('.filter-button');

            if (filterButton) {
                titleContainer.parentNode.insertBefore(sectionTitle, titleContainer);
                titleContainer.remove();
            }
        }
    });
}

window.addEventListener('load', () => {
    updateLayout();
    createMobileMenu(); // Создаем мобильное меню при загрузке страницы
});
window.addEventListener('resize', updateLayout);
