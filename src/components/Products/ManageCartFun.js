const AddToCart = (product) => {


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
        cart.Items.find(x => x.product._id === product._id).ItmPrice += product.price
    }
    else { cart.Items.push({ product: product, ItmQty: 1, ItmPrice: product.price }) }

    if (cart.Items.length > 0) {
        cart.totalQty++
        cart.totalPrice += product.price
    }

    console.log(cart)

    sessionStorage.setItem("Cart", JSON.stringify(cart));
    //sessionStorage.setItem("Cart",null)
    //    setCartItmCount({refresh:false,title:product.title})


    //setCartItmCount('add',product.title)

}


const DelfromCart = (product) => {


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
        var itm = cart.Items.find(x => x.product._id === product._id)
        itm.ItmQty--
        itm.ItmPrice -= product.price

        if (itm.ItmQty < 1) {
            console.log('Erase from array')
            const index = cart.Items.findIndex(x => x.product._id === product._id)
            console.log(index)
            cart.Items.splice(index, 1);
        }
    }
    else { return }
    //else { cart.Items.push({ product: product, ItmQty: 1,  ItmPrice:product.price}) }

    if (cart.Items.length > 0) {
        cart.totalQty--
        cart.totalPrice -= product.price
    }
    else {
        cart.totalQty = 0
        cart.totalPrice = 0
    }

    console.log(cart)

    sessionStorage.setItem("Cart", JSON.stringify(cart));


    // setCartItmCount('del',product.title)

}

const DelAllFromCart = (product) => {
    if (sessionStorage.getItem("Cart") === null)
    {return}

        var cart = JSON.parse(sessionStorage.getItem("Cart"))

    console.log('Cart:')

    if (cart.Items.find(x => x.product._id === product._id)) {
        console.log('ProductID already in a Cart!')
        var itm = cart.Items.find(x => x.product._id === product._id)
//        itm.ItmQty
  //      itm.ItmPrice

        console.log('Erase from array')
        const index = cart.Items.findIndex(x => x.product._id === product._id)
        console.log(index)
        cart.Items.splice(index, 1);

    }
    else { return }


    cart.totalQty -= itm.ItmQty
    cart.totalPrice -= itm.ItmPrice


    console.log(cart)

    sessionStorage.setItem("Cart", JSON.stringify(cart));

}




export default
    { AddToCart, DelfromCart ,DelAllFromCart}