document.addEventListener("DOMContentLoaded", () => {
    let startGameButton = document.querySelector("#startGameButton")
    let hitButton = document.querySelector("#hitButton")
    let stayButton = document.querySelector("#stayButton")
    let displayCards = document.querySelector("#displayCards")
    let deckId;
    let humanPlayer = document.querySelector("#humanPlayer")
    let dealer = document.querySelector("#dealer")
    let humanGamerScore = document.querySelector("#humanGamerScore")
    let dealerPlayerScore = document.querySelector("#dealerPlayerScore")
    let score = 0;
    // let value = 0; value does not need to be appeneded
    let humanScore = 0;
    let dealerScore = 0;

    // const drawCard = async (number) => {
    //     await axios.get(`https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=${number}`
    //     )
    // }

    const valueOfCard = (score, value) => {
        console.log(score, value)
        if (value === "JACK" || value === "QUEEN" || value === "KING") {
            score += 10
        } else if (value === "ACE") {
            if (score <= 10) {
                score += 11
            } else {
                score += 1
            }
        } else {
            score += Number(value)
        }
        return score;
    }
    const automaticBust = (score) => {
        if (score > 21) {
            return BUST
        }
    }

    // const keepScore =(valueOfCard) => {
    //     let score = valueOfCard(score, value)
    //     return score;
    // }



    const startGame = async (score) => {
        try {
            let shuffledCards = await axios.get(`https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1`)
            deckId = shuffledCards.data.deck_id
            let drawTwoCards = await axios.get(`https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=2`)

            drawTwoCards.data.cards.forEach(el => {
                let image = document.createElement("img")
                image.src = el.image
                humanPlayer.appendChild(image)
                let value = el.value
                let val = valueOfCard(humanScore, value)
                // let val = keepScore(humanScore, value)
                humanScore = val
                humanGamerScore.innerText = `Your Score: ${val}`
                // el.value = document.createElement("h3")

            })
            // console.log(score)
            // humanPlayer.appendChild(score)
        } catch (err) {
            console.log(err)
        }
    }

    const hitHumanPlayer = async (valueOfCard) => {
        let drawOneCard = await axios.get(`https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=1`);
        drawOneCard.data.cards.forEach(el => {
            let image = document.createElement("img")
            image.src = el.image
            humanPlayer.appendChild(image)
            // let score = document.querySelector("humanGamerScore")
            // Object.entries(val);

            let value = el.value
            let currentVal = valueOfCard(humanScore, value)
            let newCardVal = [];
            currentVal.push(newCardVal)
            // valueOfCard(humanScore, value) ;
            updatedVal = currentVal + newCardVal
            humanScore = updatedVal
            humanGamerScore.innerText = `Your Score: ${updatedVal}`

            // store score somewhere and then update it everytime you hit
        })
    }

    const hitDealer = async () => {
        let drawThreeCards = await axios.get(`https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=3`)
        drawThreeCards.data.cards.forEach(el => {
            let image = document.createElement("img")
            image.src = el.image
            dealer.appendChild(image)
            let value = el.value
            let val = valueOfCard(dealerScore, value)
            dealerScore = val
            dealerPlayerScore.innerText = `Dealer's Score: ${val}`
        })
        // automaticBust(val)

    }

    startGameButton.addEventListener("click", () => {
        document.getElementById("startGameButton").remove()

        startGame(humanScore);
    })

    stayButton.addEventListener("click", () => {
        hitDealer();
    })

    hitButton.addEventListener("click", () => {
        hitHumanPlayer();

    })
})


console.log("hello")