import { loginMockData, registerMockData, userMockData } from '../mockData';
import {
  registerUser,
  reducer,
  loginUser,
  updateUser,
  logoutUser,
  getUserData,
  checkUserAuth,
  initialState,
  initialStates
} from './userProfileSlice';
describe('тесты регистрации пользователя', () => {

  test('успешная регистрация пользователя', () => {
    const newState = reducer(
      initialStates,
      registerUser.fulfilled(userMockData, 'fulfilled', registerMockData)
    );
    expect(newState.user).toEqual(userMockData);
    expect(newState.isAuthChecked).toBe(true);
    expect(newState.loading).toBe(false);
    expect(newState.error).toBe(null);
  });
  test('проверка статуса загрузки при регистрации пользователя', () => {
    const newState = reducer(
      initialStates,
      registerUser.pending('pending', registerMockData)
    );
    expect(newState.user).toEqual(initialStates.user);
    expect(newState.isAuthChecked).toBe(false);
    expect(newState.loading).toBe(true);
    expect(newState.error).toBe(null);
  });
  test('проверка ошибки при регистрации пользователя', () => {
    const newState = reducer(
      initialStates,
      registerUser.rejected(new Error('rejected'), 'rejected', registerMockData)
    );
    expect(newState.user).toEqual(initialStates.user);
    expect(newState.isAuthChecked).toBe(false);
    expect(newState.loading).toBe(false);
    expect(newState.error).toBe(newState.error);
  });
});

describe('тесты входа пользователя в профиль', () => {

  test('успешный вход пользователя', () => {
    const newState = reducer(
      initialStates,
      loginUser.fulfilled(userMockData, 'fulfilled', loginMockData)
    );
    expect(newState.user).toEqual(userMockData);
    expect(newState.isAuthChecked).toBe(true);
    expect(newState.loading).toBe(false);
    expect(newState.error).toBe(null);
  });
  test('проверка статуса загрузки при входе в личный кабинет пользователя', () => {
    const newState = reducer(
      initialStates,
      loginUser.pending('pending', loginMockData)
    );
    expect(newState.user).toEqual(initialStates.user);
    expect(newState.isAuthChecked).toBe(false);
    expect(newState.loading).toBe(true);
    expect(newState.error).toBe(null);
  });
  test('проверка ошибки при входе в личный кабинет пользователя', () => {
    const newState = reducer(
      initialStates,
      loginUser.rejected(new Error('rejected'), 'rejected', loginMockData)
    );
    expect(newState.user).toEqual(initialStates.user);
    expect(newState.isAuthChecked).toBe(false);
    expect(newState.loading).toBe(false);
    expect(newState.error).toBe(newState.error);
  });
});

describe('тесты обновления данных пользователя', () => {

  test('успешное обновлениe данных', () => {
    const action = {
      type: updateUser.fulfilled.type,
      payload: userMockData,
      meta: {
        requestId: '123',
        arg: null,
        requestStatus: 'fulfilled'
      }
    };
    const newState = reducer(initialState, action);
    expect(newState.user).toEqual(userMockData);
    expect(newState.isAuthChecked).toBe(true);
    expect(newState.loading).toBe(false);
    expect(newState.error).toBe(null);
  });

  test('проверка статуса загрузки при обновлении данных', () => {
    const newState = reducer(
      initialState,
      updateUser.pending('pending', userMockData)
    );
    expect(newState.user).toEqual(initialState.user);
    expect(newState.isAuthChecked).toBe(true);
    expect(newState.loading).toBe(true);
    expect(newState.error).toBe(null);
  });

  test('проверка ошибки при обновлении данных', () => {
    const error = new Error('Ошибка');
    const newState = reducer(
      initialState,
      updateUser.rejected(error, 'rejected', userMockData)
    );
    expect(newState.user).toEqual(initialState.user);
    expect(newState.isAuthChecked).toBe(true);
    expect(newState.loading).toBe(false);
    expect(newState.error).toBe(error.message);
  });
});

describe('тесты выхода из личного кабинета пользователя', () => {

  test('успешный выход', () => {
    const action = {
      type: logoutUser.fulfilled.type,
      payload: userMockData,
      meta: {
        requestId: '123',
        arg: null,
        requestStatus: 'fulfilled'
      }
    };
    const newState = reducer(initialState, action);
    expect(newState.user).toEqual({ name: '', email: '' });
    expect(newState.isAuthChecked).toBe(false);
    expect(newState.loading).toBe(false);
    expect(newState.error).toBe(null);
  });
  test('проверка статуса загрузки при выходе из личного кабинета', () => {
    const newState = reducer(initialState, logoutUser.pending('pending'));
    expect(newState.user).toEqual(initialState.user);
    expect(newState.isAuthChecked).toBe(true);
    expect(newState.loading).toBe(true);
    expect(newState.error).toBe(null);
  });
  test('проверка ошибки при выходе из личного кабинета', () => {
    const error = new Error('Ошибка');
    const newState = reducer(
      initialState,
      logoutUser.rejected(error, 'rejected')
    );
    expect(newState.user).toEqual(initialState.user);
    expect(newState.isAuthChecked).toBe(true);
    expect(newState.loading).toBe(false);
    expect(newState.error).toBe(error.message);
  });
});
describe('тесты получения данных пользователя', () => {

  const userMockData = {
    name: 'Some name',
    email: 'some@email.ru'
  };
  test('успешное получение данных', () => {
    const action = {
      type: getUserData.fulfilled.type,
      payload: { user: userMockData },
      meta: {
        requestId: '123',
        arg: null,
        requestStatus: 'fulfilled'
      }
    };
    const newState = reducer(initialState, action);
    expect(newState.user).toEqual(userMockData);
    expect(newState.isAuthChecked).toBe(true);
    expect(newState.loading).toBe(false);
    expect(newState.error).toBe(null);
  });
  test('проверка статуса загрузки при получении данных', () => {
    const newState = reducer(initialState, getUserData.pending('pending'));
    expect(newState.user).toEqual(initialState.user);
    expect(newState.isAuthChecked).toBe(true);
    expect(newState.loading).toBe(true);
    expect(newState.error).toBe(null);
  });
  test('проверка ошибки при получении данных', () => {
    const error = new Error('rejected');
    const newState = reducer(
      initialState,
      getUserData.rejected(error, 'rejected')
    );
    expect(newState.isAuthChecked).toBe(false);
    expect(newState.loading).toBe(false);
  });
});
describe('тесты авторизации пользователя', () => {

  test('успешная проверка авторизации', () => {
    const action = { type: checkUserAuth.fulfilled.type };
    const newState = reducer(initialState, action);
    expect(newState.isAuthChecked).toBe(true);
    expect(newState.loading).toBe(false);
    expect(newState.error).toBeNull();
  });
  test('проверка статуса загрузки при запросе авторизации', () => {
    const action = { type: checkUserAuth.pending.type };
    const newState = reducer(initialState, action);
    expect(newState.user).toEqual(initialState.user);
    expect(newState.isAuthChecked).toBe(true);
    expect(newState.loading).toBe(true);
    expect(newState.error).toBe(null);
  });
  test('проверка ошибки при запросе авторизации', () => {
    const action = { type: checkUserAuth.rejected.type };
    const newState = reducer(initialState, action);
    expect(newState.loading).toBe(false);
    expect(newState.error).toBe('Необходима авторизация');
  });
});
