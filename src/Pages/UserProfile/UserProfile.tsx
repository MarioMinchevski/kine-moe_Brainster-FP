import { AsideNavBar } from "../../Layout/AsideNavBar/AsideNavBar";
import { UserProfileHeader } from "../../Layout/UserProfileLayout/UserProfileHeader";
import { UserProfileMain } from "../../Layout/UserProfileLayout/UserProfileMain";

export function UserProfile() {
    return (
        <div className="user-profile">
            <AsideNavBar />
            <UserProfileHeader />
            <UserProfileMain />
        </div>
    )
}