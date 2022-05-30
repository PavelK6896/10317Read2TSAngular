export interface SignupRequestPayload {
  username: string;
  password: string;
  email: string;
}

export interface LoginResponse {
  authenticationToken: string;
  refreshToken: string;
  expiresAt: Date;
  username: string;
}

export interface LoginRequestPayload {
  username: string;
  password: string;
}

export interface Page {
  totalPages: number
  totalElements: number
  first: boolean
  last: boolean
  number: number
  numberOfElements: number
  size: number
}


export interface PostResponseDto {
  id: number
  postName: string
  description: string
  userName: string
  subReadName: string
  subReadId: number
  voteCount: number
  commentCount: number
  duration: string
  vote: string
}

export interface PagePostResponseDto extends Page {
  content: PostResponseDto[]
}

export interface SubReadDto {
  id: number;
  name: string;
  description: string;
  numberOfPosts: number;
}

export interface PageSubReadDto extends Page {
  content: SubReadDto[]
}


export interface VoteDto {
  voteType: VoteType | undefined
  postId: number | undefined
}

export enum VoteType {
  UP_VOTE = 'UP_VOTE',
  DOWN_VOTE = 'DOWN_VOTE'
}

