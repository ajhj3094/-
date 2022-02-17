import mongoose from 'mongoose'

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, '商品名不能為空']
  },
  price: {
    type: Number,
    min: [0, '價格格式不正確'],
    required: [true, '商品價格不能為空']
  },
  description: {
    type: String
  },
  image: {
    type: String
  },
  sell: {
    Boolean,
    default: false
  },
  category: {
    type: String,
    enum: {
      values: ['登山健行', '滑雪', '外套', '男生', '女生'],
      message: '商品分類不存在'
    }
  }
}, { versionKey: false })

export default mongoose.model('products', productSchema)
