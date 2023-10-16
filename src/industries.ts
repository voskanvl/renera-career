import industriesData from "./data/industries.yml"
export default function industries() {
    const data = industriesData.industries as industriesDataType[]
    const triggerList = document.querySelector<HTMLUListElement>(".industries__list"),
        ibpDescription = document.querySelector<HTMLUListElement>(
            ".industries__ibp > .industries__descriptions",
        ),
        sneDescription = document.querySelector<HTMLUListElement>(
            ".industries__sne > .industries__descriptions",
        )

    const createList = (list: string[]): HTMLLIElement[] => {
        return list.map(e => {
            const el = document.createElement("li")
            el.innerHTML = e
            return el
        })
    }
    triggerList &&
        triggerList.addEventListener("click", (event: Event) => {
            const target = event.target as HTMLElement
            const industriesDataItem = data.find(
                (e: industriesDataType) => e.id == target.dataset.id,
            )
            if (!industriesDataItem) return

            ibpDescription && (ibpDescription.innerHTML = "")
            ibpDescription && ibpDescription.append(...createList(industriesDataItem.ibp))

            sneDescription && (sneDescription.innerHTML = "")
            sneDescription && sneDescription.append(...createList(industriesDataItem.sne))
        })
}
