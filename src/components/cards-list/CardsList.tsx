import { FC, ReactElement } from 'react'
import Box from '@mui/material/Box'

import AppButton from '~/components/app-button/AppButton'
import Loader from '~/components/loader/Loader'

import { styles } from '~/components/cards-list/CardsList.styles'
import { SizeEnum, VariantEnum } from '~/types'

interface CardsListProps {
  btnText: string
  cards: ReactElement[]
  isExpandable?: boolean
  loading?: boolean
  onClick: () => void
}

const CardsList: FC<CardsListProps> = ({
  btnText,
  cards,
  isExpandable = true,
  loading,
  onClick
}) => {
  const hideBtn = !isExpandable && { visibility: 'hidden' }

  if (loading && !cards.length) {
    return <Loader pageLoad size={50} />
  }

  return (
    <Box>
      <Box sx={styles.cardsContainer}>{cards}</Box>

      <AppButton
        loading={loading}
        onClick={onClick}
        size={SizeEnum.ExtraLarge}
        sx={[styles.btn, hideBtn]}
        variant={VariantEnum.Tonal}
      >
        {btnText}
      </AppButton>
    </Box>
  )
}
export default CardsList