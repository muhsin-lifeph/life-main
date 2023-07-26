export default async function getBrandsData(isAlphabetic:boolean) {
    const res = await fetch(`https://devapp.lifepharmacy.com/api/web/brands${isAlphabetic?"-by-alphabetic":""}`)

    if (!res.ok) throw new Error('failed to fetch data')

    return res.json()
}


