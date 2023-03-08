export const getUserId = async() => {
    const token = document.cookie.replace('token=', '')
    try{
        const res = await fetch('http://localhost:3000/api/verify-token', {
                            method: 'POST',
                            headers: { 'authorization': token }
                        })
        const { userId, user } = await res.json()
        return { userId, user }
    } catch (e) {
        console.log(`Error: ${e}`)
    }
}