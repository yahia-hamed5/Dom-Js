const game = {
  team1: 'Bayern Munich',
  team2: 'Borrussia Dortmund',
  players: [
    [
      'Neuer',
      'Pavard',
      'Martinez',
      'Alaba',
      'Davies',
      'Kimmich',
      'Goretzka',
      'Coman',
      'Muller',
      'Gnarby',
      'Lewandowski',
    ],
    [
      'Burki',
      'Schulz',
      'Hummels',
      'Akanji',
      'Hakimi',
      'Weigl',
      'Witsel',
      'Hazard',
      'Brandt',
      'Sancho',
      'Gotze',
    ],
  ],
  score: '4:0',
  scored: ['Lewandowski', 'Gnarby', 'Lewandowski', 'Hummels'],
  date: 'Nov 9th, 2037',
  odds: {
    team1: 1.33,
    x: 3.25,
    team2: 6.5,
  },
};



const [players1,players2]=[...game.players]
console.log(players1,players2)
const [gk,...fieldPlayers]=players1
console.log(gk,fieldPlayers)
const allPLayers=[...players1,...players2]
console.log(allPLayers)
const playersfinal=[players1,'Thiago','coutinho','perisic']
console.log(playersfinal)
const {odds:{team1,x:drow,team2}}=game
console.log(team1,drow,team2)

const printGoals= function (...players) {
    console.log(`${players.length} goals were Scored`)
}
printGoals(...game.scored)


// looping Array The for-of loop
const arr1=['yahia','hamed','khaled','othman']
const arr2=['mohamed','mahmoud','kareem','bassem']
const allName=[...arr1,...arr2]
for(const [i,el] of allName.entries()) console.log(`${i+1}-${el} `)  
for (const [i,el] of game?.scored.entries()){  
    console.log(`Goal ${i + 1}: ${el}`)
    console.log(`Goal ${i + 1}: ${el}`)
}
let sum = 0
for (const el of Object.values(game.odds)) {
    sum +=el
    console.log(sum / Object.values(game.odds).length )
}
for (const el of Object.values(game.odds)) sum +=el
    console.log(sum / Object.values(game.odds).length )

for (const [i,el] of Object.entries(game.odds)) {
    const str = i === 'x' ? 'draw' : `vectory ${game[i]}`
    console.log(`Odd Of ${str}:${el}`)
}

const score=[...game.scored]
console.log(score)
let scoredPlayer={};
for (const el of score) {
    scoredPlayer[el] ? scoredPlayer[el]+=1:scoredPlayer[el]=1
}
console.log(scoredPlayer)
