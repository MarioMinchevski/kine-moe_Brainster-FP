import { AsideNavBar } from "../../Layout/AsideNavBar/AsideNavBar";
import { CommunityPagePostCommentSection } from "../../Layout/Community/CommunityPagePostCommentSection";
import { CommunityPagePostMain } from "../../Layout/Community/CommunityPagePostMain";

export function CommunityPagePost() {
    return (
        <div className="community-page-post">
            <AsideNavBar />
            <CommunityPagePostMain />
        </div>
    )
}