import { FC, ReactNode } from 'react'
import { Link } from 'react-router-dom'

import Box from '@mui/material/Box'
import { SxProps } from '@mui/material'

import { styles } from '~/components/app-card/AppCard.styles'

interface AppCardProps {
  children: ReactNode
  isClickable?: boolean
  link?: string
  sx?: SxProps
}

const AppCard: FC<AppCardProps> = ({
  children,
  isClickable = true,
  link,
  sx = {}
}) => {
  return (
    <Box
      component={link ? Link : Box}
      sx={{ ...styles.container(isClickable), ...sx }}
      to={link}
    >
      {children}
    </Box>
  )
}

export default AppCard