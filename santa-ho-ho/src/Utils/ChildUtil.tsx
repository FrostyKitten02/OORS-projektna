import {Child} from "../Components/SantaContext";


export default class ChildUtil {
    private constructor() {
    }

    static getChildFullName(child: Child): string {
        if (child.firstname === undefined && child.lastname === undefined) {
            return "";
        }

        if (child.firstname === undefined && child.lastname !== undefined) {
            return child.lastname!;
        } else if(child.firstname !== undefined && child.lastname === undefined) {
            return child.firstname;
        }

        return `${child.firstname} ${child.lastname}`;
    }
    //breaks after 100 yrs!!! npr.: 102 leti
    static getChildYearsWord(child: Child): string | undefined {
        if (child.age === undefined) {
            return undefined;
        }

        if (child.age === 1) {
            return child.age + " leto";
        }

        if (child.age === 2) {
            return child.age + " leti";
        }

        return child.age + " let";
    }

    static addStars(child: Child, stars: number): Child {
        if (child.stars === undefined) {
            child.stars = stars
        }

        child.stars += stars;
        return child;
    }

    static addBlackStars(child: Child, blackStars: number): Child {
        if (child.blackStars === undefined) {
            child.blackStars = blackStars
        }

        child.blackStars += blackStars;
        return child;
    }

    static getChildStarsDiff(child: Child): number {
        if (child.blackStars !== undefined && child.stars === undefined) {
            return child.blackStars;
        } else if (child.blackStars !== undefined && child.stars !== undefined && (child.blackStars < child.stars)) {
            return child.stars - child.blackStars;
        }

        return 0;
    }

}
