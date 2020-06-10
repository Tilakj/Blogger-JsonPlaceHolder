export const getUserByIdSelector = (users, userid) => {
    return users.filter(user => user.id === userid)[0]
}

export const getUserPostsSelector = (posts, userId) => {
    return posts.filter(post => post.userId === userId)
}

export const getPostByIdSelector = (posts, postId) => {
    return posts.filter(post => post.id === postId)[0]
}

