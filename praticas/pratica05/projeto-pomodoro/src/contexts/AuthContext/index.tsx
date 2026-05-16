import {
  createContext,
  useContext,
  useReducer,
  ReactNode,
} from 'react';

interface AuthState {
  isAuthenticated: boolean;
}

type AuthAction =
  | { type: 'LOGIN' }
  | { type: 'LOGOUT' };

const initialState: AuthState = {
  isAuthenticated: false,
};

function authReducer(
  state: AuthState,
  action: AuthAction,
) {
  switch (action.type) {
    case 'LOGIN':
      return {
        ...state,
        isAuthenticated: true,
      };

    case 'LOGOUT':
      return {
        ...state,
        isAuthenticated: false,
      };

    default:
      return state;
  }
}

interface AuthContextType {
  state: AuthState;
  dispatch: React.Dispatch<AuthAction>;
}

const AuthContext = createContext(
  {} as AuthContextType,
);

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({
  children,
}: AuthProviderProps) {
  const [state, dispatch] = useReducer(
    authReducer,
    initialState,
  );

  return (
    <AuthContext.Provider
      value={{ state, dispatch }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}