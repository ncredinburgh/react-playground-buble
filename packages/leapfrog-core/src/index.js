// @flow


import fallback from './utils/fallback'
export Caret from './components/caret'
export PageHeader from './components/page-header'
export Button from './components/button'
export Toast from './components/toasts/toast'
export Toasts from './components/toasts/toasts'
export WithToasts from './components/toasts/with-toasts-fac'
export withToasts from './components/toasts/with-toasts-hoc'
export TextInput from './components/text-input'
export DropdownButton from './components/dropdowns/dropdown-button'
export DropdownButtonSplit from './components/dropdowns/dropdown-button-split'
export MultiselectDropdown from './components/dropdowns/multiselect-dropdown'
export {
  Dropdown,
  DropdownSplit,
} from './components/dropdowns/dropdown'
// export MultiselectDropdown from './components/dropdowns/multiselect-dropdown'
// export SelectDropdown from './components/dropdowns/select-dropdown'
export Loader from './components/loader'
export Spacer from './components/spacer'
export Checkbox from './components/checkbox'
export Radio from './components/radio'
export Modal from './components/modal/modal'
export ModalTitle from './components/modal/modal-title'
export ModalProvider from './components/modal/modal-provider'
export withModal from './components/modal/with-modal-hoc'
export WithModal from './components/modal/with-modal-fac'
import ToggleSwitchMain from './components/toggle-switch'
import ToggleSwitchIe9 from './components/toggle-switch.ie9'
export const ToggleSwitch = fallback(ToggleSwitchMain, ToggleSwitchIe9)

export Day from './components/dates/day-anim'
export Month from './components/dates/month'
export MonthChooser from './components/dates/month-chooser'
export DatePicker from './components/dates/date-picker'
export DateDropdown from './components/dates/date-dropdown'
export DateDropdownPrimative from './components/dates/date-dropdown-primative'
