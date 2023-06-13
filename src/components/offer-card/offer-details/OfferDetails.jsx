import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import LanguagesListWithIcon from '~/components/languages-list-with-icon/LanguagesListWithIcon'

import SubjectLevelChips from '~/components/subject-level-chips/SubjectLevelChips'

import { styles } from '~/components/offer-card/offer-details/OfferDetails.styles'

const OfferDetails = ({
  subject,
  chipsColor,
  level,
  title,
  description,
  languages
}) => {
  return (
    <Box sx={{ flex: 1 }}>
      <Typography sx={styles.title} variant='h6'>
        {title}
      </Typography>
      <SubjectLevelChips
        color={chipsColor}
        proficiencyLevel={level}
        subject={subject}
        sx={styles.chipContainer}
      />
      <Typography sx={styles.description} variant='body2'>
        {description}
      </Typography>
      <LanguagesListWithIcon languages={languages} />
    </Box>
  )
}

export default OfferDetails
