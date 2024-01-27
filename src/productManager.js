class ProductManager {
  constructor() {
    this.products = [];
  }

  _getNextId = () => {
    const count = this.products.length;
    const nextId = count > 0 ? this.products[count - 1].id + 1 : 1;

    return nextId;
  };

  addProduct = (title, description, price, thumbnail, code, stock) => {
    const products = this.getProducts();

    const product = {
      id: this._getNextId(),
      title,
      description,
      price,
      thumbnail,
      code,
      stock,
    };

    if (products.find((product) => product.code === code)) {
      return `Product with code ${product.code} already exists\n`;
    }

    this.products.push(product);

    return "Product was loaded successfully\n";
  };

  getProducts = () => {
    return this.products;
  };

  getProductById = (productId) => {
    const products = this.getProducts();

    const [searchedProduct] = products.filter(
      (product) => product.id === productId
    );

    if (!searchedProduct) {
      return "Not found\n";
    }

    return searchedProduct;
  };
}

// Se instancia la Clase
const productManager = new ProductManager();

// Primera consulta de productos
console.info("Primera consulta de productos")
console.log(productManager.getProducts());

// Carga primer producto
console.info("Carga primer producto")
console.log(
  productManager.addProduct(
    (title = "producto prueba 1"),
    (description = "lorem ipsum"),
    (price = 9),
    (thumbnail = "https://picsum.photos/200"),
    (code = "abc123"),
    (stock = 1)
  )
);

// Segunda consulta de productos
console.info("Segunda consulta de productos")
console.log(productManager.getProducts());

// Carga segundo producto
console.info("Carga segundo producto")
console.log(
  productManager.addProduct(
    (title = "producto prueba 2"),
    (description = "lorem ipsum"),
    (price = 9),
    (thumbnail = "https://picsum.photos/300"),
    (code = "abc123"),
    (stock = 1)
  )
);

// Consulta producto existente
console.info("Consulta producto existente")
console.log(productManager.getProductById(1));

// Consulta producto no existente
console.info("Consulta producto no existente")
console.log(productManager.getProductById(5));
