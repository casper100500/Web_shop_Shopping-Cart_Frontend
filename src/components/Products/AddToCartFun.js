
const AddToCart = (product, setCartItmCount) => {


    var cart = {
        Items: [],
        totalQty: 0,
        totalPrice: 0
    }

    if (sessionStorage.getItem("Cart") !== null) {
        cart = JSON.parse(sessionStorage.getItem("Cart"))
    }

    console.log('Cart:')

    if (cart.Items.find(x => x.product._id === product._id)) {
        console.log('ProductID already in a Cart!')
        cart.Items.find(x => x.product._id === product._id).ItmQty++
        cart.Items.find(x => x.product._id === product._id).ItmPrice+=product.price
    }
    else { cart.Items.push({ product: product, ItmQty: 1,  ItmPrice:product.price}) }

    if (cart.Items.length>0) {
        cart.totalQty++
        cart.totalPrice+=product.price
    }

    console.log(cart)

    sessionStorage.setItem("Cart", JSON.stringify(cart));
    //sessionStorage.setItem("Cart",null)
    setCartItmCount()

}

export default AddToCart;