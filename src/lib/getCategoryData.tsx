export default async function getCategoryData() {
    const res = await fetch(`https://devapp.lifepharmacy.com/api/categories`)

    if (!res.ok) throw new Error('failed to fetch data')

    return res.json()
}