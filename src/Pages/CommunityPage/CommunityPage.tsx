import { AsideNavBar } from "../../Layout/AsideNavBar/AsideNavBar";
import { CommunityMain } from "../../Layout/Community/CommunityMain";

export function CommunityPage() {
    return (
        <div className="community-page">
            <AsideNavBar />
            <CommunityMain />
        </div>
    )
}