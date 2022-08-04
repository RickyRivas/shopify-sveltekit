import {
  postToShopify
} from '../postToShopify';


export async function createCartWithItem({
  itemId,
  quantity
}) {
  try {
    const response = await postToShopify({
      query: `
        mutation createCart($cartInput: CartInput) {
          cartCreate(input: $cartInput) {
            cart {
              id
              createdAt
              updatedAt
              checkoutUrl
              lines(first:10) {
                edges {
                  node {
                    id
                    quantity
                    merchandise {
                      ... on ProductVariant {
                        id
                        title
                        priceV2 {
                          amount
                          currencyCode
                        }
                        product {
                          id
                          title
                          images(first: 1) {
                            edges {
                              node {
                                src
                                altText
                              }
                            }
                          }
                        }
                        
                      }
                    }
                  }
                }
              }
              estimatedCost {
                totalAmount {
                  amount
                  currencyCode
                }
                subtotalAmount {
                  amount
                  currencyCode
                }
                totalTaxAmount {
                  amount
                  currencyCode
                }
                totalDutyAmount {
                  amount
                  currencyCode
                }
              }
            }
          }
        }
      `,
      variables: {
        cartInput: {
          lines: [{
            quantity,
            merchandiseId: itemId
          }]
        }
      }
    })
    return response
  } catch (e) {
    console.log(e)
  }
}