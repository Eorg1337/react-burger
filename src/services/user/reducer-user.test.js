import { login, logout, userRegister, forgotPass, resetPass, initialState } from './reducer';
import userReducer from "./reducer";
import { getUserInfo, refreshUserInfo } from './reducer';
const emailValue = 'test@example.com';

test('login', async () => {
  const thunk = login({ emailValue, passwordValue });
  const dispatchMock = jest.fn();
  const getStateMock = jest.fn();
  
  await thunk(dispatchMock, getStateMock, {});
  
  expect(dispatchMock).toHaveBeenCalledTimes(2); 
});

test('logout', async () => {
  const thunk = logout();
  const dispatchMock = jest.fn();
  const getStateMock = jest.fn();
  
  await thunk(dispatchMock, getStateMock, {});
  
  expect(dispatchMock).toHaveBeenCalledTimes(2); 
});

test('userRegister', async () => {
  const thunk = userRegister({ emailValue, passwordValue });
  const dispatchMock = jest.fn();
  const getStateMock = jest.fn();

  await thunk(dispatchMock, getStateMock, {});
  
  expect(dispatchMock).toHaveBeenCalledTimes(2);
});

test('forgotPass', async () => {
  const thunk = forgotPass({ emailValue });
  const dispatchMock = jest.fn();
  const getStateMock = jest.fn();
  
  await thunk(dispatchMock, getStateMock, {});
  
  expect(dispatchMock).toHaveBeenCalledTimes(2); 
});

test('resetPass', async () => {
  const thunk = resetPass({ passwordValue });
  const dispatchMock = jest.fn();
  const getStateMock = jest.fn();
  
  await thunk(dispatchMock, getStateMock, {});
  
  expect(dispatchMock).toHaveBeenCalledTimes(2); 
});

test('getUserInfo', async () => {
  const thunk = getUserInfo();
  const dispatchMock = jest.fn();
  const getStateMock = jest.fn();
  
  await thunk(dispatchMock, getStateMock, {});
  
  expect(dispatchMock).toHaveBeenCalledTimes(2); 
});

const loginValue = 'newLogin';
const nameValue = 'newName';
const passwordValue = 'newPassword';

test('refreshUserInfo', async () => {
  const thunk = refreshUserInfo({ loginValue, nameValue, passwordValue });
  const dispatchMock = jest.fn();
  const getStateMock = jest.fn();
  
  await thunk(dispatchMock, getStateMock, {});
  
  expect(dispatchMock).toHaveBeenCalledTimes(2); 
});

describe('userSlice', () => {
  describe('login', () => {
    it('should set isLoading to true when login is pending', () => {
      const nextState = userReducer(initialState, login.pending());
      expect(nextState.isLoading).toBe(true);
    });

    it('should set user, success, and isLoading when login is fulfilled', () => {
      const payload = { user: { email: 'test@example.com', name: 'Test User' } };
      const nextState = userReducer(initialState, login.fulfilled(payload));
      expect(nextState.user).toEqual(payload.user);
      expect(nextState.success).toBe(true);
      expect(nextState.isLoading).toBe(false);
    });

    it('should set success and message when login is rejected', () => {
      const error = { message: undefined };
      const nextState = userReducer(initialState, login.rejected({ error }));
      expect(nextState.success).toBe(false);
      expect(nextState.message).toBe(error.message);
    });
  });
  describe('logout', () => {
    it('should set success and user to initial state when logout is pending', () => {
      const nextState = userReducer(initialState, logout.pending());
      expect(nextState.success).toBe(false);
      expect(nextState.user).toEqual(initialState.user);
    });

    it('should set success and user to initial state when logout is fulfilled', () => {
      const nextState = userReducer(initialState, logout.fulfilled());
      expect(nextState.success).toBe(true);
      expect(nextState.user).toEqual(initialState.user);
    });

    it('should not modify state when logout is rejected', () => {
      const prevState = { ...initialState, success: true, user: { email: 'test@example.com', name: 'Test User' } };
      const nextState = userReducer(prevState, logout.rejected());
      expect(nextState).toEqual(prevState);
    });
});

describe('userRegister', () => {
    it('should set isLoading to true when userRegister is pending', () => {
        const nextState = userReducer(initialState, userRegister.pending());
        expect(nextState.isLoading).toBe(true);
    });

    it('should set isLoading to false, user and success when userRegister is fulfilled and payload contains user', () => {
        const payload = { user: { email: 'test@example.com', name: 'Test User' } };
        const nextState = userReducer(initialState, userRegister.fulfilled(payload));
        expect(nextState.isLoading).toBe(false);
        expect(nextState.user).toEqual(payload.user);
        expect(nextState.success).toBe(true);
    });

    it('should set message when userRegister is rejected', () => {
        const error = { message: undefined };
        const nextState = userReducer(initialState, userRegister.rejected({ error }));
        expect(nextState.message).toBe(error.message);
    });
});

describe('forgotPass', () => {
    it('should set isLoading to true when forgotPass is pending', () => {
        const nextState = userReducer(initialState, forgotPass.pending());
        expect(nextState.isLoading).toBe(true);
    });

    it('should set message and success when forgotPass is fulfilled', () => {
        const payload = { message: 'Password reset email sent' };
        const nextState = userReducer(initialState, forgotPass.fulfilled(payload));
        expect(nextState.message).toBe(payload.message);
        expect(nextState.success).toBe(true);
        expect(nextState.isLoading).toBe(false);
    });

    it('should set message when forgotPass is rejected', () => {
        const error = { message: undefined };
        const nextState = userReducer(initialState, forgotPass.rejected({ error }));
        expect(nextState.message).toBe(error.message);
    });
});

describe('resetPass', () => {
    it('should set isLoading to true when resetPass is pending', () => {
        const nextState = userReducer(initialState, resetPass.pending());
        expect(nextState.isLoading).toBe(true);
    });

    it('should set message and success when resetPass is fulfilled', () => {
        const payload = { message: 'Password reset successful' };
        const nextState = userReducer(initialState, resetPass.fulfilled(payload));
        expect(nextState.message).toBe(payload.message);
        expect(nextState.success).toBe(true);
        expect(nextState.isLoading).toBe(false);
    });

    it('should set message when resetPass is rejected', () => {
        const error = { message: undefined };
        const nextState = userReducer(initialState, resetPass.rejected({ error }));
        expect(nextState.message).toBe(error.message);
    });
});

describe('getUserInfo', () => {
    it('should set isLoading to true when getUserInfo is pending', () => {
        const nextState = userReducer(initialState, getUserInfo.pending());
        expect(nextState.isLoading).toBe(true);
    });
})
});