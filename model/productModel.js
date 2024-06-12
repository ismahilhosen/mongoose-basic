const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
    name:{
        type: String,
        required: true,
        trim: true,
        unique: [true, "name is not unique"],
        minLength: [3, "name must be 3 characters"],
        maxLength: [100, "name is too large"]
    },
    discription:{
        type: String, 
        required:true,
    },
    price:{
        type: Number,
        min:[0, "price can't nagetive number"],
        required: true
    },
    unit:{
        type: String,
        required: true,
        enum: {
            values:["kg", "pcs", "leater"],
            massage: "unit value can't be {value}"
        }
    },
    quantity:{
        type: Number,
        min: [0, "quntity must be a posetive and flort number"],
        required: true,
        validate:{
            validator: (value)=>{
                const isInteger = Number.isInteger(value);
                if(isInteger){
                    return true;
                }else{
                    return false;
                }
            }
        },
        massage: "quantity must be integer"
    },
    stauts:{
        type: String,
        required: true,
        enum:{
            values: ["in-stock", "out-of-stock", "discontinute"],
            massage: "massage can't be {value}"
        }
    },
    createAt:{
        type: Date,
        default: Date.now
    },
    updateAt:{
        type: Date,
        default: Date.now
    },
    // supplier:{
    //     type: mongoose.Schema.Types.ObjectId, // for refarance object
    //     ref: "supplier"
    // },
    categories:[{ //for embate object
        name:{
            type: String,
            required: true,
        },
        _id: mongoose.Schema.Types.ObjectId
    }]


},{
    timestamps: true // mongoos time proparty
})

//mongoos middilwrere for pre change data 
productSchema.pre("save", function(next){
    if(this.quantity === 0 ){
        this.stauts = "out-of-stock";
    }
    next()
} )
//mongoos middilwrere for post change data 
// productSchema.post("save", function(doc, next){
//     console.log("before call");
//     next()
// } )

module.exports = mongoose.model("Product", productSchema);