import { useCallback, useEffect, useReducer, useRef } from "react"

interface FetchState<T> {
  isLoading: boolean;
  data: T | null;
}

type FetchAction<T> = { type: 'FETCH_START' } | { type: 'FETCH_SUCCESS', payload: T }

const fetchReducer = <T>(state: FetchState<T>, action: FetchAction<T>): FetchState<T> => {
  switch (action.type) {
    case "FETCH_START":
      if (state.isLoading) return state;
      return { ...state, isLoading: true }
    case "FETCH_SUCCESS":
      if (state.data !== null && JSON.stringify(state.data) === JSON.stringify(action.payload)) {
        return { ...state, isLoading: false }
      }
      return { data: action.payload, isLoading: false }

    default:
      return state;
  }
}

interface useFetchProps<TResponse> {
  queryFn: () => Promise<TResponse>;
  isEnabled?: unknown,
  deps?: unknown[]
}

export const useFetch = <TResponse>({
  queryFn,
  isEnabled = true,
  deps = []
}: useFetchProps<TResponse>) => {

  const [state, dispatch] = useReducer(
    fetchReducer as React.Reducer<FetchState<TResponse>, FetchAction<TResponse>>,
    { isLoading: false, data: null }
  )

  const fnRef = useRef(queryFn);
  fnRef.current = queryFn;

  const runQuery = useCallback(async () => {
    dispatch({ type: 'FETCH_START' })
    const response = await fnRef.current();
    dispatch({ type: "FETCH_SUCCESS", payload: response })
  }, []);

  useEffect(() => {
    if (!isEnabled) return;

    let cancelled = false;
    async function run() {
      dispatch({ type: "FETCH_START" });
      try {
        const result = await fnRef.current();
        if (!cancelled) dispatch({ type: "FETCH_SUCCESS", payload: result });
      } catch {
        /* opcional: dispatch de erro */
      }
    }

    run();
    return () => {
      cancelled = true;
    };
  }, [isEnabled, ...deps]);

  return { data: state.data, isLoading: state.isLoading, runQuery };
}