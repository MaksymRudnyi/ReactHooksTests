import axios from 'axios';

export default {
  get: ({ url, query = {}, config = {} }) => axios({
      ...config,
      method: 'get',
      url,
      data: query
    }),
  post: ({ url, data = {}, config = {} }) => axios({
    ...config,
    method: 'post',
    url,
    data,
  })
};
