/**
 * Updated by trungquandev.com's author on August 17 2023
 * YouTube: https://youtube.com/@trungquandev
 * "A bit of fragrance clings to the hand that gives flowers!"
 */
/* eslint-disable no-console */
import { StatusCodes } from 'http-status-codes'
import { boardService } from '~/services/boardService'

const createNew = async (req, res, next) => {
  try {
    console.log('req.body: ', req.body) // log dữ liệu ra

    // Điều hướng dữ liệu sang tầng Service
    const createBoard = await boardService.createNew(req.body)
    // Có kết quả thì trả về phía Client
    res.status(StatusCodes.CREATED).json(createBoard)
  } catch (error) { next(error) }
}

const getDetails = async (req, res, next) => {
  try {
    const boardId = req.params.id
    // Điều hướng dữ liệu sang tầng Service
    const board = await boardService.getDetails(boardId)
    // Có kết quả thì trả về phía Client
    res.status(StatusCodes.OK).json(board)
  } catch (error) { next(error) }
}
const update = async (req, res, next) => {
  try {
    const boardId = req.params.id
    const updatedBoard = await boardService.update(boardId, req.body)
    // Có kết quả thì trả về phía Client
    res.status(StatusCodes.OK).json(updatedBoard)
  } catch (error) { next(error) }
}

const moveCardToDifferentColumn = async (req, res, next) => {
  try {
    const result = await boardService.moveCardToDifferentColumn(req.body)
    // Có kết quả thì trả về phía Client
    res.status(StatusCodes.OK).json(result)
  } catch (error) { next(error) }
}
export const boardController = {
  createNew,
  getDetails,
  update,
  moveCardToDifferentColumn
}