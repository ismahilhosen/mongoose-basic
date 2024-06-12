const express = require("express");
const { getProduct, createProduct, updateProduct, bulkProductUpadate, deleteProductById, bulkProductDelete } = require("../controllars/projuctControllar");
const router = express.Router()

router.route("/")
.get(getProduct)
.post(createProduct)

router.route("/bulk-update")
.patch(bulkProductUpadate)
router.route("/bulk-delete")
.delete(bulkProductDelete)

router.route("/:id")
.patch(updateProduct)
.delete(deleteProductById)

exports.Router = router;