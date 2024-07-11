document.addEventListener("DOMContentLoaded", () => {
    const rounds = document.querySelectorAll(".round");
    const qtdAnimais = document.querySelector(".qtdAnimais");
    const roundText = document.querySelector(".roundRef");
    const restartButton = document.querySelector(".reiniciar");
    const finish = document.querySelector(".finish");
    const qtdTotal = document.querySelector(".qtdRounds")
    const pont = document.querySelector(".pontuacao")
    const txt = document.querySelector(".txt")
    const music1 = document.getElementById('music1')
    const music2 = document.getElementById('music2')
    const music3 = document.getElementById('music3')
    const music4 = document.getElementById('music4')
    const acerto = document.getElementById('acerto')
    const falha = document.getElementById('falha')
    const resumo = document.getElementById('resumo')
    let fail = false;
    let currentRound = 0;
    let timer;
    let timeLeft = 15;
    let totalScore = 0;
    let vectorsClicked = 0;
    const penalty = 5;

    const startRound = () => {
        if (currentRound >= rounds.length) {
            endGame();
            return;
        }
        playMusic(currentRound+1)

        rounds[currentRound].style.display = "block";
        updateText();

        vectorsClicked = 0;
        const vectors = rounds[currentRound].querySelectorAll("img:not(.background)");
        vectors.forEach(vector => {
            vector.style.display = 'block';
            vector.addEventListener("click", onVectorClick, { once: true });
        });

        timeLeft = 15;
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
        acerto.currentTime = 0;
        acerto.play();
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
        qtdAnimais.textContent = `${vectorsClicked} / ${vectors} animais encontrados`;
        roundText.textContent = `Round: ${currentRound + 1}`;
    };
    function playMusic(round) {
        // Pausar todas as músicas
        music1.pause();
        music2.pause();
        music3.pause();
        music4.pause();
        resumo.pause()
        
        // Resetar o tempo das músicas para o início
        music1.currentTime = 0;
        music2.currentTime = 0;
        music3.currentTime = 0;
        music4.currentTime = 0;
        resumo.currentTime = 0;
    
        // Tocar a música correspondente ao round
        switch(round) {
            case 1:
                music1.play();
                break;
            case 2:
                music2.play();
                break;
            case 3:
                music3.play();
                break;
            case 4:
                music4.play();
                break;
            case 5:
                resumo.play();
                break;
        }
    }

    const failRound = () => {
        clearInterval(timer);
        falha.currentTime = 0;
        falha.play();
        fail = true
        endGame();
    };

    const endGame = () => {
        clearInterval(timer);
        if (currentRound < rounds.length) {
            rounds[currentRound].style.display = "none";
        }
        playMusic(5);
        finish.style.display = "flex";
        txt.style.display = "none";
        
        qtdTotal.textContent = `Você concluiu ${currentRound} de 4 rounds`;
        pont.textContent = `${totalScore} pontos`;
        console.log(totalScore)

    };
    restartButton.addEventListener("click", () => {
        finish.style.display = "none";
        txt.style.display = "flex";
        fail = false;
        currentRound = 0;
        timer;
        timeLeft = 15;
        totalScore = 0;
        vectorsClicked = 0;

        startRound();
    });

    document.addEventListener("click", (e) => {
        if (!e.target.closest(".round img:not(.background)")) {
            timeLeft -= penalty;
            if (timeLeft < 0) timeLeft = 0;
            updateText();
        }
    });

    startRound();
});
