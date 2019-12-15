document.addEventListener("DOMContentLoaded", () => {
    let startGameButton = document.querySelector("#startGameButton")
    let hitButton = document.querySelector("#hitButton")
    let stayButton = document.querySelector("#stayButton")
    let displayCards = document.querySelector("#displayCards")
    let deckId;

    const drawCard = async (number) => {
        await axios.get(`https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=${number}`)
    }

    
    const startGame = async () => {
        try{
            let shuffledCards = await axios.get(`https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1`)
            deckId = shuffledCards.data.deck_id
            
            let drawTwoCards = drawCard(2)
            
            drawTwoCards.data.cards.forEach(el=>{
                let image = document.createElement("img")
                image.src = el.image
                displayCards.appendChild(image)
            })
        }catch (err) {
            console.log(err)
        }
    } 

    const hitHumanPlayer = async () => {
        let drawOneCard = 
    }

    const hitDealer = async () => {
        let drawThreeCards = await axios.get(`https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=3`)
    }
    
    startGameButton.addEventListener("click", () => {
                    startGame();
                })
    
                stayButton.addEventListener("click", () => {
    
                })
                hitButton.addEventListener("click", () => {
    
                })
    
    })


console.log("hello")