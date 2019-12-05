interface Dictionary<T> {
  [key: string]: T
}

export interface Post {
  title: string
  description: string
  body: string
}

export interface Param {
  slug: string
  date: string
  category: string
}

export interface PostsDate {
  date: string
  count: string
}

export interface Category {
  id: string
  name: string
  slug: string
  count: string
}
