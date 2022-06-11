const Post = require('../models/Post')
const post = {}

post.get_detail = (slug) => {
   return new Promise((resolve, reject) => {
      Post.findOne({ slug: slug })
         .then((res) => {
            resolve(res)
         }).catch((err) => {
            reject(err)
         })
   })
}

post.get = (query, tags, index, limit) => {
   return new Promise((resolve, reject) => {
      /**
       * use regex with flag 'i' will pass casd-insensitive
       * this solution work but not efficient because its a none-rooted regular expression
       * so it will not use indexes event if they exist
       * in this case, regex is %string% so it still not a bad solution
       * 
       * better solution is save data with a normal version and a lowercase version 
       */
      Post.find({ title: new RegExp(query, 'i') })
         .limit(limit).skip(index)
         .then((res) => {
            if (tags && Array.isArray(tags)) {
               res = res.filter(item => item.tags.some(el => tags.indexOf(el) >= 0))
            }
            resolve(res)
         }).catch((err) => {
            reject(err)
         })
   })
}

post.get_tags = () => {
   return new Promise((resolve, reject) => {
      Post.find()
         .then(res => {
            res = res.map(e => e.tags)
            resolve(Array.from(new Set(res.flat())))
         })
         .catch(err => {
            reject(err)
         })
   })
}


post.insert = (post) => {
   return new Promise((resolve, reject) => {
      post.save()
         .then((res) => {
            resolve(res)
         }).catch((err) => {
            switch (err.code) {
               case 11000:
                  err.message = "Duplicate slug"
            }
            reject(err)
         })
   })
}

post.update = (slug, body) => {
   return new Promise((resolve, reject) => {
      Post.findOneAndUpdate({ slug: slug }, body)
         .then((res) => {
            resolve(res)
         }).catch((err) => {
            switch (err.code) {
               case 11000:
                  err.message = "Duplicate slug"
            }
            reject(err)
         })
   })
}

post.delete = (slug) => {
   return new Promise((resolve, reject) => {
      Post.findOneAndDelete({ slug: slug })
         .then((res) => {
            resolve(res)
         }).catch((err) => {
            reject(err)
         })
   })
}

module.exports = post