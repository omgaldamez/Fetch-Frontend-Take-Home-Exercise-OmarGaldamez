
export const load = async({ params })=>{
    // await new Promise(resolve => setTimeout(resolve,200))
    const res = await fetch("https://jsonplaceholder.typicode.com/posts/")
    const guides = await res.json()
    const id=params.id

    if(res.ok){
        return{
                guides,id
        }
    }

    return{
        status: res.status,
        error: new Error("No conecta JSON")
    }
}