
const { getProductServices, createProductServices, updateProductServices, bulkProductUpdateServices, deleteProductByIdservices, bulkDeleteProductByIdservices } = require("../services/product.services")

exports.createProduct = async(req, res, next)=>{

    try {
        //save
        // const product = new Product(req.body);
        // const data = await product.save();

        //create
        const results = await createProductServices(req.body)
        
        res.status(200).json({
            massage: "data save successfull",
            stauts:"success",
            data: results
        })
    } catch (error) {
        res.status(400).json({
            stauts: "fall",
            massage: "data is not inserted",
            error: error.message
        })
    }

} 

exports.getProduct= async(req, res)=>{
    
try {

        //query bulder
    // const product = await Product.find({}).where("name").equals(/\w/);



    //query exclud
    let filtras = {...req.query};
    
    const excludField = ["sorts", "limit"];
    excludField.forEach(field => delete filtras[field])
    
    //advance filtaring with oparetor
    let filterString = JSON.stringify(filtras)
    filterString = filterString.replace(/\b(gt|lt|gte|lte)\b/g, match =>`$${match}`)
    filtras = JSON.parse(filterString)
    const querys = {}
    if(req.query.sorts){
        const sortBy = req.query.sorts.split(',').join(' ');
        querys.sortBy = sortBy;
    }

    if(req.query.page){
        const {page=2, limit=1} = req.query;
        const skip = (page -1)* parseInt(limit);
        console.log(skip);
        querys.skip = skip;
        querys.limit = limit;
    }
    
    

    //without sapacific propaty and value oparetion quary 
    const product = await getProductServices(filtras,querys);

    //or oparetion quary {$or:[{},{}]}
    // const product = await Product.find({$or:[{name:"chla"}, {_id: "665bdecaaa45ad2621ce21e0",}]});

    // not equal oparetion {object: {$ne:"string, number"}}
    // const product = await Product.find({stauts:{$ne: "out-of-stock"}});

    //ghreter then oparetion {object:{$gt: 10}}
    // const product = await Product.find({quantity:{$gt: 10}});

    //ghreter then oparetion {object:{$gte: 10}}
    // const product = await Product.find({quantity:{$gte: 10}});

    //in oprator 
    // const product = await Product.find({name:{$in: ["chal", "onion"]}});


res.status(200).json({
    stauts: "success",
    massage: "data is geted",
    data: product
})

} catch (error) {
res.status(400).json({
    stauts: "fall",
    massage: "data can't get",
    error: error.message
})
}
}

exports.updateProduct = async (req, res, next)=>{
    try {
        const {id} = req.params;
        const results = await updateProductServices(id, req.body)
        res.status(200).json({
            stauts:"success",
            massage: "product updated",
            data: results
        })
    } catch (error) {
        res.status(400).json({
            stauts:"fall",
            massage: "product update fall",
            error: error.message
        })
    }
    
    
}

exports.bulkProductUpadate = async (req, res, next)=>{
    try {
        
        const results = await bulkProductUpdateServices(req.body);
        res.status(200).json({
            stauts:"success",
            massage: "product updated",
            data: results
        })
    } catch (error) {
        res.status(400).json({
            stauts:"fall",
            massage: "product update fall",
            error: error.message,
        })
    }
}
exports.bulkProductDelete = async (req, res, next)=>{
    try {
        
        const results = await bulkDeleteProductByIdservices(req.body.ids);

        res.status(200).json({
            stauts:"success",
            massage: "product deleted",
            data: results
        })
    } catch (error) {
        res.status(400).json({
            stauts:"fall",
            massage: "product delete fall",
            error: error.message,
        })
    }
}

exports.deleteProductById = async(req, res, next) =>{
    try {
        const {id} = req.params
        const result = await deleteProductByIdservices(id);
        console.log(result);

            res.status(200).json({
                "status": "success",
                "message": "data delete successfull",
                "data": result
            })
        
    } catch (error) {
        res.status(400).json({
            "status": "fall",
            "message": "data delete all",
            "data": error.message
        })
    }

}