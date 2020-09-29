import React from 'react'
import { Header, Segment, Icon, Breadcrumb, List, Card } from 'semantic-ui-react'
import FileCard from '../FileCard/FileCard'

const FileExplorer = () => {
  let currentPath = []

  return (
    <div>
      <Header as='h2'>
        <u>Files</u>
      </Header>
      <Breadcrumb>
        <Icon name='folder open outline'/>
        <Breadcrumb.Section link active={!currentPath.length}>Objects</Breadcrumb.Section>
        <Breadcrumb.Divider />
        {
          currentPath.map((folderName, folderDepth) => (
            <span>
              <Breadcrumb.Section link active={currentPath.length === folderDepth+1}>{folderName}</Breadcrumb.Section>
              <Breadcrumb.Divider />
            </span>
          ))
        }
      </Breadcrumb>
      <List divided relaxed>
        <FileCard
          cardType='list'
          name='hello'
          size='2MB'
          fileType='png'
          url='https://google.com'
          lastMod='Sunday'
        />
      </List>
    </div>
  )
}

export default FileExplorer