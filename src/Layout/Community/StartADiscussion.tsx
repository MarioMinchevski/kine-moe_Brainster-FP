import { useState } from "react";
import { motion } from "framer-motion";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { UserType } from "../../SharedTypes/SharedTypes";
import { addPost } from "../../utils/addPost";

export function StartADiscussion({ handleisClosingDiscussion }: { handleisClosingDiscussion: () => void }) {
    const queryClient = useQueryClient()

    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [isErrorDiscussionMessageVisible, setIsErrorDiscussionMessageVisible] = useState(false)

    const currentUserString = localStorage.getItem('user')
    let currentUser: UserType | null = null

    if (currentUserString) {
        currentUser = JSON.parse(currentUserString)
    }

    const commentAuthorReplyImg = currentUser?.image

    const addPostMutation = useMutation({
        mutationFn: addPost,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["posts"] })
        },
    })

    const handleConfirmAddPost = async () => {
        try {
            await addPostMutation.mutateAsync({ postTitle: title, postText: description, authorImg: commentAuthorReplyImg })

        } catch (err) {
            console.log("Error adding post:", err)
        }
    }

    const handleSubmitDiscussion = (ev: React.FormEvent<HTMLFormElement>) => {
        ev.preventDefault()

        if (title.trim() === "" || description.trim() === "") {
            setIsErrorDiscussionMessageVisible(true)
        } else {
            handleConfirmAddPost()
            setIsErrorDiscussionMessageVisible(false)
            handleisClosingDiscussion()
        }
    }

    return (

        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.75 }}
        >
            <h3 className="discussion-header">Start a discussion</h3>
            <div className="start-a-discussion-wrap">
                <form onSubmit={handleSubmitDiscussion}>
                    <div className="discussion-form-group">
                        <h3>Your post title</h3>
                        <textarea
                            className="title-textarea"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder="Your post title"
                        ></textarea>
                    </div>
                    <div className="discussion-form-group">
                        <h3>Your post description</h3>
                        <textarea
                            className="desc-textarea"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            placeholder="Your post description"
                        ></textarea>
                    </div>
                    <button type="submit" className="discussion-submit-btn">
                        Submit
                    </button>
                    <div className={`discussion-error-message ${isErrorDiscussionMessageVisible ? "show" : ""}`}>
                        <p>Please fill in both the title and description fields.</p>
                    </div>
                </form>
            </div>
        </motion.div>

    );
}
