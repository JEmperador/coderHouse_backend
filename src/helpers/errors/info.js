//General
export const generateDatabaseErrorInfo = () => {
  return `An error occurred while updating information
    - Verify your connection to the database.`;
};

//Product
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

//Cart
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

//Chat
export const generateFieldChatErrorInfo = (message) => {
  return `One or more properties were incomplete or not valid.
    List of required properties:
    - user         : Needs to be a String, received ${message.user}
    - message      : Needs to be a String, received ${message.message}`;
};

export const generateInvalidIdChatErrorInfo = (id) => {
  return `ID: ${id} is not valid.
    List of requiered for ID:
    - Length        : 24 character hexadecimal string.
    - Format        : It must consist of characters ranging from 0 to 9 and from "a" to "f".`;
};

export const generateNotFoundChatErrorInfo = () => {
  return `Not found Chat.
    - Verify in your database that the chat exists.`;
};

export const generateMessageEmptyChatErrorInfo = () => {
  return `Message cannot be empty.
    - Verify in your client that the chat exists.`;
};

//User
export const generateFieldUserErrorInfo = (user) => {
  return `One or more properties were incomplete or not valid.
    List of required properties:
    - first_name    : Needs to be a String, received ${user.first_name}
    - last_name     : Needs to be a String, received ${user.last_name}
    - email         : Needs to be a String, received ${user.email}
    - age           : Needs to be a Number, received ${user.age}`;
};

export const generateInvalidIdUserErrorInfo = (id) => {
  return `ID: ${id} is not valid.
    List of requiered for ID:
    - Length        : 24 character hexadecimal string.
    - Format        : It must consist of characters ranging from 0 to 9 and from "a" to "f".`;
};

export const generateInvalidEmailUserErrorInfo = (email) => {
  return `Email: ${email} already exists.
    - Choose another email.`;
};

export const generateNotFoundUserErrorInfo = () => {
  return `Not found User email.
    - Verify in your database that the user email exists.`;
};

export const generateSamePasswordUserErrorInfo = () => {
  return `Same password.
    - Choose another password.`;
};

export const generateNoDocumentationUserErrorInfo = () => {
  return `Missing documentation.
    Must add:
    - Identificacion.
    - Comprobante de domicilio.
    - Comprobante de estado de cuenta.`;
};

//Ticket
export const generateFieldTicketErrorInfo = (ticket) => {
  return `One or more properties were incomplete or not valid.
    List of required properties:
    - amount         : Needs to be a Number, received ${ticket.amount}
    - purchaser      : Needs to be a String, received ${ticket.purchaser}`;
};

export const generateInvalidIdTicketErrorInfo = (id) => {
  return `ID: ${id} is not valid.
    List of requiered for ID:
    - Length        : 24 character hexadecimal string.
    - Format        : It must consist of characters ranging from 0 to 9 and from "a" to "f".`;
};

export const generateNotFoundTicketErrorInfo = () => {
  return `Not found Product.
    - Verify in your database that the product exists.`;
};