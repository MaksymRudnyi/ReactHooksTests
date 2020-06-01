import { renderHook, act } from 'react-hooks-testing-library';

import useRest from '../index';

jest.mock('../agent');

const fakeAgent = require('../agent');

describe('useRest hook', () => {
  let url;
  let data;

  it('should NOT make any GET calls if URL is not provided', () => {
    url = '';
    fakeAgent.default.get.mockResolvedValue({ body: 'getData' });
    renderHook(() => useRest(url, data));

    expect(fakeAgent.default.get).not.toHaveBeenCalled();
  });

  it('should make a GET call if LAZY loading is turned OFF', () => {
    url = 'url';
    fakeAgent.default.get.mockResolvedValue({ body: 'getData' });
    renderHook(() => useRest(url, data));

    expect(fakeAgent.default.get).toHaveBeenCalledWith({ url, config: {timeout: 1000} });
  });

  it('should make a GET call on every manual FETCH request', () => {
    url = 'doFetchUrl';
    fakeAgent.default.get.mockResolvedValue({ body: 'getData' });
    const { result: { current } } = renderHook(() => useRest(url, data));

    act(() => current.doFetch(url));

    expect(fakeAgent.default.get).toHaveBeenCalledWith({ url, config: { timeout: 1000 } });
  });

  it('should make a POST call on every manual SEND request', () => {
    url = 'doSendUrl';
    data = [ 'testData' ];
    fakeAgent.default.post.mockResolvedValue({ body: 'postData' });
    const { result: { current } } = renderHook(() => useRest(url, data));

    act(() => current.doSend(url));

    expect(fakeAgent.default.post).toHaveBeenCalledWith({ url, data: {}, config: { timeout: 1000 } });
  });
});
