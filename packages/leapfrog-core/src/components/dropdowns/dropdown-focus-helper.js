
const getVisibleFocused = (
  wrapperEl: HTMLElement,
  visibleItemsQuery: String,
) => {
  return this.ul
    .querySelector(`${visibleItemsQuery}:focus`)
}

const getAllVisible = (
  wrapperEl: HTMLElement,
  visibleItemsQuery: String,
) => {
  let els = this.ul
    .querySelectorAll(visibleItemsQuery)
  return Array.prototype.slice.call(els)
}

export const focusFirstItem = (
  wrapperEl: HTMLElement,
  visibleItemsQuery: String,
) => {
  const el = wrapperEl
    .querySelector(visibleItemsQuery)
  if (el) el.focus()
}

export const focusLastItem = (
  wrapperEl: HTMLElement,
  visibleItemsQuery: String,
) => {
  const els = wrapperEl
    .querySelectorAll(visibleItemsQuery)
  if (els && els.length) els[els.length - 1].focus()
}

export const focusInput = (
  inputEl: HTMLElement,
  filter: String,
) => {
  if (!filter) return
  this.input.focus()
}

export const focusFirst = (
  wrapperEl: HTMLElement,
  inputEl: HTMLElement,
  filter: Boolean,
  visibleItemsQuery: String,
) => {
  if (filter) {
    focusInput(inputEl, filter)
  } else {
    focusFirstItem(wrapperEl, visibleItemsQuery)
  }
}

export const isInputFocused = (
  inputEl: HTMLElement,
  filter: Boolean
) =>
  filter && document.activeElement &&
    (document.activeElement === inputEl)

const focusMove = (dist: Number) => (
  wrapperEl: HTMLElement,
  inputEl: HTMLElement,
  filter: Boolean,
  visibleItemsQuery: String,
) => {
  const focusedEl = getVisibleFocused(wrapperEl, visibleItemsQuery)
  if (!focusedEl) {
    focusFirst(wrapperEl, inputEl, filter, visibleItemsQuery)
    return
  }
  const els = getAllVisible(wrapperEl, visibleItemsQuery)
  const index = els.indexOf(el)
  if (index === 0 && filter) {
    inputEl.focus()
    return
  }
  const index = Math.min(
    els.length - 1,
    Math.max(0, index + dist)
  )
  els[index].focus()
}

export const focusNext = focusMove(1)
export const focusPrev = focusMove(-1)
