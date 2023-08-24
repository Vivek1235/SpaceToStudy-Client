import { useState } from 'react'
import { useTranslation } from 'react-i18next'

import Box from '@mui/material/Box'

import PageWrapper from '~/components/page-wrapper/PageWrapper'
import Tab from '~/components/tab/Tab'
import Typography from '@mui/material/Typography'

import { tabsData } from '~/pages/my-resources/MyResources.constants'
import { styles } from '~/pages/my-resources/MyResources.styles'

const MyResources = () => {
  const [activeTab, setActiveTab] = useState<string>('lessons')
  const { t } = useTranslation()

  const handleClick = (tab: string) => {
    setActiveTab(tab)
  }

  const tabs = Object.keys(tabsData).map((key) => (
    <Tab
      activeTab={activeTab === key}
      key={key}
      onClick={() => handleClick(key)}
    >
      <Box sx={styles.titleBox}>
        {tabsData[key].icon}
        {t(tabsData[key].title)}
      </Box>
    </Tab>
  ))

  const tabContent = activeTab && tabsData[activeTab].content

  return (
    <PageWrapper>
      <Typography sx={styles.title}>{t(tabsData[activeTab].title)}</Typography>
      <Box sx={styles.tabs}>{tabs}</Box>
      {tabContent}
    </PageWrapper>
  )
}

export default MyResources