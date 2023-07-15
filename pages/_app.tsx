import React from "react";
import type { AppProps } from "next/app";
import type { NextPage } from "next";

import { GitHubBanner, Refine } from "@refinedev/core";
import {
    ThemedLayoutV2,
    notificationProvider,
    RefineThemes,
} from "@refinedev/antd";
// import dataProvider from "@refinedev/simple-rest";
import routerProvider, {
    DocumentTitleHandler,
    UnsavedChangesNotifier,
} from "@refinedev/nextjs-router";
import "@refinedev/antd/dist/reset.css";

import { ConfigProvider } from "antd";
import "@styles/global.css";

import { authProvider } from "src/authProvider";
import { API_URL } from "../src/constants";

import { dataProvider } from "@refinedev/supabase";
import { supabaseClient } from "../src/utils/supabaseClient";

export type ExtendedNextPage = NextPage & {
    noLayout?: boolean;
};

type ExtendedAppProps = AppProps & {
    Component: ExtendedNextPage;
};

function MyApp({ Component, pageProps }: ExtendedAppProps): JSX.Element {
    const renderComponent = () => {
        if (Component.noLayout) {
            return <Component {...pageProps} />;
        }

        return (
            <ThemedLayoutV2>
                <Component {...pageProps} />
            </ThemedLayoutV2>
        );
    };

    return (
        <>
            <GitHubBanner />
            <ConfigProvider theme={RefineThemes.Blue}>
                <Refine
                    authProvider={authProvider}
                    routerProvider={routerProvider}
                    dataProvider={dataProvider(supabaseClient)}
                    resources={[
                        // { name: "users", list: "/users" },
                        // {
                        //     name: "posts",
                        //     list: "/posts",
                        //     create: "/posts/create",
                        //     edit: "/posts/edit/:id",
                        //     show: "/posts/show/:id",
                        //     meta: {
                        //         canDelete: true,
                        //     },
                        // },
                        {
                            name: "tests",
                            list: "/tests",
                            // create: "/posts/create",
                            // edit: "/posts/edit/:id",
                            // show: "/posts/show/:id",
                            meta: {
                                canDelete: true,
                            },
                        },
                    ]}
                    options={{
                        syncWithLocation: true,
                        warnWhenUnsavedChanges: true,
                    }}
                    notificationProvider={notificationProvider}
                >
                    {renderComponent()}
                    <UnsavedChangesNotifier />
                    <DocumentTitleHandler />
                </Refine>
            </ConfigProvider>
        </>
    );
}

export default MyApp;
