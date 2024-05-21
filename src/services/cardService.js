
import { cardModel } from '~/models/cardModel'
import { columnModel } from '~/models/columnModel'
const createNew = async(reqBody) => {
  try {
    // Xử lý logic dữ liệu
    const newCard = {
      ...reqBody
    }
    // Gọi tới tầng Model để xử lý bản ghi newBoard vào trong Database
    const createdCard = await cardModel.createNew(newCard)
    // Lấy bản ghi board sau khi gọi
    const getNewCard = await cardModel.findOneById(createdCard.insertedId)
    // Trả kết quả về, trong Service luôn phải có return

    //
    if (getNewCard) {

      // Cập nhật lại mảng cardOrderIds trong collection column
      await columnModel.pushCardOrderIds(getNewCard)
    }

    return getNewCard
  } catch (error) { throw error }
}

export const cardService = {
  createNew
}