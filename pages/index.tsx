import { NavigateToResource } from "@refinedev/nextjs-router";
import { ExtendedNextPage } from "./_app";

const Home: ExtendedNextPage = () => {
    return <NavigateToResource resource="tests" />;
};

export default Home;

Home.noLayout = true;
