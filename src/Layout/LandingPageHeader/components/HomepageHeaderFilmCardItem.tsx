import { motion } from 'framer-motion'
import { HomepageHeaderFilmCardItemType } from './type';


export function HomepageHeaderFilmCardItem({ index, thumbnailImage, rating }: HomepageHeaderFilmCardItemType) {

    const delays = [0, 0.2, 0.4, 0.6, 0.4, 0.2, 0]
    const delay = delays[index!]

    return (
        <motion.div
            className="homepage-header-film-card-item"
            style={{ backgroundImage: `url(${thumbnailImage})` }}
            initial={{ y: 150, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, ease: "easeOut", delay: delay }}
        >
            <div className="film-card-item__inner-wrap">
                <span className="imdb-icon">Imdb</span>
                <p className="header-card-rating-wrap">
                    <span className="header-card-rating">{rating}</span>/10
                </p>
                <div className="rating-reflection">
                    <span className="imdb-icon">Imdb</span>
                    <p className="header-card-rating-wrap">
                        <span className="header-card-rating">{rating}</span>/10
                    </p>
                </div>
            </div>
        </motion.div>
    );
}