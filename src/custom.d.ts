declare module "*.yaml" {
    const data: any
    export default data
}
declare module "*.yml" {
    const data: any
    export default data
}

declare interface industriesDataType {
    id: string | number
    trigger: string
    ibp: string[]
    sne: string[]
}
