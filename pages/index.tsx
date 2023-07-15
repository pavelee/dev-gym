import { NavigateToResource } from "@refinedev/nextjs-router";
import { ExtendedNextPage } from "./_app";

const Home: ExtendedNextPage = () => {
    return <div>
        <h1 className="text-1xl">Helo world!</h1>
    </div>
};

export default Home;

Home.noLayout = true;
