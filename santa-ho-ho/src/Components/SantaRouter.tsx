import {createBrowserRouter, RouterProvider,} from "react-router-dom";
import TemplatedPage from "../Pages/TemplatedPage";
import ChildrenPage from "../Pages/ChildrenPage";
import HomePage from "../Pages/HomePage";
import ChildPage from "../Pages/ChildPage";

const basePath: string = "/";

const router = createBrowserRouter(
    [
        {
            path: basePath,
            element: <TemplatedPage />,
            children: [
                {
                    path: basePath,
                    element: <HomePage />
                },
                {
                    path: basePath + "children",
                    element: <ChildrenPage />
                },
                {
                    path: basePath + "children/:id",
                    element: <ChildPage overview={true}/>
                },
                {
                    path: basePath + "children/edit/:id",
                    element: <ChildPage />
                },
                {
                    path: basePath + "children/add",
                    element: <ChildPage />
                }
            ]
        }
    ])

export default function SantaRouter() {
    return (
        <RouterProvider router={router} />
    )
}