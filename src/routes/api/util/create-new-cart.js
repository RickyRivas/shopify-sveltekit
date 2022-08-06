import {
    postToShopify
} from "../postToShopify";

export async function POST({}) {
    const shopifyResponse = await postToShopify({
        query: `  mutation CreateCart {
        cartCreate {
          cart {
            checkoutUrl
            id
          }
        }
      }
    `,
        variables: {}
    })

    // Error Handling
    if (!shopifyResponse) {
        return {
            statusCode: 500,
            body: JSON.stringify({
                message: 'There was a problem creating a new cart.'
            })
        }
    }

    return {
        statusCode: 200,
        body: JSON.stringify({
            shopifyResponse
        })

    }
}