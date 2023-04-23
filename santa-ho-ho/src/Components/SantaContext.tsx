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
    description?: string;
    maxStarsDiff?: number;
    minAge?: number;
    maxAge?: number;
    imageLink?: string;
    forChildId?: string;//id of child, if set present is reserved for that child and no longer on avalible list, it's moved to delivery list
}

export interface SantaBaseContext {
    searchChildren: (name?: string) => Child[];
    searchPresents: (name?: string, onlyAvailable?: boolean) => Present[];
    saveChild: (child: Child) => void;
    getChildById: (id: string) => Child | undefined;
    savePresent: (present: Present) => void;
    getPresentById: (id: string) => Present | undefined;
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

const initalPresents = [
    {
        id: "asdasd",
        name: "Lego",
        description: "Lego set",
        maxStarsDiff: 2,
        minAge: 5,
        maxAge: 10,
        imageLink: "https://www.lego.com/cdn/cs/set/assets/blt8fa82af2949ffc86/31139.png",
    }
]

const initalState: ISantaContext = {
    children: initalChildren,
    presents: initalPresents,
    searchChildren: function(name?: string): Child[] {
        if (name === undefined) {
            return this.children;
        }
       return this.children.filter(child => child.firstname?.toLowerCase().includes(name.toLowerCase()) || child.lastname?.toLowerCase().includes(name.toLowerCase()));
    },
    searchPresents: function (name?: string, onlyAvailable?: boolean): Present[] {
        if (name === undefined || name === "") {
            if (onlyAvailable) {
                return this.presents.filter(present => present.forChildId === undefined);
            }
            return this.presents;
        }

        return this.presents.filter(present => {
            const nameBool = present.name?.toLowerCase().includes(name.toLowerCase()) || present.description?.toLowerCase().includes(name.toLowerCase());
            if (onlyAvailable !== undefined) {
                return nameBool && present.forChildId === undefined;
            }
            return nameBool;
        });
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
    savePresent: function(present: Present) {
        if (present.id == null) {
            present.id = uuid();
            this.presents.push(present);
        } else {
            const index = this.presents.findIndex(p => p.id === present.id);
            if (index !== -1) {
                this.presents[index] = present;
            } else {
                console.warn("Present not found while saving!")
            }
        }

        this.setCtx?.(prevstate => {
            return {...prevstate};
        });
    },
    getPresentById: function (id: string): Present | undefined {
        return this.presents.find(present => present.id === id);
    },
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