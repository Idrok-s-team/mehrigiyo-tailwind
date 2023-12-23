import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

const useSyncUrlQueryParams = (paramName: string, values?: string | number[]) => {
  const router = useRouter()

  useEffect(() => {
    const updateUrl = () => {
      const params = new URLSearchParams(window.location.search)
      const valueAsString = Array.isArray(values) ? values.join(',') : values?.toString()

      if (valueAsString) {
        params.set(paramName, valueAsString)
      } else {
        params.delete(paramName)
      }

      router.push(`?${params.toString()}`, { scroll: false })
    }

    const timeout = setTimeout(updateUrl, 300)

    return () => clearTimeout(timeout)
  }, [values, paramName, router])
}

export default useSyncUrlQueryParams
