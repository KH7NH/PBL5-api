
/* eslint-disable no-useless-catch */
import { slugify } from '~/utils/formatters'
import { boardModel } from '~/models/boardModel'
import ApiError from '~/utils/ApiError'
import { StatusCodes } from 'http-status-codes'
import { cloneDeep } from 'lodash'
const createNew = async(reqBody) => {
  try {
    // Xử lý logic dữ liệu
    const newBoard = {
      ...reqBody,
      slug: slugify(reqBody.title)
    }
    // Gọi tới tầng Model để xử lý bản ghi newBoard vào trong Database
    const createdBoard = await boardModel.createNew(newBoard)
    console.log(createdBoard)
    // Lấy bản ghi board sau khi gọi
    const getNewBoard = await boardModel.findOneById(createdBoard.insertedId)
    console.log(getNewBoard)
    // Trả kết quả về, trong Service luôn phải có return
    return getNewBoard
  } catch (error) { throw error }
}

const getDetails = async(boardId) => {
  try {
    const board = await boardModel.getDetails(boardId)
    if (!board) {
      throw new ApiError(StatusCodes.NOT_FOUND, 'Board not found!')
    }
    //B1 Deep Clone board ra một cái mới để xử lý, không ảnh hưởng tới board ban đầu, tùy mục đích về sau mà có cần clone deep hay không.
    const resBoard = cloneDeep(board)
    //B2 Đưa card về đúng column của nó
    resBoard.columns.forEach(column => {
      // Cách dùng .equals này là bởi vì chúng ta hiểu ObjectId trong MongoDB có support method .equals
      column.cards = resBoard.cards.filter(card => card.columnId.equals(column._id))

      // // Cách khác đơn giản là convert ObjectId về string bằng hàm toString() của JavaScript
      // column.cards = resBoard.cards.filter(card => card.columnId.toString() === column._id.toString())
    })
    //B3 Xóa mảng card khỏi board ban đầu
    delete resBoard.cards
    return resBoard
  } catch (error) { throw error }
}
export const boardService = {
  createNew,
  getDetails
}