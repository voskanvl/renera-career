const phoneMask = (phone: string) => {
    return phone
        .replace(/\D/g, "")
        .replace(/^(\d)/, "($1")
        .replace(/^(\(\d{3})(\d)/, "$1) $2")
        .replace(/(\d{3})(\d{1,2})/, "$1-$2")
        .replace(/(-\d{2})(\d{1,2})$/, "$1-$2")
        .replace(/(-\d{2})(\d{2})(\d+)$/, "$1-$2")
}
export default function phone(element: HTMLInputElement | null) {
    if (!element) return
    element.addEventListener("input", () => {
        element.value = "+7 " + phoneMask(element.value.replace(/^\+7\W/, ""))
        if (element.value.length < 18)
            element.setCustomValidity("Вводимое число должно состоять из 10 цифр")
        else element.setCustomValidity("")
        console.log("🚀 ~ element.value:", element.value, element.value.length)
    })
}
