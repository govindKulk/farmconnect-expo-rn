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



export const fetchAllProducts = async (limit = 10) => {
    try {
       
            const { data, error } = await supabase
                .from('products')
                .select(`*, user: users (id, name, image), crop: crops (id, name)`)
                .order('created_at', { ascending: false })
                .limit(limit);

            if (error) {
                console.log('Fetch posts error >>:', error);
                return { msg: 'Could not fetch the posts', success: false };
            }

            return { data, success: true };
        
    } catch (error) {
        console.log('Fetch posts error >>:', error);
        return { msg: 'Could not fetch the posts', success: false };
    }
}

export const getSingleProduct = async (productId: string) => {
    try {
       
            const { data, error } = await supabase
                .from('products')
                .select(`*, crop: crops (id, name, category: categories (id, name))`)
                .eq("id", productId)
                .single()

            if (error) {
                console.log('Fetch product error >>:', error);
                return { msg: 'Could not fetch the product', success: false };
            }

            return { data, success: true };
        
    } catch (error) {
        console.log('Fetch posts error >>:', error);
        return { msg: 'Could not fetch the posts', success: false };
    }
}

