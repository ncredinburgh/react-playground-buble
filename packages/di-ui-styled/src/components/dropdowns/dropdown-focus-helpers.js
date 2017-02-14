const limit = (n, min, max) => {
  if (n < min) return min
  if (n > max) return max
  return n
}

const getVisibleFocused = (
  wrapperEl: HTMLElement,
  visibleItemsQuery: String,
) => {
  return wrapperEl
    .querySelector(`${visibleItemsQuery}:focus`)
}

const getAllVisible = (
  wrapperEl: HTMLElement,
  visibleItemsQuery: String,
) => {
  let els = wrapperEl
    .querySelectorAll(visibleItemsQuery)
  return Array.prototype.slice.call(els)
}

const focusFirstItem = (
  wrapperEl: HTMLElement,
  visibleItemsQuery: String,
) => {
  const el = wrapperEl
    .querySelector(visibleItemsQuery)
  if (el) el.focus()
}

export const focusLast = (
  wrapperEl: HTMLElement,
  visibleItemsQuery: String,
) => {
  const els = wrapperEl
    .querySelectorAll(visibleItemsQuery)
  if (els && els.length) els[els.length - 1].focus()
}

//export const focusLast = focusLastItem

export const focusInput = (
  inputEl: HTMLElement,
  filter: String,
) => {
  if (!filter) return
  inputEl.focus()
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

const isInputFocused = (
  inputEl: HTMLElement,
  filter: Boolean
) =>
  filter && document.activeElement &&
    (document.activeElement === inputEl)





// const focusMove = (dist: Number) => (
//   wrapperEl: HTMLElement,
//   inputEl: HTMLElement,
//   filter: Boolean,
//   visibleItemsQuery: String,
// ) => {
//   const focusedEl = getVisibleFocused(wrapperEl, visibleItemsQuery)
//   if (!focusedEl) {
//     if (isInputFocused(inputEl, filter) && dist === 1) {
//       focusFirstItem(wrapperEl, visibleItemsQuery)
//       return
//     } else {
//       focusFirst(wrapperEl, inputEl, filter, visibleItemsQuery)
//       return
//     }
//   }
//   const els = getAllVisible(wrapperEl, visibleItemsQuery)
//   let index = els.indexOf(focusedEl)
//   if (index === 0 && filter && dist === -1) {
//     inputEl.focus()
//     return
//   }
//   index = limit(
//     index + dist,
//     0,
//     els.length - 1,
//   )
//   els[index].focus()
// }

// export const focusNext = focusMove(1)
// export const focusPrev = focusMove(-1)

export const focusNext = (
  wrapperEl: HTMLElement,
  inputEl: HTMLElement,
  filter: Boolean,
  visibleItemsQuery: String,
) => {
  const focusedEl = getVisibleFocused(wrapperEl, visibleItemsQuery)
  if (!focusedEl) {
    if (isInputFocused(inputEl, filter)) {
      focusFirstItem(wrapperEl, visibleItemsQuery)
      return
    } else {
      focusFirst(wrapperEl, inputEl, filter, visibleItemsQuery)
      return
    }
  }
  const els = getAllVisible(wrapperEl, visibleItemsQuery)
  let index = els.indexOf(focusedEl)
  index = Math.min(
    index + 1,
    els.length - 1,
  )
  els[index].focus()
}

export const focusPrev = (
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
  let index = els.indexOf(focusedEl)
  if (index === 0 && filter) {
    inputEl.focus()
    return
  }
  index = Math.max(
    index - 1,
    0,
  )
  els[index].focus()
}
