import { useState, useEffect } from 'react'

interface Location {
  latitude: number | null
  longitude: number | null
}

interface LocationError {
  code: number | null
  message: string
}

const useGeolocation = () => {
  const [address, setAddress] = useState<string | null>(null)
  const [error, setError] = useState<LocationError>({ code: null, message: '' })

  const handleSuccess = async (position: GeolocationPosition) => {
    const { latitude, longitude } = position.coords

    try {
      const response = await fetch(
        `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`,
      )
      if (!response.ok) {
        throw new Error('Network response was not ok')
      }
      const data = await response.json()
      setAddress(data.city || data.locality || data.principalSubdivision)
    } catch (err) {
      if (err instanceof Error) {
        setError({ code: null, message: err.message })
      } else {
        setError({ code: null, message: 'An unknown error occurred' })
      }
    }
  }

  const handleError = (error: GeolocationPositionError) => {
    setError({ code: error.code, message: error.message })
  }

  useEffect(() => {
    if (!navigator.geolocation) {
      setError({ code: null, message: 'Geolocation is not supported by your browser' })
    } else {
      navigator.geolocation.getCurrentPosition(handleSuccess, handleError)
    }
  }, [])

  return { address, error }
}

export default useGeolocation
