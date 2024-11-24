import { supabase } from "@/lib/supabase"

export const fetchCategories = async () => {
    try {

        const {data, error} = await supabase.from('categories').select("id, name");
        if(error) {

            console.log('Error fetching >> ', error)
            return {
                success: false,
                message: "Could not fetch categories"
            }
        }

        return {
            success: true,
            data
        }
    } catch(e) {
        
        console.log('Error fetching >> ', e);
        return {
            success: false,
            message: "Could not fetch categories"
        }

    }
}
export const fetchCrops = async () => {
    try {

        const {data, error} = await supabase.from('crops').select("*");
        if(error) {

            console.log('Error fetching crops >> ', error)
            return {
                success: false,
                message: "Could not fetch crops"
            }
        }

        return {
            success: true,
            data
        }
    } catch(e) {
        
        console.log('Error fetching crops >> ', e);
        return {
            success: false,
            message: "Could not fetch crops"
        }

    }
}