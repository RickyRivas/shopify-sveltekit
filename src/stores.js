import {
    writable
} from "svelte/store";
import {
    postToShopify
} from './routes/api/postToShopify';

export const products = writable([])
export const productDetails = writable([])

export const cartCount = writable(0)
export const getProductDetails = async (handle) => {
    // get product details when entering [handle].svelte
    try {
        const shopifyResponse = await postToShopify({
            query: `
                query getProduct($handle: String!){
                    productByHandle(handle: $handle) {
                        id
                        handle
                        description
                        title
                        totalInventory
                        variants(first: 5){
                            edges {
                                node {
                                    id
                                    title
                                    quantityAvailable
                                    priceV2{
                                        amount
                                        currencyCode
                                    }
                                }
                            }
                        }
                        priceRange{
                            maxVariantPrice {
                                amount
                                currencyCode
                            }
                            minVariantPrice {
                                amount
                                currencyCode
                            }
                        }
                        images(first:1) {
                            edges {
                                node {
                                    src
                                    altText
                                }
                            }
                        }
                    }
                }
            `,
            variables: {
                handle: handle
            }
        })

        productDetails.set(shopifyResponse.productByHandle);
        return shopifyResponse.productByHandle;
    } catch (error) {
        console.log(error)
    }
}

// fetch all products  
export const getProducts = async () => {
    try {
        const shopifyResponse = await postToShopify({
            query: `{
            products(sortKey: TITLE, first: 100) {
            edges {
                node {
                id
                handle
                description
                title
                totalInventory
                productType
                variants(first: 5) {
                    edges {
                    node {
                        id
                        title
                        quantityAvailable
                        price
                    }
                    }
                }
                priceRange {
                    maxVariantPrice {
                    amount
                    currencyCode
                    }
                    minVariantPrice {
                    amount
                    currencyCode
                    }
                }
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
      `
        });
        return shopifyResponse;
    } catch (error) {
        console.log(error, ';<')
    }
}