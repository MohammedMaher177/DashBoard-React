export  const apiEndpoints ={
    categories:{
        all: "/categories", 
        byId:(categoryId)=>`/categories/${categoryId}`,
        names: "/categories/names"
       
    },
    products:{
        all: "/products",
        byId:(productId)=> `/products/${productId}`
    },
    orders:{
        all: "/orders",
        byId:(productId)=> `/orders/${productId}`
    }
}

