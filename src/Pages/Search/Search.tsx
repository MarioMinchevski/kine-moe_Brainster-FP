import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { AsideNavBar } from "../../Layout/AsideNavBar/AsideNavBar";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { MediaSliderWrap } from "../../Layout/MediaSliderWrap/MediaSliderWrap";
import { SimilarResults } from "../../Layout/SearchLayout/SimilarResults";
import { Footer } from "../../Layout/SharedComponents/Footer/Footer";
import { useState } from "react";
import { MediaItemType } from "../../SharedTypes/SharedTypes";
import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { fetchAllMediaItems } from "../../utils/fetchAllMediaItems";

export function Search() {

    const { data: allMediaItems, error: errorTwo, isLoading: isLoadingTwo } = useQuery<MediaItemType[]>({
        queryFn: fetchAllMediaItems,
        queryKey: ['movies']
    })

    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState<MediaItemType[]>([]);
    const [searchStatus, setSearchStatus] = useState<'initial' | 'loading' | 'found' | 'notFound'>('initial')

    if (isLoadingTwo || errorTwo) {
        return <div>Loading...</div>
    }

    const handleSearch = (ev: React.FormEvent<HTMLFormElement>) => {
        ev.preventDefault()
        if (!allMediaItems) return

        setSearchStatus('loading')
        const results = allMediaItems?.filter(movie =>
            movie?.title.toLowerCase().includes(searchTerm.toLowerCase())
        )
        setSearchResults(results)
        setSearchTerm('')
        setSearchStatus(results.length > 0 ? 'found' : 'notFound')
    }

    // similar results acccording to genre? 

    const similarResults: MediaItemType[] = allMediaItems!.filter(item =>
        searchResults.some(searchItem =>
            searchItem.genres.some(genre =>
                item.genres.includes(genre)
            )
        )
    )

    return (
        <>
            <div className="search-page">
                <AsideNavBar />
                <motion.div
                    initial={{ y: -100 }}
                    animate={{ y: 0 }}
                    transition={{ duration: 1 }}
                    className="search__header">
                    <div className="search-input-box">
                        <form onSubmit={handleSearch}>
                            <input
                                type="text"
                                name=""
                                id=""
                                className="search-input"
                                placeholder="Search"
                                value={searchTerm}
                                onChange={(event) => setSearchTerm(event.target.value)}
                            />
                            <button type="submit" className="search-input-icon">
                                <FontAwesomeIcon icon={faMagnifyingGlass} />
                            </button>
                        </form>
                    </div>
                </motion.div>
                <motion.div
                    initial={{ y: -250 }}
                    animate={{ y: 0 }}
                    transition={{ duration: 1 }}
                    className="search__results">
                    {searchStatus === 'initial' && (
                        <p className="search-initial-text">
                            Find your next binge-worthy content right here!
                        </p>
                    )}
                    {searchStatus === 'found' && (
                        <>
                            <p className="search-initial-text">
                                Find your next binge-worthy content right here!
                            </p>
                            <MediaSliderWrap
                                title="Search Results"
                                content={searchResults}
                                key="search-results-slider-wrap"
                                extraClass="search"
                            />
                        </>
                    )}
                    {searchStatus === 'notFound' && (
                        <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ duration: 0.35 }}
                            className="no-search-results-found">
                            <img src="/searchPage/results-not-found-icon.png" alt="no-result-found" />
                            <p>Looks like that title isn't in our library. Try another?</p>
                        </motion.div>
                    )}
                </motion.div>
                <SimilarResults
                    similarResults={similarResults}
                    allMediaItems={allMediaItems as MediaItemType[]}
                />
            </div >
            <Footer />
        </>
    )
}