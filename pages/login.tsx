import { AuthPage } from "@refinedev/antd";
import { ExtendedNextPage } from "./_app";

const Login: ExtendedNextPage = () => {
    return (
        <AuthPage
            type="login"
            formProps={{
                initialValues: {
                    email: "",
                    password: "",
                },
            }}
        />
    );
};

Login.noLayout = true;

export default Login;
