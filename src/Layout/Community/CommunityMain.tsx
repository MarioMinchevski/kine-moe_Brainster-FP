import { useEffect, useState } from "react"
import { CommnityInfo } from "./CommunityInfo"
import { motion } from "framer-motion"
import { DiscussionItemType } from "./types";
import { DiscussionItem } from "./DiscussionItem";
import { useQuery } from "@tanstack/react-query";
import { fetchAllPosts } from "../../utils/fetchAllPosts";
import { StartADiscussion } from "./StartADiscussion";

const filtersConfig = [
    {
        filterType: 'Most Recent'
    },
    {
        filterType: 'Least Recent'
    },
    {
        filterType: 'Popularity',
    },
    {
        filterType: 'By Viewers',
    },
    {
        filterType: 'By Artists',
    }
]

export function CommunityMain() {
    const [isStartDiscussionVisible, setIsStartDiscussionVisible] = useState<boolean>(false)

    const [discussionSearchText, setDiscussionSearchText] = useState('')
    const [filteredPosts, setFilteredPosts] = useState<DiscussionItemType[]>([])

    const [areFiltersVisible, setAreFiltersVisible] = useState<boolean>(false)
    const [selectedFilter, setSelectedFilter] = useState<string | null>(null)

    const { data: allPosts, error: postError, isLoading: postLoading } = useQuery<DiscussionItemType[]>({
        queryFn: fetchAllPosts,
        queryKey: ['posts'],
    })

    useEffect(() => {
        if (discussionSearchText) {
            setFilteredPosts(allPosts?.filter(post =>
                post.postTitle.toLowerCase().includes(discussionSearchText.toLowerCase())
            ) || [])
        } else {
            setFilteredPosts(allPosts || [])
        }
    }, [discussionSearchText, allPosts])


    const handleisClosingDiscussion = () => {
        setIsStartDiscussionVisible(false)
    }

    const handleFilterClick = (filterType: string) => {
        setSelectedFilter(prevFilter => prevFilter === filterType ? null : filterType)
    }

    if (postError || postLoading) {
        return <div>Loading...</div>
    }
    return (<>
        <motion.h1
            initial={{ y: -100 }}
            animate={{ y: 0, transition: { duration: 0.5 } }}
        >
            Community
        </motion.h1>
        <div className="community-main">
            <div className="community-main__inner-wrap">
                <motion.div
                    initial={{ y: -150 }}
                    animate={{ y: 0, transition: { duration: 0.5 } }}
                    className="discussion-seach-box">
                    <div className="discussion-seach-box__inner-wrap">
                        <button
                            className={`discussion-filters-btn ${areFiltersVisible ? 'active' : ''}`}
                            onClick={() => setAreFiltersVisible(prev => !prev)}
                        >
                            <div className="line"></div>
                            <div className="line"></div>
                            <div className="line"></div>
                        </button>
                        <div className="filters-wrap"></div>
                        <input type="text"
                            name="discussion-search"
                            id="discussion-search"
                            className="discussions-search-input"
                            value={discussionSearchText}
                            onChange={(e) => setDiscussionSearchText(e.target.value)}
                            placeholder="Search..." />
                    </div>
                    <button
                        onClick={() => setIsStartDiscussionVisible(prev => !prev)}
                        className="start-a-discussion-btn">
                        {isStartDiscussionVisible ? 'Close' : 'Start a discussion'}
                    </button>
                </motion.div>
                {areFiltersVisible &&
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.75 }}
                        className="filters-wrap">
                        {filtersConfig.map((el, idx) => (
                            <button
                                className={`post-filter-btn ${selectedFilter === el.filterType ? 'selected' : ''}`}
                                key={`${el.filterType}-${idx}`}
                                onClick={() => handleFilterClick(el.filterType)}
                            >
                                {el.filterType}
                            </button>
                        ))}
                    </motion.div>
                }
                {isStartDiscussionVisible &&
                    <StartADiscussion handleisClosingDiscussion={handleisClosingDiscussion} />}
                <motion.div
                    initial={{ y: -600 }}
                    animate={{ y: 0, transition: { duration: 0.5 } }}
                    className="discussions-wrap">
                    <div className="discussion-header">
                        <span>Posts</span>
                        <span>Rating</span>
                    </div>
                    {filteredPosts?.map((el, idx) => (
                        <DiscussionItem {...el} key={`${el.id}-${idx}`} />
                    ))}
                </motion.div>
            </div>
            <CommnityInfo />
        </div >
    </>
    )
}