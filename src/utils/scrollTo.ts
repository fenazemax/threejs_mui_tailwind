export const scrollTo = (block: string) => {
  document.querySelector(`.${block}`)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
}
