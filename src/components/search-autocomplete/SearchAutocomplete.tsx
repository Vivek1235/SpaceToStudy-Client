import {
  useState,
  ReactNode,
  Dispatch,
  SetStateAction,
  ChangeEvent,
  KeyboardEvent
} from 'react'
import { useTranslation } from 'react-i18next'

import { createFilterOptions, FilterOptionsState } from '@mui/material'
import {
  AutocompleteProps,
  AutocompleteRenderInputParams
} from '@mui/material/Autocomplete'
import { TextFieldProps } from '@mui/material/TextField'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import ClearIcon from '@mui/icons-material/Clear'
import SearchIcon from '@mui/icons-material/Search'

import AppAutoComplete from '~/components/app-auto-complete/AppAutoComplete'
import useBreakpoints from '~/hooks/use-breakpoints'
import { styles } from '~/components/search-autocomplete/SearchAutocomplete.styles'
import { SizeEnum, VariantEnum, VisibilityEnum } from '~/types'

interface SearchAutocompleteProps
  extends Omit<AutocompleteProps<string, false, true, true>, 'renderInput'> {
  search: string
  setSearch: Dispatch<SetStateAction<string>>
  textFieldProps: TextFieldProps
  renderInput?: (params: AutocompleteRenderInputParams) => ReactNode
}

const SearchAutocomplete = ({
  search,
  setSearch,
  textFieldProps,
  ...props
}: SearchAutocompleteProps) => {
  const [searchInput, setSearchInput] = useState<string>(search)

  const { t } = useTranslation()
  const { isMobile } = useBreakpoints()

  const filterOptions = (
    options: string[],
    state: FilterOptionsState<string>
  ) => {
    const defaultFilterOptions = createFilterOptions<string>()
    return defaultFilterOptions(options, state).slice(0, 6)
  }

  const onInputChange = (_: ChangeEvent<HTMLInputElement>, value: string) => {
    setSearchInput(value)
  }

  const onSearch = () => {
    setSearch(searchInput)
  }

  const onClear = () => {
    setSearchInput('')
    setSearch('')
  }

  const onEnterPress = (event: KeyboardEvent<HTMLInputElement>) => {
    event.key === 'Enter' && onSearch()
  }

  const labelStyle = {
    ...styles.inputLabel,
    visibility: searchInput && VisibilityEnum.Hidden
  }
  const clearIconVisibility = {
    visibility: searchInput ? VisibilityEnum.Visible : VisibilityEnum.Hidden
  }

  return (
    <Box sx={styles.container}>
      {!isMobile && <SearchIcon sx={styles.searchIcon} />}

      <AppAutoComplete
        ListboxProps={{ style: styles.listBox }}
        filterOptions={filterOptions}
        freeSolo
        hideClearIcon
        inputValue={searchInput}
        onInputChange={onInputChange}
        sx={{ flex: 1 }}
        textFieldProps={{
          InputLabelProps: { style: labelStyle, shrink: false },
          InputProps: { disableUnderline: true },
          onKeyDown: onEnterPress,
          variant: VariantEnum.Standard,
          sx: styles.input,
          ...textFieldProps
        }}
        {...props}
      />

      <IconButton onClick={onClear} sx={clearIconVisibility}>
        <ClearIcon fontSize={SizeEnum.Small} />
      </IconButton>

      <Button
        onClick={onSearch}
        size={isMobile ? SizeEnum.Small : SizeEnum.Large}
        sx={styles.searchBtn}
        variant={VariantEnum.ContainedLight}
      >
        {isMobile ? <SearchIcon /> : t('common.search')}
      </Button>
    </Box>
  )
}

export default SearchAutocomplete