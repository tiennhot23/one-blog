const mongoose = require('mongoose')
const marked = require('marked')
const slugify = require('slugify')
const createDomPurify = require('dompurify')
const { JSDOM } = require('jsdom')
const dompurify = createDomPurify(new JSDOM().window)

const postSchema = mongoose.Schema({
   image: {
      type: String,
      required: true
   },
   title: {
      type: String,
      required: true
   },
   tags: {
      type: Array,
      required: true
   },
   markdown: {
      type: String,
      required: true
   },
   createdAt: {
      type: Number,
      default: new Date().getTime()
   },
   slug: {
      type: String,
      required: true,
      unique: true
   },
   sanitizedHtml: {
      type: String,
      required: true
   }
})

postSchema.pre('validate', function (next) {
   if (this.title) {
      try {
         this.slug = slugify(this.title, { lower: true, strict: true })
      } catch (e) {
         next(e)
         return
      }
   }

   if (this.markdown) {
      try {
         this.sanitizedHtml = dompurify.sanitize(marked.parse(this.markdown))
      } catch (e) {
         next(e)
         return
      }
   }

   next()
})

postSchema.pre('updateOne', function (next) {
   var title = this._update.title
   console.log(this._update)
   if (title) {
      try {
         this._update.slug = slugify(title, { lower: true, strict: true })
      } catch (e) {
         next(e)
         return
      }
   }

   this._update.createdAt = new Date().getTime()

   next()
})

module.exports = mongoose.model('post', postSchema)