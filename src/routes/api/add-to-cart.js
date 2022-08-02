import {
    addItemToCart
} from "./util/add-item-to-cart";
import {
    createCartWithItem
} from "./util/createCartWithItem";
export async function POST({
    request
}) {
    // getting the body of the post request from [handle].svelte amd converting it to json
    const data = await request.json();
    let {
        cartId,
        itemId,
        quantity
    } = data

    // convert quantity to readable format
    quantity = parseInt(quantity);

    if (cartId) {

        console.log('--------------------------------');
        console.log('Adding item to existing cart...');
        console.log('--------------------------------');

        const shopifyResponse = await addItemToCart({
            cartId,
            itemId,
            quantity
        })
        // const data = JSON.stringify(shopifyResponse.cartLinesAdd.cart)

        return {
            statusCode: 200,
            body: JSON.stringify(shopifyResponse.cartLinesAdd.cart)

        }

    } else {
        console.log('--------------------------------');
        console.log('Creating new cart with item...');
        console.log('--------------------------------');
        // create new cart and add new item if no cartId is in localStorage
        const createCartResponse = await createCartWithItem({
            itemId,
            quantity
        });

        // const data = JSON.stringify(createCartResponse.cartCreate.cart)

        return {
            statusCode: 200,
            body: JSON.stringify(createCartResponse.cartCreate.cart)
        }
    }
}