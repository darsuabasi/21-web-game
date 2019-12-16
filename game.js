document.addEventListener("DOMContentLoaded", () => {
    let startGameButton = document.querySelector("#startGameButton")
    let hitButton = document.querySelector("#hitButton")
    let stayButton = document.querySelector("#stayButton")
    let displayCards = document.querySelector("#displayCards")
    let deckId;
    let humanPlayer = document.querySelector("#humanPlayer")
    let dealer = document.querySelector("#dealer")
    let humanGamerScore = document.querySelector("humanGamerScore")
    let dealerPlayerScore = document.querySelector("#dealerPlayerScore")
    let humanScore = 0;
    let dealerScore = 0;

    // const drawCard = async (number) => {
    //     await axios.get(`https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=${number}`
    //     )
    // }

   const valueOfCard = (score, value) => {
       if(value === "JACK" || value === "QUEEN" || value === "KING") {
        score += 10
       } else if(value === "ACE") {
           if(score <= 10){
               score += 11
           } else {
               score += 1
           }
       } else {
           score += Number(value)
       }
       return score;
   } 



    const startGame = async (score) => {
        try{
            let shuffledCards = await axios.get(`https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1`)
            deckId = shuffledCards.data.deck_id
            let drawTwoCards = await axios.get(`https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=2`)

            drawTwoCards.data.cards.forEach(el => {
                let image = document.createElement("img")
                image.src = el.image
                humanPlayer.appendChild(image)

                let value = el.value
                // el.value = document.createElement("h3")


                // score = valueOfCard(score, value)
                // score.document.createElement("h3")
                // humanGamerScore.appendChild(humanScore)


                
                
            })
        }catch (err) {
            console.log(err)
        }
    } 

    const hitHumanPlayer = async () => {
        let drawOneCard = await axios.get(`https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=1`);
        drawOneCard.data.cards.forEach(el => {
            let image = document.createElement("img")
            image.src = el.image
            humanPlayer.appendChild(image)
        })
    }

    const hitDealer = async () => {
        let drawThreeCards = await axios.get(`https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=3`)
        drawThreeCards.data.cards.forEach(el => {
            let image = document.createElement("img")
            image.src = el.image
            dealer.appendChild(image)
            
        })

    }

    const keepScore = () => {
        
    }
    
    startGameButton.addEventListener("click", () => {
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