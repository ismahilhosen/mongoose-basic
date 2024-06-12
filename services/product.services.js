const Product = require("../model/productModel");

async function  getProductServices(filtras,querys){
    const resuts = await Product
    .find(filtras)
    .sort(querys.sortBy)
    .skip(querys.skip)
    .limit(querys.limit)
    const totalProduct = await Product.countDo
    return resuts;
}

async function createProductServices(data){
    const result = await Product.create(data);
    return result
}

async function updateProductServices(productId, data){
    const product = await Product.findById(productId);
    const result = await product.set(data).save();

    // const result = await Product.updateOne({_id:productId}, {$inc: data})
    return result;
}
async function bulkProductUpdateServices(data){
    const products = []
    data.ids.forEach(product => {
        products.push(Product.updateOne({"_id":product.id}, product.data))
    }); 
    const results = Promise.all(products);
    return results;
}

async function deleteProductByIdservices(id){
    const result = await Product.deleteOne({_id:id});

    if(!result.deletedCount){
        return false;
    }
    return result;
}
async function bulkDeleteProductByIdservices(id){
    const result = await Product.deleteMany({_id:id});
    return result;
}

module.exports = {
    getProductServices, 
    createProductServices,
    updateProductServices, 
    bulkProductUpdateServices,
    deleteProductByIdservices,
    bulkDeleteProductByIdservices
} ;