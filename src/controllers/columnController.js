
/* eslint-disable no-console */
import { StatusCodes } from 'http-status-codes'
import { columnService } from '~/services/columnService'

const createNew = async (req, res, next) => {
  try {
    console.log('req.body: ', req.body) // log dữ liệu ra

    // Điều hướng dữ liệu sang tầng Service
    const createColumn = await columnService.createNew(req.body)
    // Có kết quả thì trả về phía Client
    res.status(StatusCodes.CREATED).json(createColumn)
  } catch (error) { next(error) }
}

const update = async (req, res, next) => {
  try {
    const columnId = req.params.id
    const updatedColumn = await columnService.update(columnId, req.body)
    // Có kết quả thì trả về phía Client
    res.status(StatusCodes.OK).json(updatedColumn)
  } catch (error) { next(error) }
}

export const columnController = {
  createNew,
  update
}