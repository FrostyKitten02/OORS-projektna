import {createBrowserRouter, RouterProvider,} from "react-router-dom";
import TemplatedPage from "../Pages/TemplatedPage";
import ChildrenPage from "../Pages/ChildrenPage";
import HomePage from "../Pages/HomePage";
import ChildPage from "../Pages/ChildPage";
import PresentsPage from "../Pages/PresentsPage";
import PresentPage from "../Pages/PresentPage";

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
                //Children pages
                {
                    path: basePath + "children",
                    element: <ChildrenPage />
                },
                {
                    path: basePath + "children/:id",
                    element: <ChildPage overview />
                },
                {
                    path: basePath + "children/edit/:id",
                    element: <ChildPage />
                },
                {
                    path: basePath + "children/add",
                    element: <ChildPage />
                },
                //Presents pages
                {
                    path: basePath + "presents",
                    element: <PresentsPage />
                },
                {
                    path: basePath + "presents/add",
                    element: <PresentPage />
                },
                {
                    path: basePath + "presents/:id",
                    element: <PresentPage overview />
                },
                {
                    path: basePath + "presents/edit/:id",
                    element: <PresentPage />
                }
            ]
        }
    ])

export default function SantaRouter() {
    return (
        <RouterProvider router={router} />
    )
}