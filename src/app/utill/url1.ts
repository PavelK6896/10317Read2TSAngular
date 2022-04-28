import { environment } from "../../environments/environment.prod";

const read1 = environment.URL + '/api/read1'

export const url1 = {

  getAllSubreddits: read1 + '/api/subreddit',
  getSubredditsId: read1 + '/api/subreddit',
  createSubreddit: read1 + '/api/subreddit',
  vote: read1 + '/api/votes',
  getAllPosts: read1 + '/api/posts',
  createPost: read1 + '/api/posts',
  getPostById: read1 + '/api/posts/',
  getAllPostsByUser: read1 + '/api/posts/by-user/',
  getAllPostsBySub: read1 + '/api/posts/by-subreddit/',
  postComment: read1 + '/api/comments',
  getAllCommentsForPost: read1 + '/api/comments/by-post/',
  getAllCommentsByUser: read1 + '/api/comments/by-user/',
  signUp: read1 + '/api/auth/signUp',
  login: read1 + '/api/auth/login',
  refreshToken: read1 + '/api/auth/refresh/token',
  logout: read1 + '/api/auth/logout',

}
