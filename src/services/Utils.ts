import { IRequest } from './../helpers/interfaces';

const Utils = {
  //  Parse a url and break it into resource, id and verb
  parseRequestURL: (): IRequest => {
    const url = location.hash.slice(1).toLowerCase() || '/';
    const r = url.split('/');
    const request: IRequest = {
      resource: null,
      post: null,
      page: null,
    };
    request.resource = r[1];
    request.post = r[2];
    request.page = r[3];
    console.log(request)
    return request;
  },
};

export default Utils;
