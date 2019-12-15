document.addEventListener("DOMContentLoaded", () => {
    let startGameButton = document.querySelector("#startGameButton")
    let hitButton = document.querySelector("#hitButton")
    let stayButton = document.querySelector("#stayButton")
    let displayCards = document.querySelector("#displayCards")
    let deckId;
    let humanPlayer = document.querySelector("#humanPlayer")
    let dealer = document.querySelector("#dealer")

    // const drawCard = async (number) => {
    //     await axios.get(`https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=${number}`
    //     )
    // }

    
    const startGame = async () => {
        try{
            let shuffledCards = await axios.get(`https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1`)
            deckId = shuffledCards.data.deck_id
            
            let drawTwoCards = await axios.get(`https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=2`)
            
            drawTwoCards.data.cards.forEach(el => {
                let image = document.createElement("img")
                image.src = el.image
                humanPlayer.appendChild(image)
            })
        }catch (err) {
            console.log(err)
        }
    } 

    const hitHumanPlayer = async () => {
        let drawOneCard = await axios.get(`https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=1`);
        debugger
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
    
    startGameButton.addEventListener("click", () => {
                    startGame();
                })
    
    stayButton.addEventListener("click", () => {
                hitDealer();
                })
                
    hitButton.addEventListener("click", () => {
                hitHumanPlayer();
                })
    
    })


console.log("hello")