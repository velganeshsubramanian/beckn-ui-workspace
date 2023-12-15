import React, { useEffect, useState } from 'react'
import BottomModal from '../BottomModal'
import { Box, Image, Text } from '@chakra-ui/react'
import CartIcon from '../cart/CartIcon'
import { useRouter } from 'next/router'
import styles from './header.module.css'

import { useLanguage } from '../../hooks/useLanguage'

type PathnameObjectType = { [key: string]: string }

const cartIconBlackList: string[] = [
  '/orderConfirmation',
  '/orderDetails',
  '/trackOrder',
  '/feedback',
  '/orderHistory',
  '/',
  '/mobileOtp',
  '/cart',
  '/checkoutPage',
  '/paymentMode'
]

const backIconList = ['/', '/orderDetails']

const homeIconBlackList = ['/orderHistory', '/', '/homePage', '/mobileOtp']

const storeHeaderBlackList = [
  '/checkoutPage',
  '/orderHistory',
  '/orderDetails',
  '/cart',
  '/homePage',
  '/orderConfirmation',
  'feedback',
  '/',
  '/mobileOtp',
  '/paymentMode'
]
const headerValues: PathnameObjectType = {
  '/checkoutPage': 'Billing & Shipping',
  '/orderHistory': 'Order History',
  '/orderDetails': 'Order Details',
  '/': 'Sign In',
  '/cart': 'Cart',
  '/paymentMode': 'Select Payment Method',
  feedback: 'Feedback'
}

const headerValuesFrench: PathnameObjectType = {
  '/checkoutPage': 'Facturation et Livraison',
  '/orderHistory': 'Historique des Commandes',
  '/orderDetails': 'Détails de la Commande',
  '/': 'Se Connecter',
  '/mobileOtp': 'Se Connecter',
  '/cart': 'Panier',
  '/paymentMode': 'Sélectionner la Méthode de Paiement',
  feedback: "Retour d'Information"
}

const topHeaderBlackList: string[] = []

const bottomHeaderBlackList = ['/homePage', '/orderConfirmation']

const menuIconWhiteList = ['/homePage']

const languageIconWhiteList = ['/homePage', '/', '/mobileOtp']

const getHeaderTitleForPage = (name: string, logo: string, pathName: string, locale: string | undefined) => {
  const values = locale === 'en' ? headerValues : headerValuesFrench
  switch (true) {
    case storeHeaderBlackList.includes(pathName):
      return <Text className={styles.header_title_text}>{values[pathName]}</Text>
    default:
      return (
        <Box className={styles.header_title}>
          <Text className={styles.header_title_text}>{name}</Text>
        </Box>
      )
  }
}

export interface TopHeaderProps {
  handleMenuClick?: () => void
}

const TopHeader: React.FC<TopHeaderProps> = ({ handleMenuClick }) => {
  const [isMenuModalOpen, setMenuModalOpen] = useState(false)
  const { t, locale } = useLanguage()
  const router = useRouter()

  const handleMenuModalClose = () => {
    setMenuModalOpen(false)
  }

  return (
    <>
      <div className={styles.top_header}>
        <div className={styles.top_header_wrapper}>
          <div>
            <Image
              src="/images/Suppliflow_app_logo.svg"
              alt="App logo"
            />
          </div>
        </div>
      </div>

      {/* Menu Modal */}
      <BottomModal
        isOpen={isMenuModalOpen}
        onClose={handleMenuModalClose}
      >
        <div
          onClick={() => {
            router.push('/orderHistory')
          }}
          className={styles.top_header_modal}
        >
          <Image
            src="/images/orderHistory.svg"
            alt="Order history icon"
          />
          {t['orderHistory']}
        </div>
      </BottomModal>
    </>
  )
}

const BottomHeader = () => {
  const [optionTags, setOptionTags] = useState<any>()
  const { t, locale } = useLanguage()

  useEffect(() => {
    setOptionTags(JSON.parse(localStorage.getItem('optionTags') as string))
  }, [])

  const router = useRouter()

  return (
    <header className={styles.bottom_header}>
      <div className={styles.bottom_header_wrapper}>
        <div className={styles.bottom_header_innr}>
          <div className={styles.bottom_header_backIcon}>
            {!backIconList.includes(router.pathname) && (
              <div onClick={() => router.back()}>
                <Image
                  src="/images/Back.svg"
                  alt="Back icon"
                />
              </div>
            )}
          </div>

          {getHeaderTitleForPage(optionTags?.name, optionTags?.logo, router.pathname, locale)}
          <div className={styles.bottom_header_cartIcon}>
            {!cartIconBlackList.includes(router.pathname) && <CartIcon />}
          </div>
        </div>
      </div>
    </header>
  )
}

const Header = () => {
  const router = useRouter()

  const renderTopHeader = !topHeaderBlackList.includes(router.pathname)
  const renderBottomHeader = !bottomHeaderBlackList.includes(router.pathname)

  return (
    <div>
      {renderTopHeader && <TopHeader />}
      {renderBottomHeader && <BottomHeader />}
    </div>
  )
}

export default Header