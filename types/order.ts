export default {
  name: "order",
  title: "Orders",
  type: "document",
  fields: [
    {
      name: "name",
      title: "Customer Name",
      type: "string",
    },
    {
      name: "email",
      title: "Email",
      type: "string",
    },
    {
      name: "contact",
      title: "Contact Number",
      type: "string",
    },
    {
      name: "totalAmount",
      title: "Total Amount",
      type: "number",
    },
    {
      name: "address",
      title: "Address",
      type: "object",
      fields: [
        { name: "fullAddress", title: "Full Address", type: "string" },
        { name: "area", title: "Area", type: "string" },
        { name: "city", title: "City", type: "string" },
      ],
    },
    {
      name: "cartItems",
      title: "Cart Items",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "name", title: "Product Name", type: "string" },
            { name: "price", title: "Price", type: "number" },
            { name: "quantity", title: "Quantity", type: "number" },
            { 
              name: "image", 
              title: "Product Image", 
              type: "image", 
              options: { hotspot: true } 
            },
          ],
        },
      ],
    },
  ],
};
