    import { Profile } from "./profile.model";

    export interface User{
    
    _id: string;
    name:string;
    email:string;
    birth_date:Date;
    sex:string;
    password:string;
    profile: Profile;
    }