import { environment } from "../../environments/environment.prod";

const read2 = environment.URL + '/api/read2'

export const urlConfig = {

  getPageSubRead: read2 + '/sub-read',
  getSubReadById: read2 + '/sub-read',
  createSubRead: read2 + '/sub-read',
  vote: read2 + '/vote',
  getAllPosts: read2 + '/post',
  createPost: read2 + '/post',
  getPostById: read2 + '/post/',
  getAllPostsByUser: read2 + '/post/by-user/',
  getAllPostsBySub: read2 + '/post/by-sub-read/',
  postComment: read2 + '/comment',
  getAllCommentsForPost: read2 + '/comment/by-post/',
  getAllCommentsByUser: read2 + '/comment/by-user/',
  refreshToken: read2 + '/auth/refresh/token',
  signUp: read2 + '/auth/sign-up',
  login: read2 + '/auth/sign-in',
  logout: read2 + '/auth/sign-out',

}
