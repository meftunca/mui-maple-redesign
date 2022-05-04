import redaxios from "redaxios";
import createStore from "zustand";
/*

    - CRUD -> update delete create get getone
    - MultiParams ->  default, performers=burak vs
    - Status -> error,fetch,waiting

*/

interface APIControlRule {
  createEndPoint: string;
  readEndPoint: string;
  updateEndPoint: string;
  deleteEndPoint: string;
  isPagingEndpoint?: boolean;
  headers: Headers;
}
interface RequestAction {
  fetching: boolean;
  error: boolean;
  success: boolean;
  errorMessage?: string;
  statusCode?: number;
}

type anyObject = {
  [k: string]: number | null | undefined | anyObject | anyObject[] | boolean;
};

interface StoreType<T> {
  // Definitions
  currentParams: URLSearchParams;
  data: T[];
  statuses: {
    reading: RequestAction;
    deleting: RequestAction;
    updating: RequestAction;
    creating: RequestAction;
  };

  // Actions
  read(params?: URLSearchParams): Promise<void>;
  update(data: anyObject): Promise<void>;
  create(data: anyObject): Promise<void>;
  delete(params: URLSearchParams): Promise<void>;
}

const DEFAULT_REQUEST_ACTION: RequestAction = {
  fetching: false,
  error: false,
  success: false,
};

// redaxios.defaults.
// redaxios.defaults.headers["Access-Control-Allow-Headers"] =
//   "Content-Type, Accept Authorization, X-Company, X-API-Key-ID, X-API-Key-Type, X-API-Content-Signature";
// redaxios.defaults.headers["Access-Control-Allow-Methods"] =
//   "GET, POST, PUT, DELETE";
// redaxios.defaults.headers["Access-Control-Allow-Credentials"] = true;

const useApiStore = <Model extends Object = {}>(rule: APIControlRule) => {
  return createStore<StoreType<Model>>((set) => {
    return {
      currentParams: new URLSearchParams(),
      data: [],
      statuses: {
        reading: DEFAULT_REQUEST_ACTION,
        deleting: DEFAULT_REQUEST_ACTION,
        updating: DEFAULT_REQUEST_ACTION,
        creating: DEFAULT_REQUEST_ACTION,
      },
      create: (data) => {
        set((f) => {
          f.statuses.creating.fetching = true;
        });
        return fetch(rule.createEndPoint, {
          method: "POST",
          headers: rule.headers,
          body: JSON.stringify(data),
        })
          .then((r) => {
            return r.json().then((result) => [r.status, result]);
          })
          .then(([status, result]: [number, any]) => {
            set((f) => {
              f.statuses.creating.error = status >= 400;
              f.statuses.creating.success = status <= 400;
              return { ...f };
            });
          })
          .catch((error) => {
            set((f) => {
              f.statuses.creating.error = true;
              f.statuses.creating.errorMessage = String(error);
              return { ...f };
            });
          });
      },
      update: (data) => {
        set((f) => {
          f.statuses.updating.fetching = true;
        });
        return redaxios
          .put(rule.createEndPoint, data, {
            headers: Object.fromEntries(rule.headers.entries()),
          })
          .then((r) => {
            return r.json().then((result) => [r.status, result]);
          })
          .then(([status, result]: [number, any]) => {
            set((f) => {
              f.statuses.creating.error = status >= 400;
              f.statuses.creating.success = status <= 400;
              return { ...f };
            });
          })
          .catch((error) => {
            set((f) => {
              f.statuses.creating.error = true;
              f.statuses.creating.errorMessage = String(error);
              return { ...f };
            });
          });
      },
      read: (params) => {
        set((f) => {
          f.statuses.reading.fetching = true;
        });
        return redaxios
          .get(`http://localhost:8083/${rule.readEndPoint}?${params || ""}`, {
            headers: Object.fromEntries(rule.headers.entries()),
          })
          .then(({ status, data }) => {
            set((f) => {
              f.statuses.reading.error = status >= 400;
              f.statuses.reading.fetching = false;
              f.statuses.reading.success = status <= 400;
              f.data = data;
              return { ...f };
            });
          })
          .catch((error) => {
            set((f) => {
              f.statuses.reading.error = true;
              f.statuses.reading.errorMessage = String(error);
              return { ...f };
            });
          });
      },
      delete: (params) => {
        set((f) => {
          f.statuses.deleting.fetching = true;
        });
        return fetch(`${rule.readEndPoint}?${params}`, {
          method: "DELETE",
          headers: rule.headers,
        })
          .then((r) => {
            return r.json().then((result) => [r.status, result]);
          })
          .then(([status, result]: [number, any]) => {
            set((f) => {
              f.statuses.deleting.error = status >= 400;
              f.statuses.deleting.fetching = false;
              f.statuses.deleting.success = status <= 400;
              return { ...f };
            });
          })
          .catch((error) => {
            set((f) => {
              f.statuses.reading.error = true;
              f.statuses.reading.errorMessage = String(error);
              return { ...f };
            });
          });
      },
    };
  });
};
export default useApiStore;
