import { environment } from "../../environments/environment.prod";

const read2 = environment.URL + '/api/read2'

export const urlConfig = {

  getPageSubReadLikeStartsWith: read2 + '/sub-read/starts-with',
  getPageSubRead: read2 + '/sub-read',
  getSubReadById: read2 + '/sub-read',
  createSubRead: read2 + '/sub-read',
  vote: read2 + '/vote',
  getAllPosts: read2 + '/post',
  createPost: read2 + '/post',
  getPostById: read2 + '/post/',
  getPagePostByUsername: read2 + '/post/by-user/',
  getPagePostBySubReadId: read2 + '/post/by-sub-read/',
  createComment: read2 + '/comment',
  getSliceCommentsForPost: read2 + '/comment/by-post/',
  getSliceCommentsByUser: read2 + '/comment/by-user/',
  refreshToken: read2 + '/auth/refresh/token',
  signUp: read2 + '/auth/sign-up',
  login: read2 + '/auth/sign-in',
  logout: read2 + '/auth/sign-out',

}
