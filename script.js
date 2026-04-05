const books = [
    {
        title: "1984",
        author: "George Orwell",
        year: 1949,
        genre: "Антиутопія",
        pages: 328,
        status: "прочитана"
    },
    {
        title: "Майстер і Маргарита",
        author: "Михайло Булгаков",
        year: 1967,
        genre: "Роман",
        pages: 384,
        status: "прочитана"
    },
    {
        title: "Гаррі Поттер і філософський камінь",
        author: "Джоан Роулінг",
        year: 1997,
        genre: "Фентезі",
        pages: 320,
        status: "прочитана"
    },
    {
        title: "Тарас Бульба",
        author: "Микола Гоголь",
        year: 1835,
        genre: "Історія",
        pages: 240,
        status: "не прочитана"
    },
    {
        title: "Кобзар",
        author: "Тарас Шевченко",
        year: 1840,
        genre: "Поезія",
        pages: 352,
        status: "прочитана"
    },
    {
        title: "Лісова пісня",
        author: "Леся Українка",
        year: 1911,
        genre: "Драма",
        pages: 160,
        status: "не прочитана"
    },
    {
        title: "Захар Беркут",
        author: "Іван Франко",
        year: 1883,
        genre: "Історія",
        pages: 220,
        status: "прочитана"
    },
    {
        title: "Тигролови",
        author: "Іван Багряний",
        year: 1944,
        genre: "Пригоди",
        pages: 256,
        status: "не прочитана"
    }
];

const output = document.getElementById("output");

function renderBooks(bookArray, title = "Список книг") {
    if (!Array.isArray(bookArray) || bookArray.length === 0) {
        output.innerHTML = `
            <div class="section-title">${title}</div>
            <p>Нічого не знайдено.</p>
        `;
        return;
    }

    output.innerHTML = `
        <div class="section-title">${title}</div>
        ${bookArray.map(book => `
            <div class="book-card">
                <strong>Назва:</strong> ${book.title}<br>
                <strong>Автор:</strong> ${book.author}<br>
                <strong>Рік:</strong> ${book.year}<br>
                <strong>Жанр:</strong> ${book.genre}<br>
                <strong>Сторінки:</strong> ${book.pages}<br>
                <strong>Статус:</strong> ${book.status}
            </div>
        `).join("")}
    `;
}

function showBooks() {
    renderBooks(books, "Каталог книг");
}

function searchBooks() {
    const query = prompt("Введіть назву, автора, жанр або рік:");
    if (query === null) return;

    const normalizedQuery = query.trim().toLowerCase();

    if (normalizedQuery === "") {
        output.innerHTML = "<p>Пошуковий запит порожній.</p>";
        return;
    }

    const foundBooks = books.filter(book =>
        book.title.toLowerCase().includes(normalizedQuery) ||
        book.author.toLowerCase().includes(normalizedQuery) ||
        book.genre.toLowerCase().includes(normalizedQuery) ||
        String(book.year).includes(normalizedQuery)
    );

    renderBooks(foundBooks, `Результати пошуку: "${query}"`);
}

function filterByStatus() {
    const statusInput = prompt('Введіть статус: "прочитана" або "не прочитана"');
    if (statusInput === null) return;

    const normalizedStatus = statusInput.trim().toLowerCase();

    if (normalizedStatus === "") {
        output.innerHTML = "<p>Статус не введено.</p>";
        return;
    }

    const filteredBooks = books.filter(
        book => book.status.toLowerCase() === normalizedStatus
    );

    renderBooks(filteredBooks, `Фільтр за статусом: ${statusInput}`);
}

function filterByGenre() {
    const genreInput = prompt("Введіть жанр:");
    if (genreInput === null) return;

    const normalizedGenre = genreInput.trim().toLowerCase();

    if (normalizedGenre === "") {
        output.innerHTML = "<p>Жанр не введено.</p>";
        return;
    }

    const filteredBooks = books.filter(book =>
        book.genre.toLowerCase().includes(normalizedGenre)
    );

    renderBooks(filteredBooks, `Фільтр за жанром: ${genreInput}`);
}

function filterByYearRange() {
    const startYearInput = prompt("Введіть початковий рік:");
    if (startYearInput === null) return;

    const endYearInput = prompt("Введіть кінцевий рік:");
    if (endYearInput === null) return;

    const startYear = Number(startYearInput);
    const endYear = Number(endYearInput);

    if (Number.isNaN(startYear) || Number.isNaN(endYear)) {
        output.innerHTML = "<p>Некоректно введено роки.</p>";
        return;
    }

    if (startYear > endYear) {
        output.innerHTML = "<p>Початковий рік не може бути більшим за кінцевий.</p>";
        return;
    }

    const filteredBooks = books.filter(
        book => book.year >= startYear && book.year <= endYear
    );

    renderBooks(filteredBooks, `Фільтр за роками: ${startYear} - ${endYear}`);
}

function showStatistics() {
    if (books.length === 0) {
        output.innerHTML = "<p>Масив книг порожній.</p>";
        return;
    }

    const totalBooks = books.length;

    const totalPages = books.reduce((sum, book) => sum + book.pages, 0);

    // Підрахунок кількості книг кожного автора через reduce()
    const authorsCount = books.reduce((acc, book) => {
        acc[book.author] = (acc[book.author] || 0) + 1;
        return acc;
    }, {});

    // Сортуємо авторів за кількістю книг у спадному порядку
    const topAuthors = Object.entries(authorsCount)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 3);

    output.innerHTML = `
        <div class="section-title">Статистика бібліотеки</div>
        <p><strong>Загальна кількість книг:</strong> ${totalBooks}</p>
        <p><strong>Загальна кількість сторінок:</strong> ${totalPages}</p>

        <div class="section-title">Топ автори</div>
        ${topAuthors.map(([author, count]) => `
            <p>${author} — ${count} книг(и)</p>
        `).join("")}
    `;
}

function showRecommendations() {
    const readBooks = books.filter(book => book.status === "прочитана");

    if (readBooks.length === 0) {
        output.innerHTML = "<p>Немає прочитаних книг для формування рекомендацій.</p>";
        return;
    }

    // Визначаємо жанри прочитаних книг
    const readGenres = [...new Set(readBooks.map(book => book.genre))];

    // Рекомендуємо непрочитані книги з тих жанрів, які вже читали
    const recommendedBooks = books.filter(book =>
        book.status === "не прочитана" && readGenres.includes(book.genre)
    );

    if (recommendedBooks.length === 0) {
        output.innerHTML = `
            <div class="section-title">Рекомендації</div>
            <p>Немає непрочитаних книг у жанрах, які вже були прочитані.</p>
            <p class="muted">Жанри прочитаних книг: ${readGenres.join(", ")}</p>
        `;
        return;
    }

    renderBooks(recommendedBooks, "Рекомендовані книги");
}

function resetOutput() {
    output.innerHTML = "Натисни кнопку для виконання операції.";
}