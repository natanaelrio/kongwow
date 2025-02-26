'use server'
import { revalidatePath } from "next/cache"
export async function HandleListProduct() {
    try {
        // DATA ADMIN
        const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/product.json`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': process.env.NEXT_PUBLIC_SECREET
            },
            next: { revalidate: 0 }
        })
        const data = res.json()
        return data
    }

    catch (error) {
        console.log(error);
    }
    revalidatePath('/')
}