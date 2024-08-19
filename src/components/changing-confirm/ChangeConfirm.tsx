import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { useTranslation } from 'react-i18next'
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline'

import AppButton from '~/components/app-button/AppButton'

import { ButtonVariantEnum, SizeEnum } from '~/types'
import { styles } from '~/components/changing-confirm/ChangeConfirm.styles'

interface ChangeConfirmProps {
  title: string
  courseList: {
    id: string
    title: string
    subTitle: string
  }[]
}

const ChangeConfirm = ({ title, courseList }: ChangeConfirmProps) => {
  const { t } = useTranslation()

  const descriptionText = t('changeConfirm.descriptionResource', {
    resource: title
  })

  const resourceParts = descriptionText.split(title)

  return (
    <Box>
      <Box sx={styles.warningImageContainer}>
        <ErrorOutlineIcon data-testid='warning-icon' sx={styles.warningImage} />
      </Box>
      <Box>
        <Typography sx={styles.changeConfirmTitle}>
          {t('changeConfirm.title')}
        </Typography>
        <Typography sx={styles.changeConfirmResource}>
          {resourceParts[0]}
          <Typography component='span' sx={styles.changeConfirmResourceData}>
            {title}
          </Typography>
          {resourceParts[1]}
        </Typography>
        <Typography sx={styles.changeConfirmDescription}>
          {t('changeConfirm.description')}
        </Typography>
      </Box>
      <Box sx={styles.lessonsListContainer}>
        {courseList.map((el) => (
          <Box key={el.id} sx={styles.changeConfirmListItems}>
            <Typography sx={styles.changeConfirmListTitles}>
              {el.title}
            </Typography>
            <Typography sx={styles.changeConfirmListsubTitle}>
              {t(`changeConfirm.${el.subTitle}`)}
            </Typography>
          </Box>
        ))}
      </Box>
      <Box sx={styles.changeConfirmButtonsContainer}>
        <AppButton size={SizeEnum.Large} variant={ButtonVariantEnum.Tonal}>
          {t('changeConfirm.backButton')}
        </AppButton>
        <AppButton size={SizeEnum.Large} variant={ButtonVariantEnum.Contained}>
          {t('changeConfirm.confirmButton')}
        </AppButton>
      </Box>
    </Box>
  )
}

export default ChangeConfirm