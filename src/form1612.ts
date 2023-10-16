import phone from "./phone"

export default function form1612() {
    const formContainer = document.querySelector<HTMLElement>(".form-component1055"),
        form = document.querySelector<HTMLFormElement>(".form-component1055__body"),
        phoneEl = document.querySelector<HTMLInputElement>(".form-component1055__body #phone")

    phone(phoneEl)

    form &&
        form.addEventListener("submit", async (event: Event) => {
            event.preventDefault()

            const formMessage = ({
                type,
                message,
            }: {
                type: "resolve" | "reject"
                message: string
            }) => {
                if (!formContainer) return
                const root = formContainer,
                    modal = document.createElement("div"),
                    panel = document.createElement("div")

                root.style.position = "relative"
                modal.classList.add("modal")
                panel.classList.add("panel", type === "resolve" ? "panel--success" : "panel--fail")
                panel.innerHTML = `<h1>${message}</h2>`
                modal.append(panel)
                root.append(modal)

                setTimeout(() => modal.remove(), 3000)
            }

            const body = new FormData(form)
            try {
                const res = await fetch(form.action, {
                    method: "POST",
                    body,
                })
                if (!res.ok) throw Error("error")
                formMessage({ type: "resolve", message: "Вопрос отправлен успешно" })
            } catch (error) {
                formMessage({
                    type: "reject",
                    message:
                        "Возникла ошибка при отправки Вашего вопроса. Попробуйте повторить позже",
                })
            }
        })
}
