import { initMongoose } from "lib/connectdb";
import Product from "models/product";

export async function findAllProducts() {
    return Product.find().exec()
}



export default async function handler(req, res){
    await initMongoose();
    const {ids} = req.query;

    if(ids) {
        const data = await Product.find( {_id:{$in:ids.split(',')}} ).exec();
        res.json( data  )
    }else {
        res.json( await findAllProducts() )
    }

}