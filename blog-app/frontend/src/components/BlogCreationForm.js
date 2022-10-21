const BlogCreationForm = ({
    handleSubmit,
    blogTitle, handleBlogTitleChange,
    blogAuthor, handleBlogAuthorChange,
    blogUrl, handleBlogUrlChange,
}) => {
    return (
        <div>
            <h2>Create new</h2>
            <form onSubmit={handleSubmit}>
                <ul>
                    <li>Title:
                        <input
                            value={blogTitle}
                            onChange={handleBlogTitleChange}
                        />
                    </li>
                    <li>Author:
                        <input
                            value={blogAuthor}
                            onChange={handleBlogAuthorChange}
                        />
                    </li>
                    <li>Url:
                        <input
                            value={blogUrl}
                            onChange={handleBlogUrlChange}
                        />
                    </li>
                </ul>
                <button type="submit">Create</button>
            </form>
        </div>
    )
}

export default BlogCreationForm
