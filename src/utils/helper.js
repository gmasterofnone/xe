import { fetchPosts } from './API';
import { gify } from './APIKeys'

const uuidv4 = require("uuid/v4");



export const getPosts = async() => {
  let postArray = [];
  for (let posts = 0; posts <=8; posts++) {
    const url = `https://api.giphy.com/v1/gifs/random?tag=cat&limit=8&api_key=${gify}`
    const gif = await fetchPosts(url);
    const post = {
      id: uuidv4(),
      gifID: gif.id,
      title: gif.title.toUpperCase().replace('GIF',''),
      gif: gif.images.fixed_width_downsampled.url.replace(/\\/g, "-")
    }
    postArray.push(post)
  }
  return postArray;
}

// 'https://api.giphy.com/v1/gifs/random?tag=cat&limit=8&api_key=F5DjCcWd5F1y00uc84lHNVHjAz5x9njX'