import './style.css'

const navHide = document.querySelector(".nav-hide")
const scoreBtn = document.querySelector("#scores-btn")
const ruleBtn = document.querySelector("#rules-btn")
const option = document.querySelector(".option")
const gameWord = document.querySelector(".game-word")
const counter = document.querySelector(".counter")
const scorer = document.querySelector(".score")
const gameInput = document.querySelector('.game-input')
const gameStart = document.querySelector('.game-start')
const gameOver = document.querySelector('.game-over-overlay')
const gameAgain = document.querySelector('.again')
const [scoreE, scoreM, scoreH] = [
  document.querySelector('.easy'),
  document.querySelector('.medium'),
  document.querySelector('.hard')]
const [dateE, dateM, dateH] = [
  document.querySelector('.easy-Date'),
  document.querySelector('.medium-Date'),
  document.querySelector('.hard-Date')]

let setnavHide = false
let scoreHide = true
let ruleHide = true
let wordSize
let word
let count = 10
let score = 0
let gameRun = false
let interval

const hideNav = function () {
  if (setnavHide) {
    document.querySelector(".nav").classList.remove("nav-none")
    document.querySelector(".nav-hide").classList.remove('nav-hide-rot')
  }
  else {
    document.querySelector(".nav").classList.add("nav-none")
    document.querySelector(".nav-hide").classList.add("nav-hide-rot")
  }
  setnavHide = !setnavHide
}

const hideScore = function () {
  document.querySelector(".scores-overlay").classList.add("show")

  document.querySelector('#close-scores').addEventListener('click', () => {
    document.querySelector(".scores-overlay").classList.remove("show")
    scoreHide = !scoreHide
  })
  scoreHide = !scoreHide
}

const hideRule = function () {
  document.querySelector(".rules-overlay").classList.add("show")
  document.querySelector('#close-rules').addEventListener('click', () => {
    document.querySelector(".rules-overlay").classList.remove("show")
    ruleHide = !ruleHide
  })
  ruleHide = !ruleHide
}

const wordReq = function () {
  let req = fetch("https://random-word-api.herokuapp.com/word?" + new URLSearchParams({
    length: wordSize
  }))
  req.then(
    (res) => {
      return res.json()
    }
  ).then(
    (res) => {
      gameWord.innerText = res
      word = res[0]
    }
  )
}

const showOption = function () {
  if (option.value == "medium") {
    wordSize = Math.floor(Math.random() * 6) + 6
  }
  else if (option.value == "easy") {
    wordSize = Math.floor(Math.random() * 4) + 3
  }
  else if (option.value == "hard") {
    wordSize = Math.floor(Math.random() * 6) + 10
  }
  wordReq()
  console.log(wordSize)
}


const updateScore = function () {
  scorer.innerText = score
}
const updateTime = function () {
  counter.innerText = count
}

const udateCount = function () {
  if (option.value == "medium") {
    count += 2
  }
  else if (option.value == "easy") {
    count += 3
  }
  else if (option.value == "hard") {
    count += 1
  }
}

const inputGame = function () {
  if (gameInput.value == word) {
    score++
    udateCount()
    gameInput.value = ''
    updateScore()
    updateTime()
    showOption()
  }
}
const updateScorecard = function () {
  if (option.value == "medium") {
    if(scoreM.innerText<score)
    {
    scoreM.innerText=score
    dateM.innerText=new Date()
    }
  }
  else if (option.value == "easy") {
    if(scoreE.innerText<score)
    {
    scoreE.innerText=score
    dateE.innerText=new Date()
    }
  }
  else if (option.value == "hard") {
    if(scoreH.innerText<score)
    {
    scoreH.innerText=score
    dateH.innerText=new Date()
    }
  }
}
const gameEnd = function () {
  gameOver.classList.add('show')
  document.querySelector('.game-scorer').innerText = score
  updateScorecard()
  gameReset()
}

const countDown = function () {
  interval = setInterval(() => {
    count--;
    updateTime()
    if (count == 0) {
      clearInterval(interval)
      gameEnd()
    }
  }, 1000)
}
const gameStarter = function () {
  countDown()
  showOption()
  gameRun = true
  gameInput.disabled = false
  gameStart.innerText = "Restart Game"
  gameStart.classList.add('game-run')
}
const gameReset = function () {
  gameRun = false
  gameInput.value = ''
  clearInterval(interval)
  count = 10
  score = 0
  updateScore()
  updateTime()
  gameInput.disabled = true
  gameStart.innerText = "Start Game"
  gameStart.classList.remove('game-run')
}


gameAgain.addEventListener('click', () => {
  gameOver.classList.remove('show')
})
navHide.addEventListener('click', hideNav)
scoreBtn.addEventListener('click', hideScore)
ruleBtn.addEventListener('click', hideRule)
option.addEventListener('change', showOption)
gameInput.addEventListener('input', inputGame)
gameStart.addEventListener('click', () => {
  if (gameRun)
    gameReset()
  else
    gameStarter()
})
