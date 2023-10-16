function ativateElement(element: HTMLElement, elements: HTMLElement[], attribute: string) {
    elements.forEach(e => e.removeAttribute(attribute))
    element.setAttribute(attribute, attribute)
}
export default function cells(className: string): void {
    const triggers = document.querySelectorAll<HTMLElement>(`${className} .cell-button1055`)
    const dataElement = document.querySelector<HTMLElement>(`${className} .cells1055__data`)

    if (!dataElement) return console.warn(`${className} .cells1055__data is missing`)

    const riseSelect = (x: number, element: HTMLElement) => {
        const event = new CustomEvent("dataselect", { bubbles: true, detail: { data: x } })
        element.dispatchEvent(event)
    }

    triggers &&
        triggers.forEach(e =>
            e.addEventListener("click", () => {
                const id = e.dataset.id
                ativateElement(e, [...triggers], "active")
                id && riseSelect(+id, dataElement)
                e.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" })
            }),
        )

    dataElement.addEventListener("dataselect", (event: Event) => {
        const { data } = (event as CustomEvent<{ data: number }>).detail

        const targets = dataElement.querySelectorAll<HTMLElement>(`[data-id]`)
        const target = dataElement.querySelector<HTMLElement>(`[data-id="${data}"]`)

        targets && targets.forEach(e => e.removeAttribute("active"))
        target && target.setAttribute("active", "active")
    })
}
