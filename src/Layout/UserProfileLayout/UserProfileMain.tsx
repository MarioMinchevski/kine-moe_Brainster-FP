import { UserComments } from "./UserComments";
import { UserInfo } from "./UserInfo";
import { UserWatchedMedia } from "./UserWatchedMedia";


export function UserProfileMain() {


    return (
        <div className="user-profile-main">
            <UserInfo />
            <div className="user-profile-main__inner-wrap">
                <UserComments />
                <UserWatchedMedia />
            </div>
        </div>
    )
}