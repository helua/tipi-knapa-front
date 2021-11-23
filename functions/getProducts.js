const sanityClient = require("@sanity/client");
const imageUrlBuilder = require("@sanity/image-url");
const blocksToHtml = require("@sanity/block-content-to-html");



exports.handler = async () => {
  const query = '*[_type=="product"]{title, slug, sku, weight, totalLength, bladeLength, bladeWidth, steelThickness, defaultProductVariant, tags, "categoryTitles": categories[]->title, "vendor": vendor->title, body}'
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
        weight: product.defaultProductVariant.grams,
        length: product.defaultProductVariant.length,
        bladeLength: product.defaultProductVariant.bladeLength,
        bladeWidth: product.defaultProductVariant.bladeWidth,
        steelThickness: product.defaultProductVariant.steelThickness
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
}
