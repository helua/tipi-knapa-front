export default {
  name: 'status',
  title: 'Status',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text',
    },
    {
      name: 'parents',
      title: 'Parent categories',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [{type: 'status'}],
        },
      ],
    },
  ],
}
