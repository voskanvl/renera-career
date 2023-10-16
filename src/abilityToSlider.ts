import "@splidejs/splide/css"
import Splide from "@splidejs/splide"
import type { SlideComponent } from "@splidejs/splide"

function createSlider() {
    const ID = "ability-slider"
    const targetList = document.querySelector<HTMLUListElement>(".ability1055__list")
    if (!targetList) return

    const root = targetList.parentElement
    if (!root) return

    const splideSection = document.createElement("section")
    const splideTrack = document.createElement("div")
    splideSection.classList.add("splide")
    splideSection.setAttribute("id", ID)
    splideTrack.classList.add("splide__track")
    targetList.classList.add("splide__list")

    const lis = targetList.querySelectorAll<HTMLLinkElement>("li")
    lis &&
        lis.forEach(e => {
            e.classList.add("splide__slide")
            e.removeAttribute("active")
        })

    splideTrack.append(targetList)
    splideSection.append(splideTrack)

    root.prepend(splideSection)

    const slider = new Splide("#" + ID, {
        type: "loop",
        perPage: 4,
        perMove: 1,
        arrows: false,
        pagination: false,
        breakpoints: {
            1024: {
                perPage: 3,
            },
            768: {
                perPage: 1,
            },
        },
    })
    return slider
}

export const RESOLUTIONS = [
    "(min-width: 1024px)",
    "(max-width: 1023px) and (min-width: 425px)",
    "(max-width: 424px)",
]

export const checkCurrentResolution = (): number => {
    const booleanMap = RESOLUTIONS.map(e => window.matchMedia(e).matches)
    const numberMap = booleanMap.reduce((acc: number[], e: boolean) => [...acc, +e], [])
    return numberMap.reduce((acc, e, i) => acc + (i + 1) * e, 0)
}

export const parseDataImg = (sourceImg: HTMLElement): string[] | null => {
    if (!sourceImg || !sourceImg.dataset || !sourceImg.dataset.img) return null
    return JSON.parse(sourceImg.dataset.img.replace(/'/g, '"') || "[]")
}

export const selectDataImg = (sourceImg: HTMLElement): string | null => {
    const arrImg = parseDataImg(sourceImg)
    if (!arrImg) return null
    return arrImg[checkCurrentResolution() - 1]
}

export const changeImg = (targetImg: HTMLImageElement, sourceImg: HTMLElement) => {
    if (!sourceImg.dataset || !sourceImg.dataset.img) return
    const img = selectDataImg(sourceImg)
    if (!img) return
    targetImg.src = img
}

export default function abilitytoSlider() {
    // const mql = window.matchMedia("(max-width: 768px)")
    const slider = createSlider()
    const abilityImg = document.querySelector<HTMLImageElement>(".ability1055__img")

    slider?.mount()

    // if (innerWidth <= 1024) sliderOn()
    // let currentMatches = false

    // mql.addEventListener("change", ({ matches }: MediaQueryListEvent) => {
    //     currentMatches = matches
    //     matches
    //         ? slider && slider.options && (slider.options.focus = "center")
    //         : slider && slider.options && (slider.options.focus = "center")
    // })

    slider?.on("active", (event: SlideComponent) => {
        const { slide } = event
        const parent = slide.parentElement
        const lis = parent && parent.querySelectorAll<HTMLLinkElement>("li")
        lis && lis.forEach(e => e.removeAttribute("active"))
        slide.setAttribute("active", "active")

        // abilityImg && slide.dataset.img && (abilityImg.src = slide.dataset.img)
        abilityImg && slide.dataset.img && changeImg(abilityImg, slide)

        slide.dispatchEvent(
            new CustomEvent("changeactiveslider", { bubbles: true, detail: { slide } }),
        )
    })

    document.addEventListener("selectslide", (event: Event) => {
        const {
            detail: { element },
        } = event as CustomEvent<{ element: HTMLElement }>
        const id = Number(element.dataset.id)
        slider?.go(id - 1 ?? "")
    })
}
