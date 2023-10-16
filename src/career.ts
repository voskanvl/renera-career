import { z } from "zod"
import IMask from "imask"

export default function career() {
    //--- CITY SELECTOR ---
    const countryTitle = document.querySelector<HTMLElement>(".country-selector__title")
    const countrySelector = document.querySelector<HTMLElement>(".country-selector__list")
    countrySelector &&
        countrySelector.addEventListener("click", ({ target }: Event) => {
            const targetEl = target as HTMLElement
            const closest = targetEl.closest<HTMLElement>("li[data-city]")
            const country = closest && closest.dataset.city
            const code = closest && closest.dataset.code

            code &&
                country &&
                countryTitle &&
                (countryTitle.innerHTML = `
                <span>${country}</span>
                <span>${code}</span>
            `)
        })
    //---

    const career = document.querySelector<HTMLElement>(".main > .career")
    if (!career) return

    const modalTrigger = career.querySelector<HTMLButtonElement>("button.create__button")
    const modalForm = career.querySelector<HTMLElement>(".modal-form")
    const form = career.querySelector<HTMLFormElement>(".modal-form form")
    const close = career.querySelector<HTMLElement>(".modal-form__close")
    const agreeCheck = career.querySelector<HTMLInputElement>(
        "input[type='checkbox'][name='agree']",
    )
    const phoneInput = document.querySelector<HTMLInputElement>("input[name='phone']")
    const fileInput = document.querySelector<HTMLInputElement>("input[type='file']")
    const formFile = document.querySelector<HTMLElement>(".modal-form__file")

    fileInput &&
        fileInput.addEventListener("input", (event: Event) => {
            const targetEl = event.target as HTMLInputElement
            const name = targetEl && targetEl.files && targetEl.files[0].name

            formFile &&
                formFile.insertAdjacentHTML(
                    "afterend",
                    `
                <div style="text-align: center; color: #fff; font-weight: 100;">
                    Будет отправлен файл <strong>${name}</strong>
                </div>
            `,
                )
        })

    phoneInput &&
        IMask(phoneInput, {
            mask: "(000)000-00-00",
            lazy: false,
        })

    const submitButton = career.querySelector<HTMLInputElement>("input[type='submit']")

    modalTrigger &&
        modalTrigger.addEventListener("click", () => {
            if (!modalForm) return
            modalForm.setAttribute("open", "open")
        })
    close &&
        close.addEventListener("click", () => {
            if (!modalForm) return
            modalForm.removeAttribute("open")
        })

    modalForm &&
        modalForm.addEventListener("click", (event: Event) => {
            const target = event.target as HTMLElement
            if (!target.closest(".modal-form__container")) {
                modalForm.removeAttribute("open")
            }
        })

    agreeCheck &&
        agreeCheck.addEventListener("change", () => {
            if (!submitButton) return
            submitButton.disabled = !agreeCheck.checked
        })

    submitButton &&
        submitButton.addEventListener("click", (event: Event) => {
            console.log("click")
            event.preventDefault()
            event.stopPropagation()

            const schema = z.object({
                name: z.string().min(2),
                email: z.string().email(),
                check: z.literal(true),
                phone: z.string().min(10),
            })

            const nameInput = document.querySelector<HTMLInputElement>("input[name='fio']")
            const nameError = document.querySelector<HTMLSpanElement>("input[name='fio'] + span")
            const emailInput = document.querySelector<HTMLInputElement>("input[name='email']")
            const emailError = document.querySelector<HTMLSpanElement>("input[name='email'] + span")
            const checkInput = document.querySelector<HTMLInputElement>("input[name='approval2']")
            const checkError = document.querySelector<HTMLSpanElement>(
                "input[name='approval2'] + span",
            )
            // const phoneInput = document.querySelector<HTMLInputElement>("input[name='phone']")
            // const phoneError = document.querySelector<HTMLSpanElement>("input[name='phone'] + span")

            const parseResult =
                nameInput &&
                emailInput &&
                checkInput &&
                schema.safeParse({
                    name: nameInput.value,
                    email: emailInput.value,
                    check: checkInput.checked,
                })

            if (parseResult && !parseResult?.success) {
                const errors = parseResult.error.errors
                errors.forEach(({ path: [name] }) => {
                    if (name === "name") nameError && (nameError.style.opacity = "1")
                    if (name === "email") emailError && (emailError.style.opacity = "1")
                    if (name === "check") checkError && (checkError.style.opacity = "1")
                })
            }

            form && console.log([...new FormData(form).entries()])

            if (parseResult?.success) {
                nameError && (nameError.style.opacity = "0")
                emailError && (emailError.style.opacity = "0")
                const container = document.querySelector<HTMLElement>(".modal-form__container")

                const phoneCode = document.querySelector<HTMLElement>(
                    ".country-selector__title > span:nth-child(2)",
                )

                const fd = form && new FormData(form)
                const fdPhone = fd && phoneCode && phoneCode.innerText + fd.get("phone")
                fd && fd.delete("phone")
                fd && fdPhone && fd.append("phone", "+" + fdPhone)

                fd &&
                    form &&
                    fetch("/mail2.php", {
                        method: "post",
                        body: fd,
                    }).then(r => {
                        if (r.ok) {
                            container && (container.innerText = "ЗАЯВКА ОТПРАВЛЕНА")
                            setTimeout(() => {
                                modalForm && modalForm.removeAttribute("open")
                                location.reload()
                            }, 3000)
                        } else {
                            container &&
                                (container.innerHTML = `
                                <div style="width: 90%">
                                <div style="color: #f70; margin-bottom: 2em; text-align: center;">ВОЗНИКЛА ПРОБЛЕМА ПРИ ОТПРАВКИ ЗАЯВКИ</div>
                                <div style="text-align: center;">ПОПРОБУЙТЕ ОТПРАВИТЬ ЗАЯВКУ ЧУТЬ ПОЗЖЕ</div>
                                </div>
                            `)
                            setTimeout(() => {
                                modalForm && modalForm.removeAttribute("open")
                                location.reload()
                            }, 3000)
                        }
                    })
            }
        })
}
