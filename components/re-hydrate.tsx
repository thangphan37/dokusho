import * as React from 'react'
import { useHasMounted } from '@/utils/hooks'

function Rehydrate({
  children,
  ...delegated
}: {
  children: React.ReactNode
}): JSX.Element | null {
  const hasMounted = useHasMounted()

  if (!hasMounted) {
    return null
  }

  return <React.Fragment {...delegated}>{children}</React.Fragment>
}

export { Rehydrate }
