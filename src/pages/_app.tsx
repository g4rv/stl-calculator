import { wrapper } from "@/providers/reduxWrapper";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Provider } from "react-redux";

function App({ Component, ...rest }: AppProps) {
  const { store, props } = wrapper.useWrappedStore(rest);
  const { pageProps } = props;
  return (
    <Provider store={store}>
      <Component {...pageProps} />{" "}
    </Provider>
  );
}

export default wrapper.withRedux(App);
