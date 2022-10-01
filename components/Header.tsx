import { useRouter } from 'next/router'
import { useState } from 'react'
import { useMoralis } from 'react-moralis'

const style = {
  wrapper: `p-4 w-screen flex justify-between items-center`,
  headerLogo: `flex items-center justify-center`,
  nav: `flex-1 md:flex justify-center hidden items-center`,
  navItemsContainer: `flex bg-[#191B1F] rounded-3xl`,
  navItem: `px-4 py-2 m-1 flex items-center text-lg font-semibold text-[0.9rem] cursor-pointer rounded-3xl`,
  activeNavItem: `bg-[#20242A] rounded-3xl`,
  buttonsContainer: `flex w-1/4 justify-end items-center`,
  buttonIconContainer: `flex items-center justify-center w-8 h-8`,
  buttonAccent: ``,
}

const Header = ({ notLanding }: any) => {
  const { isAuthenticated, logout, user, authenticate } = useMoralis()
  const router = useRouter()
  const [selectedNav, setSelectedNav] = useState<string>('')

  return (
    <div
      className={`fixed top-0 z-30 h-24 w-full p-[20px] transition-all duration-500 ease-in`}
    >
      <div className="flex justify-between">
        <div className={style.headerLogo} onClick={() => router.push('/home')}>
          <img
            src="/Logo/tp-trbc.png"
            alt="TRB"
            className="h-12 cursor-pointer rounded-xl object-cover"
          />
        </div>
        {notLanding && (
          <div className={style.nav}>
            <div className={style.navItemsContainer}>
              <div
                onClick={() => {
                  router.push('/home/#about')
                  setSelectedNav('about')
                }}
                className={`${style.navItem} ${
                  selectedNav === 'about' && style.activeNavItem
                }`}
              >
                ABOUT
              </div>
              <div
                onClick={() => {
                  router.push('/home#tokenomics')
                  setSelectedNav('tokenomics')
                }}
                className={`${style.navItem} ${
                  selectedNav === 'tokenomics' && style.activeNavItem
                }`}
              >
                TOKENOMICS
              </div>
              <div
                onClick={() => {
                  router.push('mybulls')
                }}
                className={`${style.navItem} ${
                  selectedNav === 'mybulls' && style.activeNavItem
                }`}
              >
                MY BULLS
              </div>
              <div
                onClick={() => {
                  router.push('/mint')
                  if (router.pathname == '/mint') {
                    setSelectedNav('mint')
                  }
                }}
                className={`${selectedNav === 'mint' && style.activeNavItem}`}
              >
                <div className={style.navItem}>
                  MINT {/* <FiArrowUpRight /> */}
                </div>
              </div>
            </div>
          </div>
        )}
        <div className="flex h-full items-center space-x-5">
          {isAuthenticated ? (
            <div
              className={`mx-2 flex cursor-pointer items-center justify-between rounded-2xl bg-[#191B1F] px-2 py-1 text-[1rem] font-semibold`}
            >
              <div
                onClick={() => router.push('/mybulls')}
                className={`z-50 mr-2 flex h-8 cursor-pointer items-center rounded-2xl border-[#163256] bg-[#172A42] p-2`}
              >
                {user?.get('ethAddress').slice(0, 5)}...
                {user?.get('ethAddress').slice(-4)}
              </div>
              <div
                onClick={logout}
                className="rounded-full border-[#163256] bg-[#172A42] p-2"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                  />
                </svg>
              </div>
            </div>
          ) : (
            <div
              onClick={() => authenticate()}
              className={`mx-2 flex cursor-pointer items-center rounded-2xl bg-[#191B1F] px-2 py-1 text-[0.9rem] font-semibold`}
            >
              <div
                className={`flex h-full items-center justify-center rounded-2xl border border-[#163256] bg-[#172A42] px-2 py-1 text-[#4F90EA] hover:border-[#234169]`}
              >
                Connect Wallet
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Header
