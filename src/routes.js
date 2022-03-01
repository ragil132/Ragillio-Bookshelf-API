const {
  addBookHandler, getAllBooksHandler,
  getBookByIdHandler, editBookByIdHandler, deleteBookByIdHandler,
} = require('./handler');

const Joi = require('joi')

const routes = [
  {
    method: 'GET',
    path: '/',
    handler: (req, res) => {
      return res.redirect('/documentation').permanent()
    }
  },
  {
    method: 'POST',
    path: '/books',
    options: {
      handler: addBookHandler,
      description: 'Add Book Data',
      tags: ['api'],
      notes: ['Add Book Data'],
      response: {
        status: {
          201: Joi.object({
            status: Joi.string().example('success'),
            message: Joi.string().example('Buku berhasil ditambahkan'),
            data: Joi.object({
              bookId: Joi.string().example('1L7ZtDUFeGs7VlEt')
            })
          }),
          400: Joi.object({
            status: Joi.string().example('fail'),
            message: Joi.string().example('Gagal menambahkan buku. Mohon isi nama buku')
          }),
          500: Joi.object({
            status: Joi.string().example('error'),
            message: Joi.string().example('Buku gagal ditambahkan')
          })
        }
      },
      validate: {
        payload: Joi.object({
          name: Joi.string().example('Laskar Pelangi'),
          year: Joi.number().example(2008),
          author: Joi.string().example('Andrea Hirata'),
          summary: Joi.string().example('Sebuah cerita...'),
          publisher: Joi.string().example('Gramedia'),
          pageCount: Joi.number().example(100).min(0),
          readPage: Joi.number().example(25).min(0),
          reading: Joi.boolean().example(true)
        })
      }
    }
  },
  {
    method: 'GET',
    path: '/books',
    options: {
      handler: getAllBooksHandler,
      description: 'Get All Books',
      tags: ['api'],
      notes: ['Get a List of Books'],
      response: {
        status: {
          200: Joi.object({
            status: Joi.string().example('success'),
            data: Joi.object({
              books: Joi.array()
                .items({
                  id: Joi.string().example('Uakgb_J5m9g-0JDMbcJqL'),
                  name: Joi.string().example('Laskar Pelangi'),
                  publisher: Joi.string().example('Gramedia')
                })
            }),
          })
        }
      },
      validate: {
        query: Joi.object({
          name: Joi.string(),
          reading: Joi.number().min(0).max(1),
          finished: Joi.number().min(0).max(1)
        })
      }
    }
  },
  {
    method: 'GET',
    path: '/books/{bookId}',
    options: {
      handler: getBookByIdHandler,
      description: 'Get Book Details',
      tags: ['api'],
      notes: ['Get Book Details by Id'],
      response: {
        status: {
          200: Joi.object({
            status: Joi.string().example('success'),
            data: Joi.object({
              book: Joi.object({
                id: Joi.string().example('aWZBUW3JN_VBE-9I'),
                name: Joi.string().example('5 CM'),
                year: Joi.number().example(2010),
                author: Joi.string().example('Dan Brown'),
                summary: Joi.string().example('Lorem...'),
                publisher: Joi.string().example('Gramedia'),
                pageCount: Joi.number().example(200),
                readPage: Joi.number().example(25),
                finished: Joi.boolean().example(false),
                reading: Joi.boolean().example(false),
                insertedAt: Joi.string().example('2021-03-05T06:14:30.718Z'),
                updatedAt: Joi.string().example('2021-03-05T06:14:30.718Z'),
              })
            })
          }),
          404: Joi.object({
            status: Joi.string().example('fail'),
            message: Joi.string().example('Buku tidak ditemukan')
          })
        }
      },
      validate: {
        params: Joi.object({
          bookId: Joi.string().example('aWZBUW3JN_VBE-9I')
        })
      }
    }
  },
  {
    method: 'PUT',
    path: '/books/{bookId}',
    options: {
      handler: editBookByIdHandler,
      description: "Update Book Data",
      tags: ['api'],
      notes: ['Update Book Data'],
      response: {
        status: {
          200: Joi.object({
            status: Joi.string().example('success'),
            message: Joi.string().example('Buku berhasil diperbarui')
          }),
          404: Joi.object({
            status: Joi.string().example('fail'),
            message: Joi.string().example('Gagal memperbarui buku. Id tidak ditemukan')
          }),
          400: Joi.object({
            status: Joi.string().example('fail'),
            message: Joi.string().example('Gagal memperbarui buku. Mohon isi nama buku')
          })
        }
      },
      validate: {
        params: Joi.object({
          bookId: Joi.string().example('aWZBUW3JN_VBE-9I')
        }),
        payload: Joi.object({
          name: Joi.string().example('Laskar Pelangi'),
          year: Joi.number().example(2008),
          author: Joi.string().example('Andrea Hirata'),
          summary: Joi.string().example('Sebuah cerita...'),
          publisher: Joi.string().example('Gramedia'),
          pageCount: Joi.number().example(100).min(0),
          readPage: Joi.number().example(25).min(0),
          reading: Joi.boolean().example(true)
        })
      }
    }
  },
  {
    method: 'DELETE',
    path: '/books/{bookId}',
    options: {
      handler: deleteBookByIdHandler,
      description: 'Delete Book',
      tags: ['api'],
      notes: ['Delete Book Data'],
      response: {
        status: {
          200: Joi.object({
            status: Joi.string().example('success'),
            message: Joi.string().example('Buku  berhasil dihapus')
          }),
          404: Joi.object({
            status: Joi.string().example('fail'),
            message: Joi.string().example('Buku gagal dihapus. Id tidak ditemukan')
          })
        }
      },
      validate: {
        params: Joi.object({
          bookId: Joi.string().example('aWZBUW3JN_VBE-9I')
        })
      }
    }
  },
];

module.exports = routes;
