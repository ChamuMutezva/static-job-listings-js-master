const cards = document.querySelector(".cards")
//const modal = document.querySelector(".modal")
//const filterArray = ["role", "level", "tool", "language"]
const populatedArray = [];

console.log(cards)
const getData = () => {
  fetch('./data.json')
    .then(data => data.json())
    .then(data => {
     // console.log(data)
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
          <div class="primary__content">
          <img src=${element.logo} class="card__logo">
          <div class="primary__basic">
            <h1 class="primary__title">${element.company}</h1>
            ${element.new ? `<span class="new">New!</span>` : `<span class="disableSpan">New!</span>`}
            ${element.featured ? `<span class="featured">Featured</span>` : `<span class="disableSpan">Featured</span>`}
           
          </div>
          <h2 class="primary__subtitle">${element.position}</h2>
          <ul>
            <li>${element.postedAt}</li>
            <li>${element.contract}</li>
            <li>${element.location}</li>
          </ul>
          </div>
        </div>
        
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
  // const newArr = filterArray.filter(elm => elm === targetElement.className)
  const parental = Array.from(document.querySelectorAll("section"))

  if (evt.target.tagName !== "BUTTON") {
    return
  }

  if (!populatedArray.includes(targetElement.innerHTML)) {
    populateModal(targetElement.innerHTML)
  } else {
    return
  }


  console.log(populatedArray)
  // console.log(targetElement.className)
  card.forEach(elm => {
    elm.classList.add("disableElements")
  })

  card.filter((elm, idx) => {
    //get all buttons in card , buttons are used for the filter only
    const btns = Array.from(elm.querySelectorAll("button"))
    let countCard = 0
    //loop through the buttons one by one    
    btns.forEach(btn => {
      // for the selected/clicked button
      // add a class to the card parent 
      if (btn.innerHTML === targetElement.innerHTML) {

        elm.classList.add(targetElement.innerHTML)

        // check for the all cards that have the classes in the populatedArray
        // if found is true - display those cards only - filtering used every method
        const found = populatedArray.every(r => elm.classList.contains(r))
        console.log(found)

        if (found) {
          elm.classList.remove("disableElements")
          console.log(targetElement.innerHTML)
        }

      }
    })
  })
 
})


const populateModal = (modalChild) => {
  populatedArray.push(modalChild)
  const modalContainer = document.querySelector(".modalContainer")
  const modal = document.querySelector('.modal')
  const ctrls = document.createElement("div")
  //const clearAllBtn = document.createElement("button")
  // clearAllBtn.innerHTML = "Clear"
  ctrls.classList.add("ctrls")
  modalContainer.classList.add("modalPadding")
  ctrls.innerHTML = `
  <span class="filterSpan ${modalChild}">${modalChild}</span>
  <button class="clearBtn"><img src="./images/icon-remove.svg" class="clearImg"/></button>
  `
  modal.appendChild(ctrls)
  // modal.appendChild(clearAllBtn)
  modal.addEventListener("click", (evt) => {
    const sectionCards = Array.from(document.querySelectorAll("section"))
    if (evt.target.tagName === "BUTTON" || evt.target.tagName === "IMG" || evt.target.tagName === "SPAN") {

      const filterParent = evt.target.closest(".ctrls")
      const filterSpan = filterParent.firstElementChild
      const filterSpanText = filterSpan.innerHTML
      filterParent.classList.add(filterSpanText)

      console.log(filterSpan)
      console.log(populatedArray)

      //find index of the element to be removed from array
      //to populate a new populatedArray without the removed filter element
      const filterIndex = populatedArray.indexOf(filterSpanText)
      console.log(filterIndex)
      if (filterIndex > -1) {
        populatedArray.splice(filterIndex, 1)  //remove element from array      
      }

      if (ctrls.classList.contains(filterSpanText)) {
        //remove only the clicked control from the modal
        modal.removeChild(ctrls)
      }

      //remove the class of the clicked btn      

    //  console.log(sectionCards)
      sectionCards.forEach(card => {
        const found = populatedArray.every(r => card.classList.contains(r))
        console.log(found)
        if (found) {
          card.classList.remove(filterSpanText)
          card.classList.remove("disableElements")
        } else {
          return
        }

      })

    }

  })

}

const ClearAllFilter = () => {
  const modal = document.querySelector('.modal')
  const modalContainer = document.querySelector(".modalContainer")
  const card = Array.from(document.querySelectorAll(".card"))
  console.log(card)

  card.forEach(elm => {
    populatedArray.forEach(item => {
      if (elm.classList.contains(item)) {
        elm.classList.remove(item)
      }
    })
    elm.classList.remove("disableElements")
  })
  // remove all items in populating array
  populatedArray.forEach(elm => {
    populatedArray.pop(elm)
  })
  console.log(populatedArray)
  // remove all .ctrls in modal
  const ctrls = Array.from(document.querySelectorAll(".ctrls"))
  ctrls.forEach(ctrl => {
    modal.removeChild(ctrl)
  })
  console.log(ctrls)
  modalContainer.classList.remove("modalPadding")
}

const ClearAllBtn = document.querySelector(".clearAll")
ClearAllBtn.addEventListener("click", ClearAllFilter)
