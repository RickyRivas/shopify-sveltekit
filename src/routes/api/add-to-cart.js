import {
    addItemToCart
} from "./util/add-item-to-cart";

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

        try {
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
        } catch (e) {
            return {
                statusCode: 400,
                body: JSON.stringify({
                    e
                })
            }
        }
    } else {

        return {
            statusCode: 400,
            body: JSON.stringify({
                msg: 'Something went wrong, bud.'
            })
        }
    }
}