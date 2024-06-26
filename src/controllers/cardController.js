
/* eslint-disable no-console */
import { StatusCodes } from 'http-status-codes'
import { cardService } from '~/services/cardService'

const createNew = async (req, res, next) => {
  try {
    console.log('req.body: ', req.body) // log dữ liệu ra

    // Điều hướng dữ liệu sang tầng Service
    const createCard = await cardService.createNew(req.body)
    // Có kết quả thì trả về phía Client
    res.status(StatusCodes.CREATED).json(createCard)
  } catch (error) { next(error) }
}


export const cardController = {
  createNew
}