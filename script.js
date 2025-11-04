$(function() {
    const words = [
        {en: "table", ua: ["стіл"]},
        {en: "chair", ua: ["стілець"]},
        {en: "pencil", ua: ["олівець"]},
        {en: "bag", ua: ["сумка", "рюкзак", "торба"]},
        {en: "spoon", ua: ["ложка"]},
        {en: "fork", ua: ["виделка"]},
        {en: "tree", ua: ["дерево"]},
        {en: "flower", ua: ["квітка"]},
        {en: "music", ua: ["музика"]},
        {en: "dance", ua: ["танець", "танці"]},
        {en: "school", ua: ["школа"]},
        {en: "car", ua: ["машина", "автомобіль", "авто"]},
        {en: "sun", ua: ["сонце"]},
        {en: "house", ua: ["будинок", "дім"]},
        {en: "book", ua: ["книга"]}
    ];

    let shuffled = [];
    let current = 0;
    let correct = 0;
    let wrong = 0;
    let total = parseInt($("#difficulty").val()); // Ініціалізація з поточного значення селектора

    // Перевірка, щоб загальна кількість слів не перевищувала доступну
    if (total > words.length) {
        total = words.length;
        $("#difficulty").val(total); // Встановлення максимального значення
    }

    function shuffle(array) {
        return array.sort(() => Math.random() - 0.5);
    }

    function nextWord() {
        if (current < total) {
            $("#word").text(shuffled[current].en);
            $("#step").text(current + 1);
        } else {
            showResults();
        }
    }

    function showResults() {
        let level;
        const percent = (correct / total) * 100;

        if (percent >= 90) level = "Супер! Продовжуй в цьому ж темпі!!!";
        else if (percent >= 70) level = "Добре, ти молодець, продовжуй!!!";
        else if (percent >= 50) level = "Ти можеш набагато краще!!!";
        else level = "Потрібно більше практики! Все вийде в наступний раз!";

        $("#summary").html(`
            Ви переклали ${correct} із ${total}!<br>
            Рівень знань: <b>${level}</b>
        `);

        $("#resultModal").fadeIn(400);
    }

    $("#checkBtn").click(function() {
        const answer = $("#translation").val().trim().toLowerCase();
        
        // Перевірка, чи не вийшли ми за межі тесту перед перевіркою
        if (current >= total) {
            return; 
        }

        if (answer === "") {
            alert("Будь ласка, введіть переклад! Не вийде обманути)");
            return;
        }

        const correctAnswers = shuffled[current].ua.map(t => t.toLowerCase());
        
        // Перевіряємо, чи є відповідь серед правильних перекладів
        let isCorrect = false;
        for (let t of correctAnswers) {
            if (t.trim() === answer) {
                isCorrect = true;
                break;
            }
        }
        
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
    
    // Обробник зміни рівня складності
    $("#difficulty").on("change", function() {
        // Оновлюємо загальну кількість слів та перезапускаємо гру
        total = parseInt($(this).val());
        // Встановлюємо максимальну кількість слів, якщо обрано більше, ніж є
        if (total > words.length) {
            total = words.length;
            $(this).val(total);
        }
        alert(`Розпочато нову гру на ${total} слів!`);
        startGame();
    });

    function startGame() {
        // Отримуємо актуальне значення складності
        total = parseInt($("#difficulty").val());
        // Зрізаємо масив відповідно до обраної складності
        shuffled = shuffle([...words]).slice(0, total); 
        current = 0;
        correct = 0;
        wrong = 0;
        
        // Оновлюємо елементи статистики
        $("#correct").text(0);
        $("#wrong").text(0);
        $("#total").text(total);
        $("#step").text(1);
        
        $("#translation").val("").focus(); // Очистити поле та встановити фокус
        nextWord();
    }

    startGame(); // Запускаємо гру при завантаженні
});
