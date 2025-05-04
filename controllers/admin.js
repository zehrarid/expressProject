const Product = require("../models/product");

exports.getAddProduct = (req, res, next) => {
    res.render("admin/edit-product", {
      pageTitle: "Add Product",
      path: "/admin/add-product",
      editing: false
    });
  };
  
  exports.postAddProduct = (req, res, next) => {
    const title = req.body.title;
    const imageURL = req.body.imageURL;
    const description = req.body.description;  
    const price = req.body.price;  
    console.log(imageURL);
    const product = new Product(title, imageURL,description , price);
    product.save()
    res.redirect("/products");
  };
  exports.getEditProduct = (req, res, next) => {
    const editMode = req.query.edit;
    if (!editMode) {
      return res.redirect("/");
    }
    const prodId = req.params.productId;
    Product.findbyId(prodId, product => {
      if(!product) {
        return res.redirect("/");
      }
    })
    res.render("admin/edit-product", {
      pageTitle: "Edit Product",
      path: "/admin/edit-product",
      editing: editMode,
      product: product
    });
  };

  exports.getProducts = (req, res, next) => {
    Product.fetchAll((products) => {
      res.render("admin/products", {
        prods: products,
        pageTitle: "Admin Products",
        path: "/admin/products"
        });
    }
    );
  }