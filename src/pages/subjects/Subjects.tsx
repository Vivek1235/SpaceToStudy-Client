import { useCallback, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useSearchParams } from 'react-router-dom'

import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'

import SearchAutocomplete from '~/components/search-autocomplete/SearchAutocomplete'
import TitleWithDescription from '~/components/title-with-description/TitleWithDescription'
import AppAutoComplete from '~/components/app-auto-complete/AppAutoComplete'

import { styles } from '~/pages/subjects/Subjects.styles'
import { authRoutes } from '~/router/constants/authRoutes'
import { CategoryNameInterface, SubjectNameInterface } from '~/types'
import DirectionLink from '~/components/direction-link/DirectionLink'
import AppToolbar from '~/components/app-toolbar/AppToolbar'
import OfferRequestBlock from '~/containers/find-offer/OfferRequestBlock'
import useCategoriesNames from '~/hooks/use-categories-names'
import useSubjectsNames from '~/hooks/use-subjects-names'
import { mapArrayByField } from '~/utils/map-array-by-field'
import useBreakpoints from '~/hooks/use-breakpoints'

const Subjects = () => {
  const [searchValue, setSearchValue] = useState<string>('')

  const { t } = useTranslation()
  const { isMobile } = useBreakpoints()
  const [searchParams, setSearchParams] = useSearchParams()
  const categoryId = searchParams.get('categoryId')

  const { loading: categoriesNamesLoading, response: categoriesNamesItems } =
    useCategoriesNames()

  const transform = useCallback(
    (data: SubjectNameInterface[]): string[] => mapArrayByField(data, 'name'),
    []
  )

  const { response: subjectsNamesItems } = useSubjectsNames({
    category: categoryId,
    transform
  })

  const category = useMemo(
    () =>
      categoriesNamesItems.find((option) => option._id === categoryId) || null,
    [categoriesNamesItems, categoryId]
  )

  const onCategoryChange = (
    _: React.ChangeEvent,
    value: CategoryNameInterface | null
  ) => {
    searchParams.set('categoryId', value?._id || '')
    setSearchParams(searchParams)
  }

  const getOptionLabelCategory = (option: CategoryNameInterface) =>
    option.name || ''
  const isOptionEqualToValueCategory = (
    option: CategoryNameInterface,
    value: CategoryNameInterface
  ) => option?._id === value?._id

  const autoCompleteCategories = (
    <AppAutoComplete
      getOptionLabel={getOptionLabelCategory}
      isOptionEqualToValue={isOptionEqualToValueCategory}
      loading={categoriesNamesLoading}
      onChange={onCategoryChange}
      options={categoriesNamesItems}
      sx={styles.categoryInput}
      textFieldProps={{
        label: t('breadCrumbs.categories')
      }}
      value={category}
    />
  )

  return (
    <Container sx={{ flex: 1, mt: '80px' }}>
      <OfferRequestBlock />
      <TitleWithDescription
        componentStyles={styles.componentStyles}
        description={t('subjectsPage.subjects.description')}
        descriptionStyles={styles.sectionDescription}
        title={t('subjectsPage.subjects.title', {
          category: category?.name
        })}
        titleStyles={styles.sectionTitle}
      />

      <Box sx={styles.navigation}>
        <DirectionLink
          before={<ArrowBackIcon fontSize='small' />}
          linkTo={authRoutes.categories.path}
          title={t('subjectsPage.subjects.backToAllCategories')}
        />
        <DirectionLink
          after={<ArrowForwardIcon fontSize='small' />}
          linkTo={authRoutes.findOffers.path}
          title={t('subjectsPage.subjects.showAllOffers')}
        />
      </Box>
      <AppToolbar sx={styles.searchToolbar}>
        {!isMobile && autoCompleteCategories}
        <SearchAutocomplete
          options={subjectsNamesItems}
          search={searchValue}
          setSearch={setSearchValue}
          textFieldProps={{
            label: t('subjectsPage.subjects.searchLabel')
          }}
        />
      </AppToolbar>
      {isMobile && autoCompleteCategories}
    </Container>
  )
}

export default Subjects