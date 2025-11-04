$(function() {
    // Реструктуризація слів за рівнями складності
    const wordLevels = {
        // A1 - Прості, базові слова (використаємо більшість ваших оригінальних слів)
        "A1": [
            {en: "table", ua: ["стіл"]},
            {en: "chair", ua: ["стілець"]},
            {en: "pencil", ua: ["олівець"]},
            {en: "bag", ua: ["сумка", "рюкзак", "торба"]},
            {en: "spoon", ua: ["ложка"]},
            {en: "fork", ua: ["виделка"]},
            {en: "tree", ua: ["дерево"]},
            {en: "sun", ua: ["сонце"]},
            {en: "house", ua: ["будинок", "дім"]},
            {en: "book", ua: ["книга"]}
        ],
        // B1 - Середні, більш абстрактні або менш вживані в побуті
        "B1": [
            {en: "journey", ua: ["подорож", "мандрівка"]},
            {en: "courage", ua: ["мужність", "сміливість"]},
            {en: "neighbor", ua: ["сусід", "сусідка"]},
            {en: "environment", ua: ["довкілля", "середовище"]},
            {en: "opportunity", ua: ["можливість", "нагода"]},
            {en: "awkward", ua: ["незграбний", "незручний"]},
            {en: "delicious", ua: ["смачний"]},
            {en: "whisper", ua: ["шепіт", "шепотіти"]},
            {en: "solution", ua: ["рішення", "розв'язок"]},
            {en: "explore", ua: ["досліджувати", "вивчати"]}
        ],
        // C1 - Складні, академічні або вузькоспеціалізовані
        "C1": [
            {en: "ubiquitous", ua: ["всюдисущий", "повсюдний"]},
            {en: "ephemeral", ua: ["скороминущий", "ефемерний"]},
            {en: "meticulous", ua: ["ретельний", "педантичний"]},
            {en: "ostentatious", ua: ["показний", "пихатий"]},
            {en: "paradigm", ua: ["парадигма"]},
            {en: "benevolent", ua: ["доброзичливий", "благодійний"]},
            {en: "sophisticated", ua: ["витончений", "складний"]},
            {en: "inadvertently", ua: ["ненавмисно", "випадково"]},
            {en: "ambiguous", ua: ["двозначний", "неоднозначний"]},
            {en: "juxtaposition", ua: ["зіставлення", "порівняння"]}
        ]
    };

    let shuffled = [];
    let current = 0;
    let correct = 0;
    let wrong = 0;
    const TOTAL_QUESTIONS = 10; // Фіксована кількість запитань для тесту

    function shuffle(array) {
        return array.sort(() => Math.random() - 0.5);
    }

    function nextWord() {
        if (current < TOTAL_QUESTIONS) {
            $("#word").text(shuffled[current].en);
            $("#step").text(current + 1);
        } else {
            showResults();
        }
    }

    function showResults() {
        let level;
        const percent = (correct / TOTAL_QUESTIONS) * 100;
        const currentLevel = $("#difficulty").val();

        if (percent >= 90) level = `Супер! Рівень ${currentLevel} підкорено!`;
        else if (percent >= 70) level = `Добре, ти молодець! Допрацюй рівень ${currentLevel}.`;
        else if (percent >= 50) level = "Ти можеш набагато краще!";
        else level = "Потрібно більше практики! Все вийде в наступний раз!";

        $("#summary").html(`
            Ви переклали ${correct} із ${TOTAL_QUESTIONS} слів рівня ${currentLevel}!<br>
            Ваш результат: <b>${level}</b>
        `);

        $("#resultModal").fadeIn(400);
    }

    $("#checkBtn").click(function() {
        // ... (Логіка перевірки відповіді залишається без змін) ...
        const answer = $("#translation").val().trim().toLowerCase();
        
        if (current >= TOTAL_QUESTIONS) return; 

        if (answer === "") {
            alert("Будь ласка, введіть переклад! Не вийде обманути)");
            return;
        }

        const correctAnswers = shuffled[current].ua.map(t => t.toLowerCase().trim());
        
        let isCorrect = correctAnswers.includes(answer);
        
        if (isCorrect) {
            correct++;
            $("#correct").text(correct);
        } else {
            wrong++;
            $("#wrong").text(wrong);
        }
        
        $("#translation").val("");

        current++;
        nextWord();
    });

    $("#restartBtn").click(function() {
        $("#resultModal").fadeOut(300, startGame);
    });
    
    // Обробник зміни рівня складності - запускає нову гру
    $("#difficulty").on("change", function() {
        alert(`Розпочато нову гру з ${TOTAL_QUESTIONS} слів рівня: ${$(this).val()}!`);
        startGame();
    });

    function startGame() {
        const selectedLevel = $("#difficulty").val();
        const availableWords = wordLevels[selectedLevel];
        
        // Перевірка, чи достатньо слів для тесту
        const wordsToTake = Math.min(TOTAL_QUESTIONS, availableWords.length);

        // Змішуємо та беремо необхідну кількість слів для тесту
        shuffled = shuffle([...availableWords]).slice(0, wordsToTake); 
        
        // Оновлюємо TOTAL_QUESTIONS, якщо слів менше, ніж 10
        const currentTotal = shuffled.length;

        current = 0;
        correct = 0;
        wrong = 0;
        
        // Оновлюємо елементи статистики
        $("#correct").text(0);
        $("#wrong").text(0);
        $("#total").text(currentTotal); // Відображаємо фактичну кількість слів у тесті
        $("#step").text(1);
        
        $("#translation").val("").focus(); 
        nextWord();
    }

    // Встановлюємо загальну кількість питань на початку
    $("#total").text(TOTAL_QUESTIONS);
    
    startGame(); // Запускаємо гру при завантаженні
});
