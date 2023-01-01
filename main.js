import './style.css'
let navHide = false
document.querySelector(".nav-hide").addEventListener('click', () => {
  if (navHide) {
    document.querySelector(".nav").classList.remove("nav-none")
    document.querySelector(".nav-hide").classList.remove('nav-hide-rot')
  }
  else {
    document.querySelector(".nav").classList.add("nav-none")
    document.querySelector(".nav-hide").classList.add("nav-hide-rot")
  }
  navHide = !navHide
})

let scoreHide = true
let rulehide = true
document.querySelector("#scores-btn").addEventListener('click', () => {
    document.querySelector(".scores-overlay").classList.add("show")

    document.querySelector('.close-btn').addEventListener('click', ()=>{
      document.querySelector(".scores-overlay").classList.remove("show")
      scoreHide = !scoreHide
    })
    scoreHide = !scoreHide
})

