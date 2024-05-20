import { useRouter } from "next/navigation";
import React from "react";

function WithAuth(Component: React.ElementType) {
    return function WithAuth(props: any) {
        const router = useRouter();

        // Add your authentication logic here
        // For example, check if the user is authenticated
        // const isAuthenticated = checkIfAuthenticated()
        const isAuthenticated = false;

        // Redirect to login page if not authenticated
        if (!isAuthenticated) {
            router.push("/");
            return null;
        }

        return <Component {...props} />;
    };
}

export default WithAuth;
