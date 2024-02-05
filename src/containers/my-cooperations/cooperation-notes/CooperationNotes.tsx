import { useState, useCallback } from 'react'
import { useParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import Box from '@mui/material/Box'
import Divider from '@mui/material/Divider'
import Typography from '@mui/material/Typography'
import AddIcon from '@mui/icons-material/Add'

import useAxios from '~/hooks/use-axios'
import useConfirm from '~/hooks/use-confirm'
import { useSnackBarContext } from '~/context/snackbar-context'
import { CooperationNotesService } from '~/services/cooperation-service'
import CreateOrEditNote from '~/containers/my-cooperations/cooperation-notes/create-or-edit-note/CreateOrEditNote'
import NoteView from '~/containers/my-cooperations/cooperation-notes/note-view/NoteView'
import Loader from '~/components/loader/Loader'

import { snackbarVariants, defaultResponses } from '~/constants'
import { styles } from '~/containers/my-cooperations/cooperation-notes/CooperationNotes.styles'
import {
  CreateNoteParams,
  PositionEnum,
  ErrorResponse,
  NoteResponse
} from '~/types'

const CooperationNotes = () => {
  const { t } = useTranslation()
  const { id } = useParams()
  const { setAlert } = useSnackBarContext()
  const { openDialog } = useConfirm()

  const [open, setOpen] = useState(false)

  const onResponseError = useCallback(
    (error: ErrorResponse) => {
      setAlert({
        severity: snackbarVariants.error,
        message: error ? `errors.${error.message}` : ''
      })
    },
    [setAlert]
  )

  const onResponse = useCallback(() => {
    setAlert({
      severity: snackbarVariants.success,
      message: t('cooperationsPage.notes.noteMsg')
    })
  }, [setAlert, t])

  const onDeleteResponse = useCallback(() => {
    setAlert({
      severity: snackbarVariants.success,
      message: t('cooperationsPage.modalMessages.successDeletion')
    })
  }, [setAlert, t])

  const getNotes = useCallback(() => CooperationNotesService.getNotes(id), [id])

  const createNoteService = useCallback(
    (data?: CreateNoteParams) => CooperationNotesService.createNote(data, id),
    [id]
  )

  const deleteNote = useCallback(
    (noteId?: string) =>
      CooperationNotesService.deleteNote(id ?? '', noteId ?? ''),
    [id]
  )

  const {
    response: notes,
    loading,
    fetchData
  } = useAxios<NoteResponse[]>({
    service: getNotes,
    defaultResponse: defaultResponses.array,
    onResponseError
  })

  const onNoteCreate = useCallback(() => {
    onResponse()
    setOpen(false)
    void fetchData()
  }, [onResponse, fetchData])

  const { fetchData: addNewNote } = useAxios({
    service: createNoteService,
    defaultResponse: null,
    fetchOnMount: false,
    onResponseError,
    onResponse: onNoteCreate
  })

  const { error, fetchData: deleteItem } = useAxios({
    service: deleteNote,
    fetchOnMount: false,
    defaultResponse: null,
    onResponseError,
    onResponse: onDeleteResponse
  })

  const handleDelete = async (id: string, isConfirmed: boolean) => {
    if (isConfirmed) {
      await deleteItem(id)
      if (!error) await fetchData()
    }
  }

  const onDeleteNote = (id: string) => {
    openDialog({
      message: 'cooperationsPage.modalMessages.confirmDeletionMessage',
      sendConfirm: (isConfirmed: boolean) => void handleDelete(id, isConfirmed),
      title: `cooperationsPage.modalMessages.confirmDeletionTitle`
    })
  }

  const duplicateNote = useCallback(
    (id?: string) => {
      const note = notes.find((item) => item._id === id)
      return createNoteService(note)
    },
    [notes, createNoteService]
  )

  const onDuplicateResponse = () => {
    setAlert({
      severity: snackbarVariants.success,
      message: `cooperationsPage.modalMessages.successDuplication`
    })
  }

  const { error: duplicationError, fetchData: duplicateItem } = useAxios({
    service: duplicateNote,
    fetchOnMount: false,
    defaultResponse: null,
    onResponseError,
    onResponse: onDuplicateResponse
  })

  const handleDuplicate = async (itemId: string) => {
    await duplicateItem(itemId)
    if (!duplicationError) await fetchData()
  }

  const onCloseNote = () => {
    setOpen(false)
  }

  const onAddNoteOpen = () => {
    setOpen(true)
  }

  const NotesList = notes.map((item: NoteResponse) => (
    <NoteView
      deleteItem={onDeleteNote}
      duplicateItem={(itemId: string) => void handleDuplicate(itemId)}
      key={item._id}
      note={item}
    />
  ))

  return (
    <Box sx={styles.notesWrapper}>
      <Divider orientation={PositionEnum.Vertical} sx={styles.divider} />
      <Box>
        <Box sx={styles.notesIcon}>
          <Typography>{t('cooperationsPage.details.notes')}</Typography>
          <AddIcon onClick={onAddNoteOpen} />
        </Box>
        {open && (
          <CreateOrEditNote addNewNote={addNewNote} onCloseNote={onCloseNote} />
        )}
        {loading ? <Loader pageLoad /> : NotesList}
      </Box>
    </Box>
  )
}

export default CooperationNotes