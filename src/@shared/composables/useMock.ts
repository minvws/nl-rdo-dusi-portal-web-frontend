export const useMockUrl = () => {
  return `${window.location.origin}/mock`
}

export const useMockData = import.meta.env.VITE_MOCK_DATA === 'true'
