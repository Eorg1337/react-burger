import { login, logout, userRegister, forgotPass, resetPass } from './reducer';
const emailValue = 'test@example.com';

test('login', async () => {
  const thunk = login({ emailValue, passwordValue });
  const dispatchMock = jest.fn();
  const getStateMock = jest.fn();
  
  await thunk(dispatchMock, getStateMock, {});
  
  expect(dispatchMock).toHaveBeenCalledTimes(3); 
});

test('logout', async () => {
  const thunk = logout();
  const dispatchMock = jest.fn();
  const getStateMock = jest.fn();
  
  await thunk(dispatchMock, getStateMock, {});
  
  expect(dispatchMock).toHaveBeenCalledTimes(3); 
});

test('userRegister', async () => {
  const thunk = userRegister({ emailValue, passwordValue, value });
  const dispatchMock = jest.fn();
  const getStateMock = jest.fn();

  await thunk(dispatchMock, getStateMock, {});
  
  expect(dispatchMock).toHaveBeenCalledTimes(3);
});

test('forgotPass', async () => {
  const thunk = forgotPass({ emailValue });
  const dispatchMock = jest.fn();
  const getStateMock = jest.fn();
  
  await thunk(dispatchMock, getStateMock, {});
  
  expect(dispatchMock).toHaveBeenCalledTimes(3); 
});

test('resetPass', async () => {
  const thunk = resetPass({ passwordValue, value });
  const dispatchMock = jest.fn();
  const getStateMock = jest.fn();
  
  await thunk(dispatchMock, getStateMock, {});
  
  expect(dispatchMock).toHaveBeenCalledTimes(3); 
});

test('getUserInfo', async () => {
  const thunk = getUserInfo();
  const dispatchMock = jest.fn();
  const getStateMock = jest.fn();
  
  await thunk(dispatchMock, getStateMock, {});
  
  expect(dispatchMock).toHaveBeenCalledTimes(3); 
});

const loginValue = 'newLogin';
const nameValue = 'newName';
const passwordValue = 'newPassword';

test('refreshUserInfo', async () => {
  const thunk = refreshUserInfo({ loginValue, nameValue, passwordValue });
  const dispatchMock = jest.fn();
  const getStateMock = jest.fn();
  
  await thunk(dispatchMock, getStateMock, {});
  
  expect(dispatchMock).toHaveBeenCalledTimes(3); 
});

describe('userSlice', () => {
  describe('login', () => {
    it('should set isLoading to true when login is pending', () => {
      const nextState = userSlice.reducer(initialState, login.pending());
      expect(nextState.isLoading).toBe(true);
    });

    it('should set user, success, and isLoading when login is fulfilled', () => {
      const payload = { user: { email: 'test@example.com', name: 'Test User' } };
      const nextState = userSlice.reducer(initialState, login.fulfilled(payload));
      expect(nextState.user).toEqual(payload.user);
      expect(nextState.success).toBe(true);
      expect(nextState.isLoading).toBe(false);
    });

    it('should set success and message when login is rejected', () => {
      const error = { message: 'Login failed' };
      const nextState = userSlice.reducer(initialState, login.rejected({ error }));
      expect(nextState.success).toBe(false);
      expect(nextState.message).toBe(error.message);
    });
  });
  describe('logout', () => {
    it('should set success and user to initial state when logout is pending', () => {
      const nextState = userSlice.reducer(initialState, logout.pending());
      expect(nextState.success).toBe(false);
      expect(nextState.user).toEqual(initialState.user);
    });

    it('should set success and user to initial state when logout is fulfilled', () => {
      const nextState = userSlice.reducer(initialState, logout.fulfilled());
      expect(nextState.success).toBe(true);
      expect(nextState.user).toEqual(initialState.user);
    });

    it('should not modify state when logout is rejected', () => {
      const prevState = { ...initialState, success: true, user: { email: 'test@example.com', name: 'Test User' } };
      const nextState = userSlice.reducer(prevState, logout.rejected());
      expect(nextState).toEqual(prevState);
    });
});

describe('userRegister', () => {
    it('should set isLoading to true when userRegister is pending', () => {
        const nextState = userSlice.reducer(initialState, userRegister.pending());
        expect(nextState.isLoading).toBe(true);
    });

    it('should set isLoading to false, user and success when userRegister is fulfilled and payload contains user', () => {
        const payload = { user: { email: 'test@example.com', name: 'Test User' } };
        const nextState = userSlice.reducer(initialState, userRegister.fulfilled(payload));
        expect(nextState.isLoading).toBe(false);
        expect(nextState.user).toEqual(payload.user);
        expect(nextState.success).toBe(true);
    });

    it('should set message when userRegister is rejected', () => {
        const error = { message: 'User registration failed' };
        const nextState = userSlice.reducer(initialState, userRegister.rejected({ error }));
        expect(nextState.message).toBe(error.message);
    });
});

describe('forgotPass', () => {
    it('should set isLoading to true when forgotPass is pending', () => {
        const nextState = userSlice.reducer(initialState, forgotPass.pending());
        expect(nextState.isLoading).toBe(true);
    });

    it('should set message and success when forgotPass is fulfilled', () => {
        const payload = { message: 'Password reset email sent' };
        const nextState = userSlice.reducer(initialState, forgotPass.fulfilled(payload));
        expect(nextState.message).toBe(payload.message);
        expect(nextState.success).toBe(true);
        expect(nextState.isLoading).toBe(false);
    });

    it('should set message when forgotPass is rejected', () => {
        const error = { message: 'Password reset failed' };
        const nextState = userSlice.reducer(initialState, forgotPass.rejected({ error }));
        expect(nextState.message).toBe(error.message);
    });
});

describe('resetPass', () => {
    it('should set isLoading to true when resetPass is pending', () => {
        const nextState = userSlice.reducer(initialState, resetPass.pending());
        expect(nextState.isLoading).toBe(true);
    });

    it('should set message and success when resetPass is fulfilled', () => {
        const payload = { message: 'Password reset successful' };
        const nextState = userSlice.reducer(initialState, resetPass.fulfilled(payload));
        expect(nextState.message).toBe(payload.message);
        expect(nextState.success).toBe(true);
        expect(nextState.isLoading).toBe(false);
    });

    it('should set message when resetPass is rejected', () => {
        const error = { message: 'Password reset failed' };
        const nextState = userSlice.reducer(initialState, resetPass.rejected({ error }));
        expect(nextState.message).toBe(error.message);
    });
});

describe('getUserInfo', () => {
    it('should set isLoading to true when getUserInfo is pending', () => {
        const nextState = userSlice.reducer(initialState, getUserInfo.pending());
        expect(nextState.isLoading).toBe(true);
    });
})
});