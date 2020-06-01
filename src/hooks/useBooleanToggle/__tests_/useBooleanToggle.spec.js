import { renderHook, act } from 'react-hooks-testing-library';

import useBooleanToggle from '../index';

describe('useBooleanToggle hook', () => {
  it('should handle toggling', () => {
    const { result } = renderHook(() => useBooleanToggle(false));

    act(() => result.current.handleStatusChange());

    expect(result.current.status).toEqual(true);

    act(() => result.current.handleStatusChange());

    expect(result.current.status).toEqual(false);
  });
});
