import { Flex, Image, Text, useDisclosure } from '@chakra-ui/react'
import React from 'react'
import { ConsentFormData } from '../../pages/checkoutPage'
import addShippingBtn from '../../public/images/addBtn.svg'

import ConsentForm from './ConsentForm'

export interface AddConsentButtonProps {
  addShippingdetailsBtnText: string
  setFormData: Function
  formData: ConsentFormData
  formSubmitHandler: Function
  imgFlag: boolean
}

const AddConsentButton: React.FC<AddConsentButtonProps> = props => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  return (
    <>
      <Flex
        alignItems={'center'}
        onClick={onOpen}
      >
        {/* eslint-disable-next-line jsx-a11y/alt-text */}
        {props.imgFlag ? <Image src={addShippingBtn} /> : null}
        <Text
          fontSize={'15px'}
          color={'rgba(var(--color-primary))'}
          pl={'10px'}
        >
          {props.addShippingdetailsBtnText}
        </Text>
      </Flex>
      <ConsentForm
        formData={props.formData}
        setFormData={props.setFormData}
        isOpen={isOpen}
        onOpen={onOpen}
        onClose={onClose}
        formSubmitHandler={props.formSubmitHandler}
      />
    </>
  )
}

export default AddConsentButton
