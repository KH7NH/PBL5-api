
import { columnModel } from '~/models/columnModel'
import { boardModel } from '~/models/boardModel'
import { cardModel } from '~/models/cardModel'
import { StatusCodes } from 'http-status-codes'
import ApiError from '~/utils/ApiError'
const createNew = async(reqBody) => {
  try {
    // Xử lý logic dữ liệu
    const newColumn = {
      ...reqBody
    }
    // Gọi tới tầng Model để xử lý bản ghi newBoard vào trong Database
    const createdColumn = await columnModel.createNew(newColumn)
    // Lấy bản ghi board sau khi gọi
    const getNewColumn = await columnModel.findOneById(createdColumn.insertedId)
    // Trả kết quả về, trong Service luôn phải có return

    if (getNewColumn) {
      // Xử lý cấu trúc data ở đây trước khi trả dữ liệu về
      getNewColumn.cards = []

      // Cập nhật lại mảng columnOrderIds trong collection board
      await boardModel.pushColumnOrderIds(getNewColumn)
    }

    return getNewColumn
  } catch (error) { throw error }
}

const update = async(columnId, reqBody) => {
  try {
    const updateData = {
      ...reqBody,
      updatedAt: Date.now()
    }
    const updatedColumn = await columnModel.update(columnId, updateData)

    return updatedColumn
  } catch (error) { throw error }
}

export const columnService = {
  createNew,
  update
}