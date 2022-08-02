import {
    removeItemFromCart
} from "./util/remove-item-from-cart"

export async function POST({
    request
}) {
    const data = await request.json()

    const {
        cartId,
        lineId
    } = data

    try {
        const shopifyResponse = await removeItemFromCart({
            cartId,
            lineId
        });

        return {
            statusCode: 200,
            body: JSON.stringify(shopifyResponse.cartLinesRemove.cart)
        }

    } catch (e) {
        console.log('----------------');
        console.log('There was an error removing-item-from-cart');
        console.log('----------------');
        console.log(e);
    }

}