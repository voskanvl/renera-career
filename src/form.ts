const phoneMask = (phone: string) => {
    return phone
        .replace(/\D/g, "")
        .replace(/^(\d)/, "($1")
        .replace(/^(\(\d{3})(\d)/, "$1) $2")
        .replace(/(\d{3})(\d{1,2})/, "$1-$2")
        .replace(/(-\d{2})(\d{1,2})$/, "$1-$2")
        .replace(/(-\d{2})(\d{2})(\d+)$/, "$1-$2")
}

function messageToForm(form: HTMLFormElement, message: string): void {
    const modal = document.createElement("div")
    modal.style.cssText = `
        position: absolute;
        z-index: 1;
        inset: 0;
        width: 100%;
        height: 100%;  
        display: grid;
        place-items: center;
        background: #0009;
        backdrop-filter: blur(4px);    
    `
    modal.innerHTML = `<h1 style="text-transofrm: uppercase; text-align: center; padding: 1rem;">${message}</h1>`
    form.append(modal)
    setInterval(() => {
        modal.remove()
    }, 4000)
}
export default function form() {
    const formElement = document.querySelector<HTMLFormElement>("form.form-component1055__body")
    const phone = document.querySelector<HTMLInputElement>("#phone")

    phone &&
        phone.addEventListener("input", () => {
            phone.value = "+7 " + phoneMask(phone.value.replace(/^(\+7)/, ""))
            phone.value.length < 18
                ? phone.setCustomValidity("количество знаков в номере должно быть 10")
                : phone.setCustomValidity("")
        })

    formElement &&
        formElement.addEventListener("submit", async (event: Event) => {
            event.preventDefault()
            const fd = new FormData(formElement)
            try {
                let res = await fetch(formElement.action, {
                    method: "POST",
                    body: fd,
                })
                if (!res || !res.ok) throw Error("ошибка обращения к серверу")
                messageToForm(formElement, "Ваше сообщение отправлено успешно")
                formElement.reset()
            } catch (error) {
                messageToForm(formElement, "Сообщение не отправлено, попробуйте отправиь еще раз")
            }
        })
}
