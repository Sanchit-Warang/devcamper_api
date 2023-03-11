const advancedResults = (model, populate) => async (req, res, next) => {
  let query
  //copy query
  const reqQuery = { ...req.query }

  //fields to exclude
  const removeFields = ['select', 'sort', 'page', 'limit']

  // Loop ovr them n deelte them
  removeFields.forEach((params) => delete reqQuery[params])

  // console.log(reqQuery)

  //crete query string
  let queryStr = JSON.stringify(reqQuery)
  //create operators like gte gt etc
  queryStr = queryStr.replace(/\b(gt|gte|lt|lte|in)\b/g, (match) => `$${match}`)
  //finding resourse
  query = model.find(JSON.parse(queryStr))

  //Select Fields
  if (req.query.select) {
    const fields = req.query.select.split(',').join(' ')
    query.select(fields)
  }

  //Sort
  if (req.query.sort) {
    const sortBy = req.query.sort.split(',').join(' ')
    query = query.sort(sortBy)
  } else {
    query = query.sort('-createdAt')
  }

  //Pagiination
  const page = parseInt(req.query.page, 10) || 1
  const limit = parseInt(req.query.limit, 10) || 100
  const startIndex = (page - 1) * limit
  const endIndex = page * limit
  const total = await model.countDocuments()

  query = query.skip(startIndex).limit(limit)

  if(populate){
    query = query.populate(populate)
  }

  //excituoin query
  const results = await query

  //Pagination Result
  const pagination = {}

  if (endIndex < total) {
    pagination.next = {
      page: page + 1,
      limit,
    }
  }
  if (startIndex > 0) {
    pagination.prev = {
      page: page - 1,
      limit,
    }
  }

  res.advancedResults = {
    success: true,
    count: results.length,
    pagination,
    data: results
  }
  next()
}

module.exports = advancedResults
