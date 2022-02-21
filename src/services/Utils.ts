import { IRequest } from './../helpers/interfaces';

const Utils = {
  //  Parse a url and break it into resource, id and verb
  parseRequestURL: (): IRequest => {
    const url = location.hash.slice(1).toLowerCase() || '/';
    const r = url.split('/');
    const request: IRequest = {
      resource: null,
    };
    request.resource = r[1];
    return request;
  },
};

export default Utils;
