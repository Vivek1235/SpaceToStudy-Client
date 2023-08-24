import { FC, MouseEvent } from 'react'
import { Link } from 'react-router-dom'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Avatar from '@mui/material/Avatar'

import AppCard from '~/components/app-card/AppCard'
import { useAppSelector } from '~/hooks/use-redux'

import { createUrlPath, getFormattedDate } from '~/utils/helper-functions'
import { authRoutes } from '~/router/constants/authRoutes'
import { styles } from '~/components/message/Message.styles'
import { MessageInterface } from '~/types'

interface MessageProps {
  message: MessageInterface
  prevMessage: MessageInterface | null
}

const Message: FC<MessageProps> = ({ message, prevMessage }) => {
  const { userId: myId } = useAppSelector((state) => state.appMain)

  const { author, text, authorRole, createdAt } = message
  const { _id, photo } = author
  const { path } = authRoutes.userProfile
  const isMyMessage = myId === _id
  const isSameAuthor = prevMessage?.author._id === _id
  const pathToProfile = createUrlPath(path, _id, { authorRole })

  const timeDifference = prevMessage
    ? new Date(createdAt).getTime() - new Date(prevMessage.createdAt).getTime()
    : Infinity

  const isAvatarVisible =
    !isSameAuthor || (isSameAuthor && timeDifference > 600000)

  const handleLinkClick = (e: MouseEvent<HTMLAnchorElement>) => {
    e.stopPropagation()
  }

  const date = getFormattedDate({
    date: createdAt,
    options: { hour: '2-digit', minute: '2-digit' }
  })

  const avatar = !isMyMessage && isAvatarVisible && (
    <Link onClick={handleLinkClick} to={pathToProfile}>
      <Avatar
        src={photo && `${import.meta.env.VITE_APP_IMG_USER_URL}${photo}`}
        sx={styles.avatar}
      />
    </Link>
  )

  return (
    <Box sx={styles.root(isMyMessage, isAvatarVisible)}>
      {avatar}
      <AppCard sx={styles.messageCard(isMyMessage)}>
        {text}
        <Typography sx={styles.date(isMyMessage)}>{date}</Typography>
      </AppCard>
    </Box>
  )
}

export default Message