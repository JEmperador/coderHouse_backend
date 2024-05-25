export const generateDatabaseErrorInfo = () => {
  return `An error occurred while updating information
    - Verify your connection to the database.`;
};

export const generateFieldProductErrorInfo = (product) => {
  return `One or more properties were incomplete or not valid.
    List of required properties:
    - title         : Needs to be a String, received ${product.title}
    - description   : Needs to be a String, received ${product.description}
    - price         : Needs to be a Number, received ${product.price}
    - code          : Needs to be a String, received ${product.code}
    - stock         : Needs to be a Number, received ${product.stock}
    - category      : Needs to be a String, received ${product.category}`;
};

export const generateInvalidIdProductErrorInfo = (id) => {
  return `ID: ${id} is not valid.
    List of requiered for ID:
    - Length        : 24 character hexadecimal string.
    - Format        : It must consist of characters ranging from 0 to 9 and from "a" to "f".`;
};

export const generateNotFoundProductErrorInfo = () => {
  return `Not found Product.
    - Verify in your database that the product exists.`;
};

export const generateInvalidCodeProductErrorInfo = (code) => {
  return `Code: ${code} already exists
    - Choose another code.`;
};

export const generateCannotUpdateProductErrorInfo = (id, code) => {
  return `Cannot update ID: ${id} or Code: ${code} property
    - Choose another ID or Code respectively`;
};

export const generateInvalidIdCartErrorInfo = (id) => {
  return `ID: ${id} is not valid.
    List of requiered for ID:
    - Length        : 24 character hexadecimal string.
    - Format        : It must consist of characters ranging from 0 to 9 and from "a" to "f".`;
};

export const generateNotFoundCartErrorInfo = () => {
  return `Not found Cart.
    - Verify in your database that the product exists.`;
};

export const generateBuyerMissingCartErrorInfo = () => {
  return `Not found Buyer.
    - Verify in your database that the user exists.`;
};
