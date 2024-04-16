import React from 'react'
import { useRouter } from 'next/navigation'
import { useUserData } from '@/modules/hooks/useUserData'
import LoadingComponent from '@/modules/core-ui/LoadingComponent'

const withAuth = Component => {
  const ProtectedRoute = () => {
    const router = useRouter()
    const {
      data: user,
      isLoading: isUserLoading,
      isError: isUserError
    } = useUserData()

    if (isUserLoading) {
      return <LoadingComponent />
    }

    if (!isUserLoading && isUserError) {
      router.push('/login')
      return null
    }

    if (!user?.is_organization) {
      router.push('/login')
      return null
    }
    return (
      <>
        <Component />
      </>
    )
  }

  return ProtectedRoute
}

export default withAuth
