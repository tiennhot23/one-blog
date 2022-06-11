module.exports = {
   Article: {
      not_found: 'Article not found',
      missing_arr: 'BAD REQUEST: missing arr',
      stared: 'Article already stared by this user',
      not_stared: 'Article not stared by this user yet'
   },
   Tag: {
      add_tag: 'BAD REQUEST: please add at least one tag'
   },
   File: {
      not_exist: 'File not exist',
      choose_file: 'BAD REQUEST: please choose files'
   },
   User: {
      not_found: 'User not found',
      not_empty: 'BAD REQUEST: please fill required fields',
      incorrect_account: 'ERROR: username and password not correct',
      can_not_follow_user: 'Can not follow current user',
      can_not_unfollow_user: 'Can not unfollow current user',
   },
   Auth: {
      unauthorized: 'UNAUTHORIZED: You need login to do this action',
      forbidden: 'FORBIDDEN: You need permission to do this action'
   },
   Encypt: {
      password_required: 'Password required'
   }
}