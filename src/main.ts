import "./style.sass"
import form1612 from "./form1612"
import ability from "./ability"
import abilityToSlider from "./abilityToSlider"
import industries from "./industries"
// import cells from "./cells"
// import video2 from "./video2"

form1612()
ability()
abilityToSlider()
industries()

const topButton = document.querySelector<HTMLElement>("#new-form-button"),
    bottomButton = document.querySelector<HTMLElement>("#submit_your_application")

bottomButton &&
    bottomButton.addEventListener("click", (event: Event) => {
        event.preventDefault()
        topButton?.click()
    })
