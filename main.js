const cards = document.querySelector(".cards")
const filterArray = ["role", "level", "tool", "language"]
const populatedArray = [];

console.log(cards)
const getData = () => {
  fetch('./data.json')
    .then(data => data.json())
    .then(data => {
      console.log(data)
      data.forEach(element => {
        // console.log(element.company)
        const card = document.createElement("section")
        card.classList.add("card")
        cards.appendChild(card)
        template(card, element)

      });
    })
    .catch(err => console.log(err))

}
getData()

const template = (card, element) => {
  card.innerHTML = `
        <div class="primary">
          <img src=${element.logo} class="card__logo">
          <div class="primary__content">
          <div class="primary__basic">
            <h1 class="primary__title">${element.company}</h1>
            ${element.new ? `<span class="new">New!</span>` : `<span class="disableSpan">New!</span>`}
            ${element.featured ? `<span class="featured">Featured</span>` : `<span class="disableSpan">Featured</span>` }
           
          </div>
          <h2 class="primary__subtitle">${element.position}</h2>
          <ul>
            <li>${element.postedAt}</li>
            <li>${element.contract}</li>
            <li>${element.location}</li>
          </ul>
          </div>
        </div>
        <hr>
        <div class="secondary">
        <button class="role actionBtn">${element.role}</button>
        <button class="level actionBtn">${element.level}</button>
        <ul class="languages"> ${element.languages.map(lang => `<li><button class="language actionBtn">${lang}</button></li>`).join("")} </ul>
        <ul class="tools"> ${element.tools.map(tool => `<li><button class="tool actionBtn">${tool}</button></li>`).join("")} </ul>
       </div>   
     
`

}


cards.addEventListener("click", (evt) => {
  const card = Array.from(document.querySelectorAll(".card"))
  const targetElement = evt.target
  const targetParent = targetElement.closest("section")
  const newArr = filterArray.filter(elm => elm === targetElement.className)
  const parental = Array.from(document.querySelectorAll("section"))

  if (evt.target.tagName !== "BUTTON") {
    return
  }

  if (!populatedArray.includes(targetElement.innerHTML)) {
    populateModal(targetElement.innerHTML)
  }


  console.log(populatedArray)
  // console.log(targetElement.className)
  card.forEach(elm => {
    elm.classList.add("disableElements")
  })

  card.filter((elm, idx) => {
    //get all buttons in card
    const btns = Array.from(elm.querySelectorAll("button"))
    //const btnFinder = btns.find(btn => btn.innerHTML === targetElement.innerHTML)   
    //return btnFinder
    btns.forEach(btn => {
      if (btn.innerHTML === targetElement.innerHTML) {
        elm.classList.remove("disableElements")
        console.log(elm)
      }
    })
  })
  /* 
    while(cards.firstChild) {
      cards.removeChild(cards.firstChild)
    }
   */
})


const populateModal = (modalChild) => {
  populatedArray.push(modalChild)
  const modal = document.querySelector('.modal')
  const ctrls = document.createElement("div")
  ctrls.classList.add("ctrls")
  modal.classList.add("modalPadding")
  ctrls.innerHTML = `
  <button class="filterbtn ${modalChild.toLowerCase()}">${modalChild}</button>
  <button class="clear"><img src="/images/icon-remove.svg" class="clearImg"/></button>
  `
  modal.appendChild(ctrls)
}