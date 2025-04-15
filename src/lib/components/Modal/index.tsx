import React, { ReactNode } from 'react'
import { Button, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay } from '@chakra-ui/react'

const CustomModal = ({isOpen, onClose, children,}: {isOpen: boolean, onClose: () => void, children: ReactNode,}) => {
  return (
    <Modal blockScrollOnMount={true} size='2xl' isOpen={isOpen} onClose={onClose} isCentered={true}>
      <ModalOverlay backdropFilter="blur(8px)" />
      <ModalContent
        bg="white"
        p={['10px', '20px']}
        borderRadius="5px"
        w={['95%','100%']}
        h='auto'
        maxH='90vh'
        overflow='auto'
      >
        <ModalBody w="100%">{children}</ModalBody>
      </ModalContent>
    </Modal>
  );
}

export default CustomModal