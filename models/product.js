const e = require('express');
const fs = require('fs');
const { get } = require('http');
const path = require('path');
const p = path.join(path.dirname(process.mainModule.filename), 'data', 'products.json');


const getProductsFromFile = cb => {
    fs.readFile(p, (err, fileContent) => {
        if(err|| fileContent.length === 0){
          cb([]);
        }try {
            const products = JSON.parse(fileContent);
            cb(products);
        } catch (e) {
            console.error('Error parsing JSON:', e);
            cb([]); // fallback if file is corrupted
        }
    })
}

module.exports = class Product {
    constructor(title, imageURL, description, price) {
        this.title = title;
        this.imageURL = imageURL;
        this.price = price;
        this.description = description;
        
    }
    save() {
        getProductsFromFile(products => {
            products.push(this);
            fs.writeFile(p, JSON.stringify(products), (err) => {
            console.log(err);
        });
        });
    }
    static fetchAll(cb) {
        getProductsFromFile(cb);
    }};