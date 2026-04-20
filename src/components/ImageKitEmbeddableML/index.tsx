import './example.css'
import ModalToggle from './ModalToggle'
import { FunctionComponent } from 'react'
import { useFieldPlugin } from '@storyblok/field-plugin/react'
import type { SelectedAsset } from './types'

const isValidAsset = (item: unknown): item is SelectedAsset =>
  typeof item === 'object' && item !== null && 'url' in item && 'fileId' in item

const FieldPlugin: FunctionComponent = () => {
  const { type, data, actions } = useFieldPlugin<SelectedAsset[]>({
    enablePortalModal: true,
    validateContent: (content: unknown) => ({
      content: Array.isArray(content) ? content.filter(isValidAsset) : [],
    }),
  })

  if (type !== 'loaded') {
    return null
  }

  return (
    <div>
      <div className="container">
        <ModalToggle
          isModalOpen={data.isModalOpen}
          setModalOpen={actions.setModalOpen}
          setContent={actions.setContent}
          imagekitId={data.options['imagekitId'] ?? ''}
          multiple={data.options['multiple'] !== 'false'}
          maxFiles={data.options['maxFiles'] ? parseInt(data.options['maxFiles'], 10) : undefined}
        />
      </div>
    </div>
  )
}

export default FieldPlugin
