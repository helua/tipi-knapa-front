const sanityClient = require("@sanity/client");
const imageUrlBuilder = require("@sanity/image-url");
const blocksToHtml = require("@sanity/block-content-to-html");

const sanity = sanityClient({
  projectId: 'reekcfrj',
  dataset: 'production',
  // apiVersion: '2021-09-10',
  // token: 'skD2pTXl7x5uHLffvjXTWL6L5E978LrKStSEncucVl6kHCbo1JXFgnGq8Anzo0R2b13hogIuUSzaFVMu1ApMVJQdpv4878h58YByTBoYYXAxap8N4V1xa2bobHc65EdBISvAHfahQvoVM17aS7baIwBd6VM79ZSx9aUn8f73GkniVd95z19X',
  useCdn: true,
});



// const sanity = sanityClient({
//   projectId: process.env.SANITY_PROJECT_ID,
//   dataset: process.env.SANITY_DATASET,
//   useCdn: true,
// });

exports.handler = async () => {
  const query = '*[_type=="product"]{title, slug, sku, weight, defaultProductVariant, tags, "categoryTitles": categories[]->title, "vendor": vendor->title, body}'
  const products = await sanity.fetch(query).then((results) => {
    const allProducts = results.map((product) => {
      const output = {
        title: product.title,
        slug: product.slug.current,
        url: `${process.env.URL}/.netlify/functions/getproducts`,
        categories: product.categoryTitles,
        vendor: product.vendor,
        body: blocksToHtml({ blocks: product.body }),
        images: [],
        sku: product.defaultProductVariant.sku,
        weight: product.defaultProductVariant.grams
      };


      for (let i = 0; i < product.defaultProductVariant.images.length; i++){

        const image =
        product.defaultProductVariant.images &&
        product.defaultProductVariant.images.length > 0
          ? product.defaultProductVariant.images[i].asset._ref
          : null;

        if (image) {
          output.images[i] = imageUrlBuilder(sanity).image(image).url();
        }
      }
      return output;
    });

    return allProducts;
  });

  return {
    statusCode: 200,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(products),
  };
};
