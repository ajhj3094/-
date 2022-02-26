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
    type: Boolean,
    default: false
  },
  category: {
    type: String,
    enum: {
      values: ['登山健行', '滑雪', '外套', '露營'],
      message: '商品分類不存在'
    }
  },
  gender: {
    type: String,
    enum: {
      values: ['通用', '女性', '男性'],
      message: '使用性別不存在'
    }
  },
  review: {
    type: [
      {
        user: {
          type: String,
          ref: 'users',
          required: [true, '缺少使用者名稱']
        },
        rating: {
          type: Number,
          required: [true, '缺少評分']
        },
        text: {
          type: String,
          required: [true, '缺少評論內容']
        },
        date: {
          type: Date,
          default: Date.now
        }
      }
    ]
  }
}, { versionKey: false })

export default mongoose.model('products', productSchema)
