function updateHeaderLayout() {
    const headerRight = document.querySelector('.header-right');
    if (!headerRight) return;

    const headerMiddle = document.querySelector('.header-middle');

    // Скрываем или показываем header-middle
    if (headerMiddle) {
        headerMiddle.style.display = window.innerWidth <= 865 ? 'none' : 'flex';
    }

    // Determine if screen is <= 500px
    const isSmallScreen = window.innerWidth <= 500;

    // Remove the image and menu button on larger screens (if they exist)
    if (window.innerWidth > 865) {
        const menuButton = document.querySelector('.header-menu-button');
        const imageDiv = document.querySelector('.header-image-container-left');

        if (menuButton) {
            menuButton.remove();
        }
        if (imageDiv) {
            imageDiv.remove();
        }

        return; // Exit the function
    }

    // Code for small screens (<= 865px)
    if (!document.querySelector('.header-menu-button') && window.innerWidth <= 865) {
        // Create the menu button
        const headerMenuButton = document.createElement('button');
        headerMenuButton.classList.add('header-menu-button');
        headerMenuButton.style.background = 'none';
        headerMenuButton.style.border = 'none';
        headerMenuButton.style.cursor = 'pointer';

        const menuImg = document.createElement('img');
        menuImg.src = 'photo/menu.svg';
        menuImg.alt = 'Menu Icon';
        menuImg.classList.add('header-menu-icon');
        menuImg.style.width = '32px';
        menuImg.style.height = '30px';
        menuImg.style.marginRight = '10px';

        headerMenuButton.appendChild(menuImg);

        // Create and show/hide the image based on screen width
        const imageDiv = document.createElement('div');
        imageDiv.classList.add('header-image-container-left');

        //create button
        const imageButton = document.createElement('button');
        imageButton.style.background = 'none';
        imageButton.style.border = 'none';
        imageButton.style.padding = '0';
        imageButton.style.cursor = 'pointer';
        // **Оставим пустым обработчик события, чтобы ничего не происходило**
        imageButton.addEventListener('click', () => {
            //Do nothing
        });

        const image = document.createElement('img');
        image.src = 'photo/search2.svg'; // Your image URL
        image.alt = 'Your Description';
        imageButton.appendChild(image);
        imageDiv.appendChild(imageButton)

        // Determine where to insert the image depending on whether search is hidden
        const headerRightContent = headerRight.querySelector('.header-right-content');
        const headerSearch = headerRight.querySelector('.header-search');

        if (headerRightContent) {
            if (isSmallScreen) {
                headerRightContent.insertBefore(imageDiv, headerSearch); // Insert before search
            }
            headerRightContent.appendChild(headerMenuButton);
        }

        headerMenuButton.addEventListener('click', () => {
            toggleMobileMenu(); // Function to handle menu toggle
        });
    }

    // Show/hide the image depending on screen width
    const imageDiv = document.querySelector('.header-image-container-left');
    if (imageDiv) {
        imageDiv.style.display = isSmallScreen ? 'flex' : 'none';
    }

    // Устанавливаем отступ
    const headerSearch = document.querySelector('.header-search');
    if (headerSearch) {
        headerSearch.style.marginLeft = (window.innerWidth <= 700) ? '15px' : '20px';
    }
}

function toggleSearch() {
    const headerSearch = document.querySelector('.header-search');
    if (headerSearch) {
        headerSearch.style.display = headerSearch.style.display === 'none' ? 'flex' : 'none';
    }
}


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
        toggleMobileMenu(); // Закрываем меню при клике на крестик
    });

    mobileMenu.appendChild(closeButton); // Добавляем кнопку закрытия в меню

    const headerMiddle = document.querySelector('.header-middle');
    if (headerMiddle) {
        const navClone = headerMiddle.querySelector('.header-nav').cloneNode(true); // Клонируем навигацию
        navClone.style.flexDirection = 'column'; // Выстраиваем ссылки вертикально
        navClone.style.marginRight = '20px'; // Добавляем margin справа

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

// Добавленная функция для выбора изображений
function setupAdditionalImageSelection() {
    const mainImage = document.querySelector('.product-images .main-image');
    const additionalImages = document.querySelectorAll('.product-images .additional-images img');

    if (!mainImage || !additionalImages.length) return;

    additionalImages.forEach(img => {
        img.addEventListener('click', () => {
            mainImage.src = img.src;
        });
    });
}

window.addEventListener('load', () => {
    updateLayout();
    createMobileMenu(); // Создаем мобильное меню при загрузке страницы
    setupAdditionalImageSelection(); // Настраиваем выбор изображений
});

window.addEventListener('resize', updateLayout);
