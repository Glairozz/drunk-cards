document.addEventListener("DOMContentLoaded", () => {
    const screens = document.querySelectorAll(".screen");
    const buttons = document.querySelectorAll("button[data-action]");
    const cardEl = document.getElementById("card");
    const cardTextEl = document.getElementById("cardText");
    const counterEl = document.getElementById("counter");

    const cards = [
        "Take 1 shot", "Take 2 shots", "Give 1 shot", "Give 2 shots", "Everyone drinks",
        "You drink", "Pick a buddy then drink together", "Bottoms up!", "Pick someone that will ask you Truth. If you refuse, you drink",
        "Pick someone that will ask you Dare. If you refuse, you drink", "Last person to touch a wall drinks", "Last person to stand up will take drink",
        "Pick one, Left or Right. Then person of your choice drinks", "Reverse the order",
        "Make a rule for 3 rounds. Everytime someone breaks it, they drink",
        "Drink without using your both hands, if you failed, drink again normally(using hands)",
        "Drink with your left hand", "Drink with your right hand", "Who ever checks their phone for 3 rounds drinks",
        "JUDGE, the person with the best outfit takes a drinks", "Drink if you're single", "Drink if you're taken",
        "Drink if you wore black", "Drink if you wore a multiple colored outfit", "Drink if you’re the youngest",
        "Drink if you’re the oldest", "Starting with you clockwise, everyone says a word. First one to hesitate drinks",
        "Starting with you clockwise, name different Currencies. First person who failed drinks",
        "Ask the person on your right a general question. If they failed to answer, you drink. If they manage to answer, you drink",
        "Battle your left person in a thumb war. Loser drinks", "No one laughs for 1 round", "Staring contest – loser drinks",
        "Rock paper scissors – loser drinks", "Take a group selfie – everyone drinks", "Speak english only for 1 round",
        "Drink while standing", "Stay quiet for 1 round", "No smiling for 1 round",
        "Ban 3 word for 3 rounds. Anyone who says it drinks", "Starting with you clockwise, name Opm bands. The person who failed to name drinks",
        "Starting with you clockwise, name movie titles. The person who failed to name drinks",
        "Starting with you clockwise, name cartoon characters. The person who failed to name drinks",
        "Ask the person on your right a trivia question. If they failed to answer, they drink. If they manage to answer, you drink",
        "The person who most recently went on a date drinks", "Choose two people to drink",
        "Drink if you haven't travelled outside the region", "Drink if you can drive", "Drink if you can’t swim",
        "Drink if you love karaoke", "Tilt your head back and drink", "Take a penalty shot",
        "Compliment someone or drink together", "Starting with you clockwise, name different countries in Asia. First person who failed drinks",
        "Tell a joke. If everyone laughs they drink, if not you drink",
        "Pick one: Drink Twice or Choose a friend and drink 1 shot together", "Drink if you have a current fight with someone",
        "Text someone random or drink", "Drink if you're wearing a branded clothes", "The person who's wearing a jewelry",
        "The person who have tattoo will drink", "The person who's wearing a glasses drinks", "Drink if you have siblings",
        "Drink if you’re an only child", "The person who have the most EX drink twice", "Drink if you hate spicy food",
        "Take 3 sips", "Give 3 sips", "Drink with the person on your left", "Drink with the person on your right",
        "Starting with you clockwise, name different car brands. First person who failed drinks",
        "Starting with you clockwise, name different Ariana Grande songs. First person who failed drinks",
        "Starting with you clockwise, name different Taylor Swift songs. First person who failed drinks",
        "Bartender drinks", "Host drinks", "Stay quiet until your next turn or drink", "Speak in pure tagalog for 1 round",
        "Starting with you clockwise, name different fruits. First person who failed drinks", "Everyone cheers and drinks",
        "Make a toast", "The most nerdy person drinks", "The floor is lava, the person who touch the floor drinks",
        "The biggest shoe size drinks", "The person with the longest hair drinks",
        "The who has the most circle of friend drinks", "Double the next card", "Triple the next card",
        "Lucky card – no drinking", "Unlucky card – drink double", "Everyone drinks", "Raise your right hand for 1 round",
        "Spin the bottle, who ever points the battle drinks", "The person who has the nice teeths drinks",
        "The person who has the biggest ears drinks",
        "Starting with you clockwise, perform an animal sounds. First person who failed drinks",
        "Starting with you clockwise, name different Disney movies. First person who failed drinks",
        "The person who loves to eat drinks", "Shortest person drinks", "Tallest person drinks",
        "Everyone say their favourite color. The persons with the same color drinks", "Males drinks", "Females drink",
        "Choose a word and then everyone must go clockwise dsaying words that rhyme with that word. The first one to fail must drink",
        "Stay completely still like a statue for 1 round",
        "Starting with you clockwise, name countries in Europe, The person unable to name drinks", "Speak English only for 2 rounds",
        "Starting with you clockwise, name different US States. First person who failed drinks", "Starting with you clockwise, name different US Presidents. First person who failed drinks",
        "The person who arrived last drinks", "The person who arrived first gives a drink to someone", "Make a funny face, the person who laughs drinks",
        "The person wearing the most colors drinks", "The person with the most accessories drinks", "The person who is most active on social media drinks",
        "The person who is the most fashionable drinks", "The person who is the most athletic drinks", "Starting with you clockwise, name different fantasy of Arjann Patok. First person who failed drinks",
        "Starting with you clockwise, name different K-Pop groups. First person who failed drinks"
    ];

    let deck = [];
    let currentIndex = 0;
    let history = [];

    function shuffleDeck() {
        deck = [...cards];
        for (let i = deck.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [deck[i], deck[j]] = [deck[j], deck[i]];
        }
    }

    function animateCard() {
        cardEl.classList.remove("flip", "wave");
        void cardEl.offsetWidth;
        cardEl.classList.add("flip");
    }

    function updateCounter() {
        counterEl.textContent = `Card ${currentIndex + 1} / ${deck.length}`;
    }

    function goToScreen(n) {
        screens.forEach(s => s.classList.remove("active"));
        const screen = document.getElementById("screen" + n);
        if (screen) screen.classList.add("active");
    }

    function startGame() {
        shuffleDeck();
        currentIndex = 0;
        history = [];
        cardTextEl.textContent = deck[currentIndex];
        animateCard();
        updateCounter();
        history.push(deck[currentIndex]);
        goToScreen(3);
    }

    function nextCard() {
        currentIndex++;
        if (currentIndex >= deck.length) {
            cardTextEl.textContent = "No more cards! Reload to reshuffle 🍻";
            animateCard();
            return;
        }
        cardTextEl.textContent = deck[currentIndex];
        animateCard();
        updateCounter();
        history.push(deck[currentIndex]);
    }

    function undoCard() {
        if (history.length <= 1) return;
        history.pop();
        currentIndex--;
        cardTextEl.textContent = deck[currentIndex];
        animateCard();
        updateCounter();
    }

    buttons.forEach(btn => {
        btn.addEventListener("click", () => {
            const action = btn.dataset.action;
            if (action === "goto") goToScreen(btn.dataset.screen);
            if (action === "start-game") startGame();
            if (action === "next-card") nextCard();
            if (action === "undo-card") undoCard();
        });
    });

    goToScreen(1);

    setInterval(() => {
        if (cardEl) {
            cardEl.classList.add("wave");
            setTimeout(() => cardEl.classList.remove("wave"), 1000);
        }
    }, 10000);

    shuffleDeck();
});