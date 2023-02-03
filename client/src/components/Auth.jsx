export async function checkToken (){
    const token = document.cookie.replace('token=', '')
    try{
        const res = await fetch('http://localhost:3000/api/verify-token', {
                            method: 'POST',
                            headers: { 'authorization': token }
                          })
        const data = await res.json()
        return data
    } catch (e) {
        console.log(`Error: ${e}`)
    }
}