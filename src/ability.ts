import { selectDataImg } from "./abilityToSlider"
export default function ability() {
    const FILTER_TIME = 400

    const abilityImg = document.querySelector<HTMLImageElement>(".ability1055__img")
    if (!abilityImg) return

    const abilityList = document.querySelector<HTMLUListElement>(".ability1055__list")
    // const itemActive = document.querySelector<HTMLUListElement>(".ability1055__list > li[active]")

    const mql = window.matchMedia("(max-width: 768px)")
    let matches = false

    mql.addEventListener("change", ({ matches: newMatches }: MediaQueryListEvent) => {
        matches = newMatches
    })

    let previousImg = abilityImg.src

    const changeAbilityImg = (img: string) => {
        abilityImg.classList.add("changing")
        setTimeout(() => {
            abilityImg.src = img || ""
            abilityImg.classList.remove("changing")
        }, FILTER_TIME)
    }

    abilityList &&
        abilityList.addEventListener("mouseover", (event: Event) => {
            if (matches) return
            const target = event.target as HTMLElement
            const li = target.closest<HTMLLIElement>("li")

            const img = li && selectDataImg(li)

            abilityImg.style.setProperty("--filter-time", FILTER_TIME + "ms")
            abilityImg.classList.add("changing")
            changeAbilityImg(img || "")
        })

    abilityList &&
        abilityList.addEventListener("mouseout", () => {
            changeAbilityImg(previousImg)
            console.log("🚀 ~ previousImg:", previousImg)
        })

    abilityList &&
        abilityList.addEventListener("click", (event: Event) => {
            const target = event.target as HTMLElement
            const li = target.closest<HTMLLIElement>("li")

            li &&
                li.dispatchEvent(
                    new CustomEvent("selectslide", { bubbles: true, detail: { element: li } }),
                )

            previousImg = (li && selectDataImg(li)) || ""
        })

    document.addEventListener("changeactiveslider", (event: Event) => {
        const {
            detail: { slide },
        } = event as CustomEvent<{ slide: HTMLElement }>
        previousImg = (slide && selectDataImg(slide)) || ""
    })
}
