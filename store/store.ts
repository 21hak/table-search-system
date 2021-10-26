// import { action, observable, makeObservable, makeAutoObservable } from "mobx";
// import { enableStaticRendering, MobXProviderContext } from "mobx-react";
// import { useMemo, useContext } from "react";
// import UiState from "./uistate";

// // eslint-disable-next-line react-hooks/rules-of-hooks
// enableStaticRendering(typeof window === "undefined");

// let store = null;

// const isServer = typeof window === "undefined";

// class Store {
//   uiState = new UiState();

//   constructor(props) {
//     makeAutoObservable(this);
//     this.hydrate(props);
//   }

//   @action
//   hydrate = (data) => {
//     if (data) {
//       this.userStore = new UserStore(data);
//     }
//   };
// }

// function initializeStore(initialData) {
//   // if _store is null or undifined return new Store
//   //otherwise use _store

//   // If your page has Next.js data fetching methods that use a Mobx store, it will
//   // get hydrated here, check `pages/ssg.js` and `pages/ssr.js` for more details

//   // For SSG and SSR always create a new store
//   if (isServer) {
//     return {
//       uiState: new UiState(),
//     };
//   }

//   // Create the store once in the client
//   if (store === null) {
//     store = {
//       cartStore: new CartStore(),
//       userStore: new UserStore(initialData),
//     };
//   }

//   return store;
// }

// export function useStore(initialState) {
//   const store = useMemo(() => initializeStore(initialState), [initialState]);
//   return store;
// }
