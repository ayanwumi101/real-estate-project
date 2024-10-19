import { Box, Flex, Text, Stack } from '@chakra-ui/react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'
import { BrowseProjectIcon, DashboardIcon, MyAssetsIcon, MyPortfolioIcon, TransactionsIcon, HelpAndSupportIcon, SettingsIcon, LogoutIcon } from '~/lib/components/Icons/Icons'



const SideBarItem = ({label, href, isActive, Icon}:{label: string, href: string, isActive: boolean, Icon: any}) => {
  return (
    <Box py="10px" w="100%" px="34" bg={isActive ? '#EDEDFF' : 'none'}>
      <Link href={href}>
        <Flex alignItems="center" gap="15px">
          <Icon isActive={isActive} />
          <Text color={isActive ? '#4040A0' : '#2E353F'} fontWeight={500}>{label}</Text>
        </Flex>
      </Link>
    </Box>
  );
}


const DashboardSidebar = () => {
  const pathname = usePathname()
  return (
    <Box as="nav" color="black" bg="#FBFBFB" pl="16px" w="100%" h="100vh">
      <Box
        borderX="1px solid #E4E4E4"
        w="100%"
        h="100%"
        borderBottom="1px solid #E4E4E4"
      >
        <Box
          textAlign="center"
          w="100%"
          h="96px"
          borderBottom="1px solid #E4E4E4"
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          Logo
        </Box>
        <Box py="24px">
          <Stack spacing="16px">
            <SideBarItem
              label="Dashboard"
              Icon={DashboardIcon}
              isActive={pathname === '/user/dashboard'}
              href="/user/dashboard"
            />
            <SideBarItem
              label="My Assets"
              Icon={MyAssetsIcon}
              isActive={pathname === '/user/assets'}
              href="/user/assets"
            />
            <SideBarItem
              label="Browse Project"
              Icon={BrowseProjectIcon}
              isActive={pathname === '/user/projects'}
              href="/user/projects"
            />
            <SideBarItem
              label="My Portfolio"
              Icon={MyPortfolioIcon}
              isActive={pathname === '/user/portfolio'}
              href="/user/portfolio"
            />
            <SideBarItem
              label="Transactions"
              Icon={TransactionsIcon}
              isActive={pathname === '/user/transactions'}
              href="/user/transactions"
            />
            <SideBarItem
              label="Help and Support"
              Icon={HelpAndSupportIcon}
              isActive={pathname === '/user/support'}
              href="/user/support"
            />
            <SideBarItem
              label="Settings"
              Icon={SettingsIcon} 
              isActive={pathname === '/user/settings'}
              href="/user/settings"
            />
            <SideBarItem
              label="Log Out"
              Icon={LogoutIcon}
              isActive={pathname === '/logout'}
              href="/dashboard"
            />
          </Stack>
        </Box>
      </Box>
    </Box>
  );
}

export default DashboardSidebar