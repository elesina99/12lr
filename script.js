$(function() {
    const wordLevels = {
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
    const TOTAL_QUESTIONS = 10; 

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
        const currentTotalQuestions = shuffled.length;
        const percent = (correct / currentTotalQuestions) * 100;
        const currentLevel = $("#difficulty").val();

        if (percent >= 90) level = `Супер! Рівень ${currentLevel} підкорено!Далі – більше!`;
        else if (percent >= 70) level = `Добре, ти молодець! Допрацюй рівень ${currentLevel}.`;
        else if (percent >= 50) level = "Ти можеш набагато краще!";
        else level = "Потрібно більше практики! Все вийде в наступний раз!";

        $("#summary").html(`
            Ви переклали ${correct} із ${currentTotalQuestions} слів рівня ${currentLevel}!<br>
            Ваш результат: <b>${level}</b>
        `);
        $("#resultModal").fadeIn(400); 
    }
    $("#checkBtn").click(function() {
        const answer = $("#translation").val().trim().toLowerCase();
        if (current >= TOTAL_QUESTIONS) return; 
        if (answer === "") {
            console.warn("Будь ласка, введіть переклад!Обманути не вийде)"); 
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
    $("#difficulty").on("change", function() {
        console.log(`Розпочато нову гру з ${TOTAL_QUESTIONS} слів рівня: ${$(this).val()}!`);
        startGame();
    });

    function startGame() {
        const selectedLevel = $("#difficulty").val();
        const availableWords = wordLevels[selectedLevel];
        
        const wordsToTake = Math.min(TOTAL_QUESTIONS, availableWords.length);

        shuffled = shuffle([...availableWords]).slice(0, wordsToTake); 
        
        const currentTotal = shuffled.length;

        current = 0;
        correct = 0;
        wrong = 0;
        
        $("#correct").text(0);
        $("#wrong").text(0);
        $("#total").text(currentTotal); 
        $("#step").text(1);
        
        $("#translation").val("").focus(); 
        nextWord();
    }

    $("#total").text(TOTAL_QUESTIONS);
    
    startGame(); 
});
