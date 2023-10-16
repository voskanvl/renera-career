export default function plan(){
    const cb: IntersectionObserverCallback = ([{isIntersecting, target}]:IntersectionObserverEntry[])=>{
        isIntersecting ? target.classList.add("anim") : target.classList.remove("anim")
    }
    const iso = new IntersectionObserver(cb)
    const el = document.querySelector(".plan1612")
    el && iso.observe(el)
}