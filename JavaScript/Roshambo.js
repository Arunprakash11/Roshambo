    let score = JSON.parse(localStorage.getItem('score')) || {
            win: 0,
            loss: 0,
            tie: 0
        }; // default operator is used to set initial values of win, loss and tie to try this shortcut method (for if statement)

        updateScoreElement();   

        /* 
        if (!score) {
            score = {
                win: 0,
                loss: 0,
                tie: 0
            };
        }
        */  // for this if statement we can use default operator

        let isAutoPlaying = false;
        let intervalId;
        function autoPlay() {
            if (!isAutoPlaying) {
                intervalId = setInterval(() => {    
                    const playerMove = pickComputerMove();
                    playGame(playerMove);
                }, 1000);
                isAutoPlaying = true;
            } else {
                clearInterval(intervalId);
                isAutoPlaying = false;
            }           
        }
        

        document.querySelector('.rock-mama').addEventListener('click', () => {
            playGame('Rock');
        });


        document.querySelector('.paper-mama').addEventListener('click', () => {
            playGame('Paper');
        });

        document.querySelector('.scissors-mama').addEventListener('click', () => {
            playGame('Scissors');
        });

        document.body.addEventListener('keydown', (event) => {
            if(event.key === 'r' || event.key === 'R') {
                playGame('Rock');
            }
            else if(event.key === 'p' || event.key === 'P') {
                playGame('Paper');
            }
            else if(event.key === 's' || event.key === 'S') {
                playGame('Scissors');
            }       
        });


        function playGame(playerMove) {

            const computerMove = pickComputerMove();        
            let result = '';

            if (playerMove === 'Rock') {

                if (computerMove === 'Rock') {
                    result = 'Its Tie';
                } else if (computerMove === 'Paper') {
                    result = 'You Lose';
                } else if (computerMove === 'Scissors') {
                    result = 'You Win';
                }
    
            }else if(playerMove === 'Paper') {

                if (computerMove === 'Rock') {
                    result = 'You Win';
                } else if (computerMove === 'Paper') {
                    result = 'Its Tie';
                } else if (computerMove === 'Scissors') {
                    result = 'You Lose';
                }

            } else if(playerMove === 'Scissors') {

                if (computerMove === 'Rock') {
                    result ='You Lose';
                } else if (computerMove === 'Paper') {
                    result = 'You Win';
                } else if (computerMove === 'Scissors') {
                    result = 'Its Tie';
                }
            }

            if (result === 'You Win'){
            score.win += 1;
            } else if (result === 'You Lose'){
            score.loss += 1;
            } else if (result === 'Its Tie'){
            score.tie += 1;
            }

            localStorage.setItem('score', JSON.stringify(score));  

            document.querySelector('.rs-result').innerHTML = `${result}`;

            document.querySelector('.rs-move').innerHTML = `You 
        <img src="../Emoji/${playerMove}-emoji.jpg" alt="" class="icon-img" >  
        <img src="../Emoji/${computerMove}-emoji.jpg" alt="" class="icon-img" >
        Computer`;

            updateScoreElement();

            // alert(`You Picked: ${playerMove}, Computer Picked: ${computerMove}, ${result}
            // wins: ${score.win}, losses: ${score.loss}, ties: ${score.tie}`);
        }     


        function updateScoreElement() {
            document.querySelector('.rs-score').innerHTML = `Wins: ${score.win} | Losses: ${score.loss} | Ties: ${score.tie}`;
        }

        function pickComputerMove() {

            const randomNumber = Math.random();
            let computerMove = '';

            if (randomNumber >= 0 && randomNumber < 1 / 3) {
                computerMove = 'Rock';
            } else if (randomNumber >= 1 / 3 && randomNumber < 2 / 3) {
                computerMove = 'Paper';
            } else if (randomNumber >= 2 / 3 && randomNumber < 1) {
                computerMove = 'Scissors';
            }
            return computerMove;
        }
