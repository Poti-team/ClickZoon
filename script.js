document.addEventListener("DOMContentLoaded", () => {
    const rounds = document.querySelectorAll(".round");
    const qtdAnimais = document.querySelector(".qtdAnimais");
    const roundText = document.querySelector(".roundRef");
    const restartButton = document.querySelector(".reiniciar");
    const finish = document.querySelector(".finish");
    const qtdTotal = document.querySelector(".qtdRounds")
    const pont = document.querySelector(".pontuacao")
    let fail = false;
    let currentRound = 0;
    let timer;
    let timeLeft = 20;
    let totalScore = 0;
    let vectorsClicked = 0;
    const penalty = 5;

    const startRound = () => {
        if (currentRound >= rounds.length) {
            endGame();
            return;
        }

        rounds[currentRound].style.display = "block";
        updateText();

        vectorsClicked = 0;
        const vectors = rounds[currentRound].querySelectorAll("img:not(.background)");
        vectors.forEach(vector => {
            vector.addEventListener("click", onVectorClick, { once: true });
        });

        timeLeft = 20;
        timer = setInterval(() => {
            timeLeft--;
            updateText();
            if (timeLeft <= 0) {
                failRound();
            }
        }, 1000);
    };

    const onVectorClick = (event) => {
        event.target.style.display = "none";
        vectorsClicked++;
        updateText();
        const vectors = rounds[currentRound].querySelectorAll("img:not(.background)");
        if (vectorsClicked === vectors.length) {
            clearInterval(timer);
            totalScore += timeLeft;
            currentRound++;
            rounds[currentRound - 1].style.display = "none";
            startRound();
        }
    };

    const updateText = () => {
        const vectors = rounds[currentRound].querySelectorAll("img:not(.background)").length;
        qtdAnimais.textContent = `Vetores: ${vectorsClicked} / ${vectors}`;
        roundText.textContent = `Round: ${currentRound + 1}`;
    };

    const failRound = () => {
        clearInterval(timer);
        fail = true
        endGame();
    };

    const endGame = () => {
        clearInterval(timer);
        if (currentRound < rounds.length) {
            rounds[currentRound].style.display = "none";
        }
        finish.style.display = "flex";
        qtdTotal.textContent = `Você concluiu ${currentRound} de 4 rounds`;
        pont.textContent = `${totalScore} pontos`;

        restartButton.addEventListener("click", () => {
            location.reload();
        });
    };

    document.addEventListener("click", (e) => {
        if (!e.target.closest(".round img:not(.background)")) {
            timeLeft -= penalty;
            if (timeLeft < 0) timeLeft = 0;
            updateText();
        }
    });

    startRound();
});
