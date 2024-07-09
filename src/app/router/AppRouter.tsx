import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { Route, Routes, BrowserRouter } from "react-router-dom";

import { sharedConfigRoutes } from "@/shared/config";

import { mainPageUi } from "@/pages/mainPage";
import { repoPageUi } from "@/pages/repoPage";

import styles from "./AppRouter.module.css";

export const AppRouter = () => {
  const { MAIN_PAGE, REPO_PAGE } = sharedConfigRoutes.RouteName;

  const { MainPage } = mainPageUi;
  const { RepoPage } = repoPageUi;

  const routes: sharedConfigRoutes.RouteDescription[] = [
    {
      path: MAIN_PAGE,
      component: MainPage,
    },
    {
      path: REPO_PAGE,
      component: RepoPage,
    },
  ];

  const routesContent = routes.map(({ path, component: Component }) => (
    <Route key={path} path={path} element={<Component />} />
  ));

  const httpLink = createHttpLink({
    uri: import.meta.env.VITE_API_URL,
  });
  const authLink = setContext((_, { headers }) => {
    return {
      headers: {
        ...headers,
        authorization: `Bearer ${import.meta.env.VITE_GITHUB_ACCESS_TOKEN}`,
      },
    };
  });

  const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
  });

  // async function getData() {
  //   const data = await client.query({
  //     query: gql`
  //       {
  //         user(login: "IrinaZolo") {
  //           repositories(last: 10, privacy: PUBLIC) {
  //             nodes {
  //               name
  //               stargazerCount
  //               commitComments(last: 1) {
  //                 nodes {
  //                   createdAt
  //                 }
  //                 totalCount
  //               }
  //               url
  //             }

  //             totalCount
  //           }
  //         }
  //       }
  //     `,
  //   });
  //   return data;
  // }

  return (
    <ApolloProvider client={client}>
      <BrowserRouter>
        <div className={styles.container}>
          <Routes>
            {routesContent}
            <Route path="*" element={<div>not found page</div>} />
          </Routes>
        </div>
      </BrowserRouter>
    </ApolloProvider>
  );
};
