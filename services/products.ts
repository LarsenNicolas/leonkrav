export const getProducts = async () => {
    const response = await fetch(process.env.STRAPI_URL + '/products', {
        headers: {
            "Authorization": `Bearer ${process.env.STRAPI_APIKEY}`
        }
    })

    const { data } = await response.json()

    return data
}