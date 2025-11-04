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
  const total = 10;

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
    if (answer === "") {
      alert("Будь ласка, введіть переклад! Не вийде обманути)");
      return;
    }

    const correctAnswers = shuffled[current].ua.map(t => t.toLowerCase());
    if (correctAnswers.includes(answer)) {
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

  function startGame() {
    shuffled = shuffle([...words]).slice(0, total);
    current = 0;
    correct = 0;
    wrong = 0;
    $("#correct").text(0);
    $("#wrong").text(0);
    $("#total").text(total);
    $("#translation").val("");
    nextWord();
  }

  startGame();
});
