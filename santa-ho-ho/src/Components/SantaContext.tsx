import {createContext, Dispatch, ReactNode, SetStateAction, useEffect, useState} from "react";
import {v4 as uuid} from "uuid";
import 'react-toastify/dist/ReactToastify.css';
import {toast, ToastContainer} from "react-toastify";
export interface Address {
    street?: string;
    number?: number;
    zip?: number;
    city?: string;
}

export interface Child {
    id?: string;
    firstname?: string;
    lastname?: string;
    age?: number;
    address?: Address;
    stars?: number;
    blackStars?: number;
}

export interface Present {
    id?: string;
    name?: string;
    forChildId?: string;//id of child, if set present is reserved for that child and no longer on avalible list, it's moved to delivery list
}

export interface SantaBaseContext {
    searchChildren: (name?: string) => Child[];
    searchPresents: (name: string) => Present[];
    saveChild: (child: Child) => void;
    getChildById: (id: string) => Child | undefined;
    addPresent: (present: Present) => void;
    showErrorMessage: (message: string) => void;
    showSuccessMessage: (message: string) => void;
    clearAlerts: () => void;
}

interface ISantaContext extends SantaBaseContext{
    children: Child[],
    presents: Present[],
    setCtx?: Dispatch<SetStateAction<ISantaContext>>,
}

const POPUP_TIMEOUT = 3000;

const initalChildren = [
    {
        id: "1f52a5ec-09bd-4954-a2e6-0ee511cbcbda",
        firstname: "Janez",
        lastname: "Novak",
        age: 10,
        address: {
            street: "Trg",
            number: 1,
            zip: 1000,
            city: "Ljubljana"
        },
        stars: 4,
        blackStars: 2
    },
    {
        id: "ed08efc3-9947-411f-9472-43d388caa4c0",
        firstname: "Janez2",
        lastname: "Novak2",
        age: 10,
        address: {
            street: "Trg 2",
            number: 12,
            zip: 10002,
            city: "Ljubljana 2"
        },
        stars: 0,
        blackStars: 5
    },
    {
        id: "a",
        firstname: "Janez2",
        lastname: "Novak2",
        age: 10,
        address: {
            street: "Trg 2",
            number: 12,
            zip: 10002,
            city: "Ljubljana 2"
        },
        stars: 0,
        blackStars: 5
    },
    {
        id: "b",
        firstname: "Janez2",
        lastname: "Novak2",
        age: 10,
        address: {
            street: "Trg 2",
            number: 12,
            zip: 10002,
            city: "Ljubljana 2"
        },
        stars: 0,
        blackStars: 5
    },
    {
        id: "c",
        firstname: "Janez2",
        lastname: "Novak2",
        age: 10,
        address: {
            street: "Trg 2",
            number: 12,
            zip: 10002,
            city: "Ljubljana 2"
        },
        stars: 0,
        blackStars: 5
    },
    {
        id: "d",
        firstname: "Janez2",
        lastname: "Novak2",
        age: 10,
        address: {
            street: "Trg 2",
            number: 12,
            zip: 10002,
            city: "Ljubljana 2"
        },
        stars: 0,
        blackStars: 5
    },
    {
        id: "e",
        firstname: "Janez2",
        lastname: "Novak2",
        age: 10,
        address: {
            street: "Trg 2",
            number: 12,
            zip: 10002,
            city: "Ljubljana 2"
        },
        stars: 0,
        blackStars: 5
    },
    {
        id: "f",
        firstname: "Janez2",
        lastname: "Novak2",
        age: 10,
        address: {
            street: "Trg 2",
            number: 12,
            zip: 10002,
            city: "Ljubljana 2"
        },
        stars: 0,
        blackStars: 5
    },
];


//TODO implement functions!
const initalState: ISantaContext = {
    children: initalChildren,
    presents: [],
    searchChildren: function(name?: string): Child[] {
        if (name === undefined) {
            return this.children;
        }
       return this.children.filter(child => child.firstname?.includes(name) || child.lastname?.includes(name));
    },
    searchPresents: function (name: string) {
        return this.presents.filter(present => present.name?.includes(name));
    },
    saveChild: function (child: Child) {
        if (child.id === undefined) {
            child.id = uuid();
            this.children.push(child);
        } else {
            const index = this.children.findIndex(c => c.id === child.id);
            if (index !== -1) {
                this.children[index] = child;
            } else {
                console.warn("Child not found while saving!")
            }
        }

        this.setCtx?.(prevstate => {
            return {...prevstate};
        });
    },
    getChildById: function (id: string): Child | undefined {
      return this.children.find(child => child.id === id);
    },
    addPresent: (present: Present) => {},
    showErrorMessage: function (message: string, time?: number) {
        toast.error(message, {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: time ?? POPUP_TIMEOUT,
        });
    },
    showSuccessMessage: function (message: string, time?: number) {
        toast.success(message, {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: time ?? POPUP_TIMEOUT,
        });
    },
    clearAlerts: function () {
        toast.dismiss();
    }
}

export const santaContext = createContext<SantaBaseContext>(initalState);
export default function SantaContext({children}:{children: ReactNode}) {
    const [ctx, setCtx] = useState<ISantaContext>(initalState);

    useEffect(() => {
        if (ctx.setCtx !== undefined) {
            return;
        }
        setCtx({...ctx, setCtx: setCtx});
    });


    return (
        <santaContext.Provider value={ctx} >
            {children}
            <ToastContainer />
        </santaContext.Provider>
    )
}