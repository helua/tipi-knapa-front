export default {
  title: 'Product variant',
  name: 'productVariant',
  type: 'object',
  fields: [
    {
      title: 'Title',
      name: 'title',
      type: 'string',
    },
    {
      title: 'SKU',
      name: 'sku',
      type: 'string',
    },
    {
      title: 'Weight in grams',
      name: 'grams',
      type: 'number',
    },
    {
      title: 'Total lenght in mm',
      name: 'length',
      type: 'number',
    },
    {
      title: 'Blade length in mm',
      name: 'bladeLength',
      type: 'number',
    },
    {
      title: 'Blade width in mm',
      name: 'bladeWidth',
      type: 'number',
    },
    {
      title: 'Steel thickness in mm',
      name: 'steelThickness',
      type: 'string',
    },
    {
      title: 'Handle',
      name: 'handle',
      type: 'string',
    },
    {
      title: 'Blade',
      name: 'blade',
      type: 'string',
    },
    {
      title: 'Sheath',
      name: 'sheath',
      type: 'string',
    },
    {
      title: 'Taxable',
      name: 'taxable',
      type: 'boolean',
    },
    {
      name: 'images',
      title: 'Images',
      type: 'array',
      of: [
        {
          type: 'image',
          options: {
            hotspot: true,
          },
        },
      ],
    },
    {
      title: 'Bar code',
      name: 'barcode',
      type: 'barcode',
    },
  ],
}
