import { useTranslation } from 'react-i18next'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import CheckBox from '@mui/material/Checkbox'
import FormControlLabel from '@mui/material/FormControlLabel'
import LockIcon from '@mui/icons-material/Lock'
import Avatar from '@mui/material/Avatar'

import useForm from '~/hooks/use-form'
import AppButton from '~/components/app-button/AppButton'
import AppTextField from '~/components/app-text-field/AppTextField'

import { styles } from '~/containers/my-cooperations/cooperation-notes/create-or-edit-note/CreateOrEditNote.styles'
import {
  TextFieldVariantEnum,
  ButtonVariantEnum,
  SizeEnum,
  TypographyVariantEnum,
  CreateOrUpdateNoteParams,
  NoteResponse,
  ComponentEnum,
  ButtonTypeEnum
} from '~/types'

interface CreateOrEditNoteProps {
  note?: NoteResponse
  onSubmitLoading: boolean
  onSubmit: (data: CreateOrUpdateNoteParams) => Promise<void>
  onCloseNote: () => void
}

const CreateOrEditNote = ({
  note,
  onSubmitLoading,
  onSubmit,
  onCloseNote
}: CreateOrEditNoteProps) => {
  const { t } = useTranslation()

  const userNameMocked = 'User Name'

  const {
    data,
    isDirty,
    handleInputChange,
    handleNonInputValueChange,
    handleSubmit
  } = useForm<CreateOrUpdateNoteParams>({
    initialValues: {
      text: note?.text ?? '',
      isPrivate: note?.isPrivate ?? false
    },
    onSubmit: async () => {
      await onSubmit(data)
    }
  })

  return (
    <Box
      component={ComponentEnum.Form}
      onSubmit={handleSubmit}
      sx={styles.container}
    >
      <Box sx={styles.header}>
        <Avatar />
        <Typography variant={TypographyVariantEnum.Subtitle2}>
          {userNameMocked}
        </Typography>
      </Box>
      <AppTextField
        InputLabelProps={styles.descriptionLabel}
        InputProps={styles.descriptionInput}
        fullWidth
        inputProps={{ maxLength: 100 }}
        label={data.text ? '' : t('cooperationsPage.notes.noteText')}
        multiline
        onChange={handleInputChange('text')}
        sx={styles.textfield}
        value={data.text}
        variant={TextFieldVariantEnum.Standard}
      />
      <Box sx={styles.settingsContainer}>
        <FormControlLabel
          checked={data.isPrivate}
          control={<CheckBox />}
          label={
            <Box sx={styles.settingsContainer}>
              <LockIcon fontSize={SizeEnum.Small} sx={styles.lockIcon} />
              <Typography variant={TypographyVariantEnum.Body2}>
                {t('cooperationsPage.notes.privateSetting')}
              </Typography>
            </Box>
          }
          onClick={() =>
            handleNonInputValueChange('isPrivate', !data.isPrivate)
          }
        />
        <Box sx={styles.btnContainer}>
          <AppButton
            onClick={onCloseNote}
            size={SizeEnum.Small}
            sx={styles.noteBtn}
            variant={ButtonVariantEnum.Tonal}
          >
            {t('common.cancel')}
          </AppButton>
          <AppButton
            disabled={!isDirty || !data.text}
            loading={onSubmitLoading}
            size={SizeEnum.Small}
            sx={styles.noteBtn}
            type={ButtonTypeEnum.Submit}
          >
            {t('common.save')}
          </AppButton>
        </Box>
      </Box>
    </Box>
  )
}

export default CreateOrEditNote
