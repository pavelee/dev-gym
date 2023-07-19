import React, { useEffect } from "react";
import type { AppProps } from "next/app";
import type { NextPage } from "next";

import { GitHubBanner, Refine } from "@refinedev/core";
import {
    ThemedLayoutV2,
    notificationProvider,
    RefineThemes,
    ThemedTitleV2,
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
            <ThemedLayoutV2
                Title={({ collapsed }) => (
                    <ThemedTitleV2
                        collapsed={collapsed}
                        text="dev-gym"
                    />
                )}
            >
                <Component {...pageProps} />
            </ThemedLayoutV2>
        );
    };

    return (
        <>
            <ConfigProvider theme={RefineThemes.Blue}>
                <Refine
                    authProvider={authProvider}
                    routerProvider={routerProvider}
                    dataProvider={dataProvider(supabaseClient)}
                    resources={[
                        {
                            name: "technologies",
                            list: "/admin/technologies",
                            create: "/admin/technologies/create",
                            edit: "/admin/technologies/edit/:id",
                            show: "/admin/technologies/show/:id",
                            meta: {
                                canDelete: true,
                            },
                        },
                        {
                            name: "tests",
                            list: "/admin/tests",
                            create: "/admin/tests/create",
                            edit: "/admin/tests/edit/:id",
                            show: "/admin/tests/show/:id",
                            meta: {
                                canDelete: true,
                            },
                        },
                        {
                            name: "questions",
                            list: "/admin/questions",
                            create: "/admin/questions/create",
                            edit: "/admin/questions/edit/:id",
                            show: "/admin/questions/show/:id",
                            meta: {
                                canDelete: true,
                            },
                        },
                        {
                            name: "answers",
                            list: "/admin/answers",
                            create: "/admin/answers/create",
                            edit: "/admin/answers/edit/:id",
                            show: "/admin/answers/show/:id",
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
