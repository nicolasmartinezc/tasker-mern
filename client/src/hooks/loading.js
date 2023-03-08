import { useState } from "react"

export const useLoading = () => {
    const [ isLoading, setIsLoading ] = useState(true)
    const  loadingFalse = () => setIsLoading(false)
    const  loadingTrue = () => setIsLoading(true)

    return { isLoading, loadingFalse, loadingTrue}
}